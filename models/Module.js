import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

const Module = (sequelize, Sequelize) => {
    const Module = sequelize.define("module", {
        id: {
          type: DataTypes.STRING,
          defaultValue: uuidv4(),
          primaryKey: true
        },
        mac_adres: {
          type: DataTypes.STRING,
        },
    });
    return Module;
}

export default Module;
