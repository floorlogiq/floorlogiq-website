export default function Hero() {
  return (
    <section id="home" style={{paddingTop:68}}>
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
        <p style={{position:'relative',fontSize:'clamp(1.05rem,1.6vw,1.28rem)',color:'#4a5168',maxWidth:'60ch',margin:'1.9rem auto 2.4rem',lineHeight:1.7,opacity:0,animation:'flqFadeUp .8s ease 1.05s forwards'}}>
          Built on the FUUZ platform, FloorLogiQ unifies your warehouse, production lines, maintenance, quality, and ERP into one live system — so what your dashboard says is exactly what your floor is actually doing.
        </p>
      </div>
    </section>
  )
}
