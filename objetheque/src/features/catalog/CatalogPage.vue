<template>
  <h1>Catalogue</h1>
  <CatalogFilters
    v-model:search="search"
    v-model:selectedCategory="selectedCategory"
    v-model:onlyAvailable="onlyAvailable"
    :categories="categories"
    :hasActiveFilters="hasActiveFilters"
    @reset="resetActiveFilters"
  />
  <h2>{{ visibleItems.length }} objets visibles sur {{ items.length }}</h2>
  <ItemList :items="visibleItems" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { fakeItems } from './fakeItems'
import CatalogFilters from './components/CatalogFilters.vue'
import ItemList from './components/ItemList.vue'
import type { Item } from './types'
import { useCatalogFilters } from '@/features/catalog/composables/useCatalogFilters.ts'

const items = ref<Item[]>(fakeItems)
const {
  categories,
  search,
  selectedCategory,
  onlyAvailable,
  visibleItems,
  hasActiveFilters,
  resetActiveFilters,
} = useCatalogFilters(items)
</script>
