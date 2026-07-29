import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const RouterContext = createContext(null)

function normalizePath(path) {
  const normalized = path.split('?')[0].split('#')[0].replace(/\/+$/, '')
  return normalized || '/'
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname))

  useEffect(() => {
    const handlePopState = () => setPath(normalizePath(window.location.pathname))
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = useCallback(target => {
    const nextPath = normalizePath(target)
    if (nextPath === path) return
    window.history.pushState({}, '', nextPath)
    setPath(nextPath)
  }, [path])

  const value = useMemo(() => ({ path, navigate }), [path, navigate])
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useRouter() {
  const context = useContext(RouterContext)
  if (!context) throw new Error('useRouter must be used inside RouterProvider')
  return context
}

export function Link({ to, children, className = '', ...props }) {
  const { navigate } = useRouter()
  return <a href={to} className={className} onClick={event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    navigate(to)
  }} {...props}>{children}</a>
}

export function NavLink({ to, children, end = false }) {
  const { path } = useRouter()
  const active = end ? path === to : path.startsWith(to)
  return <Link to={to} className={active ? 'active' : ''}>{children}</Link>
}
