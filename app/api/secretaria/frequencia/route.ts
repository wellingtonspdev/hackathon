import { NextResponse } from 'next/server';
import { PrismaSecretariaRepository } from '../../../../src/infrastructure/repositories/PrismaSecretariaRepository';
import { LancarFrequenciaUseCase, CalcularRiscoFrequenciaUseCase } from '../../../../src/application/use-cases/SecretariaUseCases';

const repository = new PrismaSecretariaRepository();
const lancarFrequenciaUseCase = new LancarFrequenciaUseCase(repository);
const calcularRiscoUseCase = new CalcularRiscoFrequenciaUseCase();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const alunoId = searchParams.get('alunoId');

  if (!alunoId) {
    return NextResponse.json({ error: 'alunoId é obrigatório' }, { status: 400 });
  }

  try {
    const frequencias = await repository.getFrequenciaByAlunoId(alunoId);
    const resposta = frequencias.map(freq => ({
      ...freq,
      statusRisco: calcularRiscoUseCase.execute(freq),
    }));
    return NextResponse.json(resposta);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar frequência' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const novaFrequencia = await lancarFrequenciaUseCase.execute({
      alunoId: body.alunoId,
      disciplina: body.disciplina,
      totalAulas: Number(body.totalAulas),
      faltas: Number(body.faltas),
      semestre: body.semestre,
    });
    return NextResponse.json(novaFrequencia, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Erro ao lançar frequência' }, { status: 400 });
  }
}
