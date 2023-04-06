import { BrowserRouter,Routes,Route } from "react-router-dom";
import Main from "./pages/Main";
import Patient from "./pages/Patient";
import Doctor from "./pages/Doctor";
import Rdv from "./pages/Rdv";
import './stylesheet/Main.scss'
import Header from './compononents/Header'

function App() {
  return (
    <BrowserRouter>
    
    <div className="app">   
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/patient" element={<Patient />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/rdv" element={<Rdv />} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
