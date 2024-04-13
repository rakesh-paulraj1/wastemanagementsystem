import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";
import { User } from "./User";

export class waste_collection  extends Model {
    total_weight: number | undefined;
    bio_weight: number | undefined;
    non_bio_weight: number | undefined;
    

}
waste_collection.init({
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
  modelName: "waste_collection",
  timestamps: true,
  underscored: true,
  tableName: "waste_collection",
  hooks: {
    beforeSave: (instance) => {

        instance.total_weight = (instance.bio_weight || 0) + (instance.non_bio_weight || 0);
    }
}
})