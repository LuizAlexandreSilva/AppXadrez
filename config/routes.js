const express = require('express');
const router = express.Router();
const mainController = require('../app/controllers/main');
const usuarioController = require('../app/controllers/usuario');
const cursoController = require('../app/controllers/curso');

router.get("/", mainController.index);

router.get("/sobre", mainController.sobre);

// router.get("/signup", mainController.signup);

router.get("/ui", mainController.ui);

router.get("/curso/index", cursoController.index);

// router.get('/'                  , usuarioController.index);
router.get('/signup'              , usuarioController.create);
router.post('/signup'             , usuarioController.create);
router.get('/usuario/read/:id'    , usuarioController.read);
router.get('/usuario/update/:id'  , usuarioController.update);
router.post('/usuario/update/:id' , usuarioController.update);
router.post('/usuario/remove/:id' , usuarioController.remove);

module.exports = router;