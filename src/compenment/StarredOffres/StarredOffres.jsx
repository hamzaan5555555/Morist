import React from 'react';
import Carousel from "react-multi-carousel";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useEffect, useState, useRef } from "react";
import { axiosClient } from "../../api/axios.js";
import Crd from '../Crd.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import "react-multi-carousel/lib/styles.css";

const StarredOffres = () => {
  const [products, setProducts] = useState([]);

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
        const { data } = await axiosClient.get(`/Star/?page=${page}&limit=${limit}`);
        const dataArray = Object.values(data);

        const newOffers = dataArray.filter(offer => !loadedOfferIds.current.has(offer.id));

        newOffers.forEach(offer => loadedOfferIds.current.add(offer.id));

        setProducts(prevProducts => [...prevProducts, ...newOffers]);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.errors);
        }
        console.error('Error loading products:', error);
      } finally {
        setLoading(false); 
      }
    };

    if (reload === true) {
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
        <div className="flex items-center">
          <Badge className="bg-gray-100 font-bold hover:text-white text-black">Offres favorites
          <svg width="19" height="19" className='ml-2 mt-1 text-yellow-500' viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z" fill="currentColor"></path>
          </svg>
          </Badge>
        </div>
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
              className="px-4 py-2 bg-black text-white rounded-3xl"
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

export default StarredOffres;
