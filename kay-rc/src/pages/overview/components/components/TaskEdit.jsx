/** @format */

import { useEffect, useState } from "react";
import { axiosClient } from "../../../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "./Alert";

function TaskEdit() {
  const [initialData, setInitialData] = useState({});
  const [idCollaborateur, setIdCollaborateur] = useState("");
  const [idClient, setIdClient] = useState("");
  const [idProjet, setIdProjet] = useState("");
  const [idStatus, setIdStatus] = useState("");
  const [description, setDescription] = useState("");
  const [facture, setFacture] = useState(false);
  const [necessite, setNecessite] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [editData, setEditData] = useState([]);
  const [error, setError] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  console.log("the id is:", params.id);
  const getInitialData = async () => {
    try {
      const response = await axiosClient.get(`/api/taches/${params.id}`);
      setInitialData(response.data.tache);
      setIdCollaborateur(response.data.tache.idCollaborateur);
      setIdClient(response.data.tache.idClient);
      setIdProjet(response.data.tache.idProjet);
      setIdStatus(response.data.tache.idStatus);
      setDescription(response.data.tache.description);
      setFacture(response.data.tache.facture === 1 ? true : false);
      setNecessite(response.data.tache.necessite);
      // Parse date strings from server to the correct format
      const startDate = new Date(response.data.tache.dateDebut)
        .toISOString()
        .slice(0, 16);
      const endDate = new Date(response.data.tache.dateFin)
        .toISOString()
        .slice(0, 16);
      setDateDebut(startDate);
      setDateFin(endDate);
    } catch (error) {
      setError("Failed to fetch task data");
      console.error("Error fetching task data:", error);
    }
  };

  const getEditData = async () => {
    try {
      const response = await axiosClient.get("/api/tache/edit-data");
      setEditData(response.data);
    } catch (error) {
      setError("Failed to fetch edit data");
      console.error("Error fetching edit data:", error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.put(`/api/taches/${params.id}`, {
        idCollaborateur,
        idClient,
        idProjet,
        idStatus,
        necessite,
        facture: facture ? 1 : 0,
        dateDebut,
        dateFin,
        description,
        comment: "",
      });
      console.log(response.data);
      navigate("../tasks");
    } catch (error) {
      setError("Failed to update task");
      console.error("Error updating task:", error);
    }
  };

  useEffect(() => {
    getInitialData();
    getEditData();
    if (localStorage.getItem("USER_FUNCTION") !== "admin") {
      navigate("home/dashboard");
    }
  }, []);

  return (
    <div className=' rounded-lg py-5 px-10 flex '>
      {error && <Alert error={error} />}

      <div className=' basis-full task-edit bg-white p-8 rounded shadow-md max-sm:w-[270px] w-full mx-auto border-primary border-2'>
        <h2 className='text-2xl font-semibold mb-4'>Update Task</h2>

        <form
          action='#'
          method='POST'
          onSubmit={(e) => {
            handleEdit(e);
          }}
        >
          <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-4'>
            <div>
              <label
                htmlFor='idCollaborateur'
                className='block text-sm font-medium text-gray-700'
              >
                Collaborateur
              </label>
              <select
                required
                type='text'
                name='idCollaborateur'
                className='mt-1 p-2 w-full border rounded-md'
                // defaultValue={initialData.idCollaborateur}
                value={idCollaborateur}
                onChange={(e) => {
                  setIdCollaborateur(e.target.value);
                }}
              >
                {editData.users ? (
                  editData.users.map((data, i) => {
                    return (
                      <option key={i} value={data.idCollaborateur}>
                        {data.prenom}
                        {"  "}
                        {data.nom}
                      </option>
                    );
                  })
                ) : (
                  <option value={initialData.idCollaborateur}>
                    collaborateur
                  </option>
                )}
              </select>
            </div>
            <div>
              <label
                htmlFor='idClient'
                className='block text-sm font-medium text-gray-700'
              >
                Client
              </label>
              <select
                required
                type='text'
                id='idClient'
                name='idClient'
                className='mt-1 p-2 w-full border rounded-md'
                // defaultValue={initialData.idClient}
                value={idClient}
                onChange={(e) => {
                  setIdClient(e.target.value);
                }}
              >
                {editData.clients ? (
                  editData.clients.map((data, i) => {
                    return (
                      <option key={i} value={data.idClient}>
                        {data.libelle}
                      </option>
                    );
                  })
                ) : (
                  <option value={initialData.idClient}>No Clients</option>
                )}
              </select>
            </div>
            <div>
              <label
                htmlFor='idProjet'
                className='block text-sm font-medium text-gray-700'
              >
                Project
              </label>
              <select
                required
                type='text'
                id='idProjet'
                name='idProjet'
                className='mt-1 p-2 w-full border rounded-md'
                // defaultValue={initialData.idProjet}
                value={idProjet}
                onChange={(e) => {
                  setIdProjet(e.target.value);
                }}
              >
                {editData.projets ? (
                  editData.projets.map((data, i) => {
                    return (
                      <option key={i} value={data.idProjet}>
                        {data.libelle}
                      </option>
                    );
                  })
                ) : (
                  <option value={initialData.idProjet}>No Projects</option>
                )}
              </select>
            </div>
            <div>
              <label
                htmlFor='idStatus'
                className='block text-sm font-medium text-gray-700'
              >
                Status
              </label>
              <select
                required
                type='text'
                id='idStatus'
                name='idStatus'
                className='mt-1 p-2 w-full border rounded-md'
                // defaultValue={initialData.idStatus}
                value={idStatus}
                onChange={(e) => {
                  setIdStatus(e.target.value);
                }}
              >
                {editData.statuses ? (
                  editData.statuses.map((data, i) => {
                    return (
                      <option key={i} value={data.idStatus}>
                        {data.etape}
                      </option>
                    );
                  })
                ) : (
                  <option value={initialData.idStatus}>No Status</option>
                )}
              </select>
            </div>
          </div>
          <div className='mt-4'>
            <label
              htmlFor='description'
              className='block text-sm font-medium text-gray-700'
            >
              Description
            </label>
            <input
              required
              type='text'
              id='description'
              name='description'
              className='mt-1 p-2 w-full border rounded-md'
              // defaultValue={initialData.description}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-4'>
            <div className='mt-4'>
              <label
                htmlFor='dateDebut'
                className='block text-sm font-medium text-gray-700'
              >
                Date Debut
              </label>
              <input
                required
                type='datetime-local'
                id='dateDebut'
                name='dateDebut'
                className='mt-1 p-2 w-full border rounded-md'
                // defaultValue={initialData.dateDebut}
                value={dateDebut}
                onChange={(e) => {
                  setDateDebut(e.target.value);
                }}
              />
            </div>
            <div className='mt-4'>
              <label
                htmlFor='dateFin'
                className='block text-sm font-medium text-gray-700'
              >
                Date Fin
              </label>
              <input
                required
                type='datetime-local'
                id='dateFin'
                name='dateFin'
                className='mt-1 p-2 w-full border rounded-md'
                // defaultValue={initialData.dateFin}
                value={dateFin}
                onChange={(e) => {
                  setDateFin(e.target.value);
                }}
              />
            </div>

            <div className='mt-4'>
              <label
                htmlFor='necessite'
                className='block text-sm font-medium text-gray-700'
              >
                Necessite
              </label>
              <select
                required
                type='text'
                id='necessite'
                name='necessite'
                className='mt-1 p-2 w-full border rounded-md'
                // defaultValue={initialData.necessite}
                value={necessite}
                onChange={(e) => {
                  setNecessite(e.target.value);
                }}
              >
                <option value='l'>Low</option>
                <option value='n'>Normal</option>
                <option value='h'>Heigh</option>
                <option value='e'>Urgent</option>
              </select>
            </div>
            <div className='mt-6 flex items-center justify-center gap-2'>
              <label
                htmlFor='facture'
                className='block text-sm font-medium text-gray-700'
              >
                Facture
              </label>
              <input
                type='checkbox'
                id='facture'
                name='facture'
                className='mt-1 p-2 border rounded-md'
                defaultValue={initialData.facture === 0 ? false : true}
                // value={facture}
                onChange={(e) => {
                  setFacture(e.target.checked);
                }}
              />
            </div>
          </div>
          <div className='mt-6'>
            <button
              type='submit'
              className='w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600'
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskEdit;
