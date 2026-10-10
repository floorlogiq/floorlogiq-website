import { useEffect, useState } from 'react'

function navClick(id) {
  const el = document.getElementById(id)
  if (el) window.scrollTo({top: el.getBoundingClientRect().top + window.scrollY - 64, behavior:'smooth'})
}

export default function StickyCTA() {
  const [show, setShow] = useState(false)

  useEffect(()=>{
    const onScroll = ()=>{
      const y = window.scrollY
      const contact = document.getElementById('contact')
      const contactTop = contact ? contact.getBoundingClientRect().top + window.scrollY : Infinity
      // show after the hero, hide once the contact form is in view
      setShow(y > 900 && y < contactTop - 600)
    }
    window.addEventListener('scroll', onScroll, { passive:true })
    onScroll()
    return ()=>window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{
      position:'fixed', bottom:24, right:24, zIndex:280,
      display:'flex', alignItems:'center', gap:'.75rem',
      background:'#0a0a0a', color:'#fff',
      padding:'.7rem .8rem .7rem 1.3rem', borderRadius:50,
      boxShadow:'0 14px 44px rgba(10,10,10,.3)',
      transform: show ? 'translateY(0) scale(1)' : 'translateY(24px) scale(.94)',
      opacity: show ? 1 : 0,
      pointerEvents: show ? 'auto' : 'none',
      transition:'opacity .35s cubic-bezier(.22,1,.36,1),transform .35s cubic-bezier(.22,1,.36,1)',
    }}>
      <span style={{width:8,height:8,borderRadius:'50%',background:'#1d9d55',flexShrink:0,animation:'flqPulse 2s ease-in-out infinite'}}></span>
      <span className="flq-sticky-label" style={{fontSize:14,fontWeight:700,letterSpacing:'-.01em',whiteSpace:'nowrap'}}>See it on your floor</span>
      <button onClick={()=>navClick('contact')}
        style={{background:'var(--red)',color:'#fff',padding:'.6rem 1.25rem',borderRadius:50,fontSize:14,fontWeight:800,whiteSpace:'nowrap',transition:'background .18s,transform .2s'}}
        onMouseEnter={e=>{e.currentTarget.style.background='var(--red2)';e.currentTarget.style.transform='scale(1.04)'}}
        onMouseLeave={e=>{e.currentTarget.style.background='var(--red)';e.currentTarget.style.transform=''}}>
        Book a demo
      </button>
    </div>
  )
}
