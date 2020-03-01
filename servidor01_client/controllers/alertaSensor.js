const Usuario = require('../models/usuario');
const ConfiguracaoUsuario = require('../models/ConfiguracaoUsuario');
const Alerta = require("../models/alerta");
const AlertaSensor = require("../models/AlertaSensor");

exports.cadastrar = (req, res, next) => {
    const usuarioId  = req.body.usuarioId;
    const sensorId= req.body.sensorId;
    const tipoAlerta= req.body.tipoAlerta;
   
    AlertaSensor.create({                
                usuarioId: usuarioId,
                sensorId:sensorId,
                tipoAlerta: tipoAlerta
             
                }).then(r=>{
                    res.status(200).json({ title: 'alerta', content: { status:true ,alertaSensor:r } });
                }).catch(err => {                       
                    res.status(200).json({ title: 'alerta', content: { status: false,codigoErro:1, msg:"não foi possível cadastrar o alerta"}});
                });      
};
exports.getAll = (req, res, next) => {        
    const usuarioId = req.body.usuarioId;
    try {
        AlertaSensor.findAll({where:{usuarioId:usuarioId } })
            .then(alertas => {
                res.status(201).json({message: 'Atualizado com sucesso',content: {status: true, alertaSensor:alertas }});
            })
            .catch(err => {
                res.status(200).json({ title: 'alerta', content: { status: false,codigoErro:1, msg:"não foi possível buscar a alertas"}});
            });
    } catch (err1) {
        res.status(200).json({ title: 'alterar cadastro', content: { status: false, codigoErro:2, msg:"erro try"+err1.toString()}});
    }
};
exports.alterarCadastro = (req, res, next) => {        
    const usuarioNome = req.body.nome;
    const uuarioEmail = req.body.email;
    const usuarioTelfone = req.body.telefone;
    const usuarioSenha = req.body.senha;
    const usuarioIdUsuario = req.body.idUsuario;
    
    try {
        Usuario.findByPk(usuarioIdUsuario)
            .then(user => {
                user.nome = usuarioNome;
                user.senha = usuarioSenha;
                user.telefone = usuarioTelfone;
                user.email = uuarioEmail;
                return user.save();
            })
            .then(result => {
                res.status(201).json({message: 'Atualizado com sucesso',content: {status: true }});
            })
            .catch(err => console.log(err));
    } catch (err1) {
        res.status(200).json({ title: 'alterar cadastro', content: { status: false, codigoErro:1, msg:"enviado com sucesso", info:info.response}});
    }
};

