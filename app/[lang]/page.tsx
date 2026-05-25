import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SearchBox from '@/components/SearchBox'
import HolidayList from '@/components/HolidayList'
import MiniCal from '@/components/MiniCal'
import { SchemaHomePage } from '@/components/Schema'
import { LANG_CODES } from '@/lib/i18n'
import { getISOWeek, getWeekRange, getWeeksInYear, getDayOfYear, getSpecialDates } from '@/lib/weeks'
import { toLocalISODate } from '@/lib/dateUtils'

const BASE_URL = 'https://whatweek.uk'
export const dynamic = 'force-dynamic'
export const revalidate = 0

type Props = {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ pais?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const now = new Date()
  const { week, year } = getISOWeek(now)
  const { start, end } = getWeekRange(week, year)
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const rangeStr = `${start.getDate()} ${months[start.getMonth()]} – ${end.getDate()} ${months[end.getMonth()]} ${year}`
  const ogUrl = `${BASE_URL}/og?week=${week}&year=${year}&label=Current%20Week&range=${encodeURIComponent(rangeStr)}&type=week`
  return {
    title: `Week ${week} — What Week Is It? | WhatWeek.uk`,
    description: `It's week ${week} of ${year}: ${rangeStr}. Find UK bank holidays and browse any week of the year.`,
    alternates: {
      canonical: `${BASE_URL}/en`,
      languages: { 'en-GB': `${BASE_URL}/en`, 'en': `${BASE_URL}/en` }
    },
    openGraph: {
      title: `Week ${week}, ${year} — WhatWeek.uk`,
      description: rangeStr,
      url: `${BASE_URL}/en`,
      siteName: 'WhatWeek.uk',
      images: [{ url: ogUrl, width: 1200, height: 630 }],
      locale: 'en_GB',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', images: [ogUrl] },
  }
}

export default async function LangHome({ params, searchParams }: Props) {
  const { lang } = await params
  const { pais } = await searchParams
  if (!LANG_CODES.includes(lang as any)) notFound()

  const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const monthsShort = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

  const now = new Date()
  const today = toLocalISODate(now)
  const { week, year } = getISOWeek(now)
  const { start, end } = getWeekRange(week, year)
  const totalWeeks = getWeeksInYear(year)
  const dayOfYear = getDayOfYear(start)
  const daysLeft = 365 - getDayOfYear(end)
  const startStr = toLocalISODate(start)
  const endStr = toLocalISODate(end)
  const rangeStr = `${days[(start.getDay() + 6) % 7]} ${start.getDate()} ${months[start.getMonth()]} – ${days[(end.getDay() + 6) % 7]} ${end.getDate()} ${months[end.getMonth()]}`
  const validCountry = ['GB','IE','US','AU','CA','NZ'].includes(pais ?? '') ? pais! : 'GB'
  const pageUrl = `/en`

  // Upcoming UK special dates
  const specials = getSpecialDates(year)
  const upcomingSpecials = [
    { name: 'Easter Sunday', date: specials.easter },
    { name: 'Good Friday', date: specials.goodFriday },
    { name: 'Ascension Day', date: specials.ascension },
    { name: 'Whitsun', date: specials.pentecost },
    { name: 'Christmas Day', date: new Date(year, 11, 25) },
    { name: "New Year's Day", date: new Date(year + 1, 0, 1) },
  ].filter(s => s.date >= now).slice(0, 4)

  const faqs = [
    {
      q: `What week is it in ${year}?`,
      a: `It is currently week ${week} of ${year}. Week ${week} runs from ${start.getDate()} ${months[start.getMonth()]} to ${end.getDate()} ${months[end.getMonth()]} ${year}.`
    },
    {
      q: 'How are week numbers calculated in the UK?',
      a: 'The UK follows the ISO 8601 standard. Week 1 is the week containing the first Thursday of the year, and weeks always start on Monday.'
    },
    {
      q: `How many weeks are there in ${year}?`,
      a: `There are ${totalWeeks} weeks in ${year}.`
    },
    {
      q: 'What are the UK bank holidays this year?',
      a: `Bank holidays in England and Wales include New Year's Day, Good Friday, Easter Monday, Early May Bank Holiday, Spring Bank Holiday, Summer Bank Holiday, Christmas Day and Boxing Day. Scotland and Northern Ireland have additional bank holidays.`
    },
  ]

  return (
    <>
      <SchemaHomePage lang="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a }
        }))
      })}} />
      <Nav lang="en" />
      <main>
        <div className="hero">
          <p className="hero-label">Current week</p>
          <h1 className="hero-number">{week}</h1>
          <div className="hero-divider" />
          <h2 className="hero-range">{rangeStr}</h2>
          <p className="hero-year">{year}</p>
        </div>

        <SearchBox lang="en" currentYear={year} />

        <div className="page-content">
          <section className="card">
            <h2 className="card-label">Bank holidays this week</h2>
            <HolidayList lang="en" weekStart={startStr} weekEnd={endStr} year={year} activeCountry={validCountry} pageUrl={pageUrl} isCurrentWeek={true} />
          </section>

          <section className="card">
            <MiniCal lang="en" week={week} year={year} today={today} countryCode={validCountry} />
          </section>

          <section className="card">
            <h2 className="card-label">Week {week} at a glance</h2>
            <div className="facts-grid">
              <div className="fact"><div className="fact-value">{week}</div><div className="fact-label">of {totalWeeks} weeks</div></div>
              <div className="fact"><div className="fact-value">{Math.round(week / totalWeeks * 100)}%</div><div className="fact-label">of {year} done</div></div>
              <div className="fact"><div className="fact-value">{dayOfYear}</div><div className="fact-label">day of the year</div></div>
              <div className="fact"><div className="fact-value">{Math.max(0, daysLeft)}</div><div className="fact-label">days remaining</div></div>
            </div>
          </section>

          {upcomingSpecials.length > 0 && (
            <section className="card">
              <h2 className="card-label">Upcoming dates {year}</h2>
              <div className="holiday-list">
                {upcomingSpecials.map(s => {
                  const { week: w, year: y } = getISOWeek(s.date)
                  return (
                    <div key={s.name} className="holiday-item" style={{ borderBottom: '1px solid var(--border)', padding: '10px 0', display: 'flex', alignItems: 'center', gap: 14 }}>
                      <span className="holiday-date">{s.date.getDate()} {monthsShort[s.date.getMonth()]}</span>
                      <span className="holiday-name" style={{ flex: 1 }}>{s.name}</span>
                      <Link href={`/en/${y}/${w}`} style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>Week {w}</Link>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          <section className="card">
            <h2 className="card-label">Browse weeks</h2>
            <div className="quick-links">
              {Array.from({ length: 10 }, (_, i) => week - 3 + i).filter(w => w >= 1 && w <= totalWeeks).map(w => (
                <Link key={w} href={`/en/${year}/${w}`} className={`quick-link ${w === week ? 'current' : ''}`}>
                  Week {w}
                </Link>
              ))}
              <Link href={`/en/calendario/${year}`} className="quick-link">Calendar {year} →</Link>
            </div>
          </section>

          <section className="card">
            <h2 className="card-label">Frequently asked questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {faqs.map((faq, i) => (
                <details key={i} style={{ borderBottom: '1px solid var(--border)', padding: '12px 0' }}>
                  <summary style={{ listStyle: 'none', cursor: 'pointer', fontWeight: 500, color: 'var(--text)', fontSize: 14 }}>
                    {faq.q}
                    <span style={{ float: 'right', color: 'var(--muted)' }}>▾</span>
                  </summary>
                  <p style={{ marginTop: 10, color: 'var(--muted)', fontSize: 13, lineHeight: 1.7 }}>{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer lang="en" year={year} />
    </>
  )
}
