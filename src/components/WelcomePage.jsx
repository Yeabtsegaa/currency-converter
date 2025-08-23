import { useNavigate } from "react-router-dom";
import '../App.css';

function WelcomePage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/convert");
  };

  return (
    <div className = "min-h-screen flex flex-col justify-center items-center bg-blue-200 text-center px-5 m-0 relative">
      <div className="flex flex-col justify-center items-center max-w-3x1 w-full">
        <h1 className=" text-black lg:text-[7rem] md:text-[4.5rem] sm:text-[4rem] text-[4rem] font-bold font-sans" >CashFlip</h1>
        <p className=" px-2 text-sm lg:text-lg mb-8  text-black max-w-md sm:text-sm text-[1rem] font-sans">Convert currencies in real-time</p>
        <button onClick={handleStart} className=" font-semibold bg-blue-600 px-3 py-1 sm:px-5 sm:py-2 md:px-8 md:py-3 lg:px-16 lg:py-4 lg:text-[2.5rem] md:text-[2rem] text-[2.5rem] text-white rounded-full hover:bg-blue-800 hover:translate-y-1 hover:shadow-xl ">
          Get Started
        </button>
      </div>
      <footer className= " absolute bottom-5 w-full text-center text-gray-800 font-bold text-[0.8rem] lg:text-[1rem] font-sans md:text-[0.9rem] sm:text-[0.7rem] ">
        <p>Powered by Egele</p>
      </footer>
    </div>
  );

}





export default WelcomePage;
