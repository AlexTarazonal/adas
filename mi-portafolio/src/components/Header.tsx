// src/components/Header.tsx
import React from "react";
import styles from "./Header.module.css";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Sobre Mí", href: "#sobre" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.nav}>
          {links.map(({ label, href }) => (
            <li key={href}>
              <a className={styles.link} href={href}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
