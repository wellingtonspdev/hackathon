import { query } from './db';
import { Post, Comentario, SuggestionUser, Badge, Usuario } from './types';
import crypto from 'crypto';

export async function getUserBadges(usuarioId: string): Promise<Badge[]> {
  const rows = await query<any[]>(
    `SELECT b.id, b.nome, b.descricao, b.cor_icone, ub.atribuido_em, ub.atribuido_por
     FROM badges b
     INNER JOIN usuario_badges ub ON ub.badge_id = b.id
     WHERE ub.usuario_id = ?
     ORDER BY ub.atribuido_em DESC`,
    [usuarioId]
  );
  return rows.map(r => ({
    id: r.id,
    nome: r.nome,
    descricao: r.descricao,
    cor_icone: r.cor_icone,
    atribuido_em: r.atribuido_em ? new Date(r.atribuido_em).toISOString() : undefined,
    atribuido_por: r.atribuido_por,
  }));
}

export async function getFeed({
  tab,
  currentUserId,
}: {
  tab: 'for-you' | 'following';
  currentUserId: string;
}): Promise<Post[]> {
  let sql = `
    SELECT 
      p.id, 
      p.usuario_id, 
      p.conteudo, 
      p.criado_em,
      u.nome as autor_nome,
      u.tipo_usuario as autor_tipo,
      u.foto_perfil as autor_foto,
      u.curso as autor_curso,
      (SELECT COUNT(*) FROM curtidas c WHERE c.post_id = p.id) as total_curtidas,
      (SELECT COUNT(*) FROM comentarios cm WHERE cm.post_id = p.id) as total_comentarios,
      EXISTS(SELECT 1 FROM curtidas c WHERE c.post_id = p.id AND c.usuario_id = ?) as curtido_pelo_usuario
    FROM posts p
    INNER JOIN usuarios u ON u.id = p.usuario_id
  `;

  const params: any[] = [currentUserId];

  if (tab === 'following') {
    sql += ` WHERE p.usuario_id IN (SELECT seguido_id FROM seguidores WHERE seguidor_id = ?) OR p.usuario_id = ?`;
    params.push(currentUserId, currentUserId);
  }

  sql += ` ORDER BY p.criado_em DESC LIMIT 50`;

  const rows = await query<any[]>(sql, params);

  // Buscar badges para todos os autores únicos
  const authorIds = Array.from(new Set(rows.map(r => r.usuario_id)));
  const badgesMap = new Map<string, Badge[]>();

  for (const aId of authorIds) {
    const badges = await getUserBadges(aId);
    badgesMap.set(aId, badges);
  }

  return rows.map(r => ({
    id: r.id,
    usuario_id: r.usuario_id,
    conteudo: r.conteudo,
    criado_em: new Date(r.criado_em).toISOString(),
    total_curtidas: Number(r.total_curtidas || 0),
    total_comentarios: Number(r.total_comentarios || 0),
    curtido_pelo_usuario: Boolean(r.curtido_pelo_usuario),
    autor: {
      id: r.usuario_id,
      nome: r.autor_nome,
      tipo_usuario: r.autor_tipo,
      foto_perfil: r.autor_foto,
      curso: r.autor_curso,
      badges: badgesMap.get(r.usuario_id) || [],
    },
  }));
}

export async function createPost({
  usuario_id,
  conteudo,
}: {
  usuario_id: string;
  conteudo: string;
}): Promise<Post> {
  const trimmed = conteudo.trim();
  if (!trimmed) {
    throw new Error('O conteúdo da publicação não pode estar vazio.');
  }
  if (trimmed.length > 500) {
    throw new Error('O conteúdo excede o limite máximo de 500 caracteres.');
  }

  const postId = crypto.randomUUID();
  await query(
    `INSERT INTO posts (id, usuario_id, conteudo, criado_em) VALUES (?, ?, ?, NOW())`,
    [postId, usuario_id, trimmed]
  );

  const [author] = await query<any[]>(
    `SELECT id, nome, tipo_usuario, foto_perfil, curso FROM usuarios WHERE id = ?`,
    [usuario_id]
  );

  const badges = await getUserBadges(usuario_id);

  return {
    id: postId,
    usuario_id,
    conteudo: trimmed,
    criado_em: new Date().toISOString(),
    total_curtidas: 0,
    total_comentarios: 0,
    curtido_pelo_usuario: false,
    autor: {
      id: author.id,
      nome: author.nome,
      tipo_usuario: author.tipo_usuario,
      foto_perfil: author.foto_perfil,
      curso: author.curso,
      badges,
    },
  };
}

export async function deletePost({
  postId,
  usuario_id,
}: {
  postId: string;
  usuario_id: string;
}): Promise<boolean> {
  const rows = await query<any[]>(`SELECT usuario_id FROM posts WHERE id = ?`, [postId]);
  if (!rows.length) {
    throw new Error('Publicação não encontrada.');
  }
  if (rows[0].usuario_id !== usuario_id) {
    throw new Error('Você não tem permissão para excluir esta publicação.');
  }

  await query(`DELETE FROM posts WHERE id = ?`, [postId]);
  return true;
}

export async function toggleLike({
  postId,
  usuario_id,
}: {
  postId: string;
  usuario_id: string;
}): Promise<{ curtido: boolean; total_curtidas: number }> {
  const existing = await query<any[]>(
    `SELECT id FROM curtidas WHERE post_id = ? AND usuario_id = ?`,
    [postId, usuario_id]
  );

  let curtido = false;
  if (existing.length > 0) {
    await query(`DELETE FROM curtidas WHERE post_id = ? AND usuario_id = ?`, [
      postId,
      usuario_id,
    ]);
    curtido = false;
  } else {
    const likeId = crypto.randomUUID();
    await query(
      `INSERT INTO curtidas (id, post_id, usuario_id, criado_em) VALUES (?, ?, ?, NOW())`,
      [likeId, postId, usuario_id]
    );
    curtido = true;
  }

  const [countRow] = await query<any[]>(
    `SELECT COUNT(*) as count FROM curtidas WHERE post_id = ?`,
    [postId]
  );

  return {
    curtido,
    total_curtidas: Number(countRow?.count || 0),
  };
}

