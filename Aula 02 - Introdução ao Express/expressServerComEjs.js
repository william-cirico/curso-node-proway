const express = require("express");
const dayjs = require("dayjs");
const path = require("node:path");

// Instância do express que será utilizada na aplicação
const app = express();

// Adicionando o middleware necessário para ler as informações enviadas no formulário
app.use(express.urlencoded({ extended: true }));

// Configurando os arquivos estáticos (imagens, js, css)
app.use("/static", express.static("public")); // /static é o prefixo para acessar esses arquivos

// Definindo o template engine como EJS
app.set("view engine", "ejs");

// Definindo o diretório onde as views estão localizadas
app.set("views", path.join(__dirname, "paginas-ejs"));

// Definindo as rotas da aplicação
app.get("/", (req, res) => {
    // Definindo o caminho até a página HTML
    const caminhoPagina = path.join(__dirname, "paginas-ejs", "index.html");

    // Retornando o arquivo HTML
    res.sendFile(caminhoPagina);
});

// Rota com arquivo estático
app.get("/fotos", (req, res) => {
    const caminhoPagina = path.join(__dirname, "paginas-ejs", "fotos.html");

    res.sendFile(caminhoPagina);
});

// Rota com conteúdo dinâmico (EJS)
app.get("/contato", (req, res) => {
    const dadosContato = {
        nome: "William Círico",
        email: "william.cirico@email.com",
        telefone: "(47) 9 9999-9999"
    };

    // Renderizando a página com os dados de contato
    res.render("contato", { dadosContato });
});

// Banco de dados fictício
const viagens = [
    { 
        id: 1, 
        destino: "Ilha do Mel", 
        data: "2024-01-08", 
        fotos: [
            "https://blog.livareviagens.com.br/wp-content/uploads/2020/10/vista-aerea-morro-do-farol-ilha-do-mel-1-1200x900.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Ilha_do_Mel_Paranagu%C3%A1_Paran%C3%A1_Brasil.jpg/640px-Ilha_do_Mel_Paranagu%C3%A1_Paran%C3%A1_Brasil.jpg"
        ],
    }
];

// Rota dinâmica
app.get("/viagem/:id", (req, res) => {
    const id = req.params.id;

    const viagem = viagens.find(viagem => viagem.id == id);

    if (!viagem) {
        res.send("<h1>Viagem não encontrada!</h1>");
        return;
    }

    // Formatando a data para exibição
    viagem.data = dayjs(viagem.data).format("DD/MM/YYYY");

    res.render("viagem", { viagem });
});

// Rotas para cadastro de dados

// Rota utilizada para abrir o formulário de cadastro (GET)
app.get("/cadastro/viagem", (req, res) => {
    const caminhoPagina = path.join(__dirname, "paginas-ejs", "cadastro-viagem.html");

    res.sendFile(caminhoPagina);
});

// Rota utilizada para o cadastro do formulário (POST)
app.post("/cadastro/viagem", (req, res) => {
    const id = (viagens[viagens.length - 1]?.id ?? 0) + 1;
    
    const novaViagem = {
        id,
        destino: req.body.destino,
        data: req.body.data,
        fotos: req.body.fotos.split("\n")
    }

    viagens.push(novaViagem);
    res.redirect(`/viagem/${id}`);
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log("Servidor Express rodando na porta: ", PORT);
});
