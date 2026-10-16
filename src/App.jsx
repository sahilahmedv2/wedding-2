import { useEffect, useState } from 'react'
import { Petals, Cursor } from './fx.jsx'
import { useReveal, useCountdown, fireBurst, tiltOnMove, tiltReset } from './hooks.jsx'

const MAP_URL =
  'https://www.google.com/maps/search/Salar%20New%20Town/@23.76420783996582,88.10237121582031,17z?hl=en'
const MAP_EMBED_URL =
  'https://www.google.com/maps?q=Salar%20New%20Town&z=15&output=embed'

const EVENTS = [
  {
    id: 'event-1',
    badge: 'Day One',
    num: '04',
    name: 'Handi · Ayeboto Vat ar Thal',
    desc: 'The celebrations begin with our beloved family rituals — full of colour, music, laughter and the blessings of both families.',
    meta: 'Morning Rituals · Family & Friends',
    more: [
      'Time: 9:00 AM onwards',
      'Includes: Handi, Ayeboto Vat ar Thal & family gathering',
      'Dress code: Traditional festive wear',
    ],
    featured: false,
  },
  {
    id: 'event-2',
    badge: 'Day Two',
    num: '05',
    name: 'The Nikah',
    desc: 'Two hearts, one destiny. Join us as Sahil and Soheli seal their vows with Qabool, dua and the blessings of everyone we love.',
    meta: 'Nikah Ceremony · 11:00 AM',
    more: [
      'Nikah: 11:00 AM · Followed by lunch',
      'Dress code: Traditional formals',
      'Masha\'Allah — your presence is the greatest blessing',
    ],
    featured: true,
  },
  {
    id: 'event-3',
    badge: 'Day Three',
    num: '06',
    name: 'Walima Reception',
    desc: 'An of glamour, dinner, dancing and toasts — the groom\'s celebration of love with everyone under one roof.',
    meta: 'Morning · 10:00 AM · ',
    more: [
      'Time: 10:00 AM onwards',
      '',
      '',
    ],
    featured: false,
  },
]

const MARQUEE_ITEMS = [
  'Sahil Weds Soheli',
  'Masha\'Allah',
  '04 · 05 · 06 November',
  'Nikah · Walima',
  'Bismillah',
]

const STARS = [
  { t: '12%', l: '8%', d: '0s', big: false },
  { t: '20%', l: '22%', d: '1.1s', big: true },
  { t: '8%', l: '38%', d: '2.2s', big: false },
  { t: '17%', l: '58%', d: '0.6s', big: false },
  { t: '6%', l: '74%', d: '1.7s', big: true },
  { t: '24%', l: '88%', d: '2.8s', big: false },
  { t: '34%', l: '14%', d: '1.4s', big: false },
  { t: '40%', l: '66%', d: '0.3s', big: false },
  { t: '30%', l: '93%', d: '2s', big: true },
  { t: '46%', l: '4%', d: '2.5s', big: false },
]

function Ornament() {
  return (
    <svg className="orn" viewBox="0 0 200 26" fill="none" aria-hidden="true">
      <path d="M2 13h58" stroke="currentColor" strokeWidth="1.2" />
      <path d="M140 13h58" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M100 3c8 0 14 4.5 14 10s-6 10-14 10-14-4.5-14-10 6-10 14-10z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M100 7c4.5 0 8 2.5 8 6s-3.5 6-8 6-8-2.5-8-6 3.5-6 8-6z"
        fill="currentColor"
        opacity=".55"
      />
      <circle cx="66" cy="13" r="3" fill="currentColor" />
      <circle cx="134" cy="13" r="3" fill="currentColor" />
      <circle cx="76" cy="13" r="1.8" fill="currentColor" opacity=".7" />
      <circle cx="124" cy="13" r="1.8" fill="currentColor" opacity=".7" />
    </svg>
  )
}

