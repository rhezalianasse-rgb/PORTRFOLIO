import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

function SceneObjects({ reducedMotion, isMobile }) {
  const group = useRef();
  const orbit = useRef();
  const target = useMemo(() => ({ x: 0, y: 0 }), []);

  useFrame((state, delta) => {
    if (!group.current || !orbit.current) return;
    target.x = state.pointer.y * 0.12;
    target.y = state.pointer.x * 0.16;
    const speed = reducedMotion ? 0.08 : 1;
    group.current.rotation.x += (target.x - group.current.rotation.x) * delta * 1.2 * speed;
    group.current.rotation.y += (target.y - group.current.rotation.y) * delta * 1.2 * speed;
    if (!reducedMotion) orbit.current.rotation.z += delta * 0.07;
  });

  return (
    <>
      <ambientLight intensity={0.65} />
      <pointLight position={[3, 3, 4]} intensity={3} color="#ff3842" />
      <pointLight position={[-3, -2, 1]} intensity={2.2} color="#f0eeee" />
      <pointLight position={[0, -3, -2]} intensity={1.5} color="#9d171d" />
      <group ref={group}>
        <Float speed={reducedMotion ? 0 : 1.1} rotationIntensity={0.15} floatIntensity={0.2}>
          <mesh position={[2.35, 1.45, -1.2]} rotation={[0.4, 0.5, 0.2]} scale={0.58}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color="#ed252d" emissive="#6f080d" emissiveIntensity={0.7} roughness={0.24} metalness={0.76} wireframe />
          </mesh>
        </Float>
        {!isMobile && <Float speed={reducedMotion ? 0 : 0.8} rotationIntensity={0.1} floatIntensity={0.12}>
          <mesh position={[-2.25, -1.4, -0.5]} scale={0.44}>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#eeeeee" roughness={0.3} metalness={0.65} wireframe />
          </mesh>
        </Float>}
        {!isMobile && <Float speed={reducedMotion ? 0 : 1.25} rotationIntensity={0.1} floatIntensity={0.15}>
          <mesh position={[2.55, -0.65, -1.7]} scale={0.26}>
            <sphereGeometry args={[1, 24, 24]} />
            <meshStandardMaterial color="#ed252d" emissive="#8c1017" emissiveIntensity={0.9} roughness={0.2} metalness={0.7} />
          </mesh>
        </Float>}
        <group ref={orbit} rotation={[0.68, 0.32, 0.3]}>
          <mesh>
            <torusGeometry args={[2.35, 0.012, 8, 128]} />
            <meshBasicMaterial color="#ed252d" transparent opacity={0.85} />
          </mesh>
          <mesh rotation={[0.5, 0.4, 0.2]}>
            <torusGeometry args={[2.7, 0.009, 8, 128]} />
            <meshBasicMaterial color="#eeeeee" transparent opacity={0.42} />
          </mesh>
        </group>
        {!isMobile && <mesh position={[-2.55, 1.12, -0.8]} scale={0.095}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#ed252d" emissive="#6f080d" metalness={0.65} roughness={0.22} />
        </mesh>}
      </group>
      <Sparkles count={isMobile ? 10 : 24} scale={5.8} size={1.4} speed={reducedMotion ? 0 : 0.12} opacity={0.55} color="#f4e9e9" />
    </>
  );
}

export default function HeroScene() {
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 720px)');
    const updateIsMobile = () => setIsMobile(query.matches);
    updateIsMobile();
    query.addEventListener('change', updateIsMobile);

    return () => query.removeEventListener('change', updateIsMobile);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6.8], fov: 40 }}
      dpr={[1, 1.35]}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      fallback={<div className="scene-fallback" />}
      aria-hidden="true"
    >
      <SceneObjects reducedMotion={reducedMotion} isMobile={isMobile} />
    </Canvas>
  );
}
