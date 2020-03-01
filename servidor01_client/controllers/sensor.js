const Sensor = require('../models/Sensor');

exports.cadastrar = (req, res, next) => {
    const sNome = req.body.nome;
    const sTopico = req.body.topico;
    const sBroker = req.body.broker;
    const sPorta = req.body.porta;
    const sEmpresaId = req.body.empresaId;
    
    Sensor.findOne({ where: { nome: sNome } }).then(sensor => {
        if(sensor==null){    
            Sensor.create({
                nome: sNome,
                topico: sTopico,
                broker: sBroker,
                porta: sPorta,
                empresaId: sEmpresaId
            })
            .then(resultSensor => {                
                res.status(200).json({ title: 'Sensor', content: { status: true, Sensor:resultSensor } });
            }).catch(err => {                
                res.status(200).json({ title: 'Sensor', content: { status: false, codigoErro:1, msg:"não foi possível cadastrar a Sensor" } });
            });        
         }else
            res.status(200).json({ title: 'Sensor', content: { status: false ,codigoErro:2, msg:"já possui Sensor cadastrada"} });
    }).catch(e=>{        
		res.status(200).json({ title: 'Sensor', content: { status: false,codigoErro:3, msg:"cadastro Sensor" } });
    });
}

exports.update = (req, res, next) => {        
    const sNome = req.body.nome;
    const sTopico = req.body.topico;
    const sBroker = req.body.broker;
    const sPorta = req.body.porta;
    const sEmpresaId = req.body.empresaId;
    const sSensorId = req.body.sensorId;
    
    try {
        Sensor.findByPk(sSensorId)
            .then(sensor => {
                sensor.nome =  sNome;
                sensor.topico =  sTopico;
                sensor.broker =  sBroker;
                sensor.porta = sPorta;
                sensor.empresaId = sEmpresaId;
                return sensor.save();
            })
            .then(result => {
                res.status(201).json({message: 'Atualizado com sucesso',content: {status: true , sensor:result}});
            })
            .catch(err =>{
                res.status(200).json({ title: 'alterar cadastro', content: { status: false, codigoErro:1, msg:"erro ao alterar cadastro"}});
            });
    } catch (err1) {
        res.status(200).json({ title: 'alterar cadastro', content: { status: false, codigoErro:2, msg:"erro no try"}});
    }
};

exports.remover = (req, res, next) => {
    const eSensorId = req.body.sensorId;
    
    Sensor.destroy({ where: { id: eSensorId } }).then(u => {
        res.status(200).json({ title: 'Sensor', content: { status: true, msg:"Excluida com sucesso"}});
    }).catch(err=>{
        res.status(200).json({ title: 'Sensor', content: { status: false,codigoErro:1, msg:"não foi possível excluir"}});
    }); 
};


