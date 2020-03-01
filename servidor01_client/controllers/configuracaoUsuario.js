const Configuracao = require('../models/ConfiguracaoUsuario');

exports.getConfiguracaousuarioId = (req, res, next) => {       
    const cusuarioId= req.body.usuarioId;
    
    Configuracao.findOne({ where: { usuarioId: cusuarioId } }).then(c => {        
        if(c!=null)              
                res.status(200).json({ title: 'configuracao', content: { config:c, status: true ,msg:""} });
        else
            res.status(200).json({ title: 'configuracao', content: { status: false, codigoErro:2, msg:"erro procurar configuracao" } });
    }).catch(err => {                
        res.status(200).json({ title: 'configuracao', content: { status: false, codigoErro:2, msg:"erro procurar configuracao" } });
    });        
}

exports.postCadastrarConfig = (req, res, next) => {    
    const cvalorMax = req.body.valorMax;
    const cvalorMin = req.body.valorMin;
    const cemailAlerta = req.body.emailAlerta;
    const ctelefoneAlerta = req.body.telefoneAlerta;
    const cswitch_alerta = req.body.switch_alerta;
    const cswitch_email = req.body.switch_email;
    const cswitch_whatsapp = req.body.switch_whatsapp;
    const cswitch_sms = req.body.switch_sms;
    const cswitch_telefone = req.body.switch_telefone;
    const cswitch_login = req.body.switch_login;
    const cusuarioId = req.body.usuarioId;
   console.log("USUARIO ID"+cusuarioId.toString());
    Configuracao.findOne({ where: { usuarioId: cusuarioId } }).then(c => {       
        if(c){
            console.log("atualiza");
            
            c.valorMax= cvalorMax;
            c.valorMin= cvalorMin;
            c.emailAlerta= cemailAlerta;
            c.telefoneAlerta = ctelefoneAlerta;
            c.switch_alerta= cswitch_alerta;
            c.switch_email= cswitch_email;
            c.switch_whatsapp = cswitch_whatsapp;
            c.switch_sms = cswitch_sms;
            c.switch_telefone = cswitch_telefone;
            c.switch_login= cswitch_login;
            return c.save();
        }else{
            Configuracao.create({
                valorMax: cvalorMax,
                        valorMin: cvalorMin,
                        emailAlerta: cemailAlerta,
                        telefoneAlerta: ctelefoneAlerta,
                        switch_alerta: cswitch_alerta,
                        switch_email: cswitch_email,
                        switch_whatsapp : cswitch_whatsapp,
                        switch_sms : cswitch_sms,
                        switch_telefone : cswitch_telefone,
                        switch_login: false,
                        usuarioId: cusuarioId.id
            }).then(re=>{
console.log('sucesso');
                res.status(200).json({ title: 'configuracao', content: { status: true ,config:re, msg:"atualizado com sucesso"} });
            }).catch(_=>{
                res.status(200).json({ title: 'configuracao', content: { status: false, codigoErro:1, msg:"erro procurar configuracao"} });
            });
        }
    }).then(result=>{
        console.log("olha");
        if(result)
            res.status(200).json({ title: 'configuracao', content: { status: true ,config:result, msg:"atualizado com sucesso"} });
        else
            res.status(200).json({ title: 'configuracao', content: { status: false, codigoErro:1, msg:"erro procurar configuracao" } });
            
    }).catch(e=>{
        res.status(200).json({ title: 'configuracao', content: { status: false, codigoErro:2, msg:"erro procurar configuracao"+e.toString() } });
    
    }); 
}
exports.atualizaConfiguracao = (req, res, next) => {    
    console.log("Atualizano");
    
    const cvalorMax = req.body.valorMax;
    const cvalorMin = req.body.valorMin;
    const cemailAlerta = req.body.emailAlerta;
    const ctelefoneAlerta = req.body.telefoneAlerta;
    const cswitch_alerta = req.body.switch_alerta;
    const cswitch_email = req.body.switch_email;
    const cswitch_whatsapp = req.body.switch_whatsapp;
    const cswitch_sms = req.body.switch_sms;
    const cswitch_telefone = req.body.switch_telefone;
    const cswitch_login = req.body.switch_login;
    const cusuarioId = req.body.usuarioId;
   console.log("USUARIO ID"+cusuarioId.toString());

    Configuracao.findOne({ where: { usuarioId: cusuarioId } }).then(c => {       
   
            c.valorMax= cvalorMax;
            c.valorMin= cvalorMin;
            c.emailAlerta= cemailAlerta;
            c.telefoneAlerta = ctelefoneAlerta;
            c.switch_alerta= cswitch_alerta;
            c.switch_email= cswitch_email;
            c.switch_whatsapp = cswitch_whatsapp;
            c.switch_sms = cswitch_sms;
            c.switch_telefone = cswitch_telefone;
            c.switch_login= cswitch_login;  
                 
            return c.save();
          
    }).then(result=>{
        res.status(200).json({ title: 'configuracao', content: { status: true ,config:result, msg:"atualizado com sucesso"} });
    }).catch(err => {                
        res.status(200).json({ title: 'configuracao', content: { status: false, codigoErro:2, msg:"erro procurar configuracao"+err.toString() } });
    });        
}