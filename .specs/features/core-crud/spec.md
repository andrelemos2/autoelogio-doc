# Especificação do Core CRUD e Dashboard (M1)

## Descrição do Problema

Profissionais precisam de uma maneira rápida e centralizada para registrar suas conquistas diárias, projetos concluídos e feedbacks positivos. Sem uma interface dedicada e intuitiva, esses registros se perdem em anotações esparsas ou são esquecidos. O Core CRUD e Dashboard resolvem isso oferecendo um portal responsivo para visualização, busca e manipulação desses dados.

## Objetivos

- [ ] Disponibilizar um Dashboard em formato de linha do tempo ou feed visual organizado.
- [ ] Oferecer um formulário de cadastro simplificado com campos relevantes para conquistas e feedbacks.
- [ ] Implementar persistência local temporária (LocalStorage) para validar o fluxo do MVP antes de integrar com o Google Sheets.

## Fora do Escopo

| Funcionalidade | Motivo |
| :--- | :--- |
| Conexão direta com Google Sheets | Reservada para o Marco 2 (M2) |
| Sincronização em tempo real multi-dispositivo | Requer backend/autenticação complexa, fora do escopo do MVP |

---

## Histórias de Usuário

### P1: Dashboard Principal ⭐ MVP

**História de Usuário**: Como profissional avaliado, quero visualizar uma linha do tempo das minhas conquistas e feedbacks organizados cronologicamente, para que eu possa recapitular meu progresso de forma rápida.

**Por que P1**: É a tela principal de consumo das informações; o usuário precisa ver o que já registrou.

**Critérios de Aceitação**:
1. QUANDO o usuário acessa a página inicial, ENTÃO o sistema DEVE renderizar uma linha do tempo vertical com todos os registros ordenados do mais recente ao mais antigo.
2. QUANDO a lista estiver vazia, ENTÃO o sistema DEVE exibir um estado vazio (empty state) elegante, contendo uma ilustração/ícone e um botão de ação rápida para criar o primeiro registro.
3. QUANDO o usuário digita na barra de busca, ENTÃO o sistema DEVE filtrar os registros exibidos em tempo real pelo título, descrição ou tags.
4. QUANDO o usuário seleciona um filtro de categoria, ENTÃO o sistema DEVE exibir apenas os registros daquela categoria (ex: Projetos, Feedbacks, Certificações, Liderança).

**Teste Independente**:
- Abrir a página inicial vazia e ver a mensagem amigável.
- Cadastrar 3 itens (2 Projetos e 1 Feedback) e validar se aparecem ordenados por data.
- Buscar pelo título de um deles e ver se a lista filtra corretamente.
- Filtrar por "Feedbacks" e ver apenas o item correspondente.

---

### P1: Cadastro, Edição e Exclusão (CRUD) com LocalStorage ⭐ MVP

**História de Usuário**: Como profissional, quero poder adicionar, editar detalhes e excluir registros de conquistas ou feedbacks, para que meu brag document se mantenha atualizado e correto.

**Por que P1**: Sem a capacidade de adicionar ou modificar dados, a ferramenta não possui utilidade.

**Critérios de Aceitação**:
1. QUANDO o usuário clica em "Adicionar", ENTÃO o sistema DEVE abrir um modal ou formulário lateral responsivo com os campos: Título, Descrição, Categoria, Data, Impacto/Resultado (opcional), Link de Referência (opcional).
2. QUANDO o usuário seleciona a categoria "Feedback", ENTÃO o formulário DEVE exibir campos específicos: "Autor do Feedback" e "Texto do Feedback" (ao invés de impacto/resultado).
3. QUANDO o usuário envia o formulário preenchido corretamente, ENTÃO o sistema DEVE salvar o registro no LocalStorage, fechar o formulário e atualizar o Dashboard imediatamente com um feedback visual (toast ou notificação).
4. QUANDO o usuário clica no botão de editar em um card, ENTÃO o formulário DEVE abrir preenchido com as informações atuais para alteração.
5. QUANDO o usuário clica em excluir, ENTÃO o sistema DEVE solicitar confirmação em um modal antes de remover permanentemente o registro e atualizar a lista.

