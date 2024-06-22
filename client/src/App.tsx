import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import Verify from "./pages/Verify";
import Home from "./pages/Home";

function App() {
  const token = localStorage.getItem("token");
  return (
    <Routes>
      <Route path="/" element={token ? <Home /> : <Login />} />
      <Route path="/accounts/signup" element={<Register />} />
      <Route path="/accounts/password/reset/" element={<Reset />} />
      <Route path="/accounts/verify" element={<Verify />} />
    </Routes>
  );
}

export default App;
