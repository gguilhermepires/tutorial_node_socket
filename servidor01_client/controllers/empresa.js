const Empresa = require('../models/Empresa');

exports.cadastrar = (req, res, next) => {
    const eNome = req.body.nome;
    const eEmail = req.body.email;
    
    Empresa.findOne({ where: { email: eEmail } }).then(empresa => {
        if(empresa==null){    
            Empresa.create({
                nome: eNome,
                email: eEmail
            })
            .then(resultEmpresa => {                
                res.status(200).json({ title: 'Empresa', content: { status: true, empresa:resultEmpresa } });
            }).catch(err => {                
                res.status(200).json({ title: 'Empresa', content: { status: false, codigoErro:1, msg:"não foi possível cadastrar a empresa" } });
            });        
         }else
            res.status(200).json({ title: 'Empresa', content: { status: false ,codigoErro:2, msg:"já possui empresa cadastrada"} });
    }).catch(e=>{        
		res.status(200).json({ title: 'Empresa', content: { status: false,codigoErro:3, msg:"cadastro empresa" } });
    });
}

exports.update = (req, res, next) => {        
    const eNome = req.body.nome;
    const eEmail = req.body.email;
    const eEmpresaId = req.body.empresaId;

    console.log("eEmpresaId"+eEmpresaId+"nome"+eNome+eEmail);
    
    try {
        if(eEmpresaId){
            console.log("empresa nao e nuçl");
            
            Empresa.findByPk(eEmpresaId)
            .then(empresa => {
                empresa.nome = eNome;
                empresa.email = eEmail;
                return empresa.save();
            })
            .then(result => {
                res.status(201).json({message: 'Atualizado com sucesso',content: {status: true , usuario:result}});
            })
            .catch(err =>{

                res.status(200).json({ title: 'alterar empresa', content: { status: false, codigoErro:1, msg:"erro ao alterar cadastro"}});
            });    
        }else{
            
            Empresa.create({
                nome: eNome,
                email: eEmail
            })
            .then(resultEmpresa => {                
                res.status(200).json({ title: 'Empresa', content: { status: true,
                     empresa:resultEmpresa } });
            }).catch(err => {                
                res.status(200).json({ title: 'Empresa', content: { status: false, 
                    codigoErro:1, msg:"não foi possível cadastrar a empresa" } });
            });        
            
        }
    } catch (err1) {
        res.status(200).json({ title: 'alterar cadastro', content: { status: false, codigoErro:2, msg:"erro no try"}});
    }    
};

exports.remover = (req, res, next) => {
    const eEmpresaId = req.body.empresaId;
    
    Empresa.destroy({ where: { id: eEmpresaId } }).then(u => {
        res.status(200).json({ title: 'Empresa', content: { status: true, msg:"Excluida com sucesso"}});
    }).catch(err=>{
        res.status(200).json({ title: 'Empresa', content: { status: false,codigoErro:1, msg:"não foi possível excluir"}});
    }); 
};


