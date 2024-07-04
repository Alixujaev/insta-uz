import { Route, Routes, useLocation } from "react-router-dom";
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
import EditPost from "./components/dialogs/EditPost";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";
import AboutProfile from "./components/dialogs/AboutProfile";
import Story from "./pages/Story";
import { useDispatch } from "react-redux";
import { createUser } from "./actions/userActions";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchData = async (token: string | null) => {
      if (!token) {
        localStorage.clear();
        return;
      }
      try {
        const result = await aboutMe(token);
        dispatch(createUser(result.data.data));
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
      {token && !pathname.includes("/stories/") ? (
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
          <Route path="/:username" element={<Profile />} />
          <Route path="/p/:id" element={<Post />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/stories/:id" element={<Story />} />
        </Routes>

        <EditPost />
        <AboutProfile />

        {!pathname.includes("/stories/") ? <Links /> : null}
      </div>
    </div>
  );
}

export default App;