export async function getComments({ postId }: { postId: string }): Promise<Comentario[]> {
  const rows = await query<any[]>(
    `SELECT 
      c.id, 
      c.post_id, 
      c.usuario_id, 
      c.conteudo, 
      c.criado_em,
      u.nome as autor_nome,
      u.tipo_usuario as autor_tipo,
      u.foto_perfil as autor_foto,
      u.curso as autor_curso
    FROM comentarios c
    INNER JOIN usuarios u ON u.id = c.usuario_id
    WHERE c.post_id = ?
    ORDER BY c.criado_em ASC`,
    [postId]
  );

  const authorIds = Array.from(new Set(rows.map(r => r.usuario_id)));
  const badgesMap = new Map<string, Badge[]>();

  for (const aId of authorIds) {
    const badges = await getUserBadges(aId);
    badgesMap.set(aId, badges);
  }

  return rows.map(r => ({
    id: r.id,
    post_id: r.post_id,
    usuario_id: r.usuario_id,
    conteudo: r.conteudo,
    criado_em: new Date(r.criado_em).toISOString(),
    autor: {
      id: r.usuario_id,
      nome: r.autor_nome,
      tipo_usuario: r.autor_tipo,
      foto_perfil: r.autor_foto,
      curso: r.autor_curso,
      badges: badgesMap.get(r.usuario_id) || [],
    },
  }));
}

export async function addComment({
  postId,
  usuario_id,
  conteudo,
}: {
  postId: string;
  usuario_id: string;
  conteudo: string;
}): Promise<Comentario> {
  const trimmed = conteudo.trim();
  if (!trimmed) {
    throw new Error('O comentário não pode ser vazio.');
  }

  const commentId = crypto.randomUUID();
  await query(
    `INSERT INTO comentarios (id, post_id, usuario_id, conteudo, criado_em) VALUES (?, ?, ?, ?, NOW())`,
    [commentId, postId, usuario_id, trimmed]
  );

  const [author] = await query<any[]>(
    `SELECT id, nome, tipo_usuario, foto_perfil, curso FROM usuarios WHERE id = ?`,
    [usuario_id]
  );

  const badges = await getUserBadges(usuario_id);

  return {
    id: commentId,
    post_id: postId,
    usuario_id,
    conteudo: trimmed,
    criado_em: new Date().toISOString(),
    autor: {
      id: author.id,
      nome: author.nome,
      tipo_usuario: author.tipo_usuario,
      foto_perfil: author.foto_perfil,
      curso: author.curso,
      badges,
    },
  };
}

export async function toggleFollow({
  seguidorId,
  seguidoId,
}: {
  seguidorId: string;
  seguidoId: string;
}): Promise<{ seguindo: boolean }> {
  if (seguidorId === seguidoId) {
    throw new Error('Um usuário não pode seguir a si mesmo.');
  }

  const existing = await query<any[]>(
    `SELECT id FROM seguidores WHERE seguidor_id = ? AND seguido_id = ?`,
    [seguidorId, seguidoId]
  );

  let seguindo = false;
  if (existing.length > 0) {
    await query(
      `DELETE FROM seguidores WHERE seguidor_id = ? AND seguido_id = ?`,
      [seguidorId, seguidoId]
    );
    seguindo = false;
  } else {
    const id = crypto.randomUUID();
    await query(
      `INSERT INTO seguidores (id, seguidor_id, seguido_id, criado_em) VALUES (?, ?, ?, NOW())`,
      [id, seguidorId, seguidoId]
    );
    seguindo = true;
  }

  return { seguindo };
}

export async function getSuggestions({
  currentUserId,
}: {
  currentUserId: string;
}): Promise<SuggestionUser[]> {
  const rows = await query<any[]>(
    `SELECT 
      u.id, 
      u.nome, 
      u.tipo_usuario, 
      u.foto_perfil, 
      u.curso, 
      u.bio,
      EXISTS(SELECT 1 FROM seguidores s WHERE s.seguidor_id = ? AND s.seguido_id = u.id) as seguindo
    FROM usuarios u
    WHERE u.id <> ?
    ORDER BY seguindo ASC, RAND()
    LIMIT 5`,
    [currentUserId, currentUserId]
  );

  const results: SuggestionUser[] = [];
  for (const r of rows) {
    const badges = await getUserBadges(r.id);
    results.push({
      id: r.id,
      nome: r.nome,
      tipo_usuario: r.tipo_usuario,
      foto_perfil: r.foto_perfil,
      curso: r.curso,
      bio: r.bio,
      badges,
      seguindo: Boolean(r.seguindo),
    });
  }

  return results;
}

export async function getAllUsers(): Promise<Usuario[]> {
  const rows = await query<any[]>(
    `SELECT id, nome, email, tipo_usuario, foto_perfil, bio, curso, criado_em FROM usuarios ORDER BY nome ASC`
  );
  const users: Usuario[] = [];
  for (const r of rows) {
    const badges = await getUserBadges(r.id);
    users.push({
      id: r.id,
      nome: r.nome,
      email: r.email,
      tipo_usuario: r.tipo_usuario,
      foto_perfil: r.foto_perfil,
      bio: r.bio,
      curso: r.curso,
      criado_em: new Date(r.criado_em).toISOString(),
      badges,
    });
  }
  return users;
}
