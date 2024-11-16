import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal= useRegisterModal();

    const [name, setName]= useState('');
    const [userName, setUserName]= useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [isLoding, setIsLoding]= useState(false);

    const onToggle = useCallback(()=>{
        if(isLoding){
            return;
        }
        registerModal.onClose();
        loginModal.onOpen();
    },[isLoding, registerModal, loginModal]);

    const onSubmit= useCallback(async () => {
        try{
            setIsLoding(true);


            await axios.post('/api/register', {
                name,
                userName,
                email,
                password
            });
            toast.success('Account Created!');
            signIn('credentials', {
                email,
                password
            });

            registerModal.onClose();
        }catch(error){
            console.log(error);
            toast.error('Failed to create account!');
        }finally{
            setIsLoding(false);
        }
    },[registerModal, email, password, userName, name]);


    const bodyContent= (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value= {email}
                disabled= {isLoding}
            />
            <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value= {name}
                disabled= {isLoding}
            />
            <Input
                placeholder="User Name"
                onChange={(e) => setUserName(e.target.value)}
                value= {userName}
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
            <p>Already have an account? 
                <span 
                    onClick={onToggle}
                    className="text-white cursor-pointer hover:underline"
                > 
                    Log In
                </span>
            </p>
            
        </div>
    );

    return(
        <Modal
            disabled= {isLoding}
            isOpen= {registerModal.isOpen}
            title="Create an Account"
            actionLabel="Register"
            onClose= {registerModal.onClose}
            onSubmit= {onSubmit}
            body= {bodyContent}
            footer={footerContent}
        />
    );
}

export default RegisterModal;