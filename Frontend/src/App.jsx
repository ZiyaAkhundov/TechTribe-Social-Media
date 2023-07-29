import Sidebar from "./layouts/web/components/sidebar"
import Messenger from "./layouts/web/components/messenger/conversation"
import Content from "./routes/index"
import Bottom from "./layouts/web/components/bottom"
import { BrowserRouter as Router } from "react-router-dom"
import Main from "./pages/MainPage/main"
import { useState } from "react"
function App() {

  const [sidebar,setSidebar]=useState(false)

  const sidebarAction = () =>{
    setSidebar(prev=>!prev);
  }

  return (
    <Router>
      <div className="content overflow-hidden">
        {/* <Sidebar state={sidebar} func={sidebarAction}/> */} 
        <Messenger func={sidebarAction} state={sidebar}/>
        <Content func={sidebarAction} />
      </div>
      {/* <Bottom /> */}
    </Router>
    // <Main/>
  )
}

export default App
