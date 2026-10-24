import { useState } from 'react'
import { Plus } from 'lucide-react'
import { AnimatePresence,motion } from 'framer-motion'
import { faqs } from '../data/faq'
export default function FAQ(){const [active,setActive]=useState(0);return <div className="faq-list">{faqs.map(([q,a],i)=><div className={`faq-item ${active===i?'faq-open':''}`} key={q}><button onClick={()=>setActive(active===i?-1:i)} aria-expanded={active===i}><span>{String(i+1).padStart(2,'0')}</span><b>{q}</b><Plus size={18}/></button><AnimatePresence>{active===i&&<motion.div className="faq-answer" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}><p>{a}</p></motion.div>}</AnimatePresence></div>)}</div>}
