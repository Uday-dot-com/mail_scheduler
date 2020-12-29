"use strict";
module.exports = (sequelize, DataTypes) => {
  const schedule = sequelize.define(
    "h_schedule",
    {
      scheduleId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      sendDate: DataTypes.DATE,
      sendTime: DataTypes.TIME,
      sendStatus: DataTypes.BOOLEAN,
    },
    {
      tableName: "h_schedule",
      // timestamps: true,
      dialectOptions: { useUTC: false },
      timezone: "+05:30",
    },

    {}
  );

  return schedule;
};
