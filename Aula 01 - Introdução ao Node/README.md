# Aula 01 - Introdução ao Node
## Conteúdos abordados:
- [ ] Node x JavaScript
- [ ] Módulos built-in
  - os
  - process
  - child_process
  - path
  - fs
- [ ] Trabalhando com módulos (CommonJS)
- [ ] Instalação de pacotes externos com NPM
- [ ] Leitura e escrita de arquivos
- [ ] Gerando executáveis de projetos em node (pkg)

### Node x JavaScript
![image](https://github.com/william-cirico/curso-node-proway/assets/69127474/cf7865ed-010e-4b3d-8d4c-2f28ffab5346)

**JavaScript** é uma linguagem de programação amplamente utilizada para scripting do lado do cliente em navegadores, permitindo interatividade e manipulação de páginas web. **Node.js**, por outro lado, é um ambiente de execução que permite usar JavaScript no lado do servidor, expandindo seu uso para além dos navegadores. Enquanto JavaScript gerencia a interatividade e a apresentação no front-end, Node.js habilita o desenvolvimento back-end, como a criação de servidores web e o acesso a bancos de dados, utilizando a mesma linguagem de programação.
## Exercícios
1. Crie um script que irá salvar as informações da memória a cada 5 segundos em um arquivo chamado log.txt.
As informações deverão ser salvas no formato: **Memória total: XX GB, Memória livre: XX GB, Utilização da memória: XX %.**

2. Crie um script que leia o arquivo **exercicios/nomes.txt** e mostra todos os nomes que começam com a letra A presentes no arquivo.

3. Crie uma função **hasUser(nome, arquivo)** que retorne verdadeiro ou falso caso encontre o usuário dentro do arquivo. (Usar o arquivo nomes.txt).

4. Crie uma função **getUserByName(nome)** que retorne os dados de um usuário presentes no arquivo **exercicios/users.json**. Caso o usuário não exista a função deve retornar a mensagem “Usuário não foi encontrado”.

5. Faça um script que leia o arquivo **exercicios/nomes.txt** e utilize a biblioteca **chalk** (https://www.npmjs.com/package/chalk) para mostrar os nomes que começam com a letra A em vermelho, os nomes que começam com a letra C em azul e os nomes que começam com a letra D em magenta.
