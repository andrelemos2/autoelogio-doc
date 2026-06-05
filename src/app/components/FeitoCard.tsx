"use client";

import React from "react";
import { 
  Briefcase, 
  BookOpen, 
  Award, 
  MessageSquare, 
  Sparkles, 
  ExternalLink, 
  Pencil, 
  Trash2,
  LucideIcon
} from "lucide-react";
import { Feito, Categoria } from "../types";
import styles from "./FeitoCard.module.css";

interface FeitoCardProps {
  feito: Feito;
  onEdit: () => void;
  onDelete: () => void;
}

// Mapeamento de categorias para cores e RGB
const CATEGORY_META: Record<Categoria, { label: string; color: string; rgb: string; icon: LucideIcon }> = {
  projeto: {
    label: "Projeto",
    color: "var(--accent-projeto)",
    rgb: "139, 92, 246", // Roxo / Violeta
    icon: Briefcase
  },
  aprendizado: {
    label: "Aprendizado",
    color: "var(--accent-aprendizado)",
    rgb: "6, 182, 212", // Ciano
    icon: BookOpen
  },
  certificacao: {
    label: "Certificação",
    color: "var(--accent-certificacao)",
    rgb: "16, 185, 129", // Esmeralda / Verde
    icon: Award
  },
  feedback: {
    label: "Feedback",
    color: "var(--accent-feedback)",
    rgb: "236, 72, 153", // Rosa / Pink
    icon: MessageSquare
  },
  outros: {
    label: "Outros",
    color: "var(--accent-outros)",
    rgb: "245, 158, 11", // Laranja
    icon: Sparkles
  }
};

// Formatação simples de data YYYY-MM-DD para DD/MM/YYYY
const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
};

export default function FeitoCard({ feito, onEdit, onDelete }: FeitoCardProps) {
  const meta = CATEGORY_META[feito.categoria] || CATEGORY_META.outros;
  const IconComponent = meta.icon;

  // Variáveis CSS injetadas no card para hover glow e tag styling
  const customStyles = {
    "--category-color": meta.color,
    "--category-color-rgb": meta.rgb,
  } as React.CSSProperties;

  return (
    <div 
      className={`${styles.card} animate-slide-up`} 
      style={customStyles}
    >
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.iconWrapper}>
            <IconComponent size={20} />
          </div>
          <div>
            <span className={styles.categoryTag}>{meta.label}</span>
          </div>
        </div>
        <span className={styles.date}>{formatDate(feito.data)}</span>
      </div>

      <h3 className={styles.title}>{feito.titulo}</h3>
      <p className={styles.description}>{feito.descricao}</p>

      {/* Renderização Condicional com base no tipo de feito */}
      {feito.categoria === "feedback" ? (
        <div className={styles.feedbackBox}>
          <p className={styles.quoteContent}>
            &ldquo;{feito.conteudo}&rdquo;
          </p>
          <span className={styles.feedbackAuthor}>— {feito.autor}</span>
        </div>
      ) : (
        feito.impacto && (
          <div className={styles.impactBox}>
            <span className={styles.impactLabel}>Impacto & Resultados</span>
            <p className={styles.impactContent}>{feito.impacto}</p>
          </div>
        )
      )}

      <div className={styles.footer}>
        {feito.linkReferencia ? (
          <a 
            href={feito.linkReferencia} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.referenceLink}
          >
            <ExternalLink size={14} />
            <span>Referência</span>
          </a>
        ) : (
          <div /> // Espaçador
        )}

        <div className={styles.actions}>
          <button 
            type="button" 
            onClick={onEdit} 
            className={styles.actionButton}
            title="Editar registro"
          >
            <Pencil size={14} />
          </button>
          <button 
            type="button" 
            onClick={onDelete} 
            className={`${styles.actionButton} ${styles.deleteButton}`}
            title="Deletar registro"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
