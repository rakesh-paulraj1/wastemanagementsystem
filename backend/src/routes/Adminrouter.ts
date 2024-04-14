import { Router } from "express";
import { AdminController } from "../controllers/admin.controllers";


const router=Router();
const adminController=new AdminController();
router.post('/adminlogin',adminController.loginadmin);
router.use('/admin',adminController.adminmiddleware);
router.post("/adminadd",adminController.createuser);
router.get("/admincomplaints",adminController.getcomplaints);
router.get("/admincomplaint/:id",adminController.getcomplaint);
router.put("/admincomplaint/:id",adminController.updatecomplaint);

export default router;