// import bcrypt from 'bcrypt';
// import { NextApiRequest, NextApiResponse } from "next";

// import prisma from '@/lib/prismadb';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if(req.method != 'POST'){
//         return res.status(405).end();
//     }
//     try{
//         const {name,username, email, password} = req.body;
//         const hashedPassword= await bcrypt.hash(password, 12);
//         const user= await prisma.user.create({
//             data:{
//                 name,
//                 username,
//                 email,
//                 hashedPassword
//             }
//         });
//         res.status(200).json(user);
//     }catch(error){
//         console.error(error);
//         return res.status(400).end();
//     }
// }