import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
export default function ServiceCard({service,index=0}){const Icon=service.icon;return <motion.article className="service-card" initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{delay:index*.07,duration:.5}}><span className="service-number">0{index+1}</span><div className="service-icon"><Icon size={23} strokeWidth={1.35}/></div><h3>{service.title}</h3><p>{service.description}</p><Link to="/contact" aria-label={`Ask about ${service.title}`}>Explore <ArrowUpRight size={16}/></Link></motion.article>}
