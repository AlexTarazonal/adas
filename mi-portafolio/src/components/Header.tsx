import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header() {
  const [active, setActive] = useState("Inicio");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  // Gradiente animado
  const motionX = useMotionValue(0);
  const gradient = useTransform(
    motionX,
    [0, 0.33, 0.66, 1],
    [
      "linear-gradient(90deg, #7c3aed, #ec4899)", // púrpura → rosa
      "linear-gradient(90deg, #ec4899, #f59e0b)", // rosa → naranja
      "linear-gradient(90deg, #f59e0b, #0ea5e9)", // naranja → azul
      "linear-gradient(90deg, #0ea5e9, #7c3aed)", // azul → púrpura
    ]
  );
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current = (current + 0.33) % 1.01;
      motionX.set(current);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(currentY / docHeight);
      setShowHeader(!(currentY > lastScrollY.current && currentY > 80));
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((ent) => {
          if (ent.isIntersecting) {
            const id = ent.target.id;
            const found = links.find((l) => l.href === `#${id}`);
            if (found) setActive(found.label);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    links.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Dark mode toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleClick = (label: string, href: string) => {
    setActive(label);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Barra superior animada */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 z-50 origin-left"
        style={{ scaleX: scrollProgress, background: gradient }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress }}
        transition={{ ease: "easeOut", duration: 0.3 }}
        aria-hidden="true"
      />

      <AnimatePresence>
        {showHeader && (
          <motion.header
            layout
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 30 }}
            className="sticky top-0 z-50 backdrop-blur-lg 
   bg-gradient-to-r 
     from-[#0bc5ea]/80   /* teal semi-transparente */ 
     via-[#5a67d8]/80    /* indigo semi-transparente */ 
     to-[#ed64a6]/80     /* magenta semi-transparente */ 
   px-6 py-3 
   shadow-lg 
   rounded-b-2xl"
          >
            <nav
              className="max-w-6xl mx-auto flex justify-center items-center 
   space-x-4 md:space-x-6 lg:space-x-8 
   px-6 py-3 
   rounded-full 
   bg-white/10 backdrop-blur-md 
   shadow-[0_8px_20px_rgba(0,0,0,0.4)] 
   border border-white/30"
            >
              {links.map(({ label, href }) => {
                const isActive = active === label;
                return (
                  <motion.button
                    key={label}
                    onClick={() => handleClick(label, href)}
                   className="relative z-10 px-6 py-2.5 text-base font-semibold rounded-full transition-all"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          layoutId="active-pill"
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.7 }}
                          transition={{
                            type: "spring",
                            stiffness: 700,
                            damping: 25,
                          }}
                         className="absolute inset-0 rounded-full 
       bg-gradient-to-r 
         from-[#0bc5ea] 
         via-[#5a67d8] 
         to-[#ed64a6] 
      shadow-[0_0_16px_rgba(255,255,255,0.5)]"
                          style={{ zIndex: -1 }}
                        />
                      )}
                    </AnimatePresence>
                    <span
                      className={`relative z-20 ${
                        isActive
                          ? "text-white"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      {label}
                    </span>
                  </motion.button>
                );
              })}
            </nav>
          </motion.header>
        )}
      </AnimatePresence>
    </>
  );
}
