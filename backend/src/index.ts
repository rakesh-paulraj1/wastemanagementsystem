import express,{Express} from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Area } from "./models/Area";
import { User } from "./models/User";
import { Complaints } from "./models/Complaints";
import { Admin } from "./models/Admin";
import { waste_collection } from "./models/Waste_collection";
import {waste_produced } from  "./models/Waste_produced";
import { Vehicle } from "./models/Vehicle";
import AdminRouter  from "./routes/Adminrouter";

dotenv.config();

const app: Express = express();
const port=3000;
app.use(express.json());
app.use(express.static(__dirname + "/files", { index: false }));
app.use(cors());

Area.sync()
User.sync()
Complaints.sync() 
Admin.sync()
waste_collection.sync()
waste_produced.sync()
Vehicle.sync()

  .then(() => console.log("All models synced with the database"))
  .catch((err) => console.error("Unable to sync  all models:", err));
   
  app.use(AdminRouter);


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port!}`);
});