function Mosque({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 300"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5b0b22" />
          <stop offset="1" stopColor="#180309" />
        </linearGradient>
        <radialGradient id="wg">
          <stop offset="0" stopColor="#fff2c8" />
          <stop offset="1" stopColor="#d9b45b" />
        </radialGradient>
      </defs>

      <g fill="url(#mg)" stroke="#d9b45b" strokeWidth="2.5" strokeLinejoin="round">
        <path d="M160 300V120h44v180z" />
        <path d="M150 150h64v12h-64z" stroke-width="2" />
        <path d="M166 120h32V96h-32z" />
        <path d="M161 96a21 21 0 0 1 38 0z" />
        <rect x="178" y="62" width="6" height="16" fill="#d9b45b" stroke="none" />
        <circle cx="181" cy="56" r="5" fill="#d9b45b" stroke="none" />

        <path d="M996 300V120h44v180z" />
        <path d="M986 150h64v12h-64z" stroke-width="2" />
        <path d="M1002 120h32V96h-32z" />
        <path d="M997 96a21 21 0 0 1 38 0z" />
        <rect x="1014" y="62" width="6" height="16" fill="#d9b45b" stroke="none" />
        <circle cx="1017" cy="56" r="5" fill="#d9b45b" stroke="none" />

        <path d="M330 300V210h540v90z" />
        <path d="M250 300v-58h84v58z" />
        <path d="M866 300v-58h84v58z" />

        <path d="M520 214h160v-18H520z" />
        <path d="M518 196a82 78 0 0 1 164 0z" />
        <rect x="596" y="86" width="8" height="30" fill="#d9b45b" stroke="none" />
        <path
          d="M604 66a13 13 0 1 1-4 24 16 16 0 1 0 4-24z"
          fill="#d9b45b"
          stroke="none"
        />

        <path d="M360 234h90v-14h-90z" />
        <path d="M356 220a49 46 0 0 1 98 0z" />
        <path d="M750 234h90v-14h-90z" />
        <path d="M746 220a49 46 0 0 1 98 0z" />
      </g>

      <g fill="#0a0206" stroke="#d9b45b" strokeWidth="2">
        <path d="M545 300v-56a55 55 0 0 1 110 0v56z" />
        <path d="M390 300v-32a16 16 0 0 1 32 0v32z" />
        <path d="M470 300v-32a16 16 0 0 1 32 0v32z" />
        <path d="M698 300v-32a16 16 0 0 1 32 0v32z" />
        <path d="M778 300v-32a16 16 0 0 1 32 0v32z" />
        <path d="M266 300v-26a12 12 0 0 1 24 0v26z" />
        <path d="M910 300v-26a12 12 0 0 1 24 0v26z" />
      </g>

      <g fill="url(#wg)" stroke="none">
        <circle className="win-light" cx="600" cy="150" r="6" />
        <circle className="win-light" cx="406" cy="272" r="5" style={{ animationDelay: '.8s' }} />
        <circle className="win-light" cx="486" cy="272" r="5" style={{ animationDelay: '1.6s' }} />
        <circle className="win-light" cx="714" cy="272" r="5" style={{ animationDelay: '2.4s' }} />
        <circle className="win-light" cx="794" cy="272" r="5" style={{ animationDelay: '1.2s' }} />
        <circle className="win-light" cx="182" cy="200" r="5" style={{ animationDelay: '2s' }} />
        <circle className="win-light" cx="1018" cy="200" r="5" style={{ animationDelay: '2.8s' }} />
      </g>

      <rect x="0" y="294" width="1200" height="6" fill="#d9b45b" opacity=".7" />
    </svg>
  )
}

function Crescent({ className, style }) {
  return (
    <svg className={className} style={style} width="90" height="90" viewBox="0 0 90 90" aria-hidden="true">
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff6d8" />
          <stop offset="1" stopColor="#d9b45b" />
        </linearGradient>
        <mask id="cm">
          <rect width="90" height="90" fill="#fff" />
          <circle cx="56" cy="34" r="32" fill="#000" />
        </mask>
      </defs>
      <circle cx="42" cy="45" r="32" fill="url(#cg)" mask="url(#cm)" />
      <path d="M64 20l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#f6dfa0" />
      <path d="M74 52l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#f6dfa0" opacity=".8" />
    </svg>
  )
}

