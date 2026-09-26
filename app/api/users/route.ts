import { NextResponse } from 'next/server';
import { getAllUsers } from '@/lib/social-service';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const users = await getAllUsers();
    return NextResponse.json({ success: true, users });
  } catch (error: any) {
    console.error('Erro ao listar usuários:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Erro ao listar usuários' },
      { status: 500 }
    );
  }
}
