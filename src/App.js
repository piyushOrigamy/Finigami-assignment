import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/login";
import LoginOtp from "./components/loginOtp";



function App() {
  return (
    <Router>
    <Routes>
      <Route path="/login" element ={<Login/>}/>
      <Route path="/login-otp" element ={<LoginOtp/>}/>
    </Routes>
    </Router>
  );
}

export default App;