/*
O node possui vários módulos nativos que são utilizados para diversas aplicações.

Nesse arquivo veremos três desses módulos:

- OS: Fornece métodos e propriedades relacionados ao sistema operacional.
- PROCESS: Fornece informações e controle sobre o processo que está sendo executado.
- CHILD_PROCESS: Fornece métodos necessários para trabalhar com subprocessos.
*/

// Importando módulos nativos
const os = require("node:os");
const process = require("node:process");
const child_process = require("child_process");

// Módulo OS
console.log("Informações sobre os núcleos do meu processador: ", os.cpus());
console.log("Quantidade de núcleos do meu processador: ", os.cpus().length);

const memoriaLivreEmBytes = os.freemem();
console.log(`Quantidade total de memória livre no computador: ${memoriaLivreEmBytes}B`);

const tempoLigadoEmHoras = os.uptime() / 3600;
console.log(`O computador está ligado a: ${parseInt(tempoLigadoEmHoras)} horas`)
/*
Para converter de B para GB temos a seguinte tabela:

1 bit
1 B = 8 bits
1 KB = 1024 B
1 MB = 1024 KB
1 GB = 1024 MB
*/
const memoriaLivreEmGB = memoriaLivreEmBytes / 1024 / 1024 / 1024;
console.log(`Quantidade total de memória livre no computador: ${memoriaLivreEmGB.toFixed(2)}GB`);

const totalMemoriaRAMEmGB = os.totalmem() / 1024 / 1024 / 1024;
console.log(`O total de memória RAM que o meu computador possui é: ${totalMemoriaRAMEmGB.toFixed(2)}GB`);

// Módulo PROCESS
console.log("Versão do Node: ", process.version);

/*
Para definir uma variável de ambiente para o processo:
CMD: SET MINHA_VARIAVEL=valor && node index.js
POWERSHELL: $env:MINHA_VARIAVEL="valor"; node index.js
*/
console.log("Váriáveis de ambiente: ", process.env.TESTE);

console.log("Argumentos da linha de comando: ", process.argv);

// Capturar eventos de saída do processo:
process.on("exit", () => {
    console.log("Processo finalizado");
});

// Módulo CHILD_PROCESS

// Executar um comando no terminal
child_process.exec("dir", (error, stdout, stderr) => {
    if (error) {
        console.error("Erro ao executar o comando: ", error.message);
        return;
    }

    if (stderr) {
        console.error("Erro na execução: ", stderr);
        return;
    }

    console.log("Saída do comando: ", stdout);
});



