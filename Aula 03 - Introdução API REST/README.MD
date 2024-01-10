# Aula 03 - Introdução API REST
## Conteúdos abordados:
- [ ] O que são REST APIs
- [ ] Métodos HTTP utilizados nas requisições
  - [ ] GET
  - [ ] POST
  - [ ] PUT
  - [ ] DELETE
- [ ] Construção de API REST simples
- [ ] Logging de requisições com Morgan
- [ ] CORS
- [ ] Consumo de APIS no lado do Cliente (GET)

## Atividade
Incremente a API de tarefas implementada em sala para armazenar as tarefas de cada usuário. Os endpoints que devem estar presentes na API são:
- **GET /v1/todos** -> Lista todas as tarefas cadastradas.
- **GET /v1/todos/:id** -> Mostra os detalhes de uma tarefa.
-- **GET /v1/usuarios/:id/todos** -> Mostra todas as tarefas de um usuário.
- **POST /v1/todos** -> Cria uma tarefa para um usuário.
- **PUT /v1/todos/:id** -> Atualiza uma tarefa.
- **DELETE /v1/todos/:id** -> Remover uma tarefa.

Cada tarefa deve ser composta de:
- id
- nome
- descrição
- data de conclusão
- data prevista de conclusão
- id do usuário
