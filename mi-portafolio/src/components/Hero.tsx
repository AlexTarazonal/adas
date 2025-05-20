import React, { useEffect, useMemo, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Particles from "react-tsparticles";
import { Typewriter } from "react-simple-typewriter";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";
import Header from "./Header";

// Component for glowing dots inside the 3D scene
function GlowDots() {
  // Create a soft circular gradient texture
  const dotTexture = useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }, []);

  // Generate random positions for the dots
  const positions = useMemo(() => {
    const count = 20;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() * 2 - 1) * 8;
      arr[i * 3 + 1] = (Math.random() * 2 - 1) * 5;
      arr[i * 3 + 2] = -2;
    }
    return arr;
  }, []);

  // Rotate the dots as the scene animates
  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={dotTexture}
        size={0.3}
        sizeAttenuation
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
}

export default function Hero() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } });
  }, [controls]);

  return (
    <section
      id="inicio"
      className="relative flex items-center justify-center text-center h-screen overflow-hidden hero-bg"
    >
    
      <div className="absolute inset-0 hero-overlay z-0 pointer-events-none" />

      <Canvas
        className="absolute inset-0 z-0"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
        gl={{ alpha: true }}
        camera={{ position: [0, 0, 16], fov: 50 }}
      >
        <GlowDots />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Sphere args={[3, 64, 64]} scale={1.6}>
          <MeshDistortMaterial
            color="#ff5e87"
            emissive="#e100ff"
            distort={0.25}
            speed={1.1}
            roughness={0.4}
          />
        </Sphere>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.2} />
      </Canvas>

      <Particles
        id="hero-particles"
        options={{
          fpsLimit: 60,
          interactivity: { events: { onHover: { enable: true, mode: "repulse" } } },
          particles: {
            number: { value: 18, density: { enable: true, area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: { min: 0.5, max: 0.9 } },
            size: { value: { min: 2, max: 4 } },
            move: { enable: true, speed: 0.3, outModes: { default: "out" } },
            links: { enable: false },
          },
        }}
        className="absolute inset-0 z-10 pointer-events-none"
      />

      <motion.div
        className="relative z-20 px-6 pt-28 max-w-3xl"
        initial={{ opacity: 0, y: 40 }}
        animate={controls}
      >
        <motion.h1
          className="text-[5rem] md:text-[7rem] font-extrabold mb-4 gradient-h1"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "backOut" }}
        >
          ¡Hola! Soy&nbsp;
          <span className="bg-clip-text gradient-alt-text text-transparent">
            Alexander
          </span>
        </motion.h1>

        <motion.h2
          className="text-[2.5rem] md:text-[4rem] font-medium mb-6 gradient-h2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Typewriter
            words={[
              "Desarrollador Frontend.",
              "Diseñador UI/UX.",
              "Apasionado por la innovación.",
            ]}
            cursor
            cursorStyle="|"
            loop
            delaySpeed={1200}
            typeSpeed={70}
            deleteSpeed={50}
          />
        </motion.h2>

        <motion.p
          className="text-[1.75rem] md:text-[2.25rem] mb-10 text-paragraph"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Creo experiencias web modernas, interactivas y accesibles, combinando diseño y rendimiento al máximo.
        </motion.p>
      </motion.div>

      <style>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .hero-bg {
          background: linear-gradient(60deg, #0bc5ea 0%, #5a67d8 50%, #ed64a6 100%);
          background-size: 200% 200%;
          animation: gradientBG 20s ease-in-out infinite;
        }
        .hero-overlay { background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.1)); }
        .gradient-h1 {
          background: linear-gradient(90deg, #ffffff 0%, #ffffff 30%, #ed64a6 70%, #9b4eff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0px 2px 4px rgba(0,0,0,0.6), 0px 0px 10px rgba(255,255,255,0.3);
        }
        .gradient-h2 { background: linear-gradient(90deg, #0bc5ea 0%, #ed64a6 100%); -webkit-background-clip: text; color: transparent; }
        .gradient-alt-text { background: linear-gradient(90deg, #ff5e87, #d34dff, #9b4eff); }
        .text-paragraph { color: rgba(255,255,255,0.9); text-shadow: 0 2px 4px rgba(0,0,0,0.4); }
      `}</style>
    </section>
  );
}
