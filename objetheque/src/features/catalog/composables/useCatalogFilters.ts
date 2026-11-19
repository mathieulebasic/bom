import type { Item } from '@/features/catalog/types'
import { ALL_CATEGORIES } from '@/features/catalog/catalogFilters'
import { ref, computed, type Ref } from 'vue'
import { uniq } from 'lodash-es'
import { useDebouncedRef } from '../../../shared/composables/useDebouncedRef'
export function useCatalogFilters(items: Ref<Item[]>) {
  const { value: search, debounced, setNow } = useDebouncedRef('', 300)
  const selectedCategory = ref(ALL_CATEGORIES)
  const onlyAvailable = ref(false)

  const itemsInSearch = computed(() =>
    items.value.filter((item) => item.name.toLowerCase().includes(debounced.value.toLowerCase())),
  )
  const categories = computed(() => uniq(items.value.map((item) => item.category)))
  const itemsInCategory = computed(() =>
    selectedCategory.value === ALL_CATEGORIES
      ? itemsInSearch.value
      : itemsInSearch.value.filter((item) => item.category === selectedCategory.value),
  )

  const visibleItems = computed(() => {
    return itemsInCategory.value.filter((item) => !onlyAvailable.value || item.available)
  })

  const resetActiveFilters = () => {
    selectedCategory.value = ALL_CATEGORIES
    onlyAvailable.value = false
    setNow('')
  }
  const hasActiveFilters = computed(
    () => selectedCategory.value !== ALL_CATEGORIES || onlyAvailable.value || search.value !== '',
  )

  return {
    categories,
    search,
    selectedCategory,
    onlyAvailable,
    visibleItems,
    hasActiveFilters,
    resetActiveFilters,
  }
}
