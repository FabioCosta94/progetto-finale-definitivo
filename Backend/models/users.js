'use strict';

module.exports = (sequelize, DataType) => {
    let users = sequelize.define('users', {
      // id missing because Sequelize adds it by default
      username:  DataType.STRING(20),
      password: DataType.STRING(20),
      permissions: DataType.INTEGER
      
    }, {
      freezeTableName: true,
      timestamps: false,
      tableName: 'users'
    });
  
    // Association to other models (foreign keys)
    users.associate = function (models) {
  
    };
  
    return users;
  };
  