# Tarefas de Core CRUD e Dashboard

**Design**: `.specs/features/core-crud/design.md`
**Status**: Rascunho

---

## Plano de Execução

### Fase 1: Fundação (Sequencial)

T1 (CSS Globais e Layout Base) e T2 (Modelos de Dados) criam a fundação do projeto.

T1, T2

### Fase 2: Componentes Individuais (Paralelismo OK)

T3, T5 e T6 podem ser desenvolvidos independentemente depois que T2 (Tipos) estiver pronto. T4 depende do card (T3).

     ┌→ T3 ──→ T4 ─┐
T2 ──┼→ T5 ────────┼──→ T7
     └→ T6 ────────┘
T1 ────────────────┘

### Fase 3: Integração (Sequencial)

T7 integra todos os componentes e gerencia o estado e persistência local no `page.tsx`.

T7

---

## Detalhamento das Tarefas

### T1: Configurar Variáveis de Estilo CSS Globais e Layout Base

- **O quê**: Definir variáveis CSS de cores HSL para o tema escuro premium (fundo, bordas, texto, acentos de categoria) e configurar o layout do app.
- **Onde**: `src/app/globals.css`, `src/app/layout.tsx`
- **Depende de**: Nenhum
- **Reaproveita**: NONE
- **Requisito**: CORE-08
- **Ferramentas**:
  - MCP: `filesystem`
  - Skill: `modern-web-guidance`
- **Concluído quando**:
  - [ ] `globals.css` modificado com variáveis HSL de dark mode, reset de CSS moderno, estilos de fontes e scrollbar estilizada.
  - [ ] `layout.tsx` atualizado com metadados do projeto, importação de fonte premium (ex: Inter/Outfit via Google Fonts) e estrutura base de container.
  - [ ] Comando de compilação passa: `npm run build`
- **Testes**: none
- **Gate**: build
- **Commit**: `style: configure design system css variables and layout base`

---

### T2: Definir Tipos TypeScript de Feito e Mock de Dados

- **O quê**: Criar as interfaces do TypeScript que modelam os feitos (Conquistas e Feedbacks) e mock com dados realistas para testes.
- **Onde**: `src/app/types.ts`
- **Depende de**: Nenhum
- **Reaproveita**: NONE
- **Requisito**: CORE-01
- **Ferramentas**:
  - MCP: `filesystem`
  - Skill: NONE
- **Concluído quando**:
  - [ ] Arquivo `types.ts` criado com os tipos `Categoria`, `FeitoBase`, `Conquista`, `Feedback` e o tipo união `Feito`.
  - [ ] Exportação de uma constante `MOCK_FEITOS: Feito[]` contendo exemplos de conquistas e feedbacks reais e variados para validação na UI.
  - [ ] Compilação de tipos TypeScript passa com sucesso.
- **Testes**: none
- **Gate**: build
- **Commit**: `chore: define types and mock data for accomplishments`

---

### T3: Criar Componente `FeitoCard` [P]

- **O quê**: Implementar o card de exibição individual de conquistas e feedbacks profissionais, adaptando ícones e tags de acordo com a categoria.
- **Onde**: `src/app/components/FeitoCard.tsx`, `src/app/components/FeitoCard.module.css`
- **Depende de**: T2
- **Reaproveita**: NONE
- **Requisito**: CORE-01, CORE-08
- **Ferramentas**:
  - MCP: `filesystem`
  - Skill: `modern-web-guidance`
- **Concluído quando**:
  - [ ] `FeitoCard` exibe de forma diferenciada conquistas (impacto/resultados) e feedbacks (autor e depoimento).
  - [ ] Aplicação de bordas de gradiente, sombras de cor de destaque e hover suave com Glassmorphism.
  - [ ] Ícones dinâmicos via `lucide-react` para cada categoria.
  - [ ] Links de referência funcionais e estilizados de forma limpa.
- **Testes**: none
- **Gate**: build
- **Commit**: `feat: create FeitoCard component for individual items`

---

### T4: Criar Componente `Timeline` [P]

- **O quê**: Criar o feed/linha do tempo vertical que agrupa os cards por data e desenha a linha de timeline.
- **Onde**: `src/app/components/Timeline.tsx`, `src/app/components/Timeline.module.css`
- **Depende de**: T3
- **Reaproveita**: NONE
- **Requisito**: CORE-01
- **Ferramentas**:
  - MCP: `filesystem`
  - Skill: `modern-web-guidance`
- **Concluído quando**:
  - [ ] Componente renderiza uma linha vertical central ou lateral conectando os cards.
  - [ ] Cada card tem um ponto indicador circular sobreposto à linha na categoria correspondente.
  - [ ] Agrupa ou ordena os feitos cronologicamente de forma correta.
- **Testes**: none
- **Gate**: build
- **Commit**: `feat: create Timeline component to connect and display cards`

---

### T5: Criar Componente `FeitoForm` [P]

