import { notFound } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { LANG_CODES } from '@/lib/i18n'

type Props = { params: Promise<{ lang: string }> }
export async function generateStaticParams() { return LANG_CODES.map(lang => ({ lang })) }

export default async function PrivacyPage({ params }: Props) {
  const { lang } = await params
  if (!LANG_CODES.includes(lang as any)) notFound()
  const year = new Date().getFullYear()
  return (
    <>
      <Nav lang={lang} />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 5vw, 42px)', color: 'var(--accent)', marginBottom: 24 }}>Privacy Policy</h1>
        <div style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.9, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <p>Last updated: January 2025</p>
          <section><h2 style={{ color: 'var(--text)', fontSize: 16, marginBottom: 8 }}>1. Data Collection</h2><p>WhatWeek.uk does not collect personal data. No registration or login is required.</p></section>
          <section><h2 style={{ color: 'var(--text)', fontSize: 16, marginBottom: 8 }}>2. Cookies & Analytics</h2><p>We may use Google Analytics for anonymous traffic analysis and Google AdSense for advertising.</p></section>
          <section><h2 style={{ color: 'var(--text)', fontSize: 16, marginBottom: 8 }}>3. Holiday Data</h2><p>Bank holiday data is provided by Nager.Date, an open-source API. No personal data is transmitted.</p></section>
        </div>
        <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
          <Link href="/en/contact" className="quick-link">Contact</Link>
          <Link href="/en" className="quick-link">← Current week</Link>
        </div>
      </main>
      <Footer lang={lang} year={year} />
    </>
  )
}
