import { useNavigate } from "react-router-dom";
import '../App.css';

function WelcomePage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/convert");
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-title">CashFlip</h1>
        <p className="welcome-subtitle">Convert currencies in real-time</p>
        <button onClick={handleStart} className="welcome-button">
          Get Started
        </button>
      </div>
      <footer className="welcome-footer">
        <p>Powered by Egele</p>
      </footer>
    </div>
  );
}





export default WelcomePage;
