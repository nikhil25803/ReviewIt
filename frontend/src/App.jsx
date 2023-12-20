import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:username" element={<Profile />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  );
};

export default App;
