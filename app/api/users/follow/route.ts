import { NextRequest, NextResponse } from 'next/server';
import { toggleFollow } from '@/lib/social-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { seguidorId, seguidoId } = body;

    if (!seguidorId || !seguidoId) {
      return NextResponse.json(
        { success: false, error: 'seguidorId e seguidoId são obrigatórios.' },
        { status: 400 }
      );
    }

    const result = await toggleFollow({ seguidorId, seguidoId });
    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    console.error('Erro ao seguir usuário:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Erro ao seguir usuário' },
      { status: 400 }
    );
  }
}
