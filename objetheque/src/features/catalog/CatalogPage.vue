<template>
  <h1>Catalogue</h1>
  <label> <input type="checkbox" v-model="onlyAvailable" /> Disponibles seulement </label>
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
import {uniq} from 'lodash-es'
import type { Item } from './types'

const ALL_CATEGORIES = 'toutes'
const items = ref<Item[]>(fakeItems)
const onlyAvailable = ref(false)
const selectedCategory = ref('ALL_CATEGORIES')

const itemsInCategory = computed(() => {
  if (selectedCategory.value !== '' && selectedCategory.value !== ALL_CATEGORIES) {
    return items.value.filter((item) => item.category === selectedCategory.value)
  } else {
    return items.value
  }
})
const visibleItems = computed(() => {
  return onlyAvailable.value
    ? itemsInCategory.value.filter((item) => item.available)
    : itemsInCategory.value
})

const categories = computed(() => {
  return uniq(items.value.map((item) => item.category))
})
</script>
