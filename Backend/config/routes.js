const DataEngine = require('../engine/entry');
const Users = require('../engine/users');
const ErrorsEngine  = require('../engine/errors');

module.exports = (app) => {

  const dataPath = '/data';
  const usersPath= '/users';

  /********** DATA REST APIs **********/
  app.get(dataPath, DataEngine.getEntry);
  app.post(dataPath, DataEngine.createEntry);
  app.get(`${dataPath}/:id`, DataEngine.getEntryById);
  app.put(`${dataPath}/:id`, DataEngine.editEntry);
  app.delete(`${dataPath}/:id`, DataEngine.deleteEntry);
  /********** DATA REST APIs USERS**********/
  app.get(usersPath, Users.getUser);
  app.post(usersPath, Users.createUser);
  app.get(`${usersPath}/:id`,Users.getUserById);
  app.put(`${usersPath}/:id`, Users.editUser);
  app.delete(`${usersPath}/:id`, Users.deleteUser);

  /********** ERROR HANDLER **********/
  app.use(ErrorsEngine.page404);
  app.use(ErrorsEngine.pageError);

};