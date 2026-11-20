<template>
  <h1>Catalogue</h1>
  <pre> {{ search }}</pre>
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
import { useCatalogFilters } from './composables/useCatalogFilters'
import { useQueryParam } from '@/shared/composables/useQueryParam'

const items = ref<Item[]>(fakeItems)
const route = useRoute()
const router = useRouter()

const rawCategory = useQueryParam(router, route, 'category')
const rawSearch = useQueryParam(router, route, 'search')
const rawOnlyAvailable = useQueryParam(router, route, 'onlyAvailable')

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
