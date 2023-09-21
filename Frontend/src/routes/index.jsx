import Home from '../pages/Home/Home'
import Error from "../pages/Error/error"
import Settings from "../pages/Settings/settings"
import Contact from "../pages/Contact/contact"
import Register from "../pages/Auth/Register/Register"
import Login from "../pages/Auth/Login/Login"
import Chat from "../pages/Chat/chat"
import Feeds from "../pages/Feeds/Feeds"
import {Profile} from "../pages/profile/profile"
import {Post} from "../pages/Post/post"
  export const routes = [
    {
      path:"/",
      component: Home,
      auth:false,
      layout:"main"
    },
    {
      path:"/Settings",
      component: Settings,
      auth:true,
      layout:"main"
    },
    {
      path:"/Contact",
      component: Contact,
      auth:false,
      layout:"main"
    },
    {
      path:"/Chat",
      component: Chat,
      auth:true,
      layout:"chat"
    },
    {
      path:"/Chat/:id",
      component: Chat,
      auth:true,
      layout:"chat"
    },
    {
      path:"/Feeds",
      component: Feeds,
      auth:true,
      layout:"main"
    },
    {
      path:"/Profile/:username",
      component: Profile,
      auth:true,
      layout:"main"
    },
    {
      path:"/Profile/:username/followers",
      component: Profile,
      auth:true,
      layout:"main"
    },
    {
      path:"/Profile/:username/followings",
      component: Profile,
      auth:true,
      layout:"main"
    },
    {
      path:"Post/:id",
      component: Post,
      auth:true,
      layout:"main"
    },
    {
      path:"*",
      component: Error,
      auth:false,
      layout:"none"
    },
    {
      path:"/auth/login",
      component: Login,
      auth:false,
      layout:"none"
    },
    {
      path:"/auth/register",
      component: Register,
      auth:false,
      layout:"none"
    }
  ];
  export default routes; 
