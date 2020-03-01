const express = require('express');

const controller = require('../controllers/usuario');

const router = express.Router();
// metods rest https://www.restapitutorial.com/lessons/httpmethods.html
router.post('/loginDashboard', controller.loginDasboard);
router.post('/loginFlutter', controller.loginFlutter);
router.post('/', controller.cadastrarConta);

router.post('/update', controller.alterarCadastro);
router.post('/enviarEmail', controller.enviaEmail);
router.post('/esqueciSenha', controller.esqueciSenha);
router.post('/remover', controller.remover);


/*
// GET all users   => /users/
router.get('/', controller.getAll);
//GET user by id  =>/users/12
router.get('/:id', controller.getByID);
//GET user by email  =>/users/email/teste@mail.com
router.get('/email/:email', controller.getByEmail);
// POST add user =>/users/  
//must pass user field trought json 

// UPDATE user =>/users/
router.put('/', controller.update);
// DELETE user =>/users/
router.delete('/', controller.delete);
*/
module.exports = router;