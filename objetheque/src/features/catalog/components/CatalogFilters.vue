<template>
  <label> <input type="checkbox" v-model="onlyAvailable" /> Disponibles seulement </label>
  <SearchBar v-model="search" />
  <ResetButton @reset="resetFilters" :inactiveFilters="inactiveFilters" />
  <select v-model="selectedCategory">
    <option :value="ALL_CATEGORIES">Toutes les catégories</option>
    <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
  </select>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import ResetButton from './ResetButton.vue'
import SearchBar from './SearchBar.vue'
import { ALL_CATEGORIES } from '../CatalogFilters'
defineProps<{
  categories: string[]
}>()

const search = defineModel<string>('search', { required: true })
const selectedCategory = defineModel<string>('selectedCategory', { required: true })
const onlyAvailable = defineModel<boolean>('onlyAvailable', { required: true })

const resetFilters = () => {
  selectedCategory.value = ALL_CATEGORIES
  onlyAvailable.value = false
  search.value = ''
}

const inactiveFilters = computed(() => {
  return selectedCategory.value === ALL_CATEGORIES && !onlyAvailable.value && search.value === ''
})
</script>
