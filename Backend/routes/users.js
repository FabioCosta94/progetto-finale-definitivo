const express = require('express');
const rotta= express.Router();
const users = require('../models/index').users;




rotta.get('/', function (req, res, next) {
    users.findAll({})
        .then(users => res.json(users))
        .catch(err => res.json(err))
    ;
});
rotta.get('/:id', function (req, res, next) {
    users.findOne({
            where: {
                id: req.params.id
            }
        }
    )
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

rotta.post('/', function (req, res, next) {
    const {username, password,permissions} = req.body;

    users.create({
        username:username,
        password: password,
        permissions:permissions
    })
        .then(users => res.status(201).json({
            users
        }))
        .catch(error => res.status(500).json({
            error
        }));
});

rotta.put('/:id', function (req, res, next) {
    const usersId = req.params.id;
    const { username, password,permissions } = req.body;

    users.update({
        username:username,
        password: password,
        permissions:permissions
    }, {
        where: {
            id: usersId
        }
    })
        .then(users => res.status(201).json({
            users
        }))
        .catch(error => res.status(500).json({
            error
        }));
});

rotta.delete('/:id', function (req, res, next) {
    const users_id = req.params.id;

    users.destroy({
        where: {
            id: users_id
        }
    })
        .then( status => res.status(201).json({
            error: false
        }))
        .catch(err => res.status(500).json({
            error: false
        }));
});

module.exports = rotta;
