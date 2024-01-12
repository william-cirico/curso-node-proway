# Aula 04 - Conectando ao Banco de Dados
## Conteúdos abordados:
- [ ] Conexão com o banco de dados utilizando ORM (TypeORM)
- [ ] Estruturando a aplicação com o padrão MVC

## Padrão MVC
O padrão MVC, abreviação de Model-View-Controller, é uma abordagem arquitetônica amplamente utilizada no desenvolvimento de software para implementar interfaces de usuário. Ele divide a aplicação em três componentes interconectados, cada um responsável por aspectos distintos da aplicação. Esta separação ajuda a gerenciar a complexidade e facilita a manutenção e escalabilidade do software.

Modelo (Model): Representa a lógica de negócios e os dados da aplicação. O modelo é responsável por acessar o armazenamento de dados, como bancos de dados, e definir as regras para como os dados podem ser alterados e manipulados. Ele não tem conhecimento da interface do usuário, permitindo que os dados possam ser reutilizados em diferentes interfaces.

Visão (View): É a interface com o usuário. A visão exibe os dados do modelo para o usuário e também envia as interações do usuário (como cliques de botão, entrada de dados) para o controlador. Normalmente, a visão é composta de elementos de interface do usuário, como botões, caixas de texto, menus, etc. É importante notar que a visão é passiva, ou seja, ela não realiza qualquer processamento de dados, apenas exibe os resultados recebidos do modelo.

Controlador (Controller): Atua como intermediário entre o modelo e a visão. Recebe as entradas do usuário através da visão, processa-as (possivelmente alterando o estado do modelo) e, em seguida, atualiza a visão para refletir as mudanças no modelo. O controlador é a peça central que conecta o modelo e a visão, controlando o fluxo de dados entre eles e as regras de negócio.

O padrão MVC promove a separação de responsabilidades, o que facilita o teste e a manutenção do código. Além disso, ao separar a interface do usuário da lógica de negócio, torna-se mais fácil modificar uma parte da aplicação sem afetar as outras. Por exemplo, a interface do usuário pode ser redesenhada sem alterar a lógica subjacente de manipulação de dados.

O padrão MVC é amplamente utilizado em frameworks de desenvolvimento web, como Ruby on Rails, Django (Python) e ASP.NET MVC, entre outros. Esses frameworks fornecem uma estrutura que facilita a implementação do MVC, permitindo aos desenvolvedores se concentrarem mais na lógica específica da aplicação e menos na arquitetura subjacente.

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
