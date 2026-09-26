import { NextRequest, NextResponse } from 'next/server';
import { deletePost } from '@/lib/social-service';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const usuario_id = searchParams.get('userId');

    if (!usuario_id) {
      return NextResponse.json(
        { success: false, error: 'Parâmetro userId é obrigatório.' },
        { status: 400 }
      );
    }

    await deletePost({ postId: id, usuario_id });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Erro ao deletar post:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Erro ao deletar publicação' },
      { status: 400 }
    );
  }
}
