/** @format */

import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Alert from "./Alert";
import { axiosClient } from "../../../../api/axios";

function UserEdit() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [idFonction, setIdFonction] = useState(1);
  const [fonctions, setFonctions] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const handleEditUser = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true);
      const response = await axiosClient.put(`api/users/${params.id}`, {
        email,
        idFonction,
        nom,
        prenom,
      });
      console.log("response from edit user:", response.data);
      setEmail("");
      setNom("");
      setPrenom("");
      setIdFonction("")
      navigate("/home/users");
    } catch (error) {
      setIsLoading(false);
      console.log("error from edit user:", error);
      setError(error.response.data.message);
    }
  };
  const getFunctions = async () => {
    try {
      const response = await axiosClient.get("/api/fonctions");
      setFonctions(response.data.fonctions);
    } catch (error) {
      console.log("error from get functions:", error);
    }
  };
  const getEditData = async () => {
    try {
      const response = await axiosClient.get(`/api/users/${params.id}`);
      setEmail(response.data.user.email);
      setNom(response.data.user.nom);
      setPrenom(response.data.user.prenom);
      setIdFonction(response.data.user.idFonction);
    } catch (error) {
      console.log("error fro the get edit data:", error);
    }
  };
  useEffect(() => {
    getFunctions();
    getEditData();
  }, []);
  return (
    <div className=' container z-20 '>
      <div className='  rounded-lg py-5 px-10 flex'>
        {error && <Alert error={error} />}

        <div className='bg-white p-8 rounded shadow-md max-sm:w-[270px] mx-auto border-primary border-2'>
          <div className='mb-4 flex justify-between items-center'>
            <h2 className='text-2xl font-semibold '>
              Edit User{" "}
              <span className=' capitalize text-lg text-primary font-medium '>
                {prenom} {nom}
              </span>
            </h2>{" "}
            <Link to={"/home/users"} className=''>
              <FontAwesomeIcon icon={faX} />
            </Link>
          </div>

          <form
            action='#'
            method='POST'
            onSubmit={(e) => {
              handleEditUser(e);
            }}
          >
            <div className='grid grid-cols-2 max-sm:grid-col-1 gap-4'>
              <div className='nom'>
                <label
                  htmlFor='nom'
                  className='block text-sm font-medium text-gray-700'
                >
                  Nom
                </label>
                <input
                  required
                  type='text'
                  name='nom'
                  className='mt-1 p-2 w-full border rounded-md'
                  // defaultValue={initialData.nom}
                  value={nom}
                  onChange={(e) => {
                    setNom(e.target.value);
                  }}
                  placeholder='Nom'
                />
              </div>
              <div className='prenom'>
                <label
                  htmlFor='prenom'
                  className='block text-sm font-medium text-gray-700'
                >
                  Prenom
                </label>
                <input
                  required
                  type='text'
                  name='prenom'
                  className='mt-1 p-2 w-full border rounded-md'
                  // defaultValue={initialData.prenom}
                  value={prenom}
                  onChange={(e) => {
                    setPrenom(e.target.value);
                  }}
                  placeholder='Prenom'
                />
              </div>
            </div>
            <div className='function mt-4'>
              <label
                htmlFor='idFonction'
                className='block text-sm font-medium text-gray-700'
              >
                Function
              </label>
              <select
                required
                type='text'
                id='idFonction'
                name='idFonction'
                className='mt-1 p-2 w-full border rounded-md'
                // defaultValue={initialData.idFonction}
                value={idFonction}
                onChange={(e) => {
                  setIdFonction(e.target.value);
                }}
              >
                <option>Select Status</option>
                {fonctions ? (
                  fonctions.map((data, i) => {
                    return (
                      <option key={i} value={data.idFonction}>
                        {data.libelle}
                      </option>
                    );
                  })
                ) : (
                  <option>No Status</option>
                )}
              </select>
            </div>
            <div className='grid grid-cols-1 max-sm:grid-col-1 gap-4 mt-4'>
              <div className='email'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Email
                </label>
                <input
                  required
                  type='email'
                  name='email'
                  className='mt-1 p-2 w-full border rounded-md'
                  // defaultValue={initialData.email}
                  value={email}
                  placeholder='E-mail'
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className='mt-6'>
              <button
                type='submit'
                className='w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600'
              >
                Edit User
              </button>
            </div>
            {isLoading && ( // Render loading animation if isLoading is true
              <div className='flex justify-center items-center'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserEdit;
