import { Input } from "@/components/ui/input.jsx";
import { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import { axiosClient } from "../../api/axios.js";
import Crd from '../Crd.jsx';
//import Maroc from '../../assets/maroc.png';
import { Badge } from "@/components/ui/badge.jsx";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TypeAnimation } from "react-type-animation";

const Explore = () => {
    const [products, setProducts] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const { city } = useParams();

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
                const { data } = await axiosClient.get(`/explore/${city}?page=${page}&limit=${limit}&minprice=${minPrice}&maxprice=${maxPrice}`);
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
    }, [city, page, reload]);

    const loadMore = () => {
        setPage(prev => prev + 1);
        setReload(true);
    }


    const handlePriceSubmit = (e) => {
        e.preventDefault();
        setProducts([]);
        setPage(1);
        setMinPrice(e.target.minprix.value);
        setMaxPrice(e.target.maxprix.value);
        loadedOfferIds.current.clear(); 
        setReload(true);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'minprix') {
			if(value > 0){
				setMinPrice(value);
			}
		} else if (name === 'maxprix') {
			if(value > 0){
				setMaxPrice(value);
			}
		}
    };
//form  className="flex gap-4"
    return (
        <>
        
            <div className="mx-auto max-w-7xl sm:px-6 sm:py-24 lg:px-8">
            
            <span className="text-2xl text-slate-900 font-bold">
              Trouver Tous Les Offres Dans <span className="text-amber-700">{city}</span>  {" "}
            </span>
            <br></br>
            <Badge className=''>
            <TypeAnimation
            
              sequence={[
                "Marrakech",
                1000,
                "Tanger",
                1000,
                "CasaBlanca",
                1000,
                "Agadir",
                1000,
                "Fes",
                1000,
                "Rabat",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
            </Badge>
          
            <br/>
           
                <Badge className="font-extrabold   hover:underline w-full "></Badge>
                <br/>
            
                <div className=" text-md font-semibold mt-3 flex">
                    <p className="text-gray-700 font-semibold underline">Filter Les Offres</p>
                    <svg width="20" height="20" className="ml-1.5 mt-0.5 text-gray-400" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.60124 1.25086C8.60124 1.75459 8.26278 2.17927 7.80087 2.30989C10.1459 2.4647 12 4.41582 12 6.79999V10.25C12 11.0563 12.0329 11.7074 12.7236 12.0528C12.931 12.1565 13.0399 12.3892 12.9866 12.6149C12.9333 12.8406 12.7319 13 12.5 13H8.16144C8.36904 13.1832 8.49997 13.4513 8.49997 13.75C8.49997 14.3023 8.05226 14.75 7.49997 14.75C6.94769 14.75 6.49997 14.3023 6.49997 13.75C6.49997 13.4513 6.63091 13.1832 6.83851 13H2.49999C2.2681 13 2.06664 12.8406 2.01336 12.6149C1.96009 12.3892 2.06897 12.1565 2.27638 12.0528C2.96708 11.7074 2.99999 11.0563 2.99999 10.25V6.79999C2.99999 4.41537 4.85481 2.46396 7.20042 2.3098C6.73867 2.17908 6.40036 1.75448 6.40036 1.25086C6.40036 0.643104 6.89304 0.150421 7.5008 0.150421C8.10855 0.150421 8.60124 0.643104 8.60124 1.25086ZM7.49999 3.29999C5.56699 3.29999 3.99999 4.86699 3.99999 6.79999V10.25L4.00002 10.3009C4.0005 10.7463 4.00121 11.4084 3.69929 12H11.3007C10.9988 11.4084 10.9995 10.7463 11 10.3009L11 10.25V6.79999C11 4.86699 9.43299 3.29999 7.49999 3.29999Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                    <div className="relative ml-4">
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                                <span className="text-sm font-medium">Filtrer </span>
                                <span className="transition group-open:-rotate-180">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </span>
                            </summary>
                            <div className="z-50 group-open:absolute group-open:top-auto group-open:mt-2 ltr:group-open:start-0">
                                <div className="w-96 rounded border border-gray-200 bg-white">
                                    <header className="flex items-center justify-between p-4">
                                        <span className="text-sm text-gray-700">Entrer les valeurs</span>
                                        <button type="button" className="text-sm text-gray-900 underline underline-offset-4" onClick={() => {setMinPrice('');setMaxPrice('')}}>
                                            Réinitialiser
                                        </button>
                                    </header>
                                    <div className="border-t border-gray-200 p-4">
                                        <div className="flex justify-between gap-4">
                                            <form onSubmit={handlePriceSubmit}>
                                                <label htmlFor="FilterPricemax" className="flex items-center gap-2">
                                                    <span className="text-sm text-gray-600">DH</span>
                                                    <Input
                                                        type="number"
                                                        id="FilterPricemin"
                                                        name="minprix"
                                                        placeholder="Prix Min"
                                                        onChange={handleChange}
                                                        value={minPrice}
                                                        className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                                    />
                                                </label>
                                                <label htmlFor="FilterPricemin" className="flex items-center gap-2">
                                                    <span className="text-sm text-gray-600">DH</span>
                                                    
                                                    <Input
                                                        type="number"
                                                        id="FilterPricemax"
                                                        name="maxprix"
                                                        placeholder="Prix Max"
                                                        onChange={handleChange}
                                                        value={maxPrice}
                                                        className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                                    />
                                                </label>
                                                <button type="submit" className="hidden">Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </details>
                    </div>
                </div>
               
            </div>
            
            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 ">
                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {products.map((product, index) => (
                            <AnimatedCard key={product.id} index={index}>
                                <Crd {...product} />
                            </AnimatedCard>
                        ))}
                    </div>
                    <div className="flex justify-center mt-4">
                        <button 
                            className="px-4 py-2 bg-black text-white rounded-3xl text-sm font-semibold" 
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

export default Explore;
