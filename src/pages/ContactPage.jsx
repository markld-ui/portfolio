import { ArrowUpRight, Mail, MapPin, Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Eyebrow } from '../components/ui/Eyebrow'
import { useLanguage } from '../context/LanguageContext'

export function ContactPage() {
  const { t } = useLanguage()
  const page = t.contacts
  const [formState, setFormState] = useState({ status: 'idle', message: '' })
  const [directDelivery, setDirectDelivery] = useState(null)

  useEffect(() => {
    fetch('/api/contact/status')
      .then(response => response.ok ? response.json() : Promise.reject())
      .then(result => setDirectDelivery(Boolean(result.directDelivery)))
      .catch(() => setDirectDelivery(false))
  }, [])

  function openPreparedEmail(data) {
    const body = `${data.message}\n\n—\n${data.name}\n${data.email}`
    window.location.href = `mailto:thankr3@gmail.com?subject=${encodeURIComponent(page.mailSubject)}&body=${encodeURIComponent(body)}`
    setFormState({ status: 'success', message: page.mailOpened })
  }

  async function submit(event) {
    event.preventDefault()
    setFormState({ status: 'sending', message: '' })
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))

    if (directDelivery === false) {
      openPreparedEmail(data)
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (response.status === 503) {
        setDirectDelivery(false)
        openPreparedEmail(data)
        return
      }
      if (!response.ok) throw new Error('Delivery failed')
      form.reset()
      setFormState({ status: 'success', message: page.success })
    } catch {
      setFormState({ status: 'error', message: page.error })
    }
  }

  return (
    <section className="container page contact-page">
      <Eyebrow>{page.eyebrow}</Eyebrow>
      <h1>{page.title}</h1>
      <p className="page-lead">{page.lead}</p>

      <div className="contact-layout">
        <aside className="contact-direct">
          <h2>{page.directTitle}</h2>
          <div className="contact-links">
            <a href="mailto:thankr3@gmail.com"><Mail aria-hidden="true" /><span><small>Email</small>thankr3@gmail.com</span></a>
            <a href="https://t.me/m_a_r_k_l_d" target="_blank" rel="noreferrer"><Send aria-hidden="true" /><span><small>Telegram</small>@m_a_r_k_l_d</span></a>
            <div><MapPin aria-hidden="true" /><span><small>{page.locationLabel}</small>{page.locationText}</span></div>
          </div>
          <a className="telegram-cta" href="https://t.me/m_a_r_k_l_d" target="_blank" rel="noreferrer">
            <Send aria-hidden="true" /><span><strong>{page.telegramAction}</strong><small>{page.telegramHint}</small></span>
          </a>
          <div className="contact-status"><span aria-hidden="true" /><div><strong>{page.availableTitle}</strong><small>{page.availableText}</small></div></div>
        </aside>

        <form className="contact-form" onSubmit={submit}>
          <div className="form-header"><span>01</span><div><h2>{page.formTitle}</h2><p>{page.formHint}</p></div></div>
          <div className="form-grid">
            <label>{page.name}<input name="name" placeholder={page.namePlaceholder} required minLength="2" maxLength="80" autoComplete="name" /></label>
            <label>{page.email}<input name="email" type="email" placeholder={page.emailPlaceholder} required maxLength="160" autoComplete="email" /><small className="field-hint">{page.emailHint}</small></label>
          </div>
          <label>{page.message}<textarea name="message" placeholder={page.messagePlaceholder} required minLength="10" maxLength="3000" rows="6" /></label>
          <input type="text" name="website" hidden tabIndex="-1" autoComplete="off" aria-hidden="true" />
          <div className="form-footer">
            <button className="button" disabled={formState.status === 'sending'}>{formState.status === 'sending' ? page.sending : directDelivery === false ? page.openEmail : page.send}<ArrowUpRight aria-hidden="true" /></button>
            <small>{page.privacy}</small>
          </div>
          <div className="form-alternative"><span />{page.directTitle}: <a href="mailto:thankr3@gmail.com">Email</a> · <a href="https://t.me/m_a_r_k_l_d">Telegram</a><span /></div>
          {formState.message && <p className={`form-message is-${formState.status}`} role="status">{formState.message}</p>}
        </form>
      </div>
    </section>
  )
}
