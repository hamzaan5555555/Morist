"use client"
import React from 'react';
import Carousel from "react-multi-carousel";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useEffect, useState, useRef } from "react";
import { SlBasketLoaded } from "react-icons/sl";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Badge } from '@/components/ui/badge.jsx';
import {axiosClient} from "../../api/axios.js";


import Crd from '../Crd.jsx'


import "react-multi-carousel/lib/styles.css";


const Panier = () => {
  const [products, setProducts] = useState([])


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
                const { data } = await axiosClient.get(`/panier/?page=${page}&limit=${limit}`);
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
    }, [page, reload]);

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
            <div className="mx-auto max-w-7xl sm:px-6 sm:py-24 lg:px-8">
            <Badge className="bg-gray-100 font-bold hover:text-white text-black">Mon Panier
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" className='ml-2 mt-1 ' viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
          </Badge>                {/* <div className="flex relative shadow-2xl rounded-full px-12 py-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/20 bg-slate-50">
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

export default Panier;