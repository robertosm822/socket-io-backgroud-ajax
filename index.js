const io = require('socket.io')(8081);
const fetch = require("node-fetch");

/*
fetch('URL_GOES_HERE', { 
   method: 'post', 
   headers: new Headers({
     'Authorization': 'Basic '+btoa('username:password'), 
     'Content-Type': 'application/x-www-form-urlencoded'
   }), 
   body: 'A=1&B=2'
 });
*/
//let response;
io.on('connection', (socket) => {
    console.log("Conectado..");
    socket.emit('eu');

    //recebendo a mensagem enviada pelo cliente aqui no server
    socket.on('conversation', (data) => {

        setTimeout(function() {
            (async() => {
                let response = await fetch('https://api.github.com/users/robertosm822').then(res => {
                    return res.json();
                });
                console.log(response.name);
                socket.emit('respostas', {
                    message: "User: " + response.name + " | " + data.message
                });
            })();

        }, 500);

    });
});