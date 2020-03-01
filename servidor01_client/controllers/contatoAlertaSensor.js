const ContatoAlertaSensor = require('../models/ContatoAlertaSensor');

exports.cadastrar = (req, res, next) => {
    const usuarioId = req.body.usuarioId;
    const emailAlerta = req.body.emailAlerta;
    const telefoneAlerta = req.body.telefoneAlerta;
    
    ContatoAlertaSensor.findOne({ where: { email: eEmail } }).then(ContatoAlertaSensor => {
        if(ContatoAlertaSensor){    
            res.status(200).json({ title: 'ContatoAlertaSensor', content: { status: false ,codigoErro:2, msg:"já possui ContatoAlertaSensor cadastrada"} });
         }else{

            ContatoAlertaSensor.create({
                usuarioId: usuarioId,
                emailAlerta: emailAlerta,
                telefoneAlerta:telefoneAlerta
            })
            .then(resultContatoAlertaSensor => {                
                res.status(200).json({ title: 'ContatoAlertaSensor', content: { status: true, ContatoAlertaSensor:resultContatoAlertaSensor } });
            }).catch(err => {                
                res.status(200).json({ title: 'ContatoAlertaSensor', content: { status: false, codigoErro:1, msg:"não foi possível cadastrar a ContatoAlertaSensor" } });
            });        
         }
              }).catch(e=>{        
		res.status(200).json({ title: 'ContatoAlertaSensor', content: { status: false,codigoErro:3, msg:"cadastro ContatoAlertaSensor" } });
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
            ContatoAlertaSensor.findByPk(eContatoAlertaSensorId)
            .then(contatoAlertaSensor => {
                contatoAlertaSensor.usuarioId = usuarioId;
                contatoAlertaSensor.emailAlerta = emailAlerta;
            
                contatoAlertaSensor.telefoneAlerta = telefoneAlerta;
                return ContatoAlertaSensor.save();
            })
            .then(result => {
                res.status(201).json({message: 'Atualizado com sucesso',content: {status: true , usuario:result}});
            })
            .catch(err =>{

                res.status(200).json({ title: 'alterar ContatoAlertaSensor', content: { status: false, codigoErro:1, msg:"erro ao alterar cadastro"}});
            });    
        }else{
            
            ContatoAlertaSensor.create({
                nome: eNome,
                email: eEmail
            })
            .then(resultContatoAlertaSensor => {                
                res.status(200).json({ title: 'ContatoAlertaSensor', content: { status: true,
                     ContatoAlertaSensor:resultContatoAlertaSensor } });
            }).catch(err => {                
                res.status(200).json({ title: 'ContatoAlertaSensor', content: { status: false, 
                    codigoErro:1, msg:"não foi possível cadastrar a ContatoAlertaSensor" } });
            });        
            
        }
    } catch (err1) {
        res.status(200).json({ title: 'alterar cadastro', content: { status: false, codigoErro:2, msg:"erro no try"}});
    }    
};

exports.remover = (req, res, next) => {
    //falta fazer
    const eContatoAlertaSensorId = req.body.ContatoAlertaSensorId;
    
    ContatoAlertaSensor.destroy({ where: { id: eContatoAlertaSensorId } }).then(u => {
        res.status(200).json({ title: 'ContatoAlertaSensor', content: { status: true, msg:"Excluida com sucesso"}});
    }).catch(err=>{
        res.status(200).json({ title: 'ContatoAlertaSensor', content: { status: false,codigoErro:1, msg:"não foi possível excluir"}});
    }); 
};


