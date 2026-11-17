<template>
  <p v-if="items.length === 0">Aucun objet à afficher</p>
  <div v-else class="grid">
    <ItemCard v-for="item in items" :key="item.id" :item="item" />
  </div>
</template>

<script setup lang="ts">
import type { Item } from '../types'
import ItemCard from './ItemCard.vue'
defineProps<{
  items: Item[]
}>()
</script>
