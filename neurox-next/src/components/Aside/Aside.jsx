"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenCheck, Music, Heart } from "lucide-react";
import styles from "./Aside.module.css";
import { useCollections, FAVORITES_ID } from "@/context/collectionContext"; // <-- Importamos el hook

const topNav = [
  { icon: BookOpenCheck, label: "Libreria", href: "/libreria" },
  { icon: Music, label: "Tus A. Resúmenes", href: "/musica" },
];

export default function Aside() {
  const pathname = usePathname();
  const { collections } = useCollections(); // <-- Traemos las colecciones globales

  return (
    <aside className={styles.aside}>
      {/* ── Iconos Superiores ── */}
      <nav className={styles.topNav}>
        <ul className={styles.navList}>
          {topNav.map(({ icon: Icon, label, href }) => {
            const isActive = pathname === href;

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.navItemContainer} ${
                    isActive ? styles.navItemContainerActive : ""
                  }`}
                >
                  <div className={styles.navItem}>
                    <Icon
                      size={28}
                      strokeWidth={1.5}
                      className={styles.navIcon}
                    />
                  </div>
                  <span className={styles.navLabel}>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Contenedor de Colecciones del Usuario ── */}
      <div className={styles.playlistsContainer}>
        <h2 className={styles.sectionTitle}>Mis Colecciones</h2>

        <div className={styles.playlistsScroll}>
          {collections.map((item) => (
            <Link
              key={item.id}
              href={`/collections/${item.id}`}
              className={`${styles.bookListContainer} ${styles.playlistItemLink}`}
            >
              {/* CONDICIONAL: Si es Favoritos muestra el contenedor con gradiente, si no, la imagen */}
              {item.id === FAVORITES_ID ? (
                <div className={styles.favoritesIconWrapper}>
                  <Heart size={20} color="white" fill="white" />
                </div>
              ) : (
                <div className={styles.booklistItem}>
                  <img
                    src={item.img}
                    alt={item.name}
                    className={styles.booklistImg}
                  />
                </div>
              )}

              <div className={styles.booklistText}>
                <span className={styles.itemLabel}>{item.name}</span>
                <span className={styles.itemDescription}>{item.span}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
