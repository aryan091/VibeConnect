import React,{useState} from 'react'
import toast from "react-hot-toast";
import { useAuthContext } from '../context/AuthContext';

const useSignUp = () => {

    const backendLink = "https://vibeconnect-0t3x.onrender.com"

    const[loading,setLoading] = useState(false)
    const{authUser,setAuthUser} = useAuthContext()

    const signUp = async ({fullName,username,password,confirmPassword,gender}) => {

        const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
		if (!success) return;


        setLoading(true)

        try {

            const response = await fetch(`${backendLink}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName,
                    username,
                    password,
                    confirmPassword,
                    gender
                }),
            });

            const data = await response.json();
            if(data.error) {
                throw new Error(data.error)
            }

            localStorage.setItem("authUser", JSON.stringify(data))

            setAuthUser(data)

            console.log(data)
            
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }

    }


  return {
    loading,
    signUp
  }
}

export default useSignUp

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
	if (!fullName || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}