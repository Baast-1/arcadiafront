'use client';

import Link from 'next/link';
import { useState, useEffect } from "react";
import axios from "axios";
import { Button1, Button2 } from "@/components/Buttons";
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function Contact() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ title: '', email: '', description: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}contact`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('API response:', response.data);
            setMessage('Votre email a bien été envoyé');
        } catch (error) {
            console.error('Erreur lors de la création de l\'avis:', error);
            setMessage('Une erreur est survenue lors de l\'envoi de votre email');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient">
            <Header />
            {/* Desktop Contact */}
            <div class="hidden lg:flex flex-col justify-center items-center w-full flex-grow">
                <form onSubmit={handleSubmit} className="mt-40 w-2/6">
                    <div className="flex flex-col justify-center items-start gap-2 w-full">
                        <label className="text-white mt-4" htmlFor="title">Titre</label>
                        <input
                            type="text"
                            name="title"
                            placeholder=" "
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full bg-white px-3 py-2 rounded-full shadow-sm focus:outline-none"
                        />
                        <label className="text-white mt-4" htmlFor="email">Votre email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder=" "
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-white px-3 py-2 rounded-full shadow-sm focus:outline-none"
                        />
                        <label className="text-white mt-4" htmlFor="description">Votre message</label>
                        <textarea
                            name="description"
                            placeholder=" "
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full bg-white px-3 py-2 mt-1 rounded-lg shadow-sm focus:outline-none"
                        />
                    </div>
                    <div className="flex justify-center mt-8 mb-32">
                        <Button2
                            type="submit"
                            texte="Envoyer"
                        />
                    </div>
                </form>
                {message && <p className="text-white mt-4">{message}</p>}
            </div>

            {/* Mobile Contact */}
            <div class="lg:hidden flex flex-col justify-center items-center w-full flex-grow">
                <form onSubmit={handleSubmit} className="mt-16 w-11/12">
                    <div className="flex flex-col justify-center items-start gap-2 w-full">
                        <label className="text-white mt-4" htmlFor="title">Titre</label>
                        <input
                            type="text"
                            name="title"
                            placeholder=" "
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full bg-white px-3 py-2 rounded-full shadow-sm focus:outline-none"
                        />
                        <label className="text-white mt-4" htmlFor="email">Votre email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder=" "
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-white px-3 py-2 rounded-full shadow-sm focus:outline-none"
                        />
                        <label className="text-white mt-4" htmlFor="description">Votre message</label>
                        <textarea
                            name="description"
                            placeholder=" "
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full bg-white px-3 py-2 mt-1 rounded-lg shadow-sm focus:outline-none"
                        />
                    </div>
                    <div className="flex justify-center mt-8 mb-16">
                        <Button2
                            type="submit"
                            texte="Envoyer"
                        />
                    </div>
                </form>
                {message && <p className="text-white mt-4">{message}</p>}
            </div>
            <Footer />
        </div>
    );
}