import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import ConverterPage from "./components/ConverterPage";

const  App = () => {
  return (
    
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/convert" element={<ConverterPage />}/>
        
      </Routes>
    </BrowserRouter>

  
    
    
  );
}

export default App;