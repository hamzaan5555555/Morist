import { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { axiosClient } from "../../api/axios.js";
import Cardi from '../Crd.jsx';

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ButtonLoading } from './ButtonLoading.jsx';
import { Button } from "@/components/ui/button.jsx";
import Logo from '../../assets/logo.png';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import Weather from '../Weather/Weather';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const Cardee = () => {
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
                const { data } = await axiosClient.get(`/explore/undefined?page=${page}&limit=${limit}`);
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

        if (reload) {
            loadProducts();
            setReload(false);
        }
    }, [page, reload]);

    const loadMore = () => {
        setPage(prev => prev + 1);
        setReload(true);
    }
/*
<CardHeader>
                        <CardTitle className="text-white">Morist</CardTitle><br />
                        <CardDescription className="text-gray-100 font-bold">Voir La Météo D'aujourd'hui<br /> accessible à tous.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4 mb-2">
                                <div className="">
                                <Sheet>
  <SheetTrigger className='rounded-3xl font-semibold px-6 py-2 bg-white'>Afficher</SheetTrigger>
  <SheetContent className="w-[400px] sm:w-[540px]">
    <SheetHeader>
        <img src={Logo} alt='logo' className='' />
      <SheetTitle>Voir La Météo D'aujourd'hui </SheetTitle>
      <SheetDescription>


        <Weather/>
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>

                                </div>
                            </div>
                        </form>
                    </CardContent>
*/



/*
<CardHeader>
                        <CardTitle className="text-white">Morist</CardTitle><br />
                        <CardDescription className="text-white font-semibold">Explore les Villes<br /> accessible à tous.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4 mb-2">
                                <div className="">
                                    <Button className="bg-white rounded-3xl text-black hover:bg-gray-200">
                                        <Link to={'/Explore'}>Decouvrer</Link>
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
*/
    return (
        <div className="flex flex-col lg:flex-row mt-3">
            <div className="w-full lg:w-2/3 p-4">
                <div className="ml-5">
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {products.map((product) => (
                            <div key={product.id} className="flex-shrink-0">
                                <Cardi {...product} />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-4">
                        {loading ? (
                            <ButtonLoading />
                        ) : (
                            <button
                                className="px-4 py-2 bg-black text-white rounded-3xl text-sm font-semibold flex items-center space-x-2"
                                onClick={loadMore}
                            >
                                Charger plus
                                <svg width="15" height="15" viewBox="0 0 15 15" className='ml-1 mt-1' fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.85355 2.14645C3.65829 1.95118 3.34171 1.95118 3.14645 2.14645C2.95118 2.34171 2.95118 2.65829 3.14645 2.85355L7.14645 6.85355C7.34171 7.04882 7.65829 7.04882 7.85355 6.85355L11.8536 2.85355C12.0488 2.65829 12.0488 2.34171 11.8536 2.14645C11.6583 1.95118 11.3417 1.95118 11.1464 2.14645L7.5 5.79289L3.85355 2.14645ZM3.85355 8.14645C3.65829 7.95118 3.34171 7.95118 3.14645 8.14645C2.95118 8.34171 2.95118 8.65829 3.14645 8.85355L7.14645 12.8536C7.34171 13.0488 7.65829 13.0488 7.85355 12.8536L11.8536 8.85355C12.0488 8.65829 12.0488 8.34171 11.8536 8.14645C11.6583 7.95118 11.3417 7.95118 11.1464 8.14645L7.5 11.7929L3.85355 8.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-1/3 bg-white p-4">
                <Card className="w-full lg:w-[300px] ml-0 lg:ml-10 mt-5 rounded-3xl bg-black px-2 py-3" style={{ backgroundImage: "url('/src/assets/marrakech.jpg')" }}>
                    <CardHeader>
                        <CardTitle className="text-white">Morist</CardTitle><br />
                        <CardDescription className="text-white font-semibold">Explore les Villes<br /> accessible à tous.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4 mb-2">
                                <div className="">
                                    <Button className="bg-white rounded-3xl text-black hover:bg-gray-200">
                                        <Link to={'/Explore'}>Decouvrer</Link>
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between"></CardFooter>
                </Card>
                <br />
                <Card className="w-full lg:w-[390px] ml-0 lg:ml-2 mt-5 bg-gray-100 px-2 py-1">
                    <CardHeader>
                        <CardTitle className="text-black font-bold">Connaître les conditions d'utilisation de Morist </CardTitle><br /><br />
                        <CardDescription className="text-gray-700 text-sm">Morist est une plateforme gratuite : elle propose des offres personnalisées de voyage.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full gap-4">
                                <div className="">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="w-full lg:w-auto ml-0 lg:ml-[107px] mt-3 rounded-3xl bg-black">Savoir Plus</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle className="text-3xl font-bold">Condition d'utilisation :</DialogTitle><br /><br />
                                                <DialogDescription>
                                                    <ul>
                                                        <li>- Les utilisateurs doivent s'inscrire et créer un compte pour accéder à certaines fonctionnalités du site, telles que la réservation ou la recherche de offres touristiques.</li>
                                                        <li>- Les utilisateurs doivent fournir des informations précises et à jour lors de l'inscription, y compris une adresse e-mail valide et des informations personnelles.</li>
                                                        <li>- Les utilisateurs doivent utiliser le service de manière responsable et respecter les lois et réglementations locales et internationales.</li>
                                                        <li>- Les utilisateurs ne doivent pas utiliser le service à des fins illégales, frauduleuses ou trompeuses.</li>
                                                        <li>- Les utilisateurs sont responsables de maintenir la confidentialité de leur compte et de leur mot de passe, et doivent informer immédiatement Morist en cas de compromission de leur compte.</li>
                                                    </ul>
                                                </DialogDescription>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between"></CardFooter>
                </Card>
                <br />
                <Card className="w-full lg:w-[300px] ml-0 lg:ml-10 mt-5 rounded-3xl bg-black px-2 py-3" style={{ backgroundImage: "url('/src/assets/tanger.jpeg')" }}>
                    <CardHeader>
                        <CardTitle className="text-white">Morist</CardTitle><br />
                        <div className="text-gray-100 font-bold">Voir La Météo D'aujourd'hui<br /> accessible à tous.</div>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4 mb-2">
                                <div className="">
                                <Sheet>
								  <SheetTrigger className='rounded-3xl font-semibold px-6 py-2 bg-white'>Afficher</SheetTrigger>
								  <SheetContent className="w-[400px] sm:w-[540px]">
									<SheetHeader>
										<img src={Logo} alt='logo' className='' />
									  <SheetTitle>Voir La Météo D'aujourd'hui </SheetTitle>


										<Weather/>
									</SheetHeader>
								  </SheetContent>
								</Sheet>

                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between"></CardFooter>
                </Card><br />
            </div>
        </div>
    );
};


export default Cardee;
