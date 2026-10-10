const personas = [
  { role:'Plant Managers', eyebrow:'On the floor', outcome:'Stop bottlenecks in the same shift they start.',
    color:'#cc1f1f', bullets:['Live line status','Downtime the moment it happens','Shift performance at a glance'],
    icon:<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/></svg> },
  { role:'Operations Directors', eyebrow:'Across sites', outcome:'One number set. Every site. No spreadsheets.',
    color:'#7c3aed', bullets:['Cross-site roll-ups','Like-for-like comparisons','No manual consolidation'],
    icon:<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg> },
  { role:'Manufacturing Executives', eyebrow:'In the boardroom', outcome:'Floor reality tied to financial outcomes — live.',
    color:'#d97706', bullets:['Cost per unit, live','Capacity vs. demand','Board-ready reporting'],
    icon:<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
  { role:'Warehouse Managers', eyebrow:'Dock to ship', outcome:'Every scan confirmed. ERP posted in under 5s.',
    color:'#0891b2', bullets:['Directed putaway & picking','Licence-plate tracking','Real-time ERP posting'],
    icon:<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg> },
  { role:'Continuous Improvement', eyebrow:'Kaizen teams', outcome:'Real baselines, not estimates. Prove every kaizen.',
    color:'#059669', bullets:['True before/after baselines','Variation visible by shift','Measured, not estimated'],
    icon:<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg> },
  { role:'CIOs & IT Leaders', eyebrow:'Platform owners', outcome:'One governed hub your team can extend and own.',
    color:'#2563eb', bullets:['Role-based access & audit','Your team extends it','No rip-and-replace'],
    icon:<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> },
]

export default function Leaders() {
  return (
    <section style={{padding:'4.5rem clamp(1.5rem,4vw,5rem) 3rem',background:'transparent'}}>
      <div style={{maxWidth:1500,margin:'0 auto',width:'100%'}}>
        <div style={{maxWidth:820,margin:'0 auto 4.5rem',textAlign:'center'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'.55rem',fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--red)',marginBottom:'1rem'}}>
            <span style={{width:22,height:1,background:'var(--red)'}}></span>Built for operations leaders
          </div>
          <h2 style={{fontSize:'clamp(2.2rem,4.2vw,3.5rem)',fontWeight:900,letterSpacing:'-.04em',lineHeight:1.04}}>One platform,<br/>every stakeholder.</h2>
          <p style={{color:'#4a5168',fontSize:'clamp(1rem,1.45vw,1.18rem)',lineHeight:1.7,margin:'1.3rem auto 0',maxWidth:'58ch'}}>From the floor to the boardroom — every role works from the same live truth, no spreadsheet bridges needed.</p>
        </div>

        <div className="grid-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'2.8rem 2rem'}}>
          {personas.map(({role,eyebrow,outcome,color,icon,bullets})=>(
            <div key={role} data-reveal="true" className="flq-card-wrap">
              <div className="flq-card" style={{'--card-glow':`${color}2e`,display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',height:'100%',background:'#fff',border:'1px solid #e6e8ee',borderTop:`4px solid ${color}`,borderRadius:20,padding:'2.4rem 1.7rem 2rem',boxShadow:'0 2px 20px rgba(10,10,10,.07)'}}>

                <div style={{position:'relative',width:82,height:82,borderRadius:25,border:`2px solid ${color}33`,display:'flex',alignItems:'center',justifyContent:'center',color,marginTop:'-3.5rem',boxShadow:`0 10px 30px ${color}2e`,background:'#fff'}}>
                  <div style={{position:'absolute',inset:4,borderRadius:21,background:`linear-gradient(145deg,${color}16,${color}06)`}}></div>
                  <div style={{position:'relative'}}>{icon}</div>
                </div>

                <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:'.2em',textTransform:'uppercase',color,margin:'1.4rem 0 .55rem',fontWeight:500}}>{eyebrow}</div>
                <h3 style={{fontSize:'1.18rem',fontWeight:900,letterSpacing:'-.028em',lineHeight:1.15,color:'#0a0a0a',marginBottom:'.65rem'}}>{role}</h3>
                <p style={{fontSize:'.9rem',color:'#4a5168',lineHeight:1.7,marginBottom:'1.3rem'}}>{outcome}</p>

                <div style={{display:'flex',flexDirection:'column',gap:'.5rem',width:'100%',marginTop:'auto'}}>
                  {bullets.map(b=>(
                    <div key={b} style={{display:'flex',alignItems:'center',gap:'.5rem',fontSize:'.82rem',fontWeight:600,color:'#16161e',textAlign:'left'}}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><polyline points="20 6 9 17 4 12"/></svg>
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
