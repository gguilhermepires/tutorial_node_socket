const Grafico = require('../models/Grafico');

exports.cadastrar = (req, res, next) => {
    const usuarioId = req.body.usuarioId;
    const sensorId= req.body.sensorId;
    const tipo= req.body.tipo;
    
    Grafico.findOne({ where: { usuarioId: usuarioId, sensorId:sensorId,tipo:tipo } }).then(g => {
        if(g){    
            res.status(200).json({ title: 'Grafico', content: { status: false ,codigoErro:2, msg:"já possui grafico cadastrado"} });
         }else{
            Grafico.create({
                usuarioId: usuarioId,
                sensorId: sensorId,
                tipo:tipo
            })
            .then(r => {                
                res.status(200).json({ title: 'Grafico', content: { status: true, grafico:r } });
            }).catch(err => {                
                res.status(200).json({ title: 'Grafico', content: { status: false, codigoErro:1, msg:"não foi possível cadastrar" } });
            });        
         }
            
    }).catch(e=>{        
		res.status(200).json({ title: 'Grafico', content: { status: false,codigoErro:3, msg:"cadastro empresa" } });
    });
}
exports.all = (req, res, next) => {
    Grafico.findAll().then(g => {
        if(g){    
            res.status(200).json({ title: 'Grafico', content: { status: true, grafico:g } });
           }else{
            res.status(200).json({ title: 'Grafico', content: { status: false,codigoErro:1, msg:"cadastro empresa" } });
         }
    }).catch(e=>{        
		res.status(200).json({ title: 'Grafico', content: { status: false,codigoErro:3, msg:e.toString() } });
    });
}
exports.remover = (req, res, next) => {
    const usuarioId = req.body.usuarioId;
    const sensorId= req.body.sensorId;
    const tipo= req.body.tipo;
   console.log(usuarioId.toString()+":"+ sensorId.toString()+ tipo);
   
    Grafico.destroy({ where: { usuarioId: usuarioId,sensorId:sensorId,tipo:tipo } }).then(g => {
        res.status(200).json({ title: 'Grafico', content: { status: true, grafico: g, msg:"Excluida com sucesso"}});
    }).catch(err=>{
        res.status(200).json({ title: 'Grafico', content: { status: false,codigoErro:1, msg:"não foi possível excluir"}});
    }); 
};


