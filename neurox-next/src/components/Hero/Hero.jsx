"use client";

import { useHeroTimer } from "@/hooks/UseHeroTimer";
import { heroSlides } from "@/data/HeroSlides";
import {
  Clock,
  Gauge,
  Eye,
  Book,
  Film,
  Brain,
  Play,
  Info,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import styles from "./Hero.module.css";

export default function Hero() {
  const { activeIndex, goTo, goPrev, goNext } = useHeroTimer(
    heroSlides.length,
    15000,
  );

  return (
    <section className={styles.hero}>
      {/* ── Imágenes de Fondo ── */}
      {heroSlides.map((slide, i) => (
        <div
          key={slide.id}
          className={`${styles.heroSlide} ${i === activeIndex ? styles.heroSlideActive : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}

      {/* ── Overlay gradiente oscuro ── */}
      <div className={styles.overlay} />

      {/* ── Flechas de Navegación ── */}
      <button
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={goPrev}
        aria-label="anterior"
      >
        <ChevronLeft size={36} strokeWidth={1.5} />
      </button>
      <button
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={goNext}
        aria-label="siguiente"
      >
        <ChevronRight size={36} strokeWidth={1.5} />
      </button>

      {/* ── Contenido del slide activo ── */}
      {heroSlides.map((slide, i) => (
        <div
          key={slide.id}
          className={`${styles.heroContent} ${i === activeIndex ? styles.heroContentActive : ""}`}
        >
          {/* Fila Superior: Logo */}
          <div className={styles.topRow}>
            <h1 className={styles.logoPrincipal}>
              NEURO<span>X</span>
            </h1>
          </div>

          {/* Bloque de texto y botones */}
          <div className={styles.textBlock}>
            <h2 className={styles.slideTitle}>{slide.title}</h2>

            <div className={styles.bxStatsContainer}>
              <div className={styles.bxStats}>
                <div className={styles.stat}>
                  <Clock size={20} />
                  <p>{slide.time}</p>
                </div>
                <span className={styles.dot}>•</span>
                <div className={styles.stat}>
                  <Gauge size={20} />
                  <p>{slide.difficulty}</p>
                </div>
                <span className={styles.dot}>•</span>
                <div className={styles.stat}>
                  <Eye size={20} />
                  <p>{slide.views}</p>
                </div>
              </div>

              <div className={styles.bxStats2}>
                <div className={styles.stat2}>
                  <Book size={20} />
                </div>
                <div className={styles.stat2}>
                  <Film size={20} />
                </div>
                <div className={styles.stat2}>
                  <Brain size={20} />
                </div>
              </div>
            </div>

            <p className={styles.sliderText}>{slide.description}</p>

            <div className={styles.bxSesion}>
              <button className={styles.btnPrimary}>
                <Play size={20} fill="currentColor" />
                Iniciar Sesión
              </button>
              <button className={styles.btnSecondary}>
                <Info size={20} />
                Mas Información
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* ── Dots de navegación inferiores ── */}
      <div className={styles.dots}>
        {heroSlides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dotNav} ${i === activeIndex ? styles.dotNavActive : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
