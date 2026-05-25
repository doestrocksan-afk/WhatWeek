import Link from 'next/link'

export default function Nav({ lang }: { lang: string }) {
  return (
    <nav className="nav">
      <Link href="/en" className="nav-logo">
        WhatWeek.uk
      </Link>
      <div style={{ display: 'flex', gap: 8 }}>
        <Link href="/en/calendario/2026" className="nav-lang">Calendar</Link>
        <Link href="/en/festivos/united-kingdom/2026" className="nav-lang">Bank Holidays</Link>
        <Link href="/en/about" className="nav-lang">About</Link>
      </div>
    </nav>
  )
}
