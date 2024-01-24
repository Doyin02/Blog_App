import Home from "./pages/home/Home";
import Topbar from "./components/topbar/Topbar";
import Single from "./pages/home/single/Single";
import Write from "./pages/home/write/Write";
import Setting from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const{user} = useContext(Context)

  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={user ? <Home/> :<Register />} />
        <Route path="/login" element={user ? <Home/> :<Login />} />
        <Route path="/write" element={user ? <Write/> :<Register />} />
        <Route path="/settings" element={user ? <Setting/> :<Register />} />
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
    </Router>
  );
}

export default App;
