import { Component, Suspense, lazy, useEffect, useState } from 'react'
import { ZONES, HubCapsule } from './hub'
import { picks, Device } from './Device'
import { RED, INK, Icon, Tick, Cross, Section, SectionHead, PrimaryBtn, GhostBtn, goSection } from '../pages/ui'
import Proof from '../components/Proof'
import Connectors from '../components/Connectors'
import Services from '../components/Services'
import Leaders from '../components/Leaders'

const MONO = "'DM Mono',monospace"

// the 3D floor (and three.js) loads as its own file, after the text of the page
const Floor3D = lazy(() => import('./Floor3D'))

/* what FloorLogiQ does in each zone of the floor */
const info = {
  wms:  { h:'Every pallet scanned from dock to rack', p:'Receiving, putaway, picking and shipping are confirmed on a handheld and posted to your ERP while the truck is still at the door.', points:['Scan-directed putaway','Wave and batch picking','Counts without a shutdown'] },
  mes:  { h:'Work orders that report on themselves', p:'Operators follow guided steps on a screen. Counts, scrap, downtime and labor are captured as the work happens, not at the end of the shift.', points:['Guided work order steps','Live OEE and downtime','Lot and serial genealogy'] },
  qms:  { h:'Quality checks built into the step', p:'The line cannot move on until the inspection is entered and within spec, and the audit record is finished when the job is.', points:['Inline inspections and holds','NCR and CAPA workflows','E-signatures and audit trail'] },
  cmms: { h:'A stoppage raises its own work order', p:'Downtime on the line becomes a maintenance request automatically, with the asset history and spare parts attached.', points:['Preventive schedules','Automatic downtime-to-work-order','Asset and spares history'] },
}

/* if the 3D code cannot load or throws, show the plain version instead of a blank page */
class FloorGuard extends Component {
  state = { failed:false }
  static getDerivedStateFromError() { return { failed:true } }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}

