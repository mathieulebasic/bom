import type { Item } from '@/features/catalog/types'
import { ALL_CATEGORIES } from '@/features/catalog/catalogFilters'
import { computed, type Ref } from 'vue'
import { uniq } from 'lodash-es'
import { useDebouncedRef } from '../../../shared/composables/useDebouncedRef'
export function useCatalogFilters(
  items: Ref<Item[]>,
  rawCategory: Ref<string | undefined | null>,
  rawSearch: Ref<string | undefined | null>,
  rawOnlyAvailable: Ref<string | undefined | null>,
) {
  const debounced = computed({
    get() {
      return rawSearch.value ?? ''
    },
    set(value) {
      rawSearch.value = value
    },
  })

  const { value: search, setNow } = useDebouncedRef(rawSearch.value ?? '', debounced, 3000)

  const categories = computed(() => uniq(items.value.map((item) => item.category)))

  const selectedCategory = computed({
    get() {
      return rawCategory.value && categories.value.includes(rawCategory.value)
        ? rawCategory.value
        : ALL_CATEGORIES
    },
    set(value) {
      rawCategory.value = value !== ALL_CATEGORIES ? value : undefined
    },
  })
  const onlyAvailable = computed({
    get() {
      return rawOnlyAvailable.value === 'true'
    },
    set(value) {
      rawOnlyAvailable.value = value ? 'true' : undefined
    },
  })

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
