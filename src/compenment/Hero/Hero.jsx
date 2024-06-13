import React, { useState, useEffect } from 'react';
import Cardee from "@/compenment/Card/Card.jsx";
import Office from "@/compenment/Office/Office.jsx";
import Ville from "@/compenment/Ville/Ville.jsx";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { motion, useScroll } from "framer-motion";
import slide1 from '../../assets/slide.jpg';
import slide2 from '../../assets/slide22.jpg';
//import slide3 from '../../assets/slide3.jpg';
import slide4 from '../../assets/slide42.jpg';
import slide5 from '../../assets/slide52.jpg';
import './Hero.css';

const Hero = () => {
    const { scrollYProgress } = useScroll();
	
    const slidesoriginal = [slide1, slide2, slide5, slide4];

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };
    const slides = shuffleArray(slidesoriginal);
	
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
        }, 3000); // Change slide every 3 seconds (adjust as needed)

        return () => clearInterval(interval); // Clear interval on component unmount
    }, []); // Run only on component mount and unmount

    const nextSlide = () => {
        setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
    };

    const previousSlide = () => {
        setCurrentSlide(prevSlide => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
    };

    return (
        <>
            <motion.div
                style={{
                    scaleX: scrollYProgress,
                    position: "fixed",
                    top: 0,
					zIndex: 99,
                    right: 0,
                    left: 0,
                    height: 6, // Hauteur de votre barre de défilement
                    background: `linear-gradient(to right, #e4a461, #965108)`,
                    transformOrigin: "0%"
                }}>
            </motion.div>
            <div className="mt-10">
                <div className="container">
                    <Carousel>
                        <CarouselContent>
                            {slides.map((slide, index) => (
                                <CarouselItem key={index} style={{ display: index === currentSlide ? 'block' : 'none' }}>
                                    <div className="image-container">
                                        <img src={slide} alt={`Slide ${index + 1}`} />
                                        <div className="text-overlay"></div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="ml-3" onClick={previousSlide} />
                        <CarouselNext className="mr-7" onClick={nextSlide} />
                    </Carousel>
                </div>
                {/* Utiliser les classes Tailwind pour masquer Ville sur les petits écrans */}
                <div className="hidden md:block">
                    <Ville />
                </div>
                <Office />
                <Cardee />
            </div>
        </>
    );
};

export default Hero;
