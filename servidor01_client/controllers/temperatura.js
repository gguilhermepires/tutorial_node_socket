const Temperatura = require('../models/Temperatura');
const sequelize = require('../util/database');
var dateFormat = require('dateformat');

exports.getUltimaLeitura = (req, res, next) => {
    const sql = "select * from temperaturas ORDER BY createdAt DESC LIMIT 10;";

    Temperatura.sequelize.query(sql, { type: Temperatura.sequelize.QueryTypes.SELECT })
        .then(function(rows) {
            res.status(200).json({ rows });
        }).catch(err => {
            console.log(err);
			 res.status(400).json({ title: 'temperatura', content: err });
        });
};
exports.getLeituraMaxima = (req, res, next) => {
    
    var day=dateFormat(new Date(), "yyyy-mm-dd");
    const sql = "select * from temperaturas WHERE createdAt BETWEEN '" + day.toString() + " 00:00:00" + "' AND '" + day.toString()+ " 23:59:59'" + " ORDER BY valor DESC  LIMIT 1;";
   
    Temperatura.sequelize.query(sql, { type: Temperatura.sequelize.QueryTypes.SELECT })
        .then(function(rows) {
            res.status(200).json({ title: 'temperatura', status:true ,content: rows });
        }).catch(err => {
            console.log(err);
			 res.status(400).json({ title: 'temperatura',status:false ,content: err });
        });
};
exports.getLeituraMinima = (req, res, next) => {
    var day=dateFormat(new Date(), "yyyy-mm-dd");
    const sql = "select * from temperaturas WHERE createdAt BETWEEN '" + day+ " 00:00:00" + "' AND '" +day + " 23:59:59'" + " ORDER BY valor ASC LIMIT 1;";
    Temperatura.sequelize.query(sql, { type: Temperatura.sequelize.QueryTypes.SELECT })
        .then(function(rows) {
            res.status(200).json({ title: 'temperatura', content: rows });
        })
};
/*
exports.getAll = (req, res, next) => {
    const userId = req.params.id;

    User.findAll()
        .then(users => {
            res.status(200).json({
                posts: [{ title: 'First Post', content: users }]
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getByID = (req, res, next) => {
    const userId = req.params.id;

    User.findByPk(userId)
        .then(u => {
            res.status(200).json({
                posts: [{ title: 'First Post', content: u }]
            });
        })
        .catch(err => console.log(err));
};
exports.getByEmail = (req, res, next) => {
    const userEmail = req.params.email;
    console.log(userEmail);
    User.findOne({ where: { email: userEmail } }).then(u => {
        res.status(200).json({
            posts: [{ title: 'First Post', content: u }]
        });
    });
};

exports.add = (req, res, next) => {
    const userEmail = req.body.email;

    User.create({
            email: userEmail
        })
        .then(result => {
            res.status(201).json({
                message: 'Post created successfully!',
                post: { content: result }
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.update = (req, res, next) => {
    const userEmailUpdate = req.body.email;
    const userId = req.body.id;

    User.findByPk(userId)
        .then(user => {
            user.email = userEmailUpdate;
            return user.save();
        })
        .then(result => {
            res.status(201).json({
                message: 'Post created successfully!',
                post: { content: result }
            });
        })
        .catch(err => console.log(err));
};

exports.delete = (req, res, next) => {
    const userId = req.body.id;

    User.findByPk(userId)
        .then(user => {
            return user.destroy();
        })
        .then(result => {
            res.status(201).json({
                message: 'Post created successfully!',
                post: { content: result }
            });
        })
        .catch(err => console.log(err));
};

*/