// este codigo muestra los detalles de la pagina de categorias

"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useCollections } from "@/context/collectionContext";
import { getSessionById } from "@/data/CarouselsData";
import { useDominantColor } from "@/hooks/useDominantColor";
import styles from "./page.module.css";

export default function CollectionPage() {
  // Obtenemos el id desde la URL
  const { id } = useParams();

  // Accedemos a las colecciones del contexto global
  const { collections } = useCollections();

  // Buscamos la colección que coincida con el id de la URL.
  // Usamos String() porque algunos ids son números (Date.now()) y la URL es string.
  const collection = collections.find((col) => String(col.id) === id);

  // Hook para obtener el color de la imagen
  const dominantColor = useDominantColor(collection?.img, "rgb(30, 30, 30)");

  // Si no existe la colección, mostramos un mensaje
  if (!collection) {
    return (
      <div className={styles.notFound}>
        <h1>Colección no encontrada</h1>
        <Link href="/">Volver al inicio</Link>
      </div>
    );
  }

  // Convertimos los ids guardados en los datos completos de cada sesión
  const savedSessions = collection.savedSessions
    .map((sessionId) => getSessionById(sessionId))
    .filter(Boolean); // Filtramos por si algún id ya no existe

  return (
    <main className={styles.page}>
      {/* Encabezado con el nombre y número de sesiones */}
      <header
        className={styles.header}
        style={{
          background: `linear-gradient(to bottom, ${dominantColor} 0%, #121212 100%)`,
        }}
      >
        {/* Imagen de la colección al lado izquierdo */}
        <img
          src={collection.img}
          alt={collection.name}
          className={styles.headerImage}
        />

        {/* Textos agrupados al lado derecho */}
        <div className={styles.headerText}>
          <h1>{collection.name}</h1>
          <p>{collection.span}</p>
        </div>
      </header>

      {/* Si no hay sesiones guardadas, mostramos un estado vacío */}
      {savedSessions.length === 0 ? (
        <div className={styles.empty}>
          <p>No tienes sesiones guardadas en esta colección.</p>
          <Link href="/" className={styles.exploreLink}>
            Explorar sesiones
          </Link>
        </div>
      ) : (
        /* Grid con las tarjetas de las sesiones guardadas */
        <div className={styles.grid}>
          {savedSessions.map((session) => (
            <Link
              key={session.id}
              href={`/session/${session.id}`}
              className={styles.card}
            >
              <img
                src={session.thumbnail || session.img}
                alt={session.title}
                className={styles.cardImage}
              />
              <div className={styles.cardBody}>
                <h2>{session.title}</h2>
                <p>{session.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
