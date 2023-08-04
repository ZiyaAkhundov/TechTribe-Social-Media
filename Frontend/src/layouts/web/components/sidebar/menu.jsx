import { NavLink } from "react-router-dom"
export default function Menu({funct}){
    return(
        <nav className="px-2 asideNav">
            <ul className="flex flex-col">
                <li>
                    <NavLink to={"/"} onClick={funct} className={({ isActive, isPending }) =>
                        isPending ? "" : isActive ? "bg-active h-10 flex items-center text-base font-semibold px-4 rounded  text-gray-600" : "h-10 flex items-center text-base font-semibold px-4 rounded  text-gray-600"}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/Feeds"} onClick={funct} className={({ isActive, isPending }) =>
                        isPending ? "" : isActive ? "bg-active h-10 flex items-center text-base font-semibold px-4 rounded  text-gray-600" : "h-10 flex items-center text-base font-semibold px-4 rounded  text-gray-600"}>
                        Feeds
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/Contact"} onClick={funct} className={({ isActive, isPending }) =>
                        isPending ? "" : isActive ? "bg-active h-10 flex items-center text-base font-semibold px-4 rounded  text-gray-600" : "h-10 flex items-center text-base font-semibold px-4 rounded  text-gray-600"}>
                        Contact
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/Settings"} onClick={funct} className={({ isActive, isPending }) =>
                        isPending ? "" : isActive ? "bg-active h-10 flex items-center text-base font-semibold px-4 rounded  text-gray-600" : "h-10 flex items-center text-base font-semibold px-4 rounded  text-gray-600"}>
                        Settings
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/Chat"} onClick={funct} className={({ isActive, isPending }) =>
                        isPending ? "" : isActive ? "bg-active h-10 flex items-center text-base font-semibold px-4 rounded  text-gray-600" : "h-10 flex items-center text-base font-semibold px-4 rounded  text-gray-600"}>
                        Chat
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}