import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
export default function NotFound(){return <section className="not-found"><span className="eyebrow">A LITTLE OFF THE MAP</span><div className="not-found-number">404</div><h1>This space is still <i>unwritten.</i></h1><p>We couldn't find the page you were looking for.</p><Link className="button button-dark" to="/">Return home <ArrowUpRight size={16}/></Link></section>}
