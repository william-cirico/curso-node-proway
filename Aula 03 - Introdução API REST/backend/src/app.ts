import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import morgan from "morgan";

// Instância do express
const app = express();

// Configurando o CORS
app.use(cors({
    origin: "*",
}));

// Adicionando o middleware necessário para ler os dados do body
app.use(express.json());

// Adicionando o middleware para logging das requisições
app.use(morgan("dev"));

type Usuario = {
    id: number;
    nome: string;
    email: string;
    senha: string;
}

// Banco de dados
const usuarios: Usuario[] = [
    { id: 1, nome: "William", email: "william@email.com", senha: "123456" },
];

// https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure
const removerDadosSensiveis = (usuario: Usuario) => {
    const { senha, ...usuarioComDadosFiltrados } = usuario;
    return usuarioComDadosFiltrados;
};

const criptografarSenha = (senha: string) => {
    return bcrypt.hashSync(senha, 10);
};

app.get("/", (req, res) => {
    res.send("API está rodando...")
});

// Definindo as rotas
app.get("/v1/usuarios", (req, res) => {
    // Removendo dados sensíveis
    const usuariosLimpos = usuarios.map(usuario => removerDadosSensiveis(usuario));

    res.json(usuariosLimpos);
});

app.get("/v1/usuarios/:id", (req, res) => {
    const id = +req.params.id;

    // Buscando o usuário no 'banco de dados'
    const usuario = usuarios.find(usuario => usuario.id === id);

    // Se o usuário não for encontrado o código de erro apropriado deve ser retornado
    if (!usuario) {
        res.status(404).json({ message: `Usuário com o ID ${id} não foi encontrado.` });
        return;
    }

    // Removendo dados sensíveis (senha)
    const usuarioLimpo = removerDadosSensiveis(usuario);

    res.json(usuarioLimpo);
});

app.post("/v1/usuarios", (req, res) => {
    // Verificando se todos os dados foram enviados
    const camposObrigatorios = ["nome", "email", "senha"];
    const camposNaoInformados = camposObrigatorios.filter(campo => !req.body[campo]);

    // Caso haja algum campo não informado retornar a mensagem de erro
    if (camposNaoInformados.length > 0) {
        res.status(400).json({ message: `Parâmetro(s) faltando: ${camposNaoInformados.join(", ")}` });
        return;
    }

    // Obtendo os dados do corpo da requisição
    const usuario = {
        id: (usuarios[usuarios.length - 1]?.id ?? 0) + 1,
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    };

    // Verificando se já existe um usuário com o mesmo e-mail cadastrado
    const emailJaCadastrado = usuarios.find(u => u.email === usuario.email);
    if (emailJaCadastrado) {
        res.status(409).json({ message: `Já existe um usuário com o e-mail '${usuario.email}' cadastrado`});
        return;
    }

    // Adicionando o novo usuário no banco de dados
    usuarios.push(usuario);

    // Removendo dados sensiveis
    const usuarioLimpo = removerDadosSensiveis(usuario);

    res.status(201).json(usuarioLimpo);
});

app.put("/v1/usuarios/:id", (req, res) => {
    // Obtendo o ID do parâmetro da URL
    const id = +req.params.id;

    // Verificando se o usuário existe
    const indexUsuario = usuarios.map(usuario => usuario.id).indexOf(id);
    if (indexUsuario === -1) {
        res.status(404).json({ message: `Usuário com o ID ${id} não foi encontrado` });
        return;
    }

    // Verificando se todos os dados foram enviados
    const camposObrigatorios = ["nome", "email"];
    const camposNaoInformados = camposObrigatorios.filter(campo => !req.body[campo]);

    // Caso haja algum campo não informado retornar a mensagem de erro
    if (camposNaoInformados.length > 0) {
        res.status(400).json({ message: `Parâmetro(s) faltando: ${camposNaoInformados.join(", ")}` });
        return;
    }

    // Obtendo os dados do corpo da requisição
    const usuario = {
        id: usuarios[indexUsuario].id,
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    };

    // Verificando se já existe um usuário com o mesmo e-mail cadastrado
    const emailJaCadastrado = usuarios.find(u => u.email === usuario.email);
    if (emailJaCadastrado && emailJaCadastrado.id !== usuario.id) {
        res.status(409).json({ message: `Já existe um usuário com o e-mail '${usuario.email}' cadastrado`});
        return;
    }

    // Criptografando a senha
    if (usuario.senha) {
        usuario.senha = criptografarSenha(usuario.senha);
    } else {
        usuario.senha = usuarios[indexUsuario].senha;
    }

    // Atualizando o usuário
    usuarios[indexUsuario] = usuario;

    // Removendo os dados sensíveis
    const usuarioLimpo = removerDadosSensiveis(usuario);

    res.json(usuarioLimpo);
});

app.delete("/v1/usuarios/:id", (req, res) => {
    // Obtendo o ID do parâmetro da URL
    const id = +req.params.id;
    
    // Usuário já existe
    const indexUsuario = usuarios.map(usuario => usuario.id).indexOf(id);

    if (indexUsuario === -1) {
        res.status(404).json({ message: `Usuário com o ID ${id} não foi encontrado` });
        return;
    }

    // Removendo o usuário do banco de dados
    usuarios.splice(indexUsuario, 1);

    res.status(204).end();
});

export default app;