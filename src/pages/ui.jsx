import { useEffect, useState } from 'react'

export const RED = '#cc1f1f'
export const INK = '#16161e'
const MONO = "'DM Mono',monospace"

/* ── tiny hash router ── */
const read = () => (window.location.hash || '').replace(/^#/, '') || '/'
export function useRoute() {
  const [route, setRoute] = useState(read())
  useEffect(() => {
    const on = () => setRoute(read())
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return route
}
export function goPage(path) {
  window.location.hash = path === '/' ? '' : path
  window.scrollTo({ top: 0 })
}
export function goSection(id) {
  const scroll = () => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' })
    return !!el
  }
  if (scroll()) return
  window.location.hash = ''
  setTimeout(scroll, 120)
}

/* ── icons ── */
const paths = {
  box: <><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></>,
  factory: <><path d="M2 20h20"/><path d="M4 20V9l6 4V9l6 4V4h4v16"/><path d="M8 20v-3M13 20v-3"/></>,
  wrench: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>,
  shield: <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></>,
  pulse: <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>,
  link: <><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" y1="12" x2="16" y2="12"/></>,
  layers: <><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/></>,
  clipboard: <><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
  chat: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,
  key: <><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></>,
  clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
}
export function Icon({ name, size = 28, stroke = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
  )
}
export function Tick({ color = RED, size = 13 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,marginTop:3}}><polyline points="20 6 9 17 4 12"/></svg>
}
export function Cross({ size = 13 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#9aa0b4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,marginTop:3}}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
}

/* ── text blocks ── */
export function Eyebrow({ children, color = RED }) {
  return (
    <div style={{display:'inline-flex',alignItems:'center',gap:'.55rem',fontFamily:MONO,fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',color,marginBottom:'1rem'}}>
      <span style={{width:22,height:1,background:color}}></span>{children}
    </div>
  )
}
export function SectionHead({ eyebrow, title, sub, mb = '3rem' }) {
  return (
    <div style={{maxWidth:860,margin:`0 auto ${mb}`,textAlign:'center'}}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 style={{fontSize:'clamp(2rem,3.8vw,3.1rem)',fontWeight:900,letterSpacing:'-.038em',lineHeight:1.06,color:'#0a0a0a'}}>{title}</h2>
      {sub && <p style={{color:'#3d4356',fontSize:'clamp(1rem,1.4vw,1.16rem)',lineHeight:1.7,margin:'1.2rem auto 0',maxWidth:'60ch'}}>{sub}</p>}
    </div>
  )
}
export function Section({ children, id, pad = '4.5rem', max = 1400 }) {
  return (
    <section id={id} style={{padding:`${pad} clamp(1.5rem,4vw,5rem)`,background:'transparent'}}>
      <div style={{maxWidth:max,margin:'0 auto',width:'100%'}}>{children}</div>
    </section>
  )
}

/* ── buttons ── */
export function PrimaryBtn({ children, onClick }) {
  return (
    <button onClick={onClick}
      style={{background:'var(--red)',color:'#fff',padding:'1rem 2.1rem',borderRadius:12,fontSize:16,fontWeight:800,letterSpacing:'-.01em',boxShadow:'0 10px 30px rgba(204,31,31,.3)',transition:'transform .22s cubic-bezier(.22,1,.36,1),box-shadow .22s,background .18s'}}
      onMouseEnter={e=>{e.currentTarget.style.background='var(--red2)';e.currentTarget.style.transform='translateY(-3px)'}}
      onMouseLeave={e=>{e.currentTarget.style.background='var(--red)';e.currentTarget.style.transform=''}}>
      {children}
    </button>
  )
}
export function GhostBtn({ children, onClick }) {
  return (
    <button onClick={onClick}
      style={{background:'#fff',color:'#0a0a0a',padding:'1rem 2.1rem',borderRadius:12,fontSize:16,fontWeight:700,letterSpacing:'-.01em',border:'1.5px solid #d2d6e0',transition:'transform .22s cubic-bezier(.22,1,.36,1),border-color .18s'}}
      onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.borderColor='#0a0a0a'}}
      onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.borderColor='#d2d6e0'}}>
      {children}
    </button>
  )
}

