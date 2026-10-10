const tiles = [
  { dir:'down', h:'Manual data entry', p:'Scans and device feeds replace clipboards and re-keying.',
    icon:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> },
  { dir:'up', h:'Inventory accuracy', p:'Every move is confirmed at the point of work.',
    icon:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg> },
  { dir:'up', h:'Production visibility', p:'Live OEE, throughput, and status across every line.',
    icon:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg> },
  { dir:'up', h:'Operator onboarding', p:'Guided workflows shorten time-to-productive.',
    icon:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg> },
  { dir:'down', h:'Process variation', p:'Enforced steps make the right way the only way.',
    icon:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg> },
  { dir:'up', h:'Schedule adherence', p:'Plan vs. actual is visible the moment it drifts.',
    icon:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="m9 16 2 2 4-4"/></svg> },
  { dir:'up', h:'Connected systems', p:"One change posts useful data everywhere it's needed.",
    icon:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> },
  { dir:'down', h:'Audit preparation', p:'Records are queried, not reconstructed from binders.',
    icon:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg> },
]

const UP   = { color:'#059669', arrow:'↑', label:'Increases' }
const DOWN = { color:'#cc1f1f', arrow:'↓', label:'Decreases' }

export default function Results() {
  return (
    <section id="results" style={{padding:'4.5rem clamp(1.5rem,4vw,5rem) 3rem',background:'transparent'}}>
      <div style={{maxWidth:1500,margin:'0 auto',width:'100%'}}>
        <div style={{maxWidth:820,margin:'0 auto 1.5rem',textAlign:'center'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'.55rem',fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--red)',marginBottom:'1rem'}}>
            <span style={{width:22,height:1,background:'var(--red)'}}></span>Outcomes
          </div>
          <h2 style={{fontSize:'clamp(2.2rem,4.2vw,3.5rem)',fontWeight:900,letterSpacing:'-.04em',lineHeight:1.04}}>Deliver measurable<br/>operational results.</h2>
          <p style={{color:'#4a5168',fontSize:'clamp(1rem,1.45vw,1.18rem)',lineHeight:1.7,margin:'1.3rem auto 0',maxWidth:'58ch'}}>FloorLogiQ targets the operational levers that move the business — the same ones your continuous-improvement teams already chase.</p>
        </div>

        {/* Legend */}
        <div style={{display:'flex',justifyContent:'center',gap:'1.6rem',flexWrap:'wrap',marginBottom:'4.5rem'}}>
          {[DOWN,UP].map(({color,arrow,label})=>(
            <div key={label} style={{display:'flex',alignItems:'center',gap:'.5rem',fontSize:12.5,fontWeight:700,color:'#4a5168'}}>
              <span style={{width:22,height:22,borderRadius:'50%',background:`${color}15`,border:`1px solid ${color}33`,color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:900}}>{arrow}</span>
              {label}
            </div>
          ))}
        </div>

        <div className="grid-4col" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'2.6rem 1.8rem'}}>
          {tiles.map(({dir,h,p,icon})=>{
            const { color, arrow } = dir === 'up' ? UP : DOWN
            return (
              <div key={h} data-reveal="true" className="flq-card-wrap">
                <div className="flq-card" style={{'--card-glow':`${color}2e`,display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',height:'100%',background:'#fff',border:'1px solid #e6e8ee',borderTop:`4px solid ${color}`,borderRadius:20,padding:'2.2rem 1.4rem 1.8rem',boxShadow:'0 2px 20px rgba(10,10,10,.07)'}}>

                  <div style={{position:'relative',width:76,height:76,borderRadius:23,border:`2px solid ${color}33`,display:'flex',alignItems:'center',justifyContent:'center',color,marginTop:'-3.2rem',boxShadow:`0 10px 28px ${color}2e`,background:'#fff'}}>
                    <div style={{position:'absolute',inset:4,borderRadius:19,background:`linear-gradient(145deg,${color}16,${color}06)`}}></div>
                    <div style={{position:'relative'}}>{icon}</div>
                    <span style={{position:'absolute',top:-9,right:-9,width:28,height:28,borderRadius:'50%',background:color,color:'#fff',fontSize:15,fontWeight:900,display:'flex',alignItems:'center',justifyContent:'center',border:'3px solid #fff',boxShadow:`0 4px 12px ${color}55`,lineHeight:1}}>{arrow}</span>
                  </div>

                  <h3 style={{fontSize:'1.06rem',fontWeight:900,letterSpacing:'-.028em',lineHeight:1.18,color:'#0a0a0a',margin:'1.3rem 0 .55rem'}}>{h}</h3>
                  <p style={{fontSize:'.85rem',color:'#4a5168',lineHeight:1.7}}>{p}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
