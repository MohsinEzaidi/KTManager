/** @format */

import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import logo from "../../../public/imgs/logo.png";
import Alert from "./components/Alert";
import { axiosClient } from "../../api/axios";
import signupBg from "../../../public/imgs/welcom_bg.jpg";
import { v4 as uuidv4 } from "uuid";
function Signup() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [idFonction, setIdFonction] = useState(1);
  const [fonctionIds, setFonctionIds] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberToken,setRememberToken]=useState(uuidv4())
  const navigate = useNavigate();
  useEffect(() => {
    getFonctions();
    if (window.localStorage.getItem("ACCESS_TOKEN")) { 
      navigate("/home/dashboard");
    }
  }, []);
  const getFonctions = async () => {
    try {
      const response = await axiosClient.get("/api/fonctions");
      setFonctionIds([...response.data.fonctions]);
    } catch (error) {
      console.error("get fonctions error:", error);
      if (error.response) {
        console.error("Server response data:", error.response.data);
        setError(error.response.data.message);
      }
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosClient.post("/register", {
        nom: nom,
        prenom: prenom,
        email: login,
        password: password,
        idFonction: idFonction,
        password_confirmation: passwordConfirmation,
        isFonction: idFonction,
        remember_token: rememberToken,
      });
      console.log("signup successful:", response.data);
      setLogin("");
      setPassword("");
      setNom("");
      setPrenom("");
      window.localStorage.setItem("ACCESS_TOKEN", `${login}`);
      navigate("/home/dashboard");
    } catch (error) {
      setLoading(false);
      console.error("signup error:", error);
      if (error.response) {
        console.error("Server response data:", error.response.data);
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div className='sign-up relative flex py-3 items-center justify-center text-white z-10 flex-wrap'>
      <div
        className={`loading absolute ${
          loading ? "flex" : "hidden"
        } z-50 bg-gray-500 opacity-50 justify-center items-center w-full h-full top-0 left-0`}
      >
        <svg
          aria-hidden='true'
          className=' w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
          viewBox='0 0 100 101'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
            fill='currentColor'
          />
          <path
            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
            fill='currentFill'
          />
        </svg>
      </div>
      <img
        className=' absolute top-0 left-0 h-full w-full bg-cover -z-10'
        src={signupBg}
        alt=''
      />
      {error ? <Alert error={error} /> : <></>}
      <div className=' p-8 bg-gray-900 rounded-md flex flex-col justify-center gap-5 items-center'>
        <img src={logo} alt='logo' className='w-40' />
        <h1 className='font-bold text-2xl'>Log in to your account</h1>
        <form
          method='post'
          className=' w-96 max-sm:w-72 flex flex-col justify-center gap-5'
          onSubmit={(e) => {
            handleSignup(e);
          }}
        >
          {/* <div className="flex justify-between max-md:flex-wrap"> */}
          <div className='user-nom flex flex-col gap-3'>
            <label className='text-lg' htmlFor='text'>
              Your First Name
            </label>
            <input
              className=' p-3 bg-gray-700 text-gray-400 rounded-md border border-gray-400 focus:outline-secondary outline-none -outline-offset-1'
              type='text'
              name='nom'
              placeholder='Your first name'
              required
              onChange={(e) => {
                setNom(e.target.value);
              }}
            />
          </div>
          <div className='user-prenom flex flex-col gap-3'>
            <label className='text-lg' htmlFor='text'>
              Your Family Name
            </label>
            <input
              className=' p-3 bg-gray-700 text-gray-400 rounded-md border border-gray-400 focus:outline-secondary outline-none -outline-offset-1'
              type='text'
              name='prenom'
              placeholder='Your last name'
              required
              onChange={(e) => {
                setPrenom(e.target.value);
              }}
            />
          </div>
          <div className='user-prenom flex flex-col gap-3'>
            <label className='text-lg' htmlFor='text'>
              Fonction
            </label>
            <select
              name='idFonction'
              className=' p-3 bg-gray-700 text-gray-400 rounded-md border border-gray-400 focus:outline-secondary outline-none -outline-offset-1'
              onChange={(e) => setIdFonction(e.target.value)}
            >
              {fonctionIds.map((fonction, i) => {
                return (
                  <option key={i} value={fonction.idFonction}>
                    {fonction.libelle}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='email flex flex-col gap-3'>
            <label className='text-lg' htmlFor='email'>
              Your Login
            </label>
            <input
              className=' p-3 bg-gray-700 text-gray-400 rounded-md border border-gray-400 focus:outline-secondary outline-none -outline-offset-1'
              type='email'
              name='email'
              placeholder='Your email'
              required
              onChange={(e) => {
                setLogin(e.target.value);
              }}
            />
          </div>
          {/* </div> */}
          <div className='password relative flex flex-col gap-3'>
            <label className='text-lg' htmlFor='password'>
              Password
            </label>
            <input
              className=' p-3 pr-12 bg-gray-700 text-gray-400 rounded-md border border-gray-400 focus:outline-secondary outline-none -outline-offset-1'
              type={showPassword ? "text" : "password"}
              name='password'
              placeholder='Your password'
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              type='button'
              className=' w-5 cursor-pointer absolute right-3 bottom-3 '
            >
              <FontAwesomeIcon
                onClick={() => {
                  showPassword ? setShowPassword(false) : setShowPassword(true);
                }}
                icon={showPassword ? faEye : faEyeSlash}
              />
            </button>
          </div>
          <div className='confirm-password relative flex flex-col gap-3'>
            <label className='text-lg' htmlFor='password'>
              Confirm Password
            </label>
            <input
              className=' p-3 pr-12 bg-gray-700 text-gray-400 rounded-md border border-gray-400 focus:outline-secondary outline-none -outline-offset-1'
              type={showPassword ? "text" : "password"}
              name='password'
              placeholder='Your password'
              required
              onChange={(e) => {
                setPasswordConfirmation(e.target.value);
              }}
            />
          </div>
          <button
            type='submit'
            className='bg-secondary px-5 py-3 rounded-md text-lg font-medium'
          >
            Create a new account
          </button>
          {/* <Link to='/log-in' className='text-secondary hover:underline w-fit'>
            Log in
          </Link> */}
        </form>
      </div>
    </div>
  );
}

export default Signup;