/* ── page hero (same backdrop as the home hero) ── */
export function PageHero({ eyebrow, line1, line2, sub, primary, secondary, onSecondary }) {
  return (
    <section style={{paddingTop:72}}>
      <div style={{textAlign:'center',padding:'4rem clamp(1.5rem,4vw,5rem) 1.5rem',position:'relative',overflow:'hidden',display:'flex',flexDirection:'column',alignItems:'center'}}>
        <div aria-hidden="true" style={{position:'absolute',inset:0,pointerEvents:'none',background:'radial-gradient(58% 60% at 50% -8%, rgba(204,31,31,.11), transparent 70%)'}}></div>
        <div aria-hidden="true" style={{position:'absolute',inset:0,pointerEvents:'none',backgroundImage:'linear-gradient(#e6e8ee 1px,transparent 1px),linear-gradient(90deg,#e6e8ee 1px,transparent 1px)',backgroundSize:'60px 60px',opacity:.35,WebkitMaskImage:'radial-gradient(ellipse 75% 70% at 50% 20%,black 28%,transparent 72%)',maskImage:'radial-gradient(ellipse 75% 70% at 50% 20%,black 28%,transparent 72%)'}}></div>
        <div style={{position:'relative'}}><Eyebrow>{eyebrow}</Eyebrow></div>
        <h1 style={{position:'relative',fontSize:'clamp(2.5rem,6vw,5rem)',fontWeight:900,letterSpacing:'-.048em',lineHeight:1.03,color:'#0a0a0a',maxWidth:'17ch'}}>
          {line1}<br/><span style={{color:'var(--red)'}}>{line2}</span>
        </h1>
        <p style={{position:'relative',fontSize:'clamp(1.05rem,1.5vw,1.24rem)',fontWeight:600,color:'#3d4356',maxWidth:'58ch',margin:'1.6rem auto 2rem',lineHeight:1.7}}>{sub}</p>
        <div style={{position:'relative',display:'flex',gap:'.9rem',flexWrap:'wrap',justifyContent:'center'}}>
          <PrimaryBtn onClick={()=>goSection('contact')}>{primary || 'Book a live demo →'}</PrimaryBtn>
          {secondary && <GhostBtn onClick={onSecondary}>{secondary}</GhostBtn>}
        </div>
      </div>
    </section>
  )
}

