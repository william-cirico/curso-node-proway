const { somar, subtrair } = require("./exportandoModulos");
const calculadora = require("./exportandoModulos");

const N1 = 10;
const N2 = 20;

console.log(`A soma de ${N1} com ${N2} é: ${somar(N1, N2)}`);
console.log(`A diferença de ${N1} com ${N2} é: ${subtrair(N1, N2)}`);
console.log(`O quociente de ${N1} com ${N2} é: ${calculadora.dividir(N1, N2)}`);
console.log(`O produto de ${N1} com ${N2} é: ${calculadora.multiplicar(N1, N2)}`);