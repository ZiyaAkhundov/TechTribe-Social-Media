import {React, useState,useRef,useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import WestIcon from '@mui/icons-material/West';
import { useSelector } from "react-redux";
import  Message  from './message/message';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import logo from "../../assets/image/logo.png"
import {getARoom,sendMessage,getMessages} from '../../services/Message'
import {getFolowings} from "../../services/Profile"
import {io} from 'socket.io-client'
import "./chat.css"


export default function chat({func}) {
   const socket = useRef(io('https://techtribe-api.onrender.com'))

   const { user } = useSelector((state) => state.auth);
   const chatBoxRef = useRef(null);
   const roomId = useParams().id;
   const PIC =import.meta.env.VITE_API_IMAGE_URL
   const [receiverUser,setReceiverUser] = useState()
   const [showPicker, setShowPicker] = useState(false);

   const [messages,setMessages] = useState([])
   const [newMessage, setNewMessage] = useState('');
   const [arrivalMessage, setArrivalMessage] = useState(null);
   const [onlineUsers,setOnlineUsers] = useState([]);

  
   const addEmoji = (e) => {
      const sym = e.unified.split("_");
      const codeArray = [];
      sym.forEach((element) => {
        codeArray.push("0x" + element);
      });
      let emoji = String.fromCodePoint(...codeArray);
    
      // Get a reference to the input element
      const inputElement = document.getElementById("chatint");
      if (!inputElement) return; // Make sure the element exists
    
      // Get the current caret position
      const caretPosition = inputElement.selectionStart;
    
      // Insert the emoji at the caret position
      setNewMessage((prevInput) => {
        const textBeforeCaret = prevInput.substring(0, caretPosition);
        const textAfterCaret = prevInput.substring(caretPosition);
        return textBeforeCaret + emoji + textAfterCaret;
      });
    
      setShowPicker(false);
    };
  
    useEffect(() => {
      // Scroll the chat box to the bottom when the component mounts
      if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      }
    }, [messages]);

    useEffect(()=>{
      setMessages('')
      const getRoom = async()=>{
         const response = await getARoom(roomId)
         if(response.status=="success"){
            setReceiverUser(response.data)
         }
      }
      const getAllMessages = async()=>{
         setNewMessage('')
         const response = await getMessages({id:roomId,userId:user.id})
         if(response.status == "success"){
            setMessages(response.data)
         }
       }
      roomId && getRoom() & getAllMessages()
      
    },[roomId])

    

    useEffect(()=>{
      socket.current = io('https://techtribe-api.onrender.com/')
      socket.current.on('getMessage',(data)=>{
         setArrivalMessage({
            sender:data.senderId,
            text:data.text,
            createdAt: Date.now()
         })
      })
      socket.current.on('disconnect', () => {
        console.log('You have been disconnected from the chat');
      });
      return () => {
        socket.current.disconnect();
      };
    },[])

    useEffect(()=>{
      arrivalMessage && receiverUser?.id.includes(arrivalMessage.sender) &&
      setMessages((prev)=>[...prev,arrivalMessage])
    },[arrivalMessage])

    const handleSubmit = async(e)=>{
      e.preventDefault();
      
      const message = {
         sender:user.id,
         text: newMessage,
         roomId:roomId
      }

      socket.current.emit('sendMessage',{
         senderId: user.id,
         receiverId: receiverUser.id,
         text: newMessage
      })

      try {
         const response = await sendMessage(message)
         if(response.status == "success"){
            setMessages([...messages,response.data])
            setNewMessage('')
         }
      } catch (error) {
         console.log(error)
      }
    }
    useEffect(()=>{
      const followings = async()=>{
        const response = await getFolowings({username:user.username})
        if(response.status == 'success'){
          socket.current.emit('addUser', user.id);
          socket.current.on('getUsers',(users)=>{
            setOnlineUsers(response.data.filter((f)=>users.some((u)=>u.userId ===f.id)))
         })
        }
      }
      followings()
    },[user])

    
  return (
    <div className="chat-box flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
      {roomId ? (
        <>
          <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
            {receiverUser && (
              <div className="relative flex items-center space-x-4">
                <div
                  className="flex justify-start items-center gap-2 p-1 md:hidden"
                  onClick={() => func(true)}
                >
                  <WestIcon />
                </div>
                <div className="relative !ml-0">
                  {onlineUsers &&
                    onlineUsers.map((user) => {
                      if (user.id == receiverUser.id) {
                        return (
                          <span
                            className="absolute text-green-500 right-0 bottom-0"
                            key={user.id}
                          >
                            <svg width="20" height="20">
                              <circle
                                cx="8"
                                cy="8"
                                r="8"
                                fill="currentColor"
                              ></circle>
                            </svg>
                          </span>
                        );
                      }
                    })}

                  <img
                    src={receiverUser.picture && PIC + receiverUser.picture}
                    alt=""
                    className="w-10 sm:w-16 h-10 sm:h-16 rounded-full border"
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <div className="text-2xl mt-1 flex items-center">
                    <span className="text-gray-700 mr-3">
                      {receiverUser.username}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            ref={chatBoxRef}
            id="messages"
            className="flex flex-col h-full space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          >
            {messages &&
              messages.map((m, index) => (
                <Message
                  message={m}
                  own={m.sender === user.id}
                  recUserPic={receiverUser?.picture}
                  key={index}
                />
              ))}
          </div>
          <form className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
            <div className="relative flex">
              <span className="absolute inset-y-0 flex items-center">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    ></path>
                  </svg>
                </button>
              </span>
              <div className="w-full flex bg-gray-200 rounded-md">
                <textarea
                  type="text"
                  id="chatint"
                  rows="1"
                  placeholder="Write your message!"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                />
                <div className="items-center inset-y-0  inline-flex px-1">
                  {showPicker && (
                    <Picker data={data} onEmojiSelect={addEmoji} />
                  )}

                  <button
                    type="button"
                    onClick={() => setShowPicker((prevState) => !prevState)}
                    className="hidden sm:inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="inline-flex items-center justify-center rounded-lg px-1 py-1 sm:px-4 sm:py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                  >
                    <span className="font-bold hidden sm:flex">Send</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-6 w-6 ml-2 transform rotate-90"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </>
      ) : (
        <div className="h-full w-full">
          <div
            className="flex justify-start items-center gap-2 p-3 md:hidden"
            onClick={() => func(true)}
          >
            <WestIcon />
            Chats
          </div>
          <div className="h-full w-full flex justify-center items-center">
            <div>
              <img src={logo} alt="TechTribe" className="h-64 w-64" />
              <p className="text-23 font-mono">Chat with your friends 😊</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
