/** @format */
import React, { useEffect, useState } from "react";
import { axiosClient } from "../../../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEye,
  faListCheck,
  faPen,
  faPlus,
  faRocket,
  faTrash,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import UserAdd from "./components/UserAdd";
import { Link } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [functions, setFunctions] = useState([]);
  const [eyeACtive, setEyeActive] = useState(null);
  const [showUserAddForm, setShowUserAddForm] = useState(false);
  const [hideDeletedUser, setHideDeletedUser] = useState(null);
  const getUsers = async () => {
    try {
      const response = await axiosClient.get("/api/users");
      setUsers(response.data.users);
    } catch (error) {
      console.log("Error from get users:", error);
    }
  };
  const getFunctions = async () => {
    try {
      const response = await axiosClient.get("/api/fonctions");
      setFunctions(response.data.fonctions);
    } catch (error) {
      console.log("error from get functions", error);
    }
  };
  const handleDeleteUser = async (id) => {
    try {
      const response = await axiosClient.delete(`/api/users/${id}`);
      console.log("response from delete user:", response.data);
      setHideDeletedUser(id);
    } catch (error) {
      console.log("error from delete user:", error);
    }
  };
  useEffect(() => {
    getUsers();
    getFunctions();
  }, []);
  const adjustIndex = (index) => {
    index -= 1;

    return (((index % 12) + 12) % 12) + 1;
  };
  const handleRowDropDown = (index) => {
    setEyeActive(index === eyeACtive ? null : index);
  };
  return (
    <div className='bg-gray-100 p-10 rounded-lg'>
      <div className='rounded-md w-full shadow-md overflow-auto'>
        <table className='w-full text-sm  rtl:text-right text-gray-500 text-center'>
          <thead className=' text-xs text-gray-600 uppercase bg-gray-200 relative'>
            <tr className='[&>th]:py-3 [&>th]:px-6 '>
              <th className='w-4/12'>Name</th>
              <th className='w-1/12'>Function</th>
              <th className='w-1/12'>Projects</th>
              <th className='1/12'>Tasks</th>
              <th className='w-2/12'>Status</th>
              <th className='2/12'></th>
              <th className='1/12'></th>
            </tr>
            <button
              onClick={() => setShowUserAddForm(true)}
              className='add-user absolute top-0 right-0 aspect-square h-full flex items-center justify-center gap-1 bg-secondary text-white rounded-lg'
            >
              <span>
                <FontAwesomeIcon icon={faUser} />
              </span>
              <span>
                <FontAwesomeIcon icon={faPlus} />
              </span>
            </button>
          </thead>
          <tbody className='[&>tr>td]:py-3 [&>tr>td]:px-6 [&>tr]:border-b last:border-b-0'>
            {users.length>0?
            users.map((user, i) => {
              const uniqueProjects = Array.from(
                new Set(user.projets.map((projet) => projet.libelle))
              );

              return (
                <tr
                  key={i}
                  className={` [&>td]:text-xs [&>td]:text-gray-600 ${
                    user.idCollaborateur === hideDeletedUser ? "hidden" : ""
                  } ${user.fonction.libelle==="admin"&&"bg-red-500 bg-opacity-10"}`}
                >
                  <td className=' space-x-3 text-left font-medium'>
                    <img
                      className='max-w-full rounded-full w-10 inline-block'
                      src={`../../../../public/imgs/user${adjustIndex(
                        user.idCollaborateur
                      )}.jpg`}
                      alt='user-image'
                    />
                    <div className='name inline-block space-x-2'>
                      <span className=' capitalize'>{user.prenom}</span>
                      <span className=' capitalize'>{user.nom}</span>
                    </div>
                  </td>
                  <td className=''>
                    <span className={`capitalize ${user.fonction.libelle==='admin'&&'text-red-500 font-bold'}`}>{user.fonction.libelle}</span>
                  </td>
                  <td className=' space-x-2'>
                    {" "}
                    <span>
                      <FontAwesomeIcon icon={faRocket} />
                    </span>{" "}
                    <span className=''>{uniqueProjects.length}</span>
                  </td>
                  <td className=' space-x-2'>
                    {" "}
                    <span>
                      <FontAwesomeIcon icon={faListCheck} />
                    </span>{" "}
                    <span className=''>{user.taches.length}</span>
                  </td>
                  <td>
                    <span className=' capitalize'>{user.status}</span>
                  </td>
                  <td className=' space-x-2'>
                    <Link
                      to={`/home/users/${user.idCollaborateur}/edit`}
                      className=' inline-block text-blue-400 rounded-full p-2 w-8 aspect-square hover:bg-blue-400 hover:bg-opacity-10'
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </Link>
                    {user.fonction.libelle !== "admin" && (
                      <button
                        onClick={() => {
                          handleDeleteUser(user.idCollaborateur);
                        }}
                        className='text-pink-500 rounded-full w-8 aspect-square hover:bg-red-400 hover:bg-opacity-10'
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        handleRowDropDown(i);
                      }}
                      className={`w-6 aspect-square relative`}
                    >
                      <FontAwesomeIcon icon={eyeACtive === i ? faX : faEye} />
                      {eyeACtive === i ? (
                        <div className=' cursor-auto w-60 absolute flex flex-col items-start bg-white rounded-lg py-3 px-5 right-full top-0 divide-gray-800'>
                          <h1 className='text-sm mb-4 w-full border-b py-1'>
                            Tasks Progress
                          </h1>
                          <div className='progress w-full'>
                            <div className='done'>
                              <span>
                                <FontAwesomeIcon
                                  className='text-green-500'
                                  icon={faCheck}
                                />{" "}
                                Done Tasks :
                              </span>
                              <span>
                                {
                                  user.taches.filter(
                                    (task) => task.idStatus === 6
                                  ).length
                                }
                                /{user.taches.length}
                              </span>
                            </div>
                            <div className='progress-bar basis-full bg-gray-200 rounded-full h-2.5'>
                              <div
                                className='bg-blue-600 h-2.5 rounded-full'
                                style={{
                                  width: `calc(${
                                    (user.taches.filter(
                                      (task) => task.idStatus === 6
                                    ).length /
                                      user.taches.length) *
                                    100
                                  }% - 2px)`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </button>
                  </td>
                </tr>
              );
            })
            :
            <tr className="text-center w-full">
            <td colSpan={99} role="status">
                <svg aria-hidden="true" className="inline w-8 h-8 text-white animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </td>
        </tr>
            }
          </tbody>
        </table>
      </div>
      {showUserAddForm ? (
        <UserAdd
          fonctions={functions}
          setShowUserAddForm={setShowUserAddForm}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Users;
