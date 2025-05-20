import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Typewriter } from "react-simple-typewriter";
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
      className="relative flex items-center justify-center text-center h-screen overflow-hidden hero-bg"
    >
      <div className="absolute inset-0 hero-overlay z-10 pointer-events-none" />

      <Canvas
         className="absolute inset-0 z-0"
          style={{
   width: "100%",
   height: "100%",           // hereda h-screen del section
   overflow: "visible",      // ¡muy importante!
 }}
        gl={{ alpha: true }}
        camera={{ position: [0, 0, 16], fov: 50 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* escala a tu gusto; como no hay recorte ahora, puedes subir a 4.5 o incluso 5 */}
        <Sphere args={[3, 64, 64]} scale={2.5}>
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
        init={initParticles}
        options={{
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
          },
          particles: {
            color: { value: "#ffffff" },
            links: { enable: true, distance: 100, opacity: 0.05 },
            move: { speed: 0.3 },
            number: { value: 12 },
            size: { value: { min: 2, max: 4 } },
          },
        }}
        className="absolute inset-0 z-5 pointer-events-none"
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
          Creo experiencias web modernas, interactivas y accesibles, combinando
          diseño y rendimiento al máximo.
        </motion.p>
      </motion.div>

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
            60deg,
            #0bc5ea 0%,
            #5a67d8 50%,
            #ed64a6 100%
          );
          background-size: 200% 200%;
          animation: gradientBG 20s ease-in-out infinite;
        }
        .hero-overlay {
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.3),
            rgba(0, 0, 0, 0.1)
          );
        }
        .gradient-h1 {
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            #ffffff 30%,
            #ed64a6 70%,
            #9b4eff 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.6),
            0px 0px 10px rgba(255, 255, 255, 0.3);
        }
        .gradient-h2 {
          background: linear-gradient(90deg, #0bc5ea 0%, #ed64a6 100%);
          -webkit-background-clip: text;
          color: transparent;
        }
        .gradient-alt-text {
          background: linear-gradient(90deg, #ff5e87, #d34dff, #9b4eff);
        }
        .text-paragraph {
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </section>
  );
}
