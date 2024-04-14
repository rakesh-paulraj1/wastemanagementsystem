import { Router } from "express";
import { Usercontroller } from "../controllers/user.controller";

const router=Router();
const usercontroller=new Usercontroller();
router.post('/loginuser',usercontroller.loginuser);
router.use('/user',usercontroller.usermiddleware);
router.post("/createuser",usercontroller.createcomplaint);
router.get("/complaints",usercontroller.yourcomplaints);

export default router;