- **O quê**: Criar o formulário em modal para cadastro e edição, contendo campos condicionais baseados na categoria selecionada.
- **Onde**: `src/app/components/FeitoForm.tsx`, `src/app/components/FeitoForm.module.css`
- **Depende de**: T2
- **Reaproveita**: NONE
- **Requisito**: CORE-04, CORE-05
- **Ferramentas**:
  - MCP: `filesystem`
  - Skill: `modern-web-guidance`
- **Concluído quando**:
  - [ ] Modal com overlay que pode ser fechado via clique externo ou tecla ESC.
  - [ ] Formulário que muda dinamicamente: se categoria for "feedback", esconde "impacto" e mostra "autor do feedback" e "texto do feedback".
  - [ ] Suporte a preenchimento de dados de um item existente para edição.
  - [ ] Validações básicas (campos obrigatórios, links válidos).
- **Testes**: none
- **Gate**: build
- **Commit**: `feat: create FeitoForm modal with dynamic inputs`

---

### T6: Criar Componente `DeleteConfirm` [P]

- **O quê**: Criar o modal de confirmação de exclusão de registros.
- **Onde**: `src/app/components/DeleteConfirm.tsx`, `src/app/components/DeleteConfirm.module.css`
- **Depende de**: Nenhum
- **Reaproveita**: NONE
- **Requisito**: CORE-06
- **Ferramentas**:
  - MCP: `filesystem`
  - Skill: NONE
- **Concluído quando**:
  - [ ] Modal de overlay focado e acessível.
  - [ ] Mostra o título do item que está prestes a ser removido.
  - [ ] Botões de ação claros ("Confirmar Exclusão" com destaque destrutivo, "Cancelar").
- **Testes**: none
- **Gate**: build
- **Commit**: `feat: create DeleteConfirm confirmation modal`

---

### T7: Integrar Estado Principal, Filtros, Busca e LocalStorage no `page.tsx`

- **O quê**: Orquestrar a tela principal conectando os componentes, filtros por categoria, busca textual, CRUD, estados vazios e persistência com LocalStorage.
- **Onde**: `src/app/page.tsx`, `src/app/page.module.css`
- **Depende de**: T1, T2, T4, T5, T6
- **Reaproveita**: `MOCK_FEITOS`
- **Requisito**: CORE-01, CORE-02, CORE-03, CORE-07
- **Ferramentas**:
  - MCP: `filesystem`
  - Skill: `modern-web-guidance`
- **Concluído quando**:
  - [ ] Lê os feitos iniciais do LocalStorage; caso esteja vazio na primeira execução, carrega o `MOCK_FEITOS` para demonstrar o app.
  - [ ] Sincroniza todas as adições, edições e exclusões no LocalStorage imediatamente.
  - [ ] Implementa busca em tempo real (filtra título/descrição) e filtros por categoria.
  - [ ] Exibe cabeçalho elegante com contador de conquistas/feedbacks por categoria.
  - [ ] Renderiza um Empty State premium se o usuário limpar todos os registros ou se a busca não retornar nada.
  - [ ] `npm run build` e `npm run lint` executados sem erros.
- **Testes**: none
- **Gate**: build
- **Commit**: `feat: integrate all components, filters, search, and localstorage in page`

---

## Mapa de Execução Paralela

```
Fase 1 (Sequencial):
  T1 ──────┐
  T2 ──→ T3 ──→ T4 ─┐
         ├──→ T5 ───┼─→ T7
         └──→ T6 ───┘
```

---

## Verificação de Granularidade das Tarefas

| Tarefa | Escopo | Status |
| :--- | :--- | :--- |
| T1 | Variáveis de Estilo e Layout Base | ✅ Granular |
| T2 | Arquivo de Tipos TS e Mock | ✅ Granular |
| T3 | Componente Card | ✅ Granular |
| T4 | Componente Timeline | ✅ Granular |
| T5 | Componente Formulário | ✅ Granular |
| T6 | Componente Modal de Confirmação | ✅ Granular |
| T7 | Orquestrador Principal | ✅ Granular |

---

## Validação Cruzada entre Diagrama e Definições

| Tarefa | Depende De (corpo da tarefa) | Diagrama Mostra | Status |
| :--- | :--- | :--- | :--- |
| T1 | Nenhum | Nenhum | ✅ Coincide |
| T2 | Nenhum | Nenhum | ✅ Coincide |
| T3 | T2 | T2 | ✅ Coincide |
| T4 | T3 | T3 | ✅ Coincide |
| T5 | T2 | T2 | ✅ Coincide |
| T6 | Nenhum | Nenhum | ✅ Coincide |
| T7 | T1, T2, T4, T5, T6 | T1, T2, T4, T5, T6 | ✅ Coincide |

---

## Validação de Co-localização de Testes

| Tarefa | Camada de Código Criada/Modificada | Matriz Exige | A Tarefa Diz | Status |
| :--- | :--- | :--- | :--- | :--- |
| T1 | UI / Layout | none | none | ✅ OK |
| T2 | Types | none | none | ✅ OK |
| T3 | Componente React | none | none | ✅ OK |
| T4 | Componente React | none | none | ✅ OK |
| T5 | Componente React | none | none | ✅ OK |
| T6 | Componente React | none | none | ✅ OK |
| T7 | Componente React / State | none | none | ✅ OK |
