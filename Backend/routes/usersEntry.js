const express = require('express');
const router= express.Router();
const UsersEntry = require('../models/index').usersEntry;




router.get('/', function (req, res, next) {
    UsersEntry.findAll({})
        .then(usersEntry => res.json(usersEntry))
        .catch(err => res.json(err));
    
});
router.get('/:id', function (req, res, next) {
    UsersEntry.findOne({
            where: {
                id: req.params.id
            }
        }
    )
        .then(usersEntry => res.json(usersEntry))
        .catch(err => res.json(err));
});

router.post('/', function (req, res, next) {
    const {username, password,permissions} = req.body;

    UsersEntry.create({
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

router.put('/:id', function (req, res, next) {
    const usersId = req.params.id;
    const { username, password,permissions } = req.body;

    UsersEntry.update({
        username:username,
        password: password,
        permissions:permissions
    }, {
        where: {
            id: usersId
        }
    })
        .then(usersEntry => res.status(201).json({
            usersEntry
        }))
        .catch(error => res.status(500).json({
            error
        }));
});

router.delete('/:id', function (req, res, next) {
    const users_id = req.params.id;

    UsersEntry.destroy({
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









module.exports = router;
