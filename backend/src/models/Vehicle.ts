import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";
import { Area } from "./Area";

export class Vehicle extends Model {}
Vehicle.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    area_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    driver_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    vehicle_number:{
        type: DataTypes.STRING,
        allowNull: false
    },
    driver_number :{
        type: DataTypes.STRING,
        allowNull: false
    }

},{
    sequelize,
  modelName: "Vehicle",
  timestamps: false,
  underscored: true,
  tableName: "vehicle"
 })
Vehicle.belongsTo(Area, { foreignKey: 'area_id' });
