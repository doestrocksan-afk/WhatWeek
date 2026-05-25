import Link from 'next/link'

export default function Footer({ lang, year }: { lang: string; year: number }) {
  return (
    <footer className="footer">
      <div>© {year} WhatWeek.uk</div>
      <div className="footer-links" style={{ display: 'flex', gap: 16 }}>
        <Link href="/en/calendario/2026">Calendar 2026</Link>
        <Link href="/en/festivos/united-kingdom/2026">Bank Holidays</Link>
        <Link href="/en/privacy">Privacy</Link>
        <Link href="/en/about">About</Link>
        <Link href="/en/contact">Contact</Link>
      </div>
    </footer>
  )
}
