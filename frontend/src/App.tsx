import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Persist from "./components/Persist";
import AuthContextComponent from "./context/Auth/AuthContextComponent";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
const App = () => {
  return (
    <AuthContextComponent>
      <Toaster />
      <Routes>
        <Route element={<Persist />}>
          <Route path="/login" element={<Login />} />
          <Route path="app" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Route>
        <Route path="/" element={<Welcome />} />
      </Routes>
    </AuthContextComponent>
  );
};

export default App;
