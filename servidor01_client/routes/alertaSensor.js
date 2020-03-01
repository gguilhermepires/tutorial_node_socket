const express = require('express');
const controller = require('../controllers/alertaSensor');
const router = express.Router();

router.post('/getAll', controller.getAll);
router.post('/', controller.cadastrar);

module.exports = router;