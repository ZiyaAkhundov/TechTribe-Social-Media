import { NavLink } from "react-router-dom"
export default function Bottom() {
  return (
    <div  className="h-16 border-t bg-bgMain  flex justify-center items-center">
        <ul className="flex flex-row">
        <li className="mx-2">
          <NavLink to={"https://www.youtube.com/@ProgrammersSchool"} 
            className="border rounded-full p-2  flex shadow-home">
              <i className="fa-brands fa-youtube text-1 p-2 text-red-600"></i>
            </NavLink>
          </li>
          <li className="mx-2">
            <NavLink to={"/"} 
            className={({ isActive, isPending }) =>
            isPending ? "" : isActive ? "bg-cyan-700 text-white border rounded-full p-2 flex shadow-home" : "border rounded-full p-2 bg-slate-50 flex shadow-home"}>
              <i className="fa-solid fa-house text-1 p-2"></i>
            </NavLink>
          </li>
          <li className="mx-2">
          <NavLink to={"https://www.instagram.com/programmers.school/"} 
            className="border rounded-full p-2 bg-instagram flex shadow-home">
              <i className="fa-brands fa-instagram text-1 p-2 text-white"></i>
            </NavLink>
          </li>
        </ul>
    </div>
  )
}
