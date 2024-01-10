import app from "./app";

const PORTA = 8080;

app.listen(PORTA, () => {
    console.log(`O servidor de desenvolvimento está rodando em: http://localhost:${PORTA}`);
});