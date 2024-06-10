import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

    const backendLink = "http://localhost:4000"


	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {

                const url = `${backendLink}/api/users`
                const token = localStorage.getItem("token");
                axios.defaults.headers.common["Authorization"] = token;

                const response = await axios.get(url);
                setConversations(response.data.data);
                console.log("Side CHats : ",response.data)

			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;