const ContatoAlertaUsuario = require('../models/ContatoAlertaUsuario');

exports.cadastrar = (req, res, next) => {
    const usuarioId = req.body.usuarioId;
    const emailAlerta = req.body.emailAlerta;
    const telefoneAlerta = req.body.telefoneAlerta;
    
    ContatoAlertaUsuario.findOne({ where: { email: eEmail } }).then(ContatoAlertaUsuario => {
        if(ContatoAlertaUsuario){    
            res.status(200).json({ title: 'ContatoAlertaUsuario', content: { status: false ,codigoErro:2, msg:"já possui ContatoAlertaUsuario cadastrada"} });
         }else{

            ContatoAlertaUsuario.create({
                usuarioId: usuarioId,
                emailAlerta: emailAlerta,
                telefoneAlerta:telefoneAlerta
            })
            .then(resultContatoAlertaUsuario => {                
                res.status(200).json({ title: 'ContatoAlertaUsuario', content: { status: true, ContatoAlertaUsuario:resultContatoAlertaUsuario } });
            }).catch(err => {                
                res.status(200).json({ title: 'ContatoAlertaUsuario', content: { status: false, codigoErro:1, msg:"não foi possível cadastrar a ContatoAlertaUsuario" } });
            });        
         }
              }).catch(e=>{        
		res.status(200).json({ title: 'ContatoAlertaUsuario', content: { status: false,codigoErro:3, msg:"cadastro ContatoAlertaUsuario" } });
    });
}

exports.update = (req, res, next) => {        
//falta fazer
    const id = req.body.id;
    const usuarioId = req.body.usuarioId;
    const emailAlerta = req.body.emailAlerta;
    const telefoneAlerta = req.body.telefoneAlerta;
 
    try {
        if(id>0){
            ContatoAlertaUsuario.findByPk(eContatoAlertaUsuarioId)
            .then(ContatoAlertaUsuario => {
                ContatoAlertaUsuario.usuarioId = usuarioId;
                ContatoAlertaUsuario.emailAlerta = emailAlerta;
            
                ContatoAlertaUsuario.telefoneAlerta = telefoneAlerta;
                return ContatoAlertaUsuario.save();
            })
            .then(result => {
                res.status(201).json({message: 'Atualizado com sucesso',content: {status: true , usuario:result}});
            })
            .catch(err =>{

                res.status(200).json({ title: 'alterar ContatoAlertaUsuario', content: { status: false, codigoErro:1, msg:"erro ao alterar cadastro"}});
            });    
        }else{
            
            ContatoAlertaUsuario.create({
                nome: eNome,
                email: eEmail
            })
            .then(resultContatoAlertaUsuario => {                
                res.status(200).json({ title: 'ContatoAlertaUsuario', content: { status: true,
                     ContatoAlertaUsuario:resultContatoAlertaUsuario } });
            }).catch(err => {                
                res.status(200).json({ title: 'ContatoAlertaUsuario', content: { status: false, 
                    codigoErro:1, msg:"não foi possível cadastrar a ContatoAlertaUsuario" } });
            });        
            
        }
    } catch (err1) {
        res.status(200).json({ title: 'alterar cadastro', content: { status: false, codigoErro:2, msg:"erro no try"}});
    }    
};

exports.remover = (req, res, next) => {
    //falta fazer
    const eContatoAlertaUsuarioId = req.body.ContatoAlertaUsuarioId;
    
    ContatoAlertaUsuario.destroy({ where: { id: eContatoAlertaUsuarioId } }).then(u => {
        res.status(200).json({ title: 'ContatoAlertaUsuario', content: { status: true, msg:"Excluida com sucesso"}});
    }).catch(err=>{
        res.status(200).json({ title: 'ContatoAlertaUsuario', content: { status: false,codigoErro:1, msg:"não foi possível excluir"}});
    }); 
};


