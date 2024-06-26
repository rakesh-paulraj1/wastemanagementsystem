import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";
import { Area } from "./Area";
import { waste_produced } from "./Waste_produced";

export class User extends Model {
    public id!: number;
    public username!: string;
    public password!: string;
    public area_id!: number; 
}
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        emailid: {
            type: DataTypes.STRING,
            allowNull: false
        },  
        area_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        }

    },{
        sequelize,
      modelName: "User",
      timestamps: false,
      underscored: true,
      tableName: "user"
    }) ;
User.belongsTo(Area, { foreignKey: 'area_id' })
