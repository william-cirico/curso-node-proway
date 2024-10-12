import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import morgan from "morgan";

// Instância do express
const app = express();

// Configurando o CORS
app.use(
  cors({
    origin: "*",
  })
);

// Adicionando o middleware necessário para ler os dados do body
app.use(express.json());

// Adicionando o middleware para logging das requisições
app.use(morgan("dev"));

interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

// Banco de dados
const usuarios: Usuario[] = [
  { id: 1, nome: "William", email: "william@email.com", senha: "123456" },
];

// Função para remover dados sensíveis (senha)
// https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure
const removerDadosSensiveis = (usuario: Usuario): Omit<Usuario, "senha"> => {
  const { senha, ...usuarioComDadosFiltrados } = usuario;
  return usuarioComDadosFiltrados;
};

// Função para criptografar a senha
const criptografarSenha = (senha: string) => {
  return bcrypt.hashSync(senha, 10);
};

// Função para validar o e-mail
const validarEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Método GET: Rota padrão para verificar se a API está rodando
app.get("/", (_req, res) => {
  res.send("API está rodando...");
});

// Método GET: Obtém a lista de todos os usuários (sem senha)
app.get("/v1/usuarios", (_req, res) => {
  // Removendo dados sensíveis
  const usuariosLimpos = usuarios.map((usuario) =>
    removerDadosSensiveis(usuario)
  );

  res.json(usuariosLimpos);
});

// Método GET: Obtém os detalhes de um usuário específico pelo ID
app.get("/v1/usuarios/:id", (req, res) => {
  const id = +req.params.id;

  // Buscando o usuário no 'banco de dados'
  const usuario = usuarios.find((usuario) => usuario.id === id);

  // Se o usuário não for encontrado o código de erro apropriado deve ser retornado
  if (!usuario) {
    res.status(404).json({
      message: `Usuário com o ID ${id} não foi encontrado.`,
    });
    return;
  }

  // Removendo dados sensíveis (senha)
  const usuarioLimpo = removerDadosSensiveis(usuario);

  res.json(usuarioLimpo);
});

// Método PATCH: Cadastra um novo usuário
app.post("/v1/usuarios", (req, res) => {
  // Verificando se todos os dados foram enviados
  const camposObrigatorios = ["nome", "email", "senha"];
  const camposNaoInformados = camposObrigatorios.filter(
    (campo) => !req.body[campo]
  );

  // Caso haja algum campo não informado retornar a mensagem de erro
  if (camposNaoInformados.length > 0) {
    res.status(400).json({
      message: `Parâmetro(s) faltando: ${camposNaoInformados.join(", ")}`,
    });
    return;
  }

  // Verificando se o e-mail é válido
  if (!validarEmail(req.body.email)) {
    res.status(400).json({ message: "E-mail inválido." });
    return;
  }

  // Obtendo os dados do corpo da requisição
  const usuario = {
    id: (usuarios[usuarios.length - 1]?.id ?? 0) + 1,
    nome: req.body.nome,
    email: req.body.email,
    senha: criptografarSenha(req.body.senha),
  };

  // Verificando se já existe um usuário com o mesmo e-mail cadastrado
  const emailJaCadastrado = usuarios.find((u) => u.email === usuario.email);
  if (emailJaCadastrado) {
    res.status(409).json({
      message: `Já existe um usuário com o e-mail '${usuario.email}' cadastrado`,
    });
    return;
  }

  // Adicionando o novo usuário no banco de dados
  usuarios.push(usuario);

  // Removendo dados sensiveis
  const usuarioLimpo = removerDadosSensiveis(usuario);

  res.status(201).json(usuarioLimpo);
});

