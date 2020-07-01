const UsersEntry = require('../models/index').UsersEntry;

const getEntry = (req, res) => {
  UsersEntry.findAll({})
    .then(entry => {
      return res.status(200).send(entry)
    })
    .catch(err => {
      return res.status(500).send(err)
    });
};

const getEntryById = (req, res) => {
  const entryId = req.params.id;

  UsersEntry.findOne({
    where: {
      id: entryId
    }
  })
    .then(entry => {
      if (!entry) {
        return res.status(404).send({
          error: true,
          message: 'The requested data does not exist.',
          entryId
        })
      }

      return res.status(200).send(entry);
    })
    .catch(err => {
      return res.status(500).send(err);
    })
};

const createEntry = (req, res) => {
  const {username,password,permissions} = req.body;

  UsersEntry.create({
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

const editEntry = (req, res) => {
  const entryId = req.params.id;
  const {username,password,permissions} = req.body;

  UsersEntry.findOne({
    where: {
      id: entryId
    }
  })
    .then(entry => {
      if (!entry) {
        return res.status(404).send({
          error: true,
          message: 'Cannot update a entry that does not exist.',
          entryId
        })
      }

      UsersEntry.update({
        username:username,
        password:password,
        permissions:permissions
      }, {
        where: {
          id: entryId
        }
      })
        .then(updated => {
          if(updated.pop() === 1) {
            return res.status(201).send({
              updated: true,
              entryId
            });
          } else {
            return res.status(400).send({
              updated: false,
              entryId
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

const deleteEntry = (req, res) => {
  const entryId = req.params.id;

  UsersEntry.destroy({
    where: {
      id: entryId
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
  getEntry,
  getEntryById,
  editEntry,
  deleteEntry,
  createEntry
};