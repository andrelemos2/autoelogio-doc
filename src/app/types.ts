export type Categoria = 'projeto' | 'feedback' | 'aprendizado' | 'certificacao' | 'outros';

export interface FeitoBase {
  id: string;
  titulo: string;
  descricao: string;
  categoria: Categoria;
  data: string; // Formato YYYY-MM-DD para ordenação correta
  linkReferencia?: string;
  createdAt: string; // ISO string
}

export interface Conquista extends FeitoBase {
  categoria: 'projeto' | 'aprendizado' | 'certificacao' | 'outros';
  impacto?: string; // Campo opcional de resultados mensuráveis
}

export interface Feedback extends FeitoBase {
  categoria: 'feedback';
  autor: string; // Nome de quem forneceu o feedback
  conteudo: string; // O depoimento na íntegra
}

export type Feito = Conquista | Feedback;

export const MOCK_FEITOS: Feito[] = [
  {
    id: "mock-1",
    titulo: "Refatoração da API de Pagamentos",
    descricao: "Substituição do sistema de filas legado por BullMQ e Redis no backend, reduzindo os gargalos de concorrência nos horários de pico.",
    categoria: "projeto",
    data: "2026-05-15",
    linkReferencia: "https://github.com/company/payment-service",
    impacto: "Redução de 42% no tempo médio de resposta das transações de checkout e eliminação completa de falhas por timeout.",
    createdAt: "2026-05-15T10:00:00.000Z"
  },
  {
    id: "mock-2",
    titulo: "Mentoria e Facilitação Técnica",
    descricao: "Reconhecimento recebido no ciclo de feedback 360 pelo suporte fornecido na facilitação técnica do time e onboarding de novos engenheiros.",
    categoria: "feedback",
    data: "2026-05-20",
    autor: "Sarah Connor (Eng Manager)",
    conteudo: "Sua dedicação em mentorar os desenvolvedores juniores e a clareza ao explicar a arquitetura de microsserviços nas cerimônias técnicas foram fundamentais para aumentar a velocidade de entrega do time em 25%. Muito obrigado!",
    createdAt: "2026-05-20T14:30:00.000Z"
  },
  {
    id: "mock-3",
    titulo: "Certificação AWS Certified Solutions Architect",
    descricao: "Estudo individual e aprovação no exame de certificação AWS Solutions Architect Associate para consolidação de conhecimentos de infraestrutura em nuvem.",
    categoria: "certificacao",
    data: "2026-04-10",
    linkReferencia: "https://aws.amazon.com/verification",
    impacto: "Certificação Associate obtida com pontuação de 845/1000.",
    createdAt: "2026-04-10T09:00:00.000Z"
  },
  {
    id: "mock-4",
    titulo: "Curso de Acessibilidade Web Moderna",
    descricao: "Conclusão de treinamento focado em semântica de HTML, navegação por teclado e conformidade com WCAG 2.1.",
    categoria: "aprendizado",
    data: "2026-04-05",
    createdAt: "2026-04-05T17:00:00.000Z"
  }
];
