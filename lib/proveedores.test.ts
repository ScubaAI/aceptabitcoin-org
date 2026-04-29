import { describe, it, expect } from 'vitest'
import {
  filterByCategory,
  getStats,
  type Proveedor,
  type Categoria,
  type Tier,
} from '../lib/proveedores'

describe('filterByCategory', () => {
  const mockProveedores: Proveedor[] = [
    {
      id: '1',
      nombre: 'Exchange Bitcoin',
      categoria: 'exchange',
      tier: 'patrocinador',
      descripcion: 'Exchange de Bitcoin',
      url: 'https://example.com',
      logo: '/logo.png',
      ubicacion: 'México',
      tags: ['bitcoin'],
      destacado: true,
    },
    {
      id: '2',
      nombre: 'Educación Bitcoin',
      categoria: 'educacion',
      tier: 'partner',
      descripcion: 'Plataforma educativa',
      url: 'https://edu.com',
      logo: '/edu.png',
      ubicacion: 'México',
      tags: ['educación'],
      destacado: false,
    },
    {
      id: '3',
      nombre: 'Logística Crypto',
      categoria: 'logistica',
      tier: 'miembro',
      descripcion: 'Servicios logísticos',
      url: 'https://log.com',
      logo: '/log.png',
      ubicacion: 'México',
      tags: ['envíos'],
      destacado: false,
    },
    {
      id: '4',
      nombre: 'Comercio Bitcoin',
      categoria: 'comercio',
      tier: 'miembro',
      descripcion: 'Tienda accepting',
      url: 'https://shop.com',
      logo: '/shop.png',
      ubicacion: 'México',
      tags: ['retail'],
      destacado: true,
    },
  ]

  it('should return all proveedores when categoria is "todos"', () => {
    const result = filterByCategory(mockProveedores, 'todos')
    expect(result).toHaveLength(4)
    expect(result).toEqual(mockProveedores)
  })

  it('should filter by exchange category', () => {
    const result = filterByCategory(mockProveedores, 'exchange')

    expect(result).toHaveLength(1)
    expect(result[0].nombre).toBe('Exchange Bitcoin')
    expect(result[0].categoria).toBe('exchange')
  })

  it('should filter by educacion category', () => {
    const result = filterByCategory(mockProveedores, 'educacion')

    expect(result).toHaveLength(1)
    expect(result[0].nombre).toBe('Educación Bitcoin')
    expect(result[0].categoria).toBe('educacion')
  })

  it('should filter by logistica category', () => {
    const result = filterByCategory(mockProveedores, 'logistica')

    expect(result).toHaveLength(1)
    expect(result[0].nombre).toBe('Logística Crypto')
    expect(result[0].categoria).toBe('logistica')
  })

  it('should filter by comercio category', () => {
    const result = filterByCategory(mockProveedores, 'comercio')

    expect(result).toHaveLength(1)
    expect(result[0].nombre).toBe('Comercio Bitcoin')
    expect(result[0].categoria).toBe('comercio')
  })

  it('should return empty array when no proveedores match category', () => {
    const result = filterByCategory(mockProveedores, 'tecnologia')
    expect(result).toHaveLength(0)
  })

  it('should return empty array when given empty array', () => {
    const result = filterByCategory([], 'exchange')
    expect(result).toHaveLength(0)
  })
})

describe('getStats', () => {
  it('should return correct stats for mixed proveedores', () => {
    const proveedores: Proveedor[] = [
      {
        id: '1',
        nombre: 'Patrocinador 1',
        categoria: 'exchange',
        tier: 'patrocinador',
        descripcion: '',
        url: '',
        logo: '',
        ubicacion: '',
        tags: [],
        destacado: false,
      },
      {
        id: '2',
        nombre: 'Partner 1',
        categoria: 'educacion',
        tier: 'partner',
        descripcion: '',
        url: '',
        logo: '',
        ubicacion: '',
        tags: [],
        destacado: false,
      },
      {
        id: '3',
        nombre: 'Miembro 1',
        categoria: 'logistica',
        tier: 'miembro',
        descripcion: '',
        url: '',
        logo: '',
        ubicacion: '',
        tags: [],
        destacado: false,
      },
      {
        id: '4',
        nombre: 'Miembro 2',
        categoria: 'comercio',
        tier: 'miembro',
        descripcion: '',
        url: '',
        logo: '',
        ubicacion: '',
        tags: [],
        destacado: false,
      },
      {
        id: '5',
        nombre: 'Patrocinador 2',
        categoria: 'servicios',
        tier: 'patrocinador',
        descripcion: '',
        url: '',
        logo: '',
        ubicacion: '',
        tags: [],
        destacado: false,
      },
    ]

    const stats = getStats(proveedores)

    expect(stats.total).toBe(5)
    expect(stats.patrocinadores).toBe(2)
    expect(stats.partners).toBe(1)
    expect(stats.miembros).toBe(2)
    expect(stats.categorias).toBe(5)
  })

  it('should count only unique categories', () => {
    const proveedores: Proveedor[] = [
      {
        id: '1',
        nombre: 'Exchange 1',
        categoria: 'exchange',
        tier: 'patrocinador',
        descripcion: '',
        url: '',
        logo: '',
        ubicacion: '',
        tags: [],
        destacado: false,
      },
      {
        id: '2',
        nombre: 'Exchange 2',
        categoria: 'exchange',
        tier: 'partner',
        descripcion: '',
        url: '',
        logo: '',
        ubicacion: '',
        tags: [],
        destacado: false,
      },
      {
        id: '3',
        nombre: 'Educación 1',
        categoria: 'educacion',
        tier: 'miembro',
        descripcion: '',
        url: '',
        logo: '',
        ubicacion: '',
        tags: [],
        destacado: false,
      },
      {
        id: '4',
        nombre: 'Educación 2',
        categoria: 'educacion',
        tier: 'miembro',
        descripcion: '',
        url: '',
        logo: '',
        ubicacion: '',
        tags: [],
        destacado: false,
      },
    ]

    const stats = getStats(proveedores)

    expect(stats.total).toBe(4)
    expect(stats.categorias).toBe(2)
    expect(stats.patrocinadores).toBe(1)
    expect(stats.partners).toBe(1)
    expect(stats.miembros).toBe(2)
  })

  it('should return all zeros for empty array', () => {
    const stats = getStats([])

    expect(stats.total).toBe(0)
    expect(stats.patrocinadores).toBe(0)
    expect(stats.partners).toBe(0)
    expect(stats.miembros).toBe(0)
    expect(stats.categorias).toBe(0)
  })

  it('should handle single proveedor', () => {
    const proveedores: Proveedor[] = [
      {
        id: '1',
        nombre: 'Single',
        categoria: 'tecnologia',
        tier: 'partner',
        descripcion: '',
        url: '',
        logo: '',
        ubicacion: '',
        tags: [],
        destacado: false,
      },
    ]

    const stats = getStats(proveedores)

    expect(stats.total).toBe(1)
    expect(stats.patrocinadores).toBe(0)
    expect(stats.partners).toBe(1)
    expect(stats.miembros).toBe(0)
    expect(stats.categorias).toBe(1)
  })
})
