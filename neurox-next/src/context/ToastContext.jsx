"use client";

// Importamos Link para la navegación
import Link from "next/link";
// Importamos Bookmark para guardar y BookmarkMinus para eliminar
import { Bookmark, BookmarkMinus } from "lucide-react";
import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import styles from "./Toast.module.css";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const [isClosing, setIsClosing] = useState(false); // Para la animación de salida

  // showToast ahora recibe: mensaje, tipo (save/remove) y opciones (link, linkText)
  const showToast = useCallback((message, type = "save", options = {}) => {
    setIsClosing(false);
    setToast({
      message,
      type,
      link: options.link || null,
      linkText: options.linkText || "Ver colección",
    });
  }, []);

  // Efecto para ocultar el toast automáticamente después de 4 segundos
  useEffect(() => {
    if (!toast) return;

    // A los 3.7 segundos iniciamos la animación de salida
    const closeTimer = setTimeout(() => {
      setIsClosing(true);
    }, 3700);

    // A los 4.0 segundos lo desmontamos por completo
    const removeTimer = setTimeout(() => {
      setToast(null);
      setIsClosing(false);
    }, 4000);

    return () => {
      clearTimeout(closeTimer);
      clearTimeout(removeTimer);
    };
  }, [toast]);

  // Función para cerrar el toast con animación al hacer clic en el enlace
  const handleLinkClick = () => {
    setIsClosing(true);
    setTimeout(() => {
      setToast(null);
      setIsClosing(false);
    }, 300); // 300ms = duración de la animación de salida
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Renderizamos el Toast */}
      {toast && (
        <div className={`${styles.toast} ${isClosing ? styles.closing : ""}`}>
          {/* Fila superior: icono + mensaje */}
          <div className={styles.content}>
            {toast.type === "save" ? (
              <Bookmark size={22} fill="#fff" />
            ) : (
              <BookmarkMinus size={22} color="#ff4b4b" />
            )}
            <p>{toast.message}</p>
          </div>

          {/* Enlace "Ver colección" (solo si se proporcionó un link) */}
          {toast.link && (
            <Link
              href={toast.link}
              className={styles.link}
              onClick={handleLinkClick}
            >
              {toast.linkText}
            </Link>
          )}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
