import { useState } from 'react'

function LogoMark({ size = 38 }) {
  const s = size
  const cx = s / 2, cy = s / 2
  const stroke = s * 0.105
  const rx = s * 0.1
  const px = cx + s * 0.30, py = cy + s * 0.30
  const bw = s * 0.42, bh = s * 0.115
  return (
    <svg width={s * 1.45} height={s * 1.45} viewBox={`${-s*0.25} ${-s*0.25} ${s*1.5} ${s*1.5}`} style={{flexShrink:0}} aria-hidden="true">
      <rect x={cx - s*0.5} y={cy - s*0.5} width={s} height={s} rx={rx} fill="none" stroke="#0a0a0a" strokeWidth={stroke} transform={`rotate(45,${cx},${cy})`}/>
      <circle cx={cx - s*0.04} cy={cy} r={s * 0.21} fill="#0a0a0a"/>
      <rect x={px - bw/2} y={py - bh/2} width={bw} height={bh} rx={bh * 0.5} fill="#0a0a0a" transform={`rotate(45,${px},${py})`}/>
    </svg>
  )
}

const glossary = {
  // Warehouse
  'Scan & pack': 'Every pick is scanned and confirmed before packing — eliminating mispicks and short shipments. The system verifies each item against the open sales order before the box closes, so nothing ships wrong.',
  'Wave picking': 'Group multiple orders into a single pick run. Operators travel the warehouse once to fill dozens of orders simultaneously, cutting walk time and dramatically boosting throughput during peak shifts.',
  'Licence plate tracking': 'Every pallet, tote, and container gets a unique LP number. One scan tells you what\'s in it, where it is, and where it came from — from receiving through shipping. Full visibility without manual counting.',
  'Load-based shipping': 'Build loads by door, trailer, route, or carrier. The system directs putaway to staging, confirms quantities, prints the BOL, and fires the ASN to your trading partner — all in one unbroken flow.',
  'Cycle counting': 'Count inventory in rolling waves without shutting down operations. FloorLogiQ directs counters to locations by zone, velocity, or discrepancy flag — and posts adjustments to the ERP instantly, keeping books and bins in sync.',
  // Manufacturing
  'Work order execution': 'Operators receive step-by-step instructions on a tablet or kiosk. Every operation is confirmed, timed, and recorded — creating a complete, immutable audit trail for every unit that leaves the line.',
  'Serial genealogy': 'Every finished good links back to every component lot and supplier it came from. One lookup gives you the full tree — forward to customer shipments or backward to raw material receipts — in seconds.',
  'OEE & downtime': 'Real-time Overall Equipment Effectiveness computed from machine events and operator input. Every downtime event is categorized, timed, and routed to the maintenance team automatically — so nothing is hidden in a shift report.',
  'Inline quality': 'Quality checks are embedded directly into work order steps, not bolted on afterward. The line cannot advance to the next operation until the inspection is confirmed — enforcing quality at the source, every time.',
  'Operator screens': 'A no-code screen builder lets you configure exactly what operators see at each station. Guided, distraction-free, and built around your process — not a generic form that needs interpretation.',
  // Compliance
  'Audit trails': 'Every transaction — scan, edit, approval, or rejection — is stamped with who did it, what changed, when, and why. Fully queryable at any time. Never editable. Built for FDA, ISO, and IATF audits.',
  'Device history records': 'For medical and regulated manufacturers, FloorLogiQ auto-builds the DHR as production happens. No manual reconstruction, no binder hunting before an audit — the record is always complete and always current.',
  'E-signatures': '21 CFR Part 11-compliant electronic signatures enforced at every critical step — approvals, releases, deviations, and quality holds. Dual-user sign-off and reason codes supported out of the box.',
  'Lot traceability': 'Track every supplier lot through every production step to every customer shipment — forward and backward — in a single click. One-click lot trace for recalls, complaints, or audits, with zero manual work.',
  'Enforced data entry': 'Fields cannot be skipped. Values must fall within spec. Steps must be completed in sequence. The platform enforces your process so operators don\'t have to memorize every rule — and nothing slips through.',
  // Platform
  'Screen builder': 'A drag-and-drop interface for building operator and supervisor screens without writing code. Wire live data, actions, and business logic visually — then deploy to any device in minutes.',
  'Live data model': 'One unified operational data model updated by every scan, transaction, and machine event in real time. No batch sync. No stale dashboards. Every screen in the system always reflects the current state of your floor.',
  'Device gateway': 'Connect barcode scanners, scales, PLCs, RFID readers, printers, and IoT sensors directly into the platform. Data flows the moment it\'s captured — no middleware, no polling delays.',
  'ERP connectors': 'Pre-built, tested connectors for SAP, NetSuite, Oracle, Epicor, Dynamics 365, and more. Bidirectional — FloorLogiQ reads and writes to your ERP in real time, so your books always match your floor.',
  'ISO 22400 KPIs': 'All manufacturing KPIs defined by the ISO 22400 standard — OEE, FPY, throughput rate, downtime ratio, schedule adherence, and more — computed live from floor events. No spreadsheets. No end-of-day lag.',
}

