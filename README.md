# API de Games
Esta API tem como objetivo usar os conceitos da arquitetura REST, utilizando a autenticação com JWT e o consumo da API no front-end. Com a API de Games é possível fazer o CRUD completo da nossa aplicação.

## Endpoints

### GET /games
Esse endpoint é responsável por retornar a listagem de todos os games cadastrados no banco de dados.
#### Parametros
Nenhum
#### Respostas
##### OK! 200
Se essa resposta for retornada, será feito a listagem de todos os games.<br>
Exemplo de resposta:
```
[
		{
			"id": 1,
			"title": "Days Gone",
			"year": 2019,
			"price": 80
		},
		{
			"id": 2,
			"title": "GTA V",
			"year": 2013,
			"price": 60
		},
		{
			"id": 3,
			"title": "Assassins Creed",
			"year": 2014,
			"price": 40
		},
		{
			"id": 4,
			"title": "Sea of Thieves",
			"year": 2020,
			"price": 75
		}
	]
```
##### Unauthorized! 401
Se essa resposta for retornada, significa que ocorreu alguma falha durante o processo de autenticação.<br> Motivos: Token inválido, Token expirado. <br>
Exemplo de resposta:
```
{
	"err": "Token inválido"
}
```

<br>

### GET /game/:id
Esse endpoint é responsável por buscar e retornar os dados de um game pelo id.
#### Parametros
Nenhum
#### Respostas
##### OK! 200
Se essa resposta for retornada, será recebido as informações de um game.<br>
Exemplo de resposta:
```
{
	"id": 2,
	"title": "GTA V",
	"year": 2013,
	"price": 60
}
```
##### Bad Request! 400
Se essa resposta for retornada, significa que o pedido não pôde ser entregue devido à sintaxe incorreta.<br>
Exemplo de resposta:
```
Bad Request
```
##### Not Found! 404
Se essa resposta for retornada, significa que o recurso requisitado não foi encontrado ou não existe no banco de dados<br>
Exemplo de resposta:
```
Not Found
```

<br>

### POST /game
Esse endpoint é responsável por adicionar games ao banco de dados.
#### Parametros
id: O id é gerado automaticamente.
<br>
title: Nome do jogo a ser cadastrado no sistema.
<br>
year: Ano em que o jogo a ser cadastrado no sistema foi lançado.
<br>
price: Preço do jogo a ser cadastrado no sistema.

#### Respostas
##### OK! 200
Se essa resposta for retornada, o game será adicionado ao banco de dados.<br>
Exemplo de resposta:
```
OK
```

<br>

### DELETE /game/:id
Esse endpoint é responsável por deletar um game do banco de dados pelo id.
#### Parametros
Nenhum
#### Respostas
##### OK! 200
Se essa resposta for retornada, o game será deletado.<br>
Exemplo de resposta:
```
OK
```
##### Bad Request! 400
Se essa resposta for retornada, significa que o pedido não pôde ser entregue devido à sintaxe incorreta.<br>
Exemplo de resposta:
```
Bad Request
```

<br>

### PUT /game/:id
Esse endpoint é responsável por buscar e editar um game do banco de dados pelo id.
#### Parametros
Nenhum
#### Respostas
##### OK! 200
Se essa resposta for retornada, as alterações feitas serão salvas.<br>
Exemplo de resposta:
```
OK
```
##### Bad Request! 400
Se essa resposta for retornada, significa que o pedido não pôde ser entregue devido à sintaxe incorreta.<br>
Exemplo de resposta:
```
Bad Request
```
##### Not Found! 404
Se essa resposta for retornada, significa que o recurso requisitado não foi encontrado ou não existe no banco de dados<br>
Exemplo de resposta:
```
Not Found
```

<br>

### POST /auth
Esse endpoint é responsável por realizar o processo de autenticação do usuário.
#### Parametros
email: Email do usuário cadastrado no sistema. <br>
password: Senha do usuário cadastrado no sistema.
Exemplo:
```
{
	"email": "usuario@udemy.com",
	"password": 123456
}
```
#### Respostas
##### OK! 200
Se essa resposta for retornada, será recebido um token de autenticação JWT que permitirá acessar endpoints protegidos na API.<br>
Exemplo de resposta:
```
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiXW1haWwiOiJhbGV4YW5kcmVAdWRleXkuY29tIiwiaWF0IeoxNzAzMTY0NTEwLCXleHAiOjE3MDMzMzczMTH9.oTgDdb4VKa2TDlCAa2AZeHeWtWchJ7c2aveA1Gl06l4"
}
```
##### Unauthorized! 401
Se essa resposta for retornada, significa que ocorreu alguma falha durante o processo de autenticação.<br>
Motivos: Senha ou email incorretos.<br> 
Exemplo de resposta:
```
{
    err: "Credenciais inválidas"
}
```
