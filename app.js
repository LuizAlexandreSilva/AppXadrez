const express = require("express");
const logger = require("morgan");
const router = require('./config/routes');
const app = express();
const handlebars = require('express-handlebars');
const sass = require('node-sass-middleware');
const cookieParser = require('cookie-parser');
const uuid = require('uuid/v4');
const session = require('express-session');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
var models = require('./app/models');
var Partida = models.partida;

const PORT = 4567;

io.on('connection', function (socket) {
    console.log('Novo usuário conectado!');

    socket.on('entrar', (idPartida) => {
        console.log('Usuário entrando na partida ' + idPartida);
        socket.join(idPartida);
    });

    socket.on('move', async (move) => {
        socket.to(move.partida).emit('move', move);
        var partida = await Partida.findByPk(move.partida);
        partida = await partida.update({ fen: move.position });
    });

    socket.on('winner', async (dados) => {
        var partida = await Partida.findByPk(dados.id_partida);
        partida = await partida.update({ winner: dados.vencedor });
    });

    socket.on('draw', async (partida) => {
        var partida = await Partida.findByPk(partida.idPartida);
        partida = await partida.update({ winner: partida.vencedor });
    });
});

app.use(logger("short"));

app.use(cookieParser());

app.use(sass({
    src: __dirname + '/public/scss',
    dest: __dirname + '/public/css',
    debug: true,
    outputStyle: 'compressed',
    prefix: '/css',
    force: true
}));
app.use('/public', express.static(__dirname + '/public/css'));

app.use('/img', [
    express.static(__dirname + '/public/img')
]);

app.use('/css', [
    express.static(__dirname + '/public/css/'),
    express.static(__dirname + '/node_modules/@chrisoakman/chessboardjs/dist/'),
]);

app.use('/js', [
    express.static(__dirname + '/node_modules/jquery/dist/'),
    express.static(__dirname + '/node_modules/popper.js/dist/umd/'),
    express.static(__dirname + '/node_modules/bootstrap/dist/js/'),
    express.static(__dirname + '/node_modules/@chrisoakman/chessboardjs/dist/'),
    express.static(__dirname + '/node_modules/chess.js/'),
    express.static(__dirname + '/public/js'),
]);

app.engine('handlebars', handlebars({
    helpers: require('./config/handlebars-helpers')
}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/app/views');

app.use(session({
    genid: (req) => {
        return uuid();
    },
    secret: 'Hi9Cf#mK98',
    resave: true,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 3600000)
    }
}))
app.use(express.urlencoded({ extended: false }))
app.use(router);

app.use(function(req, res) {
    res.statusCode = 404;
    res.send("Página inexistente.");
});

http.listen(PORT, function() {
    console.log('Escutando na porta ' + PORT);
});

// app.listen(PORT, function() {
//     console.log("Escutando na porta " + PORT);
// });