import React, { useState } from 'react';
import Loin from '../../assets/Logo1.png';
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { axiosClient } from "../../api/axios.js";
import { useNavigate } from "react-router-dom";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { ButtonLoading } from './ButtonLoading';

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      await axiosClient.get('/sanctum/csrf-cookie', {
        baseURL: import.meta.env.VITE_BACKEND_URL
      });

      // Get form values
      const formData = new FormData(e.target);
      const values = {};
      formData.forEach((value, key) => {
        values[key] = value;
      });

      const response = await axiosClient.post('/login', values);
      if (response.status === 201) {
        window.localStorage.setItem('ACCESS_TOKEN', response.data.uid);
        window.localStorage.setItem('TYPE_COMPTE', response.data.customClaims.type_compte);
        if (response.data.customClaims.type_compte === "Tourist") {
          navigate("/touristDashboard");
        } else {
          navigate("/guideDashboard");
        }
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.errors);
      }
    }

    setLoading(false); 
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"></h2>
        <img className="mx-auto h-10 w-auto mt-10 no-pointer" src={Loin} alt="Morist" />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">E-mail</label>
            <div className="mt-2">
              <Input type="email" id="email" name="email" placeholder="E-mail" required />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">Mot de passe</label>
            </div>
            <div className="mt-2">
              <Input type="password" id="password" name="password" placeholder="Mot de passe" required />
            </div>
          </div>

          <div>
            
            {loading ? (
              <ButtonLoading />
            ) : (
              <button type="submit" className="flex w-full justify-center rounded-md bg-amber-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Se connecter
              </button>
            )}
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Vous n'avez pas de compte ?
          <Link to="/register" className="font-semibold leading-6 text-sky-600 underline"> Créer mon compte</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;