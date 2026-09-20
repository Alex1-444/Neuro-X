"use client";

import { createContext, useState, useContext } from "react";
import { getSessionById } from "@/data/CarouselsData";

const CollectionContext = createContext();

export const FAVORITES_ID = "favorites"; // <-- ID fijo para la colección de favoritos

export function CollectionProvider({ children }) {
  // Empezamos con la coleccion favoritos predefinida y vacía
  const [collections, setCollections] = useState([
    {
      id: FAVORITES_ID,
      name: "Favoritos",
      img: "/default-playlist.png", // Imagen por defecto para favoritos vacío
      span: "Tú • 0 Sesiones",
      savedSessions: [],
      isFavorites: true,
    },
  ]);

  // Función para agregar una nueva colección dinámicamente
  const addCollection = (name, initialSessionId = null) => {
    const initialSessions = initialSessionId ? [initialSessionId] : [];

    // 1. Buscamos la imagen de la sesión inicial (si existe)
    let collectionImage = "/default-playlist.png";
    if (initialSessionId) {
      const firstSession = getSessionById(initialSessionId);
      if (firstSession) {
        collectionImage = firstSession.img || firstSession.thumbnail;
      }
    }

    const sessionCount = initialSessions.length;
    const sessionWord = sessionCount === 1 ? "Sesión" : "Sesiones";

    // 2. Creamos la colección
    const newCollection = {
      id: Date.now(),
      name: name,
      img: collectionImage,
      span: `Alex Deyll • ${sessionCount} ${sessionWord}`,
      savedSessions: initialSessions,
    };

    // Agregamos la nueva colección respetando a Favoritos en el primer lugar
    setCollections((prev) => {
      const favorites = prev.find((col) => col.id === FAVORITES_ID);
      const otherCollections = prev.filter((col) => col.id !== FAVORITES_ID);

      return [favorites, newCollection, ...otherCollections];
    });
  };

  // Función para agregar/quitar sesiones de una colección
  const toggleSessionInCollection = (collectionId, sessionId) => {
    setCollections((prev) =>
      prev.map((col) => {
        if (col.id === collectionId) {
          const hasSession = col.savedSessions.includes(sessionId);

          const updatedSessions = hasSession
            ? col.savedSessions.filter((id) => id !== sessionId) // Remover
            : [...col.savedSessions, sessionId]; // Agregar

          let updatedImg = col.img;

          if (!hasSession && col.savedSessions.length === 0) {
            const firstSession = getSessionById(sessionId);
            if (firstSession) {
              updatedImg = firstSession.img || firstSession.thumbnail;
            }
          } else if (hasSession && updatedSessions.length === 0) {
            updatedImg = "/default-playlist.png";
          } else if (hasSession && updatedSessions) {
            const newFirstSession = getSessionById(updatedSessions);

            if (newFirstSession) {
              updatedImg = newFirstSession || newFirstSession.thumbnail;
            }
          }

          const updatedCount = updatedSessions.length;
          const updatedWord = updatedCount === 1 ? "Sesión" : "Sesiones";

          const owner = col.isFavorites ? "Tu" : "Alex Deyll";

          return {
            ...col,
            savedSessions: updatedSessions,
            img: updatedImg, // <-- Actualizamos la portada dinámicamente
            span: `${owner} • ${updatedCount} ${updatedWord}`,
          };
        }
        return col;
      }),
    );
  };

  return (
    <CollectionContext.Provider
      value={{ collections, addCollection, toggleSessionInCollection }}
    >
      {children}
    </CollectionContext.Provider>
  );
}

// Hook personalizado para usar el contexto fácilmente
export const useCollections = () => useContext(CollectionContext);
