import React, {useState , useEffect} from 'react'
import useConversation from "../zustand/useConversation";
import axios from 'axios';
import toast from "react-hot-toast";

const useGetMessages = () => {

    const[loading,setLoading] = useState(false)
    const {messages , setMessages , selectedConversation} = useConversation()

    const backendLink = "http://localhost:4000"



    useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
                const token = localStorage.getItem("token");
                axios.defaults.headers.common["Authorization"] = token;

				const res = await axios.get(`${backendLink}/api/message/${selectedConversation._id}`);
                console.log("Messages : ",res.data)
                setMessages(res.data.data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);


    return { messages, loading };

}

export default useGetMessages