'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        msg: "This is not a valid email address."
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validates: {
        min: 5,
        msg: "Password must be 5 characters minimum."
      }
    }, 
    role: {
      type: DataTypes.STRING
    }  
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};