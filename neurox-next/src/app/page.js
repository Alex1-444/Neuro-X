import Hero from "@/components/Hero/Hero";
import CarouselContinue from "@/components/Carousel/CarouselContinue";
import CarouselStandard from "@/components/Carousel/CarouselStandard";
import {
  continueWatching,
  popularCarousel,
  neurocienciaCarousel,
  biologiaCarousel,
  astronomiaCarousel,
} from "@/data/CarouselsData";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.pageContent}>
      {/* ── Hero principal ── */}
      <Hero />

      {/* ── Carruseles ── */}
      <div className={styles.carouselsContainer}>
        {/* Carrusel 1: Continuar Aprendiendo — con hover video */}
        <CarouselContinue items={continueWatching} />

        {/* Carrusel 2: Populares */}
        <CarouselStandard
          title="Populares esta semana"
          items={popularCarousel}
          visibleItems={3.7}
        />

        {/* Carrusel 3: Neurocincia */}
        <CarouselStandard
          title="Neurociencia para todos"
          items={neurocienciaCarousel}
          visibleItems={3.7}
        />

        {/* Carrusel 4: Biología */}
        <CarouselStandard
          title="La biología de la vida"
          items={biologiaCarousel}
          visibleItems={3.7}
        />

        {/* Carrusel 4: Astronomía */}
        <CarouselStandard
          title="el universo y más allá"
          items={astronomiaCarousel}
          visibleItems={3.7}
        />
      </div>
    </div>
  );
}
