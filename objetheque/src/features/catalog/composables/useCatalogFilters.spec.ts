import { it, describe, expect } from 'vitest'
import { useCatalogFilters } from './useCatalogFilters'
import { ref, nextTick, effectScope } from 'vue'
import { ALL_CATEGORIES } from '../catalogFilters'
import type { Item } from '../types'

function setup(query: { category?: string; search?: string; onlyAvailable?: string }) {
  const items = ref<Item[]>([
    { id: '1', name: 'Perceuse', category: 'Bricolage', available: true },
    { id: '2', name: 'Appareil à raclette', category: 'Cuisine', available: false },
    { id: '3', name: 'Tente', category: 'Plein air', available: true },
  ])

  const rawCategory = ref<string | undefined>(query.category)
  const rawSearch = ref<string | undefined>(query.search)
  const rawOnlyAvailable = ref<string | undefined>(query.onlyAvailable)

  const scope = effectScope()
  const filters = scope.run(() =>
    useCatalogFilters(items, rawCategory, rawSearch, rawOnlyAvailable),
  )!
  return { items, rawCategory, rawSearch, rawOnlyAvailable, ...filters }
}
describe('useCatalogFilters : catégorie', () => {
  it("ignore une catégorie inconnue dans l'URL", () => {
    const { selectedCategory, visibleItems } = setup({ category: 'Nimportequoi' })
    expect(selectedCategory.value).toBe(ALL_CATEGORIES)
    expect(visibleItems.value).toHaveLength(3)
  })

  it('filtre les articles sur une catégorie connue', () => {
    const { selectedCategory, visibleItems } = setup({ category: 'Bricolage' })
    expect(selectedCategory.value).toBe('Bricolage')
    expect(visibleItems.value).toHaveLength(1)
  })

  it('choisir toutes supprime le paramètre brut de la catégorie', () => {
    const { selectedCategory, rawCategory } = setup({ category: 'Bricolage' })
    selectedCategory.value = ALL_CATEGORIES
    expect(rawCategory.value).toBeUndefined()
  })

  it('filtre les articles disponibles uniquement', () => {
    const { rawOnlyAvailable, visibleItems } = setup({ onlyAvailable: 'true' })
    expect(rawOnlyAvailable.value).toBe('true')
    expect(visibleItems.value).toHaveLength(2)
  })

  it('la fonction resetActiveFilters remet tous les filtres à zero', () => {
    const {
      rawOnlyAvailable,
      rawCategory,
      rawSearch,
      selectedCategory,
      search,
      onlyAvailable,
      hasActiveFilters,
      resetActiveFilters,
    } = setup({ category: 'Bricolage', search: 'Perceuse', onlyAvailable: 'true' })

    resetActiveFilters()
    expect(rawOnlyAvailable.value).toBeUndefined()
    expect(rawCategory.value).toBeUndefined()
    expect(rawSearch.value).toBe('')
    expect(selectedCategory.value).toBe(ALL_CATEGORIES)
    expect(search.value).toBe('')
    expect(onlyAvailable.value).toBe(false)
    expect(hasActiveFilters.value).toBe(false)
  })

  it('hasActiveFilters retourne true lorsque deux filtres sont actifs', () => {
    const { hasActiveFilters } = setup({ category: 'Bricolage', search: 'Perceuse' })
    expect(hasActiveFilters.value).toBe(true)
  })

  it('search change lorsque rawSearch change', async () => {
    const { rawSearch, search } = setup({ search: 'Perceuse' })
    rawSearch.value = 'Tournevis'
    await nextTick()
    expect(search.value).toBe('Tournevis')
  })

  it('la recherche rawSearch ignore la casse', () => {
    const { visibleItems } = setup({ search: 'PERceuse' })
    expect(visibleItems.value).toHaveLength(1)
  })
})
