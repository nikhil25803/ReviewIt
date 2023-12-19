import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  );
};

export default App;
