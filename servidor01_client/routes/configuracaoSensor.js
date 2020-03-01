const express = require('express');
const controller = require('../controllers/configuracaoSensor');
const router = express.Router();

router.post('/update', controller.atualizaConfiguracao);
router.post('/', controller.getConfiguracaoSensorId);
router.post('/all', controller.getAll);
router.post('/add', controller.postCadastrarConfig);
module.exports = router;