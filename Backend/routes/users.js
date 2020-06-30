const express = require('express');
const usersRouter= express.Router();
const usersEntry = require('../models/index').users;




usersRouter.get('/', function (req, res, next) {
    usersEntry.findAll({})
        .then(usersEntry => res.json(usersEntry))
        .catch(err => res.json(err))
    ;
});
usersRouter.get('/:id', function (req, res, next) {
    usersEntry.findOne({
            where: {
                id: req.params.id
            }
        }
    )
        .then(usersEntry => res.json(usersEntry))
        .catch(err => res.json(err));
});

usersRouter.post('/', function (req, res, next) {
    const {username, password,permissions} = req.body;

    usersEntry.create({
        username:username,
        password: password,
        permissions:permissions
    })
        .then(usersEntry => res.status(201).json({
            usersEntry
        }))
        .catch(error => res.status(500).json({
            error
        }));
});

usersRouter.put('/:id', function (req, res, next) {
    const usersEntryId = req.params.id;
    const { username, password,permissions } = req.body;

    usersEntry.update({
        username:username,
        password: password,
        permissions:permissions
    }, {
        where: {
            id: usersEntryId
        }
    })
        .then(usersEntry => res.status(201).json({
            usersEntry
        }))
        .catch(error => res.status(500).json({
            error
        }));
});

usersRouter.delete('/:id', function (req, res, next) {
    const usersEntry_id = req.params.id;

    usersEntry.destroy({
        where: {
            id: usersEntry_id
        }
    })
        .then( status => res.status(201).json({
            error: false
        }))
        .catch(err => res.status(500).json({
            error: false
        }));
});

module.exports = usersRouter;
