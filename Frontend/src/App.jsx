import React, { useState,useEffect } from "react";
import logo from "./assets/image/profile.png"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 
import { useSelector } from "react-redux";
import Sidebar from "./layouts/web/components/sidebar";
import Messenger from "./layouts/web/components/messenger/conversation";
import Navbar from "./layouts/web/components/navbar/index";
import routes from "./routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { login,logout } from './stores/auth';
import {get, post} from "./utils/request"
import axios from 'axios';


function App() {
  const [sidebar, setSidebar] = useState(false);

  const sidebarAction = () => {
    setSidebar((prev) => !prev);
  };
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    setLoading(true);
    axios.get('https://techtribe-api.onrender.com/auth/user-data', { withCredentials: true })
      .then(response => {
            dispatch(login(response.data)); 
      })
      .catch(error => {
        // console.log('Error fetching user data:', error);
      }).finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
    });
  }, []); 
if(loading){
  return (
    <div className="absolute h-100dvh w-full top-0 left-0 flex justify-center items-center flex-col">
      <img src={logo} alt="" className="h-24 object-contain" />
      <div className="mt-5 loading">
        <Box sx={{ display: 'flex'}}>
          <CircularProgress/>
        </Box>
      </div>
    </div>
  )
}
  return (
    <Router>
      <div className="content overflow-hidden">
      <ToastContainer />
        <Routes>
          {routes.map((route) => {
            if (route.layout === "main") {
              if (route.auth && !user) {
                return (
                  <Route key={route.path} path={route.path} element={<Navigate to="/auth/login" replace />} />
                )
              }
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <>
                      <Sidebar state={sidebar} func={sidebarAction} />
                      <main className="flex-auto height-100%">
                        <Navbar func={sidebarAction}/>
                        <route.component />
                      </main>
                    </>
                  }
                />
              )
            } else if (route.layout === "chat") {
              if (route.auth && !user) {
                return (
                  <Route key={route.path} path={route.path} element={<Navigate to="/auth/login" replace />} />
                )
              }
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <>
                    <Messenger func={sidebarAction} state={sidebar} />
                      <main className="flex-auto height-100%">
                        <route.component func={sidebarAction}/>
                      </main>
                    </>  
                  }
                />
              )
            } 
            else {
              if(user){
                return (
                  <Route key={route.path} path={route.path} element={<Navigate to="/" replace />} />
                )
              }
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.component />}
                />
              )
            }
          })}
        </Routes>
      </div>
    </Router>
  )
}

export default App;