function LanternSVG() {
  return (
    <svg width="54" height="132" viewBox="0 0 64 140" aria-hidden="true">
      <line x1="32" y1="0" x2="32" y2="22" stroke="#d9b45b" strokeWidth="2" />
      <circle cx="32" cy="26" r="5" fill="none" stroke="#d9b45b" strokeWidth="2.5" />
      <path d="M20 34h24l6 10H14z" fill="#d9b45b" />
      <path d="M14 44h36l6 30-6 30H14L8 74z" fill="#0a3d2e" stroke="#d9b45b" strokeWidth="2.5" />
      <path d="M20 52h24l4 22-4 22H20l-4-22z" fill="rgba(255,220,130,.45)" stroke="#f6dfa0" strokeWidth="1.5" />
      <path d="M14 104h36l-4 9H18z" fill="#d9b45b" />
      <line x1="32" y1="113" x2="32" y2="124" stroke="#d9b45b" strokeWidth="2" />
      <path d="M32 124l6 7-6 7-6-7z" fill="#e0657f" />
    </svg>
  )
}

function Lanterns({ spots }) {
  const [lit, setLit] = useState(() => spots.map((_, i) => i % 2 === 0))
  return (
    <div className="lanterns">
      {spots.map((left, i) => (
        <span
          key={i}
          className={`lantern${lit[i] ? ' lit' : ''}`}
          style={{ left, animationDelay: `${i * 0.55}s` }}
          role="button"
          tabIndex={0}
          aria-label="Toggle lantern"
          onClick={(e) => {
            e.stopPropagation()
            setLit((prev) => prev.map((v, j) => (j === i ? !v : v)))
            fireBurst(e.clientX, e.clientY, 22)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setLit((prev) => prev.map((v, j) => (j === i ? !v : v)))
          }}
        >
          <LanternSVG />
        </span>
      ))}
    </div>
  )
}

function Preloader({ done }) {
  return (
    <div className={`preloader${done ? ' done' : ''}`}>
      <div className="preloader-inner">
        <svg className="heart-path" viewBox="0 0 100 90" aria-hidden="true">
          <path d="M50 82C20 60 6 44 6 27 6 13 17 4 29 4c9 0 16 5 21 13C55 9 62 4 71 4c12 0 23 9 23 23 0 17-14 33-44 55z" />
        </svg>
        <div className="preloader-names">Sahil &amp; Soheli</div>
        <div className="preloader-sub">Loading our forever</div>
        <div className="preloader-bar">
          <i />
        </div>
      </div>
    </div>
  )
}

function Gate({ shown, opened, gone, onOpen, onEnter }) {
  const spots = ['7%', '21%', '78%', '92%', '48%']
  return (
    <div className={`gate${shown ? ' show' : ''}${opened ? ' open' : ''}${gone ? ' gone' : ''}`}>
      <div className="geo-plate" />
      <Mosque className="mosque gate-mosque" />
      <Crescent className="crescent" style={{ top: '9%', right: '11%' }} />
      <Lanterns spots={spots} />
      {STARS.map((s, i) => (
        <span
          key={i}
          className={`star${s.big ? ' big' : ''}`}
          style={{ top: s.t, left: s.l, animationDelay: s.d }}
        />
      ))}

      <div className="gate-center">
        <p className="gate-bismillah">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
        <p className="gate-bismillah-en">Bismillah ir-Rahman ir-Rahim</p>

        <div
          className="envelope"
          role="button"
          tabIndex={0}
          aria-label="Enter the celebration"
          onClick={onEnter}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onEnter()
          }}
        >
          <div className="env-back" />
          <div className="env-flap" />
          <div className="env-front" />
          <div className="env-seal" aria-hidden="true">S&amp;S</div>
          {!opened && <span className="tap-hint">Tap the seal to reveal the date</span>}
        </div>
      </div>

      <div className="letter-card">
        <p className="lc-ar">ٱلْحَمْدُ لِلَّٰهِ</p>
        <p className="lc-kicker">With the blessings of Allah &amp; our families</p>
        <h2 className="lc-names">
          Sahil
          <em>weds</em>
          Soheli
        </h2>
        <div className="lc-dates">
          <div className="chip">
            <b>04</b>
            <span>Nov · Rituals</span>
          </div>
          <div className="chip">
            <b>05</b>
            <span>Nov · Nikah</span>
          </div>
          <div className="chip">
            <b>06</b>
            <span>Nov · Walima</span>
          </div>
        </div>
        <p className="lc-note">
          Handi · Ayeboto Vat ar Thal — The Nikah — Walima Reception
        </p>
        <button className="btn btn-gold" type="button" onClick={onEnter}>
          Open the Celebration
        </button>
      </div>
    </div>
  )
}

