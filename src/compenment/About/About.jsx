import { motion } from "framer-motion";
import logo from '../../assets/Logo1.png';

function Contact() {
    return (
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="flex justify-center">
                <motion.img
                    src={logo}
                    alt="logo"
                    className="w-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 5 }}
                    transition={{ delay: 0.1, duration: 1 }}
                />
            </div>
            <div className='mt-12'>
                <h1 className='text-gray-700 font-semibold'>
                    Morist est une plateforme innovante au Maroc visant à faciliter la connexion entre les guides touristiques et les visiteurs. Morist permet aux guides de proposer des offres de voyage clés en main, incluant la destination et le prix, afin de simplifier et d'enrichir l'expérience touristique dans le pays.
                </h1>
            </div>
        </div>
    );
}

export default Contact;
