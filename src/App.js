import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ResetPassowrd from "./pages/ResetPassowrd";
import ForgotPassword from "./pages/ForgotPassword";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <Router className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassowrd />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<MainLayout />} >
          <Route index element={<Dashboard/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
