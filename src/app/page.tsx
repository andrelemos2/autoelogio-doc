"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, Sparkles, PlusCircle } from "lucide-react";
import { Feito, Categoria, MOCK_FEITOS } from "./types";
import Timeline from "./components/Timeline";
import FeitoForm from "./components/FeitoForm";
import DeleteConfirm from "./components/DeleteConfirm";
import styles from "./page.module.css";

export default function Home() {
  const [feitos, setFeitos] = useState<Feito[]>([]);
  const [mounted, setMounted] = useState(false);

  // Estados de busca e filtros
  const [busca, setBusca] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState<Categoria | "todos">("todos");

  // Controle de modais
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [itemParaEditar, setItemParaEditar] = useState<Feito | null>(null);
  
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemParaDeletarId, setItemParaDeletarId] = useState<string | null>(null);

  // Estado para Toast de feedback visual
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Inicialização e leitura do LocalStorage após montagem do componente no cliente (evita quebra de hidratação)
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("autoelogio_feitos");
      if (stored) {
        setFeitos(JSON.parse(stored));
      } else {
        setFeitos(MOCK_FEITOS);
        localStorage.setItem("autoelogio_feitos", JSON.stringify(MOCK_FEITOS));
      }
    } catch (e) {
      console.error("Erro ao carregar dados do LocalStorage:", e);
      setFeitos(MOCK_FEITOS);
    }
  }, []);

  // Exibir toast temporário
  const showToast = (message: string) => {
    setToastMessage(message);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Salvar inserção ou edição
  const handleSave = (item: Omit<Feito, "id" | "createdAt"> & { id?: string }) => {
    let updated: Feito[];
    
    if (item.id) {
      // Modo Edição
      updated = feitos.map((f) => {
        if (f.id === item.id) {
          // Mantém id e createdAt originais, atualiza o resto
          return {
            ...f,
            ...item,
            id: f.id,
            createdAt: f.createdAt
          } as Feito;
        }
        return f;
      });
      showToast("Registro atualizado com sucesso!");
    } else {
      // Modo Criação
      const novoFeito: Feito = {
        ...item,
        id: `feito-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString()
      } as Feito;
      updated = [novoFeito, ...feitos];
      showToast("Novo registro adicionado!");
    }

    setFeitos(updated);
    localStorage.setItem("autoelogio_feitos", JSON.stringify(updated));
    setIsFormOpen(false);
    setItemParaEditar(null);
  };

  // Abrir modal de edição
  const handleEditInit = (feito: Feito) => {
    setItemParaEditar(feito);
    setIsFormOpen(true);
  };

  // Iniciar exclusão
  const handleDeleteInit = (id: string) => {
    setItemParaDeletarId(id);
    setIsDeleteOpen(true);
  };

  // Confirmar exclusão
  const handleConfirmDelete = () => {
    if (!itemParaDeletarId) return;
    
    const updated = feitos.filter((f) => f.id !== itemParaDeletarId);
    setFeitos(updated);
    localStorage.setItem("autoelogio_feitos", JSON.stringify(updated));
    setIsDeleteOpen(false);
    setItemParaDeletarId(null);
    showToast("Registro excluído com sucesso!");
  };

  // Título do item selecionado para excluir
  const itemDeletarTitulo = feitos.find(f => f.id === itemParaDeletarId)?.titulo || "";

  // Filtragem dos feitos
  const filteredFeitos = feitos.filter((feito) => {
    const matchesCategory = filtroCategoria === "todos" || feito.categoria === filtroCategoria;
    const matchesSearch = 
      feito.titulo.toLowerCase().includes(busca.toLowerCase()) || 
      feito.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      (feito.categoria === "feedback" && feito.autor.toLowerCase().includes(busca.toLowerCase()));
      
    return matchesCategory && matchesSearch;
  });

  // Métricas calculadas para o cabeçalho
  const totalCount = feitos.length;
  const projetosCount = feitos.filter((f) => f.categoria === "projeto").length;
  const aprendizadoCount = feitos.filter((f) => f.categoria === "aprendizado").length;
  const certificacaoCount = feitos.filter((f) => f.categoria === "certificacao").length;
  const feedbackCount = feitos.filter((f) => f.categoria === "feedback").length;

  if (!mounted) {
    return (
      <div className={styles.page}>
        <div className={styles.main}>
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)" }}>
            Carregando o seu brag document...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Cabeçalho */}
        <header className={styles.header}>
          <div className={styles.brand}>
            <h1 className={styles.title}>AutoElogio</h1>
            <p className={styles.subtitle}>Seu brag document pessoal e linha do tempo de conquistas.</p>
          </div>
          <button 
            onClick={() => {
              setItemParaEditar(null);
              setIsFormOpen(true);
            }} 
            className={styles.btnAdd}
            type="button"
          >
            <Plus size={18} />
            <span>Novo Registro</span>
          </button>
        </header>

        {/* Grade de Estatísticas */}
        <section className={styles.statsGrid} aria-label="Estatísticas de conquistas">
          <div className={styles.statCard}>
            <span className={styles.statValue}>{totalCount}</span>
            <span className={styles.statLabel}>Registros</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{projetosCount}</span>
            <span className={styles.statLabel}>Projetos</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{feedbackCount}</span>
            <span className={styles.statLabel}>Feedbacks</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{certificacaoCount}</span>
            <span className={styles.statLabel}>Certificados</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{aprendizadoCount}</span>
            <span className={styles.statLabel}>Estudos</span>
          </div>
        </section>

        {/* Barra de Filtros e Busca */}
        <section className={styles.toolbar} aria-label="Filtros e busca">
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} size={18} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Buscar por título, descrição ou autor do feedback..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <div className={styles.filterGroup}>
            <button
              onClick={() => setFiltroCategoria("todos")}
              className={`${styles.filterBtn} ${filtroCategoria === "todos" ? styles.filterBtnActive : ""}`}
              type="button"
            >
              Todos
            </button>
            <button
              onClick={() => setFiltroCategoria("projeto")}
              className={`${styles.filterBtn} ${filtroCategoria === "projeto" ? styles.filterBtnActive : ""}`}
              type="button"
            >
              Projetos
            </button>
            <button
              onClick={() => setFiltroCategoria("feedback")}
              className={`${styles.filterBtn} ${filtroCategoria === "feedback" ? styles.filterBtnActive : ""}`}
              type="button"
            >
              Feedbacks
            </button>
            <button
              onClick={() => setFiltroCategoria("certificacao")}
              className={`${styles.filterBtn} ${filtroCategoria === "certificacao" ? styles.filterBtnActive : ""}`}
              type="button"
            >
              Certificações
            </button>
            <button
              onClick={() => setFiltroCategoria("aprendizado")}
              className={`${styles.filterBtn} ${filtroCategoria === "aprendizado" ? styles.filterBtnActive : ""}`}
              type="button"
            >
              Aprendizados
            </button>
            <button
              onClick={() => setFiltroCategoria("outros")}
              className={`${styles.filterBtn} ${filtroCategoria === "outros" ? styles.filterBtnActive : ""}`}
              type="button"
            >
              Outros
            </button>
          </div>
        </section>

        {/* Listagem da Timeline ou Empty State */}
        {filteredFeitos.length > 0 ? (
          <Timeline
            feitos={filteredFeitos}
            onEdit={handleEditInit}
            onDelete={handleDeleteInit}
          />
        ) : (
          <div className={styles.emptyState}>
            <Sparkles className={styles.emptyIcon} size={48} />
            <h2 className={styles.emptyTitle}>Nenhum registro encontrado</h2>
            <p className={styles.emptyDesc}>
              {busca || filtroCategoria !== "todos" 
                ? "Nenhum resultado corresponde à sua busca ou filtro. Tente alterar as palavras-chave ou limpar os filtros."
                : "Seu brag document está vazio. Comece registrando sua primeira conquista ou feedback!"
              }
            </p>
            {!(busca || filtroCategoria !== "todos") && (
              <button
                onClick={() => {
                  setItemParaEditar(null);
                  setIsFormOpen(true);
                }}
                className={styles.btnAdd}
                type="button"
              >
                <PlusCircle size={16} />
                <span>Registrar meu primeiro feito</span>
              </button>
            )}
          </div>
        )}

        <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} AutoElogio. Projetado com foco em excelência profissional.</p>
        </footer>
      </main>

      {/* Formulário / Modal de Criação e Edição */}
      <FeitoForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setItemParaEditar(null);
        }}
        onSave={handleSave}
        itemParaEditar={itemParaEditar}
      />

      {/* Modal de Confirmação de Exclusão */}
      <DeleteConfirm
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setItemParaDeletarId(null);
        }}
        onConfirm={handleConfirmDelete}
        itemTitle={itemDeletarTitulo}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className={styles.toast} role="status" aria-live="polite">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
