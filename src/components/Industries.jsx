import { useState } from 'react'

const tabs = [
  { idx:4, label:'Automotive' },
  { idx:0, label:'Distribution & 3PL' },
  { idx:1, label:'Discrete Manufacturing' },
  { idx:2, label:'Food & Process' },
  { idx:3, label:'Medical & Regulated' },
]

const panels = [
  { idx:0, eyebrow:'FloorLogiQ for Distribution', h:'From dock to ship, on one screen.', p:'High-volume DCs and 3PLs run FloorLogiQ to direct every scan and post the ERP in real time. Digitize receiving, inventory moves, picking, packing, shipping, wave planning, and dock management as one continuous flow.', chips:['Receiving & putaway','Wave picking','Pack-out','Load-based shipping','Dock & ASN'], img:'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80', alt:'Distribution warehouse with high-bay racking and forklifts' },
  { idx:1, eyebrow:'FloorLogiQ for Manufacturing', h:'Every unit, every step, on record.', p:'Connect production schedules, labor tracking, quality checks, machine monitoring, and ERP transactions in one workflow. Work order dispatch, serial genealogy, and downtime capture — built around operators, with full traceability from raw material to finished good.', chips:['Work order execution','Serial genealogy','OEE & downtime','Inline quality'], img:'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80', alt:'Metal fabrication and welding on the manufacturing floor' },
  { idx:2, eyebrow:'FloorLogiQ for Process', h:'Lot traceability without the binder.', p:'Batch execution, weigh & dispense, spec checks, and one-click lot trace — audit-ready records created as work happens, not reconstructed afterward. Forward-and-back genealogy links every supplier lot to every shipment.', chips:['Batch execution','Weigh & dispense','Lot traceability','CoA & specs'], img:'https://images.unsplash.com/photo-1626082896492-766af4eb6501?auto=format&fit=crop&w=1200&q=80', alt:'Food production line output' },
  { idx:3, eyebrow:'FloorLogiQ for Regulated Industries', h:'Compliance that writes itself.', p:'Support traceability, electronic records, controlled processes, and audits. Device history records, e-signatures, enforced data entry, and audit trails on every transaction — so the audit is a query, not a fire drill.', chips:['Device history records','E-signatures','Audit trails','Enforced data entry'], img:'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1200&q=80', alt:'Quality and regulated production technicians at a workstation' },
  { idx:4, eyebrow:'FloorLogiQ for Automotive', h:'Built to the pace of the line.', p:'Coordinate production execution, quality inspections, material flow, supplier integration, and plant-floor visibility. Sequenced delivery, error-proofing, and traceability that hold up to IATF audits and OEM requirements.', chips:['Sequenced delivery','Error-proofing','Supplier integration','IATF traceability'], img:'https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=1200&q=80', alt:'Automotive assembly line with robotic arms' },
]

export default function Industries() {
  const [active, setActive] = useState(4)
  const panel = panels.find(p => p.idx === active)

  return (
    <section id="industries" style={{padding:'3rem 2.5rem',background:'transparent'}}>
      <div style={{maxWidth:1180,margin:'0 auto'}}>
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
          <div className="industry-panel" style={{display:'grid',gridTemplateColumns:'1fr 1.05fr',gap:0,background:'#fff',border:'1px solid #e6e8ee',borderRadius:22,overflow:'hidden',boxShadow:'0 1px 4px rgba(10,10,10,.06)'}}>
            <div style={{padding:'3rem',display:'flex',flexDirection:'column',justifyContent:'center'}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:10.5,letterSpacing:'.14em',textTransform:'uppercase',color:'var(--red)',marginBottom:'.7rem'}}>{panel.eyebrow}</div>
              <h3 style={{fontSize:'clamp(1.5rem,2.4vw,2rem)',fontWeight:900,letterSpacing:'-.03em',lineHeight:1.12}}>{panel.h}</h3>
              <p style={{fontSize:'.98rem',color:'#4a5168',lineHeight:1.8,margin:'1rem 0 1.6rem',maxWidth:'44ch'}}>{panel.p}</p>
              <div style={{display:'flex',flexWrap:'wrap',gap:'.5rem'}}>
                {panel.chips.map(c=>(
                  <span key={c} style={{padding:'.42rem 1rem',borderRadius:50,border:'1px solid #e6e8ee',fontSize:12.5,fontWeight:600,color:'#16161e',background:'#f7f8fa'}}>{c}</span>
                ))}
              </div>
            </div>
            <img src={panel.img} alt={panel.alt} loading="lazy" style={{width:'100%',height:'100%',minHeight:380,objectFit:'cover',display:'block',background:'#201d2e'}}/>
          </div>
        )}
      </div>
    </section>
  )
}
