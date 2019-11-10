'use strict';


module.exports = (sequelize, DataTypes) => {
  const child = sequelize.define('child', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateOfBirth: DataTypes.DATEONLY,
    meds: DataTypes.STRING,
    allergy: DataTypes.STRING
  }, {});
  child.associate = function(models) {
    // associations can be defined here

  };
  return child;
};