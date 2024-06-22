import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import Verify from "./pages/Verify";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/accounts/signup" element={<Register />} />
      <Route path="/accounts/password/reset/" element={<Reset />} />
      <Route path="/accounts/verify" element={<Verify />} />
    </Routes>
  );
}

export default App;
