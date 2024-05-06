import { DataTypes } from "sequelize";

const Sensor = (sequelize, Sequelize) => {
    const Sensor = sequelize.define("users", {
        id: {
          type: DataTypes.UUIDV4,
          allowNull: false,
        },
    });
    return Sensor;
}

//Definition of the one to many relationship between Module and Sensor
Sensor.associate = function(models) {
    Sensor.belongsTo(models.Module, {
        foreignKey: "module_id"
    });
};

export default Sensor;
