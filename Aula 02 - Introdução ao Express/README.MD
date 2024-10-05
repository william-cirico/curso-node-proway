# Aula 02 - Introdução ao Express
## Conteúdos abordados:
- [ ] Express x Node
- [ ] Criando um servidor com Express
- [ ] Métodos HTTP
  - [ ] GET
  - [ ] POST
- [ ] Servindo arquivos estáticos
- [ ] Template Engine (Pug)

## Atividades
1)
# CLI de Gerenciamento de Tarefas

### 1) Desenvolver uma aplicação CLI em Node.js que permita ao usuário gerenciar suas tarefas diárias. A aplicação deverá permitir que o usuário adicione, remova e visualize tarefas através de comandos no terminal.

### Requisitos:
- O usuário deve ser capaz de adicionar uma tarefa.
- O usuário deve ser capaz de listar todas as tarefas.
- O usuário deve ser capaz de remover uma tarefa.
- O usuário deve ser capaz de marcar uma tarefa como concluída.
- As tarefas devem ser salvas em um arquivo JSON para persistência.

### Instruções:

#### Crie um projeto Node.js:

1. Inicie o projeto e instale as dependências necessárias.

#### Dependências recomendadas:
- `commander`: Para lidar com a CLI.
- `fs`: Para leitura e escrita no arquivo JSON.
- `chalk`: Para adicionar cores à saída no terminal.

#### Estrutura do projeto:
- Crie um arquivo `index.js` ou `tasks.js` para ser o ponto de entrada da CLI.
- Crie um arquivo `tasks.json` para armazenar as tarefas (pode começar com um array vazio).

### Comandos da CLI:

A CLI deve oferecer os seguintes comandos:

#### 1. Adicionar tarefa:
O comando permite que o usuário adicione uma tarefa. Deve incluir um título e uma descrição.

```bash
node tasks.js add --title "Comprar leite" --description "Ir ao mercado comprar leite"


2) Utilizando o express em conjunto com o pug faça um site com as seguintes rotas:
- **/** -> Página inicial que lista todos os clientes cadastrados no site.
- **/clientes/:id** -> Página que mostra detalhes de um cliente.
- **/clientes/cadastro** -> Página que permite o cadastro de um novo cliente.
