# Aula 03 - Introdução API REST
## Conteúdos abordados:
- [ ] O que são REST APIs
- [ ] Métodos HTTP utilizados nas requisições
  - [ ] GET
  - [ ] POST
  - [ ] PUT
  - [ ] PATCH
  - [ ] DELETE
- [ ] Construção de API REST simples
- [ ] Logging de requisições com Morgan
- [ ] CORS
- [ ] Consumo de APIS no lado do Cliente (GET)

## Como adicionar o TypeScript no projeto
1. Instale o typeScript, ts-node, nodemon e as bibliotecas de tipagem como dependências de desenvolvimento:
```
npm i -D typescript ts-node @types/express @types/node nodemon
```

2. Crie o arquivo de configuração do nodemon **nodemon.json**:
```
{
    "watch": ["src"],
    "ext": "ts",
    "exec": "ts-node ./src/server.ts"
}
```

3. Adicionar o comando para rodar a aplicação em desenvolvimento no arquivo **package.json**:
```
scripts: {
  ...outros scripts,
  "dev": "npx nodemon"
}
```



## Atividade
Incremente a API de tarefas implementada em sala para armazenar as tarefas de cada usuário. Os endpoints que devem estar presentes na API são:
- **GET /v1/tarefas** -> Lista todas as tarefas cadastradas.
- **GET /v1/tarefas/:id** -> Mostra os detalhes de uma tarefa.
- **GET /v1/usuarios/:id/tarefas** -> Mostra todas as tarefas de um usuário.
- **POST /v1/tarefas** -> Cria uma tarefa para um usuário.
- **PUT /v1/tarefas/:id** -> Atualiza todos os dados de uma tarefa.
- **PATCH /v1/taregas/:id** -> Atualiza parcialmente um tarefa.
- **DELETE /v1/tarefas/:id** -> Remove uma tarefa.

Cada tarefa deve ser composta de:
- id
- nome
- descrição
- data de conclusão
- data prevista de conclusão
- id do usuário
