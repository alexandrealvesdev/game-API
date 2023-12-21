const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
app.use(cors());

const JWTSecret = "Senha123"; //Essa senha nao pode ser vista por ninguém

//BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function auth(req,res,next){ //Isso é um middleware, resumindo, quando o usuário entrar em uma rota, primeiramente terá que passar por uma condição(middleware)
    const authToken = req.headers["authorization"];

    if(authToken != undefined){
        const bearer = authToken.split(" ");
        const token = bearer[1];

        jwt.verify(token,JWTSecret,(err,data) => {
            if(err){
                res.status(401);
                res.json({err: "Token inválido"})
            }else{
                req.token = token;
                req.loggedUser = {id: data.id, email: data.email}
                console.log(data);
                next(); //Quando uma requisição do middeware JWT for concluida com sucesso coloque next(), pois sem ele a pagina não carregará
            }
        });
    }else{
        res.status(401);
        res.json({err: "Token inválido"})
    }
}

var bancoDados = {
    games: [
        {
            id: 1,
            title: "Days Gone",
            year: 2019,
            price: 80
        },
        {
            id: 2,
            title: "GTA V",
            year: 2013,
            price: 60
        },
        {
            id: 3,
            title: "Assassins Creed",
            year: 2014,
            price: 40
        },
        {
            id: 4,
            title: "Sea of Thieves",
            year: 2020,
            price: 75
        }
    ],
    users: [
        {
            id: 1,
            name: "Alexandre",
            email: "alexandre@udemy.com",
            password: "123456"
        },
        {
            id: 2,
            name: "Kamilla",
            email: "kamilla@udemy.com",
            password: "123456"
        }
    ]
}

app.get("/games",auth, (req, res) => {
    res.statusCode = 200; //Tendo auth na minha rota, posso puxar dados do usuário e citar aqui, como por exemplo mostrar o nome dele dinamicamente, seu email, etc..
    res.json({games: bancoDados.games});
});

app.get("/game/:id",auth, (req, res) => {
    let id = req.params.id;

    if(isNaN(id)){
        res.sendStatus(400);
    }else{
        id = parseInt(id);
        var game = bancoDados.games.find(g => g.id == id);

        if(game != undefined || game != null){
            res.statusCode = 200;
            res.json(game);
        }else{
            res.sendStatus(404);
        }
    }
});

app.post("/game",auth, (req, res) => { //Quando desenvolvemos api não precisamos usar /game/new, só pelo post o dev já entende que é para criar um novo game
    const { title, price, year } = req.body;

    bancoDados.games.push({
        id: bancoDados.games.length + 1,
        title,
        year,
        price
    });
    res.sendStatus(200);
});

app.delete("/game/:id",auth,(req,res) => { //Essa rota delete você nao usa em projetos como o blog, somente em API'S
    var id = req.params.id;
    
    if(isNaN(id)){
        res.sendStatus(400);
    }else{
        id = parseInt(id);
        var index = bancoDados.games.findIndex(g => g.id == id);
        if(index == -1){
            res.sendStatus(400);
        }else{
            bancoDados.games.splice(index,1);
            res.sendStatus(200);
        }
    }
});

app.put("/game/:id",auth,(req,res) => {
    var id = req.params.id;
    var game = bancoDados.games.find(game => game.id == id);

    if (game) {
        var {title,price,year} = req.body;
        if(title != undefined){
            game.title = title;
        }
        if(price != undefined){
            game.price = price;
        }
        if(year != undefined){
            game.year = year;
        }

        res.sendStatus(200);

    } else if (isNaN(Number(id))) {
        res.sendStatus(400);
    } else {
        res.sendStatus(404);
    }
});

app.post("/auth", (req,res) => {
    var {email,password} = req.body;

    if(email != undefined){
        var user = bancoDados.users.find(u => u.email = email);
        if(user != undefined){
            if(user.password == password){
                jwt.sign({id: user.id,email: user.email},JWTSecret,{expiresIn:"48h"},(err,token) => { //Carregue aqui sometne informaçoes a respeito do usuário, mas nunca dados sensíveis, logo em seguida passamos a chave secreta fora do json, e por fim o tempo em que a chave irá expirar
                    if(err){
                        res.status(400);
                        res.json({err: "Falha interna"})
                    }else{
                        res.status(200);
                        res.json({token: token});
                    }
                })
            }else{
                res.status(403);
                res.json({err: "Credenciais inválidas"});
            }

        }else{
            res.status(404);
            res.json({err: "O email informado não existe!"});
        }

    }else{
        res.status(400);
        res.json({err: "Email inválido"});
    }
});

app.listen(5555, () => {
    console.log("API RODANDO.");
});