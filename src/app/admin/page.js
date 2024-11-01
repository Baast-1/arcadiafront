'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login, verifyToken } from '@/utils/auth';
import { Button1 } from '@/components/Buttons';

const Login = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: '' });

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    await verifyToken(token);
                    router.push('/admin/dashboard');
                } catch (err) {
                    console.error('Token verification failed:', err.message);
                }
            }
        };
        checkAuth();
    }, [router]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData.email, formData.password);
            if (response?.token) {
                localStorage.setItem('token', response.token);
                router.push('/admin/dashboard');
            } else {
                console.error('Erreur de connexion : token manquant');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
                <h1 className="text-2xl text-custom-2 font-bold text-center">Connexion</h1>
                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
                    <div className="wrapper">
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder=" "
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 mt-1 border-2 rounded-full shadow-sm focus:outline-none border-custom-1"
                            />
                            <span className="input-placeholder">Email</span>
                        </div>
                    </div>
                    <div className="wrapper">
                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder=" "
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 mt-1 border-2 rounded-full shadow-sm focus:outline-none border-custom-1"
                            />
                            <span className="input-placeholder">Mot de passe</span>
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <Button1 
                            type="submit"
                            texte="Se connecter" 
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
