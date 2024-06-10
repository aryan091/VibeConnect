import React,{useState} from 'react'
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import axios from "axios";

const useSendMessage = () => {

    const[loading,setLoading] = useState(false)
    const {messages , setMessages , selectedConversation} = useConversation()

    const backendLink = "https://vibeconnect-0t3x.onrender.com"


    const sendMessage = async (message) => {

        setLoading(true)
        try {
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = token;

            const res = await axios.post(`${backendLink}/api/message/send/${selectedConversation._id}`, {
                message            })

            setMessages([...messages , res.data.data])
            setLoading(false)
        } catch (error) {
            toast.error(error.message)
        }
        finally{
            setLoading(false)
        }
    }

  return {sendMessage , loading}
}

export default useSendMessage