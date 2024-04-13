import express,{Express} from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());
app.use(express.static(__dirname + "/files", { index: false }));
app.use(cors());

Area.sync()
  .then(() => console.log("Employeedetails model synced with the database"))
  .catch((err) => console.error("Unable to sync Employeedetails model:", err));
   
  app.use(userrouterrouter);
  app.use(adminrouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});