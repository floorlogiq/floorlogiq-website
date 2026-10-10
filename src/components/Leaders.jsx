const personas = [
  { role:'Plant Managers', outcome:'Stop bottlenecks in the same shift they start.',
    color:'#2563eb',
    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/></svg> },
  { role:'Operations Directors', outcome:'One number set. Every site. No spreadsheets.',
    color:'#7c3aed',
    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg> },
  { role:'Manufacturing Executives', outcome:'Floor reality tied to financial outcomes — live.',
    color:'#cc1f1f',
    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> },
  { role:'Warehouse Managers', outcome:'Every scan confirmed. ERP posted in under 5s.',
    color:'#d97706',
    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg> },
  { role:'Continuous Improvement', outcome:'Real baselines, not estimates. Prove every kaizen.',
    color:'#059669',
    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg> },
  { role:'CIOs & IT Leaders', outcome:'One governed hub your team can extend and own.',
    color:'#0891b2',
    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> },
]

export default function Leaders() {
  return (
    <section style={{padding:'4rem clamp(1.5rem,4vw,5rem)',background:'transparent'}}>
      <div style={{maxWidth:1400,margin:'0 auto',width:'100%'}}>
        <div style={{maxWidth:780,margin:'0 auto 2rem',textAlign:'center'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'.55rem',fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--red)',marginBottom:'1rem'}}>
            <span style={{width:22,height:1,background:'var(--red)'}}></span>Built for operations leaders
          </div>
          <h2 style={{fontSize:'clamp(2rem,3.6vw,3rem)',fontWeight:900,letterSpacing:'-.035em',lineHeight:1.08}}>One platform, every stakeholder.</h2>
          <p style={{color:'#4a5168',fontSize:'clamp(1rem,1.4vw,1.15rem)',lineHeight:1.7,margin:'1.1rem auto 0',maxWidth:'56ch'}}>From the floor to the boardroom — every role works from the same live truth, no spreadsheet bridges needed.</p>
        </div>
        <div className="grid-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1.1rem'}}>
          {personas.map(({role,outcome,color,icon})=>(
            <div key={role} data-reveal="true" className="flq-card-wrap"
              style={{'--card-glow':`${color}33`}}
              onMouseEnter={e=>{e.currentTarget.firstElementChild.style.background=`${color}13`}}
              onMouseLeave={e=>{e.currentTarget.firstElementChild.style.background=`${color}07`}}>
            <div className="flq-card"
              style={{border:`1px solid ${color}22`,borderRadius:16,padding:'1.8rem',background:`${color}07`,height:'100%'}}>
              <div style={{width:40,height:40,borderRadius:11,background:`${color}18`,border:`1px solid ${color}30`,display:'flex',alignItems:'center',justifyContent:'center',color,marginBottom:'.9rem'}}>
                {icon}
              </div>
              <h3 style={{fontSize:'1.05rem',fontWeight:900,letterSpacing:'-.02em',marginBottom:'.4rem'}}>{role}</h3>
              <p style={{fontSize:'.88rem',color:'#4a5168',lineHeight:1.7}}>{outcome}</p>
            </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
