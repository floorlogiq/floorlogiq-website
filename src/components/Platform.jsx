const cards = [
  { n:'01', eyebrow:'Apps & screens', h:'Operator-first apps, shaped to the work', p:'Build the exact screens your operators need — pack stations, work order dispatch, quality checks — with drag-and-drop design and logic that matches your SOPs. Change them in hours, not development tickets.', checks:['Drag-and-drop builder','Barcode & scanner native','Tablet, kiosk & handheld','Versioned & governed'] },
  { n:'02', eyebrow:'Data & KPIs', h:'One live data model for the whole floor', p:'Every scan, completion, and quality check lands in a shared operational model. OEE, FPY, scrap, and 30+ ISO 22400 KPIs compute live — so dashboards show what is happening, not what happened last week.', checks:['ISO 22400 KPI library','Live OEE & downtime','Cross-site roll-ups','Self-serve dashboards'] },
  { n:'03', eyebrow:'Connectivity', h:'From PLCs and scales to scanners and printers', p:'Connect equipment through a device gateway — counts, states, and measurements stream straight into work orders and quality records. Label printers, scales, and scanners behave as first-class citizens of every workflow.', checks:['PLC & sensor gateway','Auto downtime detection','Label printer routing','Store-and-forward'] },
  { n:'04', eyebrow:'Integration', h:'Bidirectional sync your finance team can trust', p:'Event-driven integration with NetSuite, SAP, and major ERPs: items, orders, inventory transactions, and completions reconcile in real time, with retry logic and a human-readable error queue. EDI 856/204/945 and more included.', checks:['NetSuite-certified','Event-driven, <2s','Readable error queue','EDI & 3PL networks'] },
  { n:'05', eyebrow:'Governance', h:'Audit-ready by default, at every site', p:'Role-based permissions, enforced data entry, e-signatures, and a full transaction audit trail on everything. Regulated customers export auditor packages in one click instead of reconstructing history from spreadsheets.', checks:['Role-based access','Full audit trails','E-signature workflows','Change control'] },
  { n:'06', eyebrow:'Delivery & QA', h:'Implemented by engineers, validated by QA', p:'Every FloorLogiQ rollout is delivered by implementation engineers and validated by a dedicated QA team — every flow, screen binding, and integration edge case tested before it reaches your floor. Pilots go live in weeks.', checks:['Pilot live in weeks','Dedicated QA validation','Follow-the-sun support','Knowledge transfer'] },
]

export default function Platform() {
  return (
    <section id="platform" style={{padding:'3rem 2.5rem',background:'transparent',width:'100%'}}>
      <div style={{margin:'0 auto',width:'100%'}}>
        <div style={{maxWidth:780,margin:'0 auto 2rem',textAlign:'center'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'.55rem',fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--red)',marginBottom:'1rem'}}>
            <span style={{width:22,height:1,background:'var(--red)'}}></span>Composable platform
          </div>
          <h2 style={{fontSize:'clamp(2rem,3.6vw,3rem)',fontWeight:900,letterSpacing:'-.035em',lineHeight:1.08}}>Continuously improve your software<br/>like you improve your floor.</h2>
          <p style={{color:'#4a5168',fontSize:'clamp(1rem,1.4vw,1.15rem)',lineHeight:1.7,margin:'1.1rem auto 0',maxWidth:'58ch'}}>FloorLogiQ pairs ready-to-run accelerators with embedded development tools, so your own technical teams can extend and own the platform — screens, logic, documents, labels, and data models.</p>
        </div>
        <div className="grid-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1.2rem'}}>
          {cards.map(({n,eyebrow,h,p,checks})=>(
            <div key={n} data-reveal="true" style={{border:'1px solid #e6e8ee',borderRadius:18,padding:'2.1rem',background:'#fff',transition:'box-shadow .25s,transform .25s'}}>
              <div style={{display:'flex',alignItems:'center',gap:'.9rem',marginBottom:'1.1rem'}}>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:13,fontWeight:700,color:'#fff',background:'var(--red)',width:34,height:34,borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center'}}>{n}</span>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:'.12em',textTransform:'uppercase',color:'#8a90a8'}}>{eyebrow}</span>
              </div>
              <h3 style={{fontSize:'1.3rem',fontWeight:900,letterSpacing:'-.025em',lineHeight:1.2,marginBottom:'.7rem'}}>{h}</h3>
              <p style={{fontSize:'.92rem',color:'#4a5168',lineHeight:1.8,marginBottom:'1.3rem'}}>{p}</p>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.5rem .9rem'}}>
                {checks.map(c=>(
                  <div key={c} style={{display:'flex',alignItems:'center',gap:'.5rem',fontSize:'.85rem',fontWeight:500}}>
                    <span style={{color:'var(--red)',fontWeight:900}}>✓</span>{c}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
