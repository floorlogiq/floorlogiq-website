import { useState } from 'react'

function LogoMark({ size = 38 }) {
  const s = size
  return (
    <div style={{position:'relative',width:s,height:s,flexShrink:0}}>
      <div style={{position:'absolute',inset:0,border:`${s*0.105}px solid #0a0a0a`,transform:'rotate(45deg)'}}></div>
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:s*0.316,height:s*0.316,borderRadius:'50%',background:'#0a0a0a'}}></div>
      <div style={{position:'absolute',bottom:s*0.158,right:s*0.132,width:s*0.21,height:s*0.105,transform:'rotate(45deg)',transformOrigin:'right center',zIndex:2,backgroundColor:'#201d2e'}}></div>
      <div style={{position:'absolute',bottom:s*0.079,right:s*0.079,width:s*0.316,height:s*0.105,background:'#0a0a0a',transform:'rotate(45deg)',transformOrigin:'right center'}}></div>
    </div>
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
      <nav id="flq-nav" style={{position:'fixed',top:0,left:0,right:0,zIndex:200,height:68,background:'rgba(255,255,255,.97)',backdropFilter:'blur(16px)',WebkitBackdropFilter:'blur(16px)',borderBottom:'1px solid #e6e8ee',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 2.5rem',transition:'box-shadow .3s'}}>
        <div style={{display:'flex',alignItems:'center',gap:'2.6rem'}}>
          <button onClick={()=>navClick('home')} style={{display:'flex',alignItems:'center',gap:8}} aria-label="FloorLogiQ home">
            <LogoMark size={38}/>
            <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start',gap:2}}>
              <div style={{fontWeight:900,textTransform:'uppercase',lineHeight:.92,letterSpacing:'-.4px',fontSize:16,textAlign:'left'}}>FLOOR<br/>LOG<span style={{color:'var(--red)'}}>IQ</span></div>
              <span style={{fontFamily:'Tahoma,sans-serif',fontStyle:'italic',fontWeight:800,fontSize:9.5,letterSpacing:'.005em',color:'#4a5168',lineHeight:1,whiteSpace:'nowrap'}}>Where factory intelligence begins.</span>
            </div>
          </button>
          <div className="flq-navlinks" style={{display:'flex',alignItems:'center',gap:'1.8rem'}}>
            {[['industries','Industries'],['platform','Platform'],['qa','Services'],['results','Results'],['contact','Contact']].map(([id,label])=>(
              <button key={id} onClick={()=>navClick(id)} style={{fontSize:14.5,fontWeight:600,color:'#16161e'}}>{label}</button>
            ))}
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'1.1rem'}}>
          <a href="tel:+919345666656" style={{display:'flex',alignItems:'center',gap:'.45rem',fontSize:14,fontWeight:700,color:'#16161e'}}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <span style={{whiteSpace:'nowrap',fontSize:14}}>+91-93456-66656</span>
          </a>
          <button onClick={()=>navClick('contact')} style={{background:'var(--red)',color:'#fff',padding:'.6rem 1.4rem',borderRadius:10,fontSize:14,fontWeight:700,transition:'background .18s,transform .2s'}}
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
        <div style={{position:'fixed',top:68,left:0,right:0,zIndex:199,background:'rgba(255,255,255,.99)',backdropFilter:'blur(16px)',WebkitBackdropFilter:'blur(16px)',borderBottom:'1px solid #e6e8ee',boxShadow:'0 12px 30px rgba(10,10,10,.1)',padding:'1rem 1.25rem 1.4rem'}}>
          <div style={{display:'flex',flexDirection:'column'}}>
            {[['industries','Industries'],['platform','Platform'],['qa','Services'],['results','Results'],['contact','Contact']].map(([id,label])=>(
              <button key={id} onClick={()=>navClick(id)} style={{textAlign:'left',fontSize:16,fontWeight:700,color:'#16161e',padding:'.95rem .25rem',borderBottom:'1px solid #eef0f4'}}>{label}</button>
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
