import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";
import { User } from "./User"; 
import { Vehicle } from "./Vehicle";
import { Area } from "./Area";

export class waste_collection extends Model {}
waste_collection.init ({
    Vehicle_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Area_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize,
  modelName: "waste_collection",
  timestamps: false,
  underscored: true,
  tableName: "waste_collection"
})