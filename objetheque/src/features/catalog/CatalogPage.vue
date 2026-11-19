<template>
  <h1>Catalogue</h1>
  <pre>{{ category }}</pre>
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
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fakeItems } from './fakeItems'
import CatalogFilters from './components/CatalogFilters.vue'
import ItemList from './components/ItemList.vue'
import type { Item } from './types'
import { useCatalogFilters } from '@/features/catalog/composables/useCatalogFilters.ts'
import { ALL_CATEGORIES } from './catalogFilters.ts'

const items = ref<Item[]>(fakeItems)
const route = useRoute()
const router = useRouter()

const category = computed({
  get() {
    return route.query.category
  },
  set(value) {
    router.replace({
      query: { ...route.query, category: value != ALL_CATEGORIES ? value : undefined },
    })
  },
})

const {
  categories,
  search,
  selectedCategory,
  onlyAvailable,
  visibleItems,
  hasActiveFilters,
  resetActiveFilters,
} = useCatalogFilters(items, category)
</script>
