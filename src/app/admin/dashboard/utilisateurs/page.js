'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Table } from '@/components/Tables';
import { Button1, Button2 } from '@/components/Buttons';

export default function UtilisateursList({ params }) {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { slug } = params;

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const data = await response.json();
            console.log(data);
            setUsers(data);
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs', error);
            setUsers([]);
            setLoading(false);
        }
    };

    const handleRowClick = (userFake) => {
    const user = users.find(user => user.id === userFake.id);
        router.push(`/admin/dashboard/utilisateurs/${user.id}`);
    };

    const filtered = Array.isArray(users)
    ? users.filter(user => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            (user.firstname && user.firstname.toLowerCase().includes(searchTermLower)) ||
            (user.lastname && user.lastname.toLowerCase().includes(searchTermLower)) ||
            (user.email && user.email.toLowerCase().includes(searchTermLower)) ||
            (user.phone && user.phone.toLowerCase().includes(searchTermLower)) ||
            (user.role && user.role.toLowerCase().includes(searchTermLower))
        );
    })
    : [];

    const headers = [
        { label: 'Prénom', key: 'firstname' }, 
        { label: 'Nom', key: 'lastname' }, 
        { label: 'Email', key: 'email' }, 
        { label: 'Rôle', key: 'role' }, 
    ];
    const filteredData = filtered.map(user => ({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
    }));

    return (
        <div className="bg-white rounded-lg gap-2">
            <div className="flex justify-between">
                <h2 className="text-2xl font-semibold">Liste des utilisateurs</h2>
                <Button1
                    texte={'Ajouter un utilisateur'}
                    onClick={() => router.push('/admin/dashboard/utilisateurs/new')}
                >
                </Button1>
            </div>
            <div className='flex items-center gap-2 mt-4 justify-end'>
                <svg xmlns="http://www.w3.org/2000/svg" className='w-8 h-8' viewBox="0 0 42.509 42.509">
                    <path id="Icon_akar-search" data-name="Icon akar-search" d="M41.887,41.887l-9.181-9.2M37.794,20.4A17.4,17.4,0,1,1,20.4,3a17.4,17.4,0,0,1,17.4,17.4Z" transform="translate(-1.5 -1.5)" fill="none" stroke="#000" stroke-linecap="round" stroke-width="3" opacity="0.356"/>
                </svg>
                <input 
                    type="text" 
                    placeholder='Rechercher'
                    className='p-2 px-4 border-2 border-gray-300 rounded-full h-10 w-1/4'
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="mt-6">
                <Table
                    headers={headers} 
                    data={filteredData} 
                    onRowClick={handleRowClick}
                />
            </div>
        </div>
    );
};