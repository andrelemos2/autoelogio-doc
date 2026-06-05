<p align="center">
  <img src="https://img.shields.io/badge/App-Autoelogio%20Doc-blue?style=for-the-badge" alt="app badge" />
  <img src="https://img.shields.io/badge/Stack-Next.js%20%26%20TypeScript-black?style=for-the-badge" alt="stack" />
  <img src="https://img.shields.io/badge/Version-1.0.0-purple?style=for-the-badge" alt="version" />
</p>

<h1 align="center">🎯 Autoelogio-Doc</h1>

<p align="center">
  <strong>Aplicativo web desenvolvido para auxiliar profissionais a registrarem e acompanharem suas conquistas, elogios, feedbacks positivos e realizações — um "Brag Document" moderno e interativo.</strong>
</p>

<p align="center">
  <strong>Autor:</strong> <a href="https://github.com/andrelemos2">Andre Lemos</a> · 
  <a href="https://www.linkedin.com/in/andre-lemos-9b16b924/">LinkedIn</a>
</p>

---

## Características

- **Interface Moderna**: Design limpo e intuitivo com tema escuro padrão.
- **CRUD Completo**:
  - **C**reate: Adicione novos registros facilmente.
  - **R**ead: Visualize suas conquistas organizadas.
  - **U**pdate: Edite registros existentes.
  - **D**elete: Remova itens com confirmação visual.
- **Persistência de Dados**:
  - Os registros são salvos localmente no navegador usando `localStorage`.
  - Os dados persistem mesmo após fechar e reabrir o navegador.
  - Os dados são exportados e importados em formato JSON seguro.
- **Categorização**: Os registros são categorizados (Projeto, Feedback, Conquista, Habilidade) para melhor organização.
- **Exportação**:
  - Botão "Baixar JSON" que gera um arquivo de backup seguro.
  - O arquivo é nomeado com a data atual para fácil identificação.
- **Edição Local**:
  - Opção de editar o "Nome" do arquivo JSON antes de salvar/exportar.
  - Confirmação visual com preview do conteúdo.
- **Importação**:
  - Botão "Importar JSON" para restaurar registros.
  - Validação de segurança para prevenir arquivos maliciosos.
- **Interface Acessível**:
  - Diálogos de confirmação claros com descrição do item a ser removido.
  - Feedback visual imediato após cada operação.

## Tecnologias Utilizadas

- **React** com TypeScript para o frontend.
- **Next.js** para o framework.
- **CSS Modules** para estilos isolados.
- **Lucide Icons** para ícones de interface.
- **localStorage** para armazenamento local de dados.

## Como Utilizar

### Adicionar um Registro
1. Clique no botão **"Adicionar Registro"** ou no ícone `+` no canto inferior direito.
2. Preencha o formulário com o **Nome** e a **Categoria** do seu feito.
3. Clique em **"Salvar"** para adicionar o registro.

### Editar um Registro
1. Encontre o registro desejado na lista.
2. Clique no ícone de **Lápis** (Editar) no cartão do item.
3. Altere as informações e clique em **"Salvar"**.

### Remover um Registro
1. Clique no ícone de **Lixeira** (Remover) no cartão do item.
2. Uma janela de confirmação aparecerá.
3. Clique em **"Confirmar Exclusão"** para remover permanentemente o item.

### Exportar Dados
1. Clique no ícone de **Download** na barra de navegação (canto superior direito).
2. Opcionalmente, edite o nome do arquivo sugerido.
3. Clique em **"Baixar JSON"** para salvar o arquivo em seu computador.

### Importar Dados
1. Clique no ícone de **Upload** na barra de navegação (canto superior direito).
2. Selecione o arquivo JSON que deseja importar.
3. Uma janela de confirmação aparecerá com o conteúdo do arquivo.
4. Clique em **"Confirmar Importação"** para adicionar os registros.

## Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx        # Componente principal da página inicial
│   ├── components/     # Componentes reutilizáveis
│   │   ├── FeitoCard.tsx   # Card para exibir um registro
│   │   ├── FeitoForm.tsx   # Formulário de criação/edição
│   │   ├── DeleteConfirm.tsx # Diálogo de confirmação de exclusão
│   │   └── NavBar.tsx      # Barra de navegação
│   ├── api/            # Endpoints da API (se houver)
│   └── types.ts        # Definições de tiposTypeScript
├── styles/
│   ├── globals.css     # Estilos globais e variáveis CSS
│   └── vars.css        # Variáveis de cores e temas
└── README.md         # Este arquivo
```

## Contribuindo

Este projeto é open-source. Sinta-se à vontade para sugerir melhorias, relatar bugs ou enviar pull requests.

## Licença

MIT License
