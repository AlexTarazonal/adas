import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Typewriter } from "react-simple-typewriter";
import { Link as ScrollLink } from "react-scroll";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial, Sphere } from "@react-three/drei";
import Header from "./Header";

export default function Hero() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    });
  }, [controls]);

  const initParticles = async (main: any) => {
    await loadFull(main);
  };

  return (
    <section
      id="inicio"
      className="relative flex items-center justify-center text-center min-h-screen overflow-visible hero-bg"
    >
      {/* Dark overlay para contraste */}
      <div className="absolute inset-0 hero-overlay z-10 pointer-events-none" />
      <Header />

      {/* 3D animated sphere más grande */}
      <Canvas
        className="absolute inset-0 z-0"
        style={{
          position: "", // o 'unset' / 'initial'
          width: "100%",
          height: "100%",
        }}
        gl={{ alpha: true }}
        camera={{ position: [0, 0, 12], fov: 50 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        {/* Aquí el cambio clave: args y scale */}
        <Sphere args={[3, 64, 64]} scale={2}>
          {" "}
          {/* radio = 3, escala = 2 */}
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

      {/* Particles Overlay */}
      <Particles
        id="hero-particles"
        init={initParticles}
        options={{
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
          },
          particles: {
            color: { value: "#ffffff" },
            links: {
              enable: true,
              distance: 100,
              color: "#ffffff",
              opacity: 0.05,
            },
            move: { speed: 0.3 },
            number: { value: 12 },
            size: { value: { min: 2, max: 4 } },
          },
        }}
        className="absolute inset-0 z-15 pointer-events-none"
      />

      {/* Main Content */}
      <motion.div
        className="relative z-20 px-6 pt-28 max-w-3xl"
        initial={{ opacity: 0, y: 40 }}
        animate={controls}
      >
        <motion.h1
          className="text-[5rem] md:text-[7rem] font-extrabold mb-4 text-white bg-clip-text gradient-text"
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
          className="text-[2.5rem] md:text-[4rem] font-medium text-white mb-6"
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
          className="text-[1.75rem] md:text-[2.25rem] text-white mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Creo experiencias web modernas, interactivas y accesibles, combinando
          diseño y rendimiento al máximo.
        </motion.p>
      </motion.div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes gradientBG {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .hero-bg {
          background: linear-gradient(
            270deg,
            #ff0057,
            #5f00ff,
            #00eaff,
            #ffae00,
            #ff0057
          );
          background-size: 1200% 1200%;
          animation: gradientBG 10s ease infinite;
        }
        .hero-overlay {
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.6),
            rgba(0, 0, 0, 0.3)
          );
        }
        .gradient-text {
          background: linear-gradient(90deg, #02c39a, #0794f2);
          -webkit-background-clip: text;
          color: transparent;
        }
        .gradient-alt-text {
          background: linear-gradient(90deg, #ff5e87, #d34dff, #9b4eff);
        }
      `}</style>
    </section>
  );
}
