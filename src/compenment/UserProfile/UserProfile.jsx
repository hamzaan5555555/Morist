import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosClient } from "../../api/axios.js";
import Crd from '../Crd.jsx';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import "react-multi-carousel/lib/styles.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const { id } = useParams();
  const link0 = id ? `/user/${id}` : '/user';

  useEffect(() => {
    axiosClient.get(link0)
      .then(({ data }) => {
        setUser(data);
        console.log(data);
      })
      .catch(error => {
        if (error.response) {
          alert(error.response.data.errors);
          if (error.response.status === 401) {
            //navigate('/logout')
          }
        }
      });
  }, [id]);
  
  
  
  
  
  
  
  
 
  const [products, setProducts] = useState([])
  
        
  const link = id ? `/Offre/u/${id}` : '/Offre';
		



    const loadedOfferIds = useRef(new Set()); 
    const [page, setPage] = useState(1);
    const limit = 10;
    const [loading, setLoading] = useState(false); 

    const [reload, setReload] = useState(true);
	
    useEffect(() => {
        const loadProducts = async () => {
            if (loading) return;

            setLoading(true); 
            try {
                const { data } = await axiosClient.get(`${link}?page=${page}&limit=${limit}`);
                const dataArray = Object.values(data);

                const newOffers = dataArray.filter(offer => !loadedOfferIds.current.has(offer.id));

                newOffers.forEach(offer => loadedOfferIds.current.add(offer.id));

                setProducts(prevProducts => [...prevProducts, ...newOffers]);
            } catch (error) {
				if (error.response) {
					alert(error.response.data.errors)
				
				}
                console.error('Error loading products:', error);
            } finally {
                setLoading(false); 
            }
        };

		if(reload===true){
			loadProducts();
			setReload(false);
		}
    }, [id, page, reload]);

    const loadMore = () => {
        setPage(prev => prev + 1);
        setReload(true);
    }


    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 2000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

  return (
        <>
    <div className="p-4 mt-6">
      <div className="bg-slate-300 dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 ">
          
          <h3 className="leading-6 text-2xl font-extrabold underline text-gray-900 dark:text-white">Profile d'utilisateur {user.prenom} {user.nom}</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Affichage des informations</p>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700">
          <dl>
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">ID</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2">{user.id}</dd>
            </div>
            <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Prenom</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2">{user.prenom}</dd>
            </div>
            <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Nom</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2">{user.nom}</dd>
            </div>
            <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
			  <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">E-mail</dt>
			  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2">{user.email}</dd>
			</div>
			<div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
			  <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Language</dt>
			  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2">{user.languages}</dd>
			</div>
			<div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
			  <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Nationalite</dt>
			  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2">{user.nationalite}</dd>
			</div>
			<div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
			  <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Type de compte</dt>
			  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2">{user.type_compte}</dd>
			</div>
			<div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
			  <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Date de création</dt>
			  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2">{user.created_at}</dd>
			</div>

          </dl>
        </div>
      </div>
    </div>
	
	
	
            <div className="mx-auto max-w-7xl sm:px-6 sm:py-24 lg:px-8">
                <div className="font-extrabold text-2xl hover:underline">Les Offres d'utilisateur  {user.prenom} {user.nom}</div>
                {/* <div className="flex relative shadow-2xl rounded-full px-12 py-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/20 bg-slate-50">
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl">
                        Vous trouver tous les offres dans les differents villes du
                        <span className="text-red-600"> Maroc</span>
                    </h1>
                    <img src={Maroc} alt="logo" className="w-12 ml-2" />
                </div> */}
                
            </div>
            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {products.map((product, index) => (
                            <AnimatedCard key={product.id} index={index}>
                                <Crd {...product} />
                            </AnimatedCard>
                        ))}
                    </div>
                    <div className="flex justify-center mt-4">
                        <button 
                            className="px-4 py-2 font-semibold bg-black text-white rounded-3xl" 
                            onClick={loadMore}
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? 'Veuillez patienter...' : 'Charger plus'}
                            
                        </button>
                    </div>
					
                </div>
            </section>
        </>
  );
  
  
};
  
	
	
	
 

const AnimatedCard = ({ children, index }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            controls.start({
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: index * 0.1 },
            });
        }
    }, [controls, inView, index]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
        >
            {children}
        </motion.div>
    );
}; 

export default UserProfile;
