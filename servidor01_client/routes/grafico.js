const express = require('express');
const controller = require('../controllers/grafico');
const router = express.Router();

router.post('/', controller.cadastrar);
router.post('/all', controller.all);
router.post('/remover', controller.remover);

module.exports = router;