"use client";

import React, { useEffect, useRef } from "react";
import { AlertTriangle } from "lucide-react";
import styles from "./DeleteConfirm.module.css";

interface DeleteConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemTitle: string;
}

export default function DeleteConfirm({ isOpen, onClose, onConfirm, itemTitle }: DeleteConfirmProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Fechar ao pressionar ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Fechar ao clicar no overlay
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div 
        ref={containerRef} 
        className={`${styles.modal} animate-fade-in`}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-confirm-title"
        aria-describedby="delete-confirm-desc"
      >
        <div className={styles.iconWrapper}>
          <AlertTriangle size={24} />
        </div>

        <h3 id="delete-confirm-title" className={styles.title}>
          Excluir Registro
        </h3>
        
        <p id="delete-confirm-desc" className={styles.message}>
          Tem certeza de que deseja remover permanentemente este registro do seu brag document? Esta ação não pode ser desfeita.
          <span className={styles.itemTitle}>&ldquo;{itemTitle}&rdquo;</span>
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={onClose}
            className={`${styles.btn} ${styles.btnCancel}`}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`${styles.btn} ${styles.btnConfirm}`}
          >
            Confirmar Exclusão
          </button>
        </div>
      </div>
    </div>
  );
}
