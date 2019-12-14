const express = require('express');
const router = express.Router();
const mainController = require('../app/controllers/main');
const usuarioController = require('../app/controllers/usuario');
const cursoController = require('../app/controllers/curso');
const authMiddleware = require('../config/auth-middleware');

var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });

router.get("/", csrfProtection, mainController.index);

router.get("/sobre", mainController.sobre);

router.get("/login", csrfProtection, mainController.login);
router.post("/login", csrfProtection, mainController.login);
router.get("/logout", mainController.logout);

router.get('/signup', csrfProtection, usuarioController.create);
router.post('/signup', csrfProtection, usuarioController.create);

router.use(authMiddleware);

router.get("/ui", mainController.ui);

router.get('/partida', mainController.partida);
router.get('/partida/:id', mainController.partida);

router.get('/ranking', mainController.ranking);

router.get('/curso/index', cursoController.index);
router.get('/curso/create', csrfProtection, cursoController.create);
router.post('/curso/create', csrfProtection, cursoController.create);
router.get('/curso/read/:id', cursoController.read);
router.get('/curso/update/:id', csrfProtection, cursoController.update);
router.post('/curso/update/:id', csrfProtection, cursoController.update);
router.get('/curso/remove/:id', cursoController.remove);

router.get('/usuario/read/:id'    , usuarioController.read);
router.get('/usuario/update/:id'  , usuarioController.update);
router.post('/usuario/update/:id' , usuarioController.update);
router.post('/usuario/remove/:id' , usuarioController.remove);

module.exports = router;