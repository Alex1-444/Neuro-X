"use client";

import { useState } from "react";
import { useDominantColor } from "@/hooks/useDominantColor";
import { Play, Bookmark, Share2, Clock, Gauge, Tag } from "lucide-react";
import { useCollections, FAVORITES_ID } from "@/context/collectionContext";
import { useToast } from "@/context/ToastContext";
import SaveCollectionModal from "@/components/Modals/SaveCollectionModal";
import styles from "./page.module.css";

export default function SessionClient({ session }) {
  const dominantColor = useDominantColor(session.thumbnail, "#121212");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { collections, toggleSessionInCollection } = useCollections();
  const { addToast } = useToast();

  const favoritesCollection = collections.find(
    (col) => col.id === FAVORITES_ID,
  );
  const isSavedInFavorites = favoritesCollection?.savedSessions.includes(
    session.id,
  );

  const handleBookmarkClick = () => {
    if (!isSavedInFavorites) {
      toggleSessionInCollection(FAVORITES_ID, session.id);
      addToast({
        message: "Guardado en Favoritos",
        icon: "Bookmark",
        link: {
          label: "Ver colección",
          href: `/collections/${FAVORITES_ID}`,
        },
      });
    } else {
      setIsModalOpen(true);
    }
  };

  // Calculamos cuántas micro-sesiones tiene (si no tiene 'stages', asumimos que es 1 sesión única)
  const microSessionsCount = session.stages ? session.stages.length : 1;

  return (
    <>
      <main
        className={styles.container}
        style={{
          background: `linear-gradient(to bottom, ${dominantColor} 0%, #121212 100vh)`,
        }}
      >
        {/* 1. SECCIÓN DEL HERO (MUCHO MÁS LIMPIA: Solo Logo, Título y Botones) */}
        <div className={styles.heroSection}>
          <img
            src={session.thumbnail}
            alt={session.title}
            className={styles.bgImage}
          />

          <div className={styles.content}>
            <h1 className={styles.logo}>
              Neuro<span>X</span>
            </h1>

            <div className={styles.details}>
              <h2 className={styles.title}>{session.title}</h2>

              <div className={styles.actionArea}>
                <button className={styles.startButton}>
                  <Play size={22} fill="currentColor" />
                  Iniciar sesión
                </button>

                <div className={styles.actionsRow}>
                  <button
                    className={styles.iconButton}
                    aria-label="Guardar"
                    onClick={handleBookmarkClick}
                  >
                    <Bookmark
                      size={28}
                      strokeWidth={1.6}
                      fill={isSavedInFavorites ? "currentColor" : "none"}
                    />
                  </button>
                  <button className={styles.iconButton} aria-label="Compartir">
                    <Share2 size={28} strokeWidth={1.6} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. NUEVA SECCIÓN DE INFORMACIÓN (Debajo de la imagen) */}
        <div className={styles.infoSection}>
          {/* Fila superior: Etiquetas a la izquierda, Cantidad de micro-sesiones a la derecha */}
          <div className={styles.infoTopRow}>
            <ul className={styles.sessionTags}>
              <li>
                <Tag size={18} className={styles.detailIcon} />
                <span>{session.genero || "Neurociencia"}</span>
              </li>
              <li>
                <Clock size={18} className={styles.detailIcon} />
                <span>{session.duration}</span>
              </li>
              <li>
                <Gauge size={18} className={styles.detailIcon} />
                <span>{session.difficulty}</span>
              </li>
            </ul>

            <div className={styles.stageCount}>
              {microSessionsCount}{" "}
              {microSessionsCount === 1 ? "sesión" : "micro-sesiones"}
            </div>
          </div>

          {/* Descripción completa */}
          <div className={styles.descriptionBox}>
            <p>
              {session.fullDescription ||
                session.summary ||
                "Descripción no disponible para esta sesión."}
            </p>
          </div>
        </div>

        {/* 3. SECCIÓN DE DETALLES: Ruta de Inmersión (Solo si hay stages) */}
        {session.stages && session.stages.length > 0 && (
          <div className={styles.detailsContainer}>
            <div className={styles.sectionHeader}>
              <h2>Ruta de Inmersión</h2>
              <p>Completa estas fases interactivas para dominar el tema.</p>
            </div>

            <div className={styles.stagesGrid}>
              {session.stages.map((stage, index) => (
                <div key={stage.title} className={styles.stageCard}>
                  <div
                    className={
                      index === 0
                        ? styles.stageNumberActive
                        : styles.stageNumber
                    }
                  >
                    {index + 1}
                  </div>

                  <div className={styles.stageContent}>
                    <div className={styles.stageHeader}>
                      <span className={styles.stageIcon}>{stage.icon}</span>
                      <span className={styles.stageType}>{stage.type}</span>
                    </div>

                    <h3>{stage.title}</h3>
                    <p>{stage.description}</p>

                    <div className={styles.stageFooter}>
                      <span>⏱ {stage.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <SaveCollectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        session={session}
      />
    </>
  );
}
