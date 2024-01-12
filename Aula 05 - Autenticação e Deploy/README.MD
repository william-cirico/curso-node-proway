# Aula 05 - Autenticação e Deploy
## Conteúdos abordados:
- [ ] Autenticação com token JWT
- [ ] Preparação e deploy da API

## Autenticação com token JWT
<img src="https://docs.intersystems.com/irislatest/csp/docbook/images/gauthn_jwt_overview_flow.png" />

O JSON Web Token (JWT) é um padrão aberto (RFC 7519) que define uma maneira compacta e independente de transmitir informações de forma segura entre partes como um objeto JSON. Esta informação pode ser verificada e confiável porque é assinada digitalmente. Os JWTs podem ser assinados usando um segredo (com o algoritmo HMAC) ou um par de chaves pública/privada usando RSA ou ECDSA.

###Estrutura de um JWT###
Um JWT é composto por três partes:

**Header (Cabeçalho)**: O cabeçalho tipicamente consiste em duas partes: o tipo do token, que é JWT, e o algoritmo de assinatura sendo usado, como HMAC SHA256 ou RSA.

**Payload (Carga Útil)**: O payload contém as reivindicações. As reivindicações são declarações sobre uma entidade (geralmente, o usuário) e dados adicionais. Existem três tipos de reivindicações: registradas, públicas e privadas.

**Signature (Assinatura)**: Para criar a assinatura, você deve pegar o header codificado, o payload codificado, um segredo, o algoritmo especificado no header, e assinar isso.

###Como Funciona o JWT###
**Autenticação**: Após o login, o JWT é retornado ao usuário. Em cada solicitação subsequente, o token é enviado de volta ao servidor para validar o usuário e permitir acesso a recursos protegidos.

**Intercâmbio de Informações**: Os JWTs são uma boa maneira de transmitir informações de forma segura entre as partes. Por exemplo, em um sistema cliente-servidor, eles podem ser usados para autenticar a comunicação entre o cliente e o servidor.

Site para testar os tokens: https://jwt.io/.

## Deploy
O deploy, ou implantação, é um termo amplamente utilizado no contexto do desenvolvimento de software para descrever o processo de disponibilizar uma aplicação ou atualização de software para uso. Este processo é um aspecto fundamental do ciclo de vida do desenvolvimento de software e envolve várias etapas críticas para garantir que o software funcione corretamente no ambiente de produção, que é onde os usuários finais podem acessá-lo.

### Passos para realizar o Deploy na Render
1. Adicionar o script de build e start no **package.json**:
```
"scripts": {
    "dev": "npx nodemon",
    "build": "npx tsc",
    "start": "node dist/server.js"
}
```

2. Publique o seu repositório no GitHub (a branch utilizada para o deploy será a main)

3. Acesse o site do render e crie uma conta: https://render.com/

4. Crie um serviço de postgres

5. Crie um novo webservice no render, informe as configurações conforme descritas abaixo:
- **Build Command**: npm ci && npm run build
- **Start Command**: npm start
- **Configure as variáveis de ambientes necessárias**
