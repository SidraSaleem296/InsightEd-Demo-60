// import serverAuth from "@/libs/serverAuth";
// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from '@/libs/prismadb';

// export default async function handler(req:NextApiRequest, res: NextApiResponse){
//     if(req.method != 'PATCH'){
//         console.log('Only PATCH method allowed in edit.ts');
//         return res.status(405).end();
//     }
//     try{
//         const {currentUser}= await serverAuth(req);
//         const {name, name, bio, profileImage, coverImage} = req.body;

//         if(!name || !name){
//             throw new Error('Missing Fields!');
//         }

//         const updatedUser= await prisma.user.update({
//             where:{
//                 id: currentUser.id
//             },
//             data:{
//                 name,
//                 name,
//                 bio,
//                 profileImage,
//                 coverImage
//             }
//         });
//         return res.status(200).json(updatedUser);

//     }catch(error){
//         console.log('error checking in edit.ts');
//         console.error(error);
//         return res.status(400).end();
//     }
// }


import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/lib/prismadb';

export default async function handler(req:NextApiRequest, res: NextApiResponse){
    if(req.method != 'PATCH'){
        console.log('Only PATCH method allowed in edit.ts');
        return res.status(405).end();
    }
    try{
        const {currentUser}= await serverAuth(req,res);
        const {name, name, bio, profileImage, coverImage} = req.body;

        if(!name || !name){
            throw new Error('Missing Fields!');
        }

        const updatedUser= await prisma.user.update({
            where:{
                id: currentUser.id
            },
            data:{
                name,
                name,
                bio,
                profileImage,
                coverImage
            }
        });
        return res.status(200).json(updatedUser);

    }catch(error){
        console.log('error checking in edit.ts');
        console.error(error);
        return res.status(400).end();
    }
}