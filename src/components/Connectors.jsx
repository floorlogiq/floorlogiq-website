import { useState } from 'react'

const L = (f) => `${import.meta.env.BASE_URL}logos/${f}`

const erpLogos = [
  // ERP / back-office
  { name:'NetSuite',     color:'#1B6CA8' },
  { name:'SAP',          src:L('sap.svg'),         color:'#0AA1DD' },
  { name:'Oracle',       src:L('oracle.svg'),      color:'#C74634' },
  { name:'Dynamics 365', color:'#0078D4' },
  { name:'Epicor',       src:L('epicor.svg'),      color:'#00AEEF' },
  { name:'Infor',        color:'#D52B1E' },
  { name:'Sage',         src:L('sage.svg'),        color:'#00DC00' },
  { name:'Acumatica',    color:'#0033A0' },
  { name:'QuickBooks',   src:L('quickbooks.svg'),  color:'#2CA01C' },
  { name:'Plex',         color:'#E8762B' },
  // platforms & cloud
  { name:'Salesforce',   src:L('salesforce.svg'),  color:'#00A1E0' },
  { name:'HubSpot',      src:L('hubspot.svg'),     color:'#FF7A59' },
  { name:'Zoho',         src:L('zoho.svg'),        color:'#333333' },
  { name:'SugarCRM',     color:'#C80929' },
  { name:'ADP',          color:'#D9232E' },
  { name:'Workday',      src:L('workday.svg'),     color:'#0875E1' },
  { name:'OpenAI',       src:L('openai.svg'),      color:'#412991' },
  { name:'Google',       src:L('google.svg'),      color:'#4285F4' },
  // commerce & logistics
  { name:'Amazon',       src:L('amazon.svg'),      color:'#FF9900' },
  { name:'Shopify',      src:L('shopify.svg'),     color:'#96BF48' },
  { name:'Square',       src:L('square.svg'),      color:'#3E4348' },
  { name:'Clover',       color:'#1DA462' },
  { name:'FedEx',        src:L('fedex.svg'),       color:'#4D148C' },
  { name:'UPS',          src:L('ups.svg'),         color:'#F4B400' },
  { name:'USPS',         color:'#333366' },
  { name:'EDI Nation',   color:'#0057A8' },
]

function ErpLogo({ name, src, color, ariaHidden }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return (
    <span style={{fontFamily:'Arial,sans-serif',fontSize:20,fontWeight:800,color,whiteSpace:'nowrap',lineHeight:1,flexShrink:0}} aria-hidden={ariaHidden}>
      {name}
    </span>
  )
  return <img src={src} alt={name} height={48} style={{height:48,width:'auto',maxWidth:140,objectFit:'contain',display:'block',flexShrink:0}} onError={()=>setFailed(true)} aria-hidden={ariaHidden}/>
}

export default function Connectors() {
  return (
    <section style={{background:'transparent',padding:'1rem clamp(1.5rem,4vw,5rem) 2rem',position:'relative'}}>
      <div style={{maxWidth:1180,margin:'0 auto',height:112,display:'flex',alignItems:'center',gap:'2.4rem',background:'#fff',border:'1px solid #e6e8ee',borderRadius:18,boxShadow:'0 1px 4px rgba(10,10,10,.06)',overflow:'hidden',padding:'0 2.2rem'}}>
        <div style={{flexShrink:0,maxWidth:210}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:'.16em',textTransform:'uppercase',color:'var(--red)',marginBottom:'.35rem'}}>44 connectors</div>
          <div style={{fontSize:'1.3rem',fontWeight:900,letterSpacing:'-.025em',lineHeight:1.1,color:'#0a0a0a'}}>We connect with</div>
        </div>
        <div style={{flex:1,overflow:'hidden',WebkitMaskImage:'linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent)',maskImage:'linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent)'}}
          onMouseEnter={e=>{const t=e.currentTarget.firstChild;if(t)t.style.animationPlayState='paused'}}
          onMouseLeave={e=>{const t=e.currentTarget.firstChild;if(t)t.style.animationPlayState='running'}}>
          <div style={{display:'flex',alignItems:'center',gap:'3.2rem',width:'max-content',animation:'flqMarquee 90s linear infinite'}}>
            {[...erpLogos,...erpLogos].map((logo,i)=>(
              <ErpLogo key={i} {...logo} ariaHidden={i>=erpLogos.length?'true':undefined}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
