import Services from '../components/Services'
import { RED, INK, Icon, Tick, Cross, Section, SectionHead, PageHero, Faq, OneProcess, goPage } from './ui'

const MONO = "'DM Mono',monospace"

const groups = [
  { abbr:'WMS', name:'Warehouse & logistics', icon:'box', color:INK,
    line:'Every move scanned, confirmed and posted to the ERP while the pallet is still on the forks.',
    items:[
      ['Our inventory never matches the ERP.', 'Scan-confirmed moves', 'Every receipt, putaway, pick and transfer is confirmed at the rack and posted in seconds.'],
      ['Receiving is our bottleneck.', 'Receiving & directed putaway', 'Scan the PO, print the label, and the handheld tells the operator where it goes.'],
      ['Pickers walk miles and still mis-pick.', 'Wave & batch picking', 'One trip fills many orders, and each item is verified against the order before it is packed.'],
      ['Cycle counts shut the warehouse down.', 'Rolling cycle counts', 'Count by zone while the floor keeps moving; variances go to a supervisor before they post.'],
    ] },
  { abbr:'MES', name:'Production & execution', icon:'factory', color:RED,
    line:'Work orders run on a screen, not a traveler, and every unit leaves a record behind it.',
    items:[
      ['We still run on paper travelers.', 'Work order execution', 'Operators follow guided steps on a tablet; each step is timed, confirmed and recorded.'],
      ['Nobody trusts our OEE number.', 'Live OEE & downtime', 'Machine states and operator reasons feed one number that traces back to the event behind it.'],
      ['A recall would take us days.', 'Lot & serial genealogy', 'One lookup from a finished unit back to every component lot, or forward to every shipment.'],
      ['Labor hours are a guess.', 'Labor tracking', 'Operators clock onto the work order, so hours land on the job that used them.'],
    ] },
  { abbr:'QMS', name:'Quality & compliance', icon:'shield', color:INK,
    line:'Checks happen inside the work, and the record is finished when the job is.',
    items:[
      ['Quality checks live on clipboards.', 'Inline inspections', 'The line cannot move to the next step until the check is entered and within spec.'],
      ['Audit prep eats a whole week.', 'Audit trail & e-signatures', 'Who, what, when and why on every transaction, ready to query when the auditor asks.'],
      ['NCRs get lost in email.', 'NCR & CAPA workflows', 'A failed check opens the record, routes it to an owner and holds the material.'],
    ] },
  { abbr:'CMMS', name:'Maintenance', icon:'wrench', color:RED,
    line:'Downtime becomes a work order on its own, and the asset history writes itself.',
    items:[
      ['We fix machines when they break.', 'Preventive maintenance', 'Schedules run on calendar or usage, and the technician gets the job with the checklist.'],
      ['Downtime never becomes a work order.', 'Automatic downtime-to-WO', 'A stoppage on the line raises the request and sends it to maintenance.'],
      ['Spare parts are a mystery.', 'Asset & spares history', 'Every repair logs the parts used, so stock and asset records stay current.'],
    ] },
]

const options = [
  { h:'Packaged software', tag:'The big-box suite', bad:true, points:['You change your process to fit the product','Every exception is a change request','Long projects before the first screen is live'] },
  { h:'Custom build', tag:'Start from a blank page', bad:true, points:['Fits on day one, then someone has to maintain it','Depends on the people who wrote it','Integrations rebuilt for every system'] },
  { h:'Paper & spreadsheets', tag:'What most plants run today', bad:true, points:['Free to start, expensive every shift','The record trails the floor by hours','Nothing to show an auditor without a scramble'] },
  { h:'FloorLogiQ on Fuuz', tag:'Configured, governed, yours', bad:false, points:['Shaped to your process, on a platform that stays supported','Connects to the ERP and machines you already have','Tested by our QA team before it reaches your floor'] },
]

