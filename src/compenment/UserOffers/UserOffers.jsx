"use client"
import React from 'react';
import Carousel from "react-multi-carousel";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {Link} from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {axiosClient} from "../../api/axios.js";
import { useParams } from 'react-router-dom';
import Crd from '../Crd.jsx'

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";


import "react-multi-carousel/lib/styles.css";



const UserOffers = () => {
  //const image = '/logo.png';
  const [products, setProducts] = useState([])
  
        
  const { user } = useParams();
  const link = user ? `/Offre/u/${user}` : '/Offre';
		



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
    }, [user, page, reload]);

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
                <div className="font-extrabold text-2xl hover:underline">Les Offres d'utilisateur  {user}</div>
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
                            className="px-4 py-2 bg-gray-200 rounded" 
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

export default UserOffers;
