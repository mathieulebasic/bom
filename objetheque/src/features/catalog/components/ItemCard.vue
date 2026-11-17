<template>
    <article>
        <h3>{{ item.name }}</h3>
        <p>{{ item.category }}</p>
        <span v-if="item.available">✅ Disponible</span>
        <span v-else>❌ Indisponible</span>
    </article>
</template>

<script setup lang="ts">
import type { Item } from '../types'

defineProps<{
    item: Item
}>()
</script>