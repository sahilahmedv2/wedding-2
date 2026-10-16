import { useEffect, useRef } from 'react'
import { consumeBursts } from './hooks.jsx'

const PETAL_COLORS = ['#f6dfa0', '#e0657f', '#fff1d6', '#d9b45b', '#f7b7c4', '#ffffff']

/* ---------------- falling petals + bokeh + confetti canvas ---------------- */
export function Petals() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)
    let raf
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    const petals = []
    const bokeh = []

    const makePetal = (y, burst = false, bx = 0) => ({
      x: burst ? bx : Math.random() * w,
      y,
      r: 5 + Math.random() * 9,
      vy: burst ? -(1 + Math.random() * 6) : 0.5 + Math.random() * 1.3,
      vx: burst ? (Math.random() - 0.5) * 9 : (Math.random() - 0.5) * 0.6,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.06,
      sway: Math.random() * Math.PI * 2,
      color: PETAL_COLORS[(Math.random() * PETAL_COLORS.length) | 0],
      life: 1,
      burst,
    })

    for (let i = 0; i < (w < 700 ? 18 : 34); i++) petals.push(makePetal(Math.random() * h))
    for (let i = 0; i < 14; i++) {
      bokeh.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 20 + Math.random() * 70,
        v: 0.1 + Math.random() * 0.3,
        a: 0.04 + Math.random() * 0.09,
        hue: Math.random() > 0.5 ? '246, 223, 160' : '224, 101, 127',
      })
    }

    const drawPetal = (p) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.globalAlpha = p.burst ? Math.max(p.life, 0) : 0.75
      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.moveTo(0, -p.r)
      ctx.bezierCurveTo(p.r, -p.r * 0.6, p.r * 0.9, p.r * 0.7, 0, p.r)
      ctx.bezierCurveTo(-p.r * 0.9, p.r * 0.7, -p.r, -p.r * 0.6, 0, -p.r)
      ctx.fill()
      ctx.restore()
    }

    const step = () => {
      ctx.clearRect(0, 0, w, h)

      for (const b of bokeh) {
        b.y -= b.v
        if (b.y < -b.r) {
          b.y = h + b.r
          b.x = Math.random() * w
        }
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
        g.addColorStop(0, `rgba(${b.hue}, ${b.a})`)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fill()
      }

      for (const b of consumeBursts()) {
        for (let i = 0; i < b.count; i++) petals.push(makePetal(b.y, true, b.x))
      }

      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i]
        p.sway += 0.03
        p.x += p.vx + Math.sin(p.sway) * 0.9
        p.y += p.vy
        p.rot += p.vr
        if (p.burst) {
          p.vy += 0.16
          p.vx *= 0.985
          p.life -= 0.011
          if (p.life <= 0) {
            petals.splice(i, 1)
            continue
          }
        } else if (p.y > h + 30) {
          p.y = -30
          p.x = Math.random() * w
        }
        drawPetal(p)
      }

      if (!reduced) raf = requestAnimationFrame(step)
    }
    step()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={ref} className="petals" aria-hidden="true" />
}

/* ---------------- custom cursor + heart trail ---------------- */
export function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return undefined
    const dot = dotRef.current
    const ring = ringRef.current
    let mx = -100
    let my = -100
    let rx = -100
    let ry = -100
    let raf
    let lastHeart = 0

    const move = (e) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`
      const t = e.target.closest(
        'a, button, .btn, .event-card, .envelope, .lantern, .cd-box, input, select, textarea',
      )
      ring.classList.toggle('hot', !!t)

      const now = performance.now()
      if (now - lastHeart > 130 && !t) {
        lastHeart = now
        const s = document.createElement('span')
        s.className = 'heart-pop'
        s.textContent = Math.random() > 0.5 ? '❤' : '❀'
        s.style.left = `${mx}px`
        s.style.top = `${my}px`
        s.style.color = PETAL_COLORS[(Math.random() * PETAL_COLORS.length) | 0]
        document.body.appendChild(s)
        setTimeout(() => s.remove(), 1100)
      }
    }

    const loop = () => {
      rx += (mx - rx) * 0.16
      ry += (my - ry) * 0.16
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`
      raf = requestAnimationFrame(loop)
    }
    loop()

    window.addEventListener('mousemove', move)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}

/* ---------------- kinetic letter split ---------------- */
export function Letters({ text, delay = 0, step = 70 }) {
  return (
    <>
      {[...text].map((ch, i) => (
        <span key={i} className="ltr" style={{ animationDelay: `${delay + i * step}ms` }}>
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </>
  )
}
