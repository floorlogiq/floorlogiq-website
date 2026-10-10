import { useState } from 'react'

const tabs = [
  { idx:4, label:'Automotive' },
  { idx:0, label:'Distribution & 3PL' },
  { idx:1, label:'Discrete Manufacturing' },
  { idx:2, label:'Food & Process' },
  { idx:3, label:'Medical & Regulated' },
]

const panels = [
  { idx:0, eyebrow:'FloorLogiQ for Distribution', h:'From dock to ship, on one screen.',
    p:'High-volume DCs and 3PLs run FloorLogiQ to direct every scan and post the ERP in real time. Digitize receiving, inventory moves, picking, packing, shipping, wave planning, and dock management as one continuous flow.',
    stats:[{n:'99.8%',l:'Inventory accuracy'},{n:'<5s',l:'ERP posting time'},{n:'3×',l:'Throughput vs. paper'}],
    bullets:['RF/mobile-directed putaway and wave picking','Licence-plate and lot tracking across every move','Real-time dock door and load management','Automatic ASN creation and EDI dispatch','Cycle count without shutting operations down'],
    chips:['Receiving & putaway','Wave picking','Pack-out','Load-based shipping','Dock & ASN'],
    img:'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80', alt:'Distribution warehouse with high-bay racking and forklifts' },
  { idx:1, eyebrow:'FloorLogiQ for Manufacturing', h:'Every unit, every step, on record.',
    p:'Connect production schedules, labor tracking, quality checks, machine monitoring, and ERP transactions in one workflow. Work order dispatch, serial genealogy, and downtime capture — built around operators, with full traceability from raw material to finished good.',
    stats:[{n:'ISO 22400',l:'KPIs computed live'},{n:'100%',l:'Serial genealogy'},{n:'30+',l:'OEE data points'}],
    bullets:['Operator-guided work order execution on tablets and kiosks','Full serial and lot genealogy from raw material to shipment','Live OEE, FPY, scrap, and downtime capture','Inline quality checks tied directly to production steps','ERP-bidirectional item, order, and GL posting'],
    chips:['Work order execution','Serial genealogy','OEE & downtime','Inline quality'],
    img:'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80', alt:'Metal fabrication and welding on the manufacturing floor' },
  { idx:2, eyebrow:'FloorLogiQ for Process', h:'Lot traceability without the binder.',
    p:'Batch execution, weigh & dispense, spec checks, and one-click lot trace — audit-ready records created as work happens, not reconstructed afterward. Forward-and-back genealogy links every supplier lot to every shipment.',
    stats:[{n:'1-click',l:'Forward/back lot trace'},{n:'0 paper',l:'Batch records'},{n:'100%',l:'Spec enforcement'}],
    bullets:['Electronic batch records created in real time','Weigh & dispense with automatic spec enforcement','Forward and backward lot traceability in one click','Certificate of analysis generated at release','Deviation and CAPA workflow built into the process'],
    chips:['Batch execution','Weigh & dispense','Lot traceability','CoA & specs'],
    img:'https://images.unsplash.com/photo-1651525670054-279c154bc3b6?auto=format&fit=crop&w=1200&q=80', alt:'Food processing industrial facility with machinery' },
  { idx:3, eyebrow:'FloorLogiQ for Regulated Industries', h:'Compliance that writes itself.',
    p:'Support traceability, electronic records, controlled processes, and audits. Device history records, e-signatures, enforced data entry, and audit trails on every transaction — so the audit is a query, not a fire drill.',
    stats:[{n:'21 CFR',l:'Part 11 ready'},{n:'Zero',l:'Manual audit prep'},{n:'100%',l:'E-signature coverage'}],
    bullets:['Device history records auto-built with every transaction','21 CFR Part 11 e-signatures enforced at every step','Role-based access and controlled data entry','Full audit trail: who, what, when, why — always queryable','Export audit packages in one click for FDA or ISO visits'],
    chips:['Device history records','E-signatures','Audit trails','Enforced data entry'],
    img:'https://images.unsplash.com/photo-1599652749620-e45b7f38988e?auto=format&fit=crop&w=1200&q=80', alt:'Automated laboratory with medical sample analyzers' },
  { idx:4, eyebrow:'FloorLogiQ for Automotive', h:'Built to the pace of the line.',
    p:'Coordinate production execution, quality inspections, material flow, supplier integration, and plant-floor visibility. Sequenced delivery, error-proofing, and traceability that hold up to IATF audits and OEM requirements.',
    stats:[{n:'IATF 16949',l:'Audit-ready records'},{n:'Real-time',l:'Line sequencing'},{n:'100%',l:'Error-proof gates'}],
    bullets:['Sequenced JIT delivery tied directly to production schedule','Error-proofing gates that stop the line before a defect ships','Full IATF 16949 traceability from supplier part to VIN','Supplier EDI and ASN management in a single workflow','OEM-formatted reporting without manual extraction'],
    chips:['Sequenced delivery','Error-proofing','Supplier integration','IATF traceability'],
    img:'https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=1200&q=80', alt:'Automotive assembly line with robotic arms' },
]

function navClick(id) {
  const el = document.getElementById(id)
  if (el) window.scrollTo({top: el.getBoundingClientRect().top + window.scrollY - 64, behavior:'smooth'})
}

