/** @format */

import { useEffect, useState } from "react";
import { axiosClient } from "../../../api/axios";
import { Link } from "react-router-dom";
import user1 from "../../../../public/imgs/user1.jpg";
import {
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProjectFilters from "./components/ProjectFilters";
import axios from "axios";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [allLeaders, setAllLeaders] = useState([]);
  const [allLibelles, setAllLibelles] = useState([]);
  const [editProjectId, setEditProjectId] = useState(null);
  const [initialData, setInitialData] = useState([]);
  const [libelle, setLibelle] = useState("");
  const [leader, setLeader] = useState("");
  const [error, setError] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);

  const getProjects = async () => {
    try {
      const response =
        localStorage.getItem("USER_FUNCTION") === "admin"
          ? await axiosClient.get("/api/projets")
          : await axiosClient.get(
              `/api/projects/get-projects-by-collaborateur/${localStorage.getItem(
                "COLLABORATEUR_ID"
              )}`
            );
      const projectData = response.data.projets;
      setProjects(projectData);

      // Extract leaders and libelles from the projects data
      const leaders = [
        ...new Set(projectData.map((project) => project.user.nom)),
      ];
      const libelles = [
        ...new Set(projectData.map((project) => project.libelle)),
      ];
      setAllLeaders(leaders);
      setAllLibelles(libelles);
    } catch (error) {
      console.error("Error fetching projects", error.response);
      // setError("Failed to fetch projects");
    }
  };

  const changeProject = (newProject) => {
    window.localStorage.setItem("PROJECT_ID", newProject);
  };

  const handleUpdate = async (id) => {
    try {
      await axiosClient.put(`/api/projets/${id}`, {
        idCollaborateur: leader,
        libelle: libelle,
      });
      setEditProjectId(null);
      window.location.reload();
    } catch (error) {
      setError("Failed to update project");
    }
  };
  const handleInsert = async () => {
    try {
      const response = axiosClient.post("/api/projets", {
        libelle,
        idCollaborateur: leader,
      });
      console.log("data from the insert project:", response);
      setShowAddTask(false);
      libelle !== "" && setError("Project has been created successfully");
      // response.data&&window.location.reload();
    } catch (error) {
      setError("Failed to create project");
    }
  };

  const getInitialData = async () => {
    try {
      const response = await axiosClient.get("/api/projet/edit-data");
      setInitialData(response.data);
    } catch (error) {
      setError("Failed to fetch initial data");
    }
  };
  const handleDeleteProject = async (id) => {
    try {
      await axiosClient.delete(`/api/projets/${id}`);
      const updatedProjects = projects.filter(
        (project) => project.idProjet !== id
      );
      setProjects(updatedProjects);
      if (filteredProjects.length > 0) {
        const updatedFilteredProjects = filteredProjects.filter(
          (project) => project.idProjet !== id
        );
        setFilteredProjects(updatedFilteredProjects);
      }
    } catch (error) {
      console.log("error from delete project", error);
    }
  };

  const applyFilters = (filters) => {
    const filtered = projects.filter((project) => {
      const nameMatch = project.libelle
        .toLowerCase()
        .includes(filters.name.toLowerCase());
      return nameMatch;
    });
    setFilteredProjects(filtered);
  };
  const adjustIndex = (index) => {
    index -= 1;

    return (((index % 12) + 12) % 12) + 1;
  };
  useEffect(() => {
    getProjects();
    getInitialData();
  }, []);

  return (
    <div className='projects flex flex-col items-center my-10 justify-center '>
      {error && (
        <div
          className='alert fixed top-1 flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50'
          role='alert'
        >
          <svg
            className='flex-shrink-0 inline w-4 h-4 me-3'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
          </svg>
          <span className='sr-only'>Info</span>
          <div>{error}</div>
        </div>
      )}
      <div className='flex items-center p-4 bg-secondary rounded-md w-full mb-5 justify-between'>
        <h1 className='text-2xl text-gray-50 h-full font-thin max-sm:hidden'>
          All Projects
        </h1>
        <ProjectFilters
          onFilterChange={applyFilters}
          allLeaders={allLeaders}
          allLibelles={allLibelles}
        />
      </div>

      <div className=' px-5 overflow-x-auto w-full flex flex-wrap justify-center gap-10 bg-gray-100 py-5 rounded-lg'>
        {projects.length > 0 ? (
          (filteredProjects.length > 0 ? filteredProjects : projects).map(
            (project, i) => (
              <div
                key={i}
                className='project-card h-fit border rounded-lg bg-white shadow-md basis-3/12 max-lg:basis-5/12 max-sm:basis-full'
              >
                <div className='py-2 px-4 border-b'>
                  {editProjectId === project.idProjet ? (
                    <input
                      className='border-secondary border-2 py-1 px-2 rounded-md '
                      placeholder='Project libelle'
                      required
                      type='text'
                      value={libelle}
                      onChange={(e) => setLibelle(e.target.value)}
                    />
                  ) : (
                    <Link
                      to={"/home/dashboard"}
                      className='text-secondary font-medium hover:underline'
                      onClick={() => changeProject(project.idProjet)}
                    >
                      {project.libelle}
                    </Link>
                  )}
                </div>
                <div className='py-2 px-4 border-b'>
                  <div className='flex items-center gap-2 text-sm font-medium'>
                    <div className='w-8 h-8 overflow-hidden rounded-full border-2 border-primary'>
                      <img
                        className='w-full h-full object-cover'
                        src={`../../../../public/imgs/user${adjustIndex(
                          project.user.idCollaborateur
                        )}.jpg`}
                        alt='Leader'
                      />
                    </div>
                    {editProjectId === project.idProjet ? (
                      <select
                        required
                        value={leader}
                        onChange={(e) => setLeader(e.target.value)}
                      >
                        <option>Select the leader</option>
                        {initialData.map((data, j) => (
                          <option value={data.idCollaborateur} key={j}>
                            {data.prenom} {data.nom}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className='name'>
                        <span className='text-gray-800 capitalize'>
                          {project.user.prenom} {project.user.nom}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {localStorage.getItem("USER_FUNCTION") === "admin" ? (
                  <div className='py-2 px-4 border-b'>
                    {editProjectId === project.idProjet ? (
                      <div className='flex gap-3'>
                        <button
                          className='px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600'
                          onClick={() => handleUpdate(project.idProjet)}
                        >
                          Save
                        </button>
                        <button
                          className='px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600'
                          onClick={() => setEditProjectId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className='flex'>
                        <button
                          className='delete text-red-500 py-1 px-2 mr-2 rounded-full hover:bg-gray-200'
                          onClick={() => {
                            handleDeleteProject(project.idProjet);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button
                          className='edit text-primary py-1 px-2 rounded-full hover:bg-gray-200'
                          onClick={() => setEditProjectId(project.idProjet)}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            )
          )
        ) : (
          <div className='text-center w-full'>
            <div role='status'>
              <svg
                aria-hidden='true'
                className='inline w-8 h-8 text-white animate-spin dark:text-gray-600 fill-blue-600'
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
        {localStorage.getItem("USER_FUNCTION") === "admin" ? (
          <div
            className={`project-card border rounded-lg mb-4 bg-white shadow-md cursor-pointer basis-3/12 max-lg:basis-5/12 max-sm:basis-full ${
              showAddTask ? "h-fit" : "h-36"
            } `}
          >
            <div className='flex basis-full items-center justify-center h-full'>
              {!showAddTask ? (
                <FontAwesomeIcon
                  onClick={() => {
                    setShowAddTask(true);
                  }}
                  icon={faPlus}
                  className='text-4xl text-gray-500 hover hover:bg-gray-200 p-2 rounded-md'
                />
              ) : (
                <div className=' basis-full border-b flex flex-col justify-between'>
                  <div className='py-2 px-4 border-b'>
                    <input
                      className=' border-2 w-full px-2 py-1 border-secondary rounded-md'
                      required
                      type='text'
                      value={libelle}
                      onChange={(e) => setLibelle(e.target.value)}
                      placeholder='The project libelle'
                    />
                  </div>
                  <div className='py-2 px-4 flex items-center gap-2 text-sm font-medium border-b'>
                    <div className='w-8 h-8 overflow-hidden rounded-full border-2 border-primary'>
                      <img
                        className='w-full h-full object-cover'
                        src={`../../../../public/imgs/user${adjustIndex(
                          leader
                        )}.jpg`}
                        alt='Leader'
                      />
                    </div>

                    <select
                      required
                      value={leader}
                      onChange={(e) => setLeader(e.target.value)}
                    >
                      <option>Select the leader</option>

                      {initialData.map((data, j) => (
                        <option value={data.idCollaborateur} key={j}>
                          {data.prenom} {data.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='py-2 px-4 flex gap-3'>
                    <button
                      className='px-3 py-1 bg-secondary text-white rounded-md hover:bg-blue-600'
                      onClick={() => {
                        handleInsert();
                      }}
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setShowAddTask(false);
                      }}
                      className='px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600'
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Projects;
