import React from 'react'
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
const LogoutButton = () => {


	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem("authUser");
		localStorage.removeItem("token");
		navigate("/login");
	}
	return (
		<div className='mt-auto'>
				<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
		</div>
	);
};
export default LogoutButton;