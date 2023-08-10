import React from 'react'
import {useParams,useNavigate} from 'react-router-dom'

export default function Post() {
    const navigate = useNavigate();
      const username = useParams().username
  return (
    <div className='content overflow-auto flex-1 scroll-smooth relative'>
        <button onClick={() =>  navigate('/Feeds', {replace: true})}>Go back</button>
    </div>
  )
}
