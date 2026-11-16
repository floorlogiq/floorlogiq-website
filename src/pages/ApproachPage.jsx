import { RED, INK, Icon, Tick, Section, SectionHead, PageHero, MedCard, Faq, goPage } from './ui'

const MONO = "'DM Mono',monospace"

const split = [
  { who:'Fuuz', tag:'The platform', color:INK, icon:'layers',
    line:'The industrial operations platform everything runs on.',
    points:['One live data model for the whole floor','Connectors for ERP, EDI, machines and devices','Screen, workflow and document builders','Roles, audit trail and version control'] },
  { who:'FloorLogiQ', tag:'Your delivery team', color:RED, icon:'users',
    line:'The people who make it fit your floor and stand behind it.',
    points:['Walk your process and scope the first pilot','Configure screens, rules and integrations','Test every flow with a dedicated QA team','Train operators and support you after go-live'] },
]

const phases = [
  { when:'Week 0', h:'Fit conversation', p:'Thirty minutes on your operation, your ERP and the process that hurts most. You leave with an honest view of whether we are the right fit.',
    out:['Agreed first process','Rough scope and timeline'] },
  { when:'Week 1–3', h:'Connect', p:'We wire the platform to your ERP and the devices on the floor, so real orders, items and inventory flow both ways.',
    out:['ERP two-way sync running','Scanners, printers and scales connected'] },
  { when:'Week 3–6', h:'First process live', p:'Operators run the pilot on real shifts. Supervisors see live status and the numbers behind it.',
    out:['Operator screens in use','Live dashboards traced to the scan'] },
  { when:'Month 2–3', h:'Standardize', p:'Guided steps and enforced data entry lock in the way the best shift already works.',
    out:['QA-validated workflows','Trained operators and supervisors'] },
  { when:'Month 3+', h:'Scale', p:'The next line, warehouse or plant reuses the same design. Your team learns to extend it.',
    out:['Rollout plan for the next area','Knowledge transfer to your team'] },
]

const qa = [
  ['clipboard','Functional','Every screen and workflow tested against your SOPs.'],
  ['link','Integration','ERP, EDI and device flows checked end to end on every change.'],
  ['pulse','Performance','Peak-shift load proven before an operator depends on it.'],
  ['shield','Validation','Documented evidence and sign-off, handed over audit-ready.'],
]

const asks = [
  { icon:'chat', title:'A process owner', text:'One person who knows how the work is really done and can make decisions about it.' },
  { icon:'key', title:'Access to your ERP', text:'A sandbox or test company, so we can prove the integration before it touches live data.' },
  { icon:'clock', title:'A few hours on the floor', text:'Time with the operators who will use it. Their feedback shapes the screens.' },
]

const faqs = [
  ['Why not buy the platform and build it ourselves?', 'You can, and some teams do. We are for the teams that want it live sooner, tested properly, and built by people who have done it before. Your team can take over as much as it wants afterwards.'],
  ['How long before something is live?', 'A first process is typically live within weeks: connection in weeks one to three, operators using it in weeks three to six. The exact plan comes out of the fit conversation.'],
  ['What if we do not have a QA team?', 'We become yours. Our QA team owns testing from the first screen through go-live and hands you the evidence.'],
  ['Who owns the system after go-live?', 'You do. It is your tenant, your data and your configuration. We stay on for support, and we train your team to extend it.'],
]

