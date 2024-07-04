/** @format */

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faBars,
  faHome,
  faListCheck,
  faPeopleGroup,
  faRocket,
  faTasks,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../public/imgs/logo.png";
import { useSelector } from "react-redux";

function SideBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const teamCounter = useSelector((state) => state.teamCounter);
  const tasksCounter = useSelector((state) => state.tasksCounter);
  const projectsCounter = useSelector((state) => state.projectsCounter);
  const links = [
    { name: "Dashboard", icon: faHome, to: "/home/dashboard" },
    { name: "Tasks", icon: faListCheck, to: "/home/tasks" },
    { name: "Projects", icon: faRocket, to: "/home/projects" },
  ];

  const logout = () => {
    window.localStorage.removeItem("COLLABORATEUR_ID");
    window.localStorage.removeItem("ACCESS_TOKEN");
    navigate("/");
  };

  return (
    <div
      className={`h-[78px] w-16 max-lg:w-16 bg-white ${
        !sidebarOpen && " border-b-2 border-gray-300"
      }`}
    >
      {/* <button
        onClick={() => {
          sidebarOpen ? setSidebarOpen(false) : setSidebarOpen(true);
        }}
        className='inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
      >
        <span className='sr-only'>Toggle sidebar</span>
      </button> */}

      <button
        className={` fixed left-3 top-5 flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 z-[99] bg-white`}
        onClick={() => {
          sidebarOpen ? setSidebarOpen(false) : setSidebarOpen(true);
        }}
      >
        <FontAwesomeIcon
          className='w-6 h-6'
          icon={sidebarOpen ? faX : faBars}
        />
      </button>
      <aside
        id='default-sidebar'
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-white  ${
          sidebarOpen ? "" : "left-full"
        } sm:translate-x-0 bg-gray-200 rounded-r-lg shadow-lg`}
        aria-label='Sidebar'
      >
        <div className='info flex flex-col mt-24 mx-5 border border-gray-900 rounded-md'>
          <div className='logo border-b border-gray-900 p-3'>
            <img src={logo} alt='' />
          </div>
          {localStorage.getItem("USER_FUNCTION") === "admin" ? (
            <div className='numbers p-3 divide-x divide-gray-900 flex basis-full border-gray-900'>
              <div className='number-team grow text-center text-xl font-medium hover:text-secondary cursor-default'>
                <span className='mr-3'>{teamCounter}</span>
                <FontAwesomeIcon icon={faPeopleGroup} />
              </div>
              <div className='number-tas grow text-center text-xl font-medium hover:text-secondary cursor-default'>
                <span className='mr-3'>{tasksCounter}</span>
                <FontAwesomeIcon icon={faTasks} />
              </div>
              <div className='number-tas grow text-center text-xl font-medium hover:text-secondary cursor-default'>
                <span className='mr-3'>{projectsCounter}</span>
                <FontAwesomeIcon icon={faRocket} />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className='h-full px-3 py-4 overflow-y-auto '>
          <ul className='space-y-2 font-medium'>
            {links.map((link, i) => (
              <li key={i}>
                <NavLink
                  to={link.to}
                  onClick={() => setSidebarOpen(false)}
                  className='flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group'
                >
                  <FontAwesomeIcon
                    className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-secondary '
                    icon={link.icon}
                  />
                  <span className='ms-3'>{link.name}</span>
                </NavLink>
              </li>
            ))}
            {localStorage.getItem("USER_FUNCTION")==="admin"?<li>
            <NavLink
                  to={"/home/users"}
                  onClick={() => setSidebarOpen(false)}
                  className='flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group'
                >
                  <FontAwesomeIcon
                    className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-secondary '
                    icon={faPeopleGroup}
                  />
                  <span className='ms-3'>Collaborateurs</span>
                </NavLink>
            </li>:<></>}
          </ul>
        </div>
        <div className='logout'>
          <button
            onClick={() => logout()}
            className='absolute bottom-3 left-2 font-medium text-gray-800 transition-all hover:left-4 hover:underline'
          >
            <span className="mr-2 "><FontAwesomeIcon icon={faArrowLeftLong} /></span>
            Log Out
          </button>
        </div>
      </aside>
    </div>
  );
}

export default SideBar;
