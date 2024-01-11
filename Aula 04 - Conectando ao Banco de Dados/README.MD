# Aula 04 - Conectando ao Banco de Dados
## Conteúdos abordados:
- [ ] Conexão com o banco de dados utilizando ORM (TypeORM)
- [ ] Estruturando a aplicação com o padrão MVC

## Padrão MVC
![alt text][https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/ModelViewControllerDiagram2.svg/1200px-ModelViewControllerDiagram2.svg.png
 "Padrão MVC"]

## Atividade
Incremente a API de tarefas implementada em sala para armazenar as tarefas de cada usuário no banco de dados. Os endpoints que devem estar presentes na API são:
- **GET /v1/todos** -> Lista todas as tarefas cadastradas.
- **GET /v1/todos/:id** -> Mostra os detalhes de uma tarefa.
- **GET /v1/usuarios/:id/todos** -> Mostra todas as tarefas de um usuário.
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