**Teste Independente**:
- Clicar em "Novo Registro", preencher os dados e submeter. Verificar se o novo card é exibido no Dashboard e se persiste após atualizar a página (F5).
- Editar o título do card criado e conferir se a alteração foi persistida no Dashboard e no LocalStorage.
- Clicar em deletar, cancelar no modal de confirmação e garantir que o item permaneça. Clicar novamente, confirmar e verificar se o item desaparece da tela e do LocalStorage.

---

### P2: Micro-Interações e Tema Escuro Calibrado

**História de Usuário**: Como entusiasta de design moderno, quero uma interface com tema escuro elegante, contraste calibrado e micro-transições fluidas, para que o uso do aplicativo seja prazeroso e pareça um produto de alto padrão.

**Por que P2**: Melhora a satisfação do usuário e atende aos requisitos de estética rica e premium do projeto.

**Critérios de Aceitação**:
1. QUANDO o usuário passa o mouse (hover) sobre os botões e cards, ENTÃO eles DEVEM ter uma transição suave de escala ou cor de fundo (micro-interações).
2. QUANDO um modal é aberto ou fechado, ENTÃO o sistema DEVE animar sua entrada/saída (fade-in, slide-up).
3. O tema escuro DEVE utilizar paleta de cores harmoniosa baseada em tons de cinza escuro/azul ardósia (slate/zinc) com detalhes de destaque vibrantes (violeta, ciano ou esmeralda), garantindo legibilidade e conformidade com contraste de acessibilidade.

**Teste Independente**:
- Verificar visualmente as transições ao passar o cursor pelos elementos interativos.
- Abrir e fechar o formulário de cadastro observando as animações.

---

## Casos de Borda

- **Dados Corrompidos no LocalStorage:** QUANDO a leitura do LocalStorage falhar ou o formato dos dados for inválido, ENTÃO o sistema DEVE resetar o estado de forma segura (para array vazio) sem quebrar o carregamento da página inteira.
- **Campos Muito Longos:** QUANDO o título ou a descrição do feito forem extremamente longos, ENTÃO o layout do card DEVE truncar os textos graciosamente (ex: `line-clamp` de CSS) ou expandir sem quebrar o alinhamento grid/flex da página.
- **Data Futura:** QUANDO o usuário inserir uma data futura no formulário, ENTÃO a validação do formulário DEVE emitir um aviso alertando o usuário (embora possa permitir se for um plano).

---

## Rastreabilidade de Requisitos

| ID do Requisito | História | Fase | Status |
| :--- | :--- | :--- | :--- |
| CORE-01 | P1: Dashboard Principal | Especificar | Em Design |
| CORE-02 | P1: Filtros de Categoria | Especificar | Em Design |
| CORE-03 | P1: Busca em Tempo Real | Especificar | Em Design |
| CORE-04 | P1: Cadastro de Registro (Formulário) | Especificar | Em Design |
| CORE-05 | P1: Edição de Registro | Especificar | Em Design |
| CORE-06 | P1: Exclusão com Modal de Confirmação | Especificar | Em Design |
| CORE-07 | P1: Persistência em LocalStorage | Especificar | Em Design |
| CORE-08 | P2: Micro-Interações & Tema Escuro Premium | Especificar | Em Design |

**Cobertura:** 8 requisitos totais, 8 mapeados para especificação, 0 pendentes.

---

## Critérios de Sucesso

- [ ] O usuário consegue cadastrar um novo feito em menos de 15 segundos.
- [ ] O dashboard carrega instantaneamente (< 100ms) no carregamento local do cliente.
- [ ] A interface passa no teste visual de responsividade em dispositivos móveis (360px de largura) e desktops (1920px).
