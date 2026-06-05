# Roadmap

**Marco Atual:** M1: Setup e Interface Base (Mocked/LocalStorage)
**Status:** Planejamento

---

## M1: Setup e Interface Base (Mocked/LocalStorage)

**Objetivo:** Ter a aplicação web rodando com toda a interface responsiva e premium, permitindo criar, editar, excluir e filtrar conquistas localmente (armazenadas em mock state ou LocalStorage) para validar a experiência do usuário.
**Meta:** Conclusão rápida para validação visual.

### Funcionalidades

**[Setup Inicial]** - PLANEJADO
- Inicialização do projeto Next.js com TypeScript e estrutura de pastas.
- Criação dos arquivos de configuração CSS e Design Tokens.

**[Dashboard / Linha do Tempo]** - PLANEJADO
- Tela inicial com lista de conquistas e feedbacks organizados cronologicamente.
- Busca em tempo real por título/descrição.
- Filtro por categoria (Projeto, Feedback, Aprendizado, Certificação, Outros).

**[CRUD de Conquistas/Feedbacks]** - PLANEJADO
- Formulário intuitivo para cadastrar novas conquistas (Título, Descrição, Categoria, Data, Impacto/Resultados, Link de Referência).
- Formulário para cadastrar Feedbacks (Quem deu, Conteúdo, Data, Link/Contexto).
- Funcionalidade de Edição e Exclusão (com confirmação).

---

## M2: Integração com Google Sheets

**Objetivo:** Conectar a aplicação com a planilha do Google Sheets do usuário para tornar o armazenamento persistente e portátil.
**Meta:** Sincronização em tempo real de leitura e escrita.

### Funcionalidades

**[Configuração da Conectividade]** - PLANEJADO
- Tela de configurações para inserir as chaves de acesso (Spreadsheet ID, Service Account Credentials ou API Key).
- Tela de validação de conexão ("Testar Conexão").

**[Leitura e Persistência via Sheets]** - PLANEJADO
- Rotas de API no Next.js para ler dados do Google Sheets e alimentar o Dashboard.
- Rotas de API para salvar, editar e excluir registros nas linhas da planilha.
- Tratamento de concorrência e carregamento (loading states) elegante.

---

## M3: Refinamentos e UX Premium

**Objetivo:** Elevar o design para o nível "Premium" e realizar o deploy do MVP.
**Meta:** Interface polida com micro-animações, design responsivo de alta fidelidade e deploy funcional.

### Funcionalidades

**[UX & Animações Premium]** - PLANEJADO
- Micro-animações em botões, transições de páginas e abertura de modais.
- Efeitos visuais modernos (Glassmorphism, gradientes sutis, dark mode calibrado).

**[Deploy e Documentação]** - PLANEJADO
- Configuração para deploy rápido (Vercel ou Firebase App Hosting).
- README atualizado com instruções passo a passo para criar a planilha no Google Sheets e obter as credenciais necessárias.

---

## Considerações Futuras

- **Autenticação Google OAuth:** Permitir que o usuário apenas faça login com o Google e a aplicação crie/acesse a planilha automaticamente, sem precisar configurar credenciais manuais.
- **Exportação facilitada:** Exportar em PDF formatado ou Markdown para colar diretamente no formulário de avaliação da empresa.
- **Geração de Resumo por IA:** Um botão para resumir as conquistas selecionadas usando a API do Gemini.
