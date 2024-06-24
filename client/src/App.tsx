import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import Verify from "./pages/Verify";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Sidebar from "./components/Sidebar";
import Links from "./components/Links";
import { useEffect } from "react";
import { aboutMe } from "./store/user.store";

function App() {
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async (token: string | null) => {
      if (!token) {
        localStorage.clear();
        return;
      }
      try {
        const result = await aboutMe(token);
        localStorage.setItem("user", JSON.stringify(result.data.data));
      } catch (error) {
        console.log(error);
        localStorage.clear();
      }
    };

    fetchData(token);
  }, []);
  return (
    <div className="flex">
      {token ? (
        <>
          <Sidebar />
          <div className="w-64"></div>
        </>
      ) : null}

      <div className="flex-1">
        <Routes>
          <Route path="/" element={token ? <Home /> : <Login />} />
          <Route path="/accounts/signup" element={<Register />} />
          <Route path="/accounts/password/reset/" element={<Reset />} />
          <Route path="/accounts/verify" element={<Verify />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

        <Links />
      </div>
    </div>
  );
}

export default App;
