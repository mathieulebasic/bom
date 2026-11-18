<template>
  <label> <input type="checkbox" v-model="onlyAvailable" /> Disponibles seulement </label>
  <SearchBar v-model="search" />
  <ResetButton @reset="selectedCategory = ALL_CATEGORIES" />
  <select v-model="selectedCategory">
    <option :value="ALL_CATEGORIES">Toutes les catégories</option>
    <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
  </select>
</template>

<script lang="ts" setup>
import ResetButton from './ResetButton.vue'
import SearchBar from './SearchBar.vue'

defineProps<{
  categories: string[]
}>()
const ALL_CATEGORIES = 'toutes'

const search = defineModel<string>('search', {required: true})
const selectedCategory = defineModel<string>('selectedCategory', {required: true})
const onlyAvailable = defineModel<boolean>('onlyAvailable', {required: true})

</script>