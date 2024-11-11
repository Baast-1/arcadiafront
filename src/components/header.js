"use client";
import Link from 'next/link';
import { useState } from "react";
import axios from "axios";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <header className='fixed hidden lg:flex top-0 left-0 z-10 w-full justify-between items-center mt-8 px-20'>
                <div>
                    <img
                        src='/logo.webp'
                        className="w-24 rounded-full object-cover"
                        alt="Logo"
                    />
                </div>
                <nav className='bg-white flex items-center justify-around gap-16 rounded-2xl py-8 px-14'>
                    <div>
                        <Link href="/">Accueil</Link>
                    </div>
                    <div>
                        <Link href="/nos-services">Services</Link>
                    </div>
                    <div>
                        <Link href="/nos-habitats">Nos habitats</Link>
                    </div>
                    <div>
                        <Link href="/contact">Contact</Link>
                    </div>
                </nav>
                <div>
                    <Link href="/admin">
                        <button  className="py-4 px-6  bg-white text-custom-1 rounded-full cursor-pointer font-semibold text-sm hover:shadow-2xl hover:scale-105 hover:duration-200">Connexion</button>
                    </Link>
                </div>
            </header>

            <header className="fixed flex lg:hidden top-0 left-0 z-10 w-full bg-white px-8 py-4 items-center justify-between">
                <div>
                    <img
                        src='/logo.webp'
                        className="w-16 rounded-full object-cover"
                        alt="Logo"
                    />
                </div>

                <button onClick={toggleMenu} className="focus:outline-none">
                    <div className="w-6 h-1 bg-black mb-1"></div>
                    <div className="w-6 h-1 bg-black mb-1"></div>
                    <div className="w-6 h-1 bg-black"></div>
                </button>

                {isMenuOpen && (
                    <nav className='fixed inset-0 bg-white flex flex-col items-center justify-center space-y-8 z-20'>
                        <button onClick={toggleMenu} className="absolute top-8 right-8 text-3xl">
                            &times;
                        </button>
                        <div>
                            <Link href="/" onClick={toggleMenu}>Accueil</Link>
                        </div>
                        <div>
                            <Link href="/nos-services" onClick={toggleMenu}>Services</Link>
                        </div>
                        <div>
                            <Link href="/nos-habitats" onClick={toggleMenu}>Nos habitats</Link>
                        </div>
                        <div>
                            <Link href="/contact" onClick={toggleMenu}>Contact</Link>
                        </div>
                    </nav>
                )}
            </header>
        </>
    );
}