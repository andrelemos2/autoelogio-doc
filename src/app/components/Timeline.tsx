"use client";

import React from "react";
import { Feito, Categoria } from "../types";
import FeitoCard from "./FeitoCard";
import styles from "./Timeline.module.css";

interface TimelineProps {
  feitos: Feito[];
  onEdit: (feito: Feito) => void;
  onDelete: (id: string) => void;
}

// Mapeamento simples de cores HSL e RGB para o ponto indicador
const CATEGORY_STYLES: Record<Categoria, { color: string; rgb: string }> = {
  projeto: { color: "var(--accent-projeto)", rgb: "139, 92, 246" },
  aprendizado: { color: "var(--accent-aprendizado)", rgb: "6, 182, 212" },
  certificacao: { color: "var(--accent-certificacao)", rgb: "16, 185, 129" },
  feedback: { color: "var(--accent-feedback)", rgb: "236, 72, 153" },
  outros: { color: "var(--accent-outros)", rgb: "245, 158, 11" }
};

export default function Timeline({ feitos, onEdit, onDelete }: TimelineProps) {
  // Ordena os feitos cronologicamente de forma decrescente (mais recentes primeiro)
  const sortedFeitos = [...feitos].sort((a, b) => {
    // Primeiro compara pela data (YYYY-MM-DD)
    const dateCompare = b.data.localeCompare(a.data);
    if (dateCompare !== 0) return dateCompare;
    
    // Se a data for a mesma, usa createdAt (ISO string)
    return b.createdAt.localeCompare(a.createdAt);
  });

  return (
    <div className={styles.container}>
      {/* Linha vertical decorativa conectando os pontos */}
      <div className={styles.line} />

      <ul className={styles.timelineList}>
        {sortedFeitos.map((feito) => {
          const categoryStyle = CATEGORY_STYLES[feito.categoria] || CATEGORY_STYLES.outros;
          const nodeStyles = {
            "--category-color": categoryStyle.color,
            "--category-color-rgb": categoryStyle.rgb,
          } as React.CSSProperties;

          return (
            <li key={feito.id} className={styles.item}>
              {/* O ponto na linha do tempo */}
              <div className={styles.node} style={nodeStyles} />
              
              {/* O card com o conteúdo */}
              <FeitoCard
                feito={feito}
                onEdit={() => onEdit(feito)}
                onDelete={() => onDelete(feito.id)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
