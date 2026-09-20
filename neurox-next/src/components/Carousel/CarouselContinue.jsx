"use client";

import { useRef, useState } from "react";
import { useCarousel } from "@/hooks/UseCarousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./CarouselContinue.module.css";

function VideoCard({ item }) {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail — visible cuando NO hay hover */}
      <img
        src={item.thumbnail}
        alt={item.title}
        className={`${styles.thumbnail} ${hovered ? styles.thumbnailHidden : ""}`}
      />

      {/* Video — sólo visible en hover */}
      <video
        ref={videoRef}
        src={item.videoSrc}
        muted
        loop
        playsInline
        className={`${styles.video} ${hovered ? styles.videoVisible : ""}`}
      />

      {/* Barra de progreso */}
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${item.progress}%` }}
        />
      </div>

      {/* Info overlay */}
      <div
        className={`${styles.infoOverlay} ${hovered ? styles.infoOverlayVisible : ""}`}
      >
        <p className={styles.cardTitle}>{item.title}</p>
        <span className={styles.cardDuration}>{item.duration}</span>
      </div>
    </div>
  );
}

export default function CarouselContinue({ items }) {
  const VISIBLE = 4;
  const { offset, goNext, goPrev, canGoPrev, canGoNext } = useCarousel(
    items.length,
    VISIBLE,
  );

  const slideWidthPercent = 100 / VISIBLE;

  return (
    <section className={styles.carouselSection}>
      <h3 className={styles.carouselTitle}>Continúa Aprendiendo</h3>

      <div className={styles.carouselWrapper}>
        {canGoPrev && (
          <button
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={goPrev}
            aria-label="anterior"
          >
            <ChevronLeft size={28} strokeWidth={1.5} />
          </button>
        )}

        <div className={styles.track}>
          <div
            className={styles.trackInner}
            style={{
              transform: `translateX(-${offset * slideWidthPercent}%)`,
            }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className={styles.slide}
                style={{ flex: `0 0 ${slideWidthPercent}%` }}
              >
                <VideoCard item={item} />
              </div>
            ))}
          </div>
        </div>

        {canGoNext && (
          <button
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={goNext}
            aria-label="siguiente"
          >
            <ChevronRight size={28} strokeWidth={1.5} />
          </button>
        )}
      </div>
    </section>
  );
}
