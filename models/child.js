'use strict';
module.exports = (sequelize, DataTypes) => {
  const child = sequelize.define('child', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    // dateOfBirth: DataTypes.DATEONLY,
    meds: DataTypes.STRING,
    allergy: DataTypes.STRING
  }, {});
  child.associate = function(models) {
    // associations can be defined here
  };
  return child;
};