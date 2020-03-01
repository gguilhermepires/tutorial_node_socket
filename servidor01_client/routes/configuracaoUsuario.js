const express = require('express');
const controller = require('../controllers/configuracaoUsuario');
const router = express.Router();

router.post('/update', controller.atualizaConfiguracao);
router.post('/', controller.getConfiguracaousuarioId);
router.post('/add', controller.postCadastrarConfig);
module.exports = router;