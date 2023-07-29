import React from 'react'
import download from '../../../../assets/image/download.svg'
export default function DownloadApp() {
  return (
    <div className='h-10 flex justify-center items-center flex-shrink-0 bg-slate-900 text-white rounded-sm mb-1 mx-1 cursor-pointer'>
       <img src={download} className='h-4 mx-1' alt="" /> Download App
    </div>
  )
}
