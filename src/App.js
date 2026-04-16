
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NDVI from "./pages/NDVI";
import Disease from "./pages/Disease";
import Chatbot from "./pages/Chatbot";
import Weather from "./pages/Weather";
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />  {/* This stays at the top always */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ndvi" element={<NDVI />} />
          <Route path="/disease" element={<Disease />} />
          <Route path="/Chatbot" element={<Chatbot />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

