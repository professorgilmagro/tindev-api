[![CircleCI](https://circleci.com/gh/professorgilmagro/tindev-api.svg?style=shield)](https://circleci.com/gh/professorgilmagro/tindev-api)

# Sistema Backend NodeJS API

O backend da aplicação fornece uma API com os endpoints que é consumido pelos clients de frontend (web e mobile).
Este serve foi desenvolvido para atender aos clients provendo a consulta e persistência das informações ([MongoDB Cloud](https://www.mongodb.com/cloud/atlas)) além de atualizações em tempo real (Realtime via Websocket.io).
Um dos objetivos principais é simular a plataforma do Tinder, mas voltada para desenvolvedores. Projeto criado para fins de estudo e conhecimento.

### Instalação

#### 1. Instalação das dependências

```ssh
$ cd tindev-api
$ yarn install
```

#### 2. Execução do servidor

```ssh
$ yarn start
```

3. Acesso do endpoint de posts pode ser obtido em:
   http://localhost:8888/api/v1/devs

## Endpoints

-   Exibe a lista com todos os devs cadastrados: `GET /api/v1/devs/`
-   Cria um novo registro : `POST /api/v1/devs/`
-   Exibe dados de um único dev : `GET /api/v1/devs/:pk/`

## Heroku

Este projeto está disponível no Heroku:

https://tindev-api-v1.herokuapp.com/

## Libs utilizadas

#### Depedências

-   axios: 0.19.0
-   dotenv: 8.0.0
-   express: 4.17.1
-   mongoose 5.5.15
-   mongoose-paginate ^5.0.3
-   multer ^1.4.1
-   sharp ^0.22.1
-   socket.io ^2.2.0

#### Desenvolvimento

-   jest: 24.8.0
-   nodemon: 1.19.1
