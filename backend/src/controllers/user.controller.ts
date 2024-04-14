import { Request, Response } from 'express';
import { User } from '../models/User';
import { Complaints } from '../models/Complaints';
import {sign,verify} from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
export class Usercontroller {
    constructor(){}

public async loginuser(req:Request,res:Response):Promise<void>{
    try{
        const data=req.body;
        const user =await User.findOne({ where: { username: data.username, password: data.password }});
        if(!user){
            res.status(403).json({
                err:"Invalid username or password"
            })
        }else{
            const jwt=await sign({id:user.id},JWT_SECRET!);
            res.json({token:jwt});
            res.status(200).json({
                message:"Login Successful"
            })
        }
    }
catch(err){
    console.error(err);
    res.status(500).json({error:'Internal server error'});
  
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
        err:"Unable to create user"
    })
}}


public async createcomplaint(req:Request,res:Response):Promise<void>{
try{
const body=req.body;
const complaint=await Complaints .create({
    area_id:body.area_id,
    user_id:body.user_id,
    message:body.message,
    comlaint_status:body.comlaint_status,
    complaint_date:body.complaint_date
})
res.status(201).json({
    complaint,
    message:"Complaint created successfully",
})
}catch{
    res.status(500).json({
        err:"Unable to create complaint"
    })
}}

public async yourcomplaints(req:Request,res:Response):Promise<void>{
    try{

        const id = req.params.id;
        const complaints = await Complaints.findAll({
            attributes: ['user_id', 'complaint_status', 'id', 'area_id'],
            where: { id: id } 
        });
        res.status(200).json({complaints});
    }catch{
        res.status(500).json({
            err:"Unable to get complaints"
        })
    }

}