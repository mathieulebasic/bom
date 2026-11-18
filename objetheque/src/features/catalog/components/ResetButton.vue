<template>
  <button @click="emit('reset')" :disabled="inactiveFilters">Réinitialiser</button>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue'

defineProps<{
  inactiveFilters: boolean
}>()

const emit = defineEmits<{
  reset: []
}>()
</script>
