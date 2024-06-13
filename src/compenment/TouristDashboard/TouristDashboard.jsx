import {Link, Outlet, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, USER_DASHBOARD_ROUTE} from "../../router/index.jsx";
import {useEffect, useState} from "react";
import {axiosClient} from "../../api/axios.js";
                    //<Logo/>

export default function TouristDashboard() {
  const navigate = useNavigate()
  const [offre, setOffre] = useState([])
  
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

  useEffect(() => {
    if (!window.localStorage.getItem('ACCESS_TOKEN') || window.localStorage.getItem('TYPE_COMPTE') != "Tourist") {
      navigate(LOGIN_ROUTE)
    }
    axiosClient.get('/Reservation').then(({data}) => {
		const dataArray = Object.values(data);
		setOffre(dataArray)
	})
    .catch(error => {
        if (error.response) {
            alert(error.response.data.errors);
			if(error.response.status==401){
				//navigate('/logout')
			}
        }
    });
  }, []);
  

  const handleCancel = (id) => {
    axiosClient.put(`/Reservation/${id}`, {etat_confirmation: "Canceled"})
      .then(response => {
        setOffre(offre.map(item => item.id === id ? { ...item, etat_confirmation: "Canceled" } : item));
      })
      .catch(error => {
        console.error("There was an error cancelling the reservation!", error);
      });
  };
  
  return  <>
          <br/><div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr style={{ background: 'antiquewhite' }}>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Titre de l'offre
                </th>
                <th scope="col" className="px-6 py-3">
                  Prix totale
                </th>
                <th scope="col" className="px-6 py-3">
                  nombre_personnes
                </th>
                <th scope="col" className="px-6 py-3">
                  reservation_date_min
                </th>
                <th scope="col" className="px-6 py-3">
                  reservation_date_max
                </th>
                <th scope="col" className="px-6 py-3">
                  etat_confirmation
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
              </tr>
              </thead>
              <tbody>
          {offre.map((item, index) => (
            <tr className="bg-white dark:bg-gray-800" key={index}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <Link to={`/offre/${item.id_offre}`}>{item.id}</Link>
              </th>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <Link to={`/offre/${item.id_offre}`}>{item.titre}</Link>
              </th>
              <td className="px-6 py-4">{item.totalprix}</td>
              <td className="px-6 py-4">{item.nombre_personnes}</td>
              <td className="px-6 py-4">{item.reservation_date_min}</td>
              <td className="px-6 py-4">{item.reservation_date_max}</td>
              <td className="px-6 py-4">
                {item.etat_confirmation !== "Confirmed" && item.etat_confirmation !== "Canceled" ? (
					<>
						{item.etat_confirmation}
						<br />
						<button
						onClick={() => handleCancel(item.id)}
						className="text-red-500 hover:text-red-700"
					  >
						Annuler
					  </button>
				  </>
				) : item.etat_confirmation === "Confirmed" ? (
					<>
						{item.etat_confirmation}
						<br />
						<Link to={`/contactUser/${item.publisher_offre}`} className="text-green-500 hover:text-green-700" >
							Contacter Guide
						</Link>
					</>
				) : item.etat_confirmation === "Canceled" ? (
                  item.etat_confirmation
                ) : null}
              </td>
              <td className="px-6 py-4">{item.date}</td>
            </tr>
          ))}
        </tbody>
            </table>
          </div>
  </>
}