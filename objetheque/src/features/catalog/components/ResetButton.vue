<template>
    <button @click="emit('reset')">Réinitialiser</button>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue'

const emit = defineEmits<{
  reset: []
}>()
</script>