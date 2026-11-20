<script setup lang="ts"></script>

<template>
  <header>
    <RouterLink :to="{ name: 'catalog' }">Catalogue</RouterLink>
  </header>
  <RouterView />
</template>

<style scoped></style>