function Nav({ show }) {
  return (
    <nav className={`nav${show ? ' show' : ''}`}>
      <a href="#top">
        <span>Home</span>
      </a>
      <a href="#countdown">
        <span>Countdown</span>
      </a>
      <a href="#events">
        <span>Events</span>
      </a>
      <a href="#venue">
        <span>Venue</span>
      </a>
      <a href="#gallery">
        <span>Gallery</span>
      </a>
    </nav>
  )
}

function Hero({ play }) {
  const rings = [
    { s: 90, t: '16%', l: '8%', d: '0s' },
    { s: 150, t: '58%', l: '4%', d: '1.6s' },
    { s: 60, t: '30%', l: '86%', d: '0.8s' },
    { s: 120, t: '70%', l: '84%', d: '2.4s' },
    { s: 40, t: '12%', l: '70%', d: '3s' },
  ]

  const jump = (e, id) => {
    e.currentTarget.blur()
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    el.classList.remove('flash')
    void el.offsetWidth
    el.classList.add('flash')
    setTimeout(() => el.classList.remove('flash'), 1600)
    fireBurst(e.clientX, e.clientY, 30)
  }

  return (
    <header className={`hero${play ? ' play' : ''}`} id="top">
      <div className="geo-plate" />
      <Mosque className="mosque" />
      <Crescent className="crescent" style={{ top: '11%', right: '9%' }} />
      <Lanterns spots={['6%', '18%', '76%', '90%']} />
      {STARS.map((s, i) => (
        <span
          key={i}
          className={`star${s.big ? ' big' : ''}`}
          style={{ top: s.t, left: s.l, animationDelay: s.d }}
        />
      ))}
      {rings.map((r, i) => (
        <span
          key={i}
          className="ring-float"
          style={{ width: r.s, height: r.s, top: r.t, left: r.l, animationDelay: r.d }}
        />
      ))}

      <div className="hero-inner">
        <p className="kicker">Bismillah · Two families · One celebration</p>
        <p className="kicker rule">Save the Date</p>

        <h1 className="names">
          <span className="line name-line name-line-first">Sahil</span>
          <span className="amp">weds</span>
          <span className="line name-line name-line-second">Soheli</span>
        </h1>

        <div className="dates-strip">
          <button className="d" type="button" onClick={(e) => jump(e, 'event-1')}>
            Nov 04<small>Handi · Ayeboto Vat ar Thal</small>
          </button>
          <span className="dot" />
          <button className="d" type="button" onClick={(e) => jump(e, 'event-2')}>
            Nov 05<small>The Nikah</small>
          </button>
          <span className="dot" />
          <button className="d" type="button" onClick={(e) => jump(e, 'event-3')}>
            Nov 06<small>Walima Reception</small>
          </button>
        </div>

        <div className="hero-cta">
          <a className="btn btn-gold" href="#gallery">
            View Gallery
          </a>
          <a className="btn btn-ghost" href="#events">
            View Schedule
          </a>
        </div>
      </div>

      <div className="scroll-cue">
        Scroll
        <i />
      </div>
    </header>
  )
}

function Countdown() {
  const t = useCountdown()
  const cells = [
    { v: t.days, l: 'Days' },
    { v: t.hours, l: 'Hours' },
    { v: t.mins, l: 'Minutes' },
    { v: t.secs, l: 'Seconds' },
  ]
  return (
    <section className="sec countdown" id="countdown">
      <div className="sec-head" data-reveal>
        <p className="eyebrow">Insha&apos;Allah · Counting every heartbeat</p>
        <h2 className="sec-title">Until the Nikah</h2>
        <Ornament />
        <p className="sec-sub">
          The Qabool will be taken on 4 November {t.year}. Until then, every
          second sparkles a little brighter.
        </p>
      </div>

      <div className="cd-grid">
        {cells.map((c) => (
          <div
            className="cd-box"
            key={c.l}
            data-reveal
            role="button"
            tabIndex={0}
            onClick={(e) => fireBurst(e.clientX, e.clientY, 26)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') fireBurst(e.clientX, e.clientY, 26)
            }}
          >
            <span className="cd-num tick" key={c.v}>
              {String(c.v).padStart(2, '0')}
            </span>
            <span className="cd-label">{c.l}</span>
          </div>
        ))}
      </div>

      <p className="cd-note" data-reveal>
        {t.done ? 'The day is here — Alhamdulillah!' : 'Tap a box · We cannot wait to celebrate with you'}
      </p>
    </section>
  )
}

