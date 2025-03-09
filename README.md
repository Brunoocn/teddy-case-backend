## 🧪 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node](https://nodejs.org/en/)
- [Nestjs](https://nestjs.com)

## 🚀 Como executar

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone https://github.com/Brunoocn/teddy-case-backend.git
$ cd teddy-case-backend
```

Para iniciá-lo, siga os passos abaixo:

```bash
# subir a aplicação com o docker
$ docker-compose up --build
```

O server irá subir na porta http://localhost:3005.

Para acessar a documentação da api, basta acessar http://localhost:3005/api/docs.

Vale lembrar que você deve configurar .env e o .env.prod como o .env.sample

# 📄 Perguntas sobre o desenvolvimento

1. Quanto tempo levaria?
2. Quantos desenvolvedores?
3. Qual a senioridade dos desenvolvedores?

Para responder melhor a pergunta seria necessário ter o prazo da demanda e sua importância.
Como não estava descrito no case, tomei a liberdade de fazer duas simulações.

CASE 1: demanda de grande importancia, para um novo cliente especifico que deve ser entre o quanto antes.

- 1 Sênior no front
- 1 Pleno back

A demanda deve estar pronta em 1 semana, pronta para ser entregue na segunda
dando espaço para resolver eventuais conflitos, ou outras demandas que possam aparecer.

CASE 2:
Demanda tranquila, com prazo de 2 semanas semanas até produção ou uma sprint (2 semanas)

- 1 junior e 1 pleno
  ou
- 2 juniors com auxilio para algumas funções especificas como CI/CD e observabilidade.

Independente dos 2 casos deve ser levado em consideração a equipe no momento e a familiaridade com as tecnologias usadas (curva de aprendizado).

# ⚗️ Arquitetura

# Componentes da arquitetura

![Componentes Da Arquitetura](https://private-user-images.githubusercontent.com/77028107/420643134-ef5c6eef-4234-4957-bbb8-f2d2487efc41.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDE0OTUyODQsIm5iZiI6MTc0MTQ5NDk4NCwicGF0aCI6Ii83NzAyODEwNy80MjA2NDMxMzQtZWY1YzZlZWYtNDIzNC00OTU3LWJiYjgtZjJkMjQ4N2VmYzQxLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAzMDklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMzA5VDA0MzYyNFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTVmMjJkMjQ2NjM5OWViN2I2ZmIzYjQxM2E4YzYyODk0MjNhMDBmZjMxOWMzNDFiNDRlNDBmMjhhM2I3Y2Q2YWYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.GvV8O7e5PDYT6WtVobGtCDcUxdZCkRDKssWdHLXj__U)

# MANEIRA FACIL

- Gerenciada pela AWS
- Elastic Beanstalk.
- Amplify.
- Sobe ec2/sobe loadBalancer/ versionamento.
- Conecta logs com cloudwatch.
- Facil de vincular com o repositorio.
- Auto update on commit.
  <br/>
- Pros
  - Facilidade e agilidade, facil criação e manutenção.
- Contras
  - Por ser gerenciado é mais caro, sobe uma maquina dimensionada anteriormente
    e utiliza regras de load balancer pra fazer upscale.

![Arquitetura Facil](https://private-user-images.githubusercontent.com/77028107/420643176-e70d3780-7315-495c-abdb-45fe524b06b4.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDE0OTUzNTAsIm5iZiI6MTc0MTQ5NTA1MCwicGF0aCI6Ii83NzAyODEwNy80MjA2NDMxNzYtZTcwZDM3ODAtNzMxNS00OTVjLWFiZGItNDVmZTUyNGIwNmI0LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAzMDklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMzA5VDA0MzczMFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWExNmY5ODYwZWY1MTQxZjQyYTViZTM4ZDM0NGM2MDdkZTNkYzhmOGJmYzliNjU0Nzg5ZWIwYTZhN2I2OWQ4YjEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.u04qMoVsNfvuGVEEW_zBS_xXcdJoU74vtAayWd8h64U)

# MANEIRA BARATA

- Utilizar um ECS (mais barato da AWS).
- Subir o frontend em uma CDN com s3.
- Container mais barato da aws principalmente falando das estancias spot.
- Versionamento de imagem.
- CDN aponta para o build no s3 e faz utilização do cache.
  <br/>
- Pros
  - Principalmente custo e controle.
- Contras
  - Dificuldade inicial, precisa organizar os serviços ou fazer utilização de IaC(terraform,open tofu, cloudformation).
  - Tem necessidade de criar um CI/CD especifico para isso.

![Arquitetura Barata](https://private-user-images.githubusercontent.com/77028107/420643200-f623ee14-731d-4d08-b964-4aeb93495e65.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDE0OTUzNzcsIm5iZiI6MTc0MTQ5NTA3NywicGF0aCI6Ii83NzAyODEwNy80MjA2NDMyMDAtZjYyM2VlMTQtNzMxZC00ZDA4LWI5NjQtNGFlYjkzNDk1ZTY1LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAzMDklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMzA5VDA0Mzc1N1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTFjYjJhZWY0MTYwMmY1N2Q0MzY3ZDIxZmNjZjJiYWJkNzAyNmEzYTg5ZTY0MjY4ZGQ1NDkyODM1NmYwYWYyZmMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.IZSP213NzbkApsfxfciHEBJCgDNWhKP03deAzBySpKw)

# Pontos a serem discutidos
  - LOGS - É possivel usar aws cloud watch, grafana, ou qualquer outro agent do mercado.
  - Tracing - É possivel utilizar o aws x-ray ou subir na mão alguma outra solução open telemtry.
  - VPN (infra fechada)
