import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { TextureLoader, Vector3 } from 'three';
import { Html, OrbitControls } from '@react-three/drei';

/**
 * ImagePlane: single textured plane that slowly rotates and moves.
 * Accepts texture, initial position and speed settings.
 */
function ImagePlane({ texture, position, rotationSpeed = 0.1, floatSpeed = 0.5, size = [2.0, 1.4] }) {
  const mesh = useRef();
  // local phase offset to desync animations
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  useFrame((state, delta) => {
    if (!mesh.current) return;
    // slow rotation
    mesh.current.rotation.z += rotationSpeed * delta * 0.2;
    mesh.current.rotation.y += rotationSpeed * delta * 0.05;
    // floating along Y
    mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * floatSpeed + phase) * 0.6;
    // gentle forward/backward movement to simulate rolling
    mesh.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * (floatSpeed * 0.2) + phase) * 0.4;
  });

  return (
    <mesh ref={mesh} position={position} scale={[size[0], size[1], 1]}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

/**
 * RollingWall: creates many planes from provided textures and arranges them in multiple rings/rows.
 * The whole group slowly rotates to create the rolling effect.
 */
function RollingWall({ textures }) {
  const groupRef = useRef();
  const count = textures.length;
  // arrange images in two rings/rows with different radii
  const items = useMemo(() => {
    const out = [];
    const rows = 3;
    const perRow = Math.ceil(count / rows) + 2;
    for (let r = 0; r < rows; r++) {
      const radius = 3.5 + r * 1.6;
      for (let i = 0; i < perRow; i++) {
        const angle = (i / perRow) * Math.PI * 2 + (r % 2 === 0 ? 0 : 0.3);
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius - 6 - r * 1.2; // push back the rows
        const y = (r - 1) * 1.2; // vertical offset per row
        const idx = (i + r * perRow) % count;
        out.push({ idx, pos: [x, y, z], rotationSpeed: 0.15 + r * 0.03, floatSpeed: 0.6 + (i % 3) * 0.2 });
      }
    }
    return out;
  }, [count]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // rotate the entire wall slowly - this creates the rolling motion
    groupRef.current.rotation.y += 0.03 * delta;
    // small global up/down to simulate drifting
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.3;
  });

  return (
    <group ref={groupRef}>
      {items.map((it, i) => (
        <ImagePlane
          key={i}
          texture={textures[it.idx]}
          position={it.pos}
          rotationSpeed={it.rotationSpeed}
          floatSpeed={it.floatSpeed}
          size={[2.4, 1.6]}
        />
      ))}
    </group>
  );
}

/**
 * SceneContainer: loads textures and renders Canvas with lights & RollingWall.
 * It also listens to pointer position to provide subtle parallax via camera position.
 */
export default function SceneContainer() {
  const urls = ['/img11.jpg', '/img12.jpg', '/img13.jpg', '/img14.jpg'];
  const textures = useLoader(TextureLoader, urls);

  // Improve texture settings (repeat / encoding) if desired
  textures.forEach((t) => {
    t.encoding = t.encoding; // keep default; toneMapped set false on material
    t.minFilter = t.minFilter;
  });

  return (
    <Canvas className="canvas-fullscreen pointer-ignore" camera={{ position: [0, 0, 6], fov: 50 }}>
      {/* subtle ambient + directional fill */}
      <ambientLight intensity={0.9} />
      <directionalLight intensity={0.6} position={[5, 5, 5]} />
      <directionalLight intensity={0.3} position={[-5, -2, -5]} />

      {/* Rolling wall */}
      <RollingWall textures={textures} />

      {/* slight fog for depth (not too strong) */}
      <fog attach="fog" args={['#000000', 8, 18]} />

      {/* Optional: small helper orbit controls for development (disabled pointer events to not steal UI) */}
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
}
