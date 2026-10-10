import { useState } from 'react'

function LogoMark({ size = 52 }) {
  const s = size
  const cx = s / 2, cy = s / 2
  const stroke = s * 0.105
  const r = s * 0.158
  const rx = s * 0.1
  // bar: pivot between circle edge and outside, so it reads as magnifying-glass handle
  const px = cx + s * 0.30, py = cy + s * 0.30
  const bw = s * 0.42, bh = s * 0.115
  return (
    <svg width={s * 1.45} height={s * 1.45} viewBox={`${-s*0.25} ${-s*0.25} ${s*1.5} ${s*1.5}`} style={{flexShrink:0}} aria-hidden="true">
      {/* Diamond with thick rounded-corner stroke */}
      <rect x={cx - s*0.5} y={cy - s*0.5} width={s} height={s} rx={rx} fill="none" stroke="#0a0a0a" strokeWidth={stroke} transform={`rotate(45,${cx},${cy})`}/>
      {/* Circle — large, slightly left of centre */}
      <circle cx={cx - s*0.04} cy={cy} r={s * 0.21} fill="#0a0a0a"/>
      {/* Handle: starts inside circle, crosses lower-right border, extends outside */}
      <rect x={px - bw/2} y={py - bh/2} width={bw} height={bh} rx={bh * 0.5} fill="#0a0a0a" transform={`rotate(45,${px},${py})`}/>
    </svg>
  )
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  function scrollTo(id) {
    if (id === 'home') { window.scrollTo({top:0,behavior:'smooth'}); return; }
    const el = document.getElementById(id)
    if (el) window.scrollTo({top: el.getBoundingClientRect().top + window.scrollY - 64, behavior:'smooth'})
  }

  function navClick(id) {
    scrollTo(id)
    setMenuOpen(false)
  }

  return (
    <>
      <nav id="flq-nav" style={{position:'fixed',top:0,left:0,right:0,zIndex:200,height:72,background:'rgba(255,255,255,.97)',backdropFilter:'blur(16px)',WebkitBackdropFilter:'blur(16px)',borderBottom:'1px solid #e6e8ee',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 clamp(1.5rem,3vw,4rem)',transition:'box-shadow .3s'}}>
        <div style={{display:'flex',alignItems:'center',gap:'2rem'}}>
          <button onClick={()=>navClick('home')} style={{display:'flex',alignItems:'center',gap:8}} aria-label="FloorLogiQ home">
            <LogoMark size={36}/>
            <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start',gap:2}}>
              <div style={{fontWeight:900,textTransform:'uppercase',lineHeight:.92,letterSpacing:'-.4px',fontSize:16,textAlign:'left',color:'#0a0a0a'}}>FLOOR<br/>LOG<span style={{color:'var(--red)'}}>IQ</span></div>
              <span style={{fontFamily:'Tahoma,sans-serif',fontStyle:'italic',fontWeight:800,fontSize:9,letterSpacing:'.005em',color:'#4a5168',lineHeight:1,whiteSpace:'nowrap'}}>Where factory intelligence begins.</span>
            </div>
          </button>
          <div className="flq-navlinks" style={{display:'flex',alignItems:'center',gap:'1.4rem'}}>
            {[['industries','Industries'],['platform','Platform'],['qa','Services'],['contact','Contact']].map(([id,label])=>(
              <button key={id} onClick={()=>navClick(id)} style={{fontSize:14,fontWeight:600,color:'#16161e'}}>{label}</button>
            ))}
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'.9rem'}}>
          <a href="tel:+919345666656" style={{display:'flex',alignItems:'center',gap:'.4rem',fontSize:14,fontWeight:700,color:'#16161e'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <span style={{whiteSpace:'nowrap'}}>+91-93456-66656</span>
          </a>
          <button onClick={()=>navClick('contact')} style={{background:'var(--red)',color:'#fff',padding:'.6rem 1.3rem',borderRadius:8,fontSize:14,fontWeight:700,transition:'background .18s,transform .2s'}}
            onMouseEnter={e=>{e.target.style.background='var(--red2)';e.target.style.transform='translateY(-1px)'}}
            onMouseLeave={e=>{e.target.style.background='var(--red)';e.target.style.transform=''}}>Book a demo</button>
          <button className="flq-burger" onClick={()=>setMenuOpen(o=>!o)} aria-label="Open menu" aria-expanded={menuOpen} style={{display:'none',alignItems:'center',justifyContent:'center',width:42,height:42,borderRadius:10,border:'1px solid #e6e8ee',background:'#fff'}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              {menuOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div style={{position:'fixed',top:72,left:0,right:0,zIndex:199,background:'rgba(255,255,255,.99)',backdropFilter:'blur(16px)',WebkitBackdropFilter:'blur(16px)',borderBottom:'1px solid #e6e8ee',boxShadow:'0 12px 30px rgba(10,10,10,.1)',padding:'1rem 1.25rem 1.4rem'}}>
          <div style={{display:'flex',flexDirection:'column'}}>
            {[['industries','Industries'],['platform','Platform'],['qa','Services'],['contact','Contact']].map(([id,label])=>(
              <button key={id} onClick={()=>navClick(id)} style={{textAlign:'left',fontSize:17,fontWeight:700,color:'#16161e',padding:'.95rem .25rem',borderBottom:'1px solid #eef0f4'}}>{label}</button>
            ))}
          </div>
          <a href="tel:+919345666656" style={{display:'flex',alignItems:'center',gap:'.55rem',marginTop:'1.1rem',fontSize:15,fontWeight:700,color:'#16161e'}}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            +91-93456-66656
          </a>
          <button onClick={()=>navClick('contact')} style={{width:'100%',marginTop:'1rem',background:'var(--red)',color:'#fff',padding:'.85rem',borderRadius:10,fontSize:15,fontWeight:700}}>Book a demo</button>
        </div>
      )}
    </>
  )
}
