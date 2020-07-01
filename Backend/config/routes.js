const DataEngine = require('../engine/entry');
const UsersEngine = require('../engine/users');
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
  app.get(usersPath, UsersEngine.getEntry);
  app.post(usersPath, UsersEngine.createEntry);
  app.get(`${usersPath}/:id`, UsersEngine.getEntryById);
  app.put(`${usersPath}/:id`, UsersEngine.editEntry);
  app.delete(`${usersPath}/:id`, UsersEngine.deleteEntry);

  /********** ERROR HANDLER **********/
  app.use(ErrorsEngine.page404);
  app.use(ErrorsEngine.pageError);

};