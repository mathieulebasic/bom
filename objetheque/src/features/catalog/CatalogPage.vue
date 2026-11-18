<template>
  <h1>Catalogue</h1>
  <CatalogFilters
    v-model:search="search"
    v-model:selectedCategory="selectedCategory"
    v-model:onlyAvailable="onlyAvailable"
    :categories="categories"
  />
  <h2>{{ visibleItems.length }} objets visibles sur {{ itemsInCategory.length }}</h2>
  <ItemList :items="visibleItems" />
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { fakeItems } from './fakeItems'
import CatalogFilters from './components/CatalogFilters.vue'
import ItemList from './components/ItemList.vue'
import { uniq, debounce } from 'lodash-es'
import type { Item } from './types'
import { ALL_CATEGORIES } from './CatalogFilters'
const search = ref('')
const appliedSearch = ref('')
const items = ref<Item[]>(fakeItems)
const onlyAvailable = ref(false)
const selectedCategory = ref(ALL_CATEGORIES)

const applySearch = debounce((value: string) => {
  appliedSearch.value = value
}, 300)

watch(search, (value) => {
  applySearch(value)
})

const matchingItemsWithSearch = computed(() =>
  items.value.filter((item) => item.name.toLowerCase().includes(appliedSearch.value.toLowerCase())),
)
const itemsInCategory = computed(() =>
  selectedCategory.value === ALL_CATEGORIES
    ? matchingItemsWithSearch.value
    : matchingItemsWithSearch.value.filter((item) => item.category === selectedCategory.value),
)

const visibleItems = computed(() => {
  return onlyAvailable.value
    ? itemsInCategory.value.filter((item) => item.available)
    : itemsInCategory.value
})

const categories = computed(() => {
  return uniq(items.value.map((item) => item.category))
})
</script>
