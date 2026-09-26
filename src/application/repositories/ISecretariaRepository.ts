import { Nota, Frequencia, SolicitacaoDoc } from '../../domain/entities/SecretariaEntities';

export interface ISecretariaRepository {
  // Notas
  getNotasByAlunoId(alunoId: string): Promise<Nota[]>;
  lancarNota(nota: Omit<Nota, 'id' | 'criadoEm'>): Promise<Nota>;

  // Frequencia
  getFrequenciaByAlunoId(alunoId: string): Promise<Frequencia[]>;
  lancarFrequencia(frequencia: Omit<Frequencia, 'id' | 'atualizadoEm'>): Promise<Frequencia>;

  // Solicitacoes
  getSolicitacoesByAlunoId(alunoId: string): Promise<SolicitacaoDoc[]>;
  criarSolicitacao(solicitacao: Omit<SolicitacaoDoc, 'id' | 'solicitadoEm' | 'atualizadoEm' | 'status'>): Promise<SolicitacaoDoc>;
  atualizarStatusSolicitacao(id: string, status: string): Promise<SolicitacaoDoc>;
  listarSolicitacoes(): Promise<SolicitacaoDoc[]>;
}
