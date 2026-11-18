import { ref, watch, onScopeDispose, type Ref } from 'vue'
import { debounce } from 'lodash-es'

export function useDebouncedRef<T>(initial: T, delay = 300) {
  const value = ref(initial) as Ref<T>
  const debounced = ref(initial) as Ref<T>

  const update = debounce((next: T) => {
    debounced.value = next
  }, delay)

  watch(value, (next) => {
    update(next)
  })

  function setNow(next: T) {
    update.cancel()
    value.value = next
    debounced.value = next
  }

  onScopeDispose(() => update.cancel())

  return { value, debounced, setNow }
}
