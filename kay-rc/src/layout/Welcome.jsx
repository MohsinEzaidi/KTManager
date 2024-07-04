/** @format */

import { useNavigate } from "react-router-dom";
import welcomeBg from "../../public/imgs/welcom_bg.jpg";
import logo from "../../public/imgs/logo.png";
function Welcome() {
  const navigate = useNavigate();
  console.log(window.localStorage.getItem("ACCESS_TOKEN"));
  const getIn = () => {
    window.localStorage.getItem("ACCESS_TOKEN")
      ? navigate("/home/dashboard")
      : navigate("/log-in");
  };
  return (
    <div className='welcome relative h-screen'>
      <img
        className=' bg-cover welcome-bg absolute w-full h-full top-0 left-0 -z-10'
        src={welcomeBg}
        alt=''
      />

      <div className='container h-full flex items-center justify-between max-md:flex-col'>
        <div className='logo basis-1/2 flex justify-center items-center'>
          <img src={logo} alt='' />
        </div>
        <div
          className='info basis-1/2 bg-white p-8
 rounded-md flex flex-col justify-center gap-5 items-center'
        >
          <div className='text'>
            <h1 className='text-center text-3xl text-primary font-bold mb-10'>
              KAY <span className='text-secondary'>TECHNOLOGY</span>
            </h1>
            <p className='text-lg font-medium text-gray-600'>
            Take the first step towards mastering task management with our comprehensive platform designed to simplify your workflow and boost productivity from the get-go.
            </p>
          </div>
          <button onClick={()=>{
            getIn()
          }} className='start mt-6 text-primary font-bold text-xl py-2 px-3 rounded-lg border-primary border-2'>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
