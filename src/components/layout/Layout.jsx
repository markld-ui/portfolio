import { useEffect, useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { Link, NavLink, useRouter } from '../../context/RouterContext'

export function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { path } = useRouter()
  const { language, toggleLanguage, t } = useLanguage()

  useEffect(() => setMenuOpen(false), [path])

  return (
    <div className="site">
      <header className="site-header">
        <div className="container navigation">
          <Link to="/" className="brand" aria-label="Roman Slinkov — home">
            <span className="brand-mark" aria-hidden="true">RS</span>
            <span className="brand-copy">{t.common.name}<small>{t.common.role}</small></span>
          </Link>

          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
            {t.common.nav.map(item => (
              <NavLink key={item.href} to={item.href} end={item.href === '/'}>{item.label}</NavLink>
            ))}
          </nav>

          <div className="navigation-actions">
            <a className="resume-nav" href="/roman-slinkov-resume.pdf" download>
              <Download aria-hidden="true" /> <span>{t.common.resume}</span>
            </a>
            <button className="language-button" onClick={toggleLanguage} aria-label={t.common.switchLanguage}>
              {language === 'ru' ? 'EN' : 'RU'}
            </button>
            <a className="button button-small header-contact" href="mailto:thankr3@gmail.com">{t.common.write}</a>
            <button
              className="menu-button"
              onClick={() => setMenuOpen(value => !value)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? t.common.menuClose : t.common.menuOpen}
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="container footer-content">
          <div className="footer-main">
            <Link to="/" className="footer-brand"><span className="brand-mark" aria-hidden="true">RS</span><span><strong>{t.common.name}</strong><small>{t.common.role}</small></span></Link>
            <p>{t.common.footerTagline}</p>
            <div className="footer-status"><span aria-hidden="true" />{t.common.footerAvailability}</div>
          </div>
          <div className="footer-navigation">
            <nav aria-label="Footer navigation">{t.common.nav.map(item => <Link key={item.href} to={item.href}>{item.label}</Link>)}</nav>
            <nav className="footer-socials" aria-label="Social links">
              <a href="mailto:thankr3@gmail.com">Email</a>
              <a href="https://t.me/m_a_r_k_l_d" target="_blank" rel="noreferrer">Telegram</a>
              <a href="https://github.com/markld-ui" target="_blank" rel="noreferrer">GitHub</a>
            </nav>
          </div>
          <div className="footer-bottom"><span>© 2026 {t.common.name}</span><span>{t.common.footerCopyright}</span></div>
        </div>
      </footer>
    </div>
  )
}
