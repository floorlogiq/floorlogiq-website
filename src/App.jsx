import { useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import IntegrationHub from './components/IntegrationHub'
import HowItWorks from './components/HowItWorks'
import Industries from './components/Industries'
import Platform from './components/Platform'
import Services from './components/Services'
import Results from './components/Results'
import Leaders from './components/Leaders'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    // Nav scroll shadow + progress bar
    const nav = document.getElementById('flq-nav')
    const prog = document.getElementById('flq-progress')
    const onScroll = () => {
      const h = document.documentElement
      if (nav) nav.style.boxShadow = h.scrollTop > 8 ? '0 6px 24px rgba(10,10,10,.09)' : 'none'
      if (prog) prog.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight || 1) * 100) + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Scroll reveal IntersectionObserver
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1'
          e.target.style.transform = 'none'
          revealObs.unobserve(e.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })

    const observe = () => {
      document.querySelectorAll('[data-reveal]').forEach(el => {
        if (!el.dataset.revealInit) {
          el.dataset.revealInit = '1'
          el.style.opacity = '0'
          el.style.transform = 'translateY(26px)'
          el.style.transition = 'opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)'
          revealObs.observe(el)
        }
      })
    }
    // small delay so DOM is fully painted
    const t = setTimeout(observe, 100)

    return () => {
      window.removeEventListener('scroll', onScroll)
      revealObs.disconnect()
      clearTimeout(t)
    }
  }, [])

  return (
    <div style={{position:'relative'}}>
      <div aria-hidden="true" style={{position:'absolute',inset:0,zIndex:-1,pointerEvents:'none',background:'radial-gradient(46% 22% at 50% 1%,rgba(204,31,31,.08),transparent 72%),radial-gradient(38% 18% at 86% 12%,rgba(91,48,223,.06),transparent 72%),radial-gradient(40% 16% at 8% 26%,rgba(3,202,175,.055),transparent 72%),radial-gradient(44% 15% at 92% 42%,rgba(204,31,31,.05),transparent 72%),radial-gradient(42% 15% at 6% 58%,rgba(91,48,223,.05),transparent 72%),radial-gradient(46% 15% at 70% 73%,rgba(3,202,175,.05),transparent 72%),radial-gradient(40% 15% at 18% 90%,rgba(204,31,31,.045),transparent 72%)'}}></div>
      <div id="flq-progress" style={{position:'fixed',top:0,left:0,height:3,width:0,background:'var(--red)',zIndex:300}}></div>
      <Nav/>
      <Hero/>
      <IntegrationHub/>
      <HowItWorks/>
      <Industries/>
      <Platform/>
      <Services/>
      <Results/>
      <Leaders/>
      <Contact/>
      <Footer/>
    </div>
  )
}
