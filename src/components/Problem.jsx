const gaps = [
  {
    stat:'ERP says 1,200. Floor says 1,050.',
    h:'Inventory nobody trusts',
    p:'Counts drift between the system and the rack. Planners buffer, buyers over-order, and the variance only surfaces at month-end — when it is already expensive.',
    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><line x1="12" y1="22" x2="12" y2="12"/><line x1="7" y1="9.5" x2="17" y2="14.5"/></svg>,
  },
  {
    stat:'Line stopped at 02:14. You heard at 07:00.',
    h:'Downtime found too late',
    p:'By the time a stoppage reaches a report, the shift is gone. No one can tell you whether it was tooling, material, or the operator waiting on a sign-off.',
    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  },
  {
    stat:'The auditor is here. The binder is not.',
    h:'Compliance rebuilt by hand',
    p:'Lot trace, device history, and e-signatures live across spreadsheets and paper. Every audit becomes a week of reconstruction instead of a query.',
    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/></svg>,
  },
]

export default function Problem() {
  return (
    <section style={{padding:'4rem clamp(1.5rem,4vw,5rem)',background:'transparent'}}>
      <div style={{maxWidth:1400,margin:'0 auto',width:'100%'}}>
        <div style={{maxWidth:820,margin:'0 auto 2.6rem',textAlign:'center'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'.55rem',fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--red)',marginBottom:'1rem'}}>
            <span style={{width:22,height:1,background:'var(--red)'}}></span>The gap
          </div>
          <h2 style={{fontSize:'clamp(2rem,3.6vw,3rem)',fontWeight:900,letterSpacing:'-.035em',lineHeight:1.08}}>
            Your systems and your floor<br/>are telling different stories.
          </h2>
          <p style={{color:'#4a5168',fontSize:'clamp(1rem,1.4vw,1.15rem)',lineHeight:1.7,margin:'1.1rem auto 0',maxWidth:'58ch'}}>
            Every manual hand-off is a place where reality and the record drift apart. The cost shows up as buffer stock, surprise downtime, and audits that eat a week.
          </p>
        </div>

        <div className="grid-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1.1rem'}}>
          {gaps.map(({stat,h,p,icon})=>(
            <div key={h} data-reveal="true" className="flq-card-wrap">
              <div className="flq-card" style={{background:'#fff',border:'1px solid #e6e8ee',borderLeft:'4px solid var(--red)',borderRadius:16,padding:'1.9rem',height:'100%',boxShadow:'0 2px 20px rgba(10,10,10,.07)'}}>
                <div style={{width:42,height:42,borderRadius:12,background:'rgba(204,31,31,.08)',border:'1px solid rgba(204,31,31,.16)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--red)',marginBottom:'1.1rem'}}>
                  {icon}
                </div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:12.5,fontWeight:500,color:'var(--red)',lineHeight:1.5,marginBottom:'.9rem',letterSpacing:'-.01em'}}>{stat}</div>
                <h3 style={{fontSize:'1.12rem',fontWeight:900,letterSpacing:'-.02em',marginBottom:'.5rem'}}>{h}</h3>
                <p style={{fontSize:'.88rem',color:'#4a5168',lineHeight:1.7}}>{p}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Transition line into the solution */}
        <div style={{textAlign:'center',marginTop:'2.8rem'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'.8rem',padding:'.9rem 1.8rem',borderRadius:50,background:'#0a0a0a',color:'#fff',fontSize:'clamp(.95rem,1.3vw,1.08rem)',fontWeight:700,letterSpacing:'-.01em'}}>
            <span style={{width:8,height:8,borderRadius:'50%',background:'#1d9d55',flexShrink:0,animation:'flqPulse 2s ease-in-out infinite'}}></span>
            FloorLogiQ closes the gap — live, at the point of work.
          </div>
        </div>
      </div>
    </section>
  )
}
