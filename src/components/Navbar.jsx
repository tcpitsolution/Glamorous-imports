import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { whatsappUrl } from '../config/business'
const links=[['Home','/'],['About','/about'],['Services','/services'],['Portfolio','/portfolio'],['FAQ','/#faq'],['Contact','/contact']]
export default function Navbar(){
 const [scrolled,setScrolled]=useState(false),[open,setOpen]=useState(false); const loc=useLocation()
 useEffect(()=>{const f=()=>setScrolled(window.scrollY>40);window.addEventListener('scroll',f,{passive:true});return()=>window.removeEventListener('scroll',f)},[])
 useEffect(()=>setOpen(false),[loc.pathname])
 return <header className={`navbar ${scrolled||loc.pathname!=='/'?'navbar-solid':''}`}>
  <Link to="/" className="wordmark"><span className="monogram">GI</span><span>GLAMOROUS <b>IMPORTS</b><small>FOR MODERN HOME DECORATION</small></span></Link>
  <nav className="desktop-nav">{links.map(([t,u])=><NavLink key={t} to={u} className={({isActive})=>isActive&&u!=='/#faq'?'nav-active':''}>{t}</NavLink>)}</nav>
  <Link className="nav-cta" to="/appointment">Book Consultation <ArrowUpRight size={15}/></Link>
  <button className="menu-toggle" onClick={()=>setOpen(!open)} aria-label={open?'Close menu':'Open menu'}>{open?<X/>:<Menu/>}</button>
  <AnimatePresence>{open&&<motion.nav className="mobile-nav" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}>{links.map(([t,u])=><Link key={t} to={u}>{t}<span>↗</span></Link>)}<Link className="mobile-cta" to="/appointment">Book a Consultation</Link><a href={whatsappUrl()} target="_blank" rel="noreferrer">Chat on WhatsApp ↗</a></motion.nav>}</AnimatePresence>
 </header>
}
