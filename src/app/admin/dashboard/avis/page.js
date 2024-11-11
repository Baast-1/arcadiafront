'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Table } from '@/components/Tables';
import { Button1, Button2 } from '@/components/Buttons';
import axios from 'axios';

export default function AvisList() {
    const router = useRouter();
    const [avis, setAvis] = useState([]);
    const [selectedAvis, setSelectedAvis] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchAvis();
    }, []);

    const fetchAvis = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}avis`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const data = await response.json();
            console.log(data);
            setAvis(data);
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs', error);
            setAvis([]);
            setLoading(false);
        }
    };

    const handleAvis = async () => {
        if (!selectedAvis || !selectedAvis._id) {
            console.error("ID de l'avis non défini");
            return;
        }
        
        const updatedAvis = { ...selectedAvis, isVisible: selectedAvis.isVisible };
    
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}avis/${selectedAvis._id}`, updatedAvis, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            console.log('Réponse de l\'API:', response.data);
            setShowModal(false);
            fetchAvis();
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'avis:", error);
        }
    };
    
    
    const handleRowClick = (avisItem) => {
        const selected = avis.find(a => a._id === avisItem._id);
        console.log(selected);
        setSelectedAvis(selected);
        setShowModal(true);
    };
    
    const closeModal = () => {
        setShowModal(false);
    };

    const filtered = Array.isArray(avis)
    ? avis.filter(avis => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            (avis.isVisible && String(avis.isVisible).toLowerCase().includes(searchTermLower)) ||
            (avis.createdAt && new Date(avis.createdAt).toLocaleString().toLowerCase().includes(searchTermLower))
        );
    })
    : [];

    const headers = [
        { label: 'Pseudo', key: 'pseudo' }, 
        { label: 'Message', key: 'message' }, 
        { label: 'Visible', key: 'isVisible' }, 
        { label: 'Date de création', key: 'createdAt' }, 
    ];
    const filteredData = filtered.map(avis => ({
        _id: avis._id,
        pseudo: avis.pseudo,
        message: avis.message.substring(0, 50),
        isVisible: avis.isVisible ? 'Oui' : 'Non',
        createdAt: new Date(avis.createdAt).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }),
    }));

    return (
        <div className="bg-white rounded-lg gap-2 h-5/6">
            <div className="flex justify-between">
                <h2 className="text-2xl font-semibold">Liste des avis</h2>
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
            <div className="mt-6 h-full">
                <Table
                    headers={headers} 
                    data={filteredData}
                    onRowClick={handleRowClick}
                />
            </div>
            {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white flex justify-center items-center h-5/6 w-9/12 rounded-xl shadow-lg relative p-6">
                    <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 py-6 px-10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32.083" height="31.598" viewBox="0 0 32.083 31.598" style={{ width: '1.5rem', height: '1.5rem' }}>
                            <g id="Groupe_2221" data-name="Groupe 2221" transform="translate(759.919 -1263.599) rotate(45)">
                                <path id="Tracé_1669" data-name="Tracé 1669" d="M14040.8-2925.5v38.686" transform="translate(-13662.303 4337)" fill="none" stroke="#381d1a" strokeLinecap="round" strokeWidth="3"/>
                                <path id="Tracé_1670" data-name="Tracé 1670" d="M14040.8-2925.5v38.686" transform="translate(-2527.314 -12610.303) rotate(90)" fill="none" stroke="#381d1a" strokeLinecap="round" strokeWidth="3"/>
                            </g>
                        </svg>
                    </button>
                    <div className='flex flex-col justify-center items-center'>
                        <div className='flex flex-row justify-center items-center gap-4 m-4'>
                            <div className="wrapper">
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="pseudo"
                                        placeholder=" "
                                        value={selectedAvis ? selectedAvis.pseudo : ''}
                                        required
                                        disabled
                                        className="w-full px-3 py-2 mt-1 border-2 rounded-full shadow-sm focus:outline-none border-custom-2"
                                    />
                                    <span className="input-placeholder">Pseudo</span>
                                </div>
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="w-full flex flex-row justify-center items-center">
                                    <div className="mr-2">Non</div>
                                    <div className="toggle-container">
                                        <input
                                            type="checkbox"
                                            id="toggle"
                                            className="toggle-input"
                                            checked={selectedAvis ? selectedAvis.isVisible : false}
                                            onChange={(e) => setSelectedAvis({ ...selectedAvis, isVisible: e.target.checked })}
                                        />
                                        <label htmlFor="toggle" className="toggle-label"></label>
                                    </div>
                                    <div className="ml-2">Visible</div>
                                </div>
                            </div>
                        </div>
                        <div className='m-4'>
                            <div className="wrapper">
                                <div className="relative">
                                    <textarea
                                        type="text"
                                        name="pseudo"
                                        placeholder=" "
                                        value={selectedAvis ? selectedAvis.message : ''}
                                        required
                                        disabled
                                        className="w-full px-3 py-2 mt-1 border-2 rounded-lg shadow-sm focus:outline-none border-custom-2"
                                    />
                                    <span className="input-placeholder">Message</span>
                                </div>
                            </div>
                        </div>
                        <Button1
                            texte="Enregistrer"
                            onClick={handleAvis}
                        >
                        </Button1>
                    </div>
                </div>
            </div>
        )}
        </div>
    );
};