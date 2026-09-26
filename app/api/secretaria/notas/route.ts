import { NextResponse } from 'next/server';
import { PrismaSecretariaRepository } from '../../../../src/infrastructure/repositories/PrismaSecretariaRepository';
import { LancarNotaUseCase } from '../../../../src/application/use-cases/SecretariaUseCases';

const repository = new PrismaSecretariaRepository();
const lancarNotaUseCase = new LancarNotaUseCase(repository);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const alunoId = searchParams.get('alunoId');

  if (!alunoId) {
    return NextResponse.json({ error: 'alunoId é obrigatório' }, { status: 400 });
  }

  try {
    const notas = await repository.getNotasByAlunoId(alunoId);
    return NextResponse.json(notas);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar notas' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const novaNota = await lancarNotaUseCase.execute({
      alunoId: body.alunoId,
      disciplina: body.disciplina,
      nota: Number(body.nota),
      semestre: body.semestre,
      lancadoPor: body.lancadoPor,
    });
    return NextResponse.json(novaNota, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Erro ao lançar nota' }, { status: 400 });
  }
}
