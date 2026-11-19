<script setup lang="ts"></script>

<template>
  <header>
    <RouterLink :to="{ name: 'catalog' }">Catalog</RouterLink>
  </header>
  <RouterView />
</template>

<style scoped></style>
