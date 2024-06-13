import React, { useState } from 'react';
import logo from '../../assets/Logo1.png';

function Contact() {
    const [faqs, setFaqs] = useState([
        {
            question: "Qu'est-ce que Morist ?",
            answer: "Morist est une plateforme innovante au Maroc visant à faciliter la connexion entre les guides touristiques et les visiteurs. Morist permet aux guides de proposer des offres de voyage clés en main, incluant la destination et le prix, afin de simplifier et d'enrichir l'expérience touristique dans le pays.",
            open: false
        },
        {
            question: "Comment puis-je m'inscrire en tant que guide touristique ?",
            answer: "Pour vous inscrire en tant que guide touristique sur Morist, visitez notre page d'inscription, remplissez le formulaire requis et soumettez votre demande. Un membre de notre équipe vous contactera pour finaliser le processus.",
            open: false
        },
        {
            question: "Comment réserver un voyage sur Morist ?",
            answer: "Pour réserver un voyage sur Morist, parcourez les offres disponibles, sélectionnez celle qui vous intéresse, et suivez les instructions pour compléter votre réservation en ligne.",
            open: false
        }
    ]);

    const toggleFAQ = index => {
        setFaqs(faqs.map((faq, i) => {
            if (i === index) {
                faq.open = !faq.open;
            } else {
                faq.open = false;
            }

            return faq;
        }));
    };

    return (
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="">
                <img src={logo} alt="logo" className="ml-[560px] w-12" />
            </div>
            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-5">FAQs</h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b pb-4">
                            <button className="text-left w-full flex justify-between items-center text-lg font-medium text-gray-900" onClick={() => toggleFAQ(index)}>
                                {faq.question}
                                <span>{faq.open ? '-' : '+'}</span>
                            </button>
                            <div className={`mt-2 text-gray-700 ${faq.open ? 'block' : 'hidden'}`}>
                                {faq.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Contact;
