import { MessageCircle } from 'lucide-react'
import { whatsappUrl } from '../config/business'
export default function WhatsAppButton(){return <a className="whatsapp-float" href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="Contact Glamorous Imports on WhatsApp"><MessageCircle size={23}/><span>Let's talk</span></a>}
