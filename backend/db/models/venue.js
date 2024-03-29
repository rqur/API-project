"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {
    static associate(models) {
      Venue.hasMany(models.Event, {
        foreignKey: "venueId",
        onDelete: "CASCADE",
      });
      Venue.belongsTo(models.Group, {
        foreignKey: "groupId",
        onDelete: "CASCADE",
      });
    }
  }
  Venue.init(
    {
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: { type: DataTypes.STRING, allowNull: false },
      state: { type: DataTypes.STRING, allowNull: false },
      lat: { type: DataTypes.DECIMAL, allowNull: false },
      lng: { type: DataTypes.DECIMAL, allowNull: false },
    },
    {
      sequelize,
      modelName: "Venue",
    }
  );
  return Venue;
};
