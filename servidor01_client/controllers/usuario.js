const Usuario = require('../models/usuario');
const ConfiguracaoUsuario = require('../models/ConfiguracaoUsuario');
const ConfiguracaoSensor = require('../models/ConfiguracaoSensor');
const nodemailer = require("nodemailer");

exports.loginFlutter = (req, res, next) => {
    const usuarioEmail = req.body.email;
    const usuarioSenha = req.body.senha;
    const usuarioTokenFirebase = req.body.tokenFirebase;
    console.log("login flutter email:"+usuarioEmail);

    Usuario.findOne({ where: { email: usuarioEmail } }).then(u => {        
        //achou o usuario        
        if (u.senha == usuarioSenha) {
            //atualiza token
            Usuario.findByPk( u.id  )
            .then(user => {
                user.tokenFirebase = usuarioTokenFirebase;
                return user.save();
            })
            .then(result => {
                ConfiguracaoUsuario.findOne({where:{usuarioId:u.id}}).then(c=>{
                    u.senha="";
                    res.status(200).json({ title: 'Login', content: {  status: true,usuario: result, config:c  } });
                })
                        
             })
            .catch(err => console.log(err));
        } else {
            //senha diferente
            res.status(200).json({ title: 'Login', content: { status: false, codigoErro:3, msg:"senhas diferentes" } });
        }
    }).catch(err => {        
        res.status(200).json({ title: 'Login', content: { status: false, codigoErro:4,msg:"erro na busca do usuario" } });
    });
};

exports.loginFlutter2 = (req, res, next) => {
    const usuarioEmail = req.body.email;
    const usuarioSenha = req.body.senha;
    const usuarioTokenFirebase = req.body.tokenFirebase;
console.log("login flutter");

    Usuario.findOne({ where: { email: usuarioEmail } }).then(u => {        
        //achou o usuario
        if (u.senha == usuarioSenha) {
            //atualiza token
            Usuario.findByPk( u.id  )
            .then(user => {
                user.tokenFirebase = usuarioTokenFirebase;
                return user.save();
            })
            .then(result => {              
                console.log("usuario id:");
                console.log(result.id);
                u.senha="";
                ConfiguracaoUsuario.findOne({where:{sensorId:1}}).then(c=>{
                    res.status(200).json({ title: 'Login', content: {  status: true,usuario: u  , config:c} });

                }).catch(e=>{
                    res.status(200).json({ title: 'Login', content: { status: false, codigoErro:6, msg:"erro buscar config" } });                 
                })
             })
            .catch(err => console.log(err));
        } else {
            //senha diferente
            res.status(200).json({ title: 'Login', content: { status: false, codigoErro:3, msg:"senhas diferentes" } });
        }
      });
};
exports.loginDasboard = (req, res, next) => {
    const usuarioEmail = req.body.email;
    const usuarioSenha = req.body.senha;
    const usuarioTokenFirebase = req.body.tokenFirebase;

    Usuario.findOne({ where: { email: usuarioEmail } }).then(u => {        
        if (u.senha == usuarioSenha) {
        u.senha="";
        res.status(200).json({ title: 'Login', 
                      content: {  status: true,usuario: u } });
        }

      });
};

