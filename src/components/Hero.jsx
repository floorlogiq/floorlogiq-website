function navClick(id) {
  const el = document.getElementById(id)
  if (el) window.scrollTo({top: el.getBoundingClientRect().top + window.scrollY - 64, behavior:'smooth'})
}

const trustItems = [
  'Built on the FUUZ platform',
  '44+ pre-built connectors',
  'ISO 22400 KPIs native',
  '21 CFR Part 11 ready',
]

export default function Hero() {
  return (
    <section id="home" style={{paddingTop:72}}>
      <div style={{textAlign:'center',padding:'3.5rem 2.5rem 0',position:'relative',overflow:'hidden',display:'flex',flexDirection:'column',alignItems:'center'}}>
        <div aria-hidden="true" style={{position:'absolute',inset:0,pointerEvents:'none',background:'radial-gradient(58% 46% at 50% -4%, rgba(204,31,31,.11), transparent 70%), radial-gradient(40% 42% at 84% 16%, rgba(91,48,223,.09), transparent 72%), radial-gradient(42% 44% at 12% 26%, rgba(3,202,175,.07), transparent 72%)'}}></div>
        <div aria-hidden="true" style={{position:'absolute',inset:0,pointerEvents:'none',backgroundImage:'linear-gradient(#e6e8ee 1px,transparent 1px),linear-gradient(90deg,#e6e8ee 1px,transparent 1px)',backgroundSize:'60px 60px',opacity:.35,WebkitMaskImage:'radial-gradient(ellipse 75% 60% at 50% 18%,black 28%,transparent 72%)',maskImage:'radial-gradient(ellipse 75% 60% at 50% 18%,black 28%,transparent 72%)',left:-3,top:5}}></div>

        <div style={{position:'relative',display:'inline-flex',alignItems:'center',gap:'.55rem',fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--red)',marginBottom:'1.6rem',opacity:0,animation:'flqFadeUp .8s ease .15s forwards'}}>
          <span style={{width:22,height:1,background:'var(--red)'}}></span>Industrial operations platform
        </div>

        <h1 style={{position:'relative'}} aria-label="Deploy fast. Operate smart.">
          <span style={{overflow:'hidden',display:'block',width:'max-content',maxWidth:'100%',margin:'0 auto'}}>
            <span style={{display:'inline-block',whiteSpace:'nowrap',fontSize:'clamp(3.2rem,9vw,7.6rem)',fontWeight:900,letterSpacing:'-.05em',lineHeight:1.04,color:'#0a0a0a',transform:'translateY(110%)',animation:'flqWordUp .85s cubic-bezier(.22,1,.36,1) .2s forwards',paddingRight:'.16em'}}>Deploy fast.</span>
          </span>
          <span style={{overflow:'hidden',display:'block',width:'max-content',maxWidth:'100%',margin:'0 auto'}}>
            <span style={{display:'inline-block',whiteSpace:'nowrap',fontSize:'clamp(3.2rem,9vw,7.6rem)',fontWeight:900,letterSpacing:'-.05em',lineHeight:1.04,color:'var(--red)',transform:'translateY(110%)',animation:'flqWordUp .85s cubic-bezier(.22,1,.36,1) .42s forwards',paddingRight:'.16em'}}>Operate smart.</span>
          </span>
        </h1>

        <p style={{position:'relative',fontSize:'clamp(1.05rem,1.6vw,1.28rem)',fontWeight:700,color:'#4a5168',maxWidth:'60ch',margin:'1.9rem auto 2.2rem',lineHeight:1.7,opacity:0,animation:'flqFadeUp .8s ease 1.05s forwards'}}>
          FloorLogiQ unifies your warehouse, production, CMMS, quality, and ERP into one live system — built on the FUUZ platform, so your dashboard always matches your floor.
        </p>

        {/* CTAs */}
        <div style={{position:'relative',display:'flex',gap:'.9rem',flexWrap:'wrap',justifyContent:'center',opacity:0,animation:'flqFadeUp .8s ease 1.25s forwards'}}>
          <button onClick={()=>navClick('contact')}
            style={{background:'var(--red)',color:'#fff',padding:'1rem 2.1rem',borderRadius:12,fontSize:16,fontWeight:800,letterSpacing:'-.01em',boxShadow:'0 10px 30px rgba(204,31,31,.3)',transition:'transform .22s cubic-bezier(.22,1,.36,1),box-shadow .22s,background .18s'}}
            onMouseEnter={e=>{e.currentTarget.style.background='var(--red2)';e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 18px 44px rgba(204,31,31,.4)'}}
            onMouseLeave={e=>{e.currentTarget.style.background='var(--red)';e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='0 10px 30px rgba(204,31,31,.3)'}}>
            Book a live demo →
          </button>
          <button onClick={()=>navClick('customers-pre')}
            style={{background:'#fff',color:'#0a0a0a',padding:'1rem 2.1rem',borderRadius:12,fontSize:16,fontWeight:700,letterSpacing:'-.01em',border:'1.5px solid #d2d6e0',transition:'transform .22s cubic-bezier(.22,1,.36,1),box-shadow .22s,border-color .18s'}}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 14px 34px rgba(10,10,10,.12)';e.currentTarget.style.borderColor='#0a0a0a'}}
            onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='';e.currentTarget.style.borderColor='#d2d6e0'}}>
            See how it connects
          </button>
        </div>

        {/* Trust strip */}
        <div style={{position:'relative',display:'flex',gap:'.6rem 1.6rem',flexWrap:'wrap',justifyContent:'center',marginTop:'2.2rem',opacity:0,animation:'flqFadeUp .8s ease 1.45s forwards'}}>
          {trustItems.map(t=>(
            <div key={t} style={{display:'flex',alignItems:'center',gap:'.45rem',fontSize:12.5,fontWeight:600,color:'#8a90a8'}}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1d9d55" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
