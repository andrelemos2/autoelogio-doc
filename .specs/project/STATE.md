# Estado

**Última Atualização:** 2026-06-04T23:22:00-03:00
**Trabalho Atual:** Setup e Inicialização do Projeto

---

## Decisões Recentes (Últimos 60 dias)

### AD-001: Arquitetura Next.js App Router (2026-06-04)

**Decisão:** Utilização do Next.js com App Router.
**Motivo:** Facilita a criação de rotas de API robustas no mesmo repositório para a integração segura com a Google Sheets API (evitando expor credenciais privadas do Google no frontend cliente).
**Trade-off (Perda/Ganho):** Um pouco mais de complexidade inicial de configuração que um app React puro, mas ganho de segurança com as rotas de servidor e Server Actions.
**Impacto:** Estrutura do projeto seguirá a convenção do Next.js App Router.

### AD-002: Armazenamento em Google Sheets para Portabilidade (2026-06-04)

**Decisão:** Uso do Google Sheets como banco de dados principal.
**Motivo:** Requisito do MVP para que os dados do usuário fiquem em sua própria planilha, garantindo controle total dos dados e sem custos de infraestrutura de banco de dados.
**Trade-off (Perda/Ganho):** Limitação em consultas complexas ou relacionamentos pesados, mas perfeitamente adequado para uma lista linear de conquistas/feedbacks.
**Impacto:** A v1 lerá e escreverá linhas em uma planilha estruturada.

---

## Impedimentos Ativos

*(Nenhum impedimento ativo no momento.)*

---

## Lições Aprendidas

*(Nenhuma lição registrada ainda.)*

---

## Tarefas Rápidas Concluídas

| # | Descrição | Data | Commit | Status |
| :--- | :--- | :--- | :--- | :--- |
| 001 | Inicialização das especificações do projeto (PROJECT.md, ROADMAP.md) | 2026-06-04 | - | ✅ Concluído |

---

## Ideias Postergadas

- [ ] **Integração com IA (Gemini):** Botão para gerar um resumo executivo formatado para ciclos de avaliação de desempenho a partir dos registros cadastrados.
- [ ] **Exportação para PDF/Markdown:** Permitir exportar as conquistas filtradas em formato pronto para apresentação ou impressão.

---

## Todos (Tarefas a Fazer)

- [ ] Configurar o projeto Next.js no workspace.
- [ ] Definir a estrutura de diretórios e o CSS base (Design Tokens).
- [ ] Implementar a interface do painel (dashboard) principal.

---

## Preferências

**Dica de Modelo Exibida:** never
