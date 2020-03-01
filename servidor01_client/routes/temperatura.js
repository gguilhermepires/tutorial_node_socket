const express = require('express');

const controller = require('../controllers/temperatura');

const router = express.Router();
// metods rest https://www.restapitutorial.com/lessons/httpmethods.html
router.get('/getUltimaLeitura', controller.getUltimaLeitura);
router.get('/getLeituraMaxima', controller.getLeituraMaxima);
router.get('/getLeituraMinima', controller.getLeituraMinima);
/*
// GET all users   => /users/
router.get('/', controller.getAll);
//GET user by id  =>/users/12
router.get('/:id', controller.getByID);
//GET user by email  =>/users/email/teste@mail.com
router.get('/email/:email', controller.getByEmail);
// POST add user =>/users/  
//must pass user field trought json 
router.post('/', controller.add);
// UPDATE user =>/users/
router.put('/', controller.update);
// DELETE user =>/users/
router.delete('/', controller.delete);
*/
module.exports = router;