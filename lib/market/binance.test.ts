import { describe, it, expect } from 'vitest'
import {
  calculateHeatMap,
  timeframeToInterval,
  formatPrice,
} from './binance'
import type { OHLC } from './binance'

describe('calculateHeatMap', () => {
  it('should return a valid StochasticResult object', () => {
    const ohlc: OHLC[] = Array(100)
      .fill(null)
      .map((_, i) => {
        const base = 100 + i * 0.5
        return {
          open: base,
          high: base + 5,
          low: base - 5,
          close: base + 2,
          volume: 1000,
          time: Date.now() + i * 3600000,
        }
      })

    const result = calculateHeatMap(ohlc, 28, 10, 2)

    expect(result).toHaveProperty('value')
    expect(result).toHaveProperty('status')
    expect(result).toHaveProperty('individualStochastics')
    expect(result).toHaveProperty('historicalValues')
    expect(result).toHaveProperty('lastUpdate')

    expect(typeof result.value).toBe('number')
    expect(result.value).toBeGreaterThanOrEqual(0)
    expect(result.value).toBeLessThanOrEqual(100)

    expect(['overbought', 'oversold', 'neutral']).toContain(result.status)

    expect(result.individualStochastics).toHaveLength(28)
    result.individualStochastics.forEach((stoch) => {
      expect(stoch).toBeGreaterThanOrEqual(0)
      expect(stoch).toBeLessThanOrEqual(100)
    })

    expect(result.historicalValues).toEqual([])
    expect(typeof result.lastUpdate).toBe('number')
    expect(result.lastUpdate).toBeLessThanOrEqual(Date.now())
  })

  it('should mark as overbought when average >= 80', () => {
    const ohlc: OHLC[] = Array(200)
      .fill(null)
      .map((_, i) => ({
        open: 200,
        high: 250,
        low: 150,
        close: 245,
        volume: 1000,
        time: Date.now() + i * 3600000,
      }))

    const result = calculateHeatMap(ohlc, 28, 10, 2)
    expect(result.status).toBe('overbought')
  })

  it('should mark as oversold when average <= 25', () => {
    const ohlc: OHLC[] = Array(200)
      .fill(null)
      .map((_, i) => ({
        open: 100,
        high: 110,
        low: 50,
        close: 55,
        volume: 1000,
        time: Date.now() + i * 3600000,
      }))

    const result = calculateHeatMap(ohlc, 28, 10, 2)
    expect(result.status).toBe('oversold')
  })

  it('should mark as neutral when average is between 25 and 80', () => {
    const ohlc: OHLC[] = Array(200)
      .fill(null)
      .map((_, i) => {
        const base = 100 + i * 0.5
        return {
          open: base,
          high: base + 5,
          low: base - 5,
          close: base + 2,
          volume: 1000,
          time: Date.now() + i * 3600000,
        }
      })

    const result = calculateHeatMap(ohlc, 28, 10, 2)
    expect(result.status).toBe('neutral')
  })
})

describe('timeframeToInterval', () => {
  it('should map 1h to 1h', () => {
    expect(timeframeToInterval('1h')).toBe('1h')
  })

  it('should map 4h to 4h', () => {
    expect(timeframeToInterval('4h')).toBe('4h')
  })

  it('should map 1d to 1d', () => {
    expect(timeframeToInterval('1d')).toBe('1d')
  })

  it('should map 1w to 1w', () => {
    expect(timeframeToInterval('1w')).toBe('1w')
  })
})

describe('formatPrice', () => {
  it('should format price with two decimal places', () => {
    expect(formatPrice(1234.5)).toBe('$1,234.50')
  })

  it('should format price with no decimals when whole number', () => {
    expect(formatPrice(1234)).toBe('$1,234.00')
  })

  it('should format small prices correctly', () => {
    expect(formatPrice(0.01)).toBe('$0.01')
  })

  it('should format large prices with commas', () => {
    expect(formatPrice(1234567.89)).toBe('$1,234,567.89')
  })
})
