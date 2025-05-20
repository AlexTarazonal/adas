export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24 py-8 text-center text-sm text-slate-400">
      <p>
        © {new Date().getFullYear()} Alexander. Todos los derechos reservados.
      </p>
      <p className="mt-2">
        Hecho con <span className="text-red-500">❤</span> y café ☕ usando React + TailwindCSS
      </p>
    </footer>
  );
}
