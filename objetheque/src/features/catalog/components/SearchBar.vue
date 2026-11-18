<template>
    <input type="text" v-model="search" placeholder="Rechercher un produit" />
</template>

<script lang="ts" setup>
 const search = defineModel<string>({required: true})
</script>