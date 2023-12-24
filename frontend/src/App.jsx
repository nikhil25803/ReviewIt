import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/user/:username" element={<Profile />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  );
};

export default App;
