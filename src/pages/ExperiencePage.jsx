import { Check, Code2 } from 'lucide-react'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Reveal } from '../components/ui/Reveal'
import { Tags } from '../components/ui/Tags'
import { useLanguage } from '../context/LanguageContext'

const technologyTags = ['.NET 10', 'ASP.NET Core', 'PostgreSQL', 'EF Core', 'Stateless', 'MediatR', 'FluentValidation', 'JWT + Refresh', 'Docker']

export function ExperiencePage() {
  const { t } = useLanguage()
  const page = t.experience

  return (
    <section className="container page">
      <Eyebrow>{page.eyebrow}</Eyebrow>
      <h1>{page.title}</h1>
      <p className="page-lead">{page.lead}</p>

      <Reveal as="article" className="case-study">
        <header className="case-header">
          <div><div className="date">{page.date}</div><h2>Project Lifecycle Service</h2><p>{page.role}</p></div>
          <a className="button button-secondary button-small" href="https://github.com/markld-ui/RedRamkaPractice" target="_blank" rel="noreferrer"><Code2 aria-hidden="true" />{t.common.repository}</a>
        </header>

        <p className="case-intro">{page.intro}</p>
        <div className="case-metrics">{page.metrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>

        <section className="case-section">
          <small>{page.lifecycleTitle}</small>
          <div className="lifecycle" role="list" aria-label={page.lifecycleTitle}>
            {page.stages.map((stage, index) => (
              <div className={`lifecycle-stage ${index === page.stages.length - 1 ? 'is-archived' : ''}`} role="listitem" key={stage}>
                <span>{String(index + 1).padStart(2, '0')}</span>{stage}
              </div>
            ))}
          </div>
          <p>{page.lifecycleText}</p>
        </section>

        <section className="case-section">
          <small>{page.architectureTitle}</small>
          <div className="layer-grid">
            {page.layers.map(([index, title, text]) => <article key={index}><span>{index}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>

        <section className="case-bottom">
          <div><small>{page.accessLabel}</small><h3>{page.accessTitle}</h3><p>{page.accessText}</p></div>
          <ul>{page.highlights.map(item => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
        </section>
        <Tags items={technologyTags} />
      </Reveal>

      <Reveal as="article" className="earlier-role">
        <div className="date">{page.earlier.date}</div>
        <h2>{page.earlier.title}</h2>
        <p>{page.earlier.text}</p>
        <Tags items={['ASP.NET Core', 'EF Core', 'SQL Server', 'RBAC', 'Swagger']} />
      </Reveal>
    </section>
  )
}
