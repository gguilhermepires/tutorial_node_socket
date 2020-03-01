const Usuario = require('../models/usuario');
const ConfiguracaoUsuario = require('../models/ConfiguracaoUsuario');
const Alerta = require("../models/alerta");

exports.cadastrar = (req, res, next) => {
    const aUsuarioId  = req.body.usuarioId;
    const aValor= req.body.valor;
    const aSensorId= req.body.sensorId;
   
    ConfiguracaoUsuario.findOne({where:{usuarioId:aUsuarioId}}).then(c=>{
        if(c!=null){
            Alerta.create({                
                usuarioId: aUsuarioId,
                sensorId:aSensorId,
                emailAlerta: c.emailAlerta,
                telefoneAlerta: c.telefoneAlerta,
                valor:aValor ,
                valorMax: c.valorMax,
                valorMin: c.valorMin,
                }).then(r=>{
                    res.status(200).json({ title: 'alerta', content: { status:true ,alerta:r } });
                }).catch(err => {                       
                    res.status(200).json({ title: 'alerta', content: { status: false,codigoErro:1, msg:"não foi possível cadastrar o alerta"}});
                });
        }else  
            res.status(200).json({ title: 'alerta', content: { status: false,codigoErro:2, msg:"não foi possível buscar config"}});
               
        
    }).catch(err2 => {                       
        res.status(200).json({ title: 'alerta', content: { status: false,codigoErro:3, msg:"não foi possível buscar a configuração"}});
    });
};
exports.getAll = (req, res, next) => {        
    const usuarioId = req.body.usuarioId;
    try {
        Alerta.findAll({where:{usuarioId:usuarioId } })
            .then(alertas => {
                res.status(201).json({message: 'Atualizado com sucesso',content: {status: true, alertas:alertas }});
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