exports.cadastrarContaV2 = (req, res, next) => {
    const usuarioNome = req.body.nome;
    const usuarioEmail = req.body.email;
    const usuarioTelefone = req.body.telefone;
    const usuarioSenha = req.body.senha;
   
    Usuario.findOne({ where: { email: usuarioEmail } }).then(u => {
        
        if(u==null){    

            Usuario.create({
                nome: usuarioNome,
                email: usuarioEmail,
                telefone: usuarioTelefone,
                senha: usuarioSenha
            })
            .then(resultUsuario => {                
                res.status(200).json({ title: 'cadastro', content: { status: true, usuario:resultUsuario  } });
            }).catch(err => {                
                res.status(200).json({ title: 'cadastro', content: { status: false, codigoErro:3, msg:"não foi possível cadastrar o usuario" } });
            });        
         }else{
            res.status(200).json({ title: 'cadastro', content: { status: false ,codigoErro:1, msg:"já possui usuario cadastrado"} });
         }
    }).catch(e=>{
        res.status(200).json({ title: 'cadastro', content: { status: false, codigoErro:4, msg:"não foi possível cadastrar o usuario" } });
       
    })
}
exports.cadastrarConta = (req, res, next) => {
    const usuarioNome = req.body.nome;
    const usuarioEmail = req.body.email;
    const usuarioTelefone = req.body.telefone;
    const usuarioSenha = req.body.senha;
    const ctokenFirebase = req.body.tokenFirebase;

    Usuario.findOne({ where: { email: usuarioEmail } }).then(u => {
        if(u){    
            res.status(200).json({ title: 'cadastro', content: { status: false ,codigoErro:1, msg:"já possui usuario cadastrado"} });
         }else{
            Usuario.create({
                nome: usuarioNome,
                email: usuarioEmail,
                telefone:usuarioTelefone,
                senha: usuarioSenha
            })
            .then(resultUsuario => {                
                ConfiguracaoUsuario.create({
                        valorMax: 35,
                        valorMin: 20,
                        emailAlerta: "vazio",
                        telefoneAlerta: "vazio",
                        switch_alerta: false,
                        switch_email: false,
                        switch_whatsapp: false,
                        switch_sms: false,
                        switch_telefone: false,
                        switch_login: false,
                        usuarioId: resultUsuario.id
                    })
                    .then(resultConfig => {                                       
                        resultUsuario.senha="";
                        res.status(200).json({ title: 'cadastro', content: {  status: true ,config:resultConfig, usuario:resultUsuario } });
                    }).catch(err2 => {                       
                        res.status(200).json({ title: 'cadastro', content: { status: false,codigoErro:2, msg:"não foi possível cadastrar a configuração"}});
                    });
            }).catch(err => {                
                res.status(200).json({ title: 'cadastro', content: { status: false,codigoErro:33, msg:""+err.toString() } });
            });        
            
         }
    }).catch(e=>{        
        Usuario.create({
                nome: usuarioNome,
                email: usuarioEmail,
                senha: usuarioSenha
            })
            .then(resultUsuario => {                
                ConfiguracaoUsuario.create({
                        valorMax: 35,
                        valorMin: 20,
                        emailAlerta: "vazio",
                        telefoneAlerta: "vazio",
                        switch_alerta: false,
                        switch_email: false,
                        switch_whatsapp: false,
                        switch_sms: false,
                        switch_telefone: false,
                        switch_login: false,
                        usuarioId: resultUsuario.id
                    })
                    .then(resultConfig => {                                       
                        resultUsuario.senha="";
                        res.status(200).json({ title: 'cadastro', content: {  status: true, config:resultConfig, usuario:resultUsuario} });
                    }).catch(err2 => {                       
                        res.status(200).json({ title: 'cadastro', content: { status: false,codigoErro:2, msg:"não foi possível cadastrar a configuração"}});
                    });
            }).catch(err => {                
                res.status(200).json({ title: 'cadastro', content: { status: false,codigoErro:33, msg:"não foi possível cadastrar o usuario" } });
            });        
		//res.status(200).json({ title: 'cadastro', content: { cadastro: false,codigoErro:4, msg:"Erro na busca do usuario" } });
    });
}
exports.remover = (req, res, next) => {
    const usuarioId = req.body.usuarioId;
    console.log("usuario id:"+usuarioId);
    

    Configuracao.destroy({where:{usuarioId:usuarioId}}).then(c=>{
        Usuario.destroy({where:{id:usuarioId}}).then(u=>{
            res.status(200).json({ title: 'recuperar senha', content: { status: true, msg:" sucesso"} }); 
        }).catch(e=>{
            res.status(200).json({ title: 'cadastro', content: { cadastro: false,codigoErro:33, msg:"não foi possível cadastrar o usuario" } });
        });
    }).catch(e=>{
        res.status(200).json({ title: 'cadastro', content: { cadastro: false,codigoErro:2, msg:"excluir a config" } });         
    });
};
exports.esqueciSenha = (req, res, next) => {
    const email = req.body.email;
    
    const transporter = nodemailer.createTransport({
        host: "mail.goldbit.com.br",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: "desenvolvedor@goldbit.com.br",
        pass: "5Eh#jEfD^9cX"
        },
        tls: { rejectUnauthorized: false }
    });
 
  Usuario.findOne({ where: { email: email } }).then(user => {           
    user.senha= "8a1f543580a3f26907369e4189e93f0db234d3f9d173cd9dd17777c2c6b1a388a8c67541b7defc4f02845f7e5a5274f7100369d3592ad86f64adc27cd8c4f7b8";  
    return user.save();
  }).then(u => {
    if(u==null)
        res.status(200).json({ title: 'recuperar senha', content: { status: false,codigoErro:1, msg:"não foi possível achar o usuario"}});
    else{
        var mailOptions2 = {
            from: "desenvolvedor@goldbit.com.br",
            to: email,
            subject: "Recuperação de senha",
            text: "A sua senha é: 123" 
          };

        transporter.sendMail(mailOptions2, function(error, info){
            if (error) 
                res.status(200).json({ title: 'recuperar senha', content: { status: false,codigoErro:2, msg:"erro ao enviar email"}});
             else               
              res.status(200).json({ title: 'recuperar senha', content: { status: true,codigoErro:2, msg:"enviado com sucesso", info:info.response}});
        });//fim transport
    }//fim else
  });//fim then
};//fim função

