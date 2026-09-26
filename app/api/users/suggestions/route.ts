import { NextRequest, NextResponse } from 'next/server';
import { getSuggestions } from '@/lib/social-service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'u-ana';

    const suggestions = await getSuggestions({ currentUserId: userId });
    return NextResponse.json({ success: true, suggestions });
  } catch (error: any) {
    console.error('Erro ao buscar sugestões:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Erro ao buscar sugestões' },
      { status: 500 }
    );
  }
}