/* ── medallion card, same recipe as the home page cards ── */
export function MedCard({ color = RED, icon, eyebrow, title, text, bullets, badge, children }) {
  return (
    <div data-reveal="true" className="flq-card-wrap">
      <div className="flq-card" style={{'--card-glow':`${color}2e`,display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',height:'100%',background:'#fff',border:'1px solid #e6e8ee',borderTop:`4px solid ${color}`,borderRadius:20,padding:'2.6rem 1.8rem 2.1rem',boxShadow:'0 2px 20px rgba(10,10,10,.07)'}}>
        <div style={{position:'relative',width:84,height:84,borderRadius:26,border:`2px solid ${color}33`,display:'flex',alignItems:'center',justifyContent:'center',color,marginTop:'-3.6rem',boxShadow:`0 10px 30px ${color}2e`,background:'#fff'}}>
          <div style={{position:'absolute',inset:4,borderRadius:22,background:`linear-gradient(145deg,${color}16,${color}06)`}}></div>
          <div style={{position:'relative'}}>{icon}</div>
          {badge && <span style={{position:'absolute',top:-9,right:-9,width:30,height:30,borderRadius:'50%',background:color,color:'#fff',fontSize:13,fontWeight:900,display:'flex',alignItems:'center',justifyContent:'center',border:'3px solid #fff',boxShadow:`0 4px 12px ${color}55`}}>{badge}</span>}
        </div>
        {eyebrow && <div style={{fontFamily:MONO,fontSize:10.5,letterSpacing:'.2em',textTransform:'uppercase',color,margin:'1.4rem 0 .55rem',fontWeight:500}}>{eyebrow}</div>}
        <h3 style={{fontSize:'1.2rem',fontWeight:900,letterSpacing:'-.028em',lineHeight:1.15,color:'#0a0a0a',margin:eyebrow?'0 0 .7rem':'1.4rem 0 .7rem'}}>{title}</h3>
        {text && <p style={{fontSize:'.96rem',color:'#3d4356',lineHeight:1.68,marginBottom:bullets?'1.3rem':0}}>{text}</p>}
        {bullets && (
          <div style={{display:'flex',flexDirection:'column',gap:'.55rem',width:'100%',marginTop:'auto'}}>
            {bullets.map(b=>(
              <div key={b} style={{display:'flex',alignItems:'flex-start',gap:'.5rem',fontSize:'.9rem',fontWeight:600,color:INK,textAlign:'left'}}><Tick color={color}/>{b}</div>
            ))}
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

/* ── FAQ ── */
export function Faq({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div style={{maxWidth:900,margin:'0 auto',display:'flex',flexDirection:'column',gap:'.8rem'}}>
      {items.map(([q,a],i)=>{
        const on = open === i
        return (
          <div key={q} style={{background:'#fff',border:`1px solid ${on?'rgba(204,31,31,.35)':'#e6e8ee'}`,borderRadius:16,boxShadow:on?'0 10px 34px rgba(204,31,31,.1)':'0 1px 4px rgba(10,10,10,.05)',transition:'box-shadow .25s,border-color .25s'}}>
            <button onClick={()=>setOpen(on?-1:i)} aria-expanded={on} style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'1rem',padding:'1.25rem 1.5rem',textAlign:'left',fontSize:'1.08rem',fontWeight:800,letterSpacing:'-.02em',color:'#0a0a0a'}}>
              {q}
              <span style={{flexShrink:0,width:30,height:30,borderRadius:'50%',background:on?'var(--red)':'#f3f4f6',color:on?'#fff':INK,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,fontWeight:700,transition:'background .2s,transform .25s',transform:on?'rotate(45deg)':'none'}}>+</span>
            </button>
            {on && <p style={{padding:'0 1.5rem 1.4rem',fontSize:'1rem',color:'#3d4356',lineHeight:1.75,maxWidth:'72ch'}}>{a}</p>}
          </div>
        )
      })}
    </div>
  )
}

/* ── "one process first" strip ── */
export function OneProcess() {
  return (
    <Section pad="1rem">
      <div data-reveal="true" style={{background:'linear-gradient(120deg,#fff3f3 0%,#ffffff 62%)',border:'1px solid rgba(204,31,31,.22)',borderLeft:'8px solid var(--red)',borderRadius:24,padding:'clamp(2rem,4vw,3.2rem)',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'2rem',flexWrap:'wrap',boxShadow:'0 20px 54px rgba(204,31,31,.12)'}}>
        <div style={{flex:'1 1 480px'}}>
          <div style={{fontFamily:MONO,fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--red)',marginBottom:'.8rem'}}>How to start</div>
          <div style={{fontSize:'clamp(1.6rem,3vw,2.4rem)',fontWeight:900,letterSpacing:'-.035em',lineHeight:1.1,color:'#0a0a0a'}}>Pick one process. Prove it. Then grow.</div>
          <p style={{fontSize:'1.04rem',color:'#3d4356',lineHeight:1.7,marginTop:'.9rem',maxWidth:'56ch'}}>One receiving dock, one production line, one inspection. We take it live against your real ERP, your operators use it on a real shift, and you decide the next step with numbers in hand.</p>
        </div>
        <PrimaryBtn onClick={()=>goSection('contact')}>Plan my first process →</PrimaryBtn>
      </div>
    </Section>
  )
}
