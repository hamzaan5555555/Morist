import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button.jsx";
import { Link, useParams } from "react-router-dom";
import { axiosClient } from "../../api/axios.js";
import Card from '../Crd.jsx';
import { motion } from "framer-motion";
import './Offre.css';

const Offre = () => {
    const [products, setProducts] = useState({});
	const [isTourist, setIsTourist] = useState(false);
    const { id } = useParams();

    useEffect(() => {
		axiosClient.get('/Offre/' + id).then(({ data }) => {
			setProducts(data);
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

  useEffect(() => {
    const accountType = window.localStorage.getItem('TYPE_COMPTE');
    if (accountType === 'Tourist') {
      setIsTourist(true);
    }
	
  }, []);

    return (
        <div className="container mx-auto p-4">
            <motion.div
                initial={{ x: '-100vw' }}
                animate={{ x: 0 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 120 }}
                className="w-full lg:w-[590px] mx-auto text-center mt-10"
            >
                <Card {...products} showButton={false} />
            </motion.div>

            <motion.div
                initial={{ x: '-100vw' }}
                animate={{ x: 0 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 120 }}
                className="text-center mt-8"
            >
                <Badge className="bg-amber-700 hover:bg-amber-700 ">Description de l'offre :</Badge>
            </motion.div>

            <motion.div
                initial={{ x: '-100vw' }}
                animate={{ x: 0 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 120 }}
                className="text-center mt-5"
            >
                {products.description && (
                    <h2 className="font-semibold text-sm mt-3">{products.description}</h2>
                )}
            </motion.div>

            <motion.div
                initial={{ x: '-100vw' }}
                animate={{ x: 0 }}
                transition={{ delay: 2, type: 'spring', stiffness: 120 }}
                className="text-center mt-[92px]"
            >
            {isTourist && (
				<Link to={`/reserveOffre/${id}`}>
                    <Button className=" bg-amber-700 font-semibold">
                        Reserver Maintenant
                        <svg width="16" height="16" className="ml-3" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.20308 1.04312C1.00481 0.954998 0.772341 1.0048 0.627577 1.16641C0.482813 1.32802 0.458794 1.56455 0.568117 1.75196L3.92115 7.50002L0.568117 13.2481C0.458794 13.4355 0.482813 13.672 0.627577 13.8336C0.772341 13.9952 1.00481 14.045 1.20308 13.9569L14.7031 7.95693C14.8836 7.87668 15 7.69762 15 7.50002C15 7.30243 14.8836 7.12337 14.7031 7.04312L1.20308 1.04312ZM4.84553 7.10002L2.21234 2.586L13.2689 7.50002L2.21234 12.414L4.84552 7.90002H9C9.22092 7.90002 9.4 7.72094 9.4 7.50002C9.4 7.27911 9.22092 7.10002 9 7.10002H4.84553Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                    </Button>
                </Link>
			)}
            </motion.div>
        </div>
    );
};

export default Offre;
