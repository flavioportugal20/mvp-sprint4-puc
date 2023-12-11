# Projeto

Este projeto é parte do meu MVP da Sprint 4 do curso de **Arquitetura de Software**.

Consiste em um front-end de um sistema de cadastro de águas, onde são realizadas requisições ao back-end  para obter, salvar, editar, excluir e listar dados.

O projeto permite cadastrar uma água, a fim de classificar se ela é segura para consumo humano. A classificação é feita através de um modelo de *machine learning*m, embarcado no *back-end*,  utilizando métodos clássicos para realizar a predição da classe de saída e exibir o resultado na tela.

No cadastro de águas você pode criar, alterar, excluir e listar.

##  Frontend

### Como executar em modo de desenvolvimento

Basta fazer o download do projeto e abrir o arquivo index.html no seu browser.

## Backend

### Como executar em modo de desenvolvimento

Será necessário ter todas as libs python listadas no `requirements.txt` instaladas.
Após clonar o repositório, é necessário ir ao diretório raiz, pelo terminal, para poder executar os comandos descritos abaixo.

> É fortemente indicado o uso de ambientes virtuais do tipo [virtualenv](https://virtualenv.pypa.io/en/latest/installation.html).

```
(env)$ pip install -r requirements.txt
```

Este comando instala as dependências/bibliotecas, descritas no arquivo `requirements.txt`.

Para executar a API  basta executar:

```
(env)$ flask run --host 0.0.0.0 --port 5000
```

Em modo de desenvolvimento é recomendado executar utilizando o parâmetro reload, que reiniciará o servidor
automaticamente após uma mudança no código fonte.

```
(env)$ flask run --host 0.0.0.0 --port 5000 --reload
```

Abra o [http://localhost:5000/#/](http://localhost:5000/#/) no navegador para verificar o status da API em execução.