import { useEffect, useRef, useState } from 'react'

const L = (f) => `${import.meta.env.BASE_URL}logos/${f}`
const erpLogos = [
  // ERP / back-office
  { name:'NetSuite',     color:'#1B6CA8' },
  { name:'SAP',          src:L('sap.svg'),         color:'#0AA1DD' },
  { name:'Oracle',       src:L('oracle.svg'),      color:'#C74634' },
  { name:'Dynamics 365', color:'#0078D4' },
  { name:'Epicor',       src:L('epicor.svg'),      color:'#00AEEF' },
  { name:'Infor',        color:'#D52B1E' },
  { name:'Sage',         src:L('sage.svg'),        color:'#00DC00' },
  { name:'Acumatica',    color:'#0033A0' },
  { name:'QuickBooks',   src:L('quickbooks.svg'),  color:'#2CA01C' },
  { name:'Plex',         color:'#E8762B' },
  // platforms & cloud
  { name:'Salesforce',   src:L('salesforce.svg'),  color:'#00A1E0' },
  { name:'HubSpot',      src:L('hubspot.svg'),     color:'#FF7A59' },
  { name:'Zoho',         src:L('zoho.svg'),        color:'#333333' },
  { name:'SugarCRM',     color:'#C80929' },
  { name:'ADP',          color:'#D9232E' },
  { name:'Workday',      src:L('workday.svg'),     color:'#0875E1' },
  { name:'OpenAI',       src:L('openai.svg'),      color:'#412991' },
  { name:'Google',       src:L('google.svg'),      color:'#4285F4' },
  // commerce & logistics
  { name:'Amazon',       src:L('amazon.svg'),      color:'#FF9900' },
  { name:'Shopify',      src:L('shopify.svg'),     color:'#96BF48' },
  { name:'Square',       src:L('square.svg'),      color:'#3E4348' },
  { name:'Clover',       color:'#1DA462' },
  { name:'FedEx',        src:L('fedex.svg'),       color:'#4D148C' },
  { name:'UPS',          src:L('ups.svg'),         color:'#F4B400' },
  { name:'USPS',         color:'#333366' },
  { name:'EDI Nation',   color:'#0057A8' },
]

function ErpLogo({ name, src, color, ariaHidden }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return (
    <span style={{fontFamily:'Arial,sans-serif',fontSize:20,fontWeight:800,color,whiteSpace:'nowrap',lineHeight:1,flexShrink:0}} aria-hidden={ariaHidden}>
      {name}
    </span>
  )
  return <img src={src} alt={name} height={48} style={{height:48,width:'auto',maxWidth:140,objectFit:'contain',display:'block',flexShrink:0}} onError={()=>setFailed(true)} aria-hidden={ariaHidden}/>
}

const nodes = {
  erp:  { color:'#4f46e5', bg:'rgba(79,70,229,.12)',  line:'flq-spoke-erp',  chip:'flq-node-erp',  msgs:['PO-44192 received','sales order synced','GL posting confirmed','item master updated'] },
  mes:  { color:'#1f9d63', bg:'rgba(31,157,99,.12)',  line:'flq-spoke-mes',  chip:'flq-node-mes',  msgs:['WO-100482 released','unit +1 recorded','OEE 87.4% computed','downtime cleared'] },
  wms:  { color:'#1f9d63', bg:'rgba(31,157,99,.12)',  line:'flq-spoke-wms',  chip:'flq-node-wms',  msgs:['ASN created','wave 22 picked','LP-7781 putaway','cycle count posted'] },
  cmms: { color:'#b45309', bg:'rgba(180,83,9,.12)',   line:'flq-spoke-cmms', chip:'flq-node-cmms', msgs:['WO auto-raised','PM scheduled','asset SX-09 logged','spare reserved'] },
  qms:  { color:'#b45309', bg:'rgba(180,83,9,.12)',   line:'flq-spoke-qms',  chip:'flq-node-qms',  msgs:['inspection passed','NCR-204 opened','LOT 44-A released','e-sign captured'] },
  plc:  { color:'#4f46e5', bg:'rgba(79,70,229,.12)',  line:'flq-spoke-plc',  chip:'flq-node-plc',  msgs:['Line 3 cycle 1.8s','counter +480','E-stop cleared','setup complete'] },
  iot:  { color:'#1f9d63', bg:'rgba(31,157,99,.12)',  line:'flq-spoke-iot',  chip:'flq-node-iot',  msgs:['temp 4.1°C','vibration nominal','scale 12.4 kg','sensor SN-22 ping'] },
  ai:   { color:'#4f46e5', bg:'rgba(79,70,229,.12)',  line:'flq-spoke-ai',   chip:'flq-node-ai',   msgs:['anomaly flagged','forecast updated','bottleneck predicted','quality score 0.98'] },
}
const keys = Object.keys(nodes)
const base = 'translate(-50%,-50%)'
const pad = n => (n < 10 ? '0' : '') + n
const stamp = () => { const d = new Date(); return pad(d.getHours())+':'+pad(d.getMinutes())+':'+pad(d.getSeconds()) }

