export type Nota = {
  id: string;
  alunoId: string;
  disciplina: string;
  nota: number;
  semestre: string;
  lancadoPor?: string | null;
  criadoEm: Date;
};

export type Frequencia = {
  id: string;
  alunoId: string;
  disciplina: string;
  totalAulas: number;
  faltas: number;
  semestre: string;
  atualizadoEm: Date;
};

export type SolicitacaoDoc = {
  id: string;
  alunoId: string;
  tipoDocumento: string;
  status: 'pendente' | 'em_analise' | 'pronto' | 'entregue';
  observacao?: string | null;
  solicitadoEm: Date;
  atualizadoEm: Date;
};
