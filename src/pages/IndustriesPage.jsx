import { RED, INK, Tick, Section, SectionHead, PageHero, Faq, OneProcess, goPage, goSection } from './ui'

const MONO = "'DM Mono',monospace"
const img = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`

const industries = [
  { name:'Automotive', rule:'IATF 16949 · customer-mandated traceability',
    pain:'The line sets the pace, and one wrong part in the wrong sequence stops your customer as well as you.',
    start:'Error-proofing on one line', live:'Scan gates that stop a wrong part before it is fitted, with every unit traced back to its supplier lot.',
    points:['Sequenced delivery tied to the schedule','Part-to-unit traceability','Supplier ASN and EDI in one flow'],
    img:img('photo-1567789884554-0b844b597180'), alt:'Automotive assembly line with robotic arms' },
  { name:'Distribution & 3PL', rule:'Inventory accuracy · same-day shipping',
    pain:'Every mis-pick is a credit note, and every count that does not match is a customer call you did not want.',
    start:'Receiving on one dock', live:'Scan-directed receiving and putaway that posts to the ERP while the truck is still at the door.',
    points:['Handheld-directed putaway and picking','License-plate and lot tracking','Cycle counts without a shutdown'],
    img:img('photo-1586528116311-ad8dd3c8310d'), alt:'Distribution warehouse with high-bay racking' },
  { name:'Discrete Manufacturing', rule:'On-time delivery · first-pass yield',
    pain:'The work order leaves the office and nobody knows where it is until it comes back finished, late or short.',
    start:'Work orders on one cell', live:'Operator screens for one work center: start, step, count, scrap and finish, with live status for the planner.',
    points:['Guided work order execution','Live OEE, scrap and downtime','Serial and lot genealogy'],
    img:img('photo-1504328345606-18bbc8c9d7d1'), alt:'Metal fabrication on a manufacturing floor' },
  { name:'Food & Process', rule:'Lot traceability · allergen and spec control',
    pain:'A recall is a race, and paper batch records make you start it a day behind.',
    start:'Lot trace on one product family', live:'Batch records created as the work happens, so a supplier lot traces to every shipment in one lookup.',
    points:['Electronic batch records','Weigh and dispense with spec checks','Forward and backward lot trace'],
    img:img('photo-1651525670054-279c154bc3b6'), alt:'Food processing facility' },
  { name:'Medical & Regulated', rule:'21 CFR Part 11 · device history records',
    pain:'The product can be perfect and still fail the audit, because the record was rebuilt afterwards.',
    start:'Device history on one product', live:'Enforced data entry and e-signatures at each step, so the history record is complete when the unit is.',
    points:['E-signatures at critical steps','Full audit trail on every change','Controlled, role-based data entry'],
    img:img('photo-1599652749620-e45b7f38988e'), alt:'Automated laboratory equipment' },
]

const steps = [
  ['1','Pick your industry','We bring the screens, rules and records that industry expects, so we are not starting from a blank page.'],
  ['2','Pick one process','A dock, a line, a cell or a product family. Small enough to go live fast, real enough to prove the point.'],
  ['3','Grow on the same platform','The second process reuses the data, the integrations and the training from the first.'],
]

const faqs = [
  ['We are in an industry you did not list. Can you still help?', 'Very likely. The five here are where the patterns repeat most. If you make or move physical product and have an ERP, the same building blocks apply, and a 30-minute fit conversation will tell us both quickly.'],
  ['Do you understand our compliance requirements?', 'We build audit trails, e-signatures, enforced data entry and traceability into the process itself, and our QA team hands over documented test evidence. You stay the owner of your quality system; we give it the records it needs.'],
  ['We have several plants. Do we roll out everywhere at once?', 'No. Start with one process at one site. Once it is proven, the same design rolls to the next line or plant without being rebuilt.'],
]

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        line1="Your industry has its rules."
        line2="We start with one process."
        sub="Automotive traceability, 3PL accuracy and regulated records are different problems. The way to solve each one is the same: start where it hurts, go live, then grow."
        secondary="See solutions by problem"
        onSecondary={()=>goPage('/solutions')}
      />

      <Section pad="3.5rem" max={1300}>
        <SectionHead eyebrow="Find your industry" title={<>What keeps you up,<br/>and where we would start.</>} mb="3rem"/>
        <div style={{display:'flex',flexDirection:'column',gap:'2rem'}}>
          {industries.map(({name,rule,pain,start,live,points,img,alt},i)=>{
            const color = i % 2 === 0 ? RED : INK
            const flip = i % 2 === 1
            return (
              <div key={name} data-reveal="true" className="ind-row" style={{display:'grid',gridTemplateColumns:flip?'1.15fr 1fr':'1fr 1.15fr',background:'#fff',border:'1px solid #e6e8ee',borderRadius:24,overflow:'hidden',boxShadow:'0 4px 28px rgba(10,10,10,.07)'}}>
                <div style={{order:flip?2:1,position:'relative',minHeight:340,background:'#201d2e'}}>
                  <img src={img} alt={alt} loading="lazy" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
                  <div style={{position:'absolute',left:18,bottom:18,background:'rgba(255,255,255,.95)',borderRadius:12,padding:'.55rem .9rem',fontFamily:MONO,fontSize:10.5,letterSpacing:'.08em',textTransform:'uppercase',color:INK,fontWeight:500,maxWidth:'calc(100% - 36px)'}}>{rule}</div>
                </div>
                <div style={{order:flip?1:2,padding:'clamp(1.6rem,3vw,2.6rem)',display:'flex',flexDirection:'column',gap:'1.1rem',borderTop:`4px solid ${color}`}}>
                  <h3 style={{fontSize:'clamp(1.6rem,2.4vw,2.1rem)',fontWeight:900,letterSpacing:'-.035em',lineHeight:1.08,color:'#0a0a0a'}}>{name}</h3>
                  <p style={{fontSize:'1.06rem',color:'#3d4356',lineHeight:1.7}}>{pain}</p>
                  <div style={{background:`${color}0c`,border:`1px solid ${color}26`,borderRadius:14,padding:'1.1rem 1.2rem'}}>
                    <div style={{fontFamily:MONO,fontSize:10.5,letterSpacing:'.16em',textTransform:'uppercase',color,marginBottom:'.4rem'}}>Start here</div>
                    <div style={{fontSize:'1.12rem',fontWeight:900,letterSpacing:'-.02em',color:'#0a0a0a',marginBottom:'.3rem'}}>{start}</div>
                    <p style={{fontSize:'.95rem',color:'#3d4356',lineHeight:1.6}}>{live}</p>
                  </div>
                  <div style={{display:'flex',flexDirection:'column',gap:'.5rem'}}>
                    {points.map(p=>(
                      <div key={p} style={{display:'flex',alignItems:'flex-start',gap:'.55rem',fontSize:'.95rem',fontWeight:600,color:INK}}><Tick color={color}/>{p}</div>
                    ))}
                  </div>
                  <div>
                    <button onClick={()=>goSection('contact')} style={{fontSize:15,fontWeight:800,color,borderBottom:`2px solid ${color}`,paddingBottom:2}}>Talk through a {name.toLowerCase()} pilot →</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Section>

      <Section pad="3.5rem">
        <SectionHead eyebrow="How to start" title="Pick your industry. Then one process." mb="2.6rem"/>
        <div className="grid-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1.4rem'}}>
          {steps.map(([n,h,p],i)=>{
            const color = i % 2 === 0 ? RED : INK
            return (
              <div key={n} data-reveal="true" style={{background:'#fff',border:'1px solid #e6e8ee',borderTop:`4px solid ${color}`,borderRadius:20,padding:'2rem 1.8rem',boxShadow:'0 2px 20px rgba(10,10,10,.06)'}}>
                <div style={{fontSize:'3.2rem',fontWeight:900,letterSpacing:'-.05em',lineHeight:1,color:`${color}26`}}>0{n}</div>
                <h3 style={{fontSize:'1.3rem',fontWeight:900,letterSpacing:'-.03em',color:'#0a0a0a',margin:'.6rem 0 .6rem'}}>{h}</h3>
                <p style={{fontSize:'1rem',color:'#3d4356',lineHeight:1.7}}>{p}</p>
              </div>
            )
          })}
        </div>
      </Section>

      <OneProcess/>

      <Section pad="4rem">
        <SectionHead eyebrow="Questions we hear" title="Before you ask." mb="2.2rem"/>
        <Faq items={faqs}/>
      </Section>
    </>
  )
}
