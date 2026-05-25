// WhatWeek.uk — English only

export type LangCode = 'en'

export type CountryConfig = {
  code: string
  name: string
  slug: string
}

export type LangConfig = {
  label: string
  name: string
  hreflang: string
  countries: CountryConfig[]
  months: string[]
  monthsShort: string[]
  days: string[]
  daysShort: string[]
  t: {
    currentWeek: string
    week: string
    weekOf: string
    calendar: string
    holidays: string
    holidaysThisWeek: string
    noHolidays: string
    browseWeeks: string
    weekAtAGlance: string
    weekOf52: string
    yearDone: string
    dayOfYear: string
    daysRemaining: string
    searchPlaceholder: string
    searchHint: string
    calendarYear: string
    holidaysIn: string
    metaWeek: (week: number, year: number, start: string, end: string) => string
    metaHome: string
  }
}

export const LANGS: Record<LangCode, LangConfig> = {
  en: {
    label: 'EN',
    name: 'English',
    hreflang: 'en-GB',
    countries: [
      { code: 'GB', name: 'United Kingdom', slug: 'united-kingdom' },
      { code: 'IE', name: 'Ireland', slug: 'ireland' },
      { code: 'US', name: 'United States', slug: 'united-states' },
      { code: 'AU', name: 'Australia', slug: 'australia' },
      { code: 'CA', name: 'Canada', slug: 'canada' },
      { code: 'NZ', name: 'New Zealand', slug: 'new-zealand' },
    ],
    months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    monthsShort: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    daysShort: ['Mo','Tu','We','Th','Fr','Sa','Su'],
    t: {
      currentWeek: 'Current week',
      week: 'Week',
      weekOf: 'Week of',
      calendar: 'Calendar',
      holidays: 'Bank holidays',
      holidaysThisWeek: 'Bank holidays this week',
      noHolidays: 'No bank holidays this week',
      browseWeeks: 'Browse weeks',
      weekAtAGlance: 'Week at a glance',
      weekOf52: 'of 52 weeks',
      yearDone: 'of year done',
      dayOfYear: 'day of the year',
      daysRemaining: 'days remaining',
      searchPlaceholder: 'e.g. week 25, June 15 2026...',
      searchHint: 'Enter a week number or date',
      calendarYear: 'Calendar',
      holidaysIn: 'Bank holidays in',
      metaWeek: (w, y, s, e) => `Week ${w} of ${y} starts on ${s} and ends on ${e}.`,
      metaHome: 'What week is it in the UK? Find the current week number with bank holidays for England, Scotland, Wales and Northern Ireland.',
    }
  }
}

export const LANG_CODES: LangCode[] = ['en']
