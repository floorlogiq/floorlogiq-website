const tiles = [
  { arrow:'↓', color:'var(--red)', h:'Manual data entry', p:'Scans and device feeds replace clipboards and re-keying.',
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> },
  { arrow:'↑', color:'#1d9d55', h:'Inventory accuracy', p:'Every move is confirmed at the point of work.',
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg> },
  { arrow:'↑', color:'#1d9d55', h:'Production visibility', p:'Live OEE, throughput, and status across every line.',
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg> },
  { arrow:'↑', color:'#1d9d55', h:'Operator onboarding', p:'Guided workflows shorten time-to-productive.',
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg> },
  { arrow:'↓', color:'var(--red)', h:'Process variation', p:'Enforced steps make the right way the only way.',
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg> },
  { arrow:'↑', color:'#1d9d55', h:'Schedule adherence', p:'Plan vs. actual is visible the moment it drifts.',
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="m9 16 2 2 4-4"/></svg> },
  { arrow:'↑', color:'#1d9d55', h:'Connected systems', p:"One change posts useful data everywhere it's needed.",
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> },
  { arrow:'↑', color:'#1d9d55', h:'Continuous improvement', p:'Real baselines make every kaizen measurable.',
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg> },
]

export default function Results() {
  return (
    <section id="results" style={{padding:'4rem clamp(1.5rem,4vw,5rem)',background:'transparent'}}>
      <div style={{maxWidth:1400,margin:'0 auto',width:'100%'}}>
        <div style={{maxWidth:780,margin:'0 auto 2rem',textAlign:'center'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'.55rem',fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--red)',marginBottom:'1rem'}}>
            <span style={{width:22,height:1,background:'var(--red)'}}></span>Outcomes
          </div>
          <h2 style={{fontSize:'clamp(2rem,3.6vw,3rem)',fontWeight:900,letterSpacing:'-.035em',lineHeight:1.08}}>Deliver measurable operational results.</h2>
          <p style={{color:'#4a5168',fontSize:'clamp(1rem,1.4vw,1.15rem)',lineHeight:1.7,margin:'1.1rem auto 0',maxWidth:'56ch'}}>FloorLogiQ targets the operational levers that move the business — the same ones your continuous-improvement teams already chase.</p>
        </div>
        <div className="grid-4col" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1rem'}}>
          {tiles.map(({arrow,color,h,p,icon})=>(
            <div key={h} className="flq-card-wrap">
            <div className="flq-card"
              style={{background:'#fff',border:'1px solid #e6e8ee',borderRadius:16,padding:'1.6rem',boxShadow:'0 2px 20px rgba(10,10,10,.07)',display:'flex',flexDirection:'column',gap:'.9rem',height:'100%'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div style={{width:44,height:44,borderRadius:12,background:'linear-gradient(135deg,rgba(204,31,31,.12) 0%,rgba(204,31,31,.05) 100%)',border:'1px solid rgba(204,31,31,.15)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--red)',flexShrink:0}}>
                  {icon}
                </div>
                <span style={{fontSize:'1.1rem',fontWeight:900,color,background:color==='var(--red)'?'rgba(204,31,31,.08)':'rgba(29,157,85,.08)',padding:'.25rem .55rem',borderRadius:8,lineHeight:1}}>{arrow}</span>
              </div>
              <div>
                <div style={{fontWeight:800,fontSize:'1rem',letterSpacing:'-.01em',marginBottom:'.3rem'}}>{h}</div>
                <div style={{fontSize:'.85rem',color:'#8a90a8',lineHeight:1.6}}>{p}</div>
              </div>
            </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
