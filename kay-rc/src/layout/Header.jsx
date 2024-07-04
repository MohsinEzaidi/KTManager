import { useEffect, useState } from "react";
import userImg from "../../public/imgs/user1.jpg";
import { axiosClient } from "../api/axios";

function Header() {
  const [project, setProject] = useState("");
  const [leader, setLeader] = useState("");
  const [projectId, setProjectId] = useState(window.localStorage.getItem("PROJECT_ID"));

  const getProject = async () => {
    try {
      const response = await axiosClient.get(`/api/projets/${projectId}`);
      setProject(response.data.projet);
      setLeader(`${response.data.projet.user.prenom} ${response.data.projet.user.nom}`);
    } catch (error) {
      console.error("Error fetching project:", error);
      // Handle error
    }
  };

  useEffect(() => {
    getProject();
  }, [projectId]);

  // Update projectId when FUNCTION_ID changes in localStorage
  useEffect(() => {
    setProjectId(window.localStorage.getItem("PROJECT_ID"));
  }, [window.localStorage.getItem("PROJECT_ID")]);
  const adjustIndex=(index)=> {
    index -= 1;
  
    return (((index % 12) + 12) % 12) + 1;
  }
  return (
    <div className="header bg-white basis-full h-[78px] flex justify-between items-center px-5 py-3 mb-10 border-b-2 border-l-2 border-gray-300">
      <div>
        <h1 className="text-2xl text-secondary flex-grow text-center font-semibold">
          {project ? project.libelle : "Loading..."}
        </h1>
        <p className="text-gray-500 text-sm">Project Leader: {leader ? leader : "Loading..."}</p>
      </div>
      <div className="account flex items-center">
        {project ? (
          <div className="flex items-center">
            <div className="w-10 max-lg:w-8">
              <img
                className="aspect-square max-w-full rounded-full border-2 border-primary"
                src={`../../public/imgs/user${adjustIndex(project.user.idCollaborateur)}.jpg`}
                alt="user"
              />
            </div>
            <span className="ml-2 text-sm">{leader}</span>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary mr-2"></div>
            <span>Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
