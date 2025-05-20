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
            className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600/80 px-6 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.3)] rounded-b-xl"
          >
            <nav className="max-w-6xl mx-auto flex justify-center items-center space-x-4 md:space-x-6 lg:space-x-8 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl shadow-lg border border-white/20">
              {links.map(({ label, href }) => {
                const isActive = active === label;
                return (
                  <motion.button
                    key={label}
                    onClick={() => handleClick(label, href)}
                    className="relative z-10 px-5 py-2 text-sm font-medium rounded-full transition-all"
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
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 shadow-[0_0_12px_rgba(255,255,255,0.4)]"
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

              <motion.button
                onClick={() => setDarkMode((prev) => !prev)}
                aria-label="Toggle dark mode"
                className="ml-4 p-3 rounded-full bg-white/10 border border-white/30 backdrop-blur-md"
                whileHover={{ rotate: 15, scale: 1.15 }}
                whileTap={{ rotate: -15, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
              >
                <motion.span
                  key={darkMode ? "moon" : "sun"}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.25 }}
                  style={{ fontSize: "1.3rem" }}
                >
                  {darkMode ? "🌙" : "☀️"}
                </motion.span>
              </motion.button>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>
    </>
  );
}
