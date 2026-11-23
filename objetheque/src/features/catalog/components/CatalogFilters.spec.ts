import { it, describe, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CatalogFilters from './CatalogFilters.vue'

describe('Catalog filters : Le bouton', async () => {
  const wrapper = mount(CatalogFilters, {
    props: {
      categories: ['category1', 'category2'],
      hasActiveFilters: true,
      search: 'searchTerm',
      selectedCategory: 'category1',
      onlyAvailable: true,
    },
  })
  it('devrait émettre un évènement reset', async () => {
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('reset')).toHaveLength(1)
  })
  it('les valeurs de catégories sont dans le select', async () => {
    const options = wrapper.findAll('select option')
    const optionValues = options.map((option) => option.element.textContent)
    expect(optionValues).toEqual(['Toutes les catégories', 'category1', 'category2'])
  })
})

describe('Catalog filters : Le bouton est disabled', async () => {
  const wrapper = mount(CatalogFilters, {
    props: {
      categories: ['category1', 'category2'],
      hasActiveFilters: false,
      search: '',
      selectedCategory: '',
      onlyAvailable: false,
    },
  })
  it('devrait être disabled', async () => {
    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()
  })
})
