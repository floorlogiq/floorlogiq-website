import { useEffect, useRef, useState } from 'react'
import { INK } from '../pages/ui'

const MONO = "'DM Mono',monospace"

/* the four problems a visitor can pick, with the sample operator screen, before/after and first-six-weeks plan for each */
export const picks = [
  { key:'inv', icon:'box', chip:'Inventory never matches', tag:'WMS', fix:'scan-confirmed warehouse moves',
    screen:{ app:'Receiving', title:'PO-44192 · Dock 2', steps:[['Scan pallet','LP-7781'],['Item','CCT-0142 · 48 EA'],['Lot','L-2611-A'],['Put away to','A-12-03']], done:'Posted to ERP' },
    before:['Counts drift between the system and the rack','Planners buffer because nobody trusts the number','Variance shows up at month-end, when it is expensive'],
    after:['Every move confirmed with a scan at the rack','ERP updated in seconds, not at end of shift','Rolling counts catch variance the day it happens'],
    plan:[['Week 1–3','Connect','Handhelds, label printers and your ERP item and PO data.'],['Week 3–6','Go live','Receiving and putaway on one dock, on real shifts.'],['Month 2–3','Extend','Picking, shipping and cycle counts on the same screens.']] },
  { key:'paper', icon:'factory', chip:'Production runs on paper', tag:'MES', fix:'guided work order execution',
    screen:{ app:'Work order', title:'WO-100482 · Line 3', steps:[['Operation','20 · Assemble'],['Good count','+ 24'],['Scrap','1 · Burr'],['Next step','30 · Inspect']], done:'Progress posted' },
    before:['Travelers come back late, smudged or not at all','Counts and scrap keyed in the next morning','Nobody knows where an order is until it is done'],
    after:['Operators follow guided steps on a screen','Counts, scrap and downtime captured as it happens','Planners see live status for every order'],
    plan:[['Week 1–3','Connect','Work orders, routings and items from your ERP; machines where it helps.'],['Week 3–6','Go live','Operator screens on one line or cell.'],['Month 2–3','Extend','OEE, labor and genealogy across the plant.']] },
  { key:'audit', icon:'shield', chip:'Audits are a scramble', tag:'QMS', fix:'inline checks and a live audit trail',
    screen:{ app:'Inspection', title:'LOT 44-A · In-process', steps:[['Check','Torque 12.0 ± 0.5'],['Reading','12.2 Nm'],['Result','Within spec'],['Signed by','Operator + QA']], done:'Record complete' },
    before:['Checks written on clipboards and filed in binders','Records rebuilt by hand before every audit','A failed check is found after the lot has moved on'],
    after:['The step cannot continue until the check is entered','Who, what, when and why on every transaction','Audit questions answered with a query'],
    plan:[['Week 1–3','Connect','Specs, items and lots from your ERP; gauges and scales where needed.'],['Week 3–6','Go live','Inline inspections on one product family.'],['Month 2–3','Extend','NCR, CAPA and e-signature workflows.']] },
  { key:'down', icon:'wrench', chip:'Downtime surprises us', tag:'CMMS', fix:'automatic downtime-to-work-order',
    screen:{ app:'Maintenance', title:'Press SX-09 · Stopped', steps:[['Stopped at','02:14'],['Reason','Die change overrun'],['Work order','MWO-2231 raised'],['Assigned to','Shift technician']], done:'Maintenance notified' },
    before:['Stoppages reach a report after the shift is gone','Requests made by radio, remembered by luck','Preventive work slips because nothing tracks it'],
    after:['A stoppage raises its own work order','Technicians get the job with the asset history','Preventive schedules run on calendar or usage'],
    plan:[['Week 1–3','Connect','Assets and spares list; machine signals where available.'],['Week 3–6','Go live','Downtime capture and requests on one line.'],['Month 2–3','Extend','Preventive schedules and spare-parts tracking.']] },
]

