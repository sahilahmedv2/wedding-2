import { useEffect, useState } from 'react'

/* ---------------- confetti / petal burst bus ---------------- */
const bursts = []

export function fireBurst(x, y, count = 90) {
  bursts.push({ x, y, count })
}

export function consumeBursts() {
  return bursts.splice(0, bursts.length)
}

/* ---------------- scroll reveal ---------------- */
export function useReveal(enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined
    const els = [...document.querySelectorAll('[data-reveal]')]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    )
    els.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 90}ms`
      io.observe(el)
    })
    return () => io.disconnect()
  }, [enabled])
}

/* ---------------- 3D tilt ---------------- */
export function tiltOnMove(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const px = (e.clientX - r.left) / r.width - 0.5
  const py = (e.clientY - r.top) / r.height - 0.5
  el.style.transform = `rotateY(${px * 16}deg) rotateX(${-py * 16}deg) translateY(-10px)`
}

export function tiltReset(e) {
  e.currentTarget.style.transform = ''
}

/* ---------------- countdown ---------------- */
export function useCountdown() {
  const calc = () => {
    const now = new Date()
    const year = now.getFullYear()
    if (now > new Date(year, 10, 6, 23, 59, 59)) {
      return finish(new Date(year + 1, 10, 4, 8, 0, 0), now)
    }
    return finish(new Date(year, 10, 4, 8, 0, 0), now)
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

function finish(target, now) {
  const diff = Math.max(target - now, 0)
  return {
    year: target.getFullYear(),
    days: Math.floor(diff / 864e5),
    hours: Math.floor(diff / 36e5) % 24,
    mins: Math.floor(diff / 6e4) % 60,
    secs: Math.floor(diff / 1e3) % 60,
    done: diff === 0,
  }
}
