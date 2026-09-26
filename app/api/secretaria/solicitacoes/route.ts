import { NextResponse } from 'next/server';
import { PrismaSecretariaRepository } from '../../../../src/infrastructure/repositories/PrismaSecretariaRepository';
import { SolicitarDocumentoUseCase } from '../../../../src/application/use-cases/SecretariaUseCases';

const repository = new PrismaSecretariaRepository();
const solicitarDocUseCase = new SolicitarDocumentoUseCase(repository);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const alunoId = searchParams.get('alunoId');

  try {
    if (alunoId) {
      const solicitacoes = await repository.getSolicitacoesByAlunoId(alunoId);
      return NextResponse.json(solicitacoes);
    } else {
      const solicitacoes = await repository.listarSolicitacoes();
      return NextResponse.json(solicitacoes);
    }
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar solicitações' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const novaSolicitacao = await solicitarDocUseCase.execute(
      body.alunoId,
      body.tipoDocumento,
      body.observacao
    );
    return NextResponse.json(novaSolicitacao, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Erro ao criar solicitação' }, { status: 400 });
  }
}
