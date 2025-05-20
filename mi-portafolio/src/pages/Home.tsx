
import Hero from "../components/Hero";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="">

 <Hero />
      <main className="pt-24 px-6 md:px-12 lg:px-24 space-y-32">
       

        {/* SOBRE MÍ */}
        <section id="sobre" className="scroll-mt-24">
          <h2 className="text-4xl font-bold mb-6 text-cyan-300">Sobre mí</h2>
          <p className="max-w-3xl text-white/90 leading-relaxed">
            Soy Alexander, desarrollador frontend con pasión por crear
            experiencias web atractivas y funcionales. Me especializo en React,
            TypeScript y diseño moderno con TailwindCSS.
          </p>
        </section>

        {/* PROYECTOS */}
        <section id="proyectos" className="scroll-mt-24">
          <h2 className="text-4xl font-bold mb-6 text-cyan-300">Proyectos</h2>
          <p className="text-white/80">Próximamente...</p>
        </section>

        {/* HABILIDADES */}
        <section id="habilidades" className="scroll-mt-24">
          <h2 className="text-4xl font-bold mb-6 text-cyan-300">Habilidades</h2>
          <p className="text-white/80">Tecnologías que manejo y domino.</p>
        </section>

        {/* EXPERIENCIA */}
        <section id="experiencia" className="scroll-mt-24">
          <h2 className="text-4xl font-bold mb-6 text-cyan-300">Experiencia</h2>
          <p className="text-white/80">Trayectoria profesional y proyectos realizados.</p>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="scroll-mt-24 pb-24">
          <h2 className="text-4xl font-bold mb-6 text-cyan-300">Contacto</h2>
          <p className="text-white/80">¿Quieres trabajar conmigo? ¡Hablemos!</p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
