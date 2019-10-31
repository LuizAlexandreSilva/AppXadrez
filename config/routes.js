const express = require('express');
const router = express.Router();
const mainController = require('../app/controllers/main');
const cursoRoutes = require('./routes/curso');

router.get("/", mainController.index);

router.get("/sobre", mainController.sobre);

router.get("/ui", mainController.ui);

router.use("/curso", cursoRoutes);

module.exports = router;