import type { Item } from '@/features/catalog/types'
import { ALL_CATEGORIES } from '@/features/catalog/catalogFilters'
import { ref, computed, type Ref, type ComputedRef, watch } from 'vue'
import { get, uniq } from 'lodash-es'
import { useDebouncedRef } from '../../../shared/composables/useDebouncedRef'
export function useCatalogFilters(
  items: Ref<Item[]>,
  category: Ref<string | undefined | null>,
  catalogSearch: Ref<string | undefined | null>,
) {
  const { value: search, debounced, setNow } = useDebouncedRef('', 300)

  watch(debounced, (newValue) => {
    catalogSearch.value = newValue
  })
  const categories = computed(() => uniq(items.value.map((item) => item.category)))

  const selectedCategory = computed({
    get() {
      return category?.value && categories.value.includes(category.value)
        ? category.value
        : ALL_CATEGORIES
    },
    set(value) {
      category.value = value !== ALL_CATEGORIES ? value : undefined
    },
  })
  category.value = selectedCategory.value !== ALL_CATEGORIES ? selectedCategory.value : undefined
  const onlyAvailable = ref(false)

  const itemsInSearch = computed(() =>
    items.value.filter((item) => item.name.toLowerCase().includes(debounced.value.toLowerCase())),
  )
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
    selectedCategory,
    search,
    onlyAvailable,
    visibleItems,
    hasActiveFilters,
    resetActiveFilters,
  }
}
