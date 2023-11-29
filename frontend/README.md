# Meu Front (Componente A)

Este projeto é parte do meu MVP da disciplina **Arquitetura de Software**.

Consiste em um front-end de um sistema de cadastro de visitantes, onde são realizadas requisições ao back-end  para obter, salvar, editar e excluir dados.

O projeto de cadastro de visitantes, permite criar um visitante e cadastrar o seu acesso, a fim de ter um controle de entrada de pessoas.

No cadastro de visitantes você pode criar, alterar, excluir e listar visitantes.

No cadastro de acessos você pode criar e listar acessos.

---
## Como executar em modo de desenvolvimento

Basta fazer o download do projeto e abrir o arquivo index.html no seu browser.

## Como executar através do Docker

Certifique-se de ter o [Docker](https://docs.docker.com/engine/install/) instalado e em execução em sua máquina.

Navegue até o diretório que contém o Dockerfile no terminal.
Execute **como administrador** o seguinte comando para construir a imagem Docker:

```
$ sudo docker build -t frontend:1.0 .
```

Uma vez criada a imagem, para executar o container basta executar, **como administrador**, o seguinte o comando:

```
$ sudo docker run --rm -p 8080:80 frontend:1.0
```

Uma vez executando, para acessar o front-end, basta abrir o [http://localhost:8080/#/](http://localhost:8080/#/) no navegador.

## Informações da API externa (Componente B)

Neste projeto é utilizado apenas a API externa [OpenCEP](https://opencep.com).
A OpenCEP é uma API pública para consulta de CEPs totalmente gratuita e Open Source.

- Licença de uso: Gratuita
- Cadastro: Não necessário
- Rotas disponibilizadas: (via get) -> opencep.com/v1/

Neste projeto foi utilizado apenas a rota **opencep.com/v1/** via get, passando o cep através da url, a fim de preencher os campos Logradouro, Bairro e Cidade/Estado automaticamente quando inserido um CEP válido no campo CEP.


Exemplo de uso realizando uma requisição via get passando um CEP:

```
https://opencep.com/v1/15050305
```

Retorno da requisição:

```
{
  "cep": "15050-305",
  "logradouro": "Rua Josina Teixeira de Carvalho",
  "complemento": "",
  "bairro": "Vila Anchieta",
  "localidade": "São José do Rio Preto",
  "uf": "SP",
  "ibge": "3549805"
}

```

