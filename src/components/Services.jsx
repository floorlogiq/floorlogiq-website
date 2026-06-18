function navClick(id) {
  const el = document.getElementById(id)
  if (el) window.scrollTo({top: el.getBoundingClientRect().top + window.scrollY - 64, behavior:'smooth'})
}

const solutions = [
  { abbr:'WMS', h:'Warehouse Management', p:'Direct every scan from dock to ship — receiving, putaway, picking, pack-out and shipping posting to your ERP in real time.', checks:['Receiving & putaway','Wave & batch picking','Pack-out & shipping','Cycle counting'],
    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg> },
  { abbr:'MES', h:'Manufacturing Execution', p:'Run work orders on the floor with live OEE, downtime capture, labor tracking and full serial genealogy from raw material to finished good.', checks:['Work order execution','OEE & downtime','Serial genealogy','Labor & scheduling'],
    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
  { abbr:'CMMS', h:'Maintenance Management', p:'Turn downtime into work orders automatically — preventive schedules, requests, asset history and spare-parts tracking in one place.', checks:['Preventive maintenance','Work request & dispatch','Asset & spares history','Auto downtime-to-WO'],
    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg> },
  { abbr:'QMS', h:'Quality Management', p:'Build quality into every step — inspections, holds, NCR/CAPA, SPC and electronic records that make audits a query, not a fire drill.', checks:['Inspections & holds','NCR / CAPA workflows','SPC & specs','Audit trails & e-sign'],
    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg> },
]

const qaItems = [
  { h:'Functional & acceptance', p:'Tested against your SOPs and acceptance criteria before go-live.' },
  { h:'Integration & regression', p:'ERP, EDI and device integrations validated end-to-end on every change.' },
  { h:'Performance & load', p:'Throughput and peak-shift load proven against targets.' },
  { h:'Validation & UAT', p:'Documented evidence and e-signature workflows for audits.' },
]

export default function Services() {
  return (
    <section id="qa" style={{padding:'3rem 2.5rem',background:'transparent'}}>
      <div style={{margin:'0 auto',width:'100%'}}>
        <div style={{maxWidth:820,margin:'0 auto 2.4rem',textAlign:'center'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'.55rem',fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--red)',marginBottom:'1rem'}}>
            <span style={{width:22,height:1,background:'var(--red)'}}></span>Services & solutions
          </div>
          <h2 style={{fontSize:'clamp(2rem,3.6vw,3rem)',fontWeight:900,letterSpacing:'-.035em',lineHeight:1.08}}>One platform. Every solution your floor runs on.</h2>
          <p style={{color:'#4a5168',fontSize:'clamp(1rem,1.4vw,1.15rem)',lineHeight:1.7,margin:'1.1rem auto 0'}}>Warehouse, manufacturing, maintenance, and quality solutions on a single live platform — each configured to your process and validated by a dedicated QA team before it reaches your floor.</p>
        </div>
        <div className="grid-4col" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1.1rem'}}>
          {solutions.map(({abbr,h,p,checks,icon})=>(
            <div key={abbr} data-reveal="true" style={{border:'1px solid #e6e8ee',borderRadius:18,padding:'1.7rem',background:'#fff',display:'flex',flexDirection:'column',transition:'box-shadow .25s,transform .25s'}}>
              <div style={{width:44,height:44,borderRadius:12,background:'rgba(204,31,31,.08)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'1rem'}}>{icon}</div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:'.14em',textTransform:'uppercase',color:'var(--red)',marginBottom:'.4rem'}}>{abbr}</div>
              <h3 style={{fontSize:'1.12rem',fontWeight:900,letterSpacing:'-.02em',lineHeight:1.18,marginBottom:'.55rem'}}>{h}</h3>
              <p style={{fontSize:'.86rem',color:'#4a5168',lineHeight:1.65,marginBottom:'1.1rem'}}>{p}</p>
              <div style={{marginTop:'auto',display:'flex',flexDirection:'column',gap:'.5rem'}}>
                {checks.map(c=>(
                  <div key={c} style={{display:'flex',alignItems:'center',gap:'.5rem',fontSize:'.82rem',fontWeight:500}}>
                    <span style={{color:'var(--red)',fontWeight:900}}>✓</span>{c}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* QA strip */}
        <div style={{marginTop:'1.5rem',border:'1px solid #e6e8ee',borderRadius:18,background:'#fff',padding:'1.8rem 2rem'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'1rem 1.6rem',flexWrap:'wrap',marginBottom:'1.4rem'}}>
            <div style={{display:'flex',alignItems:'center',gap:'1.1rem',flexWrap:'wrap'}}>
              <div style={{display:'inline-flex',alignItems:'center',gap:'.5rem',fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:'.16em',textTransform:'uppercase',color:'var(--red)'}}>
                <span style={{width:6,height:6,borderRadius:'50%',background:'#22c55e',animation:'flqPulse 2s ease-in-out infinite',display:'inline-block'}}></span>Dedicated QA team
              </div>
              <div style={{fontSize:'1.1rem',fontWeight:900,letterSpacing:'-.02em'}}>Every product and customization, validated before go-live.</div>
            </div>
            <button onClick={()=>navClick('contact')} style={{background:'var(--red)',color:'#fff',padding:'.7rem 1.3rem',borderRadius:10,fontSize:14,fontWeight:700,whiteSpace:'nowrap',transition:'background .18s,transform .2s'}}
              onMouseEnter={e=>{e.currentTarget.style.background='var(--red2)';e.currentTarget.style.transform='translateY(-1px)'}}
              onMouseLeave={e=>{e.currentTarget.style.background='var(--red)';e.currentTarget.style.transform=''}}>Talk to our QA team →</button>
          </div>
          <div className="grid-4col" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1rem'}}>
            {qaItems.map(({h,p})=>(
              <div key={h} style={{display:'flex',gap:'.7rem',alignItems:'flex-start'}}>
                <span style={{flexShrink:0,width:26,height:26,borderRadius:8,background:'#fff',border:'1px solid #e6e8ee',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <div>
                  <div style={{fontSize:'.9rem',fontWeight:800,letterSpacing:'-.01em',lineHeight:1.25}}>{h}</div>
                  <div style={{fontSize:'.8rem',color:'#4a5168',lineHeight:1.55,marginTop:'.2rem'}}>{p}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
