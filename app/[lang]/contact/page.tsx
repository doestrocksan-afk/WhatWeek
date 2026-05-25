import { notFound } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ContactForm from './ContactForm'
import { LANG_CODES } from '@/lib/i18n'
type Props = { params: Promise<{ lang: string }> }
export async function generateStaticParams() { return LANG_CODES.map(lang => ({ lang })) }
export default async function ContactPage({ params }: Props) {
  const { lang } = await params
  if (!LANG_CODES.includes(lang as any)) notFound()
  const year = new Date().getFullYear()
  return (
    <>
      <Nav lang={lang} />
      <main style={{ maxWidth: 600, margin: '0 auto', padding: '48px 24px' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 5vw, 42px)', color: 'var(--accent)', marginBottom: 32 }}>Contact us</h1>
        <ContactForm lang={lang} />
        <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
          <Link href="/en/about" className="quick-link">About</Link>
          <Link href="/en/privacy" className="quick-link">Privacy</Link>
        </div>
      </main>
      <Footer lang={lang} year={year} />
    </>
  )
}
