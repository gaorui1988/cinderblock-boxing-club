import { useCallback, useEffect, useMemo, useState } from 'react'

export function useQueryState() {
  const [search, setSearch] = useState(() => window.location.search)

  useEffect(() => {
    const onPop = () => setSearch(window.location.search)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const params = useMemo(() => new URLSearchParams(search), [search])

  const replace = useCallback((mutate: (params: URLSearchParams) => void) => {
    const url = new URL(window.location.href)
    mutate(url.searchParams)
    const qs = url.searchParams.toString()
    const next = `${url.pathname}${qs ? `?${qs}` : ''}${url.hash}`
    window.history.replaceState(null, '', next)
    setSearch(url.search)
  }, [])

  return { params, replace }
}
