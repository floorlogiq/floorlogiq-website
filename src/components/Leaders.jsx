const cards = [
  { h:'Plant Managers', p:'See OEE, downtime, and order status live — and act on bottlenecks while the shift is still running.' },
  { h:'Operations Directors', p:'Standardize execution across sites and compare performance on a single, trusted set of numbers.' },
  { h:'Manufacturing Executives', p:'Connect shop-floor reality to financial outcomes, and move the digitization roadmap forward without big-bang risk.' },
  { h:'Warehouse Managers', p:'Direct every scan from dock to ship, with inventory and ASNs posting to the ERP in real time.' },
  { h:'Continuous Improvement', p:'Get real baselines and live data to prove out kaizen, SMED, and Six Sigma initiatives that stick.' },
  { h:'CIOs & IT Leaders', p:'Replace brittle point-to-point integrations with a governed hub your own teams can extend and own.' },
]

export default function Leaders() {
  return (
    <section style={{padding:'3rem 2.5rem',background:'transparent'}}>
      <div style={{margin:'0 auto',width:'100%'}}>
        <div style={{maxWidth:780,margin:'0 auto 2rem',textAlign:'center'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'.55rem',fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--red)',marginBottom:'1rem'}}>
            <span style={{width:22,height:1,background:'var(--red)'}}></span>Built for operations leaders
          </div>
          <h2 style={{fontSize:'clamp(2rem,3.6vw,3rem)',fontWeight:900,letterSpacing:'-.035em',lineHeight:1.08}}>One platform, every stakeholder.</h2>
          <p style={{color:'#4a5168',fontSize:'clamp(1rem,1.4vw,1.15rem)',lineHeight:1.7,margin:'1.1rem auto 0',maxWidth:'56ch'}}>From the floor to the top floor — everyone works from the same live truth.</p>
        </div>
        <div className="grid-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1.1rem'}}>
          {cards.map(({h,p})=>(
            <div key={h} data-reveal="true" style={{border:'1px solid #e6e8ee',borderRadius:16,padding:'1.8rem',background:'#fff',transition:'box-shadow .25s,transform .25s'}}>
              <div style={{borderLeft:'3px solid var(--red)',paddingLeft:'.9rem'}}>
                <h3 style={{fontSize:'1.05rem',fontWeight:900,letterSpacing:'-.02em'}}>{h}</h3>
                <p style={{fontSize:'.88rem',color:'#4a5168',lineHeight:1.7,marginTop:'.5rem'}}>{p}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
