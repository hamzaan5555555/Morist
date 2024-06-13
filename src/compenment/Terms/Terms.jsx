import { motion } from "framer-motion";
import logo from '../../assets/Logo1.png';

function Terms() {
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
                <h1 class="text-3xl font-bold mb-4">Termes et Conditions de Morist</h1>
                    <p class="mb-6">- Les utilisateurs doivent s'inscrire et créer un compte pour accéder à certaines fonctionnalités du site, telles que la réservation ou la recherche de offres touristiques.</p>
                    <p class="mb-6">- Les utilisateurs doivent fournir des informations précises et à jour lors de l'inscription, y compris une adresse e-mail valide et des informations personnelles.</p>
                    <p class="mb-6">- Les utilisateurs doivent utiliser le service de manière responsable et respecter les lois et réglementations locales et internationales.</p>
                    <p class="mb-6">- Les utilisateurs ne doivent pas utiliser le service à des fins illégales, frauduleuses ou trompeuses.</p>
                    <p class="mb-6">- Les utilisateurs sont responsables de maintenir la confidentialité de leur compte et de leur mot de passe, et doivent informer immédiatement Morist en cas de compromission de leur compte.</p>
            </div>
        </div>
    );
}

export default Terms;
