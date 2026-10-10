const gaps = [
  {
    color:'#cc1f1f',
    stat:'ERP says 1,200. Floor says 1,050.',
    h:'Inventory nobody trusts',
    p:'Counts drift between the system and the rack. Planners buffer, buyers over-order, and the variance only surfaces at month-end — when it is already expensive.',
    icon:<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><line x1="12" y1="22" x2="12" y2="12"/><line x1="7" y1="9.5" x2="17" y2="14.5"/></svg>,
  },
  {
    color:'#d97706',
    stat:'Line stopped at 02:14. You heard at 07:00.',
    h:'Downtime found too late',
    p:'By the time a stoppage reaches a report, the shift is gone. No one can tell you whether it was tooling, material, or the operator waiting on a sign-off.',
    icon:<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  },
  {
    color:'#be123c',
    stat:'The auditor is here. The binder is not.',
    h:'Compliance rebuilt by hand',
    p:'Lot trace, device history, and e-signatures live across spreadsheets and paper. Every audit becomes a week of reconstruction instead of a query.',
    icon:<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/></svg>,
  },
  {
    color:'#7c3aed',
    stat:'Three systems. Three different numbers.',
    h:'Reports nobody agrees on',
    p:'Production, finance, and the warehouse each pull their own extract. The Monday meeting is spent reconciling spreadsheets instead of deciding anything.',
    icon:<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="6"/><rect x="13" y="8" width="3" height="10"/></svg>,
  },
  {
    color:'#b45309',
    stat:'The spec changed. The floor never knew.',
    h:'Revisions that arrive late',
    p:'An engineering change clears on Tuesday and reaches the line on Friday — after a shift has already been built to the superseded drawing.',
    icon:<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>,
  },
  {
    color:'#0891b2',
    stat:'New operator. Two weeks of shadowing.',
    h:'Knowledge locked in people',
    p:'The process lives in the heads of your most experienced staff. Every hire, every vacation, and every retirement is a throughput risk.',
    icon:<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
]

export default function Problem() {
  return (
    <section style={{padding:'4.5rem clamp(1.5rem,4vw,5rem) 3rem',background:'transparent'}}>
      <div style={{maxWidth:1500,margin:'0 auto',width:'100%'}}>
        <div style={{maxWidth:860,margin:'0 auto 4.5rem',textAlign:'center'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'.55rem',fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--red)',marginBottom:'1rem'}}>
            <span style={{width:22,height:1,background:'var(--red)'}}></span>The gap
          </div>
          <h2 style={{fontSize:'clamp(2.2rem,4.2vw,3.5rem)',fontWeight:900,letterSpacing:'-.04em',lineHeight:1.04}}>
            Your systems and your floor<br/>are telling <span style={{color:'var(--red)'}}>different stories</span>.
          </h2>
          <p style={{color:'#4a5168',fontSize:'clamp(1rem,1.45vw,1.18rem)',lineHeight:1.7,margin:'1.3rem auto 0',maxWidth:'58ch'}}>
            Every manual hand-off is a place where reality and the record drift apart. The cost shows up as buffer stock, surprise downtime, and audits that eat a week.
          </p>
        </div>

        <div className="grid-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'2.8rem 2rem'}}>
          {gaps.map(({stat,h,p,icon,color})=>(
            <div key={h} data-reveal="true" className="flq-card-wrap">
              <div className="flq-card" style={{'--card-glow':`${color}2e`,display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',height:'100%',background:'#fff',border:'1px solid #e6e8ee',borderTop:`4px solid ${color}`,borderRadius:20,padding:'2.4rem 1.7rem 2rem',boxShadow:'0 2px 20px rgba(10,10,10,.07)'}}>

                <div style={{position:'relative',width:82,height:82,borderRadius:25,border:`2px solid ${color}33`,display:'flex',alignItems:'center',justifyContent:'center',color,marginTop:'-3.5rem',boxShadow:`0 10px 30px ${color}2e`,background:'#fff'}}>
                  <div style={{position:'absolute',inset:4,borderRadius:21,background:`linear-gradient(145deg,${color}16,${color}06)`}}></div>
                  <div style={{position:'relative'}}>{icon}</div>
                  <span style={{position:'absolute',top:-9,right:-9,width:28,height:28,borderRadius:'50%',background:color,color:'#fff',fontSize:16,fontWeight:900,display:'flex',alignItems:'center',justifyContent:'center',border:'3px solid #fff',boxShadow:`0 4px 12px ${color}55`,lineHeight:1}}>!</span>
                </div>

                <div style={{fontFamily:"'DM Mono',monospace",fontSize:12.5,fontWeight:500,color,lineHeight:1.55,margin:'1.4rem 0 1rem',letterSpacing:'-.01em',padding:'.6rem .9rem',background:`${color}0d`,border:`1px solid ${color}1f`,borderRadius:10,width:'100%'}}>{stat}</div>

                <h3 style={{fontSize:'1.15rem',fontWeight:900,letterSpacing:'-.028em',lineHeight:1.15,color:'#0a0a0a',marginBottom:'.6rem'}}>{h}</h3>
                <p style={{fontSize:'.88rem',color:'#4a5168',lineHeight:1.7}}>{p}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Transition line into the solution */}
        <div style={{textAlign:'center',marginTop:'3.4rem'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'.8rem',padding:'.9rem 1.8rem',borderRadius:50,background:'#0a0a0a',color:'#fff',fontSize:'clamp(.95rem,1.3vw,1.08rem)',fontWeight:700,letterSpacing:'-.01em'}}>
            <span style={{width:8,height:8,borderRadius:'50%',background:'#1d9d55',flexShrink:0,animation:'flqPulse 2s ease-in-out infinite'}}></span>
            FloorLogiQ closes the gap — live, at the point of work.
          </div>
        </div>
      </div>
    </section>
  )
}
