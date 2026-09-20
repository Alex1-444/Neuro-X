"use client";

import { useState } from "react";
import Link from "next/link";
import { useCarousel } from "@/hooks/UseCarousel";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Gauge,
  Bookmark,
  Share2,
  CircleCheck,
} from "lucide-react";
import styles from "./CarouselStandard.module.css";
import SaveCollectionModal from "@/components/modals/SaveCollectionModal";
import { useCollections, FAVORITES_ID } from "@/context/collectionContext";
import { useToast } from "@/context/ToastContext";

function StandardCard({ item, onOpenModal }) {
  const { collections, toggleSessionInCollection } = useCollections(); // <-- Traemos las colecciones globales
  const { showToast } = useToast();

  const isSessionSaved = collections.some((col) =>
    col.savedSessions?.includes(item.id),
  );

  const handleBookmarkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // PRIMER CLICK, SI NO ESTA GUARDADO, LO GUARDAMOS AUTOMATICAMENTE EN FAVORITOS
    if (!isSessionSaved) {
      toggleSessionInCollection(FAVORITES_ID, item.id);
      showToast("Se guardó en Favoritos", "save", {
        link: `/collections/${FAVORITES_ID}`,
      });
      return;
    }

    // SEGUNDO CLICK, (YA ESTA GUARDADO): Calculamos posicion y abrimos el modal

    const rect = e.currentTarget.getBoundingClientRect();
    const modalWidth = 270;
    // Aumentamos el alto estimado porque la lista ahora mide hasta 260px
    const modalHeight = 420;
    const viewportHeight = window.innerHeight;

    // --- POSICIÓN X (Horizontal) ---
    // A la izquierda del botón
    let x = rect.left - modalWidth - 24;

    // Límite de seguridad X (si no cabe a la izquierda, lo pasa a la derecha)
    if (x < 10) {
      x = rect.right + 24;
    }

    // --- POSICIÓN Y (Vertical) ---
    // Siempre ARRIBA del botón (rect.top) menos la altura del modal y un pequeño margen
    let y = rect.top - modalHeight - 40;

    // --- LÍMITES DE SEGURIDAD FINALES ---
    // 1. Si al ponerlo arriba se sale por el "techo" de la pantalla, lo topamos a 10px
    if (y < 10) {
      y = 10;
    }

    // 2. Si en pantallas muy pequeñas choca con la parte de abajo, lo ajustamos
    if (y + modalHeight > viewportHeight - 10) {
      y = viewportHeight - modalHeight - 10;
    }

    onOpenModal({ x, y, sessionId: item.id, sessionName: item.title }); // Abrimos el modal con la posición calculada y pasamos el sessionId
  };

  return (
    <Link href={`/sessions/${item.id}`} className={styles.card}>
      <div className={styles.imgWrapper}>
        <img src={item.thumbnail} alt={item.title} className={styles.img} />
        <div className={styles.imgOverlay} />

        <div className={styles.summaryOverlay}>
          <p className={styles.summaryText}>
            {item.summary ||
              "Breve descripción de los temas a tratar en esta sesión..."}
          </p>
        </div>

        <span className={styles.duration}>{item.duration}</span>
      </div>

      <div className={styles.cardInfo}>
        <h2 className={styles.cardTitle}>{item.title}</h2>

        <div className={styles.cardFooter}>
          <div className={styles.cardMeta}>
            <span className={styles.metaItem}>
              <Clock size={12} />
              {item.duration}
            </span>
            <span className={styles.metaDot}>•</span>
            <span className={styles.metaItem}>
              <Gauge size={12} />
              {item.difficulty}
            </span>
          </div>

          <div className={styles.cardActions}>
            <button
              className={styles.actionBtn}
              aria-label="Guardar sesión"
              onClick={handleBookmarkClick}
            >
              {isSessionSaved ? (
                <CircleCheck size={18} strokeWidth={1.7} color="#1ed760" />
              ) : (
                <Bookmark size={18} strokeWidth={1.7} />
              )}
            </button>
            <button
              className={styles.actionBtn}
              aria-label="Compartir sesión"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Share2 size={18} strokeWidth={1.7} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function CarouselStandard({ title, items, visibleItems = 3.7 }) {
  const { offset, goNext, goPrev, canGoPrev, canGoNext } = useCarousel(
    items.length,
    visibleItems,
  );

  // Estados para controlar el modal
  const [modalState, setModalState] = useState({
    isOpen: false,
    position: null,
  });

  const slideWidthPercent = 100 / visibleItems;

  return (
    <section className={styles.carouselSection}>
      <div className={styles.header}>
        <h3 className={styles.carouselTitle}>{title}</h3>
        <button className={styles.verTodo}>Explorar todo ≽</button>
      </div>

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
                {/* Pasamos la función para abrir el modal */}
                <StandardCard
                  item={item}
                  onOpenModal={(position) =>
                    setModalState({ isOpen: true, position })
                  }
                />
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

      {/* El Modal se renderiza aquí, pero flota gracias a position: fixed */}
      <SaveCollectionModal
        isOpen={modalState.isOpen}
        position={modalState.position}
        sessionId={modalState.position?.sessionId}
        sessionName={modalState.position?.sessionName}
        onClose={() => setModalState({ isOpen: false, position: null })}
      />
    </section>
  );
}