exports.enviaEmail = (req, res, next) => {
    const usuarioId = req.body.usuarioId;
    const uTo = req.body.to;
    const uSubject = req.body.subject;
    const uText = req.body.text;
    
const transporter = nodemailer.createTransport({
    host: "mail.goldbit.com.br",
    port: 587,
    secure: false,
    auth: {
      user: "desenvolvedor@goldbit.com.br",
      pass: "5Eh#jEfD^9cX"
    },
    tls: { rejectUnauthorized: false }
  });

  var mailOptions2 = {
    from: "desenvolvedor@goldbit.com.br",
    to: uTo,
    subject: uSubject,
    text: uText
  };

  Usuario.findOne({ where: { id: usuarioId } }).then(u => {
    if(u==null)
        res.status(200).json({ title: 'enviaEmail', content: { status: false,codigoErro:1, msg:"não foi possível achar o usuario"}});
    else{
        transporter.sendMail(mailOptions2, function(error, info){
            if (error) 
                res.status(200).json({ title: 'enviaEmail', content: { status: false,codigoErro:2, msg:"erro ao enviar email"}});
            else             
              res.status(200).json({ title: 'enviaEmail', content: { status: true,codigoErro:2, msg:"enviado com sucesso", info:info.response}});
          });
    } 
}); 
};
exports.alterarCadastro = (req, res, next) => {        
    const usuarioNome = req.body.nome;
    const uuarioEmail = req.body.email;
    const usuarioTelfone = req.body.telefone;
    const usuarioSenha = req.body.senha;
    const usuarioIdUsuario = req.body.usuarioId;
    try {
        Usuario.findByPk(usuarioIdUsuario)
            .then(user => {
                if(user){
                    user.nome = usuarioNome;
                    user.senha = usuarioSenha;
                    user.telefone = usuarioTelfone;
                    user.email = uuarioEmail;
                    if(usuarioSenha!=""){
                        user.senha= usuarioSenha;
                    }
                    return user.save();                        
                }else{
                    res.status(200).json({ title: 'alterar cadastro', content: { status: false, codigoErro:1, msg:"erro não chaou usuario"}});
                }
            })
            .then(result => {
                res.status(201).json({message: 'Atualizado com sucesso',content: {status: true , usuario:result}});
            })
            .catch(err => console.log(err));
    } catch (err1) {
        res.status(200).json({ title: 'alterar cadastro', content: { status: false, codigoErro:1, msg:"enviado com sucesso"}});
    }
};

