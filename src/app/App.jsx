import { useEffect } from 'react'
import { Layout } from '../components/layout/Layout'
import { useLanguage } from '../context/LanguageContext'
import { useRouter } from '../context/RouterContext'
import { ContactPage } from '../pages/ContactPage'
import { ExperiencePage } from '../pages/ExperiencePage'
import { HomePage } from '../pages/HomePage'
import { ProjectsPage } from '../pages/ProjectsPage'

export function App() {
  const { path } = useRouter()
  const { t } = useLanguage()

  useEffect(() => {
    const page = path.slice(1) || 'home'
    document.title = t.meta[page] ?? t.meta.home
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [path, t])

  const pages = {
    '/': <HomePage />,
    '/experience': <ExperiencePage />,
    '/projects': <ProjectsPage />,
    '/contacts': <ContactPage />,
  }
  return <Layout>{pages[path] ?? <HomePage />}</Layout>
}
