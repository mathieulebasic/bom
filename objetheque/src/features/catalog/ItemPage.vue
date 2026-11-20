<template>
  <div v-if="item === undefined">
    Objet non trouvé, retournez au <RouterLink :to="{ name: 'catalog' }">Catalogue</RouterLink>
  </div>
  <div v-else>
    <h2>{{ item.name }}</h2>
    <p>{{ item.category }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { fakeItems } from './fakeItems'

const props = defineProps<{
  id: string
}>()

const item = computed(() => fakeItems.find((i) => i.id === props.id))
</script>
