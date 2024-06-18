import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/accounts/signup" element={<Register />} />
      <Route path="/accounts/password/reset/" element={<Reset />} />
    </Routes>
  );
}

export default App;
