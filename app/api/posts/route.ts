import { NextRequest, NextResponse } from 'next/server';
import { createPost } from '@/lib/social-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { usuario_id, conteudo } = body;

    if (!usuario_id || !conteudo) {
      return NextResponse.json(
        { success: false, error: 'usuario_id e conteudo são obrigatórios.' },
        { status: 400 }
      );
    }

    const post = await createPost({ usuario_id, conteudo });
    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error: any) {
    console.error('Erro ao criar post:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Erro ao criar publicação' },
      { status: 400 }
    );
  }
}