function Events() {
  const [openId, setOpenId] = useState(null)

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section className="sec events" id="events">
      <div className="sec-head" data-reveal>
        <p className="eyebrow">Three days of barakah</p>
        <h2 className="sec-title">The Celebrations</h2>
        <Ornament />
        <p className="sec-sub">
          From cherished rituals to the Walima night — tap each card to reveal
          the full schedule of our wedding.
        </p>
      </div>

      <div className="event-grid">
        {EVENTS.map((e) => (
          <article
            key={e.id}
            id={e.id}
            className={`event-card${e.featured ? ' featured' : ''}${openId === e.id ? ' open' : ''}`}
            data-reveal
            role="button"
            tabIndex={0}
            aria-expanded={openId === e.id}
            onClick={(ev) => {
              toggle(e.id)
              fireBurst(ev.clientX, ev.clientY, 34)
            }}
            onKeyDown={(ev) => {
              if (ev.key === 'Enter') toggle(e.id)
            }}
            onMouseMove={tiltOnMove}
            onMouseLeave={tiltReset}
          >
            <span className="day-badge">{e.badge}</span>
            <div className="event-num">{e.num}</div>
            <div className="event-month">November</div>
            <h3 className="event-name">{e.name}</h3>
            <p className="event-desc">{e.desc}</p>
            <span className="event-meta">{e.meta}</span>

            <div className="event-more">
              <ul>
                {e.more.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>

            <span className="tap-hint-card">
              {openId === e.id ? 'Tap to close ✦' : 'Tap to reveal details ✦'}
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}

function Marquee() {
  const row = (items) => [...items, ...items, ...items, ...items]
  return (
    <>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {row(MARQUEE_ITEMS).map((m, i) => (
            <span key={i}>{m}</span>
          ))}
        </div>
      </div>
      <div className="marquee rev" aria-hidden="true">
        <div className="marquee-track">
          {row([...MARQUEE_ITEMS].reverse()).map((m, i) => (
            <span key={i}>{m}</span>
          ))}
        </div>
      </div>
    </>
  )
}

function DuaBand() {
  return (
    <section className="dua-band">
      <div className="geo-plate" />
      <Crescent className="crescent" style={{ top: '18%', left: '7%', width: 62, height: 62 }} />
      <p className="dua-ar" data-reveal>
        بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
      </p>
      <p className="dua-en" data-reveal>
        “May Allah bless you both, and shower His blessings upon you, and join
        you together in goodness.”
      </p>
      <p className="dua-by" data-reveal>Sahil &amp; Soheli · Masha&apos;Allah</p>
    </section>
  )
}

function Venue() {
  return (
    <section className="sec venue" id="venue">
      <div className="sec-head" data-reveal>
        <p className="eyebrow">Where the barakah happens</p>
        <h2 className="sec-title">Venue &amp; Times</h2>
        <Ornament />
      </div>
      <div className="venue-box" data-reveal>
        <h3>Salar New Town</h3>
        <p>
          All three days — <strong>4, 5 &amp; 6 November</strong> — will be hosted
          at Salar New Town. Full muhurat timings and travel directions will be
          shared personally with every invited guest.
        </p>
        <p>
          Kindly confirm your presence below so we can reserve your seat at every
          ceremony.
        </p>
        <div className="venue-map" aria-label="Map of Salar New Town">
          <iframe
            title="Salar New Town map"
            src={MAP_EMBED_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <span className="venue-map-label">Salar New Town</span>
        </div>
        <a
          className="map-link"
          href={MAP_URL}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => fireBurst(e.clientX, e.clientY, 30)}
        >
          Open in Google Maps →
        </a>
      </div>
    </section>
  )
}

const MEDIA = [
  { type: 'image', src: '/gallery/photo-1.jpeg', alt: 'Sahil & Soheli — a cherished moment' },
  { type: 'image', src: '/gallery/photo-2.jpeg', alt: 'Sahil & Soheli — another beautiful memory' },
  {
    type: 'video',
    src: '/gallery/video-1.mp4',
    alt: 'Sahil & Soheli — a cherished video memory',
  },
]

function Gallery() {
  const [active, setActive] = useState(null)

  return (
    <section className="sec gallery" id="gallery">
      <div className="geo-plate" />
      <div className="sec-head" data-reveal>
        <p className="eyebrow">Cherished memories</p>
        <h2 className="sec-title">Photo Gallery</h2>
        <Ornament />
        <p className="sec-sub">
          Glimpses of love, laughter and dua — the little moments that lead us
          to our forever. Tap a photo or video to see it up close.
        </p>
      </div>

      <div className="gallery-grid">
        {MEDIA.map((m) => (
          <button
            key={m.src}
            className={`gallery-item${m.type === 'video' ? ' is-video' : ''}`}
            type="button"
            data-reveal
            aria-label={`View ${m.alt}`}
            onClick={(e) => {
              setActive(m)
              fireBurst(e.clientX, e.clientY, 34)
            }}
          >
            {m.type === 'video' ? (
              <video src={m.src} autoPlay muted playsInline preload="metadata" loop />
            ) : (
              <img src={m.src} alt={m.alt} loading="lazy" />
            )}
            <span className="gallery-gloss" />
            {m.type === 'video' && (
              <span className="gallery-play" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            )}
            <span className="gallery-meta">Sahil &amp; Soheli</span>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={() => setActive(null)}
        >
          <button className="lightbox-close" type="button" aria-label="Close media">
            ×
          </button>
          {active.type === 'video' ? (
            <video
              className="lightbox-media"
              src={active.src}
              controls
              autoPlay
              playsInline
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img
              className="lightbox-img"
              src={active.src}
              alt={active.alt}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="monogram" data-reveal>
        S&amp;S
      </div>
      <h4 data-reveal>Sahil &amp; Soheli</h4>
      <p className="dates-line" data-reveal>
        04 · 05 · 06 November — Three days, one forever
      </p>
      <p className="dua-ar" style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }} data-reveal>
        جَزَاكُمُ اللَّهُ خَيْرًا
      </p>
      <p className="bless" data-reveal>
        With love and dua of our families, we eagerly await your presence.
      </p>
      <p className="copy">Made with love · Sahil Weds Soheli</p>
    </footer>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [opened, setOpened] = useState(false)
  const [entered, setEntered] = useState(false)
  const [gateGone, setGateGone] = useState(false)
  const [gateMounted, setGateMounted] = useState(true)
  const [navShow, setNavShow] = useState(false)

  useReveal(entered)

  useEffect(() => {
    const id = setTimeout(() => setLoaded(true), 2900)
    const onScroll = () => setNavShow(window.scrollY > 120)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      clearTimeout(id)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = entered ? '' : 'hidden'
    if (!entered) window.scrollTo(0, 0)
  }, [entered])

  const openEnvelope = () => {
    if (opened) return
    fireBurst(window.innerWidth / 2, window.innerHeight * 0.55, 70)
    setTimeout(() => setOpened(true), 620)
  }

  const enterSite = () => {
    fireBurst(window.innerWidth / 2, window.innerHeight / 2, 170)
    setEntered(true)
    setGateGone(true)
    setTimeout(() => setGateMounted(false), 1200)
  }

  return (
    <>
      <Preloader done={loaded} />
      <Cursor />
      <Petals />
      {gateMounted && (
        <Gate
          shown={loaded}
          opened={opened}
          gone={gateGone}
          onOpen={openEnvelope}
          onEnter={enterSite}
        />
      )}
      <Nav show={entered && navShow} />
      <Hero play={entered} />
      <main>
        <Countdown />
        <Events />
        <Marquee />
        <DuaBand />
        <Venue />
        <Gallery />
      </main>
      <Footer />
    </>
  )
}
