const steps = [
  {
    phase:'Connect', n:1, time:'Week 1–3', color:'#cc1f1f',
    h:'Connect everything',
    p:'Scanners, PLCs, scales and printers on one side; NetSuite, SAP and EDI partners on the other — every transaction flowing both ways.',
    bullets:['Device gateway live','ERP two-way sync','EDI partners onboarded'],
    icon:<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
  },
  {
    phase:'Visibility', n:2, time:'Week 3–6', color:'#7c3aed',
    h:'See it live',
    p:'OEE, throughput, scrap and 30+ ISO 22400 KPIs computed live — every number traceable to the scan that created it.',
    bullets:['Live OEE & downtime','Traceable to the scan','Cross-site roll-ups'],
    icon:<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  },
  {
    phase:'Standardize', n:3, time:'Month 2–3', color:'#d97706',
    h:'Standardize execution',
    p:'Operators get guided digital workflows and enforced data entry, so the right way becomes the only way — on every shift.',
    bullets:['Guided operator steps','Enforced data entry','Inline quality gates'],
    icon:<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>,
  },
  {
    phase:'Scale', n:4, time:'Month 3+', color:'#059669',
    h:'Scale without rebuilding',
    p:'Roll the same architecture across lines, warehouses and plants — your team extends it, with no rip-and-replace.',
    bullets:['One architecture','Your team extends it','No rip-and-replace'],
    icon:<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/></svg>,
  },
]

export default function HowItWorks() {
  return (
    <section style={{background:'transparent',color:'#0a0a0a',position:'relative',padding:'4.5rem 0 3rem'}}>
      <div style={{textAlign:'center',padding:'0 clamp(1.5rem,4vw,5rem)',maxWidth:900,margin:'0 auto'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:'.55rem',fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--red)',marginBottom:'1rem'}}>
          <span style={{width:22,height:1,background:'var(--red)'}}></span>How it works
        </div>
        <h2 style={{color:'#0a0a0a',fontSize:'clamp(2.2rem,4.2vw,3.5rem)',fontWeight:900,letterSpacing:'-.04em',lineHeight:1.04}}>
          The tagline isn't a slogan.<br/>It's the <span style={{color:'var(--red)'}}>implementation plan</span>.
        </h2>
        <p style={{color:'#4a5168',fontSize:'clamp(1rem,1.45vw,1.18rem)',lineHeight:1.7,margin:'1.3rem auto 0',maxWidth:'58ch'}}>
          Start with one line or one zone, connect it to the systems you already run, then scale the same platform across the enterprise — without rebuilding.
        </p>
      </div>

      <div style={{position:'relative',maxWidth:1500,margin:'0 auto',padding:'3.5rem clamp(1.5rem,4vw,4rem) 2rem'}}>
        {/* Connecting rail */}
        <div className="flq-rail" style={{position:'absolute',top:'calc(3.5rem + 44px)',left:'calc(clamp(1.5rem,4vw,4rem) + 11%)',right:'calc(clamp(1.5rem,4vw,4rem) + 11%)',height:4,background:'linear-gradient(90deg,#cc1f1f,#7c3aed,#d97706,#059669)',borderRadius:3,opacity:.22}}>
          <div style={{position:'absolute',top:'50%',left:0,width:15,height:15,marginTop:-7.5,borderRadius:'50%',background:'var(--red)',boxShadow:'0 0 16px var(--red)',animation:'flqTravel 5s linear infinite'}}></div>
        </div>

        <div className="howitworks-grid" style={{position:'relative',display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'2rem'}}>
          {steps.map(({phase,n,h,p,time,icon,color,bullets})=>(
            <div key={n} data-reveal="true" className="flq-card-wrap">
              <div className="flq-card" style={{'--card-glow':`${color}2e`,display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',height:'100%',background:'#fff',border:'1px solid #e6e8ee',borderTop:`4px solid ${color}`,borderRadius:20,padding:'2.4rem 1.6rem 1.9rem',boxShadow:'0 2px 20px rgba(10,10,10,.07)'}}>

                {/* Icon medallion */}
                <div style={{position:'relative',width:88,height:88,borderRadius:26,background:`linear-gradient(145deg,${color}1a,${color}08)`,border:`2px solid ${color}33`,display:'flex',alignItems:'center',justifyContent:'center',color,marginTop:'-3.6rem',boxShadow:`0 10px 30px ${color}2e`,backgroundColor:'#fff'}}>
                  <div style={{position:'absolute',inset:4,borderRadius:22,background:`linear-gradient(145deg,${color}16,${color}06)`}}></div>
                  <div style={{position:'relative'}}>{icon}</div>
                  <span style={{position:'absolute',top:-10,right:-10,width:32,height:32,borderRadius:'50%',background:color,color:'#fff',fontSize:14,fontWeight:900,display:'flex',alignItems:'center',justifyContent:'center',border:'3px solid #fff',boxShadow:`0 4px 12px ${color}55`}}>{n}</span>
                </div>

                <div style={{fontFamily:"'DM Mono',monospace",fontSize:10.5,letterSpacing:'.2em',textTransform:'uppercase',color,margin:'1.5rem 0 .6rem',fontWeight:500}}>{phase}</div>

                <h3 style={{fontSize:'clamp(1.25rem,1.7vw,1.5rem)',fontWeight:900,letterSpacing:'-.032em',lineHeight:1.12,color:'#0a0a0a',marginBottom:'.7rem'}}>{h}</h3>

                <p style={{fontSize:'.9rem',color:'#4a5168',lineHeight:1.7,marginBottom:'1.3rem'}}>{p}</p>

                <div style={{display:'flex',flexDirection:'column',gap:'.5rem',width:'100%',marginBottom:'1.4rem'}}>
                  {bullets.map(b=>(
                    <div key={b} style={{display:'flex',alignItems:'center',gap:'.5rem',fontSize:'.82rem',fontWeight:600,color:'#16161e',textAlign:'left'}}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><polyline points="20 6 9 17 4 12"/></svg>
                      {b}
                    </div>
                  ))}
                </div>

                <span style={{marginTop:'auto',padding:'.45rem 1.1rem',borderRadius:50,background:`${color}0f`,border:`1px solid ${color}2e`,fontFamily:"'DM Mono',monospace",fontSize:10.5,letterSpacing:'.1em',textTransform:'uppercase',color,fontWeight:700}}>{time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
