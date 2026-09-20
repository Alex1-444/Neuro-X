"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Search, Plus, X, CircleCheck, Heart } from "lucide-react";
import styles from "./SaveCollectionModal.module.css";
import { useCollections, FAVORITES_ID } from "@/context/collectionContext";
import { useToast } from "@/context/ToastContext";

export default function SaveCollectionModal({
  isOpen,
  onClose,
  position,
  sessionId,
  sessionName,
}) {
  const modalRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { collections, addCollection, toggleSessionInCollection } =
    useCollections();
  const { showToast } = useToast();

  // --- LÓGICA DE ESTADO LOCAL (BORRADOR) ---
  const [localSelections, setLocalSelections] = useState(new Set());
  const [initialSelections, setInitialSelections] = useState(new Set());

  const localSelectionsRef = useRef(localSelections);
  const initialSelectionsRef = useRef(initialSelections);

  useEffect(() => {
    localSelectionsRef.current = localSelections;
    initialSelectionsRef.current = initialSelections;
  }, [localSelections, initialSelections]);

  useEffect(() => {
    if (isOpen) {
      const currentlySaved = collections
        .filter((c) => c.savedSessions?.includes(sessionId))
        .map((c) => c.id);

      setLocalSelections(new Set(currentlySaved));
      setInitialSelections(new Set(currentlySaved));
    } else {
      setSearchTerm("");
    }
  }, [isOpen, sessionId]);

  const handleSaveChangesAndClose = useCallback(() => {
    const initial = initialSelectionsRef.current;
    const current = localSelectionsRef.current;

    const added = [];
    const removed = [];

    collections.forEach((col) => {
      const wasInInitial = initial.has(col.id);
      const isInLocal = current.has(col.id);

      if (!wasInInitial && isInLocal) added.push(col);
      if (wasInInitial && !isInLocal) removed.push(col);
    });

    const totalChanges = added.length + removed.length;

    added.forEach((col) => toggleSessionInCollection(col.id, sessionId));
    removed.forEach((col) => toggleSessionInCollection(col.id, sessionId));

    if (totalChanges > 0) {
      if (totalChanges > 1) {
        showToast("Se guardaron los cambios", "save");
      } else if (added.length === 1) {
        showToast(`Se guardó en ${added[0].name}`, "save", {
          link: {
            label: "Ver colección",
            href: `/collections/${added[0].id}`,
          },
        });
      } else if (removed.length === 1) {
        showToast(`Se eliminó de ${removed[0].name}`, "remove");
      }
    }

    onClose();
  }, [collections, sessionId, toggleSessionInCollection, showToast, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleSaveChangesAndClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, handleSaveChangesAndClose]);

  if (!isOpen || !position) return null;

  const filteredCollections = collections.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCreateWithSessionName = () => {
    if (!sessionName || sessionName.trim() === "") return;

    addCollection(sessionName, sessionId);
    showToast(`Se guardó en ${sessionName}`, "save");

    onClose();
  };

  const toggleLocalSelection = (colId) => {
    setLocalSelections((prev) => {
      const next = new Set(prev);
      if (next.has(colId)) {
        next.delete(colId);
      } else {
        next.add(colId);
      }
      return next;
    });
  };

  return (
    <div
      ref={modalRef}
      className={styles.modalContainer}
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
    >
      <div className={styles.header}>
        <h4>Guardar en...</h4>
        <button className={styles.closeBtn} onClick={handleSaveChangesAndClose}>
          <X size={18} />
        </button>
      </div>

      <div className={styles.searchBox}>
        <Search size={16} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Buscar colección"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <button
        className={styles.createBtn}
        onClick={handleCreateWithSessionName}
      >
        <Plus size={18} />
        Crear colección
      </button>

      <ul className={styles.collectionList}>
        {filteredCollections.map((col) => {
          const isSavedHere = localSelections.has(col.id);

          return (
            <li
              key={col.id}
              className={styles.collectionItem}
              onClick={() => toggleLocalSelection(col.id)}
              style={{ cursor: "pointer" }}
            >
              {col.id === FAVORITES_ID ? (
                <div className={styles.favoritesIconWrapper}>
                  <Heart size={20} color="white" fill="white" />
                </div>
              ) : (
                <img
                  src={col.img}
                  alt=""
                  className={styles.collectionIconImg}
                />
              )}
              <div className={styles.collectionText}>
                <span>{col.name}</span>
                <span className={styles.collectionSpan}>{col.span}</span>
              </div>

              {isSavedHere && (
                <CircleCheck
                  size={18}
                  strokeWidth={2}
                  color="#1ed760"
                  style={{ marginLeft: "auto" }}
                />
              )}
            </li>
          );
        })}
      </ul>

      <button className={styles.doneBtn} onClick={handleSaveChangesAndClose}>
        Hecho
      </button>
    </div>
  );
}