const aboutContent = {
  headline: 'Built for the people who build things.',
  body: [
    'FloorLogiQ is an industrial operations platform that unifies warehouse management, manufacturing execution, maintenance, and quality into a single live system — purpose-built for the facilities that can\'t afford gaps between what the floor does and what the system knows.',
    'We are a Fuuz-certified implementation and services partner. Every FloorLogiQ solution is built on the Fuuz low-code platform — giving our customers a governed, extensible foundation they own and can grow without rip-and-replace cycles. Our team designs, configures, validates, and deploys each deployment to match the way your operation actually runs, not a generic template.',
    'Our customers are distribution centers moving millions of units, food and beverage processors who need full lot traceability, medical device manufacturers under 21 CFR Part 11, automotive suppliers running IATF 16949 audits, and discrete manufacturers who are done losing visibility the moment a work order hits the floor.',
    'What makes FloorLogiQ different is the integration of QA as a service. We don\'t hand you software and a manual. Our QA team embeds into every project — owning testing, validation, and go-live readiness from day one. You get a rigorously tested, audit-ready system handed over with documented evidence.',
    'We believe factory intelligence should be live, not reconstructed. Every scan, every decision, every transaction should post to the right system in real time — so that the people who run the operation always have the truth in their hands.',
  ],
  stats: [
    { n:'99.8%', l:'Inventory accuracy' },
    { n:'<5s', l:'ERP posting time' },
    { n:'44+', l:'Pre-built connectors' },
    { n:'100%', l:'QA-validated go-lives' },
  ],
}

function navClick(id) {
  const el = document.getElementById(id)
  if (el) window.scrollTo({top: el.getBoundingClientRect().top + window.scrollY - 64, behavior:'smooth'})
}

function Modal({ term, onClose, isAbout }) {
  return (
    <div
      onClick={onClose}
      style={{position:'fixed',inset:0,zIndex:9999,background:'rgba(10,10,10,.55)',backdropFilter:'blur(6px)',display:'flex',alignItems:'center',justifyContent:'center',padding:'2rem'}}>
      <div
        onClick={e=>e.stopPropagation()}
        style={{background:'#fff',borderRadius:20,padding:'2.4rem',maxWidth: isAbout ? 720 : 480,width:'100%',boxShadow:'0 32px 80px rgba(10,10,10,.22)',position:'relative',maxHeight:'85vh',overflowY:'auto'}}>
        <button
          onClick={onClose}
          style={{position:'absolute',top:'1.2rem',right:'1.2rem',width:32,height:32,borderRadius:8,background:'#f7f8fa',border:'1px solid #e6e8ee',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:16,color:'#4a5168'}}>
          ✕
        </button>

        {isAbout ? (
          <>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:'.18em',textTransform:'uppercase',color:'var(--red)',marginBottom:'.6rem'}}>About FloorLogiQ</div>
            <h2 style={{fontSize:'1.4rem',fontWeight:900,letterSpacing:'-.025em',lineHeight:1.15,marginBottom:'1rem'}}>Built for the people who build things.</h2>
            <p style={{fontSize:'.9rem',color:'#4a5168',lineHeight:1.8,marginBottom:'1.4rem'}}>One platform for warehouse, manufacturing, maintenance, and quality — live, connected, and built around how your floor actually runs. We configure it, validate it, and stand behind every go-live.</p>
            <button
              onClick={()=>{ onClose(); setTimeout(()=>navClick('contact'),100) }}
              style={{background:'var(--red)',color:'#fff',padding:'.6rem 1.3rem',borderRadius:10,fontSize:13,fontWeight:700}}>
              Book a demo →
            </button>
          </>
        ) : (
          <>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:'.18em',textTransform:'uppercase',color:'var(--red)',marginBottom:'.6rem'}}>Feature guide</div>
            <h3 style={{fontSize:'1.25rem',fontWeight:900,letterSpacing:'-.025em',lineHeight:1.2,marginBottom:'1rem'}}>{term}</h3>
            <p style={{fontSize:'.92rem',color:'#4a5168',lineHeight:1.8}}>{glossary[term]}</p>
            <div style={{marginTop:'1.4rem',paddingTop:'1.2rem',borderTop:'1px solid #f0f1f5'}}>
              <button
                onClick={()=>{ onClose(); setTimeout(()=>navClick('contact'),100) }}
                style={{background:'var(--red)',color:'#fff',padding:'.6rem 1.3rem',borderRadius:10,fontSize:13,fontWeight:700}}>
                See it in action →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const cols = [
  { h:'Warehouse', items:['Scan & pack','Wave picking','Licence plate tracking','Load-based shipping','Cycle counting'] },
  { h:'Manufacturing', items:['Work order execution','Serial genealogy','OEE & downtime','Inline quality','Operator screens'] },
  { h:'Compliance', items:['Audit trails','Device history records','E-signatures','Lot traceability','Enforced data entry'] },
  { h:'Platform', items:['Screen builder','Live data model','Device gateway','ERP connectors','ISO 22400 KPIs'] },
  { h:'Company', items:['About us','Contact'] },
]

