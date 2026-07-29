import { ArrowUpRight } from 'lucide-react'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Reveal } from '../components/ui/Reveal'
import { Tags } from '../components/ui/Tags'
import { useLanguage } from '../context/LanguageContext'

export function ProjectsPage() {
  const { t } = useLanguage()
  const page = t.projects

  return (
    <section className="container page">
      <Eyebrow>{page.eyebrow}</Eyebrow>
      <h1>{page.title}</h1>
      <p className="page-lead">{page.lead}</p>
      <div className="projects-grid">
        {page.items.map(project => (
          <Reveal as="article" className="project-card" key={project.badge}>
            <div className="project-top"><small>{project.badge}</small><span>{project.status}</span></div>
            <h2>{project.title}</h2>
            <p className="project-description">{project.description}</p>
            <dl>
              <div><dt>{page.labels.task}</dt><dd>{project.task}</dd></div>
              <div><dt>{page.labels.contribution}</dt><dd>{project.contribution}</dd></div>
              <div><dt>{page.labels.result}</dt><dd>{project.result}</dd></div>
            </dl>
            <Tags items={project.tags} />
            <a className="project-link" href={project.href} target="_blank" rel="noreferrer">{t.common.githubCode}<ArrowUpRight aria-hidden="true" /></a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
