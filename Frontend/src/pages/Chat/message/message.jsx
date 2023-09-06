import React from 'react'
import { useSelector } from "react-redux";
import TimeAgo from 'react-timeago'
import EnStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

export default function Message({message,own,recUserPic}) {
    
    const { user } = useSelector((state) => state.auth);
    const PIC =import.meta.env.VITE_API_IMAGE_URL
    return (
      <>
        {own ? (
          <div className="chat-message">
            <div className="flex items-end justify-end relative">
              <div className="flex flex-col space-y-2 text-xs max-w-[18rem] mx-2 order-1 items-end">
                <div className='px-4 py-2 rounded-lg rounded-br-none bg-blue-600 text-white w-full break-words'>
                  {message.text}
                  <TimeAgo date={message.createdAt}  className='absolute text-sm/[1px] p-1 -bottom-3 right-8 text-black'>11:02</TimeAgo>
                </div>
              </div>
              <img
                src={PIC + user.picture}
                alt="My profile"
                className="w-6 h-6 rounded-full order-2 object-cover border"
              />
            </div>
          </div>
        ) : (
          <div className="chat-message">
            <div className="flex items-end relative">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                <div className="px-4 py-2 rounded-lg bg-gray-300 text-gray-600 w-full break-words">
                    {message.text}
                <TimeAgo date={message.createdAt}  className='absolute text-sm/[1px] p-1 -bottom-3 left-8 text-black'>11:02</TimeAgo>
                </div>
              </div>
              <img
                src={PIC + recUserPic}
                alt="My profile"
                className="w-6 h-6 rounded-full order-1 object-cover border"
              />
            </div>
          </div>
        )}
      </>
    );
}
