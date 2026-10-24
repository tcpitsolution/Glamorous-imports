import { useEffect, useState, useRef, useMemo } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ── Floating Diamond Gem ── */
function Gem() {
  const outer = useRef()
  const inner = useRef()
  const glow  = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (outer.current) {
      outer.current.rotation.y = t * 0.35
      outer.current.rotation.x = 0.3 + Math.sin(t * 0.5) * 0.12
      outer.current.position.y = Math.sin(t * 0.8) * 0.12
    }
    if (inner.current) {
      inner.current.rotation.y = -t * 0.6
      inner.current.rotation.z = t * 0.25
    }
    if (glow.current) {
      glow.current.material.opacity = 0.08 + Math.sin(t * 1.2) * 0.05
    }
  })

  return (
    <group>
      {/* outer glow */}
      <mesh ref={glow}>
        <octahedronGeometry args={[1.35, 0]} />
        <meshBasicMaterial color="#b69a72" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>

      {/* main gem */}
      <mesh ref={outer}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#1a1610"
          emissive="#b69a72"
          emissiveIntensity={0.55}
          metalness={1}
          roughness={0.05}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* inner wireframe */}
      <mesh ref={inner}>
        <octahedronGeometry args={[0.58, 1]} />
        <meshBasicMaterial color="#d4b991" wireframe transparent opacity={0.6} />
      </mesh>

      {/* center core */}
      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial emissive="#d4b991" emissiveIntensity={4} color="#000" />
      </mesh>

      <pointLight color="#d4b991" intensity={3} distance={4} position={[0, 1, 1]} />
      <pointLight color="#b69a72" intensity={1.5} distance={5} position={[-2, -1, 0]} />
    </group>
  )
}

/* ── Orbit Rings ── */
function Rings() {
  const refs = [useRef(), useRef(), useRef(), useRef()]
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const speeds = [0.28, -0.2, 0.15, -0.32]
    const tilts  = [[0.4, 0, 0], [0, 0.3, 1.1], [1.2, 0.2, 0], [0.6, 1.0, 0.4]]
    refs.forEach((r, i) => {
      if (!r.current) return
      r.current.rotation.x = tilts[i][0] + t * speeds[i] * 0.3
      r.current.rotation.y = tilts[i][1] + t * speeds[i]
      r.current.rotation.z = tilts[i][2]
    })
  })
  const config = [
    { r: 1.45, tube: 0.009, color: '#b69a72', op: 0.55 },
    { r: 1.7,  tube: 0.006, color: '#d4b991', op: 0.35 },
    { r: 1.25, tube: 0.007, color: '#c8a87a', op: 0.45 },
    { r: 1.9,  tube: 0.004, color: '#b69a72', op: 0.22 },
  ]
  return (
    <>
      {config.map((c, i) => (
        <mesh key={i} ref={refs[i]}>
          <torusGeometry args={[c.r, c.tube, 8, 120]} />
          <meshBasicMaterial color={c.color} transparent opacity={c.op} />
        </mesh>
      ))}
    </>
  )
}

/* ── Particle Field ── */
function Particles() {
  const mesh = useRef()
  const count = 120
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 1.8 + Math.random() * 1.4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.getElapsedTime() * 0.06
      mesh.current.rotation.x = clock.getElapsedTime() * 0.03
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#d4b991" size={0.022} transparent opacity={0.65} sizeAttenuation />
    </points>
  )
}

/* ── Scan Line ── */
function ScanLine() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime()
      ref.current.position.y = -2.2 + ((t * 0.7) % 4.4)
      ref.current.material.opacity = 0.25 + Math.sin(t * 4) * 0.1
    }
  })
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[6, 0.012]} />
      <meshBasicMaterial color="#b69a72" transparent opacity={0.3} />
    </mesh>
  )
}

/* ── Grid Floor ── */
function GridFloor() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) ref.current.material.opacity = 0.07 + Math.sin(clock.getElapsedTime() * 0.5) * 0.02
  })
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]}>
      <planeGeometry args={[14, 14, 18, 18]} />
      <meshBasicMaterial color="#b69a72" wireframe transparent opacity={0.07} />
    </mesh>
  )
}

/* ── Main Intro ── */
export default function IntroAnimation({ onFinish }) {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0) // 0=loading, 1=reveal, 2=exit
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) { setVisible(false); onFinish(); return }

    // progress bar
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        return p + (p < 70 ? 2.2 : p < 90 ? 1.1 : 0.6)
      })
    }, 40)

    // phase 1 — show brand text
    const t1 = setTimeout(() => setPhase(1), 600)
    // phase 2 — exit
    const t2 = setTimeout(() => { setPhase(2); setVisible(false); onFinish() }, 3800)

    return () => { clearInterval(interval); clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="intro-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Skip */}
          <button className="intro-skip" onClick={() => { setVisible(false); onFinish() }}>
            Skip ↗
          </button>

          {/* 3D Canvas — full screen */}
          <div className="intro-canvas-wrap">
            <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }} dpr={[1, 1.5]}>
              <ambientLight intensity={0.08} />
              <Gem />
              <Rings />
              <Particles />
              <ScanLine />
              <GridFloor />
            </Canvas>
          </div>

          {/* Vignette overlay */}
          <div className="intro-vignette" />

          {/* Brand content */}
          <div className="intro-content">
            <motion.p
              className="intro-eyebrow"
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={phase >= 1 ? { opacity: 1, letterSpacing: '0.22em' } : {}}
              transition={{ duration: 1.1 }}
            >
              GEORGETOWN · GUYANA
            </motion.p>

            <motion.h1
              className="intro-brand"
              initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
              animate={phase >= 1 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ delay: 0.2, duration: 1, ease: [0.2, 0.8, 0.3, 1] }}
            >
              Glamorous <i>Imports</i>
            </motion.h1>

            <motion.div
              className="intro-divider"
              initial={{ scaleX: 0 }}
              animate={phase >= 1 ? { scaleX: 1 } : {}}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.2, 0.8, 0.3, 1] }}
            />

            <motion.p
              className="intro-tagline"
              initial={{ opacity: 0, y: 10 }}
              animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.9 }}
            >
              Creating Beautiful Spaces. <em>Inspiring Living.</em>
            </motion.p>
          </div>

          {/* Progress bar */}
          <div className="intro-progress-wrap">
            <div className="intro-progress-bar" style={{ width: `${progress}%` }} />
          </div>

          {/* Corner labels */}
          <span className="intro-corner intro-corner-tl">INTERIOR DECORATION</span>
          <span className="intro-corner intro-corner-br">EST. GEORGETOWN</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
