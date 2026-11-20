<template>
  <label> <input type="checkbox" v-model="onlyAvailable" /> Disponibles seulement </label>
  <SearchBar v-model="search" />
  <button @click="emit('reset')" :disabled="!hasActiveFilters">Réinitialiser</button>
  <select v-model="selectedCategory">
    <option :value="ALL_CATEGORIES">Toutes les catégories</option>
    <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
  </select>
</template>

<script lang="ts" setup>
import SearchBar from './SearchBar.vue'
import { ALL_CATEGORIES } from '../catalogFilters.ts'

const emit = defineEmits<{
  reset: []
}>()

defineProps<{
  categories: string[]
  hasActiveFilters: boolean
}>()

const search = defineModel<string>('search', { required: true })
const selectedCategory = defineModel<string>('selectedCategory', { required: true })
const onlyAvailable = defineModel<boolean>('onlyAvailable', { required: true })
</script>
