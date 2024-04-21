import { Request, Response } from 'express';
import { User } from '../models/User';
import { Complaints } from '../models/Complaints';
import {sign,verify} from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { waste_produced } from '../models/Waste_produced';
export class Usercontroller {
    constructor(){}

 public  async loginuser(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;
    
            
            const user = await User.findOne({ where: { username, password } });
    
            
            if (!user) {
                res.status(403).json({ err: "Invalid username or password" });
                return;
            }
            const jwt =  await sign({ id: user.id },JWT_SECRET!);
    
           
            const { id: user_id, area_id } = user;
    
           
            res.status(200).json({ jwt, user_id, area_id, message: "User logged in successfully" });
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({ err: "Internal server error" });
        }
    }
//----------------------------------------------//
public async usermiddleware(req:Request,res:Response,next:Function):Promise<void>{
    try{
        const token=req.headers.authorization||"";
        const user=await verify(token,JWT_SECRET!);
        if(user){
            await next();
        }
        else{
            res.status(401).json({
                err:"Unauthorized"
            })
        }
}catch(err){
    res.status(500).json({
        err:"Unable to log  user"
    })
}}
//-----------------------------------------------------//
public async wasteinput (req:Request,res:Response):Promise<void>{
    try {
        const { w_date, bio_weight, non_bio_weight, user_id, area_id } = req.body;

        
        const formattedDate = new Date(w_date);

        const wasteproduced = await waste_produced.create({
            area_id,
            user_id,
            w_date: formattedDate, 
            bio_weight,
            non_bio_weight
        });

        res.status(200).json({
            message: `Waste Input for ${formattedDate.toDateString()} Done`
        });
    } catch (error) {
        console.error('Error adding waste details:', error);
        res.status(500).json({
            err: "Unable to add waste details"
        });
    }
}
//-----------------------------------------------------//
public async createcomplaint(req:Request,res:Response):Promise<void>{
try{
const body=req.body;

const complaint=await Complaints.create({
    area_id:body.area_id,
    user_id:body.user_id,
    title:body.title,
    description:body.description,
    complaint_status:body.complaint_status,
    complaint_date:body.complaint_date
})
res.status(201).json({
    message:"Complaint created successfully",
})
}catch(error){
    res.status(500).json({
        err:"Unable to create complaint",
    })
    console.log(error);
}}
//-----------------------------------------------------------------------//
public async yourcomplaints(req:Request,res:Response):Promise<void>{
    try{

        const id = req.params.id;
        const complaints = await Complaints.findAll({
            attributes: ['user_id', 'complaint_status', 'id','title'],
            where: { user_id: id } 
        });
        res.status(200).json({complaints});
    }catch{
        res.status(500).json({
            err:"Unable to get complaints"
        })
    }

}}