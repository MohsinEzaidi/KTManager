/** @format */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import { axiosClient } from "../../../../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function UserAdd({ fonctions, setShowUserAddForm }) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [idFonction, setIdFonction] = useState(1);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axiosClient.post("/register", {
        nom: nom,
        prenom: prenom,
        email: email,
        password: password,
        idFonction: idFonction,
        password_confirmation: passwordConfirmation,
        isFonction: idFonction,
      });
      console.log("signup successful:", response.data);
      setEmail("");
      setPassword("");
      setNom("");
      setPrenom("");
      navigate("/home/users");
      setShowUserAddForm(false);
    } catch (error) {
      setIsLoading(false);
      console.error("signup error:", error);
      if (error.response) {
        console.error("Server response data:", error.response.data);
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div className=' fixed z-20 h-screen  w-screen top-0 left-0 bg-secondary bg-opacity-80 flex justify-center items-center'>
      <div className='  rounded-lg py-5 px-10 flex'>
        {error && <Alert error={error} />}

        <div className='bg-white basis-full p-8 rounded shadow-md max-sm:w-[270px]  border-primary border-2'>
          <div className='mb-4 flex justify-between items-center'>
            <h2 className='text-2xl font-semibold '>Add User</h2>{" "}
            <button className='' onClick={() => setShowUserAddForm(false)}>
              <FontAwesomeIcon icon={faX} />
            </button>
          </div>

          <form
            action='#'
            method='POST'
            onSubmit={(e) => {
              handleAddUser(e);
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
            <div className='grid grid-cols-2 max-sm:grid-col-1 gap-4 mt-4'>
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
              <div className='password'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700'
                >
                  Password
                </label>
                <input
                  required
                  type='password'
                  name='password'
                  className='mt-1 p-2 w-full border rounded-md'
                  // defaultValue={initialData.password}
                  value={password}
                  placeholder='Password'
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordConfirmation(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className='mt-6'>
              <button
                type='submit'
                className='w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600'
              >
                Add User
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

export default UserAdd;
