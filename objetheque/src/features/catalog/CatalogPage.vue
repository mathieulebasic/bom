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
import { useRoute, useRouter } from 'vue-router'
import { fakeItems } from './fakeItems'
import CatalogFilters from './components/CatalogFilters.vue'
import ItemList from './components/ItemList.vue'
import type { Item } from './types'
import { useCatalogFilters } from '@/features/catalog/composables/useCatalogFilters.ts'
import { useQueryParams } from '@/shared/composables/useQueryParams.ts'

const items = ref<Item[]>(fakeItems)
const route = useRoute()
const router = useRouter()

const rawCategory = useQueryParams(router, route, 'category')
const rawSearch = useQueryParams(router, route, 'search')
const rawOnlyAvailable = useQueryParams(router, route, 'onlyAvailable')

const {
  categories,
  search,
  selectedCategory,
  onlyAvailable,
  visibleItems,
  hasActiveFilters,
  resetActiveFilters,
} = useCatalogFilters(items, rawCategory, rawSearch, rawOnlyAvailable)
</script>
