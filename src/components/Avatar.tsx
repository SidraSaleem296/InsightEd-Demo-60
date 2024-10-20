// import useUser from "@/hooks/useUser";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import { useCallback } from "react";

// interface AvatarProps{
//     userId: string;
//     isLarge?: boolean;
//     hasBorder?: boolean;
// }

// const Avatar: React.FC<AvatarProps> = ({
//     userId,
//     isLarge ,
//     hasBorder
// }) =>{
//     const router = useRouter();
//     const {data: fetchUser}= useUser(userId);

//     const onClick= useCallback((event: any)=>{
//         event.stopPropagation();

//         const url= `/users/${userId}`;
//         router.push(url);
//     },[router, userId])

//     return(
//         <div className={`
//             ${hasBorder ? 'border-4 border-black' : ''}
//             ${isLarge? 'h-32' : 'h-12'}
//             ${isLarge? 'w-32' : 'w-12'}
//             rounded-full
//             cursor-pointer
//             hover:opacity-90
//             transition
//             relative

//         `}>
//             <Image
//                 fill
//                 style={{
//                     objectFit: 'cover',
//                     borderRadius: '100%'
//                 }}
//                 alt="Avatar"
//                 onClick={onClick}
//                 src={fetchUser?.profileImage || '/images/placeholder.jpg'}
//             />
//         </div>
//     );
// }

// export default Avatar;


"use client"; // Add this line at the top to indicate it's a Client Component

import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Change this import
import { useCallback } from "react";

interface AvatarProps {
    userId: string;
    isLarge?: boolean;
    hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
    userId,
    isLarge,
    hasBorder
}) => {
    const router = useRouter();
    const { data: fetchUser } = useUser(userId);

    const onClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        const url = `/users/${userId}`;
        router.push(url);
    }, [router, userId]);

    return (
        <div className={`
            ${hasBorder ? 'border-4 border-black' : ''}
            ${isLarge ? 'h-32' : 'h-12'}
            ${isLarge ? 'w-32' : 'w-12'}
            rounded-full
            cursor-pointer
            hover:opacity-90
            transition
            relative
        `}>
            <Image
                fill
                style={{
                    objectFit: 'cover',
                    borderRadius: '100%'
                }}
                alt="Avatar"
                onClick={onClick}
                src={fetchUser?.profileImage || '/images/placeholder.jpg'}
            />
        </div>
    );
}

export default Avatar;
