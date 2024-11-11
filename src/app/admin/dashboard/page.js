'use client';

import React, { useState, useEffect, useContext } from "react";
import { Button1, Button2, Button5 } from "@/components/Buttons";
import axios from "axios";
import { UserContext } from '@/utils/userContext';
import { useRouter } from 'next/navigation';
import PieChart from "@/components/PieCharts";

export default function DashboardPage() {
    const [hours, setHours] = useState([]);
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedHour, setSelectedHour] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [hourData, setHourData] = useState({ name: "", start: "", end: "" });
    const { userRole } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if (userRole === 'admin') {
            fetchHoraires();
            fetchAnimals();
        } else {
            router.push('/admin/dashboard/animaux');
        }
        console.log('Role:', userRole);
    }, [userRole]);

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

    const fetchHoraires = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}hours`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const data = await response.json();
            setHours(data);
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de la récupération des horaires', error);
            setHours([]);
            setLoading(false);
        }
    };

    const handleNewHour = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}hours`, hourData, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setHours([...hours, response.data]);
            setShowModal(false);
        } catch (error) {
            console.error('Erreur lors de la création de l\'horaire:', error);
        }
    };

    const handleUpdateHour = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}hours/${selectedHour.id}`, hourData, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setHours(hours.map(hour => hour.id === response.data.id ? response.data : hour));
            setShowModal(false);
            setSelectedHour(null);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'horaire:', error);
        }
    };

    const handleDeleteHour = async () => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}hours/${selectedHour.id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setHours(hours.filter(hour => hour.id !== selectedHour.id));
            setShowModal(false);
            setSelectedHour(null);
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'horaire:', error);
        }
    };

    const openModal = (hour = null) => {
        setSelectedHour(hour);
        setHourData(hour || { name: "", start: "", end: "" });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedHour(null);
        setHourData({ name: "", start: "", end: "" });
    };

    return (
        <div className="bg-white rounded-lg p-6 h-5/6">
            <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Répartition des vues par animal</h2>
                    <div className="mb-8 w-full">
                        {animals.length > 0 ? (
                            <PieChart data={animals} />
                        ) : (
                            <p>Chargement des données...</p>
                        )}
                    </div>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">Liste des Horaires</h2>
                        <Button1
                            texte={'Ajouter un horaire'}
                            onClick={() => openModal()}
                            className="px-4 py-2 bg-blue-500 text-white rounded-full"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {hours.map(hour => (
                            <div 
                                key={hour.id} 
                                className="bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer"
                                onClick={() => openModal(hour)}
                            >
                                <h3 className="text-lg font-semibold mb-2">{hour.name}</h3>
                                <p className="text-sm text-gray-600">Debut: {hour.start.slice(0, 5)}</p>
                                <p className="text-sm text-gray-600">Fin: {hour.end.slice(0, 5)}</p>
                            </div>
                        ))}
                    </div>
                    {loading && <p>Chargement...</p>}
                    {!loading && hours.length === 0 && <p>Aucun horaire trouv&eacute;.</p>}
                </div>
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
                        <form className="flex flex-col justify-center items-center gap-4" onSubmit={selectedHour ? handleUpdateHour : handleNewHour}>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="wrapper">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder=" "
                                            value={hourData.name}
                                            onChange={(e) => setHourData({ ...hourData, name: e.target.value })}
                                            required
                                            className="w-full px-3 py-2 mt-1 border-2 rounded-full shadow-sm focus:outline-none border-custom-2"
                                        />
                                        <span className="input-placeholder">Nom</span>
                                    </div>
                                </div>
                                <div className="wrapper">
                                    <div className="relative">
                                        <input
                                            type="time"
                                            name="Debut"
                                            placeholder=" "
                                            value={hourData.start}
                                            onChange={(e) => setHourData({ ...hourData, start: e.target.value })}
                                            required
                                            className="w-full px-3 py-2 mt-1 border-2 rounded-full shadow-sm focus:outline-none border-custom-2"
                                        />
                                        <span className="input-placeholder">Debut</span>
                                    </div>
                                </div>
                                <div className="wrapper">
                                    <div className="relative">
                                        <input
                                            type="time"
                                            name="Fin"
                                            placeholder=" "
                                            value={hourData.end}
                                            onChange={(e) => setHourData({ ...hourData, end: e.target.value })}
                                            required
                                            className="w-full px-3 py-2 mt-1 border-2 rounded-full shadow-sm focus:outline-none border-custom-2"
                                        />
                                        <span className="input-placeholder">Fin</span>
                                    </div>
                                </div>
                            </div>
                            {selectedHour ? (
                                <>
                                    <div className="flex flex-row gap-4">
                                        <Button1 texte={'Modifier'} onClick={handleUpdateHour} />
                                        <Button5 texte={'Supprimer'} onClick={handleDeleteHour} />
                                    </div>
                                </>
                            ) : (
                                <Button1 texte={'Enregistrer'} onClick={handleNewHour} />
                            )}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}