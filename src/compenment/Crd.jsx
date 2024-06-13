import { axiosClient } from "@/api/axios.js";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { WiCloudy, WiDaySunny, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";
import { Link } from "react-router-dom";
import '../compenment/Card.css';

import { CalendarIcon } from "@radix-ui/react-icons"
 



const Crd = ({ description, id, image, prix, titre, date, starred, pannied, id_user, prenom, nom, city, showButton = true }) => {
	const [loading, setLoading] = useState(true);
	const [isGuide, setIsGuide] = useState(false);
	const [visible, setVisible] = useState(true);
  
  
    const [liked, setLiked] = useState(false);
    const [panied, setPanied] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
	
	const [weather, setWeather] = useState(null); // weather data state
  
	
	
    useEffect(() => {
        setLiked(starred);
        setPanied(pannied);
		setLoading(false);
    }, [starred, pannied]);

  useEffect(() => {
    const accountType = window.localStorage.getItem('TYPE_COMPTE');
    if (accountType === 'Guide') {
      setIsGuide(true);
    }
	
  }, []);

    // Fetch weather data
    const fetchWeather = async () => {
		if(city !== undefined){
      const citye = city;
      const apiKey = "1f957ce7e5e387bd6160cfe2cc5ea431"; // replace with your OpenWeatherMap API key
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${citye}&lang=en&appid=${apiKey}`;
	  
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
	}
    };
	
	  useEffect(() => {

    fetchWeather();
	
  }, [city]);

    const handleLikeClick = async (e) => {
        e.preventDefault();
        setLiked(!liked);

        try {
			if(!liked){
				const response = await axiosClient.post('/Star', { id_offre: id });
				if (response.status === 201) {
					// Handle success
				}
			} else {
				const response = await axiosClient.delete('/Star/'+id);
				if (response.status === 201) {
					// Handle success
				}
			}
        } catch (error) {
            if (error.response) {
                alert(error.response.data.errors);
            }
        }
    };

    const handleCartClick = async (e) => {
        e.preventDefault();
        setPanied(!panied);

        try {
            if(!panied){
				const response = await axiosClient.post('/panier', { id_offre: id });
				if (response.status === 200) {
					// Handle success
				}
			} else {
				const response = await axiosClient.delete('/panier/'+id);
				if (response.status === 200) {
					// Handle success
				}
			}
        } catch (error) {
            if (error.response) {
                alert(error.response.data.errors);
            }
        }
    };
	
	

    const handleDeleteClick = async (e) => {
        e.preventDefault();

		if (window.confirm("Êtes-vous sûr de bien vouloir supprimer cet élément?")) {
			try {
				const response = await axiosClient.delete('/Offre/'+id);
					if (response.status === 200) {
						// Handle success
						setVisible(false);
					}
			} catch (error) {
				if (error.response) {
					alert(error.response.data.errors);
				}
			}
		}
    };
	
	if (loading) {
    return (
      <div role="status">
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Veuillez patienter...</span>
</div>
    );
  }

  if (!visible) {
    return null;
  }
  

const getWeatherIcon = (description) => {
  if (description) {
    switch (description.toLowerCase()) {
      case "clear sky":
        return <WiDaySunny size={28} className="text-yellow-500" />;
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
        return <WiCloudy size={28} className="text-sky-700"/>;
      case "shower rain":
      case "rain":
        return <WiRain size={28} />;
      case "thunderstorm":
        return <WiThunderstorm size={28} />;
      case "snow":
        return <WiSnow size={28} />;
      default:
        return <WiCloudy size={28} />;
    }
  } else {
    return null; // Return null if description is not available
  }
};

  
// style={{ maxWidth: '50vw' }}
    return (
      <>
      
        <div className="rounded-3xl overflow-hidden relative mx-3">
          
            <Link to={`/offre/${id}`}>
            
            
                <img className="w-full object-cover" src={image} alt={titre} />
                
                
                <div className="absolute inset-0"></div>
                
                <div className="absolute inset-0 flex items-center justify-center"></div>
            </Link>

            <div className="absolute top-0 right-0 mr-2 mt-2 flex space-x-2">
			
			
                
				{!isGuide && (
				<>
       
    <Link to={`/user/${id_user}`} className="flex mr-1   mt-0.5 bg-transparent rounded-3xl px-1 py-1 kk">
        <svg
            width="17"
            height="17"
            
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1 mt-0.5 text-white bg-black rounded-3xl"
        >
            <path
                d="M0.877014 7.49988C0.877014 3.84219 3.84216 0.877045 7.49985 0.877045C11.1575 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1575 14.1227 7.49985 14.1227C3.84216 14.1227 0.877014 11.1575 0.877014 7.49988ZM7.49985 1.82704C4.36683 1.82704 1.82701 4.36686 1.82701 7.49988C1.82701 8.97196 2.38774 10.3131 3.30727 11.3213C4.19074 9.94119 5.73818 9.02499 7.50023 9.02499C9.26206 9.02499 10.8093 9.94097 11.6929 11.3208C12.6121 10.3127 13.1727 8.97172 13.1727 7.49988C13.1727 4.36686 10.6328 1.82704 7.49985 1.82704ZM10.9818 11.9787C10.2839 10.7795 8.9857 9.97499 7.50023 9.97499C6.01458 9.97499 4.71624 10.7797 4.01845 11.9791C4.97952 12.7272 6.18765 13.1727 7.49985 13.1727C8.81227 13.1727 10.0206 12.727 10.9818 11.9787ZM5.14999 6.50487C5.14999 5.207 6.20212 4.15487 7.49999 4.15487C8.79786 4.15487 9.84999 5.207 9.84999 6.50487C9.84999 7.80274 8.79786 8.85487 7.49999 8.85487C6.20212 8.85487 5.14999 7.80274 5.14999 6.50487ZM7.49999 5.10487C6.72679 5.10487 6.09999 5.73167 6.09999 6.50487C6.09999 7.27807 6.72679 7.90487 7.49999 7.90487C8.27319 7.90487 8.89999 7.27807 8.89999 6.50487C8.89999 5.73167 8.27319 5.10487 7.49999 5.10487Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
            ></path>
        </svg>
        <p className="text-sm font-bold text-black hover:text-white">{prenom} {nom}</p>
    </Link>
    


					<div className="w-9 h-9 flex items-center justify-center rounded-full bg-white point hover:bg-gray-300">

                    <button onClick={handleCartClick}>
                        {panied ? (
                            <svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 576 512"
								className="w-6 tt text-amber-700"
							>
								<path
									d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
									fill="currentColor"
								/>
							</svg>

                        ) : (
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                            className="w-6 tt"
                        >
                            <path
                                d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                            />
                        </svg>
                        )}
                        
                        
                    </button>

					</div>
			
					<div className="w-9 h-9 flex items-center justify-center rounded-full bg-white point hover:bg-gray-300">
            
                    <button onClick={handleLikeClick}>
                        {liked ? (
                            <svg width="28" height="28" viewBox="0 0 15 15" fill="none" className="text-red-600" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                className="w-6 tt"
                            >
                                <path
                                    d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
                                />
                            </svg>
                        )}
                    </button>
					</div>
          
				</>
				)}
                    {window.localStorage.getItem('ACCESS_TOKEN')==id_user && (
					<>
						<div className="w-9 h-9 flex items-center justify-center rounded-full bg-white point hover:bg-gray-300">
							<Link to={`/editOffre/${id}`}>
							<button>
								
								<svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
							</button>
							</Link>
						</div>
						
						<div className="w-9 h-9 flex items-center justify-center rounded-full bg-white point hover:bg-gray-300">
						<button onClick={handleDeleteClick}>
							
							<svg width="28" height="28" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
						</button>
						</div>
					</>
					)}
				
                
            </div>

            <div className="ml-[10px] mt-3">
                
                
                <p className="font-extrabold text-black text-center  mb-2">{titre}</p>
                <div className="flex">
                    <nav>
                        <Badge className="font-bold bg-gray-300 text-black">{prix} DH / Personne / Jour</Badge>
                    </nav>
                </div>
            </div>
        {weather && weather.weather && weather.weather.length > 0 && (
          <div className="w-9 h-9 flex items-center justify-center mt-2 ">
            {getWeatherIcon(weather.weather[0].description)}
          </div>
        )}
            {showButton && (
                <p className="mt-2 ml-4 text-sm font-semibold underline">{date}</p>
            )}
            {showButton && (
                <Button className="w-full mt-2 bg-amber-800">
                    <CheckIcon className="mr-2 h-4 w-4 " /> Voir Les Détails
                </Button>
            )}
        </div>
        </>
    );
};

export default Crd;
