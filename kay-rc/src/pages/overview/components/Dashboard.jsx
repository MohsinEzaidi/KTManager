/** @format */

import { useEffect, useState } from "react";
import { axiosClient } from "../../../api/axios";
import {
  faAngleDoubleUp,
  faAngleDown,
  faAngleUp,
  faArrowRightLong,
  faEllipsisVertical,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";
import UserAdd from "./components/UserAdd";
import CommentsPopUp from "./components/CommentsPopUp";

function Dashboard() {
  const [UndoneTasks, setUndoneTasks] = useState([]);
  const [userTasks, setUserTasks] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [devTeam, setDevTeam] = useState([]);
  const [fonctions, setFonctions] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [commentShow, setCommentShow] = useState(null);
  const [showComments, setShowComments] = useState(null);

  const [selectedUser, setSelectedUser] = useState("");
  const [comment, setComment] = useState("");
  const [showUserAddForm, setShowUserAddForm] = useState(false);
  const necessiteIcons = [
    { necessite: "l", icon: faAngleDown, color: "text-green-500" },
    { necessite: "n", icon: faMinus, color: "text-gray-500" },
    { necessite: "h", icon: faAngleUp, color: "text-orange-500" },
    { necessite: "e", icon: faAngleDoubleUp, color: "text-red-500" },
  ];
  const necessiteNames = [
    { necessite: "l", name: "low", color: "bg-green-500" },
    { necessite: "n", name: "normal", color: "bg-gray-500" },
    { necessite: "h", name: "high", color: "bg-orange-500" },
    { necessite: "e", name: "urgent", color: "bg-red-500" },
  ];
  const getUndoneTasks = async () => {
    try {
      const response = await axiosClient.get(
        `/api/taches/undone-tasks/${window.localStorage.getItem("PROJECT_ID")}`
      );
      console.log(response);
      setUndoneTasks(response.data.taches);
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        console.error("Server response data:", error.response.data);
      }
    }
  };
  const getStatuses = async () => {
    try {
      const response = await axiosClient.get(`/api/statuses`);
      setStatuses(response.data.statuses);
      console.log("status we have:", status);
      console.log("data we have:", response.data);
      return status;
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        console.error("Server response data:", error.response.data);
      }
    }
  };
  const getStatusById = (idStatus) => {
    const status = statuses.find((status) => status.idStatus === idStatus);
    return status ? status.etape : null;
  };
  const getDevTeam = async () => {
    try {
      const response = await axiosClient.get(
        `/api/projets/get-collaborateurs/${window.localStorage.getItem(
          "PROJECT_ID"
        )}`
      );
      console.log("response of the get dev team:", response.data.users);
      setDevTeam(response.data.users);
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        console.error("Server response data:", error.response.data);
      }
    }
  };
  const getFunctions = async () => {
    try {
      const response = await axiosClient.get(`/api/fonctions`);
      setFonctions(response.data.fonctions);
    } catch (error) {
      console.log("get function error:", error);
    }
  };
  const getUserTasks = async () => {
    try {
      const response = await axiosClient.get(
        `/api/taches/get-collaborateur-taches/${localStorage.getItem(
          "COLLABORATEUR_ID"
        )}/${localStorage.getItem("PROJECT_ID")}`
      );
      setUserTasks(response.data.taches);
    } catch (error) {
      console.log("the error from selected User tasks:", error);
    }
  };
  useEffect(() => {
    getUndoneTasks();
    getStatuses();
    getDevTeam();
    getFunctions();
    getUserTasks();
  }, []);
  const handleDropdown = (index) => {
    setOpenDropdown(index === openDropdown ? null : index);
  };
  const handleAddComment = async (id) => {
    await axiosClient.post("/api/comments", {
      idTache: id,
      comment,
      idCollaborateur: localStorage.getItem("COLLABORATEUR_ID"),
    });
    setCommentShow(null);
  };
  const adjustIndex = (index) => {
    index -= 1;

    return (((index % 12) + 12) % 12) + 1;
  };
  return (
    <div className='dashboard basis-full container flex justify-center gap-5 flex-wrap   my-10'>
      {localStorage.getItem("USER_FUNCTION") === "admin" ? (
        <>
          {showUserAddForm ? (
            <UserAdd
              fonctions={fonctions}
              setShowUserAddForm={setShowUserAddForm}
            />
          ) : (
            <></>
          )}
          <div className='undone-tasks basis-6/12 max-lg:basis-full max-lg:flex max-lg:justify-center'>
            <div className='w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8'>
              <div className='flex items-center justify-between mb-4'>
                <h5 className='text-xl font-bold leading-none text-gray-900'>
                  Undone Tasks
                </h5>
                <Link
                  to={"/home/tasks/add-task"}
                  href='#'
                  className='text-sm font-medium text-blue-600 hover:underline'
                >
                  + add task
                </Link>
              </div>
              <div className='flow-root'>
                <ul role='list' className='divide-y divide-gray-200 '>
                  {UndoneTasks.length > 0 ? (
                    UndoneTasks.map((task, i) => {
                      return (
                        <li
                          key={i}
                          className=' relative py-3 sm:py-4 max-sm:text-xs'
                        >
                          <div className='flex items-center justify-between border-2 border-secondary rounded-lg pb-2 pt-5 px-3 gap-3 bg-opacity-10 bg-primary'>
                            <div className='description basis-8/12 text-gray-800 text-sm'>
                              {task.description}
                            </div>
                            <div
                              className={`status absolute w-24 text-center top-[18%] max-sm:top-[15%] left-0 p-[1px] bg-secondary  rounded-tl-lg rounded-br-lg text-xs text-white`}
                            >
                              {getStatusById(task.idStatus)}
                            </div>
                            <div className='necessite text-lg '>
                              {necessiteIcons.map((ni, j) => (
                                <FontAwesomeIcon
                                  key={j}
                                  className={`${ni.color}`}
                                  icon={
                                    task.necessite === ni.necessite && ni.icon
                                  }
                                />
                              ))}
                            </div>
                            <div className='flex-shrink-0'>
                              <img
                                className='w-8 h-8 rounded-full'
                                src={`../../../../public/imgs/user${adjustIndex(
                                  task.user.idCollaborateur
                                )}.jpg`}
                                alt='Neil image'
                              />
                            </div>
                            <Link
                              to={`/home/tasks/${task.idTache}/edit`}
                              onClick={() => {
                                setCommentShow(task.idTach);
                              }}
                              className='comment text-lg text-gray-800 '
                            >
                              <FontAwesomeIcon icon={faEllipsisVertical} />
                            </Link>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <div className='text-center w-full'>
                      <div role='status'>
                        <svg
                          aria-hidden='true'
                          className='inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
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
                        <span className='sr-only'>Loading...</span>
                      </div>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className='dev-team basis-5/12 max-lg:basis-full max-lg:flex max-lg:justify-center'>
            <div className='w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8'>
              <div className='flex items-center justify-between mb-4'>
                <h5 className='text-xl font-bold leading-none text-gray-900'>
                  Team members
                </h5>
                <button
                  onClick={() => setShowUserAddForm(true)}
                  href='#'
                  className='text-sm font-medium text-blue-600 hover:underline'
                >
                  + add member
                </button>
              </div>
              <div className='flow-root'>
                {devTeam.length > 0 ? (
                  <ul role='list' className='divide-y divide-gray-200 '>
                    {devTeam.map((devMember, i) => {
                      return (
                        <li key={i} className='py-3 sm:py-4 '>
                          <div className='flex items-center justify-between  gap-5'>
                            <div className='function text-sm text-gray-500'>
                              {fonctions.map((fonction, j) => {
                                if (
                                  fonction.idFonction === devMember.idFonction
                                ) {
                                  return (
                                    <span key={j}>{fonction.libelle}</span>
                                  );
                                }
                              })}
                            </div>
                            <div className='flex items-center justify-between  gap-5'>
                              <div className='name flex text-sm justify-end items-center gap-2 font-medium max-sm:text-xs '>
                                <span className='first-name capitalize'>
                                  {devMember.prenom}
                                </span>
                                <span className='last-name capitalize'>
                                  {devMember.nom}
                                </span>
                              </div>
                              <div className='flex-shrink-0'>
                                <img
                                  className='w-8 h-8 rounded-full'
                                  src={`../../../../public/imgs/user${adjustIndex(
                                    devMember.idCollaborateur
                                  )}.jpg`}
                                  alt='Neil image'
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className='text-center w-full'>
                    <div role='status'>
                      <svg
                        aria-hidden='true'
                        className='inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
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
                      <span className='sr-only'>Loading...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className='basis-full max-lg:basis-full max-lg:flex max-lg:justify-center'>
          <div className='w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8'>
            <div className='flex items-center justify-between mb-4'>
              <h5 className='text-xl font-bold leading-none text-gray-900'>
                Undone Tasks
              </h5>
            </div>
            <div className='flow-root'>
              <ul
                role='list'
                className={` max-sm:divide-y divide-gray-200 gap-5  flex flex-wrap`}
              >
                {userTasks.length > 0 ? (
                  userTasks.map((task, i) => {
                    return (
                      <li
                        key={i}
                        className={`task-card basis-[31%] max-lg:basis-[48%] max-sm:basis-full bg-white rounded-md shadow-md p-6 flex flex-col ${
                          task.status.etape === "done" ? "hidden" : ""
                        }`}
                      >
                        <div className='developer-edit flex justify-between items-center mb-4'>
                          <div className='developer flex justify-end flex-row-reverse items-center gap-3 '>
                            <div className='name flex text-sm items-center gap-2 font-medium'>
                              <span className='first-name capitalize'>
                                {task.user.prenom}
                              </span>
                              <span className='last-name capitalize'>
                                {task.user.nom}
                              </span>
                            </div>
                            <div className='flex-shrink-0'>
                              <img
                                className='w-8 h-8 rounded-full'
                                src={`../../../../public/imgs/user${adjustIndex(
                                  task.user.idCollaborateur
                                )}.jpg`}
                                alt='Profile'
                              />
                            </div>
                          </div>
                          <div className='relative'>
                            <button
                              className='edit text-lg text-gray-500 ml-2 px-1'
                              onClick={() => handleDropdown(i)}
                            >
                              <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                            {openDropdown === i && (
                              <ul className='absolute top-full left-0 bg-white border border-gray-300 rounded-md mt-1 py-1'>
                                <li
                                  className='px-3 py-1 cursor-pointer hover:bg-gray-100'
                                  // onClick={() => handleEditClick(task.id)}
                                >
                                  <button
                                    onClick={() => {
                                      setCommentShow(i);
                                      handleDropdown(null);
                                    }}
                                  >
                                    Add Comment
                                  </button>
                                </li>
                              </ul>
                            )}
                          </div>
                        </div>
                        <div className='description text-gray-800'>
                          {task.description}
                        </div>
                        <div className='necessite-date mt-4 flex justify-between items-center text-gray-500'>
                          {necessiteNames.map(
                            (nn) =>
                              nn.necessite === task.necessite && (
                                <div
                                  key={nn.necessite}
                                  className={`necessite ${nn.color} text-white py-1 px-2 rounded-md text-sm`}
                                >
                                  {nn.name}
                                </div>
                              )
                          )}
                          <div className='status'>
                            <span className=' text-sm'>
                              {task.status.etape}
                            </span>
                          </div>
                          <div className='date text-xs flex gap-1 items-center'>
                            <span>{task.formattedDateDebut}</span>{" "}
                            <FontAwesomeIcon icon={faArrowRightLong} />{" "}
                            <span className={``}>{task.formattedDateFin}</span>
                          </div>
                        </div>
                        {commentShow !== i ? (
                          showComments === i ? (
                            <div className='comments-popup grow'>
                              <CommentsPopUp comments={task.comments} />
                            </div>
                          ) : (
                            <div
                              className='grow mt-3 text-gray-500  border-t  pt-5'
                              onClick={() => {
                                setShowComments(i);
                              }}
                            >
                              ({task.comments.length}) Comments
                            </div>
                          )
                        ) : (
                          <div className='comment-form mt-3'>
                            <textarea
                              rows={5}
                              cols={10}
                              className='border-secondary border-2 focus:outline-none w-full py-1 px-2 rounded-md'
                              name='comment'
                              id='comment'
                              placeholder='Add a comment'
                              onChange={(e) => {
                                setComment(e.target.value);
                              }}
                            >
                              {comment}
                            </textarea>
                            <div className='buttons flex gap-2 mt-3'>
                              <button
                                className='py-2 px-3 rounded-lg text-white bg-primary'
                                onClick={() => handleAddComment(task.idTache)}
                              >
                                save
                              </button>
                              <button
                                className='py-2 px-3 rounded-lg text-white  bg-gray-500'
                                onClick={() => {
                                  setCommentShow(null);
                                }}
                              >
                                cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  })
                ) : (
                  <div className='text-center w-full'>
                    <div role='status'>
                      <svg
                        aria-hidden='true'
                        className='inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
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
                      <span className='sr-only'>Loading...</span>
                    </div>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
