const express = require("express");
const logger = require("morgan");
const router = require('./config/routes');
const app = express();
const handlebars = require('express-handlebars');
const sass = require('node-sass-middleware');
const cookieParser = require('cookie-parser');
const uuid = require('uuid/v4');
const session = require('express-session');

const PORT = 4567;

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

app.use('/js', [
    express.static(__dirname + '/node_modules/jquery/dist/'),
    express.static(__dirname + '/node_modules/popper.js/dist/umd/'),
    express.static(__dirname + '/node_modules/bootstrap/dist/js/'),
    express.static(__dirname + '/public/js'),
]);

app.engine('handlebars', handlebars({
    helpers: require('./config/handlebars-helpers')
}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/app/views');

// app.use(session({
//     genid: (req) => {
//         return uuid();
//     },
//     secret: 'Hi9Cf#mK98',
//     resave: false,
//     saveUninitialized: true
// }))
app.use(express.urlencoded({ extended: false }))
app.use(router);

app.use(function(req, res) {
    res.statusCode = 404;
    res.send("Página inexistente.");
});

app.listen(PORT, function() {
    console.log("Escutando na porta " + PORT);
});