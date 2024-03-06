const  express=require("express"); 

const cors=require("cors");
require("dotenv").config();
const {Sequelize,DataTypes} = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASS,{
    localhoost: 'localhost',
    dialect:'mysql',
});

const app = express(); 

app.use (express.json());
app.use(cors()); 
const 