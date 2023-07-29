import { useState } from "react"
import Search from "./search"
import { NavLink } from "react-router-dom"
export default function Navbar({func}) {
  return (
    <div className="navbar  bg-bgMain h-14 flex justify-between px-3 relative items-center">
      <button type="button" className="md:hidden" onClick={func}>
        <i className="fa-solid fa-bars"></i>
      </button>
      <Search/>
      <div>
        <NavLink to={"/auth/login"} className="bg-blue-900 text-white rounded-md p-2 px-5">
          Log in
        </NavLink>
      </div>
    </div>
  )
}
