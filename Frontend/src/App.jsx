import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 
import { useSelector } from "react-redux";
import Sidebar from "./layouts/web/components/sidebar";
import Messenger from "./layouts/web/components/messenger/conversation";
import Navbar from "./layouts/web/components/navbar/index";
import routes from "./routes";


function App() {
  const [sidebar, setSidebar] = useState(false);

  const sidebarAction = () => {
    setSidebar((prev) => !prev);
  };

  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="content overflow-hidden">
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
                        <Navbar />
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
                        <route.component />
                      </main>
                    </>
                  }
                />
              )
            } 
            else {
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
