# autoelogio-doc

**Visão:** Uma aplicação web moderna e responsiva para profissionais registrarem, editarem, consultarem e excluírem suas conquistas, feitos e feedbacks positivos, servindo como um "Brag Document" dinâmico integrado ao Google Sheets.
**Para:** Profissionais (desenvolvedores, designers, gerentes, etc.) que desejam catalogar seu impacto profissional de forma organizada.
**Resolve:** O esquecimento de conquistas e feedbacks importantes na hora de preencher autoavaliações de desempenho ou pleitear promoções, oferecendo uma interface amigável que armazena os dados de forma simples em uma planilha do Google Sheets.

## Objetivos

- **Facilidade de Registro:** Permitir o cadastro de uma conquista ou feedback em menos de 1 minuto, incentivando o hábito do registro.
- **Consulta Rápida:** Oferecer filtros e busca textual para localizar feitos específicos durante ciclos de avaliação.
- **Portabilidade de Dados:** Armazenar os dados no Google Sheets do próprio usuário, garantindo privacidade, facilidade de exportação e backup.

## Stack de Tecnologia

**Núcleo:**
- Framework: Next.js 14+ (App Router)
- Linguagem: TypeScript / JavaScript
- Estilização: Vanilla CSS (CSS Modules)
- Banco de Dados/Armazenamento: Google Sheets (via Google Sheets API ou API customizada de integração)

**Principais dependências:**
- `googleapis`: SDK oficial do Google para integração com o Sheets.
- `lucide-react`: Para ícones modernos e minimalistas.
- `framer-motion` (opcional): Para micro-animações fluidas e premium.

## Escopo

**A v1 (MVP) inclui:**
- **Dashboard Principal:** Visualização em formato de linha do tempo ou cards das conquistas e feedbacks, ordenados cronologicamente.
- **Cadastro & Edição (CRUD):** Formulário completo para criar, editar, visualizar e excluir registros de feitos.
- **Filtros e Busca:** Busca por palavra-chave e filtros por categoria (ex: Projeto, Feedback, Liderança, Certificação) e por data.
- **Integração com Google Sheets:** Leitura e escrita de dados diretamente em uma planilha do Google Sheets definida pelo usuário (via chaves de API / Credenciais de Service Account ou OAuth do usuário).
- **Design Responsivo e Premium:** Interface moderna com tema escuro (dark mode) elegante, tipografia refinada e transições suaves.

**Explicitamente fora do escopo:**
- **Autenticação robusta própria:** Inicialmente usará uma abordagem simples baseada em chave de configuração da planilha (ou OAuth simplificado).
- **Múltiplas fontes de dados:** Sincronização com Notion, Jira, GitHub, etc. (ficará para versões futuras).
- **Relatórios avançados de IA:** Resumos automáticos gerados por IA das conquistas (para v2).

## Restrições

- **Arquitetura Frontend:** A aplicação deve rodar primordialmente como app Next.js hospedado localmente ou em plataformas serverless (ex: Vercel/Firebase App Hosting) sem necessidade de um banco de dados relacional separado.
- **Integração Gratuita:** Utilizar APIs ou métodos de acesso ao Google Sheets que não incorram em custos adicionais para o usuário.
