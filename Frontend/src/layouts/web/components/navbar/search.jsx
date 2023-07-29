import React from 'react'

export default function search() {
  return (
    <form className='max-w-600 w-70 relative px-2'>
        <input type="text" placeholder='Search' className='w-full p-2 bg-gray-50 rounded border outline-none focus:outline-none focus:border-blue-400 focus:bg-searchFocus'/>
    </form>
  )
}
