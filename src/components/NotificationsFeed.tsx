import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";
import { useEffect } from "react";
import { BsTwitter } from "react-icons/bs";
import { FcLike } from "react-icons/fc";

const NotificationsFeed= () => {
    const {data: currentUser, mutate: mutateCurrentUser} = useCurrentUser();
    const {data: fetchedNotifications = []} = useNotifications(currentUser?.id);

    useEffect(()=>{
        mutateCurrentUser();
    },[mutateCurrentUser]);

    if(fetchedNotifications.length == 0){
        return(
            <div className="text-neutral-600 text-center p-6 text-xl">
                No Notification :(
            </div>
        );
    }
    return(
        <div className="flex flex-col">
            {fetchedNotifications.map((notifications: Record<string, any>) => (
                <div
                    key={notifications.id}
                    className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800"
                >
                    <FcLike  size={32} />
                    <p className="text-white">
                        {notifications.body}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default NotificationsFeed;