/* a handheld running the operator screen, tilted in 3D and following the pointer */
export function Device({ pick }) {
  const [step, setStep] = useState(0)
  const ref = useRef(null)
  const n = pick.screen.steps.length

  useEffect(() => {
    const id = setInterval(() => setStep(s => (s > n + 2 ? 0 : s + 1)), 1000)
    return () => clearInterval(id)
  }, [n, pick.key])

  useEffect(() => {
    const move = e => {
      const el = ref.current; if (!el) return
      const r = el.getBoundingClientRect()
      const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth, dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight
      el.style.transform = `rotateY(${-16 + dx * 16}deg) rotateX(${7 - dy * 12}deg)`
    }
    window.addEventListener('pointermove', move, { passive:true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  const done = step > n
  return (
    <div style={{perspective:1500,display:'flex',justifyContent:'center',padding:'1rem 0 2rem'}}>
      <div ref={ref} style={{position:'relative',width:'min(390px,86vw)',transformStyle:'preserve-3d',transform:'rotateY(-16deg) rotateX(7deg)',transition:'transform .25s ease-out'}}>
        {/* soft floor shadow */}
        <div aria-hidden="true" style={{position:'absolute',left:'8%',right:'-6%',bottom:-34,height:46,background:'radial-gradient(50% 50% at 50% 50%,rgba(22,22,30,.28),transparent 70%)',filter:'blur(8px)',transform:'translateZ(-60px)'}}></div>
        <div style={{background:INK,borderRadius:38,padding:13,boxShadow:'0 40px 80px rgba(22,22,30,.3), inset 0 0 0 2px #2c2e3b'}}>
          <div style={{background:'#fff',borderRadius:27,overflow:'hidden',minHeight:520,display:'flex',flexDirection:'column'}}>
            <div style={{background:'var(--red)',color:'#fff',padding:'.95rem 1.15rem',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div>
                <div style={{fontFamily:MONO,fontSize:9.5,letterSpacing:'.18em',textTransform:'uppercase',opacity:.85}}>FloorLogiQ · {pick.screen.app}</div>
                <div style={{fontSize:'1.06rem',fontWeight:800,letterSpacing:'-.02em',marginTop:2}}>{pick.screen.title}</div>
              </div>
              <span style={{fontFamily:MONO,fontSize:10,letterSpacing:'.1em',background:'rgba(255,255,255,.2)',borderRadius:6,padding:'.2rem .45rem'}}>{pick.tag}</span>
            </div>
            <div style={{padding:'1rem 1.05rem',display:'flex',flexDirection:'column',gap:'.6rem',flex:1}}>
              {pick.screen.steps.map(([label, value], i) => {
                const ok = step > i, now = step === i
                return (
                  <div key={label} style={{display:'flex',alignItems:'center',gap:'.75rem',border:`1.5px solid ${now ? 'var(--red)' : ok ? '#cfe9da' : '#e6e8ee'}`,background:ok ? '#f3fbf6' : '#fff',borderRadius:13,padding:'.7rem .85rem',transition:'all .3s',boxShadow:now ? '0 0 0 4px rgba(204,31,31,.1)' : 'none'}}>
                    <span style={{width:26,height:26,borderRadius:'50%',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background:ok ? '#1d9d55' : now ? 'var(--red)' : '#eef0f4',color:ok || now ? '#fff' : '#8a90a8',fontSize:12,fontWeight:900,transition:'background .3s'}}>{ok ? '✓' : i + 1}</span>
                    <div style={{minWidth:0}}>
                      <div style={{fontFamily:MONO,fontSize:9.5,letterSpacing:'.12em',textTransform:'uppercase',color:'#8a90a8'}}>{label}</div>
                      <div style={{fontSize:'.98rem',fontWeight:800,letterSpacing:'-.015em',color:ok || now ? '#0a0a0a' : '#b6bbc9',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{ok || now ? value : '—'}</div>
                    </div>
                  </div>
                )
              })}
              <div style={{marginTop:'auto',borderRadius:13,padding:'.85rem',textAlign:'center',fontWeight:800,fontSize:'.98rem',letterSpacing:'-.01em',background:done ? '#1d9d55' : '#f3f4f6',color:done ? '#fff' : '#9aa0b4',transition:'background .35s,color .35s'}}>
                {done ? `✓ ${pick.screen.done}` : 'Waiting for scan…'}
              </div>
            </div>
          </div>
        </div>
        <span style={{position:'absolute',top:-12,right:-14,background:'#fff',border:'1px solid #e6e8ee',borderRadius:50,padding:'.3rem .75rem',fontFamily:MONO,fontSize:9.5,letterSpacing:'.14em',textTransform:'uppercase',color:'#6b7280',boxShadow:'0 6px 18px rgba(10,10,10,.1)',transform:'translateZ(40px)'}}>Sample screen</span>
      </div>
    </div>
  )
}
