/** @format */

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
// import logo from "C:/Users/pc/Desktop/SECOND YEAR/SHOOM/shoom_rc/public/logo.png"
import { Link, useNavigate } from "react-router-dom";
import Alert from "./components/Alert";
import { axiosClient } from "../../api/axios";
import logo from "../../../public/imgs/logo.png";
// import { v4 as uuidv4 } from "uuid";
import loginBg from "../../../public/imgs/welcom_bg.jpg";
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [fonctionId, setFonctionId] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem("ACCESS_TOKEN")) {
      navigate("/home/dashboard");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(`user: ${login}\n password: ${password}`, axios);

    try {
      setLoading(true);
      // dispatch(login())
      const response = await axiosClient.post("/login", {
        email: login,
        password: password,
        // "remember":remember
      });
      await axiosClient.get("/sanctum/csrf-cookie").then(() => {
        window.localStorage.setItem("ACCESS_TOKEN", `${login}`);

        const getCollaborateurId = async () => {
          await axiosClient
            .get(`/api/users/get-user-by-email/${login}`)
            .then((data) => {
              window.localStorage.setItem(
                "COLLABORATEUR_ID",
                data.data.idCollaborateur
              );
              window.localStorage.setItem("USER_FUNCTION",data.data.fonction)
              console.log("the data from the user: ",data);
            });
        };
        getCollaborateurId();
        console.log("Login successful:", response);
        setLogin("");
        setPassword("");
        // console.log(res)
      });
      navigate("/home/dashboard");
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      if (error.response) {
        console.error("Server response data:", error.response.data);
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className=' log-in flex h-screen items-center justify-center text-white z-10 relative'>
      <div
        className={`loading absolute ${
          loading ? "flex" : "hidden"
        } z-50 bg-gray-500 opacity-50 justify-center items-center w-full h-full top-0 left-0`}
      >
        <svg
          aria-hidden='true'
          className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
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
        src={loginBg}
        alt=''
      />
      {error ? <Alert error={"The password or the login is wrong"} /> : <></>}
      <div className=' p-8 bg-gray-900 rounded-md flex flex-col justify-center gap-5 items-center'>
        <img src={logo} alt='logo' className='w-40' />
        <h1 className='font-bold text-2xl'>Log in to your account</h1>
        <form
          method='post'
          className=' w-96 max-sm:w-72 flex flex-col justify-center gap-5'
          onSubmit={(e) => {
            handleLogin(e);
          }}
        >
          <div className='login flex flex-col gap-3'>
            <label className='text-lg' htmlFor='login'>
              Your login
            </label>
            <input
              className=' p-3 bg-gray-700 text-gray-400 rounded-md border border-gray-400 focus:outline-secondary outline-none -outline-offset-1'
              type='email'
              name='email'
              placeholder='Your login'
              required
              onChange={(e) => {
                setLogin(e.target.value);
              }}
            />
          </div>
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
          {/* <div className='remember-me flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                name='remember'
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-secondary checked:bg-secondary hover:before:bg-secondary hover:before:opacity-10"
                checked={remember}
                onChange={() =>
                  remember ? setRemember(false) : setRemember(true)
                }
              />
              <label htmlFor='remember'>Remember me</label>
            </div>
            <a href='#' className='text-secondary hover:underline'>
              Forget my password
            </a>
          </div> */}
          <button
            type='submit'
            className='bg-secondary px-5 py-3 rounded-md text-lg font-medium'
          >
            Log in to your account
          </button>
          {/* <Link to='/sign-up' className='text-secondary hover:underline w-fit'>
            Sign up
          </Link> */}
        </form>
      </div>
    </div>
  );
}

export default Login;
