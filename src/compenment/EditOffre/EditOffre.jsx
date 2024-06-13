import React, { useEffect, useState } from 'react';
import Loin from '../../assets/Logo1.png';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { axiosClient } from "../../api/axios.js";
import { useNavigate, useParams } from "react-router-dom";

function EditOffre() {
  const [base64Image, setBase64Image] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");
  const [titre, setTitre] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  
  const { id } = useParams();

    useEffect(() => {
		axiosClient.get('/Offre/' + id).then(({ data }) => {
			setTitre(data.titre);
			setDescription(data.description);
			setCity(data.city);
			setPrix(data.prix);
			console.log(data);
		})
		.catch(error => {
			if (error.response) {
				alert(error.response.data.errors);
				if(error.response.status==401){
					//navigate('/logout')
				}
			}
		});
    }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Image(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleTitreChange = (e) => {
    if (e.target.value.length <= 500) {
      setTitre(e.target.value);
    }
  };

  const handleCityChange = (e) => {
    if (e.target.value.length <= 500) {
      setCity(e.target.value);
    }
  };

  const handleDescriptionChange = (e) => {
    if (e.target.value.length <= 500) {
      setDescription(e.target.value);
    }
  };

  const handlePrixChange = (e) => {
    const value = e.target.value;
    if (value >= 0 && value <= 600) {
      setPrix(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      values.image = base64Image;
      //values.description = description;
      //values.prix = prix;

      const response = await axiosClient.put('/Offre/' + id, values);
      if (response.status === 201) {
        navigate('/offre/' + response.data.id);
      }
    } catch (error) {
      if (error.response) {
        
        alert(error.response.data.errors);
		if(error.response.status==401){
			//navigate('/logout')
		}
      }
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"></h2>
                <img className="mx-auto h-10 w-auto mt-10 no-pointer" src={Loin} alt="Morist" />
            </div>

            <div className="sm:mx-auto sm:w-full">
		<form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
		  <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 mt-10">
			<div className="sm:col-span-2">
			  <label htmlFor="titre" className="block text-sm font-semibold leading-6 text-gray-900">
				Titre
			  </label>
			  <div className="mt-2.5">
				<Input id="titre" name="titre" value={titre} onInput={handleTitreChange} required />
			  </div>
			</div>

			<div className="sm:col-span-2">
			  <label htmlFor="description" className="block text-sm font-semibold leading-6 text-gray-900">
				Description
			  </label>
			  <div className="mt-2.5">
				<Textarea id="description" name="description" value={description} onInput={handleDescriptionChange} required />
			  </div>
			  <div className="flex items-center text-gray-400 mt-2.5">
				<p className="text-sm">Les caractères ne doivent pas dépasser 500 caractères</p>
				<svg width="17" height="17" className="ml-2 mt-0.5" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
				  <path d="M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
				</svg>
			  </div>
			</div>
			<div className="sm:col-span-2">
			  <label htmlFor="city" className="block text-sm font-semibold leading-6 text-gray-900">
				Ville
			  </label>
			  <div className="mt-2.5">
				<Input id="city" name="city" value={city} onInput={handleCityChange} required />
			  </div>
			</div>

			<div className="sm:col-span-2">
			  <label htmlFor="prix" className="block text-sm font-semibold leading-6 text-gray-900">
				Prix
			  </label>
			  <div className="mt-2.5">
				<Input id="prix" type="number" name="prix" value={prix} onInput={handlePrixChange} required />
			  </div>
			  <div className="flex items-center text-gray-400 mt-2.5">
				<p className="text-sm">Le prix ne doit pas dépasser 600 dirhams par jour / personne.</p>
				<svg width="17" height="17" className="ml-2 mt-0.5" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
				  <path d="M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
				</svg>
			  </div>
			</div>

			<div className="sm:col-span-2">
			  <label htmlFor="image" className="block text-sm font-semibold leading-6 text-gray-900">
				Téléchargez une image
			  </label>
			  <div className="mt-2.5">
				<Input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} />
			  </div>
			</div>
		  </div>
		  <div className="mt-10">
			<button
			  type="submit"
			  className="block w-full rounded-md bg-amber-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			>
			  Modifier
			</button>
		  </div>
		</form>
		
    </div>
    </div>
  );
}

export default EditOffre;