import { useEffect, useRef } from 'react'
import { useLanguage } from '../../context/LanguageContext'

const skillValues = [0.84, 0.86, 0.74, 0.68, 0.70, 0.88]

export function SkillRadar() {
  const canvasRef = useRef(null)
  const { t } = useLanguage()
  const skills = t.home.radarSkills.map((label, index) => [label, skillValues[index]])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const draw = () => {
      const cssSize = Math.min(canvas.parentElement.clientWidth, 420)
      const scale = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = cssSize * scale
      canvas.height = cssSize * scale

      const context = canvas.getContext('2d')
      context.setTransform(scale, 0, 0, scale, 0, 0)
      context.clearRect(0, 0, cssSize, cssSize)

      const center = cssSize / 2
      const radius = cssSize * 0.30
      const point = (index, distance) => {
        const angle = -Math.PI / 2 + index * Math.PI * 2 / skills.length
        return [center + Math.cos(angle) * distance, center + Math.sin(angle) * distance]
      }

      context.lineWidth = 1
      for (let level = 1; level <= 4; level += 1) {
        context.beginPath()
        skills.forEach((_, index) => {
          const [x, y] = point(index, radius * level / 4)
          index === 0 ? context.moveTo(x, y) : context.lineTo(x, y)
        })
        context.closePath()
        context.strokeStyle = 'rgba(125,151,205,.18)'
        context.stroke()
      }

      skills.forEach((_, index) => {
        const [x, y] = point(index, radius)
        context.beginPath()
        context.moveTo(center, center)
        context.lineTo(x, y)
        context.strokeStyle = 'rgba(125,151,205,.14)'
        context.stroke()
      })

      context.beginPath()
      skills.forEach(([, value], index) => {
        const [x, y] = point(index, radius * value)
        index === 0 ? context.moveTo(x, y) : context.lineTo(x, y)
      })
      context.closePath()
      context.fillStyle = 'rgba(57,119,255,.22)'
      context.fill()
      context.lineWidth = 2.5
      context.strokeStyle = '#4f88ff'
      context.stroke()

      skills.forEach(([label, value], index) => {
        const [x, y] = point(index, radius * value)
        context.beginPath()
        context.arc(x, y, 4, 0, Math.PI * 2)
        context.fillStyle = '#ff4c7b'
        context.fill()

        const [labelX, labelY] = point(index, radius + 32)
        context.fillStyle = '#aeb8cf'
        context.font = `${Math.max(10, cssSize * 0.029)}px ui-monospace, SFMono-Regular, monospace`
        context.textAlign = labelX < center - 5 ? 'right' : labelX > center + 5 ? 'left' : 'center'
        context.textBaseline = labelY < center ? 'bottom' : 'top'
        context.fillText(label, labelX, labelY)
      })
    }

    draw()
    if ('ResizeObserver' in window) {
      const observer = new ResizeObserver(draw)
      observer.observe(canvas.parentElement)
      return () => observer.disconnect()
    }
    window.addEventListener('resize', draw)
    return () => window.removeEventListener('resize', draw)
  }, [skills])

  return (
    <figure className="skill-radar">
      <div className="skill-radar-canvas"><canvas ref={canvasRef} role="img" aria-label="Backend skill radar chart" /></div>
      <figcaption>{t.home.radarNote}</figcaption>
    </figure>
  )
}
