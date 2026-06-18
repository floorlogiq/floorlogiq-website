import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({first:'',last:'',email:'',company:'',industry:'',message:''})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errMsg, setErrMsg] = useState('')

  function update(k,v) { setForm(f=>({...f,[k]:v})) }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending'); setErrMsg('')
    const payload = {
      access_key: '33b8dc53-42a3-45f2-86a1-bcce07fc64c8',
      subject: 'New demo request — ' + (form.first+' '+form.last).trim(),
      from_name: (form.first+' '+form.last).trim() || 'FloorLogiQ website',
      email: form.email,
      'First name': form.first,
      'Last name': form.last,
      Company: form.company,
      Industry: form.industry,
      'What they want to see': form.message,
    }
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method:'POST', headers:{'Content-Type':'application/json',Accept:'application/json'}, body:JSON.stringify(payload) })
      const data = await res.json().catch(()=>({}))
      if (res.ok && data && data.success) { setStatus('success') }
      else { throw new Error((data&&data.message)||'Request failed') }
    } catch(err) {
      setStatus('error')
      setErrMsg('Sorry — your request could not be sent. Please try again, or email sasi@floorlogiq.com directly.')
    }
  }

  const inputStyle = {width:'100%',border:'1.5px solid #d2d6e0',borderRadius:10,padding:'.68rem .9rem',fontSize:14,color:'#0a0a0a',outline:'none'}
  const labelStyle = {display:'block',fontSize:11,fontWeight:700,letterSpacing:'.04em',textTransform:'uppercase',color:'#4a5168',marginBottom:'.35rem'}

  return (
    <section id="contact" style={{padding:'3rem 2.5rem',background:'transparent'}}>
      <div className="grid-2col" style={{maxWidth:1100,margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1.1fr',gap:'4rem',alignItems:'start'}}>
        <div>
          <div style={{display:'inline-flex',alignItems:'center',gap:'.55rem',fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--red)',marginBottom:'1rem'}}>
            <span style={{width:22,height:1,background:'var(--red)'}}></span>Book a demo
          </div>
          <h2 style={{fontSize:'clamp(1.9rem,3vw,2.6rem)',fontWeight:900,letterSpacing:'-.035em',lineHeight:1.1}}>See your floor running on FUUZ.</h2>
          <p style={{fontSize:'1.02rem',color:'#4a5168',lineHeight:1.75,marginTop:'1.1rem',maxWidth:'44ch'}}>Tell us about your operation and we'll walk you through a live environment shaped to your industry — with a real path from pilot to enterprise rollout.</p>
          <div style={{display:'flex',flexDirection:'column',gap:'1.1rem',marginTop:'2rem'}}>
            {[['1','Discovery','A 30-minute fit conversation'],['2','Tailored demo','Live environment for your industry'],['3','Pilot plan','A scoped path to first live shipment']].map(([n,label,sub])=>(
              <div key={n} style={{display:'flex',alignItems:'flex-start',gap:'.9rem'}}>
                <div style={{width:38,height:38,borderRadius:10,background:'#fff',border:'1px solid #e6e8ee',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 1px 4px rgba(10,10,10,.06)',flexShrink:0,fontWeight:900,color:'var(--red)'}}>{n}</div>
                <div>
                  <div style={{fontSize:10,fontFamily:"'DM Mono',monospace",letterSpacing:'.1em',textTransform:'uppercase',color:'#8a90a8'}}>{label}</div>
                  <div style={{fontSize:'.92rem',fontWeight:600}}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'1rem',marginTop:'2rem',paddingTop:'1.6rem',borderTop:'1px solid #e6e8ee'}}>
            <div style={{width:44,height:44,borderRadius:12,background:'rgba(204,31,31,.08)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div>
              <div style={{fontSize:10,fontFamily:"'DM Mono',monospace",letterSpacing:'.1em',textTransform:'uppercase',color:'#8a90a8'}}>Prefer to talk?</div>
              <span style={{fontSize:'1.15rem',fontWeight:900,letterSpacing:'-.02em',color:'#0a0a0a'}}>+91-93456-66656</span>
            </div>
          </div>
        </div>
        <div style={{position:'relative'}}>
          {status === 'success' ? (
            <div style={{background:'#eefaf3',border:'1px solid #bfe8d0',color:'#1d9d55',borderRadius:20,padding:'2.4rem',textAlign:'center'}}>
              <div style={{width:60,height:60,borderRadius:'50%',background:'#fff',border:'2px solid #bfe8d0',display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,margin:'0 auto 1rem'}}>✓</div>
              <h3 style={{fontSize:'1.2rem',fontWeight:900,color:'#0a0a0a'}}>Request received.</h3>
              <p style={{fontSize:'.9rem',color:'#4a5168',marginTop:'.5rem'}}>A FloorLogiQ specialist will reach out within one business day to schedule your tailored demo.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{background:'#fff',border:'1px solid #e6e8ee',borderRadius:20,padding:'2.2rem',boxShadow:'0 6px 24px rgba(10,10,10,.09)'}}>
              <h3 style={{fontSize:'1.2rem',fontWeight:900,marginBottom:'1.4rem'}}>Request your demo</h3>
              <div className="grid-2col" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.9rem'}}>
                <div style={{marginBottom:'.9rem'}}><label style={labelStyle}>First name</label><input type="text" required style={inputStyle} value={form.first} onChange={e=>update('first',e.target.value)}/></div>
                <div style={{marginBottom:'.9rem'}}><label style={labelStyle}>Last name</label><input type="text" required style={inputStyle} value={form.last} onChange={e=>update('last',e.target.value)}/></div>
              </div>
              <div style={{marginBottom:'.9rem'}}><label style={labelStyle}>Work email</label><input type="email" required style={inputStyle} value={form.email} onChange={e=>update('email',e.target.value)}/></div>
              <div style={{marginBottom:'.9rem'}}><label style={labelStyle}>Company</label><input type="text" required style={inputStyle} value={form.company} onChange={e=>update('company',e.target.value)}/></div>
              <div style={{marginBottom:'.9rem'}}><label style={labelStyle}>Industry</label>
                <select required style={{...inputStyle,background:'#fff'}} value={form.industry} onChange={e=>update('industry',e.target.value)}>
                  <option value="" disabled>Select an industry</option>
                  <option>Distribution & 3PL</option><option>Discrete Manufacturing</option><option>Food & Process</option><option>Medical & Regulated</option><option>Automotive</option><option>Other</option>
                </select>
              </div>
              <div style={{marginBottom:'1.2rem'}}><label style={labelStyle}>What would you like to see?</label><textarea required style={{...inputStyle,minHeight:96,resize:'vertical'}} value={form.message} onChange={e=>update('message',e.target.value)}/></div>
              <button type="submit" disabled={status==='sending'} style={{width:'100%',background:'var(--red)',color:'#fff',borderRadius:10,padding:'.9rem',fontSize:15,fontWeight:700,transition:'background .18s,transform .2s'}}
                onMouseEnter={e=>{if(status!=='sending'){e.currentTarget.style.background='var(--red2)';e.currentTarget.style.transform='translateY(-1px)'}}}
                onMouseLeave={e=>{e.currentTarget.style.background='var(--red)';e.currentTarget.style.transform=''}}>
                {status==='sending'?'Sending…':'Request demo →'}
              </button>
              {status==='error' && <p style={{marginTop:'.85rem',fontSize:13,color:'var(--red)',fontWeight:700,textAlign:'center'}}>{errMsg}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
