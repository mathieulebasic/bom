<template>
  <h1>Catalogue</h1>
  <label> <input type="checkbox" v-model="onlyAvailable" /> Disponibles seulement </label>
  <SearchBar v-model="search" />
  <ResetButton @reset="selectedCategory = ALL_CATEGORIES" />
  <select v-model="selectedCategory">
    <option :value="ALL_CATEGORIES">Toutes les catégories</option>
    <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
  </select>
  <h2>{{ visibleItems.length }} objets visibles sur {{ itemsInCategory.length }}</h2>
  <ItemList :items="visibleItems" />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { fakeItems } from './fakeItems'
import ItemList from './components/ItemList.vue'
import ResetButton from './components/ResetButton.vue'
import SearchBar from './components/SearchBar.vue'
import { uniq } from 'lodash-es'
import type { Item } from './types'

const ALL_CATEGORIES = 'toutes'

const search = ref('')
const items = ref<Item[]>(fakeItems)
const onlyAvailable = ref(false)
const selectedCategory = ref(ALL_CATEGORIES)


const matchingItemsWithSearch = computed(() =>
  items.value.filter((item) =>
    item.name.toLowerCase().includes(search.value.toLowerCase())
  )
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
