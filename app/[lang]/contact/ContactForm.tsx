'use client'
import { useState } from 'react'
import Link from 'next/link'
export default function ContactForm({ lang }: { lang: string }) {
  const [state, setState] = useState<'idle'|'sending'|'sent'>('idle')
  const [name, setName] = useState(''), [email, setEmail] = useState(''), [message, setMessage] = useState('')
  function handleSubmit(e: React.FormEvent) { e.preventDefault(); setState('sending'); setTimeout(() => setState('sent'), 1500) }
  if (state === 'sent') return (
    <div style={{ textAlign: 'center', padding: '48px 0' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, color: 'var(--accent)', marginBottom: 12 }}>Message sent!</h2>
      <p style={{ color: 'var(--muted)', fontSize: 15 }}>Thanks for getting in touch. We'll reply within 48 hours.</p>
      <Link href="/en" style={{ display: 'inline-block', marginTop: 24 }} className="quick-link">← Back</Link>
    </div>
  )
  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {[{l:'YOUR NAME',v:name,s:setName,t:'text',p:'Your name'},{l:'EMAIL',v:email,s:setEmail,t:'email',p:'Your email address'}].map(f=>(
        <div key={f.l}><label style={{display:'block',fontSize:12,color:'var(--muted)',marginBottom:6,fontFamily:'var(--font-mono)',letterSpacing:1}}>{f.l}</label>
        <input required type={f.t} value={f.v} onChange={e=>f.s(e.target.value)} className="search-input" style={{width:'100%'}} placeholder={f.p}/></div>
      ))}
      <div><label style={{display:'block',fontSize:12,color:'var(--muted)',marginBottom:6,fontFamily:'var(--font-mono)',letterSpacing:1}}>MESSAGE</label>
      <textarea required value={message} onChange={e=>setMessage(e.target.value)} className="search-input" rows={5} style={{width:'100%',resize:'vertical',fontFamily:'var(--font-sans)'}} placeholder="Your message..."/></div>
      <button type="submit" className="search-btn" disabled={state==='sending'} style={{alignSelf:'flex-start',padding:'12px 28px',fontSize:14}}>
        {state==='sending'?'Sending...':'Send message'}
      </button>
    </form>
  )
}
