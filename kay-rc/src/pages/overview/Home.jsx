// /** @format */

// import { Outlet } from "react-router-dom";
// import { axiosClient } from "../../api/axios";
// import { useDispatch } from "react-redux";
// import { setTeamCounter } from "../../redux/slices/TeamCounterSlice";
// import { setTasksCounter } from "../../redux/slices/TasksCounterSlice";
// import { useEffect, useState } from "react";
// import { setProjectsCounter } from "../../redux/slices/ProjectsCounterSlice";

// function Home() {
//   const [projectId, setProjectId] = useState(0);
//   const dispatch = useDispatch();

//   // Function to fetch development team
//   const getDevTeam = async () => {
//     const response = await axiosClient.get(
//       `/api/projets/get-collaborateurs/${projectId}`
//     );
//     dispatch(setTeamCounter(response.data.users.length));
//   };

//   // Function to fetch tasks
//   const getTasks = async () => {
//     const response = await axiosClient.get(
//       `/api/taches/taches-by-projet/${projectId}`
//     );
//     dispatch(setTasksCounter(response.data.taches.length));
//   };

//   // Function to fetch projects
//   const getProjects = async () => {
//     const response = await axiosClient.get("/api/projets");
//     dispatch(setProjectsCounter(response.data.projets.length));
//   };

//   // Effect to run when projectId changes
//   useEffect(() => {
//     // Check if projectId has changed
//     if (projectId !== window.localStorage.getItem("PROJECT_ID")) {
//       setProjectId(window.localStorage.getItem("PROJECT_ID"));
//     }
//   }, [projectId]);

//   // Effect to run when projectId is updated
//   useEffect(() => {
//     getDevTeam();
//     getTasks();
//     getProjects();
//   }, [projectId]);

//   return (
//     <>
//       <Outlet />
//     </>
//   );
// }

// export default Home;
/** @format */

import { Outlet } from "react-router-dom";
import { axiosClient } from "../../api/axios";
import { useDispatch } from "react-redux";
import { setTeamCounter } from "../../redux/slices/TeamCounterSlice";
import { setTasksCounter } from "../../redux/slices/TasksCounterSlice";
import { useEffect, useState } from "react";
import { setProjectsCounter } from "../../redux/slices/ProjectsCounterSlice";

function Home() {
  const [projectId, setProjectId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch development team
        const devTeamResponse = await axiosClient.get(
          `/api/projets/get-collaborateurs/${projectId}`
        );
        dispatch(setTeamCounter(devTeamResponse.data.users.length));

        // Fetch tasks
        const tasksResponse = await axiosClient.get(
          `/api/taches/taches-by-projet/${projectId}`
        );
        dispatch(setTasksCounter(tasksResponse.data.taches.length));

        // Fetch projects
        const projectsResponse = await axiosClient.get("/api/projets");
        dispatch(setProjectsCounter(projectsResponse.data.projets.length));
      } catch (error) {
        // Handle errors if necessary
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data only if projectId is truthy (not 0)
    if (projectId) {
      fetchData();
    }
  }, [projectId, dispatch]);

  useEffect(() => {
    // Set projectId when it changes in localStorage
    const storedProjectId = window.localStorage.getItem("PROJECT_ID");
    if (storedProjectId && storedProjectId !== projectId) {
      setProjectId(storedProjectId);
    }
  }, [projectId]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default Home;

