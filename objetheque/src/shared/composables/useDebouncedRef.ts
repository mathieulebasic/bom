import { ref, watch, onScopeDispose, type Ref } from 'vue'
import { debounce } from 'lodash-es'

export function useDebouncedRef<T>(initial: T, delay = 300) {
  const searchValue = ref(initial) as Ref<T>
  const debounced = ref(initial) as Ref<T>

  const update = debounce((next: T) => {
    debounced.value = next
  }, delay)

  watch(searchValue, (next) => {
    update(next)
  })

  function setNow(next: T) {
    update.cancel()
    searchValue.value = next
    debounced.value = next
  }

  onScopeDispose(() => update.cancel())

  return { searchValue, debounced, setNow }
}