export default function IntegrationHub() {
  const syncedRef = useRef(2418907)
  const timerRef = useRef(null)

  useEffect(() => {
    const log = document.getElementById('flq-routing-log')
    if (!log || timerRef.current) return

    const flashLine = (id, color) => {
      const el = document.getElementById(id); if (!el) return
      el.style.transition = 'stroke-opacity .3s,stroke-width .3s'
      el.style.strokeOpacity = '0.8'; el.style.strokeWidth = '2.5'
      clearTimeout(el._t)
      el._t = setTimeout(() => { el.style.strokeOpacity = ''; el.style.strokeWidth = '' }, 750)
    }
    const flashChip = (id, color) => {
      const el = document.getElementById(id); if (!el) return
      el.style.transition = 'transform .3s,box-shadow .3s'
      el.style.transform = base + ' scale(1.035)'
      el.style.boxShadow = '0 0 0 1px ' + color + '33,0 4px 12px rgba(10,10,10,.07)'
      el.style.zIndex = '6'
      clearTimeout(el._ct)
      el._ct = setTimeout(() => { el.style.transform = base; el.style.boxShadow = ''; el.style.zIndex = '' }, 750)
    }
    const emit = () => {
      let a = keys[Math.floor(Math.random()*keys.length)]
      let b = keys[Math.floor(Math.random()*keys.length)]
      if (b === a) b = keys[(keys.indexOf(a)+1) % keys.length]
      const A = nodes[a], B = nodes[b]
      flashChip(A.chip, A.color); flashLine(A.line, A.color)
      setTimeout(() => { flashChip(B.chip, B.color); flashLine(B.line, B.color) }, 270)
      const msg = A.msgs[Math.floor(Math.random()*A.msgs.length)]
      const row = document.createElement('div')
      row.style.cssText = "display:flex;align-items:center;gap:.55rem;font-family:'DM Mono',monospace;font-size:11.5px;white-space:nowrap;opacity:0;transform:translateY(-6px);transition:opacity .45s,transform .45s;"
      row.innerHTML =
        '<span style="color:#9aa0b4;font-size:10px;">'+stamp()+'</span>'+
        '<span style="padding:.06rem .42rem;border-radius:5px;font-weight:700;font-size:10px;background:'+A.bg+';color:'+A.color+';">'+a.toUpperCase()+'</span>'+
        '<span style="color:#c0c4d0;">&#8594;</span>'+
        '<span style="padding:.06rem .42rem;border-radius:5px;font-weight:700;font-size:10px;background:'+B.bg+';color:'+B.color+';">'+b.toUpperCase()+'</span>'+
        '<span style="color:#16161e;">'+msg+'</span>'
      log.insertBefore(row, log.firstChild)
      requestAnimationFrame(() => { row.style.opacity = '1'; row.style.transform = 'none' })
      while (log.children.length > 5) log.removeChild(log.lastChild)
      const eps = document.getElementById('flq-eps')
      if (eps) eps.textContent = (1240 + Math.floor(Math.random()*130)).toLocaleString()
      const synced = document.getElementById('flq-synced')
      if (synced) { syncedRef.current += Math.floor(2+Math.random()*9); synced.textContent = syncedRef.current.toLocaleString() }
    }
    emit(); emit()
    timerRef.current = setInterval(emit, 3500)
    return () => { clearInterval(timerRef.current); timerRef.current = null }
  }, [])

  const chipStyle = (bg) => ({position:'absolute',display:'flex',alignItems:'center',gap:'.6rem',border:'1px solid #e6e8ee',borderRadius:12,padding:'.6rem .9rem',backdropFilter:'blur(6px)',WebkitBackdropFilter:'blur(6px)',backgroundColor:bg,transform:base})

  return (
    <section id="customers-pre" style={{background:'transparent',padding:'2.8rem 2.5rem 1rem',position:'relative',overflow:'hidden'}}>
      {/* Marquee strip */}
      <div style={{marginTop:'1.6rem',height:112,display:'flex',alignItems:'center',gap:'2.4rem',background:'#fff',border:'1px solid #e6e8ee',borderRadius:18,boxShadow:'0 1px 4px rgba(10,10,10,.06)',overflow:'hidden',padding:'0 2.2rem'}}>
        <div style={{flexShrink:0,maxWidth:210}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:'.16em',textTransform:'uppercase',color:'var(--red)',marginBottom:'.35rem'}}>44 connectors</div>
          <div style={{fontSize:'1.3rem',fontWeight:900,letterSpacing:'-.025em',lineHeight:1.1,color:'#0a0a0a'}}>We connect with</div>
        </div>
        <div style={{flex:1,overflow:'hidden',WebkitMaskImage:'linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent)',maskImage:'linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent)'}}>
          <div style={{display:'flex',alignItems:'center',gap:'3.2rem',width:'max-content',animation:'flqMarquee 90s linear infinite'}}>
            {[...erpLogos,...erpLogos].map((logo,i)=>(
              <ErpLogo key={i} {...logo} ariaHidden={i>=erpLogos.length?'true':undefined}/>
            ))}
          </div>
        </div>
      </div>

      {/* Hub section */}
      <div style={{maxWidth:'none',margin:'0 auto'}}>
        <div style={{textAlign:'center',maxWidth:760,margin:'0 auto 2.2rem'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'.55rem',fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--red)',marginBottom:'1rem'}}>
            <span style={{width:22,height:1,background:'var(--red)'}}></span>One hub, every system live
          </div>
          <h2 style={{color:'#0a0a0a',fontSize:'clamp(2rem,3.6vw,3rem)',fontWeight:900,letterSpacing:'-.035em',lineHeight:1.08}}>No more data silos.<br/>One FUUZ for the whole enterprise.</h2>
          <p style={{color:'#4a5168',fontSize:'clamp(1rem,1.4vw,1.15rem)',lineHeight:1.7,maxWidth:'58ch',margin:'1.1rem auto 0'}}>We sit at the center of your stack — ERP, MES, WMS, CMMS, machines, quality, IoT, and AI services all post into one live operational model. Change one thing, and useful data shows up everywhere it's needed.</p>
        </div>

        <div data-reveal="true" style={{position:'relative',borderRadius:20,overflow:'hidden',background:'radial-gradient(60% 75% at 50% 38%,rgba(204,31,31,.08),transparent 70%),radial-gradient(46% 58% at 86% 26%,rgba(91,48,223,.07),transparent 72%),radial-gradient(46% 58% at 12% 78%,rgba(3,202,175,.06),transparent 72%),#ffffff',boxShadow:'0 18px 60px rgba(10,10,10,.12)',border:'1px solid #e6e8ee'}}>
          <div aria-hidden="true" style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(10,10,10,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(10,10,10,.04) 1px,transparent 1px)',backgroundSize:'38px 38px'}}></div>

          {/* Top bar */}
          <div style={{position:'relative',display:'flex',alignItems:'center',justifyContent:'center',padding:'1.2rem 1.6rem',borderBottom:'1px solid rgba(10,10,10,.08)',backgroundColor:'#ffffff'}}>
            <div style={{textAlign:'center'}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:'.22em',textTransform:'uppercase',color:'var(--red)',marginBottom:'.28rem'}}>Sample</div>
              <div style={{fontSize:22,fontWeight:900,letterSpacing:'-.03em',lineHeight:1,color:'#0a0a0a'}}>Integration Dashboard</div>
            </div>
            <div style={{position:'absolute',right:'1.6rem',top:'50%',transform:'translateY(-50%)',display:'flex',alignItems:'center',gap:'1.4rem'}}>
              <div style={{display:'flex',alignItems:'center',gap:'.42rem',fontFamily:"'DM Mono',monospace",fontSize:11,fontWeight:700,letterSpacing:'.1em',color:'#1f9d63'}}>
                <span style={{width:7,height:7,borderRadius:'50%',background:'#1f9d63',boxShadow:'0 0 8px #1f9d63',animation:'flqPulse 1.6s ease-in-out infinite',display:'inline-block'}}></span>LIVE
              </div>
              <div style={{textAlign:'right',lineHeight:1,whiteSpace:'nowrap'}}>
                <span id="flq-eps" style={{fontFamily:"'DM Mono',monospace",fontSize:16,fontWeight:700,color:'#0a0a0a'}}>1,284</span>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:'#8a90a8',marginLeft:'.35rem'}}>events/min</span>
              </div>
            </div>
          </div>

          {/* SVG topology */}
          <div style={{position:'relative',height:600}}>
            <svg viewBox="0 0 1000 520" preserveAspectRatio="none" style={{position:'absolute',inset:0,width:'100%',height:'100%',background:'transparent'}}>
              <defs>
                <radialGradient id="flqHubG" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#cc1f1f" stopOpacity="0.16"/>
                  <stop offset="55%" stopColor="#7a3df0" stopOpacity="0.07"/>
                  <stop offset="100%" stopColor="#7a3df0" stopOpacity="0"/>
                </radialGradient>
              </defs>
              <line id="flq-spoke-erp" x1="500" y1="260" x2="120" y2="94" stroke="#1f9d63" strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round"/>
              <line id="flq-spoke-mes" x1="500" y1="260" x2="500" y2="42" stroke="#1f9d63" strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round"/>
              <line id="flq-spoke-wms" x1="500" y1="260" x2="880" y2="94" stroke="#1f9d63" strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round"/>
              <line id="flq-spoke-cmms" x1="500" y1="260" x2="960" y2="260" stroke="#fd8b09" strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round"/>
              <line id="flq-spoke-plc" x1="500" y1="260" x2="880" y2="426" stroke="#1f9d63" strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round"/>
              <line id="flq-spoke-qms" x1="500" y1="260" x2="500" y2="478" stroke="#1f9d63" strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round"/>
              <line id="flq-spoke-iot" x1="500" y1="260" x2="120" y2="426" stroke="#1f9d63" strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round"/>
              <line id="flq-spoke-ai" x1="500" y1="260" x2="40" y2="260" stroke="#2a74d6" strokeWidth="1.5" strokeOpacity="0.42" strokeLinecap="round" strokeDasharray="2 8"/>
              <circle cx="500" cy="260" r="120" fill="url(#flqHubG)"/>
              <circle cx="500" cy="260" r="86" fill="none" stroke="#7a3df0" strokeWidth="1.4" strokeOpacity="0.32" strokeDasharray="6 11">
                <animateTransform attributeName="transform" type="rotate" from="0 500 260" to="360 500 260" dur="36s" repeatCount="indefinite"/>
              </circle>
              <circle cx="500" cy="260" r="103" fill="none" stroke="#cc1f1f" strokeWidth="1" strokeOpacity="0.16" strokeDasharray="2 13">
                <animateTransform attributeName="transform" type="rotate" from="360 500 260" to="0 500 260" dur="52s" repeatCount="indefinite"/>
              </circle>
              <circle cx="500" cy="260" r="55" fill="none" stroke="#cc1f1f" strokeWidth="1" opacity="0.3">
                <animate attributeName="r" values="55;135" dur="7s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.32;0" dur="7s" repeatCount="indefinite"/>
              </circle>
              <circle cx="500" cy="260" r="55" fill="none" stroke="#7a3df0" strokeWidth="1" opacity="0.3">
                <animate attributeName="r" values="55;135" dur="7s" begin="3.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.30;0" dur="7s" begin="3.5s" repeatCount="indefinite"/>
              </circle>
              {/* Animated data packets */}
              <circle r="3.2" fill="#1f9d63" style={{filter:'drop-shadow(0 0 4px #1f9d63)'}}><animateMotion dur="4.5s" repeatCount="indefinite" path="M500,260 L120,94"/></circle>
              <circle r="3.2" fill="#1f9d63" style={{filter:'drop-shadow(0 0 4px #1f9d63)'}}><animateMotion dur="4.5s" begin="2.25s" repeatCount="indefinite" path="M120,94 L500,260"/></circle>
              <circle r="3.2" fill="#1f9d63" style={{filter:'drop-shadow(0 0 4px #1f9d63)'}}><animateMotion dur="4.2s" repeatCount="indefinite" path="M500,260 L500,42"/></circle>
              <circle r="3.2" fill="#1f9d63" style={{filter:'drop-shadow(0 0 4px #1f9d63)'}}><animateMotion dur="4.2s" begin="2.1s" repeatCount="indefinite" path="M500,42 L500,260"/></circle>
              <circle r="3.2" fill="#1f9d63" style={{filter:'drop-shadow(0 0 4px #1f9d63)'}}><animateMotion dur="4.8s" repeatCount="indefinite" path="M500,260 L880,94"/></circle>
              <circle r="3.2" fill="#1f9d63" style={{filter:'drop-shadow(0 0 4px #1f9d63)'}}><animateMotion dur="4.8s" begin="2.4s" repeatCount="indefinite" path="M880,94 L500,260"/></circle>
              <circle r="3" fill="#fd8b09" style={{filter:'drop-shadow(0 0 4px #fd8b09)'}}><animateMotion dur="6s" repeatCount="indefinite" path="M500,260 L960,260"/></circle>
              <circle r="3.2" fill="#1f9d63" style={{filter:'drop-shadow(0 0 4px #1f9d63)'}}><animateMotion dur="4.5s" repeatCount="indefinite" path="M880,426 L500,260"/></circle>
              <circle r="3.2" fill="#1f9d63" style={{filter:'drop-shadow(0 0 4px #1f9d63)'}}><animateMotion dur="4.4s" repeatCount="indefinite" path="M500,478 L500,260"/></circle>
              <circle r="3.5" fill="#1f9d63" style={{filter:'drop-shadow(0 0 5px #1f9d63)'}}><animateMotion dur="3.8s" repeatCount="indefinite" path="M120,426 L500,260"/></circle>
              <circle r="3.5" fill="#1f9d63" style={{filter:'drop-shadow(0 0 5px #1f9d63)'}}><animateMotion dur="3.8s" begin="1.9s" repeatCount="indefinite" path="M120,426 L500,260"/></circle>
              <circle r="2.8" fill="#2a74d6" style={{filter:'drop-shadow(0 0 4px #2a74d6)'}}><animateMotion dur="6.5s" repeatCount="indefinite" path="M40,260 L500,260"/></circle>
            </svg>

            {/* Hub center */}
            <div style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:'.7rem'}}>
              <div style={{width:70,height:69,borderRadius:24,background:'#fff',border:'1.5px solid rgba(255,208,208,.9)',boxShadow:'0 8px 28px rgba(204,31,31,.5)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <img src={`${import.meta.env.BASE_URL}mark-fuuz.png`} alt="FUUZ" width="52" height="52" style={{width:52,height:52,objectFit:'contain',display:'block'}}/>
              </div>
              <div style={{textAlign:'center',lineHeight:1.05}}>
                <div style={{fontWeight:900,fontSize:17,letterSpacing:'.02em',color:'#4a23c2'}}>FUUZ</div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:9.5,letterSpacing:'.2em',textTransform:'uppercase',color:'#6e44e6',fontWeight:700,marginTop:'.3rem'}}>Integration Hub</div>
              </div>
            </div>

            {/* Connector chips */}
            <div id="flq-node-erp" style={{...chipStyle('#e7f7ef'),left:'12%',top:'18%'}}>
              <span style={{fontSize:15,lineHeight:1,flexShrink:0}}>🗄️</span>
              <span style={{fontFamily:"'Saira',sans-serif",fontSize:12,fontWeight:700,color:'#4f46e5'}}>ERP</span><span style={{fontFamily:"'Saira',sans-serif",fontWeight:700,fontSize:11,color:'#4a5168'}}>NetSuite · SAP</span>
            </div>
            <div id="flq-node-mes" style={{...chipStyle('#e7f7ef'),left:'50%',top:'8%'}}>
              <span style={{fontSize:15,lineHeight:1,flexShrink:0}}>🦾</span>
              <span style={{fontFamily:"'Saira',sans-serif",fontSize:12,fontWeight:700,color:'#1f9d63'}}>MES</span><span style={{fontFamily:"'Saira',sans-serif",fontWeight:700,fontSize:11,color:'#4a5168'}}>Production</span>
            </div>
            <div id="flq-node-wms" style={{...chipStyle('#e7f7ef'),left:'88%',top:'18%'}}>
              <span style={{fontSize:15,lineHeight:1,flexShrink:0}}>📦</span>
              <span style={{fontFamily:"'Saira',sans-serif",fontSize:12,fontWeight:700,color:'#1f9d63'}}>WMS</span><span style={{fontFamily:"'Saira',sans-serif",fontWeight:700,fontSize:11,color:'#4a5168'}}>Warehouse</span>
            </div>
            <div id="flq-node-cmms" style={{...chipStyle('#fff3e2'),left:'96%',top:'50%'}}>
              <span style={{fontSize:15,lineHeight:1,flexShrink:0}}>🔧</span>
              <span style={{fontFamily:"'Saira',sans-serif",fontSize:12,fontWeight:700,color:'#b45309'}}>CMMS</span><span style={{fontFamily:"'Saira',sans-serif",fontWeight:700,fontSize:11,color:'#4a5168'}}>Maintenance</span>
            </div>
            <div id="flq-node-plc" style={{...chipStyle('#f2eefe'),left:'88%',top:'82%'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{flexShrink:0}}>
                <rect x="1" y="3" width="22" height="18" rx="2" stroke="#4f46e5" strokeWidth="1.5" fill="rgba(79,70,229,0.07)"/>
                <rect x="2.5" y="4.5" width="7" height="15" rx="1" stroke="#7c3aed" strokeWidth="1" fill="rgba(124,58,237,0.18)"/>
                <rect x="4" y="7" width="3.5" height="2" rx="0.5" fill="#7c3aed"/>
                <rect x="4" y="11" width="3.5" height="2" rx="0.5" fill="#7c3aed"/>
                <rect x="10.5" y="4.5" width="3" height="15" rx="1" stroke="#e25c2e" strokeWidth="1" fill="rgba(226,92,46,0.18)"/>
                <circle cx="12" cy="7.5" r="0.8" fill="#e25c2e"/>
                <circle cx="12" cy="10" r="0.8" fill="#e25c2e"/>
                <circle cx="12" cy="12.5" r="0.8" fill="#e25c2e"/>
                <circle cx="12" cy="15" r="0.8" fill="#e25c2e"/>
                <rect x="14.5" y="4.5" width="3" height="15" rx="1" stroke="#d4a017" strokeWidth="1" fill="rgba(212,160,23,0.18)"/>
                <circle cx="16" cy="7.5" r="0.8" fill="#d4a017"/>
                <circle cx="16" cy="10" r="0.8" fill="#d4a017"/>
                <circle cx="16" cy="12.5" r="0.8" fill="#d4a017"/>
                <circle cx="16" cy="15" r="0.8" fill="#d4a017"/>
                <rect x="18.5" y="4.5" width="3" height="15" rx="1" stroke="#0891b2" strokeWidth="1" fill="rgba(8,145,178,0.18)"/>
                <circle cx="20" cy="7.5" r="0.8" fill="#0891b2"/>
                <circle cx="20" cy="10" r="0.8" fill="#0891b2"/>
                <circle cx="20" cy="12.5" r="0.8" fill="#0891b2"/>
                <circle cx="20" cy="15" r="0.8" fill="#0891b2"/>
              </svg>
              <span style={{fontFamily:"'Saira',sans-serif",fontSize:12,fontWeight:700,color:'#4f46e5'}}>PLC</span><span style={{fontFamily:"'Saira',sans-serif",fontWeight:700,fontSize:11,color:'#4a5168'}}>Machines</span>
            </div>
            <div id="flq-node-qms" style={{...chipStyle('#fff3e2'),left:'50%',top:'92%'}}>
              <span style={{fontSize:15,lineHeight:1,flexShrink:0}}>🛡️</span>
              <span style={{fontFamily:"'Saira',sans-serif",fontSize:12,fontWeight:700,color:'#b45309'}}>QMS</span><span style={{fontFamily:"'Saira',sans-serif",fontWeight:700,fontSize:11,color:'#4a5168'}}>Quality</span>
            </div>
            <div id="flq-node-iot" style={{...chipStyle('#e7f7ef'),left:'12%',top:'82%'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1f9d63" strokeWidth="2.2" strokeLinecap="round" style={{flexShrink:0}}>
                <path d="M2 8.5C6.5 4 17.5 4 22 8.5"/>
                <path d="M5 12c3.9-3.8 10.1-3.8 14 0"/>
                <path d="M8.5 15.5c2-1.9 5-1.9 7 0"/>
                <circle cx="12" cy="19" r="1.2" fill="#1f9d63"/>
              </svg>
              <span style={{fontFamily:"'Saira',sans-serif",fontSize:12,fontWeight:700,color:'#1f9d63'}}>IoT</span><span style={{fontFamily:"'Saira',sans-serif",fontWeight:700,fontSize:11,color:'#4a5168'}}>Sensors</span>
            </div>
            <div id="flq-node-ai" style={{...chipStyle('#f2eefe'),left:'4%',top:'50%'}}>
              <span style={{fontSize:15,lineHeight:1,flexShrink:0}}>🤖</span>
              <span style={{fontFamily:"'Saira',sans-serif",fontSize:12,fontWeight:700,color:'#4f46e5'}}>AI</span><span style={{fontFamily:"'Saira',sans-serif",fontWeight:700,fontSize:11,color:'#4a5168'}}>Services</span>
            </div>
          </div>

          {/* Live routing log */}
          <div style={{position:'relative',borderTop:'1px solid rgba(10,10,10,.08)',background:'rgba(255,255,255,.72)',backdropFilter:'blur(4px)',padding:'.85rem 1.5rem 1rem'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'.55rem'}}>
              <div style={{display:'flex',alignItems:'center',gap:'.45rem',fontFamily:"'DM Mono',monospace",fontSize:10,fontWeight:700,letterSpacing:'.16em',textTransform:'uppercase',color:'#8a90a8'}}>
                <span style={{width:6,height:6,borderRadius:'50%',background:'#1f9d63',boxShadow:'0 0 7px #1f9d63',animation:'flqPulse 1.6s ease-in-out infinite',display:'inline-block'}}></span>Live routing
              </div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:'#8a90a8'}}>
                <span id="flq-synced" style={{color:'#16161e',fontWeight:700}}>2,418,907</span> events synced today
              </div>
            </div>
            <div id="flq-routing-log" style={{display:'flex',flexDirection:'column',gap:'.32rem',height:70,overflow:'hidden'}}></div>
          </div>
        </div>
      </div>
    </section>
  )
}
