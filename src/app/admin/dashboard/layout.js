'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/utils/auth';
import { Button5 } from '@/components/Buttons';

export default function DashboardLayout({ children }) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) router.replace('/admin');
    }, [router]);

    const handleLogout = () => logout(router);

    return (
        <div className="flex items-center h-screen justify-center gap-10">
            <div className="flex flex-col justify-start items-center px-4 py-8 bg-gradient w-1/6 h-5/6 rounded-xl shadow-lg gap-2">
                <img
                    src='/logo.webp'
                    className="w-24 object-cover rounded-full mb-4"
                    alt="Logo"
                />
                <div>
                    <button 
                            className="flex items-center font-normal mb-6 gap-2 text-custom-4 hover:scale-105 hover:duration-200"
                            onClick={() => router.push('/admin/dashboard')}
                        >
                        <img
                            src='/dashboard.svg'
                            className="w-6 object-cover"
                            alt="Logo"
                        />
                            Tableau de bord
                    </button>
                    <button 
                            className="flex items-center font-normal mb-6 gap-2 text-custom-4 hover:scale-105 hover:duration-200"
                            onClick={() => router.push('/admin/dashboard/utilisateurs')}
                        >
                        <img
                            src='/users.svg'
                            className="w-6 object-cover"
                            alt="Logo"
                        />
                            Utilisateurs
                    </button>
                </div>
                <div className='mt-auto'>
                    <Button5
                        texte={"Déconnexion"}
                        onClick={handleLogout}
                    >
                    </Button5>
                </div>
            </div>
            <div className="flex flex-col px-8 py-8 h-5/6 bg-custom-4 w-9/12 shadow-xl rounded-lg gap-2">{children}</div>
        </div>
    );
}