/* plain version of the floor for browsers without WebGL: the hub and the four zones as buttons */
function FloorPlain({ active, onPick }) {
  return (
    <div style={{height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'2.4rem',padding:'3.5rem 1rem 1rem'}}>
      <div style={{position:'relative',width:268,height:98}}><HubCapsule/></div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.7rem',width:'min(460px,100%)'}}>
        {ZONES.map(z => {
          const on = z.key === active
          return (
            <button key={z.key} onClick={() => onPick(z.key)} aria-pressed={on}
              style={{display:'flex',flexDirection:'column',alignItems:'flex-start',gap:'.4rem',textAlign:'left',padding:'.9rem 1rem',borderRadius:14,background:on ? 'var(--red)' : '#fff',color:on ? '#fff' : INK,border:`1.5px solid ${on ? 'var(--red)' : '#d2d6e0'}`,boxShadow:on ? '0 12px 28px rgba(204,31,31,.3)' : '0 2px 10px rgba(10,10,10,.05)',transition:'background .2s,color .2s,border-color .2s'}}>
              <span style={{fontFamily:MONO,fontSize:10,letterSpacing:'.12em',padding:'.12rem .4rem',borderRadius:6,background:on ? 'rgba(255,255,255,.2)' : 'rgba(204,31,31,.09)',color:on ? '#fff' : 'var(--red)'}}>{z.tag}</span>
              <span style={{fontSize:'.95rem',fontWeight:800,letterSpacing:'-.02em',lineHeight:1.2}}>{z.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
/* each problem a visitor can pick lives in one zone of the 3D floor */
const ZONE_OF = { inv:'wms', paper:'mes', audit:'qms', down:'cmms' }

function Tagline({ size = 'clamp(1.05rem,1.5vw,1.35rem)' }) {
  return <span style={{fontSize:size,fontWeight:900,letterSpacing:'-.035em',lineHeight:1.05,color:'#0a0a0a'}}>Deploy fast. <span style={{color:'var(--red)'}}>Operate smart.</span></span>
}

export default function Home() {
  const [active, setActive] = useState('wms')
  const [touched, setTouched] = useState(false)
  const [plain, setPlain] = useState(false)   // true when WebGL is not available

  // tour the floor on its own until the visitor picks something or scrolls on
  useEffect(() => {
    if (touched || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return
    const id = setInterval(() => setActive(a => ZONES[(ZONES.findIndex(z => z.key === a) + 1) % ZONES.length].key), 4200)
    const stop = () => { if (window.scrollY > 240) setTouched(true) }
    window.addEventListener('scroll', stop, { passive:true })
    return () => { clearInterval(id); window.removeEventListener('scroll', stop) }
  }, [touched])

  const choose = k => { setTouched(true); setActive(k) }
  const zone = ZONES.find(z => z.key === active), d = info[active]
  const pick = picks.find(p => ZONE_OF[p.key] === active)

  return (
    <>
      {/* ── hero: the live floor, driven by the visitor's problem ── */}
      <section id="home" style={{paddingTop:72,position:'relative',overflow:'hidden'}}>
        <div aria-hidden="true" style={{position:'absolute',inset:0,pointerEvents:'none',background:'radial-gradient(50% 60% at 72% 30%, rgba(204,31,31,.09), transparent 70%)'}}></div>
        <div className="v3d-hero" style={{position:'relative',maxWidth:1560,margin:'0 auto',padding:'1.8rem clamp(1.5rem,3.5vw,4rem) 1rem',display:'grid',gridTemplateColumns:'minmax(480px,.84fr) 1.4fr',gap:'1rem',alignItems:'center'}}>

          <div style={{position:'relative',zIndex:2}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:'.75rem',marginBottom:'1rem'}}>
              <span style={{width:34,height:3,borderRadius:2,background:'var(--red)'}}></span>
              <Tagline/>
            </div>
            <h1 style={{fontSize:'clamp(2.4rem,4.1vw,4rem)',fontWeight:900,letterSpacing:'-.05em',lineHeight:1.04,color:'#0a0a0a',whiteSpace:'nowrap'}}>
              Your whole floor.<br/><span style={{color:'var(--red)'}}>One live picture.</span>
            </h1>
            <p style={{fontSize:'clamp(1rem,1.25vw,1.14rem)',fontWeight:600,color:'#3d4356',lineHeight:1.65,margin:'1rem 0 1.4rem',maxWidth:'46ch'}}>
              FloorLogiQ connects your warehouse, production, quality and maintenance to the ERP you already run, so what the screen says is what the floor is doing.
            </p>

            <div style={{fontSize:'1.12rem',fontWeight:900,letterSpacing:'-.025em',color:'#0a0a0a',marginBottom:'.7rem'}}>What is hurting your floor today?</div>
            <div className="guided-chips" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.55rem',maxWidth:440}}>
              {picks.map(p => {
                const on = ZONE_OF[p.key] === active
                return (
                  <button key={p.key} onClick={() => choose(ZONE_OF[p.key])} aria-pressed={on}
                    style={{display:'flex',alignItems:'center',gap:'.5rem',textAlign:'left',padding:'.65rem .6rem',borderRadius:14,background:on ? 'var(--red)' : '#fff',color:on ? '#fff' : INK,border:`1.5px solid ${on ? 'var(--red)' : '#d2d6e0'}`,boxShadow:on ? '0 14px 30px rgba(204,31,31,.3)' : '0 2px 10px rgba(10,10,10,.05)',transform:on ? 'translateY(-2px)' : 'none',transition:'all .22s cubic-bezier(.22,1,.36,1)'}}>
                    <span style={{width:32,height:32,borderRadius:10,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background:on ? 'rgba(255,255,255,.18)' : 'rgba(204,31,31,.08)',color:on ? '#fff' : RED}}><Icon name={p.icon} size={18}/></span>
                    <span style={{fontSize:'.87rem',fontWeight:800,letterSpacing:'-.02em',lineHeight:1.2}}>{p.chip}</span>
                  </button>
                )
              })}
            </div>
            <div style={{margin:'.9rem 0 1.2rem',fontSize:'.97rem',color:'#3d4356',fontWeight:600,minHeight:'1.6em'}}>
              We would start with <b style={{color:'#0a0a0a'}}>{pick.fix}</b>.
            </div>

            <div style={{display:'flex',gap:'.8rem',flexWrap:'wrap'}}>
              <PrimaryBtn onClick={() => goSection('contact')}>Book a live demo →</PrimaryBtn>
              <GhostBtn onClick={() => { setTouched(true); goSection('changes') }}>See what changes ↓</GhostBtn>
            </div>
          </div>

          <div className="v3d-stage" style={{position:'relative',height:'min(86vh,900px)',minHeight:600,marginLeft:'-6%',marginRight:'calc(-1 * clamp(1.5rem,3.5vw,4rem) - max(0px, (100vw - 1560px) / 4))'}}>
            {plain ? <FloorPlain active={active} onPick={choose}/> : (
              <FloorGuard fallback={<FloorPlain active={active} onPick={choose}/>}>
                <Suspense fallback={null}>
                  <Floor3D active={active} onPick={choose} onFail={() => setPlain(true)}/>
                </Suspense>
              </FloorGuard>
            )}
            {!plain && <div className="f3d-hint" style={{position:'absolute',left:'50%',bottom:6,transform:'translateX(-50%)',whiteSpace:'nowrap',fontSize:12.5,color:'#8a90a8',fontWeight:600}}>Tap a label on the floor · move your pointer to look around</div>}
          </div>
        </div>
      </section>

      {/* ── the chosen problem: what the operator sees, and what changes ── */}
      <Section id="changes" pad="3.2rem" max={1280}>
        <SectionHead eyebrow="What your operator sees" title={<>Same floor. Same people.<br/>A different Monday.</>} mb="1.8rem"/>
        <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'.5rem',marginBottom:'1.6rem'}}>
          {picks.map(p => {
            const on = ZONE_OF[p.key] === active
            return (
              <button key={p.key} onClick={() => choose(ZONE_OF[p.key])} aria-pressed={on}
                style={{display:'flex',alignItems:'center',gap:'.5rem',padding:'.55rem 1rem',borderRadius:50,fontSize:'.92rem',fontWeight:750,background:on ? 'var(--red)' : '#fff',color:on ? '#fff' : INK,border:`1.5px solid ${on ? 'var(--red)' : '#d2d6e0'}`,transition:'background .2s,color .2s,border-color .2s'}}>
                <span style={{fontFamily:MONO,fontSize:10,letterSpacing:'.12em',opacity:.85}}>{p.tag}</span>{p.chip}
              </button>
            )
          })}
        </div>

        <div className="live-detail" style={{display:'grid',gridTemplateColumns:'minmax(340px,440px) 1fr',gap:'clamp(1.5rem,4vw,4.5rem)',alignItems:'center'}}>
          <Device key={pick.key} pick={pick}/>

          <div key={active} style={{animation:'flqFadeUp .45s ease both'}}>
            <div style={{display:'flex',alignItems:'center',gap:'.6rem',marginBottom:'.7rem'}}>
              <span style={{fontFamily:MONO,fontSize:10.5,letterSpacing:'.14em',background:'var(--red)',color:'#fff',borderRadius:6,padding:'.16rem .5rem'}}>{zone.tag}</span>
              <span style={{fontFamily:MONO,fontSize:10.5,letterSpacing:'.14em',textTransform:'uppercase',color:'#6b7280'}}>{zone.name}</span>
            </div>
            <h3 style={{fontSize:'clamp(1.6rem,2.6vw,2.2rem)',fontWeight:900,letterSpacing:'-.035em',lineHeight:1.12,color:'#0a0a0a'}}>{d.h}</h3>
            <p style={{fontSize:'1.06rem',color:'#3d4356',lineHeight:1.68,margin:'.7rem 0 1rem',maxWidth:'60ch'}}>{d.p}</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:'.45rem 1.3rem',marginBottom:'1.5rem'}}>
              {d.points.map(p => <span key={p} style={{display:'flex',alignItems:'flex-start',gap:'.4rem',fontSize:'.95rem',fontWeight:700,color:INK}}><Tick/>{p}</span>)}
            </div>

            <div className="grid-2col" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.1rem'}}>
              <div style={{background:'#f8f9fb',border:'1px solid #e6e8ee',borderRadius:20,padding:'1.5rem 1.4rem'}}>
                <div style={{fontFamily:MONO,fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',color:'#6b7280',marginBottom:'.9rem'}}>Today</div>
                <div style={{display:'flex',flexDirection:'column',gap:'.8rem'}}>
                  {pick.before.map(b => <div key={b} style={{display:'flex',alignItems:'flex-start',gap:'.6rem',fontSize:'.98rem',color:'#4a5168',lineHeight:1.45,fontWeight:500}}><Cross size={14}/>{b}</div>)}
                </div>
              </div>
              <div style={{background:'#fff',border:'2px solid var(--red)',borderRadius:20,padding:'1.5rem 1.4rem',boxShadow:'0 20px 48px rgba(204,31,31,.15)'}}>
                <div style={{fontFamily:MONO,fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--red)',marginBottom:'.9rem'}}>With FloorLogiQ</div>
                <div style={{display:'flex',flexDirection:'column',gap:'.8rem'}}>
                  {pick.after.map(a => <div key={a} style={{display:'flex',alignItems:'flex-start',gap:'.6rem',fontSize:'.98rem',color:INK,lineHeight:1.45,fontWeight:700}}><Tick size={14}/>{a}</div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── the plan for the chosen problem ── */}
      <Section pad="3rem" max={1180}>
        <SectionHead eyebrow="Your first six weeks" title={<>How we would take <span style={{color:'var(--red)'}}>{pick.tag}</span> live.</>} sub="One process first. Connected to the ERP you already run." mb="2.4rem"/>
        <div key={pick.key} className="grid-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1.3rem',animation:'flqFadeUp .45s ease both'}}>
          {pick.plan.map(([when, h, p], k) => {
            const color = k % 2 === 0 ? RED : INK
            return (
              <div key={h} style={{position:'relative',background:'#fff',border:'1px solid #e6e8ee',borderTop:`4px solid ${color}`,borderRadius:20,padding:'1.9rem 1.7rem',boxShadow:'0 2px 20px rgba(10,10,10,.06)'}}>
                <span style={{display:'inline-block',fontFamily:MONO,fontSize:10.5,letterSpacing:'.12em',textTransform:'uppercase',color,background:`${color}0f`,border:`1px solid ${color}2e`,borderRadius:50,padding:'.28rem .8rem',fontWeight:700}}>{when}</span>
                <h3 style={{fontSize:'1.4rem',fontWeight:900,letterSpacing:'-.03em',color:'#0a0a0a',margin:'.8rem 0 .5rem'}}>{h}</h3>
                <p style={{fontSize:'1rem',color:'#3d4356',lineHeight:1.68}}>{p}</p>
                <span aria-hidden="true" style={{position:'absolute',right:18,top:14,fontSize:'3rem',fontWeight:900,letterSpacing:'-.05em',color:`${color}1c`,lineHeight:1}}>0{k + 1}</span>
              </div>
            )
          })}
        </div>
      </Section>

      <Proof/>
      <Connectors/>
      {/* the connector strip ends in a gap meant for a white section; close it so the gray band starts at the strip */}
      <div style={{marginTop:'-2.5rem'}}><Leaders/></div>
      <Services part="qa"/>
    </>
  )
}
