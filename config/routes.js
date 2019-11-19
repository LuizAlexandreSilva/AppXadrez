const express = require('express');
const router = express.Router();
const mainController = require('../app/controllers/main');
const usuarioController = require('../app/controllers/usuario');
const cursoController = require('../app/controllers/curso');

var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });

router.get("/", mainController.index);

router.get("/sobre", mainController.sobre);

router.get("/login", csrfProtection, mainController.login);
router.post("/login", csrfProtection, mainController.login);
router.get("/logout", mainController.logout);

router.get("/ui", mainController.ui);

router.get('/curso/index', cursoController.index);
router.get('/curso/create', cursoController.create);
router.post('/curso/create', cursoController.create);
router.get('/curso/read/:id'    , cursoController.read);
router.get('/curso/update/:id'  , cursoController.update);
router.post('/curso/update/:id' , cursoController.update);
router.get('/curso/remove/:id' , cursoController.remove);


router.get('/signup', csrfProtection, usuarioController.create);
router.post('/signup', csrfProtection, usuarioController.create);
router.get('/usuario/read/:id'    , usuarioController.read);
router.get('/usuario/update/:id'  , usuarioController.update);
router.post('/usuario/update/:id' , usuarioController.update);
router.post('/usuario/remove/:id' , usuarioController.remove);

module.exports = router;