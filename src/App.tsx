
import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import type { Mesh } from 'three'

function Piramide() {
  const piramide = useRef<Mesh>(null)
  const [color, setColor] = useState('tomato')
  const [encima, setEncima] = useState(false)

  useFrame((_state, delta) => {
    if (piramide.current) {
      piramide.current.rotation.y += delta * 0.8
    }
  })

  return (
    <mesh
      ref={piramide}
      position={[-1.5, 0, 0]}
      scale={encima ? 1.15 : 1}
      onClick={() => setColor(color === 'tomato' ? 'hotpink' : 'tomato')}
      onPointerOver={() => setEncima(true)}
      onPointerOut={() => setEncima(false)}
    >
      <coneGeometry args={[1, 1.6, 4]} />
      <meshStandardMaterial color={color} roughness={0.25} metalness={0.3} />
    </mesh>
  )
}

function Esfera() {
  const esfera = useRef<Mesh>(null)
  const [color, setColor] = useState('mediumseagreen')
  const [encima, setEncima] = useState(false)

  useFrame((_state, delta) => {
    if (esfera.current) {
      esfera.current.rotation.y -= delta
      esfera.current.rotation.x += delta * 0.5
    }
  })

  return (
    <mesh
      ref={esfera}
      position={[1.5, 0, 0]}
      scale={encima ? 1.2 : 1}
      onClick={() => setColor(color === 'mediumseagreen' ? 'gold' : 'mediumseagreen')}
      onPointerOver={() => setEncima(true)}
      onPointerOut={() => setEncima(false)}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export default function App() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 1, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Piramide />
        <Esfera />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
        />
        <Environment files="/fondo.jpg" background />
      </Canvas>
    </div>
  )
}
