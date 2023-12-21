var axiosConfig = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
    }
}

axios.get("http://localhost:5555/games",axiosConfig).then(res => { //Diz que a url se chamará res
    var games = res.data.games; //ao usar o cors, ele disponibiliza os dados para usarmos, e 'data' carrega dentro de si as informações dos games
    var list = document.getElementById("games"); //criamos essa variável para buscar o array de games

    games.forEach(game => { //"Despedaçamos" games com forEach
        var item = document.createElement("li"); //Determina que os dados terão como base 'li'
        item.innerHTML = `${game.id} - ${game.title} - ${game.year} - R$${game.price} ` //Mostra o title de cada game

        item.setAttribute("data-id",game.id); //Esses atributos "data..." serve para ter um nome dinâmico no proprio html renderizado pelo DOM no navegador
        item.setAttribute("data-title",game.title); //A esquerda determinamos o nome, e a direita determinamos de onde vai vir o valor desse nome
        item.setAttribute("data-year",game.year);
        item.setAttribute("data-price",game.price);

        var deleteBtn = document.createElement("button");
        var editBtn = document.createElement("button");
        deleteBtn.innerHTML = "Deletar";
        editBtn.innerHTML = "Editar";
        deleteBtn.addEventListener("click",function(){ //Com esse event, ao clicar no botão delete no html, o item será excluido
            deleteGame(item);
        })
        editBtn.addEventListener("click",function(){ //Com esse event, ao clicar no botão delete no html, o item será excluido
            editGame(item);
        })

        item.appendChild(deleteBtn); //Para cada item da lista irei criar um botão delete
        item.appendChild(editBtn);
        list.appendChild(item); //Adiciona os filhos de list, com base em 'item' que entrega os nomes formatados em 'li'
    });
}).catch(err => {
    console.log(err);
});

function login(){
    //Ao clicar no botão function (onclick) irá extrair as informações digitados no campo
    var emailField = document.getElementById("email");
    var passwordField = document.getElementById("password");

    //E irá tratá-las para as variáveis abaixo, colocando-as como valores
    var email = emailField.value;
    var password = passwordField.value;

    axios.post("http://localhost:5555/auth",{
        email,
        password
    }).then(res => {
        var token = res.data.token;
        localStorage.setItem("token",token); //Na esquerda define o nome, e a direita o valor
        axiosConfig.headers.Authorization = "Bearer " + localStorage.getItem("token");
        location.reload();
    }).catch(err => {
        alert("Login inválido.");
    })
}

function logout(){
    localStorage.removeItem("token");
    location.reload();
}

function createGame(){
    var titleInput = document.getElementById("title");
    var yearInput = document.getElementById("year");
    var priceInput = document.getElementById("price");

    var game = {
        title: titleInput.value,
        year: yearInput.value,
        price: priceInput.value
    }

    axios.post("http://localhost:5555/game",game,axiosConfig).then(res => { //Uso o método post para essa rota para poder adicionar um novo game com uma interface, e colocamos game ao final para enviar dados para o game
        if(res.status == 200){
            alert("Game cadastrado com sucesso.");
            location.reload(); //Faz reload da página automaticamente ao adicionar um novo game
        }
    }).catch(err => {
        console.log(err);
    });
}

function deleteGame(listItemId){
    var id = listItemId.getAttribute("data-id");
    axios.delete("http://localhost:5555/game/"+id,axiosConfig).then(res => {
        alert("Game deletado com sucesso.");
        location.reload();
    }).catch(err => {
        console.log(err);
    })
}

function editGame(listItemId){
    var id = listItemId.getAttribute("data-id");
    var title = listItemId.getAttribute("data-title");
    var year = listItemId.getAttribute("data-year");
    var price = listItemId.getAttribute("data-price");
    document.getElementById("idEdit").value = id;
    document.getElementById("titleEdit").value = title;
    document.getElementById("yearEdit").value = year;
    document.getElementById("priceEdit").value = price;
}

function updateGame(){

    var idInput = document.getElementById("idEdit");
    var titleInput = document.getElementById("titleEdit");
    var yearInput = document.getElementById("yearEdit");
    var priceInput = document.getElementById("priceEdit");

    var game = {
        title: titleInput.value,
        year: yearInput.value,
        price: priceInput.value
    }
    
    var id = idInput.value;

    axios.put("http://localhost:5555/game/"+id,game,axiosConfig).then(res => { //Uso o método post para essa rota para poder adicionar um novo game com uma interface, e colocamos game ao final para enviar dados para o game
        if(res.status == 200){
            alert("Game atualizado com sucesso.");
            location.reload(); //Faz reload da página automaticamente ao adicionar um novo game
        }
    }).catch(err => {
        console.log(err);
    });
}