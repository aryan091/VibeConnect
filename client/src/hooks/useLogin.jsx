import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

    const navigate = useNavigate();

    const backendLink = "https://vibeconnect-0t3x.onrender.com"

    const login = async (username, password) => {
        const success = handleInputErrors(username, password);
        if (!success) return;
        setLoading(true);
        try {
            
            const reqUrl = `${backendLink}/api/auth/login`;
            const response = await axios.post(reqUrl, {
                username,
                password
            });
  
            localStorage.setItem("token", response.data.data.token);
            localStorage.setItem("authUser", JSON.stringify(response.data.data));
            setAuthUser(response.data.data);
            console.log(response.data)

            navigate("/");
            

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
        
	return { loading, login };
};
export default useLogin;

function handleInputErrors(username, password) {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}