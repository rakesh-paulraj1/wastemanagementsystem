import { Request, Response } from 'express';
import {Admin } from '../models/Admin';
import { User } from '../models/User';
import { Complaints } from '../models/Complaints';
import { sign,verify } from 'jsonwebtoken';
import { waste_collection } from '../models/Waste_collection';
import { JWT_SECRET } from '../config';
import Op from 'sequelize/types/operators';

export class AdminController {  
     
constructor()  {}
    public async loginadmin(req: Request, res: Response): Promise<void> {
        
        try {
            const data = req.body;
            const admin = await Admin.findOne({ where: { username: data.username, password: data.password } });
            if (!admin) {
                res.status(403).json({
                    err: "Invalid username or password"
                })
            } else {
                const jwt = await sign({ id: admin.id},JWT_SECRET!);
                res.json({ token: jwt });
               res.status(200).json({
                    message: "Login Successful"
                })
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    //----------------------------------------------//
public async adminmiddleware(req: Request, res: Response, next: Function): Promise<void> {
    try{
        const token = req.headers.authorization||"";
        const user=await verify(token,JWT_SECRET!);
        if(user){
            await next();

        }
        else{
            res.status(401).json({
                err:"Unauthorized"
            })
        }

    }catch(error){
        res.status(401).json({
            err:"Unable to verify user"
        })

    }
}
//---------------------------//
public async createuser(req:Request,res:Response): Promise<void>{
    try{
        const body=req.body;
        const user=await User.create({
            data:{
                username:body.username,
                password:body.password,
                emailid:body.emailid,
                area_id:body.area_id,
                address:body.address
            }

        });
        res.status(201).json({
            message:"User created successfully",
        })
    }catch(err){
        res.status(500).json({
            err:"Unable to create user"
        })
    }

}
//------------------------------------------//
public async getcomplaints(req:Request,res:Response):Promise<void> {
    try{
        const complaints=await Complaints.findAll({attributes:['user_id','complaint_status','id','area_id']});
        res.status(200).json({
            complaints
        })
    }catch{
        res.status(500).json({
            err:"Unable to get complaints"
        })
    }
}
public async getcomplaint(req:Request,res:Response):Promise<void>{
    try{
        const id=req.params.id;
        const complaint=await Complaints.findOne({where:{id:id}});
        res.status(200).json({
            complaint
        })
    }catch{
        res.status(500).json({
            err:"Unable to get complaint"
        })
    }
}
public async updatecomplaint(req:Request,res:Response):Promise<void>{
    try{
        const id=req.params.id;
        const complaint_stat=req.body.complaint_status;
        const complaints=await Complaints.update({
            complaint_status:complaint_stat
        },{where:{id:id}});
        res.status(200).json({
            message:"Complaint updated successfully"
        })
    }catch{
        res.status(500).json({
            err:"Unable to update complaint"
        })
    }
}
public async waste_collection(req:Request,res:Response):Promise<void>{
    try {
        const areaId = req.params.id;
        const startDate = req.query.startDate as string | undefined;
        const endDate = req.query.endDate as string | undefined;

        
        const whereCondition: any = { area_id: areaId };
        if (startDate && endDate) {
            whereCondition.createdAt = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            };
        }

        
        const wastebyall = await waste_collection.findAll({
            where: whereCondition,
            order: [['waste_amount', 'ASC']] 
        });

        
        const totalWaste = await waste_collection.sum('waste_amount', {
            where: whereCondition
        });

        res.status(200).json({
            wastebyall,
            totalWaste
        });
    } catch (error) {
        console.error('Error fetching waste collection:', error);
        res.status(500).json({
            error: 'Internal server error',
            
        });
    }

}
}



