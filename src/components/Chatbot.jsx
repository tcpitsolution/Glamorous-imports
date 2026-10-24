import { useState, useEffect, useRef, useMemo } from 'react'
import { X, Send, RotateCcw } from 'lucide-react'
import { Canvas, useFrame } from '@react-three/fiber'
import { business, whatsappUrl } from '../config/business'
import * as THREE from 'three'

const greeting = "Hello! I'm here ✨ Welcome to Glamorous Imports. Looking for inspiration for your home? I can help you explore decoration ideas, learn about the business, or get in touch."

function answer(s) {
  const t = s.toLowerCase()
  if (/living|sofa|lounge/.test(t)) return 'For a welcoming living room, try a calm base palette, layered lighting, tactile fabrics, and a few meaningful decorative accents. Contact the business to discuss your space.'
  if (/bed|sleep/.test(t)) return 'For a restful bedroom, consider soft neutrals, layered bedding, warm bedside lighting, and uncluttered surfaces. Contact Glamorous Imports to discuss your requirements.'
  if (/appointment|book|consult/.test(t)) return 'You can prepare an appointment request on our demo website. Please contact the business directly to confirm availability.'
  if (/contact|whatsapp|phone|number/.test(t)) return `You can reach Glamorous Imports by phone or WhatsApp at ${business.phone}.`
  if (/where|address|location/.test(t)) return `The listed address is ${business.address}. Please verify directions before travelling.`
  if (/price|cost|budget|stock|available/.test(t)) return "I don't have verified pricing or inventory information. Please contact Glamorous Imports directly for current details."
  return 'A beautiful interior often begins with a clear mood, a considered color palette, and a balance of light, texture, and personal details. What space are you thinking about?'
}

/* ── Orbiting Particles ── */
function Particles({ count = 60, radius = 1.1 }) {
  const mesh = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = radius * Math.cos(phi)
    }
    return arr
  }, [count, radius])

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.getElapsedTime() * 0.18
      mesh.current.rotation.x = clock.getElapsedTime() * 0.07
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#d4b991" size={0.025} transparent opacity={0.75} sizeAttenuation />
    </points>
  )
}

/* ── Scan Ring ── */
function ScanRing() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime()
      ref.current.position.y = -0.9 + ((t * 0.5) % 1.8)
      ref.current.material.opacity = 0.35 + Math.sin(t * 3) * 0.15
    }
  })
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.62, 0.006, 8, 80]} />
      <meshBasicMaterial color="#b69a72" transparent opacity={0.4} />
    </mesh>
  )
}

/* ── Orbit Rings ── */
function OrbitRings() {
  const r1 = useRef(), r2 = useRef(), r3 = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (r1.current) { r1.current.rotation.z = t * 0.4; r1.current.rotation.x = 0.3 }
    if (r2.current) { r2.current.rotation.z = -t * 0.3; r2.current.rotation.y = t * 0.2; r2.current.rotation.x = 1.1 }
    if (r3.current) { r3.current.rotation.y = t * 0.5; r3.current.rotation.x = 0.7 }
  })
  return (
    <>
      <mesh ref={r1}>
        <torusGeometry args={[0.95, 0.008, 8, 100]} />
        <meshBasicMaterial color="#b69a72" transparent opacity={0.5} />
      </mesh>
      <mesh ref={r2}>
        <torusGeometry args={[1.05, 0.005, 8, 100]} />
        <meshBasicMaterial color="#d4b991" transparent opacity={0.3} />
      </mesh>
      <mesh ref={r3}>
        <torusGeometry args={[0.82, 0.006, 8, 100]} />
        <meshBasicMaterial color="#c8a87a" transparent opacity={0.4} />
      </mesh>
    </>
  )
}

