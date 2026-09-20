"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Bell,
  User,
  Users,
  ChevronLeft,
  ChevronRight,
  Home,
  LogOut,
  Settings,
  UserCircle,
} from "lucide-react";
import styles from "./Nav.module.css";

export default function NavMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  const notifRef = useRef(null);
  const socialRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      const refs = [notifRef, socialRef, userRef];
      const clickedInsideSome = refs.some(
        (ref) => ref.current && ref.current.contains(e.target),
      );
      if (!clickedInsideSome) setOpenMenu(null);
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  // Restaura la opacidad del shell cada vez que cambia la ruta
  useEffect(() => {
    const shell = document.getElementById("app-shell");
    if (shell) {
      shell.style.opacity = "1";
      shell.style.transform = "scale(1)";
    }
  }, [pathname]);

  // al hacer click en el logotipo, regresa al hero
  const handleLogoClick = (e) => {
    e.preventDefault();

    const heroEl = document.getElementById("hero");
    const mainEl = document.getElementById("main");

    if (heroEl) {
      heroEl.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (mainEl) {
      mainEl.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.leftSection}>
        <button
          onClick={handleLogoClick}
          className={styles.logo}
          aria-label="Ir al inicio"
        >
          <span className={styles.logoX}>X</span>
        </button>
        <div className={styles.navArrows}>
          <button onClick={() => router.back()} className={styles.iconBtn}>
            <ChevronLeft size={30} strokeWidth={1.5} />
          </button>
          <button onClick={() => router.forward()} className={styles.iconBtn}>
            <ChevronRight size={30} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className={styles.centerSection}>
        <Link
          href="/"
          className={`${styles.homeBtn} ${pathname === "/" ? styles.homeActive : ""}`}
        >
          <Home size={26} strokeWidth={1.5} />
        </Link>

        <div className={styles.searchBox}>
          <Search size={32} strokeWidth={1.5} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Busca sesiónes, libros, preguntale a AI-X"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.menuWrapper} ref={notifRef}>
          <button
            className={styles.iconBtn}
            aria-label="Notificaciones"
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu("notif");
            }}
          >
            <Bell size={22} />
          </button>
          <div
            className={`${styles.dropdown} ${openMenu === "notif" ? styles.dropdownOpen : ""}`}
          >
            <p className={styles.dropdownTitle}>Notificaciones</p>
            <div className={styles.dropdownEmpty}>
              No tienes notificaciones nuevas
            </div>
          </div>
        </div>

        <div className={styles.menuWrapper} ref={socialRef}>
          <button
            className={styles.iconBtn}
            aria-label="Comunidad"
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu("social");
            }}
          >
            <Users size={22} />
          </button>
          <div
            className={`${styles.dropdown} ${openMenu === "social" ? styles.dropdownOpen : ""}`}
          >
            <p className={styles.dropdownTitle}>Comunidad</p>
            <Link href="/comunidad/amigos" className={styles.dropdownItem}>
              Amigos
            </Link>
            <Link href="/comunidad/grupos" className={styles.dropdownItem}>
              Grupos
            </Link>
            <Link href="/comunidad/mensajes" className={styles.dropdownItem}>
              Mensajes
            </Link>
          </div>
        </div>

        <div className={styles.menuWrapper} ref={userRef}>
          <button
            className={styles.userAvatarBtn}
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu("user");
            }}
          >
            <User size={20} />
          </button>
          <div
            className={`${styles.dropdown} ${openMenu === "user" ? styles.dropdownOpen : ""}`}
          >
            <Link href="/perfil" className={styles.dropdownItem}>
              <UserCircle size={18} />
              Mi perfil
            </Link>
            <Link href="/configuracion" className={styles.dropdownItem}>
              <Settings size={18} />
              Configuración
            </Link>
            <div className={styles.dropdownDivider} />
            <button className={styles.dropdownItemBtn}>
              <LogOut size={18} />
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
