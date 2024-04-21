import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";
import { User } from "./User";
import {Area} from "./Area";


export class waste_produced  extends Model {
    total_weight: number | undefined;
    bio_weight: number | undefined;
    non_bio_weight: number | undefined;
    area_id: any;
    Area: any;
    area_name!: string;
    

}
waste_produced.init({
    w_date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    bio_weight:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    non_bio_weight:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    area_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Area,
            key: 'area_id'
        }
    },
    total_weight:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0,
    }
},
{
  sequelize,
  modelName: "waste_produced",
  timestamps: false,
  underscored: true,
  tableName: "waste_produced",
  hooks: {
    beforeSave: (instance) => {

        instance.total_weight = (instance.bio_weight || 0) + (instance.non_bio_weight || 0);
    }
}
})
waste_produced.belongsTo(Area, { foreignKey: 'area_id' });
waste_produced.belongsTo(User, { foreignKey: 'user_id' });