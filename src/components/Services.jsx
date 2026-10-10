function navClick(id) {
  const el = document.getElementById(id)
  if (el) window.scrollTo({top: el.getBoundingClientRect().top + window.scrollY - 64, behavior:'smooth'})
}

const solutions = [
  { abbr:'WMS', color:'#cc1f1f', h:'Warehouse Management', p:'Direct every scan from dock to ship — receiving, putaway, picking, pack-out and shipping posting to your ERP in real time.', checks:['Receiving & putaway','Wave & batch picking','Pack-out & shipping','Cycle counting'],
    icon:<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg> },
  { abbr:'MES', color:'#7c3aed', h:'Manufacturing Execution', p:'Run work orders on the floor with live OEE, downtime capture, labor tracking and full serial genealogy from raw material to finished good.', checks:['Work order execution','OEE & downtime','Serial genealogy','Labor & scheduling'],
    icon:<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
  { abbr:'CMMS', color:'#d97706', h:'Maintenance Management', p:'Turn downtime into work orders automatically — preventive schedules, requests, asset history and spare-parts tracking in one place.', checks:['Preventive maintenance','Work request & dispatch','Asset & spares history','Auto downtime-to-WO'],
    icon:<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg> },
  { abbr:'QMS', color:'#059669', h:'Quality Management', p:'Build quality into every step — inspections, holds, NCR/CAPA, SPC and electronic records that make audits a query, not a fire drill.', checks:['Inspections & holds','NCR / CAPA workflows','SPC & specs','Audit trails & e-sign'],
    icon:<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg> },
]

const qaItems = [
  { n:1, eyebrow:'Functional', h:'Functional & acceptance', p:'Every screen and workflow tested against your SOPs and acceptance criteria before go-live.',
    color:'#cc1f1f', bullets:['SOP-driven test cases','Screen-by-screen coverage','Signed acceptance pack'],
    icon:<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> },
  { n:2, eyebrow:'Integration', h:'Integration & regression', p:'ERP, EDI and device integrations validated end-to-end on every change, so nothing breaks silently.',
    color:'#7c3aed', bullets:['End-to-end ERP flows','Device & EDI validation','Full regression on change'],
    icon:<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> },
  { n:3, eyebrow:'Performance', h:'Performance & load', p:'Throughput and peak-shift load proven against your targets before a single operator depends on it.',
    color:'#d97706', bullets:['Peak-shift load runs','Throughput vs. target','Latency under pressure'],
    icon:<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><circle cx="12" cy="14" r="8"/><path d="m12 14 3-3"/></svg> },
  { n:4, eyebrow:'Validation', h:'Validation & UAT', p:'Documented evidence and e-signature workflows, handed over audit-ready for FDA, ISO or IATF.',
    color:'#059669', bullets:['Documented evidence','E-signature workflows','Audit-ready handover'],
    icon:<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg> },
]

export default function Services() {
  return (
    <section id="qa" style={{padding:0,background:'transparent'}}>

      {/* Services cards — padded inner block */}
      <div style={{padding:'4rem clamp(1.5rem,4vw,5rem)'}}>
        <div style={{maxWidth:1400,margin:'0 auto'}}>
        <div style={{maxWidth:820,margin:'0 auto 2.8rem',textAlign:'center'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'.55rem',fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--red)',marginBottom:'1rem'}}>
            <span style={{width:22,height:1,background:'var(--red)'}}></span>Services & solutions
          </div>
          <h2 style={{fontSize:'clamp(2rem,3.6vw,3rem)',fontWeight:900,letterSpacing:'-.035em',lineHeight:1.08}}>One platform. Every solution your floor runs on.</h2>
          <p style={{color:'#4a5168',fontSize:'clamp(1rem,1.4vw,1.15rem)',lineHeight:1.7,margin:'1.1rem auto 0'}}>Warehouse, manufacturing, maintenance, and quality solutions on a single live platform — each configured to your process and validated by a dedicated QA team before it reaches your floor.</p>
        </div>
        <div className="grid-4col" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'2.8rem 1.8rem',marginTop:'4.2rem'}}>
          {solutions.map(({abbr,h,p,checks,icon,color})=>(
            <div key={abbr} data-reveal="true" className="flq-card-wrap">
              <div className="flq-card" style={{'--card-glow':`${color}2e`,display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',height:'100%',background:'#fff',border:'1px solid #e6e8ee',borderTop:`4px solid ${color}`,borderRadius:20,padding:'2.9rem 1.9rem 2.3rem',boxShadow:'0 2px 20px rgba(10,10,10,.07)',position:'relative'}}>

                <div style={{position:'relative',width:86,height:86,borderRadius:26,border:`2px solid ${color}33`,display:'flex',alignItems:'center',justifyContent:'center',color,marginTop:'-3.7rem',boxShadow:`0 10px 30px ${color}2e`,background:'#fff'}}>
                  <div style={{position:'absolute',inset:4,borderRadius:22,background:`linear-gradient(145deg,${color}16,${color}06)`}}></div>
                  <div style={{position:'relative'}}>{icon}</div>
                </div>

                <div style={{fontFamily:"'DM Mono',monospace",fontSize:10.5,letterSpacing:'.2em',textTransform:'uppercase',color,margin:'1.5rem 0 .6rem',fontWeight:500}}>{abbr}</div>
                <h3 style={{fontSize:'1.18rem',fontWeight:900,letterSpacing:'-.028em',lineHeight:1.15,color:'#0a0a0a',marginBottom:'.7rem'}}>{h}</h3>
                <p style={{fontSize:'.88rem',color:'#4a5168',lineHeight:1.7,marginBottom:'1.4rem'}}>{p}</p>

                <div style={{display:'flex',flexDirection:'column',gap:'.55rem',width:'100%',marginTop:'auto'}}>
                  {checks.map(c=>(
                    <div key={c} style={{display:'flex',alignItems:'center',gap:'.5rem',fontSize:'.82rem',fontWeight:600,color:'#16161e',textAlign:'left'}}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><polyline points="20 6 9 17 4 12"/></svg>
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>

      {/* QA band — direct child of section */}
      <div style={{background:'transparent',borderTop:'1px solid #e6e8ee',borderBottom:'1px solid #e6e8ee',padding:'3.5rem clamp(1.5rem,4vw,5rem)'}}>
        <div style={{maxWidth:1400,margin:'0 auto',width:'100%'}}>
          <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:'2rem',flexWrap:'wrap',marginBottom:'2.8rem'}}>
            <div style={{flex:'1 1 520px'}}>
              <div style={{display:'inline-flex',alignItems:'center',gap:'.55rem',fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--red)',marginBottom:'1rem'}}>
                <span style={{width:22,height:1,background:'var(--red)'}}></span>QA as a Service
              </div>
              <h2 style={{fontSize:'clamp(1.6rem,2.6vw,2.2rem)',fontWeight:900,letterSpacing:'-.035em',lineHeight:1.1,marginBottom:'1rem'}}>No QA team? We become yours.</h2>
              <p style={{fontSize:'1rem',color:'#1a1a2e',lineHeight:1.75,fontWeight:700}}>If your team built the product on the Fuuz platform but doesn't have a dedicated QA function, we step in. FloorLogiQ's QA team embeds into your project — taking full ownership of testing every screen, workflow, and integration from day one all the way through go-live. You get a rigorously validated, audit-ready product handed over with documented evidence, without hiring or training a single tester.</p>
            </div>
            <div style={{display:'flex',alignItems:'center',paddingTop:'2.2rem'}}>
              <button onClick={()=>navClick('contact')} style={{background:'var(--red)',color:'#fff',padding:'.85rem 1.8rem',borderRadius:12,fontSize:15,fontWeight:700,whiteSpace:'nowrap',transition:'background .18s,transform .2s',boxShadow:'0 4px 20px rgba(204,31,31,.25)'}}
                onMouseEnter={e=>{e.currentTarget.style.background='var(--red2)';e.currentTarget.style.transform='translateY(-2px)'}}
                onMouseLeave={e=>{e.currentTarget.style.background='var(--red)';e.currentTarget.style.transform=''}}>Talk to our QA team →</button>
            </div>
          </div>
          <div className="grid-4col" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'2rem',marginTop:'4rem'}}>
            {qaItems.map(({n,eyebrow,h,p,color,icon,bullets})=>(
              <div key={h} className="flq-card-wrap">
                <div className="flq-card" style={{'--card-glow':`${color}2e`,display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',height:'100%',background:'#fff',border:'1px solid #e6e8ee',borderTop:`4px solid ${color}`,borderRadius:20,padding:'2.4rem 1.5rem 1.9rem',boxShadow:'0 2px 20px rgba(10,10,10,.07)'}}>

                  <div style={{position:'relative',width:80,height:80,borderRadius:24,border:`2px solid ${color}33`,display:'flex',alignItems:'center',justifyContent:'center',color,marginTop:'-3.4rem',boxShadow:`0 10px 30px ${color}2e`,background:'#fff'}}>
                    <div style={{position:'absolute',inset:4,borderRadius:20,background:`linear-gradient(145deg,${color}16,${color}06)`}}></div>
                    <div style={{position:'relative'}}>{icon}</div>
                    <span style={{position:'absolute',top:-9,right:-9,width:29,height:29,borderRadius:'50%',background:color,color:'#fff',fontSize:13,fontWeight:900,display:'flex',alignItems:'center',justifyContent:'center',border:'3px solid #fff',boxShadow:`0 4px 12px ${color}55`}}>{n}</span>
                  </div>

                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:'.2em',textTransform:'uppercase',color,margin:'1.4rem 0 .55rem',fontWeight:500}}>{eyebrow}</div>
                  <h3 style={{fontSize:'1.12rem',fontWeight:900,letterSpacing:'-.028em',lineHeight:1.15,color:'#0a0a0a',marginBottom:'.65rem'}}>{h}</h3>
                  <p style={{fontSize:'.86rem',color:'#4a5168',lineHeight:1.7,marginBottom:'1.2rem'}}>{p}</p>

                  <div style={{display:'flex',flexDirection:'column',gap:'.5rem',width:'100%',marginTop:'auto'}}>
                    {bullets.map(b=>(
                      <div key={b} style={{display:'flex',alignItems:'center',gap:'.5rem',fontSize:'.8rem',fontWeight:600,color:'#16161e',textAlign:'left'}}>
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
      </div>

    </section>
  )
}
