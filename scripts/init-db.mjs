import mysql from 'mysql2/promise';

async function main() {
  const host = process.env.DB_HOST || 'sql.freedb.tech';
  const port = Number(process.env.DB_PORT) || 3306;
  const user = process.env.DB_USER || 'u_5ceDN5';
  const password = process.env.DB_PASSWORD || 'PAVoCvgsxckJ';
  const database = process.env.DB_NAME || 'freedb_DmnP70mB';

  console.log(`Conectando em ${host}:${port}/${database} como ${user}...`);
  const conn = await mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
  });

  console.log('--- Criando tabelas ---');

  await conn.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id VARCHAR(36) PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      tipo_usuario ENUM('aluno', 'professor', 'empresa', 'master') NOT NULL DEFAULT 'aluno',
      foto_perfil VARCHAR(500),
      bio TEXT,
      curso VARCHAR(255),
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS badges (
      id VARCHAR(36) PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      descricao TEXT,
      cor_icone VARCHAR(50) DEFAULT '#B20000',
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS usuario_badges (
      id VARCHAR(36) PRIMARY KEY,
      usuario_id VARCHAR(36) NOT NULL,
      badge_id VARCHAR(36) NOT NULL,
      atribuido_por VARCHAR(255),
      atribuido_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_ub_usuario (usuario_id),
      INDEX idx_ub_badge (badge_id),
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
      FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS posts (
      id VARCHAR(36) PRIMARY KEY,
      usuario_id VARCHAR(36) NOT NULL,
      conteudo TEXT NOT NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_posts_usuario (usuario_id),
      INDEX idx_posts_criado (criado_em DESC),
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS curtidas (
      id VARCHAR(36) PRIMARY KEY,
      post_id VARCHAR(36) NOT NULL,
      usuario_id VARCHAR(36) NOT NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uq_curtidas_post_user (post_id, usuario_id),
      INDEX idx_curtidas_post (post_id),
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS comentarios (
      id VARCHAR(36) PRIMARY KEY,
      post_id VARCHAR(36) NOT NULL,
      usuario_id VARCHAR(36) NOT NULL,
      conteudo TEXT NOT NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_comentarios_post (post_id),
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS seguidores (
      id VARCHAR(36) PRIMARY KEY,
      seguidor_id VARCHAR(36) NOT NULL,
      seguido_id VARCHAR(36) NOT NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uq_seguidores_par (seguidor_id, seguido_id),
      INDEX idx_seguidores_seguidor (seguidor_id),
      INDEX idx_seguidores_seguido (seguido_id),
      FOREIGN KEY (seguidor_id) REFERENCES usuarios(id) ON DELETE CASCADE,
      FOREIGN KEY (seguido_id) REFERENCES usuarios(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  console.log('✓ Tabelas verificadas/criadas com sucesso!');

  const [existing] = await conn.query('SELECT COUNT(*) as count FROM usuarios');
  if (existing[0]?.count === 0) {
    console.log('Populando dados iniciais da Fatec / CPS...');

    await conn.query(`
      INSERT INTO usuarios (id, nome, email, tipo_usuario, foto_perfil, bio, curso) VALUES
      ('u-ana', 'Ana Silva', 'ana.silva@fatec.sp.gov.br', 'aluno', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', 'Apaixonada por TypeScript, React e IA. Monitora de Algoritmos na Fatec.', 'DSM - Desenv. Software Multiplataforma'),
      ('u-carlos', 'Prof. Carlos Mendes', 'carlos.mendes@fatec.sp.gov.br', 'professor', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', 'Coordenador e pesquisador na Fatec. Focado em arquitetura em nuvem e inovação tecnológica.', 'Gestão de TI'),
      ('u-lucas', 'Lucas Oliveira', 'lucas.oliveira@fatec.sp.gov.br', 'aluno', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', 'Dev Full-Stack, competidor em maratonas de programação e entusiasta de Next.js.', 'DSM - Desenv. Software Multiplataforma'),
      ('u-mariana', 'Mariana Souza', 'mariana.souza@fatec.sp.gov.br', 'aluno', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150', 'Líder discente, apaixonada por acessibilidade web, design system e comunidade Fatecana.', 'ADS - Análise e Desenv. Sistemas'),
      ('u-techlab', 'TechLab Inovação CPS', 'contato@techlab.cps.sp.gov.br', 'empresa', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150', 'Hub de inovação e aceleração de carreiras tecnológicas para alunos do Centro Paula Souza.', 'Parceiro Institucional');
    `);

    await conn.query(`
      INSERT INTO badges (id, nome, descricao, cor_icone) VALUES
      ('b-monitor', 'Monitor(a) Oficial', 'Monitor acadêmico selecionado da Fatec', '#B20000'),
      ('b-ic', 'Iniciação Científica', 'Pesquisador de Iniciação Científica do CPS', '#2563EB'),
      ('b-lider', 'Líder Discente', 'Representante de turma eleito pelos pares', '#16A34A'),
      ('b-hackathon', 'Campeão Hackathon', 'Vencedor de Hackathon e Desafios de Inovação', '#D97706'),
      ('b-docente', 'Docente Destaque', 'Professor com avaliação máxima e publicações', '#9333EA');
    `);

    await conn.query(`
      INSERT INTO usuario_badges (id, usuario_id, badge_id, atribuido_por) VALUES
      ('ub-1', 'u-ana', 'b-monitor', 'Coordenação Fatec'),
      ('ub-2', 'u-ana', 'b-hackathon', 'Comissão Hackathon AgenTEC'),
      ('ub-3', 'u-carlos', 'b-docente', 'Diretoria Acadêmica CPS'),
      ('ub-4', 'u-lucas', 'b-hackathon', 'Comissão Hackathon AgenTEC'),
      ('ub-5', 'u-mariana', 'b-lider', 'Colegiado de Curso'),
      ('ub-6', 'u-mariana', 'b-ic', 'Núcleo de Pesquisa');
    `);

    await conn.query(`
      INSERT INTO seguidores (id, seguidor_id, seguido_id) VALUES
      ('s-1', 'u-ana', 'u-carlos'),
      ('s-2', 'u-ana', 'u-lucas'),
      ('s-3', 'u-lucas', 'u-ana'),
      ('s-4', 'u-mariana', 'u-ana'),
      ('s-5', 'u-mariana', 'u-carlos'),
      ('s-6', 'u-techlab', 'u-ana');
    `);

    await conn.query(`
      INSERT INTO posts (id, usuario_id, conteudo, criado_em) VALUES
      ('p-1', 'u-ana', 'Muito animada com o lançamento da plataforma AgenTEC! 🐊 Redes acadêmicas conectando alunos e professores da Fatec de verdade. Quem mais aqui é do curso de DSM? #Fatec #AgenTEC #DSM', DATE_SUB(NOW(), INTERVAL 4 HOUR)),
      ('p-2', 'u-carlos', 'Aviso aos alunos de Gestão de TI e DSM: as inscrições para os novos projetos de Iniciação Científica do CPS estão abertas até sexta-feira. Venham conversar comigo sobre os temas de Cloud e IA aplicada! #IniciaçãoCientifica #CPS #Fatec', DATE_SUB(NOW(), INTERVAL 3 HOUR)),
      ('p-3', 'u-lucas', 'Galera, estamos montando uma equipe para o próximo Hackathon Inter-Fatecs! Precisamos de mais um dev focado em front-end com Next.js e Tailwind. Mandem mensagem aqui nos comentários! 🚀 #HackathonFatec #DevCommunity', DATE_SUB(NOW(), INTERVAL 1 HOUR)),
      ('p-4', 'u-techlab', 'Vaga de Estágio em Desenvolvimento de Software aberta exclusivamente para alunos da Fatec no TechLab CPS! Benefícios atrativos, bolsa auxílio e mentoria com engenheiros sêniores. Link no nosso perfil institucional. #VagasFatec #EstagioTech', DATE_SUB(NOW(), INTERVAL 25 MINUTE));
    `);

    await conn.query(`
      INSERT INTO curtidas (id, post_id, usuario_id) VALUES
      ('l-1', 'p-1', 'u-carlos'),
      ('l-2', 'p-1', 'u-lucas'),
      ('l-3', 'p-1', 'u-mariana'),
      ('l-4', 'p-2', 'u-ana'),
      ('l-5', 'p-2', 'u-lucas'),
      ('l-6', 'p-3', 'u-ana'),
      ('l-7', 'p-4', 'u-ana'),
      ('l-8', 'p-4', 'u-lucas'),
      ('l-9', 'p-4', 'u-mariana');
    `);

    await conn.query(`
      INSERT INTO comentarios (id, post_id, usuario_id, conteudo, criado_em) VALUES
      ('c-1', 'p-3', 'u-ana', 'Opa Lucas! Tenho total interesse, vou te chamar para combinarmos a stack do projeto!', DATE_SUB(NOW(), INTERVAL 45 MINUTE)),
      ('c-2', 'p-3', 'u-mariana', 'Posso ajudar na parte de prototipação, Design System e UI/UX se precisarem de mais alguém na equipe!', DATE_SUB(NOW(), INTERVAL 30 MINUTE)),
      ('c-3', 'p-1', 'u-carlos', 'Excelente iniciativa, parabéns aos estudantes e desenvolvedores envolvidos na AgenTEC.', DATE_SUB(NOW(), INTERVAL 2 HOUR));
    `);

    console.log('✓ Seeding concluído com sucesso!');
  } else {
    console.log('✓ Banco já contém dados.');
  }

  const [t] = await conn.query('SHOW TABLES;');
  console.log('Tabelas no banco:', t);

  await conn.end();
}

main().catch(err => {
  console.error('Falha no init-db:', err);
  process.exit(1);
});
