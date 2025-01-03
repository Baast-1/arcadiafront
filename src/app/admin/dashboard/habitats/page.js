'use client';

import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Table } from '@/components/Tables';
import { Button1, Button2 } from '@/components/Buttons';
import { UserContext } from '@/utils/userContext';

export default function HabitatsList({ params }) {
    const router = useRouter();
    const [habitats, setHabitats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { slug } = params;
    const { userRole } = useContext(UserContext);

    useEffect(() => {
        fetchHabitats();
    }, []);

    const fetchHabitats = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}habitats`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const data = await response.json();
            console.log(data);
            setHabitats(data);
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de la récupération des services', error);
            setHabitats([]);
            setLoading(false);
        }
    };

    const handleRowClick = (habitatFake) => {
        const habitat = habitats.find(habitat => habitat.id === habitatFake.id);
        router.push(`/admin/dashboard/habitats/${habitat.id}`);
    };

    const filtered = Array.isArray(habitats)
        ? habitats.filter(habitat => {
            const searchTermLower = searchTerm.toLowerCase();
            return (
                (habitat.name && habitat.name.toLowerCase().includes(searchTermLower))
            );
        })
        : [];

    const headers = [
        { label: 'Image', key: 'picture' }, 
        { label: 'Nom', key: 'name' }, 
        { label: 'Description', key: 'description' }, 
    ];
    const filteredData = filtered.map(habitat => ({
        id: habitat.id,
        picture: (
            <div key={`photo-${habitat.id}`} className="flex items-center justify-center relative">
                <div className="h-16 w-16 rounded-full overflow-hidden">
                    <img
                        key={habitat.id}
                        src={habitat.pictures && habitat.pictures.length > 0 ? `${process.env.NEXT_PUBLIC_API_URL}${habitat.pictures[0].route}` : '/image.jpg'}
                        className="w-full h-full object-cover rounded-full"
                        alt="habitat"
                        onError={(e) => { e.target.onerror = null; e.target.src = '/image.jpg'; }}
                    />
                </div>
            </div>
        ),
        name: habitat.name,
        description: habitat.description ? habitat.description.substring(0, 50) : '',    }));

    return (
        <div className="bg-white rounded-lg gap-2">
            <div className="flex justify-between">
                <h2 className="text-2xl font-semibold">Liste des habitats</h2>
                {userRole === 'admin' && (
                    <Button1
                        texte={'Ajouter un habitat'}
                        onClick={() => router.push('/admin/dashboard/habitats/new')}
                    >
                    </Button1>
                )}
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