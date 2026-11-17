<template>
  <h1>Catalogue</h1>
  <label> <input type="checkbox" v-model="onlyAvailable" /> Disponibles seulement </label>
  <select v-model="selectedCategory">
    <option :value="allCategoriesValue">Toutes les catégories</option>
    <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
  </select>
  <h2>{{ visibleItems.length }} objets visibles sur {{ filteredItems.length }}</h2>
  <ItemList :items="visibleItems" />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { fakeItems } from './fakeItems'
import ItemList from './components/ItemList.vue'
import _ from 'lodash'
import type { Item } from './types'

const allCategoriesValue = 'toutes'
const items = ref<Item[]>(fakeItems)
const onlyAvailable = ref(false)
const selectedCategory = ref('')

const filteredItems = computed(() => {
  if (selectedCategory.value !== '' && selectedCategory.value !== allCategoriesValue) {
    return items.value.filter((item) => item.category === selectedCategory.value)
  } else {
    return items.value
  }
})
const visibleItems = computed(() => {
  return onlyAvailable.value
    ? filteredItems.value.filter((item) => item.available)
    : filteredItems.value
})

const categories = computed(() => {
  return _.uniq(items.value.map((item) => item.category))
})
</script>
