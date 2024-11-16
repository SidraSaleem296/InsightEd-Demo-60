import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method != 'POST' && req.method != 'DELETE'){
        return res.status(405).end();
    }
    try{
        const {postId}= req.body;
        const {currentUser}= await serverAuth(req, res);
        
        if(!postId || typeof postId != 'string'){
            throw new Error('Invalid Id.');
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        }); 

        if(!post){
            throw new Error('Post not found.');
        }

        let updatedLikedIds = [...(post.likedIds || [])];

        if(req.method == 'POST'){
            updatedLikedIds.push(currentUser.id);
            try{
                const post= await prisma.post.findUnique({
                    where:{
                        id: postId
                    }
                });

                if(post?.userId){
                    await prisma.notifications.create({
                        data:{
                            body: `@${currentUser?.username} Liked your Post "${post.body}"` ,
                            userId: post.userId
                        }
                    })

                    await prisma.user.update({
                        where:{
                            id: post.userId
                        },
                        data:{
                            hasNotifications: true
                        }
                    })
                }


            }catch(error){
                console.log( error);
            }
        }
        if(req.method == 'DELETE'){
            updatedLikedIds= updatedLikedIds.filter((likedId) => likedId != currentUser.id);
        }
        const updatedPost= await prisma.post.update({
            where:{
                id: postId
            },
            data:{
                likedIds: updatedLikedIds
            }
        });
        res.status(200).json({updatedPost});

    }catch(error){
        console.error(error);
        return res.status(400).end();
    }
}