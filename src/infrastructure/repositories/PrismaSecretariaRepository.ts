import { PrismaClient } from '@prisma/client';
import { ISecretariaRepository } from '../../application/repositories/ISecretariaRepository';
import { Nota, Frequencia, SolicitacaoDoc } from '../../domain/entities/SecretariaEntities';

const prisma = new PrismaClient();

export class PrismaSecretariaRepository implements ISecretariaRepository {
  async getNotasByAlunoId(alunoId: string): Promise<Nota[]> {
    const notas = await prisma.nota.findMany({
      where: { alunoId },
    });
    return notas.map((n: any) => ({
      id: n.id,
      alunoId: n.alunoId,
      disciplina: n.disciplina,
      nota: Number(n.nota),
      semestre: n.semestre,
      lancadoPor: n.lancadoPor,
      criadoEm: n.criadoEm,
    }));
  }

  async lancarNota(nota: Omit<Nota, 'id' | 'criadoEm'>): Promise<Nota> {
    const novaNota = await prisma.nota.create({
      data: {
        alunoId: nota.alunoId,
        disciplina: nota.disciplina,
        nota: nota.nota,
        semestre: nota.semestre,
        lancadoPor: nota.lancadoPor,
      },
    });
    return {
      ...novaNota,
      nota: Number(novaNota.nota),
    };
  }

  async getFrequenciaByAlunoId(alunoId: string): Promise<Frequencia[]> {
    return prisma.frequencia.findMany({
      where: { alunoId },
    });
  }

  async lancarFrequencia(frequencia: Omit<Frequencia, 'id' | 'atualizadoEm'>): Promise<Frequencia> {
    // Tenta atualizar se já existir para o semestre/disciplina, senão cria
    const existente = await prisma.frequencia.findFirst({
      where: {
        alunoId: frequencia.alunoId,
        disciplina: frequencia.disciplina,
        semestre: frequencia.semestre,
      },
    });

    if (existente) {
      return prisma.frequencia.update({
        where: { id: existente.id },
        data: {
          faltas: frequencia.faltas,
          totalAulas: frequencia.totalAulas,
          atualizadoEm: new Date(),
        },
      });
    }

    return prisma.frequencia.create({
      data: {
        alunoId: frequencia.alunoId,
        disciplina: frequencia.disciplina,
        totalAulas: frequencia.totalAulas,
        faltas: frequencia.faltas,
        semestre: frequencia.semestre,
      },
    });
  }

  async getSolicitacoesByAlunoId(alunoId: string): Promise<SolicitacaoDoc[]> {
    return prisma.solicitacaoDoc.findMany({
      where: { alunoId },
    });
  }

  async criarSolicitacao(solicitacao: Omit<SolicitacaoDoc, 'id' | 'solicitadoEm' | 'atualizadoEm' | 'status'>): Promise<SolicitacaoDoc> {
    return prisma.solicitacaoDoc.create({
      data: {
        alunoId: solicitacao.alunoId,
        tipoDocumento: solicitacao.tipoDocumento,
        observacao: solicitacao.observacao,
      },
    });
  }

  async atualizarStatusSolicitacao(id: string, status: string): Promise<SolicitacaoDoc> {
    return prisma.solicitacaoDoc.update({
      where: { id },
      data: {
        status,
        atualizadoEm: new Date(),
      },
    });
  }

  async listarSolicitacoes(): Promise<SolicitacaoDoc[]> {
    return prisma.solicitacaoDoc.findMany({
      orderBy: { solicitadoEm: 'desc' },
    });
  }
}
