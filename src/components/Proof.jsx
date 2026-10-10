import { useEffect, useRef, useState } from 'react'

const stats = [
  { to:30,    suffix:'+',  decimals:0, label:'ISO 22400 KPIs',      sub:'computed live from floor events' },
  { to:5,     prefix:'<',  suffix:'s', decimals:0, label:'ERP posting time', sub:'scan to posted transaction' },
  { to:44,    suffix:'+',  decimals:0, label:'Pre-built connectors', sub:'ERP, EDI, device and cloud' },
  { to:3,     suffix:'×',  decimals:0, label:'Faster than paper',    sub:'guided, scan-driven execution' },
]

function useCountUp(target, decimals, run) {
  const [val, setVal] = useState(0)
  useEffect(()=>{
    if (!run) return
    let raf, start
    const dur = 1500
    const tick = (ts)=>{
      if (!start) start = ts
      const p = Math.min((ts - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(target * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return ()=>cancelAnimationFrame(raf)
  }, [run, target])
  return val.toFixed(decimals)
}

function Stat({ stat, run }) {
  const shown = useCountUp(stat.to, stat.decimals, run)
  return (
    <div style={{flex:'1 1 0',minWidth:160,textAlign:'center',padding:'0 1rem'}}>
      <div style={{fontSize:'clamp(2.4rem,4.4vw,3.6rem)',fontWeight:900,letterSpacing:'-.05em',lineHeight:1,color:'#0a0a0a',fontVariantNumeric:'tabular-nums'}}>
        {stat.prefix||''}{shown}{stat.suffix||''}
      </div>
      <div style={{width:28,height:3,background:'var(--red)',borderRadius:2,margin:'.85rem auto .75rem'}}></div>
      <div style={{fontSize:'.92rem',fontWeight:800,letterSpacing:'-.01em',color:'#0a0a0a',marginBottom:'.25rem'}}>{stat.label}</div>
      <div style={{fontSize:'.78rem',color:'#8a90a8',lineHeight:1.5}}>{stat.sub}</div>
    </div>
  )
}

export default function Proof() {
  const ref = useRef(null)
  const [run, setRun] = useState(false)
  useEffect(()=>{
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e])=>{
      if (e.isIntersecting) { setRun(true); obs.disconnect() }
    }, { threshold:0.35 })
    obs.observe(el)
    return ()=>obs.disconnect()
  }, [])

  return (
    <section ref={ref} style={{padding:'3.5rem clamp(1.5rem,4vw,5rem) 1rem',background:'transparent'}}>
      <div style={{maxWidth:1180,margin:'0 auto',background:'#fff',border:'1px solid #e6e8ee',borderRadius:22,boxShadow:'0 8px 40px rgba(10,10,10,.07)',padding:'2.6rem 1.6rem',display:'flex',flexWrap:'wrap',gap:'2rem 0',alignItems:'flex-start',position:'relative',overflow:'hidden'}}>
        <div aria-hidden="true" style={{position:'absolute',top:0,left:0,right:0,height:3,background:'linear-gradient(90deg,var(--red),rgba(204,31,31,.15),transparent)'}}></div>
        {stats.map((s,i)=>(
          <Stat key={s.label} stat={s} run={run}/>
        ))}
      </div>
    </section>
  )
}