export default function Industries() {
  const [active, setActive] = useState(4)
  const panel = panels.find(p => p.idx === active)

  return (
    <section id="industries" style={{padding:'4rem clamp(1.5rem,4vw,5rem)',background:'transparent'}}>
      <div style={{maxWidth:1400,margin:'0 auto',width:'100%'}}>
        <div style={{textAlign:'center',maxWidth:760,margin:'0 auto 2.6rem'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'.55rem',fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--red)',marginBottom:'1rem'}}>
            <span style={{width:22,height:1,background:'var(--red)'}}></span>Industries
          </div>
          <h2 style={{fontSize:'clamp(2rem,3.6vw,3rem)',fontWeight:900,letterSpacing:'-.035em',lineHeight:1.08}}>Built for how your industry actually runs.</h2>
          <p style={{color:'#4a5168',fontSize:'clamp(1rem,1.4vw,1.15rem)',lineHeight:1.7,margin:'1.1rem auto 0',maxWidth:'56ch'}}>The same platform, shaped to the work — from receiving docks to regulated production lines.</p>
        </div>
        <div style={{display:'flex',gap:'.5rem',justifyContent:'center',flexWrap:'wrap',marginBottom:'2.4rem'}}>
          {tabs.map(({idx,label})=>(
            <button key={idx} onClick={()=>setActive(idx)} style={{padding:'.62rem 1.45rem',borderRadius:50,border:`1.5px solid ${active===idx?'#0a0a0a':'#d2d6e0'}`,fontSize:14,fontWeight:600,color:active===idx?'#fff':'#4a5168',background:active===idx?'#0a0a0a':'#fff',transition:'all .18s'}}>{label}</button>
          ))}
        </div>
        {panel && (
          <div className="industry-panel" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:0,background:'#fff',border:'1px solid #e6e8ee',borderRadius:22,overflow:'hidden',boxShadow:'0 1px 4px rgba(10,10,10,.06)'}}>
            <div style={{padding:'3rem 3.5rem',display:'flex',flexDirection:'column',justifyContent:'center',gap:'1.4rem'}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:10.5,letterSpacing:'.14em',textTransform:'uppercase',color:'var(--red)'}}>{panel.eyebrow}</div>
              <h3 style={{fontSize:'clamp(1.6rem,2.4vw,2.2rem)',fontWeight:900,letterSpacing:'-.03em',lineHeight:1.12}}>{panel.h}</h3>
              <p style={{fontSize:'1rem',color:'#4a5168',lineHeight:1.8}}>{panel.p}</p>
              {/* KPI boxes */}
              <div style={{display:'flex',gap:'.75rem',flexWrap:'wrap'}}>
                {panel.stats.map(({n,l})=>(
                  <div key={l} style={{flex:'1 1 0',minWidth:90,background:'linear-gradient(135deg,rgba(245,158,11,.12) 0%,rgba(251,191,36,.08) 100%)',border:'1px solid rgba(245,158,11,.3)',borderRadius:12,padding:'.85rem 1rem',display:'flex',flexDirection:'column',gap:'.35rem'}}>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:9.5,letterSpacing:'.14em',textTransform:'uppercase',color:'#92680a',fontWeight:600,lineHeight:1.2}}>{l}</div>
                    <div style={{fontSize:'1.55rem',fontWeight:900,letterSpacing:'-.04em',color:'#0a0a0a',lineHeight:1}}>{n}</div>
                    <div style={{width:24,height:2,background:'#f59e0b',borderRadius:2,marginTop:'.1rem'}}></div>
                  </div>
                ))}
              </div>
              {/* Bullets */}
              <div style={{display:'flex',flexDirection:'column',gap:'.55rem'}}>
                {panel.bullets.map(b=>(
                  <div key={b} style={{display:'flex',alignItems:'flex-start',gap:'.6rem',fontSize:'.9rem',color:'#16161e',lineHeight:1.5}}>
                    <span style={{color:'var(--red)',fontWeight:900,flexShrink:0,marginTop:'.05rem'}}>✓</span>{b}
                  </div>
                ))}
              </div>
              {/* Chips + CTA */}
              <div style={{display:'flex',flexWrap:'wrap',gap:'.5rem',marginTop:'.2rem'}}>
                {panel.chips.map(c=>(
                  <span key={c} style={{padding:'.38rem .9rem',borderRadius:50,border:'1px solid #e6e8ee',fontSize:12,fontWeight:600,color:'#16161e',background:'#f7f8fa'}}>{c}</span>
                ))}
              </div>
              <div>
                <button onClick={()=>navClick('contact')} style={{background:'var(--red)',color:'#fff',padding:'.7rem 1.6rem',borderRadius:10,fontSize:14,fontWeight:700,transition:'background .18s,transform .2s'}}
                  onMouseEnter={e=>{e.currentTarget.style.background='var(--red2)';e.currentTarget.style.transform='translateY(-1px)'}}
                  onMouseLeave={e=>{e.currentTarget.style.background='var(--red)';e.currentTarget.style.transform=''}}>See it in action →</button>
              </div>
            </div>
            <div style={{overflow:'hidden',maxHeight:460}}>
              <img src={panel.img} alt={panel.alt} loading="lazy" style={{width:'100%',height:'100%',minHeight:380,objectFit:'cover',objectPosition:'center',display:'block',background:'#201d2e'}}/>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
