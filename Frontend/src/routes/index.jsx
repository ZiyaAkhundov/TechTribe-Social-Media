import {React,useState} from 'react';
import Navbar from '../layouts/web/components/navbar/index';
import Home from '../pages/Home/Home'
import Article from "../pages/Articles/Article"
import Languages from "../pages/Languages/languages"
import Error from "../pages/Error/error"
import Questions from "../pages/Questions/questions"
import About from "../pages/About/about"
import Settings from "../pages/Settings/settings"
import Contact from "../pages/Contact/contact"
import Register from "../pages/Auth/Register"
import Login from "../pages/Auth/Login"
import Main from "../pages/MainPage/main"
import Chat from "../pages/Chat/chat"
import Feeds from "../pages/Feeds/feeds"
import Profile from "../pages/profile/profile"


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function Content({func}) {

  const routes = (
    <Routes>
      {/* <Route exact path="/" element={<Main />} /> */}
      <Route exact path="/" element={<Home />} />
      <Route path="/Article" element={<Article />} />
      <Route path="/Languages" element={<Languages />} />
      <Route path="/Questions" element={<Questions />} />
      <Route path="/About" element={<About />} />
      <Route path="/Settings" element={<Settings />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Chat" element={<Chat />} />
      <Route path="/Feeds" element={<Feeds/>}/>
      <Route path="/Profile" element={<Profile/>}/>
      <Route path="*" element={<Error />} />
      <Route path='/auth/login' element={<Login/>}></Route>
      <Route path='/auth/register' element={<Register/>}></Route>
    </Routes>
  );
  return (
    <>
    <main className="flex-auto height-100%">
      <Navbar func={func}/>
      {routes}
    </main>
    </>
    
  );
}




