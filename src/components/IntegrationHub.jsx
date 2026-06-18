import { useEffect, useRef } from 'react'

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
    timerRef.current = setInterval(emit, 1500)
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
          <div style={{display:'flex',alignItems:'center',gap:'3.2rem',width:'max-content',animation:'flqMarquee 34s linear infinite'}}>
            {[['NetSuite','#1B6CA8'],['SAP','#0AA1DD'],['Oracle','#C74634'],['Dynamics 365','#0078D4'],['Epicor','#DA291C'],['Infor','#D52B1E'],['Sage','#00875A'],['Acumatica','#0033A0'],['QuickBooks','#2CA01C'],['Plex','#E8762B'],
              ['NetSuite','#1B6CA8'],['SAP','#0AA1DD'],['Oracle','#C74634'],['Dynamics 365','#0078D4'],['Epicor','#DA291C'],['Infor','#D52B1E'],['Sage','#00875A'],['Acumatica','#0033A0'],['QuickBooks','#2CA01C'],['Plex','#E8762B']
            ].map(([name,color],i)=>(
              <span key={i} style={{fontSize:'1.55rem',fontWeight:900,letterSpacing:'-.02em',color,whiteSpace:'nowrap'}} aria-hidden={i>=10?'true':undefined}>{name}</span>
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
          <div style={{position:'relative',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'1rem',padding:'1rem 1.6rem',borderBottom:'1px solid rgba(10,10,10,.08)',backgroundColor:'#ffffff'}}>
            <b style={{fontSize:15,fontFamily:"'DM Mono',monospace",letterSpacing:'.04em',color:'#cb0c0c'}}>SAMPLE INTEGRATION DASHBOARD</b>
            <div style={{display:'flex',alignItems:'center',gap:'1.4rem'}}>
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
          <div style={{position:'relative',height:360}}>
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
                <animateTransform attributeName="transform" type="rotate" from="0 500 260" to="360 500 260" dur="15s" repeatCount="indefinite"/>
              </circle>
              <circle cx="500" cy="260" r="103" fill="none" stroke="#cc1f1f" strokeWidth="1" strokeOpacity="0.16" strokeDasharray="2 13">
                <animateTransform attributeName="transform" type="rotate" from="360 500 260" to="0 500 260" dur="24s" repeatCount="indefinite"/>
              </circle>
              <circle cx="500" cy="260" r="55" fill="none" stroke="#cc1f1f" strokeWidth="1" opacity="0.3">
                <animate attributeName="r" values="55;135" dur="3.8s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.32;0" dur="3.8s" repeatCount="indefinite"/>
              </circle>
              <circle cx="500" cy="260" r="55" fill="none" stroke="#7a3df0" strokeWidth="1" opacity="0.3">
                <animate attributeName="r" values="55;135" dur="3.8s" begin="1.9s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.30;0" dur="3.8s" begin="1.9s" repeatCount="indefinite"/>
              </circle>
              {/* Animated data packets */}
              <circle r="3.2" fill="#1f9d63" style={{filter:'drop-shadow(0 0 4px #1f9d63)'}}><animateMotion dur="1.8s" repeatCount="indefinite" path="M500,260 L120,94"/></circle>
              <circle r="3.2" fill="#1f9d63" style={{filter:'drop-shadow(0 0 4px #1f9d63)'}}><animateMotion dur="1.8s" begin="0.9s" repeatCount="indefinite" path="M120,94 L500,260"/></circle>
              <circle r="3.2" fill="#1f9d63" style={{filter:'drop-shadow(0 0 4px #1f9d63)'}}><animateMotion dur="1.7s" repeatCount="indefinite" path="M500,260 L500,42"/></circle>
              <circle r="3.2" fill="#1f9d63" style={{filter:'drop-shadow(0 0 4px #1f9d63)'}}><animateMotion dur="1.7s" begin="0.85s" repeatCount="indefinite" path="M500,42 L500,260"/></circle>
              <circle r="3.2" fill="#1f9d63" style={{filter:'drop-shadow(0 0 4px #1f9d63)'}}><animateMotion dur="1.9s" repeatCount="indefinite" path="M500,260 L880,94"/></circle>
              <circle r="3.2" fill="#1f9d63" style={{filter:'drop-shadow(0 0 4px #1f9d63)'}}><animateMotion dur="1.9s" begin="0.95s" repeatCount="indefinite" path="M880,94 L500,260"/></circle>
              <circle r="3" fill="#fd8b09" style={{filter:'drop-shadow(0 0 4px #fd8b09)'}}><animateMotion dur="2.6s" repeatCount="indefinite" path="M500,260 L960,260"/></circle>
              <circle r="3.2" fill="#1f9d63" style={{filter:'drop-shadow(0 0 4px #1f9d63)'}}><animateMotion dur="1.8s" repeatCount="indefinite" path="M880,426 L500,260"/></circle>
              <circle r="3.2" fill="#1f9d63" style={{filter:'drop-shadow(0 0 4px #1f9d63)'}}><animateMotion dur="1.75s" repeatCount="indefinite" path="M500,478 L500,260"/></circle>
              <circle r="3.5" fill="#1f9d63" style={{filter:'drop-shadow(0 0 5px #1f9d63)'}}><animateMotion dur="1.5s" repeatCount="indefinite" path="M120,426 L500,260"/></circle>
              <circle r="3.5" fill="#1f9d63" style={{filter:'drop-shadow(0 0 5px #1f9d63)'}}><animateMotion dur="1.5s" begin="0.75s" repeatCount="indefinite" path="M120,426 L500,260"/></circle>
              <circle r="2.8" fill="#2a74d6" style={{filter:'drop-shadow(0 0 4px #2a74d6)'}}><animateMotion dur="2.8s" repeatCount="indefinite" path="M40,260 L500,260"/></circle>
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
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5"/><path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/></svg>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,fontWeight:800,color:'#4f46e5'}}>ERP</span><span style={{fontSize:11,color:'#4a5168'}}>NetSuite · SAP</span>
            </div>
            <div id="flq-node-mes" style={{...chipStyle('#e7f7ef'),left:'50%',top:'8%'}}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1f9d63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></svg>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,fontWeight:800,color:'#1f9d63'}}>MES</span><span style={{fontSize:11,color:'#4a5168'}}>Production</span>
            </div>
            <div id="flq-node-wms" style={{...chipStyle('#e7f7ef'),left:'88%',top:'18%'}}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1f9d63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,fontWeight:800,color:'#1f9d63'}}>WMS</span><span style={{fontSize:11,color:'#4a5168'}}>Warehouse</span>
            </div>
            <div id="flq-node-cmms" style={{...chipStyle('#fff3e2'),left:'96%',top:'50%'}}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,fontWeight:800,color:'#b45309'}}>CMMS</span><span style={{fontSize:11,color:'#4a5168'}}>Maintenance</span>
            </div>
            <div id="flq-node-plc" style={{...chipStyle('#f2eefe'),left:'88%',top:'82%'}}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M20 9h2M20 14h2M2 9h2M2 14h2"/></svg>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,fontWeight:800,color:'#4f46e5'}}>PLC</span><span style={{fontSize:11,color:'#4a5168'}}>Machines</span>
            </div>
            <div id="flq-node-qms" style={{...chipStyle('#fff3e2'),left:'50%',top:'92%'}}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,fontWeight:800,color:'#b45309'}}>QMS</span><span style={{fontSize:11,color:'#4a5168'}}>Quality</span>
            </div>
            <div id="flq-node-iot" style={{...chipStyle('#e7f7ef'),left:'12%',top:'82%'}}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1f9d63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/></svg>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,fontWeight:800,color:'#1f9d63'}}>IoT</span><span style={{fontSize:11,color:'#4a5168'}}>Sensors</span>
            </div>
            <div id="flq-node-ai" style={{...chipStyle('#f2eefe'),left:'4%',top:'50%'}}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4z"/></svg>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,fontWeight:800,color:'#4f46e5'}}>AI</span><span style={{fontSize:11,color:'#4a5168'}}>Services</span>
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
