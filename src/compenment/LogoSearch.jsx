import React, { useState, useEffect } from 'react';
import '../App.css';
import {Link} from "react-router-dom";
import logo from '../assets/logo.png';
import {axiosClient} from "../api/axios.js";
import {useNavigate} from "react-router-dom";

import { Button } from "@/components/ui/button.jsx";

import { Input } from "@/components/ui/input";


  const path = window.location.pathname;
import { Label } from "@/components/ui/label";

function LogoSearch() {
	

  const [qe, setQe] = useState("");
  
    useEffect(() => {
		const searchQuery = path.split('/search/')[1];
		if (searchQuery) {
		  setQe(searchQuery);
		}
    }, []);
  

  const handleChange = (e) => {
      setQe(e.target.value);
  };
  const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
		
	try {
        //await axiosClient.get('/sanctum/csrf-cookie', {
        //    baseURL: import.meta.env.VITE_BACKEND_URL
        //});
		

        // Get form values
        const formData = new FormData(e.target);
        const values = {};
        formData.forEach((value, key) => {
            values[key] = value;
        });

        //const response = await axiosClient.post('/search', values);
        //if (response.status === 204) {
            //window.localStorage.setItem('ACCESS_TOKEN', 'test');
		if(qe !== ""){
            navigate('/search/'+qe);
		}
        //}
    } catch (error) {
        if (error.response) {
            // setError('email', {
                // message: error.response.data.errors.email.join()
            // });
        }
    }
    };
    return (
                    <>
                        <div className="md:flex md:items-center md:gap-12">
                                <Link className="block text-teal-600 dark:text-teal-600" to="/">
                                <span className="sr-only">Home</span>
                                <img src={logo} className="h-[72px]" alt="Logo"/>
                                </Link>
                        </div>

                        <div className="hidden md:block">
                            <nav aria-label="Global">
                                <ul className="flex items-center gap-6 text-sm">
                                    <li>
                                        <div className="flex w-full max-w-sm items-center space-x-2">
										
										<form onSubmit={handleSubmit} className="flex items-center justify-between">
                                            <Input type="text" name="q" value={qe} onChange={handleChange} placeholder="Chercher dans Morist " className="rounded-3xl w-auto px-[72px] border border-black uu" />
                                            <Button type="submit" className="rounded-3xl bg-amber-700 text-sm hover:bg-amber-700 ">Chercher <svg width="16" height="16" className="ml-1 mt-0.5" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                            </svg></Button>
											</form>
                                        </div>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </>
    );
}

export default LogoSearch;
