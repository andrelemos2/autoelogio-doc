"use client";

import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Feito, Categoria, Conquista, Feedback } from "../types";
import styles from "./FeitoForm.module.css";

interface FeitoFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (feito: Omit<Feito, "id" | "createdAt"> & { id?: string }) => void;
  itemParaEditar: Feito | null;
}

const CATEGORIES: { value: Categoria; label: string }[] = [
  { value: "projeto", label: "Projeto" },
  { value: "aprendizado", label: "Aprendizado" },
  { value: "certificacao", label: "Certificação" },
  { value: "feedback", label: "Feedback" },
  { value: "outros", label: "Outros" }
];

export default function FeitoForm({ isOpen, onClose, onSave, itemParaEditar }: FeitoFormProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Estados comuns do formulário
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState<Categoria>("projeto");
  const [data, setData] = useState("");
  const [linkReferencia, setLinkReferencia] = useState("");
  
  // Estado específico para conquistas (projeto, aprendizado, certificação, outros)
  const [impacto, setImpacto] = useState("");
  
  // Estados específicos para feedback
  const [autor, setAutor] = useState("");
  const [conteudo, setConteudo] = useState("");

  // Estados de erro
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Obter data de hoje no formato YYYY-MM-DD
  const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  // Carregar dados para edição
  useEffect(() => {
    if (isOpen) {
      if (itemParaEditar) {
        setTitulo(itemParaEditar.titulo);
        setDescricao(itemParaEditar.descricao);
        setCategoria(itemParaEditar.categoria);
        setData(itemParaEditar.data);
        setLinkReferencia(itemParaEditar.linkReferencia || "");
        setErrors({});

        if (itemParaEditar.categoria === "feedback") {
          setAutor(itemParaEditar.autor || "");
          setConteudo(itemParaEditar.conteudo || "");
          setImpacto("");
        } else {
          setImpacto((itemParaEditar as Conquista).impacto || "");
          setAutor("");
          setConteudo("");
        }
      } else {
        // Modo criação: resetar campos
        setTitulo("");
        setDescricao("");
        setCategoria("projeto");
        setData(getTodayString());
        setLinkReferencia("");
        setImpacto("");
        setAutor("");
        setConteudo("");
        setErrors({});
      }
    }
  }, [isOpen, itemParaEditar]);

  // Fechar com a tecla ESC
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

  // Fechar clicando fora
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  // Validação e Envio
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!titulo.trim()) newErrors.titulo = "Título é obrigatório.";
    if (!descricao.trim()) newErrors.descricao = "Descrição é obrigatória.";
    if (!data) newErrors.data = "Data é obrigatória.";

    if (linkReferencia.trim()) {
      const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
      if (!urlPattern.test(linkReferencia.trim())) {
        newErrors.linkReferencia = "Insira uma URL válida (deve conter http:// ou https://).";
      }
    }

    if (categoria === "feedback") {
      if (!autor.trim()) newErrors.autor = "Nome do autor é obrigatório.";
      if (!conteudo.trim()) newErrors.conteudo = "Conteúdo do feedback é obrigatório.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Preparar payload com base na categoria
    const payload: Omit<Feito, "id" | "createdAt"> & { id?: string } = {
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      categoria,
      data,
      linkReferencia: linkReferencia.trim() || undefined,
      ...(itemParaEditar ? { id: itemParaEditar.id } : {})
    };

    if (categoria === "feedback") {
      (payload as Omit<Feedback, "id" | "createdAt"> & { id?: string }).autor = autor.trim();
      (payload as Omit<Feedback, "id" | "createdAt"> & { id?: string }).conteudo = conteudo.trim();
    } else {
      (payload as Omit<Conquista, "id" | "createdAt"> & { id?: string }).impacto = impacto.trim() || undefined;
    }

    onSave(payload);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div 
        ref={modalRef} 
        className={`${styles.modal} animate-fade-in`}
        role="dialog"
        aria-modal="true"
      >
        <button 
          onClick={onClose} 
          className={styles.closeButton} 
          aria-label="Fechar modal"
          type="button"
        >
          <X size={20} />
        </button>

        <h2 className={styles.title}>
          {itemParaEditar ? "Editar Registro" : "Novo Registro"}
        </h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>
                Categoria <span className={styles.required}>*</span>
              </label>
              <select
                className={styles.select}
                value={categoria}
                onChange={(e) => setCategoria(e.target.value as Categoria)}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>
                Data <span className={styles.required}>*</span>
              </label>
              <input
                type="date"
                className={styles.input}
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
              {errors.data && <span className={styles.errorText}>{errors.data}</span>}
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              Título / Conquista <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              className={styles.input}
              placeholder="Ex: Lançamento do novo dashboard"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            {errors.titulo && <span className={styles.errorText}>{errors.titulo}</span>}
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              Descrição detalhada <span className={styles.required}>*</span>
            </label>
            <textarea
              className={styles.textarea}
              placeholder="Descreva o que foi feito, o contexto ou o progresso..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            {errors.descricao && <span className={styles.errorText}>{errors.descricao}</span>}
          </div>

          {/* Renderização Condicional baseada na categoria selecionada */}
          {categoria === "feedback" ? (
            <>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  Autor do Feedback <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Ex: Sarah Connor (Tech Lead)"
                  value={autor}
                  onChange={(e) => setAutor(e.target.value)}
                />
                {errors.autor && <span className={styles.errorText}>{errors.autor}</span>}
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  Depoimento do Feedback <span className={styles.required}>*</span>
                </label>
                <textarea
                  className={styles.textarea}
                  placeholder="Cole o elogio ou feedback na íntegra..."
                  value={conteudo}
                  onChange={(e) => setConteudo(e.target.value)}
                />
                {errors.conteudo && <span className={styles.errorText}>{errors.conteudo}</span>}
              </div>
            </>
          ) : (
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Impacto / Resultados obtidos</label>
              <textarea
                className={styles.textarea}
                placeholder="Ex: Redução de 20% no uso de CPU ou aumento de satisfação do time"
                value={impacto}
                onChange={(e) => setImpacto(e.target.value)}
              />
              <span className={styles.helperText}>Opcional. Adicione métricas ou resultados que provam o impacto do feito.</span>
            </div>
          )}

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Link de Referência</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Ex: https://github.com/empresa/projeto"
              value={linkReferencia}
              onChange={(e) => setLinkReferencia(e.target.value)}
            />
            {errors.linkReferencia && <span className={styles.errorText}>{errors.linkReferencia}</span>}
            <span className={styles.helperText}>Opcional. Link para pull request, apresentação ou repositório.</span>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              onClick={onClose}
              className={`${styles.btn} ${styles.btnSecondary}`}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`${styles.btn} ${styles.btnPrimary}`}
            >
              {itemParaEditar ? "Salvar Alterações" : "Adicionar Registro"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
