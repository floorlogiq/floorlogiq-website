export default function HowItWorks() {
  const steps = [
    { phase:'Connect', n:1, h:'Connect everything', p:'Scanners, PLCs, scales and printers on one side; NetSuite, SAP and EDI partners on the other — every transaction flowing both ways.', time:'WEEK 1–3', active:true,
      icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" y1="12" x2="16" y2="12"/></svg> },
    { phase:'Visibility', n:2, h:'See it live', p:'OEE, throughput, scrap, and 30+ ISO 22400 KPIs are computed live — every number is traceable to the scan that created it.', time:'WEEK 3–6',
      icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#9aa0b4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
    { phase:'Standardize', n:3, h:'Standardize execution', p:'Operators get guided digital workflows and enforced data entry, so the right way becomes the only way.', time:'MONTH 2-3',
      icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#9aa0b4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg> },
    { phase:'Scale', n:4, h:'Scale without rebuilding', p:'Roll the same architecture across lines, warehouses and plants — your team extends it, with no rip-and-replace.', time:'Month 3+',
      icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#9aa0b4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/></svg> },
  ]
  return (
    <section style={{background:'transparent',color:'#0a0a0a',position:'relative'}}>
      <div style={{textAlign:'center',padding:'2.5rem 2.5rem 0',maxWidth:820,margin:'0 auto'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:'.55rem',fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--red)',marginBottom:'1rem'}}>
          <span style={{width:22,height:1,background:'var(--red)'}}></span>How it works
        </div>
        <h2 style={{color:'#0a0a0a',fontSize:'clamp(2rem,3.6vw,3rem)',fontWeight:900,letterSpacing:'-.035em',lineHeight:1.08}}>The tagline isn't a slogan.<br/>It's the <span style={{color:'var(--red)'}}>implementation plan</span>.</h2>
        <p style={{color:'#4a5168',fontSize:'clamp(1rem,1.4vw,1.15rem)',lineHeight:1.7,margin:'1.1rem auto 0',maxWidth:'56ch'}}>Start with one line or one zone, connect it to the systems you already run, then scale the same platform across the enterprise — without rebuilding.</p>
      </div>
      <div style={{position:'relative',maxWidth:1240,margin:'0 auto',padding:'2.5rem 2.5rem 2rem'}}>
        <div style={{position:'absolute',top:'calc(3.5rem + 28px)',left:'calc(2.5rem + 12.5%)',right:'calc(2.5rem + 12.5%)',height:3,background:'#e6e8ee',borderRadius:2,overflow:'visible'}}>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,var(--red),rgba(204,31,31,.18))',borderRadius:2}}></div>
          <div style={{position:'absolute',top:'50%',left:0,width:13,height:13,marginTop:-6.5,borderRadius:'50%',background:'var(--red)',boxShadow:'0 0 14px var(--red)',animation:'flqTravel 4.5s linear infinite'}}></div>
        </div>
        <div className="howitworks-grid" style={{position:'relative',display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1.6rem'}}>
          {steps.map(({phase,n,h,p,time,active,icon})=>(
            <div key={n} style={{position:'relative',display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center'}}>
              <div style={{width:56,height:56,borderRadius:'50%',background:'#fff',border:`2.5px solid ${active ? 'var(--red)' : '#d2d6e0'}`,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:'1.05rem',color:active?'var(--red)':'#16161e',boxShadow:active?'0 0 0 6px rgba(204,31,31,.1),0 8px 22px rgba(204,31,31,.22)':'0 4px 14px rgba(10,10,10,.07)',position:'relative',zIndex:2,overflow:'visible'}}>
                {icon}
                <span style={{position:'absolute',top:-7,right:-7,width:21,height:21,borderRadius:'50%',background:'var(--red)',color:'#fff',fontSize:10.5,fontWeight:900,display:'flex',alignItems:'center',justifyContent:'center',border:'2px solid #fff'}}>{n}</span>
              </div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:9.5,letterSpacing:'.16em',textTransform:'uppercase',color:'var(--red)',margin:'1.3rem 0 .5rem'}}>{phase}</div>
              <h3 style={{fontSize:'1.18rem',fontWeight:900,letterSpacing:'-.025em',lineHeight:1.18,color:'#0a0a0a',maxWidth:'18ch'}}>{h}</h3>
              <p style={{fontSize:'.88rem',color:'#4a5168',lineHeight:1.7,marginTop:'.6rem',maxWidth:'26ch'}}>{p}</p>
              <span style={{marginTop:'1rem',padding:'.32rem .85rem',borderRadius:50,background:'#f7f8fa',border:'1px solid #e6e8ee',fontFamily:"'DM Mono',monospace",fontSize:9.5,letterSpacing:'.08em',textTransform:'uppercase',color:'#16161e',fontWeight:700}}>{time}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