// Método PUT: Atualiza todos os dados do usuário
app.put("/v1/usuarios/:id", (req, res) => {
  // Obtendo o ID do parâmetro da URL
  const id = +req.params.id;

  // Verificando se o usuário existe
  const indexUsuario = usuarios.map((usuario) => usuario.id).indexOf(id);
  if (indexUsuario === -1) {
    res.status(404).json({
      message: `Usuário com o ID ${id} não foi encontrado`,
    });
    return;
  }

  // Verificando se todos os dados foram enviados
  const camposObrigatorios = ["nome", "email", "senha"];
  const camposNaoInformados = camposObrigatorios.filter(
    (campo) => !req.body[campo]
  );

  // Caso haja algum campo não informado retornar a mensagem de erro
  if (camposNaoInformados.length > 0) {
    res.status(400).json({
      message: `Parâmetro(s) faltando: ${camposNaoInformados.join(", ")}`,
    });
    return;
  }

  // Verificando se o e-mail é válido
  if (!validarEmail(req.body.email)) {
    res.status(400).json({ message: "E-mail inválido." });
    return;
  }

  // Verificando se já existe um usuário com o mesmo e-mail cadastrado
  const emailJaCadastrado = usuarios.find((u) => u.email === req.body.email);
  if (emailJaCadastrado && emailJaCadastrado.id !== id) {
    res.status(409).json({
      message: `Já existe um usuário com o e-mail '${req.body.email}' cadastrado`,
    });
    return;
  }

  // Atualizando todos os dados do usuário
  const usuarioAtualizado: Usuario = {
    id: usuarios[indexUsuario].id,
    nome: req.body.nome,
    email: req.body.email,
    senha: criptografarSenha(req.body.senha),
  };

  // Atualizando o usuário
  usuarios[indexUsuario] = usuarioAtualizado;

  // Removendo os dados sensíveis
  const usuarioLimpo = removerDadosSensiveis(usuarioAtualizado);

  res.json(usuarioLimpo);
});

// Método PATCH: Atualiza parcialmente os dados do usuário
app.patch("/v1/usuarios/:id", (req, res) => {
  // Obtendo o ID do parâmetro da URL
  const id = +req.params.id;

  // Verificando se o usuário existe
  const indexUsuario = usuarios.map((usuario) => usuario.id).indexOf(id);
  if (indexUsuario === -1) {
    res.status(404).json({
      message: `Usuário com o ID ${id} não foi encontrado`,
    });
    return;
  }

  // Obtendo o usuário atual
  const usuarioAtual = usuarios[indexUsuario];

  // Atualizando os campos permitidos se eles forem fornecidos
  const usuarioAtualizado: Usuario = {
    id: usuarioAtual.id, // O ID não pode ser alterado
    nome: req.body.nome || usuarioAtual.nome,
    email: req.body.email || usuarioAtual.email,
    senha: req.body.senha
      ? criptografarSenha(req.body.senha)
      : usuarioAtual.senha,
  };

  // Verificando se já existe um usuário com o mesmo e-mail
  if (
    req.body.email &&
    usuarios.find((u) => u.email === req.body.email && u.id !== id)
  ) {
    res.status(409).json({
      message: `Já existe um usuário com o e-mail '${req.body.email}' cadastrado`,
    });
    return;
  }

  // Atualizando o banco de dados
  usuarios[indexUsuario] = usuarioAtualizado;

  // Removendo os dados sensíveis antes de retornar
  const usuarioLimpo = removerDadosSensiveis(usuarioAtualizado);

  res.json(usuarioLimpo);
});

// Método DELETE: Remove um usuário
app.delete("/v1/usuarios/:id", (req, res) => {
  // Obtendo o ID do parâmetro da URL
  const id = +req.params.id;

  // Usuário já existe
  const indexUsuario = usuarios.map((usuario) => usuario.id).indexOf(id);

  if (indexUsuario === -1) {
    res.status(404).json({
      message: `Usuário com o ID ${id} não foi encontrado`,
    });
    return;
  }

  // Removendo o usuário do banco de dados
  usuarios.splice(indexUsuario, 1);

  res.status(204).end();
});

// Middleware de tratamento de erros
const errorHandler: ErrorRequestHandler = (err, _req, res) => {
  console.error(err.stack);
  res.status(500).json({ message: "Ocorreu um erro no servidor" });
};

// Adicionando o middleware no servidor (DEVE SER ADICIONADO APÓS AS ROTAS)
app.use(errorHandler);

export default app;
