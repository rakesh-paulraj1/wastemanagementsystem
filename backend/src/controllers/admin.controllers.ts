import { Request, Response } from 'express';
import {Admin } from '../models/Admin';
import { User } from '../models/User';
import { Complaints } from '../models/Complaints';
import { sign,verify } from 'jsonwebtoken';
import { waste_produced } from '../models/Waste_produced';
import { JWT_SECRET } from '../config';
import {Op} from 'sequelize';
import sequelize from 'sequelize';
import { Area } from '../models/Area';

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
//------------------------------------------//
public async getcomplaint(req:Request,res:Response):Promise<void>{
    try{
        const id=req.params.id;
        const complaint = await Complaints.findOne({
            where: { id: id },
            include: [
                { model: User, attributes: ['username'] }, 
                { model: Area, attributes: ['area_name'] } 
            ]
        });
        res.status(200).json({
            complaint
        })
    }catch{
        res.status(500).json({
            err:"Unable to get complaint"
        })
    }
}
//------------------------------------------//
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
//-------------------------------------------------------//
public async waste_byarea(req:Request,res:Response):Promise<void>{
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

        
        const wastebyall = await waste_produced.findAll({
            where: whereCondition,
            order: [['total_weight', 'ASC']] 
        });

        
        const totalWeightAreaWise = await waste_produced.findAll({
            attributes: ['area_id', [sequelize.fn('SUM', sequelize.col('total_weight')), 'total_weight']],
            where: whereCondition,
            group: ['area_id']
        });
        const bioWeightAreaWise = await waste_produced.findAll({
            attributes: ['area_id', [sequelize.fn('SUM', sequelize.col('bio_weight')), 'bio_weight']],
            where: whereCondition,
            group: ['area_id']
        });
        const nonbioWeightAreaWise = await waste_produced.findAll({
            attributes: ['area_id', [sequelize.fn('SUM', sequelize.col('non_bio_weight')), 'non_bio_weight']],
            where: whereCondition,
            group: ['area_id']
        });

        res.status(200).json({
            wastebyall,
            totalWeightAreaWise,
            nonbioWeightAreaWise,
            bioWeightAreaWise            
        });
    } catch (error) {
        console.error('Error fetching waste collection:', error);
        res.status(500).json({
            error: 'Internal server error',
            
        });
    }

}

//--------------------------//
public async waste_byuser(req:Request,res:Response):Promise<void>{
    try {
        const userId = req.params.id;
        const startDate = req.query.startDate as string | undefined;
        const endDate = req.query.endDate as string | undefined;
         
        const whereCondition: any = { userId: userId };
        if (startDate && endDate) {
            whereCondition.createdAt = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            };
        }

        const totalWasteByDate = await waste_produced.findOne({
            attributes: [
                'w_date',
                [sequelize.fn('SUM', sequelize.col('total_weight')), 'total_weight'],
                [sequelize.fn('SUM', sequelize.col('bio_weight')), 'bio_weight'],
                [sequelize.fn('SUM', sequelize.col('non_bio_weight')), 'non_bio_weight']
            ],
            include: [{
                model: User,
                attributes: ['username'], 
                where: { id: userId } 
            }],
            where: whereCondition,
            group: ['w_date']
        });
    }catch(error){
        console.error('Error fetching waste collection:', error);
        res.status(500).json({
            error: 'Internal server error',

        });
    }
}


}


