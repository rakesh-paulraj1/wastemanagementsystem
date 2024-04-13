import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";
import { Area } from "./Area";
import { User } from "./User";
export class Complaints extends Model{}
Complaints.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    area_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },message:{
        type: DataTypes.STRING,
        allowNull: false
    },
    complaint_status:{
        type: DataTypes.STRING,
        allowNull: false
    },complaint_date:{
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    sequelize,
      modelName: "Complaints",
      timestamps: false,
      underscored: true,
      tableName: "complaints"
});
Complaints.belongsTo(Area,{foreignKey:'area_id'});
Complaints.belongsTo(User,{foreignKey:'user_id'});