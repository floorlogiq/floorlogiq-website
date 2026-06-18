function LogoMark({ size=30 }) {
  const s = size
  return (
    <div style={{position:'relative',width:s,height:s,flexShrink:0}}>
      <div style={{position:'absolute',inset:0,border:`${s*0.1}px solid #0a0a0a`,transform:'rotate(45deg)'}}></div>
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:s*0.333,height:s*0.333,borderRadius:'50%',background:'#0a0a0a'}}></div>
      <div style={{position:'absolute',bottom:s*0.133,right:s*0.133,width:s*0.233,height:s*0.1,background:'#f7f8fa',transform:'rotate(45deg)',transformOrigin:'right center',zIndex:2}}></div>
      <div style={{position:'absolute',bottom:s*0.067,right:s*0.067,width:s*0.333,height:s*0.1,background:'#0a0a0a',transform:'rotate(45deg)',transformOrigin:'right center'}}></div>
    </div>
  )
}

const cols = [
  { h:'Warehouse', items:['Scan & pack','Wave picking','Licence plate tracking','Load-based shipping','Cycle counting'] },
  { h:'Manufacturing', items:['Work order execution','Serial genealogy','OEE & downtime','Inline quality','Operator screens'] },
  { h:'Compliance', items:['Audit trails','Device history records','E-signatures','Lot traceability','Enforced data entry'] },
  { h:'Platform', items:['Screen builder','Live data model','Device gateway','ERP connectors','ISO 22400 KPIs'] },
  { h:'Company', items:['About us','Customers','Careers','Partners','Contact'] },
]

export default function Footer() {
  return (
    <footer style={{background:'transparent',borderTop:'1px solid #e6e8ee',padding:'3rem 2.5rem 1.8rem'}}>
      <div style={{maxWidth:1180,margin:'0 auto'}}>
        <div className="grid-5col" style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'2rem',paddingBottom:'2.6rem'}}>
          {cols.map(({h,items})=>(
            <div key={h}>
              <h4 style={{fontSize:10.5,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'#0a0a0a',marginBottom:'.85rem'}}>{h}</h4>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'.45rem'}}>
                {items.map(item=><li key={item}><a style={{fontSize:'.82rem',color:'#4a5168'}}>{item}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'2rem',padding:'1.8rem 0',borderTop:'1px solid #e6e8ee',borderBottom:'1px solid #e6e8ee',flexWrap:'wrap'}}>
          <div style={{display:'flex',alignItems:'center',gap:'.7rem'}}>
            <LogoMark size={30}/>
            <div style={{fontWeight:900,fontSize:14,lineHeight:.95,textTransform:'uppercase',letterSpacing:'-.2px'}}>FLOOR<br/>LOG<span style={{color:'var(--red)'}}>IQ</span></div>
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
  )
}
