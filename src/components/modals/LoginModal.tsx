import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";

const LoginModal = () => {
    const registerModal = useRegisterModal(); 
    const loginModal = useLoginModal();
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [isLoding, setIsLoding]= useState(false);

    const onToggle = useCallback(()=>{
        if(isLoding){
            return;
        }
        loginModal.onClose();
        registerModal.onOpen();
    },[isLoding, registerModal, loginModal]);

    const onSubmit= useCallback(async () => {
        try{
            setIsLoding(true);


            await signIn('credentials',{
                email,
                password
            })


            loginModal.onClose();
        }catch(error){
            console.log(error);
        }finally{
            setIsLoding(false);
        }
    },[loginModal, email, password]);


    const bodyContent= (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value= {email}
                disabled= {isLoding}
            />
            <Input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value= {password}
                disabled= {isLoding}
            />
        </div>
    );

    const footerContent=(
        <div className="text-neutral-400 text-center mt-4">
            <p>Dont have an account? 
                <span 
                    onClick={onToggle}
                    className="text-white cursor-pointer hover:underline"
                > 
                    Create an account!
                </span>
            </p>
            
        </div>
    );

    return(
        <Modal
            disabled= {isLoding}
            isOpen= {loginModal.isOpen}
            title="Login"
            actionLabel="Sign in"
            onClose= {loginModal.onClose}
            onSubmit= {onSubmit}
            body= {bodyContent}
            footer={footerContent}
        />
    );
}

export default LoginModal;