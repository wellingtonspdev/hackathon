import { PrismaClient } from '@prisma/client';
import { ISecretariaRepository } from '../../application/repositories/ISecretariaRepository';
import { Nota, Frequencia, SolicitacaoDoc } from '../../domain/entities/SecretariaEntities';

const prisma = new PrismaClient();

export class PrismaSecretariaRepository implements ISecretariaRepository {
  async getNotasByAlunoId(alunoId: string): Promise<Nota[]> {
    const notas = await prisma.nota.findMany({
      where: { alunoId: alunoId },
    });
    return notas.map(n => ({
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
      id: novaNota.id,
      alunoId: novaNota.alunoId,
      disciplina: novaNota.disciplina,
      nota: Number(novaNota.nota),
      semestre: novaNota.semestre,
      lancadoPor: novaNota.lancadoPor,
      criadoEm: novaNota.criadoEm,
    };
  }

  async getFrequenciaByAlunoId(alunoId: string): Promise<Frequencia[]> {
    const frequencias = await prisma.frequencia.findMany({
      where: { alunoId: alunoId },
    });
    return frequencias.map(f => ({
      id: f.id,
      alunoId: f.alunoId,
      disciplina: f.disciplina,
      totalAulas: f.totalAulas,
      faltas: f.faltas,
      semestre: f.semestre,
      atualizadoEm: f.atualizadoEm,
    }));
  }

  async lancarFrequencia(frequencia: Omit<Frequencia, 'id' | 'atualizadoEm'>): Promise<Frequencia> {
    const existente = await prisma.frequencia.findFirst({
      where: {
        alunoId: frequencia.alunoId,
        disciplina: frequencia.disciplina,
        semestre: frequencia.semestre,
      },
    });

    let result;
    if (existente) {
      result = await prisma.frequencia.update({
        where: { id: existente.id },
        data: {
          faltas: frequencia.faltas,
          totalAulas: frequencia.totalAulas,
          atualizadoEm: new Date(),
        },
      });
    } else {
      result = await prisma.frequencia.create({
        data: {
          alunoId: frequencia.alunoId,
          disciplina: frequencia.disciplina,
          totalAulas: frequencia.totalAulas,
          faltas: frequencia.faltas,
          semestre: frequencia.semestre,
        },
      });
    }

    return {
      id: result.id,
      alunoId: result.alunoId,
      disciplina: result.disciplina,
      totalAulas: result.totalAulas,
      faltas: result.faltas,
      semestre: result.semestre,
      atualizadoEm: result.atualizadoEm,
    };
  }

  async getSolicitacoesByAlunoId(alunoId: string): Promise<SolicitacaoDoc[]> {
    const solicitacoes = await prisma.solicitacaoDoc.findMany({
      where: { alunoId: alunoId },
    });
    return solicitacoes.map(s => ({
      id: s.id,
      alunoId: s.alunoId,
      tipoDocumento: s.tipoDocumento,
      status: s.status as any,
      solicitadoEm: s.solicitadoEm,
      atualizadoEm: s.atualizadoEm,
      observacao: s.observacao,
    }));
  }

  async criarSolicitacao(solicitacao: Omit<SolicitacaoDoc, 'id' | 'solicitadoEm' | 'atualizadoEm' | 'status'>): Promise<SolicitacaoDoc> {
    const novaSolicitacao = await prisma.solicitacaoDoc.create({
      data: {
        alunoId: solicitacao.alunoId,
        tipoDocumento: solicitacao.tipoDocumento,
        observacao: solicitacao.observacao,
        status: 'pendente',
      },
    });
    return {
      id: novaSolicitacao.id,
      alunoId: novaSolicitacao.alunoId,
      tipoDocumento: novaSolicitacao.tipoDocumento,
      status: novaSolicitacao.status as any,
      solicitadoEm: novaSolicitacao.solicitadoEm,
      atualizadoEm: novaSolicitacao.atualizadoEm,
      observacao: novaSolicitacao.observacao,
    };
  }

  async atualizarStatusSolicitacao(id: string, status: string): Promise<SolicitacaoDoc> {
    const atualizada = await prisma.solicitacaoDoc.update({
      where: { id },
      data: {
        status,
        atualizadoEm: new Date(),
      },
    });
    return {
      id: atualizada.id,
      alunoId: atualizada.alunoId,
      tipoDocumento: atualizada.tipoDocumento,
      status: atualizada.status as any,
      solicitadoEm: atualizada.solicitadoEm,
      atualizadoEm: atualizada.atualizadoEm,
      observacao: atualizada.observacao,
    };
  }

  async listarSolicitacoes(): Promise<SolicitacaoDoc[]> {
    const solicitacoes = await prisma.solicitacaoDoc.findMany({
      orderBy: { solicitadoEm: 'desc' },
    });
    return solicitacoes.map(s => ({
      id: s.id,
      alunoId: s.alunoId,
      tipoDocumento: s.tipoDocumento,
      status: s.status as any,
      solicitadoEm: s.solicitadoEm,
      atualizadoEm: s.atualizadoEm,
      observacao: s.observacao,
    }));
  }
}
