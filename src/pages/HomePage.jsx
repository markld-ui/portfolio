import { ArrowUpRight, BriefcaseBusiness, Check, Code2, Download, GraduationCap, Mail } from 'lucide-react'
import { SkillRadar } from '../components/skills/SkillRadar'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Reveal } from '../components/ui/Reveal'
import { Tags } from '../components/ui/Tags'
import { useLanguage } from '../context/LanguageContext'
import { Link } from '../context/RouterContext'

export function HomePage() {
  const { t } = useLanguage()
  const page = t.home

  return (
    <>
      <section className="container hero">
        <div className="hero-copy">
          <Eyebrow>{page.kicker}</Eyebrow>
          <h1>{page.title}<span>{page.accent}</span></h1>
          <p className="lead">{page.lead}</p>
          <div className="hero-actions">
            <Link className="button" to="/contacts"><Mail aria-hidden="true" />{page.contact}</Link>
            <a className="button button-secondary" href="https://github.com/markld-ui" target="_blank" rel="noreferrer"><Code2 aria-hidden="true" />{page.code}</a>
            <a className="button button-secondary" href="/roman-slinkov-resume.pdf" download><Download aria-hidden="true" />{t.common.resume}</a>
          </div>
        </div>

        <div className="portrait">
          <div className="portrait-glow" aria-hidden="true" />
          <div className="portrait-orbit portrait-orbit-outer" aria-hidden="true" />
          <div className="portrait-orbit portrait-orbit-inner" aria-hidden="true" />
          <div className="portrait-image"><img src="/assets/roman.jpg" alt={t.common.name} /></div>
          {page.portraitBadges.map((badge, index) => <span className={`portrait-badge portrait-badge-${index + 1}`} aria-hidden="true" key={badge}>{badge}</span>)}
          <div className="status-pill"><span aria-hidden="true" />{page.available}</div>
        </div>
      </section>

      <Reveal as="section" className="container section about">
        <div className="about-copy">
          <Eyebrow>{page.aboutEyebrow}</Eyebrow>
          <h2>{page.aboutTitle}</h2>
          <p>{page.aboutText}</p>
          <div className="about-facts">
            <span><GraduationCap aria-hidden="true" />{page.education}</span>
            <span><BriefcaseBusiness aria-hidden="true" />{page.junior}</span>
          </div>
        </div>
        <aside className="availability-card">
          <div className="availability-label"><span aria-hidden="true" />{page.availabilityLabel}</div>
          <h3>{page.availabilityTitle}</h3>
          <ul>{page.availabilityItems.map(item => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
          <a href="/roman-slinkov-resume.pdf" download>{page.download}<Download aria-hidden="true" /></a>
        </aside>
      </Reveal>

      <Reveal as="section" className="container section">
        <Eyebrow>{page.stackEyebrow}</Eyebrow>
        <h2>{page.stackTitle}</h2>
        <div className="skills-layout">
          <SkillRadar />
          <div className="stack-grid">
            {page.stacks.map(stack => <article className="card" key={stack.title}><small>{stack.title}</small><Tags items={stack.items} /></article>)}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="container cta">
        <div><h2>{page.ctaTitle}</h2><p>{page.ctaText}</p></div>
        <Link className="button" to="/contacts">{page.contact}<ArrowUpRight aria-hidden="true" /></Link>
      </Reveal>
    </>
  )
}
