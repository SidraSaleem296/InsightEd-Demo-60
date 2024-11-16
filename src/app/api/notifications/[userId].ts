import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method != 'GET'){
        return res.status(405).end();
    }
    try{
        const { userId }= req.query;
        if(!userId || typeof userId != 'string'){
            throw new Error('Invalid Id');
        }
        const notifications= await prisma.notifications.findMany({
            where:{
                userId
            },
            orderBy:{
                createdAt: 'desc'
            }
        });
        
        await prisma.user.update({
            where:{
                id: userId
            },
            data:{
                hasNotifications: false
            }
        });

        res.status(200).json(notifications);

 
    }catch(error){
        console.error(error);
        return res.status(400).end();
    }
}