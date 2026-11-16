import { useEffect, useState } from 'react'

const MONO = "'DM Mono',monospace"

/* zone anchors (world space) — labels are projected onto these every frame */
export const ZONES = [
  { key:'wms',  tag:'WMS',  name:'Receiving & warehouse', at:[-9.4, 3.9, -2.6], pad:[8.5, 7.5, -7.6, -3.6] },
  { key:'mes',  tag:'MES',  name:'Production line',       at:[ 1.6, 2.6, -2.2], pad:[11.5, 5, 2, -2.6] },
  { key:'qms',  tag:'QMS',  name:'Inspection',            at:[ 7.4, 2.6,  2.6], pad:[5.6, 5, 8.2, 3.4] },
  { key:'cmms', tag:'CMMS', name:'Maintenance',           at:[-2.6, 2.4,  4.6], pad:[6, 4.6, -3, 5] },
]

const LOGO = f => `${import.meta.env.BASE_URL}logos/${f}`
const ERPS = [
  { name:'SAP', src:LOGO('sap.svg') }, { name:'NetSuite', color:'#1B6CA8' }, { name:'Oracle', src:LOGO('oracle.svg') },
  { name:'Dynamics 365', color:'#0078D4' }, { name:'Epicor', src:LOGO('epicor.svg') }, { name:'Infor', color:'#D52B1E' },
  { name:'Sage', src:LOGO('sage.svg') }, { name:'Acumatica', color:'#0033A0' }, { name:'Plex', color:'#E8762B' },
]

/* one hub: Fuuz and the customer's ERP inside a single capsule, data moving both ways between them */
export function HubCapsule() {
  const [erp, setErp] = useState(0)
  useEffect(() => { const id = setInterval(() => setErp(i => (i + 1) % ERPS.length), 2200); return () => clearInterval(id) }, [])
  return (
    <div className="f3d-capsule" style={{position:'absolute',inset:0}}>
      <span aria-hidden="true" style={{position:'absolute',inset:-12,borderRadius:62,background:'rgba(204,31,31,.07)',border:'1px solid rgba(204,31,31,.22)',animation:'flqHubGlow 3.2s ease-in-out infinite'}}></span>
      <div style={{position:'absolute',inset:0,borderRadius:50,background:'#fff',border:'3px solid var(--red)',boxShadow:'0 14px 34px rgba(204,31,31,.28)',display:'grid',gridTemplateColumns:'80px 1fr 96px',alignItems:'center',padding:'0 10px'}}>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:3}}>
          <img src={`${import.meta.env.BASE_URL}mark-fuuz.png`} alt="Fuuz" style={{width:44,height:44,objectFit:'contain',display:'block'}}/>
          <span style={{fontFamily:MONO,fontSize:8,letterSpacing:'.16em',textTransform:'uppercase',color:'#6b7280'}}>Fuuz</span>
        </div>
        <div style={{position:'relative',height:44}}>
          <span style={{position:'absolute',left:0,right:0,top:9,height:2,borderRadius:2,background:'rgba(204,31,31,.22)'}}></span>
          <span style={{position:'absolute',left:0,right:0,top:21,height:2,borderRadius:2,background:'rgba(22,22,30,.14)'}}></span>
          {[0, 1].map(k => <span key={`r${k}`} style={{position:'absolute',top:6,width:8,height:8,borderRadius:'50%',background:'var(--red)',animation:`flqFlowR 1.8s linear ${k * .9}s infinite both`}}></span>)}
          {[0, 1].map(k => <span key={`l${k}`} style={{position:'absolute',top:18,width:8,height:8,borderRadius:'50%',background:'#16161e',animation:`flqFlowL 1.8s linear ${k * .9 + .45}s infinite both`}}></span>)}
          <span style={{position:'absolute',left:-8,right:-8,top:32,textAlign:'center',whiteSpace:'nowrap',fontFamily:MONO,fontSize:7.5,letterSpacing:'.14em',textTransform:'uppercase',color:'var(--red)'}}>Two-way</span>
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:3}}>
          <div style={{position:'relative',width:84,height:44}}>
            {ERPS.map((e, i) => (
              <div key={e.name} style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',opacity:i === erp ? 1 : 0,transform:i === erp ? 'none' : 'translateY(5px)',transition:'opacity .5s ease,transform .5s ease'}}>
                {e.src
                  ? <img src={e.src} alt={e.name} style={{maxWidth:'82%',height:30,objectFit:'contain',display:'block'}}/>
                  : <span style={{fontWeight:900,fontSize:12,letterSpacing:'-.03em',lineHeight:1.05,textAlign:'center',color:e.color}}>{e.name}</span>}
              </div>
            ))}
          </div>
          <span style={{fontFamily:MONO,fontSize:8,letterSpacing:'.16em',textTransform:'uppercase',color:'#6b7280'}}>Your ERP</span>
        </div>
      </div>
      <div style={{position:'absolute',left:'50%',bottom:'calc(100% + 9px)',transform:'translateX(-50%)',whiteSpace:'nowrap',display:'flex',alignItems:'center',gap:9,background:'#fff',border:'1px solid #d2d6e0',borderRadius:50,padding:'.38rem .85rem',boxShadow:'0 8px 22px rgba(10,10,10,.14)'}}>
        <span style={{width:7,height:7,borderRadius:'50%',background:'#1d9d55',animation:'flqPulse 1.6s ease-in-out infinite'}}></span>
        <span style={{fontWeight:900,fontSize:12.5,letterSpacing:'-.2px',textTransform:'uppercase',color:'#0a0a0a'}}>FloorLog<span style={{color:'var(--red)'}}>iQ</span></span>
        <span style={{fontFamily:MONO,fontSize:9.5,letterSpacing:'.14em',textTransform:'uppercase',color:'#1d9d55'}}>Live</span>
      </div>
    </div>
  )
}