const faqs = [
  ['Do we have to replace our ERP?', 'No. FloorLogiQ sits beside the ERP you already run — NetSuite, SAP, Oracle, Epicor, Dynamics 365 and others — and posts transactions both ways. Your ERP stays the book of record; the floor stops being a black box.'],
  ['Can we start with only one of these?', 'Yes, and we recommend it. Most teams start with the one process that hurts most, such as receiving or a single production line, and add the next one on the same platform when the first is running.'],
  ['What happens when our process changes?', 'Screens, steps and rules are configured, not hard-coded. We change them with you, and your own technical team can be trained to extend them.'],
  ['Who tests all of this?', 'Our QA team does, before go-live: every screen, every workflow, every integration, with documented evidence handed to you at the end.'],
]

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        line1="Start with the problem."
        line2="Not the software."
        sub="Find the sentence your team says every week. That is where we start: one process, connected to the ERP you already run, and live on your floor in weeks."
        primary="Book a live demo →"
        secondary="See how we deliver"
        onSecondary={()=>goPage('/approach')}
      />

      <Section pad="3.5rem">
        <SectionHead eyebrow="Solutions by problem" title={<>If you have said it out loud,<br/>we have a fix for it.</>} sub="Fourteen everyday floor problems, grouped by where they live. Each one is a piece you can deploy on its own." mb="3.2rem"/>

        <div style={{display:'flex',flexDirection:'column',gap:'2.2rem'}}>
          {groups.map(({abbr,name,icon,color,line,items})=>(
            <div key={abbr} data-reveal="true" className="sol-group" style={{display:'grid',gridTemplateColumns:'300px 1fr',gap:'1.6rem',background:'#fff',border:'1px solid #e6e8ee',borderRadius:24,padding:'1.8rem',boxShadow:'0 2px 20px rgba(10,10,10,.06)'}}>
              <div style={{background:`linear-gradient(160deg,${color}10,${color}04)`,border:`1px solid ${color}22`,borderRadius:18,padding:'1.8rem 1.5rem',display:'flex',flexDirection:'column',gap:'.9rem'}}>
                <div style={{width:64,height:64,borderRadius:20,background:'#fff',border:`2px solid ${color}33`,color,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:`0 8px 24px ${color}26`}}><Icon name={icon} size={30}/></div>
                <div style={{fontFamily:MONO,fontSize:11,letterSpacing:'.2em',color,fontWeight:500}}>{abbr}</div>
                <h3 style={{fontSize:'1.5rem',fontWeight:900,letterSpacing:'-.035em',lineHeight:1.08,color:'#0a0a0a'}}>{name}</h3>
                <p style={{fontSize:'.97rem',color:'#3d4356',lineHeight:1.65}}>{line}</p>
              </div>
              <div className="sol-items" style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'1rem'}}>
                {items.map(([say,fix,how],i)=>(
                  <div key={say} className="flq-card-wrap" style={items.length%2===1 && i===items.length-1 ? {gridColumn:'1 / -1'} : undefined}>
                    <div className="flq-card" style={{'--card-glow':`${color}24`,height:'100%',background:'#fff',border:'1px solid #e6e8ee',borderLeft:`4px solid ${color}`,borderRadius:14,padding:'1.25rem 1.3rem'}}>
                      <div style={{fontSize:'1.06rem',fontWeight:800,letterSpacing:'-.02em',lineHeight:1.3,color:'#0a0a0a'}}>&ldquo;{say}&rdquo;</div>
                      <div style={{display:'flex',alignItems:'center',gap:'.45rem',margin:'.75rem 0 .35rem',fontFamily:MONO,fontSize:10.5,letterSpacing:'.14em',textTransform:'uppercase',color}}>
                        <span style={{fontSize:13}}>→</span>{fix}
                      </div>
                      <p style={{fontSize:'.93rem',color:'#3d4356',lineHeight:1.6}}>{how}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Services part="solutions"/>

      <Section pad="3.5rem">
        <SectionHead eyebrow="Your options" title={<>Three ways this usually goes.<br/>And the one we recommend.</>} sub="Most plants have tried at least one of the first three. Here is how they compare when the project is a year old."/>
        <div className="grid-4col" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1.2rem',alignItems:'stretch'}}>
          {options.map(({h,tag,bad,points})=>(
            <div key={h} data-reveal="true" style={{background:bad?'#f8f9fb':'#fff',border:bad?'1px solid #e6e8ee':'2px solid var(--red)',borderRadius:20,padding:'1.9rem 1.5rem',boxShadow:bad?'none':'0 22px 54px rgba(204,31,31,.18)',position:'relative'}}>
              {!bad && <span style={{position:'absolute',top:-13,left:'50%',transform:'translateX(-50%)',background:'var(--red)',color:'#fff',fontFamily:MONO,fontSize:10,letterSpacing:'.16em',textTransform:'uppercase',padding:'.3rem .8rem',borderRadius:50,whiteSpace:'nowrap'}}>Recommended</span>}
              <div style={{fontFamily:MONO,fontSize:10.5,letterSpacing:'.14em',textTransform:'uppercase',color:bad?'#6b7280':'var(--red)',marginBottom:'.5rem'}}>{tag}</div>
              <h3 style={{fontSize:'1.3rem',fontWeight:900,letterSpacing:'-.03em',color:bad?'#3d4356':'#0a0a0a',marginBottom:'1.1rem'}}>{h}</h3>
              <div style={{display:'flex',flexDirection:'column',gap:'.75rem'}}>
                {points.map(p=>(
                  <div key={p} style={{display:'flex',alignItems:'flex-start',gap:'.55rem',fontSize:'.94rem',lineHeight:1.5,fontWeight:bad?500:650,color:bad?'#4a5168':INK}}>
                    {bad ? <Cross/> : <Tick/>}{p}
                  </div>
                ))}
              </div>
            </div>
          ))}
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
