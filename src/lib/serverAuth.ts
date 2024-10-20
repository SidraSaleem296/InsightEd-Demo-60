// import { NextApiRequest } from "next";
// import { getSession } from "next-auth/react";
// import prisma from '@/libs/prismadb'

// const serverAuth= async (req: NextApiRequest) => {
//     const session= await getSession({req});

//     if(!session?.user?.email){
//         throw new Error('Not Signed In');
//     }

//     const currentUser= await prisma.user.findUnique({
//         where:{
//             email:session.user.email
//         }
//     });

//     if(!currentUser){
//         throw new Error('Not Signed In');
//     }
    
//     return {currentUser};
// };

// export default serverAuth;

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from '@/libs/prismadb';
import { authOptions } from "@/pages/api/auth/[...nextauth]";  // Import authOptions

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);  // Use getServerSession

    if (!session?.user?.email) {
        throw new Error('Not Signed In');
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    });

    if (!currentUser) {
        throw new Error('Not Signed In');
    }
    
    return { currentUser };
};

export default serverAuth;
