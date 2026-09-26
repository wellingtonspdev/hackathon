import { NextRequest, NextResponse } from 'next/server';
import { getFeed } from '@/lib/social-service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tab = (searchParams.get('tab') as 'for-you' | 'following') || 'for-you';
    const currentUserId = searchParams.get('userId') || 'u-ana';

    const posts = await getFeed({ tab, currentUserId });
    return NextResponse.json({ success: true, posts });
  } catch (error: any) {
    console.error('Erro ao buscar feed:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Erro interno no servidor' },
      { status: 500 }
    );
  }
}
