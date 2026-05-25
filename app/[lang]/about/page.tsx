import { notFound } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { LANG_CODES } from '@/lib/i18n'

type Props = { params: Promise<{ lang: string }> }
export async function generateStaticParams() { return LANG_CODES.map(lang => ({ lang })) }

export default async function AboutPage({ params }: Props) {
  const { lang } = await params
  if (!LANG_CODES.includes(lang as any)) notFound()
  const year = new Date().getFullYear()
  return (
    <>
      <Nav lang={lang} />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 5vw, 42px)', color: 'var(--accent)', marginBottom: 24 }}>About WhatWeek.uk</h1>
        <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>WhatWeek.uk is a free tool to find the current week number for the UK and other English-speaking countries. We follow the ISO 8601 standard where weeks start on Monday.</p>
        <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>Bank holidays are shown for England, Wales, Scotland, Northern Ireland, Ireland, the United States, Australia, Canada and New Zealand.</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/en/contact" className="quick-link">Contact</Link>
          <Link href="/en/privacy" className="quick-link">Privacy</Link>
          <Link href="/en" className="quick-link">← Current week</Link>
        </div>
      </main>
      <Footer lang={lang} year={year} />
    </>
  )
}
