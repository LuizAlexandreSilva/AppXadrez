const express = require('express');
const router = express.Router();
const usuarioController = require('../../app/controllers/usuario');

router.get('/'                  , usuarioController.index);
router.get('/read/:id'    , usuarioController.read);
router.get('/signup'      , usuarioController.create);
router.post('/signup'     , usuarioController.create);
router.get('/update/:id'  , usuarioController.update);
router.post('/update/:id' , usuarioController.update);
router.post('/remove/:id' , usuarioController.remove);

module.exports = router;