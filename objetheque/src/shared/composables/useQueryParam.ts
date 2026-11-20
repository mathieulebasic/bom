import type { RouteLocationNormalizedLoadedGeneric, Router } from 'vue-router'
import { computed } from 'vue'
export function useQueryParam(
  router: Router,
  route: RouteLocationNormalizedLoadedGeneric,
  param: string,
) {
  const value = computed({
    get() {
      return typeof route.query[param] === 'string' ? route.query[param] : undefined
    },
    set(value) {
      router.replace({
        query: { ...route.query, [param]: value !== '' ? value : undefined },
      })
    },
  })

  return value
}
