import { NextResponse } from 'next/server';
import { PrismaSecretariaRepository } from '../../../../../src/infrastructure/repositories/PrismaSecretariaRepository';
import { AtualizarStatusDocumentoUseCase } from '../../../../../src/application/use-cases/SecretariaUseCases';

const repository = new PrismaSecretariaRepository();
const atualizarStatusUseCase = new AtualizarStatusDocumentoUseCase(repository);

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    if (!body.status) {
      return NextResponse.json({ error: 'Status é obrigatório' }, { status: 400 });
    }

    const atualizado = await atualizarStatusUseCase.execute(id, body.status);
    return NextResponse.json(atualizado);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Erro ao atualizar status' }, { status: 400 });
  }
}
