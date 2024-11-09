"use client";
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full bg-white mt-8 py-8 flex flex-col lg:flex-row justify-around items-center">
            <div className="mb-4 lg:mb-0">
                <img
                    src='/logo.webp'
                    className="w-24 rounded-full object-cover"
                    alt="Logo"
                />
            </div>
            <nav className="hidden lg:flex flex-col lg:flex-row gap-4 lg:gap-8 mb-4 lg:mb-0">
                <div>
                    <Link href="/">Accueil</Link>
                </div>
                <div>
                    <Link href="/services">Services</Link>
                </div>
                <div>
                    <Link href="/about">A propos</Link>
                </div>
                <div>
                    <Link href="/contact">Contact</Link>
                </div>
            </nav>
            <div className="hidden lg:block text-center">
                <p>Retrouvez-nous sur nos différents réseaux sociaux</p>
            </div>
        </footer>
    );
}