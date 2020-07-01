'use strict';

module.exports = (sequelize, DataType) => {
    let UsersEntry = sequelize.define('UsersEntry', {
      // id missing because Sequelize adds it by default
      username:  DataType.STRING(20),
      password: DataType.STRING(20),
      permissions: DataType.INTEGER()
      
    }, {
      freezeTableName: true,
      timestamps: false,
      tableName: 'users'
    });
  
    // Association to other models (foreign keys)
    UsersEntry.associate = function (models) {
  
    };
  
    return UsersEntry;
  };
  