const express = require('express');
const controller = require('../controllers/contatoAlertaUsuario');
const router = express.Router();

router.post('/', controller.cadastrar);
router.post('/update', controller.update);
router.post('/remover', controller.remover);

module.exports = router;