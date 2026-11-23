import { it, describe, expect, vi, beforeEach, afterEach } from 'vitest'
import { useDebouncedRef } from './useDebouncedRef'
import { nextTick, ref, effectScope } from 'vue'

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

describe('useDebouncedRef', () => {
  it('valeur cible est mise à jour juste après le délai', async () => {
    const debounced = ref('')
    const scope = effectScope()
    const { value } = scope.run(() => useDebouncedRef('', debounced, 30000))!
    value.value = 'newSearch'
    await nextTick()
    expect(debounced.value).toBe('')
    vi.advanceTimersByTime(299)
    vi.advanceTimersByTime(1)
    expect(debounced.value).toBe('newSearch')
  })
  it("plusieurs frappes rapides ne déclenchent qu'une seule mise à jour", async () => {
    const debounced = ref('')
    const scope = effectScope()
    const { value } = scope.run(() => useDebouncedRef('', debounced, 300))!
    value.value = 'a'
    await nextTick()
    value.value = 'ab'
    await nextTick()
    value.value = 'abc'
    await nextTick()
    expect(debounced.value).toBe('')
    vi.advanceTimersByTime(300)
    expect(debounced.value).toBe('abc')
  })

  it("setNow applique immédiatement et annule l'attente", async () => {
    const debounced = ref('')
    const scope = effectScope()
    const { value, setNow } = scope.run(() => useDebouncedRef('', debounced, 300))!
    value.value = 'onHoldSearch'
    await nextTick()
    expect(debounced.value).toBe('')
    setNow('setNowSearch')
    await nextTick()
    expect(debounced.value).toBe('setNowSearch')
  })

  it('changer la valeur cible met à jour la valeur brouillon', async () => {
    const debounced = ref('')
    const { value } = useDebouncedRef('', debounced, 300)
    debounced.value = 'newValue'
    await nextTick()
    expect(value.value).toBe('newValue')
  })

  it('stop annule les mises à jour en attente', async () => {
    const debounced = ref('')
    const scope = effectScope()
    const { value } = scope.run(() => useDebouncedRef('', debounced, 300))!
    value.value = 'onHoldSearch'
    await nextTick()
    expect(debounced.value).toBe('')
    scope.stop()
    vi.advanceTimersByTime(300)
    expect(debounced.value).toBe('')
  })
})
