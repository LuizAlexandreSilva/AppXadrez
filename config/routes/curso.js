const express = require('express');
const router = express.Router();
const cursoController = require('../../app/controllers/curso');

router.get('/'             , cursoController.index);
router.get('/curso/read/:id'    , cursoController.read);
router.get('/curso/create'      , cursoController.create);
router.post('/curso/create'     , cursoController.create);
router.get('/curso/update/:id'  , cursoController.update);
router.post('/curso/update/:id' , cursoController.update);
router.post('/curso/remove/:id' , cursoController.remove);

module.exports = router;