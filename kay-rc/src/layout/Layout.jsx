/** @format */

import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import { useEffect } from "react";
import { axiosClient } from "../api/axios";

function Layout() {
  const navigate = useNavigate();
  const userData = async () => {
    await axiosClient
      .get("/api/user")
      .then((res) => {
        console.log("User:" + res);
      })
      .catch((er) => {
        console.log("user Error:" + er);
      });
  };
  useEffect(() => {
    if (!window.localStorage.getItem("ACCESS_TOKEN")) {
      navigate("/");
    }
  }, []);
  return (
    <div className='layout flex min-h-screen relative max-sm:overflow-scroll'>
      <SideBar />
      <div className=' basis-full grow flex flex-wrap justify-center content-start'>
        <Header />
        <div className='max-sm:mx-3 basis-full mx-5'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
