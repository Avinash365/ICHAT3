import { useState } from 'react';
import toast from 'react-hot-toast';
import {useAuthContext} from "../context/AuthContext"


const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext(); 

    const signup = async ({ fullName, email, password, confirmPassword }) => {

        const success = handleInputErrors({ fullName, email, password, confirmPassword })
        if (!success) return;

        setLoading(true);
        try {
            const response = await fetch('/api/auth/singup', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, email, password, confirmPassword }),
            });
            // console.log('work');
            console.log(response.status); 
            if (!response.ok) {
                console.log('Failed to sign up'); 
                throw new Error("Failed to sign up");
            } 
            else{toast.success("you signup successly")};

            const data = await response.json(); 
            console.log(data); 
            if (data.error) { 
                throw new Error(data.error);
            }
            localStorage.setItem("chatApp1", JSON.stringify(data)); 
            setAuthUser(data); 

        }catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
    }
    return { loading, signup };
};
export default useSignup;


function handleInputErrors({ fullName, email, password, confirmPassword }) {
    // npm install react-hot-toast
    if (!fullName || !email || !password || !confirmPassword) {
        // console.log("All field are requrie");
        toast.error('All fields are requrie');
        return false;
    }
    if (password != confirmPassword) {
        // console.log('password and confi');
        toast.error('password and confirmPassword must be same');
        return false;
    }
    if (password.length < 6) {
        // console.log('');
        toast.error('Password length must more than 6'); 
        return false; 
    }  
    return true; 
}