import { NextRequest, NextResponse } from 'next/server';
import { toggleLike } from '@/lib/social-service';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { usuario_id } = body;

    if (!usuario_id) {
      return NextResponse.json(
        { success: false, error: 'usuario_id é obrigatório.' },
        { status: 400 }
      );
    }

    const result = await toggleLike({ postId: id, usuario_id });
    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    console.error('Erro ao alternar curtida:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Erro ao alternar curtida' },
      { status: 500 }
    );
  }
}
