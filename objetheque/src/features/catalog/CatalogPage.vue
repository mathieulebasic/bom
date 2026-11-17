<template>
<h1>Catalogue</h1>
<label>
    <input type="checkbox" v-model="onlyAvailable" /> Disponibles seulement
</label>
<select v-model="selectedCategory">
    <option value="">Toutes les catégories</option>
    <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
</select>
<h2>{{  visibleItemsCount }} objets disponibles sur {{  filteredItemsCount }}</h2>
<ItemList :items="visibleItems" />
</template>

<script lang="ts" setup>
import {ref, computed} from 'vue'
import { fakeItems } from './fakeItems.ts'
import ItemList from './components/ItemList.vue'
import _ from 'lodash';
import type { Item } from './types.ts';

const items = ref(fakeItems)
const onlyAvailable = ref(false)

const filteredItems = computed(() => 
    {if (selectedCategory.value != "" && selectedCategory.value != "Toutes les catégories")
    {
        return items.value.filter(item => item.category === selectedCategory.value)
    }
    else {
        return items.value
    }
}
)
const visibleItems = computed(() => {
    let filteredItems = items.value
    if (selectedCategory.value != "" && selectedCategory.value != "Toutes les catégories")
    {
        filteredItems = items.value.filter(item => item.category === selectedCategory.value)
    }
    return onlyAvailable.value ? filteredItems.filter(item => item.available) : filteredItems
})
const selectedCategory = ref('')


const filteredItemsCount = computed(() => {return itemsCount(filteredItems.value)})
const visibleItemsCount = computed(() => {return itemsCount(visibleItems.value)})

var itemsCount = (itemsArray: Item[]) => {return _.size(itemsArray)}

const categories = computed(() => {
    return _.uniq(items.value.map(item => item.category))
})

</script>