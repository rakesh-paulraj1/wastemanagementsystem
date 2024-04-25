import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

export class Area extends Model { }
Area.init(
    {
      area_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      area_name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "Area",
      timestamps: false,
      underscored: true,
      tableName: "areas"
    }
  );
  