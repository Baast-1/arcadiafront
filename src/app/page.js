'use client';

import Link from 'next/link';
import { useState } from "react";
import axios from "axios";
import { Button2 } from "@/components/Buttons";

export default function Home() {
    const [formData, setFormData] = useState({
        pseudo: '',
        message: '',
    });
    const [message, setMessage] = useState('');
    const [charCount, setCharCount] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            pseudo: formData.pseudo,
            message: formData.message,
        };
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}avis`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('API response:', response.data);
            setMessage('Votre avis a bien été envoyé pour validation');
        } catch (error) {
            console.error('Erreur lors de la création de l\'avis:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'message') {
            setCharCount(value.length);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="w-full max-w-md p-8 space-y-6">
                <h2 className="text-2xl font-bold text-center">Arcadia</h2>
                <Link href={"/admin"}>Se connecter</Link>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8 h-full">
                <div className="grid grid-cols-2 gap-8 w-full h-full">
                    <div className="flex flex-col justify-center items-start gap-2">
                        <div className="wrapper">
                            <div className="relative">
                                <input
                                    type="text"
                                    name="pseudo"
                                    placeholder=" "
                                    value={formData.pseudo}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 mt-1 border-2 rounded-full shadow-sm focus:outline-none border-custom-2"
                                />
                                <span className="input-placeholder">Pseudo</span>
                            </div>
                        </div>
                        <div className="wrapper" style={{ width: '100%' }}>
                            <div className="relative">
                                <textarea
                                    type="text"
                                    name="message"
                                    placeholder=" "
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    maxLength="100"
                                    className="w-full px-3 py-2 mt-1 border-2 rounded-lg shadow-sm focus:outline-none border-custom-2"
                                />
                                <span className="input-placeholder">Avis</span>
                            </div>
                            <div className="text-right text-gray-500">
                                {charCount}/100
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <Button2
                        type="submit"
                        texte="Enregistrer"
                    />
                </div>
            </form>
        </div>
    );
}