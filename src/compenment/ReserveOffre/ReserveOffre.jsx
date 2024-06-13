import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../api/axios.js";
import Loin from '../../assets/Logo1.png';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../Crd.jsx';
import { Badge } from "@/components/ui/badge.jsx";

function ReserveOffre() {
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const { id } = useParams();

	useEffect(() => {
	if (window.localStorage.getItem('TYPE_COMPTE')!=="Tourist") {
	  navigate('/')
	}
	}, []);

    useEffect(() => {
        axiosClient.get('/Offre/' + id).then(({ data }) => {
            setOffre(data);
            console.log(data);
        });
    }, [id]);

    const [nombrePersonnes, setNombrePersonnes] = useState(1);
    const [reservationDateMin, setReservationDateMin] = useState('');
    const [reservationDateMax, setReservationDateMax] = useState('');
    const [prixtotal, setPrixtotal] = useState("");
    const [products, setOffre] = useState({});

    const calculatePrixTotal = (nombrePersonnes, reservationDateMin, reservationDateMax) => {
        if (nombrePersonnes && reservationDateMin && reservationDateMax) {
            const dateMin = new Date(reservationDateMin);
            const dateMax = new Date(reservationDateMax);
            const timeDifference = dateMax - dateMin;
            const daysNumbre = timeDifference / (1000 * 3600 * 24) + 1; 
            const totalPrice = products.prix * daysNumbre * nombrePersonnes;
            setPrixtotal(totalPrice);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
		
		
		const isValidDateRange = (minDate, maxDate) => {
			const now = new Date();
			const min = new Date(minDate);
			const max = new Date(maxDate);
			return (max >= min) && (min >= now);
		};
		
		if (name === 'nombre_personnes') {
			if (value >= 1 && value <= 1000000) {
				setNombrePersonnes(value);
				if (isValidDateRange(reservationDateMin, reservationDateMax)) {
					calculatePrixTotal(value, reservationDateMin, reservationDateMax);
				} else {
					setPrixtotal(undefined);
				}
			}
		} else if (name === 'reservation_date_min') {
			setReservationDateMin(value);
			if (isValidDateRange(value, reservationDateMax)) {
				calculatePrixTotal(nombrePersonnes, value, reservationDateMax);
			} else {
				setPrixtotal(undefined);
			}
		} else if (name === 'reservation_date_max') {
			setReservationDateMax(value);
			if (isValidDateRange(reservationDateMin, value)) {
				calculatePrixTotal(nombrePersonnes, reservationDateMin, value);
			} else {
				setPrixtotal(undefined);
			}
		}
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axiosClient.get('/sanctum/csrf-cookie', {
                baseURL: import.meta.env.VITE_BACKEND_URL
            });

            const formData = new FormData(e.target);
            const values = {};
            formData.forEach((value, key) => {
                values[key] = value;
            });

            const response = await axiosClient.post('/Reservation', values);
            if (response.status === 201) {
                navigate('/touristDashboard');
            }
        } catch (error) {
            if (error.response) {
				alert(error.response.data.errors)
              
            }
        }
    };

    return (
        <>
            <div className="container mx-auto p-4">
            <div className="w-full lg:w-[590px] mx-auto text-center mt-10">
                <Card {...products} showButton={false} />
            </div>
            </div>
            <form onSubmit={handleSubmit} className="mx-auto max-w-xl sm:mt-3 p-4 sm:p-0">
                <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 mt-10">
                    <div className="sm:col-span-2">
                        <label htmlFor="nombre_personnes" className="block text-sm font-semibold leading-6 text-gray-900 mb-2">
                            Nombre des Personnes
                        </label>
                        <div className="mt-2.5">
                            <Input id="nombre_personnes" type="number" name="nombre_personnes" required value={nombrePersonnes} onChange={handleChange} className="py-3" />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="reservation_date_min" className="block text-sm font-semibold leading-6 text-gray-900 mb-2">
                            Date de Début
                        </label>
                        <div className="mt-2.5">
                            <Input type="date" id="reservation_date_min" name="reservation_date_min" required onChange={handleChange} className="py-3" />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="reservation_date_max" className="block text-sm font-semibold leading-6 text-gray-900 mb-2">
                            Date de Fin
                        </label>
                        <div className="mt-2.5">
                            <Input type="date" id="reservation_date_max" name="reservation_date_max" required onChange={handleChange} className="py-3" />
                        </div>
                    </div>
                    <Input type="hidden" name="id_offre" value={`${id}`} />
                </div>
                <div className="flex justify-center mt-7">
                    <Badge className="bg-sky-200 hover:bg-sky-200 text-black text-center text-md font-bold py-3 px-6">
                        Prix Total : {prixtotal} DH
                    </Badge>
                </div>
                <div className="mt-10 flex justify-center">
                    <button
                        type="submit"
                        className="flex justify-center items-center w-full sm:w-auto hover:bg-black  bg-amber-700 px-[140px] rounded-3xl py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <span className="mr-2">Reserver</span>
                        <svg width="17" height="17" className="mt-1" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>
            </form>
        </>
    );
}

export default ReserveOffre;
