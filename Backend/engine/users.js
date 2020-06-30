const users = require('../models/index').users;

const getUser = (req, res) => {
  users.findAll({})
    .then(entry => {
      return res.status(200).send(entry)
    })
    .catch(err => {
      return res.status(500).send(err)
    });
};

const getUserById = (req, res) => {
  const userId = req.params.id;

  users.findOne({
    where: {
      id: userId
    }
  })
    .then(entry => {
      if (!entry) {
        return res.status(404).send({
          error: true,
          message: 'The requested user does not exist.',
          userId
        })
      }

      return res.status(200).send(entry);
    })
    .catch(err => {
      return res.status(500).send(err);
    })
};

const createUser = (req, res) => {
  const {username,password,permissions} = req.body;

  users.create({
   username:username,
   password:password,
   permissions:permissions
  })
    .then(entry => {
      return res.status(201).send(entry);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
};

const editUser = (req, res) => {
  const userId = req.params.id;
  const {username,password,permissions} = req.body;

  users.findOne({
    where: {
      id: userId
    }
  })
    .then(entry => {
      if (!entry) {
        return res.status(404).send({
          error: true,
          message: 'Cannot update a user that does not exist.',
          userId
        })
      }

      users.update({
       username:username,
       password:password,
       permissions:permissions
      }, {
        where: {
          id: userId
        }
      })
        .then(updated => {
          if(updated.pop() === 1) {
            return res.status(201).send({
              updated: true,
              userId
            });
          } else {
            return res.status(400).send({
              updated: false,
              userId
            })
          }
        })
        .catch(error => {
            return res.status(500).send(error);
          }
        );
    })
    .catch(error => {
      return res.status(500).send(error);
    })
};

const deleteUser = (req, res) => {
  const userId = req.params.id;

  users.destroy({
    where: {
      id: userId
    }
  })
    .then( res => {
      return res.status(204).send({});
    })
    .catch(error => {
      return res.status(500).send(error);
    })
};

module.exports = {
  getUser,
  getUserById,
  editUser,
  deleteUser,
  createUser
};