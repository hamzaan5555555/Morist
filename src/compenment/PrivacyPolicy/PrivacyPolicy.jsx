import { motion } from "framer-motion";
import logo from '../../assets/Logo1.png';

function PrivacyPolicy() {
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
                <h1 class="text-3xl font-bold mb-4">Politique de confidentialité de Morist</h1>
        <p class="mb-6">Chez Morist, nous accordons une grande importance à la confidentialité de nos utilisateurs. Cette politique de confidentialité vise à vous informer sur la manière dont nous collectons, utilisons et protégeons vos données personnelles lorsque vous utilisez notre plateforme.</p>
        
        <h2 class="text-2xl font-bold mb-2">Collecte de données :</h2>
        <p class="mb-6">Nous collectons des informations personnelles telles que votre nom, votre adresse e-mail et votre numéro de téléphone lorsque vous vous inscrivez sur Morist en tant que guide touristique ou visiteur. De plus, des données de localisation peuvent être collectées lorsque vous utilisez notre application mobile.</p>

        <h2 class="text-2xl font-bold mb-2">Utilisation des données :</h2>
        <p class="mb-6">Les informations que nous collectons sont utilisées pour faciliter la connexion entre les guides touristiques et les visiteurs, ainsi que pour personnaliser et améliorer votre expérience sur Morist. Nous pouvons également utiliser vos informations pour vous envoyer des communications marketing liées à nos services.</p>

        <h2 class="text-2xl font-bold mb-2">Protection des données :</h2>
        <p class="mb-6">Nous prenons des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre la perte, le vol et l'accès non autorisé. Vos informations sont stockées de manière sécurisée sur nos serveurs.</p>

        <h2 class="text-2xl font-bold mb-2">Partage de données :</h2>
        <p class="mb-6">Nous ne partageons vos données personnelles qu'avec des tiers dans le but de fournir nos services, tels que le traitement des paiements ou la gestion des réservations de voyage. Nous ne vendons ni ne louons vos informations à des tiers à des fins de marketing.</p>

        <h2 class="text-2xl font-bold mb-2">Cookies :</h2>
        <p class="mb-6">Morist utilise des cookies pour améliorer la fonctionnalité de notre site Web et de notre application mobile, ainsi que pour analyser la manière dont les utilisateurs interagissent avec notre plateforme.</p>

        <h2 class="text-2xl font-bold mb-2">Modifications de la politique de confidentialité :</h2>
        <p class="mb-6">Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les changements seront publiés sur cette page, et nous vous encourageons à consulter régulièrement cette politique pour rester informé de nos pratiques en matière de confidentialité.</p>

        <p class="mb-6">En utilisant Morist, vous consentez à la collecte et à l'utilisation de vos données personnelles conformément à cette politique de confidentialité.</p>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
