import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { POST, OPTIONS } from './route'

describe('TipJar Proxy API', () => {
  const mockApiKey = 'test-api-key-123'

  beforeEach(() => {
    process.env.BLINK_API_KEY = mockApiKey
    vi.resetAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('OPTIONS', () => {
    it('should return empty JSON with CORS headers', async () => {
      const response = await OPTIONS()

      const data = await response.json()
      expect(data).toEqual({})

      expect(response.status).toBe(200)
      expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*')
      expect(response.headers.get('Access-Control-Allow-Methods')).toBe('POST, OPTIONS')
      expect(response.headers.get('Access-Control-Allow-Headers')).toBe('Content-Type, Authorization')
    })
  })

  describe('POST', () => {
    it('should return 403 for disallowed operation', async () => {
      const request = new Request('http://localhost:3000/api/tipjar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operation: 'DisallowedOperation',
          variables: {},
        }),
      })

      const response = await POST(request)

      expect(response.status).toBe(403)
      const data = await response.json()
      expect(data.error).toBe('Operation not allowed')
      expect(data.allowed).toEqual([
        'LnInvoiceCreate',
        'LnNoAmountInvoiceCreate',
        'LnUsdInvoiceCreate',
        'OnChainAddressCurrent',
        'Me',
      ])
    })

    it('should return 500 when BLINK_API_KEY is not configured', async () => {
      delete process.env.BLINK_API_KEY

      const request = new Request('http://localhost:3000/api/tipjar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operation: 'Me',
          variables: {},
        }),
      })

      const response = await POST(request)

      expect(response.status).toBe(500)
      const data = await response.json()
      expect(data.error).toBe('Blink API key not configured')
    })

    it('should forward valid Me query to Blink API', async () => {
      const mockBlinkResponse = {
        data: {
          me: {
            defaultAccount: {
              wallets: [
                {
                  id: 'wallet-1',
                  walletCurrency: 'USD',
                  balance: '1000.00',
                },
              ],
            },
          },
        },
      }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockBlinkResponse),
      })

      const request = new Request('http://localhost:3000/api/tipjar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operation: 'Me',
          variables: {},
        }),
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data).toEqual(mockBlinkResponse)

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.blink.sv/graphql',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'X-API-KEY': mockApiKey,
          }),
        })
      )
    })

    it('should forward LnInvoiceCreate mutation with correct query', async () => {
      const requestBody = {
        operation: 'LnInvoiceCreate',
        variables: {
          input: {
            amount: 1000,
            description: 'Test invoice',
          },
        },
      }

      const mockBlinkResponse = {
        data: {
          lnInvoiceCreate: {
            invoice: {
              paymentRequest: 'lnbc100n1...',
              paymentHash: 'hash123',
              paymentSecret: 'secret123',
              satoshis: 1000,
            },
            errors: null,
          },
        },
      }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockBlinkResponse),
      })

      const request = new Request('http://localhost:3000/api/tipjar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)

      expect(response.status).toBe(200)

      const fetchCall = (global.fetch as any).mock.calls[0]
      expect(fetchCall[0]).toBe('https://api.blink.sv/graphql')

      const fetchOptions = fetchCall[1]
      expect(fetchOptions.method).toBe('POST')
      expect(fetchOptions.headers['Content-Type']).toBe('application/json')
      expect(fetchOptions.headers['X-API-KEY']).toBe(mockApiKey)

      const body = JSON.parse(fetchOptions.body)
      expect(body.query).toContain('mutation LnInvoiceCreate')
      expect(body.variables).toEqual(requestBody.variables)
    })

    it('should handle Blink API errors gracefully', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        text: () => Promise.resolve('Invalid request'),
      })

      const request = new Request('http://localhost:3000/api/tipjar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operation: 'Me',
          variables: {},
        }),
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Blink API error')
      expect(data.details).toBe('Invalid request')
    })

    it('should handle network errors', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

      const request = new Request('http://localhost:3000/api/tipjar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operation: 'Me',
          variables: {},
        }),
      })

      const response = await POST(request)

      expect(response.status).toBe(500)
      const data = await response.json()
      expect(data.error).toBe('Internal server error')
      expect(data.message).toBe('Network error')
    })

    it('should allow missing variables (defaults to empty object)', async () => {
      const mockBlinkResponse = { data: { me: { defaultAccount: null } } }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockBlinkResponse),
      })

      const requestBody = { operation: 'Me' }
      const request = new Request('http://localhost:3000/api/tipjar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)

      expect(response.status).toBe(200)

      const fetchCall = (global.fetch as any).mock.calls[0]
      const body = JSON.parse(fetchCall[1].body)
      expect(body.variables).toEqual({})
    })
  })
})
