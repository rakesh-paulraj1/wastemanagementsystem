import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";
import { User } from "./User";


export class waste_produced  extends Model {
    total_weight: number | undefined;
    bio_weight: number | undefined;
    non_bio_weight: number | undefined;
    

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
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_weight:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
  sequelize,
  modelName: "waste_produced",
  timestamps: true,
  underscored: true,
  tableName: "waste_produced",
  hooks: {
    beforeSave: (instance) => {

        instance.total_weight = (instance.bio_weight || 0) + (instance.non_bio_weight || 0);
    }
}
})