/* ── Avatar Head ── */
function AvatarHead({ talking }) {
  const headRef = useRef()
  const innerRef = useRef()
  const glowRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (headRef.current) {
      // breathing float
      headRef.current.position.y = Math.sin(t * 1.2) * 0.06
      headRef.current.rotation.y = Math.sin(t * 0.4) * 0.18
      headRef.current.rotation.x = Math.sin(t * 0.3) * 0.06
      // talking pulse
      const scale = talking ? 1 + Math.sin(t * 12) * 0.04 : 1
      headRef.current.scale.setScalar(scale)
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = t * 0.6
      innerRef.current.rotation.x = Math.sin(t * 0.5) * 0.2
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.12 + Math.sin(t * 1.5) * 0.06
    }
  })

  return (
    <group ref={headRef}>
      {/* outer glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.72, 32, 32]} />
        <meshBasicMaterial color="#b69a72" transparent opacity={0.12} side={THREE.BackSide} />
      </mesh>

      {/* main head — smooth sphere */}
      <mesh>
        <sphereGeometry args={[0.58, 64, 64]} />
        <meshStandardMaterial
          color="#1a1610"
          emissive="#b69a72"
          emissiveIntensity={0.18}
          metalness={0.9}
          roughness={0.15}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* inner wireframe core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.38, 2]} />
        <meshBasicMaterial color="#d4b991" wireframe transparent opacity={0.55} />
      </mesh>

      {/* face glow — eye-like emissive spots */}
      <mesh position={[-0.16, 0.1, 0.5]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshStandardMaterial emissive="#d4b991" emissiveIntensity={3} color="#000" />
      </mesh>
      <mesh position={[0.16, 0.1, 0.5]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshStandardMaterial emissive="#d4b991" emissiveIntensity={3} color="#000" />
      </mesh>

      {/* mouth line */}
      <mesh position={[0, -0.1, 0.54]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.1, 0.012, 8, 30, Math.PI]} />
        <meshStandardMaterial emissive="#b69a72" emissiveIntensity={2} color="#000" />
      </mesh>

      {/* lights */}
      <pointLight color="#d4b991" intensity={2.5} distance={2.5} position={[0, 0.3, 1]} />
      <pointLight color="#b69a72" intensity={1.2} distance={3} position={[-1, -0.5, 0]} />
    </group>
  )
}

/* ── Full Avatar Scene ── */
function AvatarScene({ talking = false, mini = false }) {
  return (
    <>
      <ambientLight intensity={0.1} />
      <AvatarHead talking={talking} />
      <OrbitRings />
      <Particles count={mini ? 35 : 70} radius={mini ? 1.0 : 1.15} />
      <ScanRing />
    </>
  )
}

/* ── Chatbot ── */
export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [messages, setMessages] = useState([{ from: 'bot', text: greeting }])
  const [greeted, setGreeted] = useState(false)
  const [talking, setTalking] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (greeted) return
    const t = setTimeout(() => { setOpen(true); setGreeted(true) }, 2800)
    return () => clearTimeout(t)
  }, [greeted])

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const send = (s = text) => {
    if (!s.trim()) return
    const reply = answer(s)
    setMessages(m => [...m, { from: 'user', text: s }])
    setText('')
    setTalking(true)
    setTimeout(() => {
      setMessages(m => [...m, { from: 'bot', text: reply }])
      setTalking(false)
    }, 700)
  }

  return (
    <>
      {/* Launch Button */}
      <button
        className={`chat-launch ${open ? 'chat-launch-open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close assistant' : 'Open interior design assistant'}
      >
        {open
          ? <X size={20} />
          : (
            <span className="chat-launch-hologram">
              <Canvas camera={{ position: [0, 0, 2.6], fov: 42 }} style={{ width: 54, height: 54 }}>
                <AvatarScene mini />
              </Canvas>
              <span className="chat-launch-pulse" />
            </span>
          )
        }
      </button>

      {/* Chat Panel */}
      {open && (
        <section className="chat-panel chat-panel-anim">
          <header className="chat-header">
            <div className="chat-avatar-3d">
              <Canvas camera={{ position: [0, 0, 2.6], fov: 42 }}>
                <AvatarScene talking={talking} />
              </Canvas>
              {talking && <span className="chat-avatar-talking-ring" />}
            </div>
            <div className="chat-header-info">
              <b>Glamorous Imports</b>
              <small>
                <span className={`chat-status-dot ${talking ? 'talking' : 'online'}`} />
                {talking ? 'Typing…' : 'Interior Design Assistant'}
              </small>
            </div>
            <button onClick={() => setMessages([{ from: 'bot', text: greeting }])} aria-label="Clear conversation"><RotateCcw size={15} /></button>
            <button onClick={() => setOpen(false)} aria-label="Close chat"><X size={17} /></button>
          </header>

          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.from} ${m.from === 'bot' ? 'chat-bubble-anim' : ''}`}>
                {m.text}
              </div>
            ))}
            {talking && (
              <div className="chat-bubble bot chat-bubble-anim">
                <span className="chat-typing"><span /><span /><span /></span>
              </div>
            )}
            {messages.length === 1 && !talking && (
              <div className="chat-quick">
                {['Living room inspiration', 'Bedroom inspiration', 'Book a consultation', 'Contact on WhatsApp'].map(s => (
                  <button key={s} onClick={() =>
                    s.includes('WhatsApp') ? window.open(whatsappUrl(), '_blank', 'noopener,noreferrer')
                      : s.includes('Book') ? location.assign('/appointment')
                        : send(s)
                  }>{s} ↗</button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input" onSubmit={e => { e.preventDefault(); send() }}>
            <input value={text} onChange={e => setText(e.target.value)} placeholder="Ask about your space…" aria-label="Chat message" />
            <button aria-label="Send message"><Send size={17} /></button>
          </form>
        </section>
      )}
    </>
  )
}
