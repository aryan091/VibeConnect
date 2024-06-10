import React,{useState} from 'react'
import toast from "react-hot-toast";
import { useAuthContext } from '../context/AuthContext';

const useLogout = () => {

    const backendLink = "http://localhost:4000"

    const [loading,setLoading] = useState(false)
    const{authUser,setAuthUser} = useAuthContext()


    const logout = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${backendLink}/api/auth/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            });
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
            localStorage.removeItem("authUser");
            setAuthUser(null)
            
        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(false)
        }
    }
  return {logout,loading}
}

export default useLogout