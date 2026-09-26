import { NextRequest, NextResponse } from 'next/server';
import { getComments, addComment } from '@/lib/social-service';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const comments = await getComments({ postId: id });
    return NextResponse.json({ success: true, comments });
  } catch (error: any) {
    console.error('Erro ao buscar comentários:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Erro ao buscar comentários' },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { usuario_id, conteudo } = body;

    if (!usuario_id || !conteudo) {
      return NextResponse.json(
        { success: false, error: 'usuario_id e conteudo são obrigatórios.' },
        { status: 400 }
      );
    }

    const comment = await addComment({
      postId: id,
      usuario_id,
      conteudo,
    });

    return NextResponse.json({ success: true, comment }, { status: 201 });
  } catch (error: any) {
    console.error('Erro ao adicionar comentário:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Erro ao adicionar comentário' },
      { status: 400 }
    );
  }
}
