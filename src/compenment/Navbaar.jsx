import React, { useState } from 'react';
import '../App.css';
import {Link} from "react-router-dom";


function Navbaar() {
    return (
        <div>

            <header className="hidden md:block ">
                <nav aria-label="Global ">
                    <ul className="flex justify-center items-center gap-6 text-sm">
                        <li>
                            <Link to="/about" className="text-gray-700 transition hover:text-gray-500/75" > À propos </Link>
                        </li>

                        <li>
                            <Link to="/contact" className="text-gray-700 transition hover:text-gray-500/75" > Contact </Link>
                        </li>

                        <li>
                            <Link to="/explore" className="text-gray-700 transition hover:text-gray-500/75" > Explore </Link>
                        </li>

                        
                        <li>
                            <Link to="/panier" className="text-gray-700 transition hover:text-gray-500/75" > Mon Panier </Link>
                        </li>


                    </ul>

                </nav>

            </header>
            <hr className="mt-2"/>
        </div>
    );
}

export default Navbaar;