export default function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="How we deliver"
        line1="Fuuz builds the platform."
        line2="We get your floor live on it."
        sub="Software does not fix a floor on its own. Someone has to walk the process, connect the systems, test every step and stand beside the operators on day one."
        secondary="See solutions by problem"
        onSecondary={()=>goPage('/solutions')}
      />

      <Section pad="3.5rem" max={1180}>
        <SectionHead eyebrow="Who does what" title={<>One platform. One delivery team.<br/>No gap between them.</>} mb="2.8rem"/>
        <div className="grid-2col" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.6rem'}}>
          {split.map(({who,tag,color,icon,line,points})=>(
            <div key={who} data-reveal="true" style={{background:'#fff',border:'1px solid #e6e8ee',borderTop:`5px solid ${color}`,borderRadius:22,padding:'2.2rem 2rem',boxShadow:'0 4px 28px rgba(10,10,10,.07)'}}>
              <div style={{display:'flex',alignItems:'center',gap:'1rem',marginBottom:'1.2rem'}}>
                <div style={{width:62,height:62,borderRadius:19,background:`${color}0f`,border:`2px solid ${color}2e`,color,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><Icon name={icon} size={30}/></div>
                <div>
                  <div style={{fontFamily:MONO,fontSize:10.5,letterSpacing:'.18em',textTransform:'uppercase',color}}>{tag}</div>
                  <h3 style={{fontSize:'1.7rem',fontWeight:900,letterSpacing:'-.035em',color:'#0a0a0a',lineHeight:1.1}}>{who}</h3>
                </div>
              </div>
              <p style={{fontSize:'1.05rem',color:'#3d4356',lineHeight:1.65,marginBottom:'1.2rem'}}>{line}</p>
              <div style={{display:'flex',flexDirection:'column',gap:'.65rem'}}>
                {points.map(p=>(
                  <div key={p} style={{display:'flex',alignItems:'flex-start',gap:'.55rem',fontSize:'1rem',fontWeight:600,color:INK}}><Tick color={color}/>{p}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section pad="3.5rem" max={1080}>
        <SectionHead eyebrow="Your first 90 days" title="What happens, and what you get." sub="No black box. Each stage ends with something you can see working." mb="3rem"/>
        <div style={{position:'relative'}}>
          <div aria-hidden="true" className="tl-rail" style={{position:'absolute',left:27,top:10,bottom:10,width:3,borderRadius:3,background:'linear-gradient(180deg,var(--red),rgba(204,31,31,.12))'}}></div>
          <div style={{display:'flex',flexDirection:'column',gap:'1.3rem'}}>
            {phases.map(({when,h,p,out},i)=>{
              const color = i % 2 === 0 ? RED : INK
              return (
                <div key={h} data-reveal="true" style={{display:'grid',gridTemplateColumns:'58px 1fr',gap:'1.2rem',alignItems:'start'}}>
                  <div style={{position:'relative',zIndex:1,width:58,height:58,borderRadius:'50%',background:'#fff',border:`3px solid ${color}`,color,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:'1.2rem',boxShadow:`0 6px 20px ${color}33`}}>{i+1}</div>
                  <div className="tl-card" style={{background:'#fff',border:'1px solid #e6e8ee',borderRadius:18,padding:'1.5rem 1.7rem',boxShadow:'0 2px 20px rgba(10,10,10,.06)',display:'grid',gridTemplateColumns:'1.4fr 1fr',gap:'1.6rem'}}>
                    <div>
                      <span style={{display:'inline-block',fontFamily:MONO,fontSize:10.5,letterSpacing:'.12em',textTransform:'uppercase',color,background:`${color}0f`,border:`1px solid ${color}2e`,borderRadius:50,padding:'.28rem .8rem',fontWeight:700}}>{when}</span>
                      <h3 style={{fontSize:'1.35rem',fontWeight:900,letterSpacing:'-.03em',color:'#0a0a0a',margin:'.65rem 0 .45rem'}}>{h}</h3>
                      <p style={{fontSize:'1rem',color:'#3d4356',lineHeight:1.68}}>{p}</p>
                    </div>
                    <div style={{background:'#f8f9fb',borderRadius:14,padding:'1.1rem 1.2rem',alignSelf:'start'}}>
                      <div style={{fontFamily:MONO,fontSize:10,letterSpacing:'.16em',textTransform:'uppercase',color:'#6b7280',marginBottom:'.6rem'}}>You get</div>
                      <div style={{display:'flex',flexDirection:'column',gap:'.5rem'}}>
                        {out.map(o=><div key={o} style={{display:'flex',alignItems:'flex-start',gap:'.5rem',fontSize:'.95rem',fontWeight:650,color:INK}}><Tick color={color}/>{o}</div>)}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Section>

      <Section pad="3.5rem">
        <SectionHead eyebrow="QA as a service" title={<>Nothing reaches your floor<br/>until our QA team signs it off.</>} sub="Most implementations test at the end, in a hurry. Ours has a QA team working alongside the build from the first screen."/>
        <div className="grid-4col" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'2.8rem 1.6rem',marginTop:'4.4rem'}}>
          {qa.map(([icon,title,text],i)=>(
            <MedCard key={title} color={i%2===0?RED:INK} icon={<Icon name={icon} size={30}/>} badge={i+1} title={title} text={text}/>
          ))}
        </div>
      </Section>

      <Section pad="3.5rem" max={1180}>
        <SectionHead eyebrow="What we need from you" title="Three things. That is the whole list." sub="We would rather tell you now than surprise you in week two."/>
        <div className="grid-3col" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'2.8rem 1.6rem',marginTop:'4.4rem'}}>
          {asks.map(({icon,title,text},i)=>(
            <MedCard key={title} color={i%2===0?INK:RED} icon={<Icon name={icon} size={30}/>} title={title} text={text}/>
          ))}
        </div>
      </Section>

      <Section pad="4rem">
        <SectionHead eyebrow="Questions we hear" title="Before you ask." mb="2.2rem"/>
        <Faq items={faqs}/>
      </Section>
    </>
  )
}
