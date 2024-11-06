'use client';

import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Table } from '@/components/Tables';
import { Button1, Button2 } from '@/components/Buttons';
import { UserContext } from '@/utils/userContext';

export default function AnimalsList({ params }) {
    const router = useRouter();
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { slug } = params;
    const { userRole } = useContext(UserContext);

    useEffect(() => {
        fetchAnimals();
    }, []);

    const fetchAnimals = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}animals`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const data = await response.json();
            console.log(data);
            setAnimals(data);
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de la récupération des animaux', error);
            setAnimals([]);
            setLoading(false);
        }
    };

    const handleRowClick = (animalFake) => {
        const animal = animals.find(animal => animal.id === animalFake.id);
        router.push(`/admin/dashboard/animaux/${animal.id}`);
    };

    const filtered = Array.isArray(animals)
        ? animals.filter(animal => {
            const searchTermLower = searchTerm.toLowerCase();
            return (
                (animal.name && animal.name.toLowerCase().includes(searchTermLower)) ||
                (animal.race && animal.race.toLowerCase().includes(searchTermLower))
            );
        })
        : [];

    const headers = [
        { label: 'Image', key: 'picture' }, 
        { label: 'Nom', key: 'name' }, 
        { label: 'Race', key: 'race' }, 
        { label: 'Habitats', key: 'habitat_id' }, 
    ];
    const filteredData = filtered.map(animal => ({
        id: animal.id,
        picture: (
            <div key={`photo-${animal.id}`} className="flex items-center justify-center relative">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                    <img
                        key={animal.id}
                        src={animal.pictures && animal.pictures.length > 0 ? `${process.env.NEXT_PUBLIC_API_URL}${animal.pictures[0].route}` : '/image.jpg'}
                        className="w-full h-full object-cover rounded-full"
                        alt="Service"
                        onError={(e) => { e.target.onerror = null; e.target.src = '/image.jpg'; }}
                    />
                </div>
            </div>
        ),
        name: animal.name,
        race: animal.race,
        habitat_id: animal.habitat.name
    }));

    return (
        <div className="bg-white rounded-lg gap-2">
            <div className="flex justify-between">
                <h2 className="text-2xl font-semibold">Liste des animaux</h2>
                {userRole === 'admin' && (
                    <Button1
                        texte={'Ajouter un animal'}
                        onClick={() => router.push('/admin/dashboard/animaux/new')}
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