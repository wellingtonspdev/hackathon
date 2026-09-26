export type TipoUsuario = 'aluno' | 'professor' | 'empresa' | 'master';

export interface Badge {
  id: string;
  nome: string;
  descricao: string;
  cor_icone: string;
  atribuido_em?: string;
  atribuido_por?: string;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipo_usuario: TipoUsuario;
  foto_perfil: string | null;
  bio: string | null;
  curso: string | null;
  criado_em: string;
  badges?: Badge[];
}

export interface Comentario {
  id: string;
  post_id: string;
  usuario_id: string;
  conteudo: string;
  criado_em: string;
  autor: {
    id: string;
    nome: string;
    tipo_usuario: TipoUsuario;
    foto_perfil: string | null;
    curso: string | null;
    badges: Badge[];
  };
}

export interface Post {
  id: string;
  usuario_id: string;
  conteudo: string;
  criado_em: string;
  total_curtidas: number;
  total_comentarios: number;
  curtido_pelo_usuario: boolean;
  autor: {
    id: string;
    nome: string;
    tipo_usuario: TipoUsuario;
    foto_perfil: string | null;
    curso: string | null;
    badges: Badge[];
  };
  comentarios?: Comentario[];
}

export interface SuggestionUser {
  id: string;
  nome: string;
  tipo_usuario: TipoUsuario;
  foto_perfil: string | null;
  curso: string | null;
  bio: string | null;
  badges: Badge[];
  seguindo: boolean;
}
