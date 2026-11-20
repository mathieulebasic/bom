<template>
  <div v-if="item === undefined">
    Objet no trouvé, retourenz au <RouterLink :to="{ name: 'catalog' }">Catalogue</RouterLink>
  </div>
  <div v-else>
    <h2>{{ item.name }}</h2>
    <p>{{ item.category }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { fakeItems } from './fakeItems'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  id: string
}>()

const item = computed(() => fakeItems.find((i) => i.id === props.id))
</script>
