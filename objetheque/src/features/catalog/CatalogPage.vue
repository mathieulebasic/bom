<template>
  <h1>Catalogue</h1>
  <CatalogFilters
    v-model:search="searchValue"
    v-model:selectedCategory="selectedCategory"
    v-model:onlyAvailable="onlyAvailable"
    :categories="categories"
    :hasActiveFilters="hasActiveFilters"
    @reset="resetActiveFilters"
  />
  <h2>{{ visibleItems.length }} objets visibles sur {{ items.length }}</h2>
  -->
  <ItemList :items="visibleItems" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { fakeItems } from './fakeItems'
import CatalogFilters from './components/CatalogFilters.vue'
import ItemList from './components/ItemList.vue'
import type { Item } from './types'
import { useCatalogFilter } from '@/shared/composables/useCatalogFilter.ts'

const items = ref<Item[]>(fakeItems)
const {
  categories,
  searchValue,
  selectedCategory,
  onlyAvailable,
  visibleItems,
  hasActiveFilters,
  resetActiveFilters,
} = useCatalogFilter(items)
</script>
