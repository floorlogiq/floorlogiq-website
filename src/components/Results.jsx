const tiles = [
  { arrow:'↓', color:'var(--red)', h:'Manual data entry', p:'Scans and device feeds replace clipboards and re-keying.' },
  { arrow:'↑', color:'#1d9d55', h:'Inventory accuracy', p:'Every move is confirmed at the point of work.' },
  { arrow:'↑', color:'#1d9d55', h:'Production visibility', p:'Live OEE, throughput, and status across every line.' },
  { arrow:'↑', color:'#1d9d55', h:'Operator onboarding', p:'Guided workflows shorten time-to-productive.' },
  { arrow:'↓', color:'var(--red)', h:'Process variation', p:'Enforced steps make the right way the only way.' },
  { arrow:'↑', color:'#1d9d55', h:'Schedule adherence', p:'Plan vs. actual is visible the moment it drifts.' },
  { arrow:'↑', color:'#1d9d55', h:'Connected systems', p:"One change posts useful data everywhere it's needed." },
  { arrow:'↑', color:'#1d9d55', h:'Continuous improvement', p:'Real baselines make every kaizen measurable.' },
]

export default function Results() {
  return (
    <section id="results" style={{padding:'3rem 2.5rem',background:'transparent',width:'100%'}}>
      <div style={{margin:'0 auto',width:'100%'}}>
        <div style={{maxWidth:780,margin:'0 auto 2rem',textAlign:'center'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'.55rem',fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--red)',marginBottom:'1rem'}}>
            <span style={{width:22,height:1,background:'var(--red)'}}></span>Outcomes
          </div>
          <h2 style={{fontSize:'clamp(2rem,3.6vw,3rem)',fontWeight:900,letterSpacing:'-.035em',lineHeight:1.08}}>Deliver measurable operational results.</h2>
          <p style={{color:'#4a5168',fontSize:'clamp(1rem,1.4vw,1.15rem)',lineHeight:1.7,margin:'1.1rem auto 0',maxWidth:'56ch'}}>FloorLogiQ targets the operational levers that move the business — the same ones your continuous-improvement teams already chase.</p>
        </div>
        <div className="grid-4col" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1rem'}}>
          {tiles.map(({arrow,color,h,p})=>(
            <div key={h} style={{background:'#fff',border:'1px solid #e6e8ee',borderRadius:14,padding:'1.5rem'}}>
              <div style={{fontSize:'1.4rem',color,fontWeight:900,lineHeight:1}}>{arrow}</div>
              <div style={{fontWeight:800,fontSize:'1rem',margin:'.6rem 0 .3rem',letterSpacing:'-.01em'}}>{h}</div>
              <div style={{fontSize:'.85rem',color:'#8a90a8',lineHeight:1.55}}>{p}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
