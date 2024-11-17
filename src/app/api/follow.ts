import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method != 'POST' && req.method != 'DELETE'){
        return res.status(405).end();
    }
    try{
        const {userId} = req.body;
        const { currentUser }= await serverAuth(req, res);

        if(!userId || typeof userId != 'string'){
            throw new Error('Invalid Id');
        }
        const user= await prisma.user.findUnique({
            where:{
                id: userId
            }
        });
        if(!user){
            throw new Error('User not found');
        }
        let updatedFollowingIds= [...(user.followingIds || [])];

        if(req.method == 'POST'){
            updatedFollowingIds.push(userId);
            // adding notification code
            try{
                await prisma.notifications.create({
                    data:{
                        body: `@${currentUser?.username} started Following you` ,
                        userId
                    }
                })

                await prisma.user.update({
                    where:{
                        id: userId
                    },
                    data:{
                        hasNotifications: true
                    }
                })
            }catch(error){
                console.log( error);
            }
        }
        if(req.method == 'DELETE'){
            updatedFollowingIds=updatedFollowingIds.filter(followingId=>followingId != userId);
        }
        const updatedUser= await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                followingIds: updatedFollowingIds
            }
        });
        return res.status(200).json(updatedUser);
    }catch(error){
        console.error(error);
        return res.status(400).end();
    }
}