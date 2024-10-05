const express = require("express");
const dayjs = require("dayjs");
const path = require("node:path");

// Instância do express que será utilizada na aplicação
const app = express();

// Adicionando o middleware necessário para ler as informações enviadas no formulário
app.use(express.urlencoded({ extended: true }));

// Configurando os arquivos estáticos (imagens, js, css)
app.use("/static", express.static("public")); // /static é o prefixo para acessar esses arquivos

// Definindo o template engine
app.set("view engine", "pug");

// Definindo o diretório onde as views estão localizadas
app.set("views", path.join(__dirname, "paginas-pug"));

// Definindo as rotas da aplicação
app.get("/", (req, res) => {
    // Definindo o caminho até a página HTML
    const caminhoPagina = path.join(__dirname, "paginas-pug", "index.html");

    // Retornando o arquivo HTML
    res.sendFile(caminhoPagina);
});

// Rota com arquivo estático
app.get("/fotos", (req, res) => {
    const caminhoPagina = path.join(__dirname, "paginas-pug", "fotos.html");

    res.sendFile(caminhoPagina);
});

/* 
Rota com conteúdo dinâmico (pug): https://expressjs.com/en/guide/using-template-engines.html

Para utilizar conteúdo dinâmico nas páginas é necessário utilizar um template engine.

Vamos utilizar o pug, e, para isso é necessário instalá-lo com o seguinte comando:
- npm i pug
*/
app.get("/contato", (req, res) => {
    const dadosContato = {
        nome: "William Círico",
        email: "william.cirico@email.com",
        telefone: "(47) 9 9999-9999"
    };

    const caminhoPagina = path.join(__dirname, "paginas-pug", "contato");

    // Renderizando a página com os dados de contato
    res.render(caminhoPagina, dadosContato);
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
    const id = req.params.id; // Obtendo o ID do parâmetro da URL e convertendo para número.

    /*
    O que é a função find?
      A função find é um método de arrays em JavaScript. Ela é utilizada para encontrar o primeiro 
      elemento de um array que satisfaz uma condição especificada em uma função de callback. 
      Assim que um elemento que atende à condição é encontrado, find retorna esse elemento e não 
      verifica os elementos restantes.
    
    Como a função funciona?
      1. Iteração: find passa por cada elemento do array.
      2. Teste de condição: para cada elemento, find executa uma função que você define (callback).
      Esta função deve retornar true ou false.
      3. Encontrando o elemento:  Se a função de callback retorna true para um elemento, find 
      retorna esse elemento imediatamente e não continua a percorrer o restante do array.
      4. Resultado: Se nenhum elemento satisfaz a condição, find retorna undefined.
    */
    const viagem = viagens.find(viagem => viagem.id == id);

    if (!viagem) {
        res.send("<h1>Viagem não encontrada!</h1>");
        return;
    }

    // Formatando a data para exibição
    viagem.data = dayjs(viagem.data).format("DD/MM/YYYY");

    const caminhoPagina = path.join(__dirname, "paginas-pug", "viagem");

    res.render(caminhoPagina, viagem);
});

// Rotas para cadastro de dados

// Rota utilizada para abrir o formulário de cadastro (GET)
app.get("/cadastro/viagem", (req, res) => {
    const caminhoPagina = path.join(__dirname, "paginas-pug", "cadastro-viagem.html");

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