export default function Footer() {
  const [modal, setModal] = useState(null)

  function handleClick(item) {
    if (item === 'Contact') { navClick('contact'); return }
    if (item === 'About us') { setModal('__about__'); return }
    if (glossary[item]) setModal(item)
  }

  return (
    <>
      {modal && (
        <Modal
          term={modal}
          isAbout={modal === '__about__'}
          onClose={()=>setModal(null)}
        />
      )}
      <footer style={{background:'transparent',borderTop:'1px solid #e6e8ee',padding:'3rem clamp(1.5rem,4vw,5rem) 1.8rem'}}>
        <div style={{maxWidth:1180,margin:'0 auto'}}>
          <div className="grid-5col" style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'2rem',paddingBottom:'2.6rem'}}>
            {cols.map(({h,items})=>(
              <div key={h}>
                <h4 style={{fontSize:10.5,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'#0a0a0a',marginBottom:'.85rem'}}>{h}</h4>
                <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'.45rem'}}>
                  {items.map(item=>(
                    <li key={item}>
                      <button
                        onClick={()=>handleClick(item)}
                        style={{fontSize:'.82rem',color:'#4a5168',background:'none',border:'none',padding:0,cursor:'pointer',textAlign:'left',transition:'color .15s'}}
                        onMouseEnter={e=>e.currentTarget.style.color='var(--red)'}
                        onMouseLeave={e=>e.currentTarget.style.color='#4a5168'}>
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'2rem',padding:'1.8rem 0',borderTop:'1px solid #e6e8ee',borderBottom:'1px solid #e6e8ee',flexWrap:'wrap'}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
              <LogoMark size={38}/>
              <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start',gap:2}}>
                <div style={{fontWeight:900,textTransform:'uppercase',lineHeight:.92,letterSpacing:'-.4px',fontSize:16}}>FLOOR<br/>LOG<span style={{color:'var(--red)'}}>IQ</span></div>
                <span style={{fontFamily:'Tahoma,sans-serif',fontStyle:'italic',fontWeight:800,fontSize:9.5,letterSpacing:'.005em',color:'#4a5168',lineHeight:1,whiteSpace:'nowrap'}}>Where factory intelligence begins.</span>
              </div>
            </div>
            <p style={{fontSize:'.84rem',color:'#4a5168',maxWidth:'42ch'}}>Deploy fast. Operate smart. The industrial intelligence platform for the people who build things.</p>
          </div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',paddingTop:'1.6rem',flexWrap:'wrap',gap:'1rem'}}>
            <div style={{fontSize:'.78rem',color:'#8a90a8'}}>© 2026 FloorLogiQ. All rights reserved.</div>
            <div style={{display:'flex',gap:'1.4rem'}}>
              {['Privacy','Terms','Security'].map(l=><a key={l} style={{fontSize:'.78rem',color:'#8a90a8'}}>{l}</a>)}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
