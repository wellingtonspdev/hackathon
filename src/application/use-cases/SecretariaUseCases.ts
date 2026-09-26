import { ISecretariaRepository } from '../repositories/ISecretariaRepository';
import { Nota, Frequencia, SolicitacaoDoc } from '../../domain/entities/SecretariaEntities';

export class CalcularRiscoFrequenciaUseCase {
  execute(frequencia: Frequencia) {
    if (frequencia.totalAulas === 0) return 'Atenção';
    const percentualFaltas = frequencia.faltas / frequencia.totalAulas;
    if (percentualFaltas > 0.25) return 'Reprovado por falta';
    if (percentualFaltas > 0.15) return 'Atenção';
    return 'Regular';
  }
}

export class SolicitarDocumentoUseCase {
  constructor(private secretariaRepository: ISecretariaRepository) {}

  async execute(alunoId: string, tipoDocumento: string, observacao?: string): Promise<SolicitacaoDoc> {
    if (!alunoId || !tipoDocumento) {
      throw new Error('Aluno e tipo de documento são obrigatórios');
    }

    const novaSolicitacao = {
      alunoId,
      tipoDocumento,
      observacao,
    };

    return this.secretariaRepository.criarSolicitacao(novaSolicitacao);
  }
}

export class AtualizarStatusDocumentoUseCase {
  constructor(private secretariaRepository: ISecretariaRepository) {}

  async execute(id: string, status: string): Promise<SolicitacaoDoc> {
    const statusValidos = ['pendente', 'em_analise', 'pronto', 'entregue'];
    if (!statusValidos.includes(status)) {
      throw new Error('Status inválido');
    }

    return this.secretariaRepository.atualizarStatusSolicitacao(id, status);
  }
}

export class LancarNotaUseCase {
  constructor(private secretariaRepository: ISecretariaRepository) {}

  async execute(notaData: Omit<Nota, 'id' | 'criadoEm'>): Promise<Nota> {
    if (notaData.nota < 0 || notaData.nota > 10) {
      throw new Error('Nota deve ser entre 0 e 10');
    }
    return this.secretariaRepository.lancarNota(notaData);
  }
}

export class LancarFrequenciaUseCase {
  constructor(private secretariaRepository: ISecretariaRepository) {}

  async execute(frequenciaData: Omit<Frequencia, 'id' | 'atualizadoEm'>): Promise<Frequencia> {
    if (frequenciaData.faltas < 0 || frequenciaData.totalAulas < 0) {
      throw new Error('Valores de frequência inválidos');
    }
    return this.secretariaRepository.lancarFrequencia(frequenciaData);
  }
}
