import React, { useState } from 'react';
import { Button } from "@/components/ui/button.jsx";
import { Link } from "react-router-dom";
import './Navbar.css';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Navbaar from '../Navbaar.jsx';
import LogoSearch from '../LogoSearch.jsx';

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
//
                                                    /*<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  viewBox="0 0 512 512" className='ml-2'>
                                                        <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/>
                                                    </svg>*/
    return (
        <>
            <Navbaar />

            <header className="bg-white dark:bg-gray-900">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <LogoSearch />

                        <div className="flex items-center gap-3">
                            <div className="sm:flex sm:gap-3">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline">
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                                className="text-amber-950"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z"
                                                    fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                            </svg>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <Link to={'/login'} >
                                            <DropdownMenuItem >
                                                <span className="flex items-center">
                                                    Se connecter
                                                </span>
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link to={"/register"} >
                                            <DropdownMenuItem>
                                                <span 
                                                >Registre</span>
                                            </DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="block sm:hidden">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button
                                            className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                                            onClick={handleMobileMenuToggle}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                            </svg>
                                        </button>
                                    </DropdownMenuTrigger>
                                    {isMobileMenuOpen && (
                                        <DropdownMenuContent className="w-48">
                                            <DropdownMenuLabel>Menu</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <Link to={'/about'} >
                                                <DropdownMenuItem>
                                                    <span>À propos</span>
                                                </DropdownMenuItem>
                                            </Link>
                                            <Link to={"/contact"} >
                                                <DropdownMenuItem>
                                                    <span>Contact</span>
                                                </DropdownMenuItem>
                                            </Link>
                                            <Link to={"/explore"} >
                                                <DropdownMenuItem>
                                                    <span>Explore</span>
                                                </DropdownMenuItem>
                                            </Link>
                                            <Link to={"/panier"} >
                                                <DropdownMenuItem>
                                                    <span>Mon Panier</span>
                                                </DropdownMenuItem>
                                            </Link>
                                        </DropdownMenuContent>
                                    )}
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Navbar;
