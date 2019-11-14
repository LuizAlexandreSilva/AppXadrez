const express = require('express');
const router = express.Router();
const mainController = require('../app/controllers/main');
const cursoRoutes = require('./routes/curso');
const usuarioRoutes = require('./routes/usuario');

router.get("/", mainController.index);

router.get("/sobre", mainController.sobre);

// router.get("/signup", mainController.signup);

router.get("/ui", mainController.ui);

router.use("/curso", cursoRoutes);

router.use("/", usuarioRoutes);

module.exports = router;