import app from "./app";

const PORTA = 8080;

app.listen(PORTA, () => {
  console.warn(
    `O servidor de desenvolvimento está rodando em: http://localhost:${PORTA}`
  );
});
