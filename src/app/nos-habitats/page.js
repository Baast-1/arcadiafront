'use client';

import Link from 'next/link';
import { useState, useEffect } from "react";
import axios from "axios";
import { Button1, Button2 } from "@/components/Buttons";
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import Footer from '@/components/footer';

export default function NosHabitats() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [habitats, setHabitats] = useState([]);
    const [animals, setAnimals] = useState([]);
    const [selectedHabitat, setSelectedHabitat] = useState(null);
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [reports, setReports] = useState([]);

    useEffect(() => {
        fetchHabitats();
        fetchAnimals();
    }, []);

    useEffect(() => {
        if (selectedAnimal) {
            fetchReportsByAnimals(selectedAnimal.id);
            incrementAnimalView(selectedAnimal.id);
        }
    }, [selectedAnimal]);

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
            console.error('Erreur lors de la récupération des habitats', error);
            setHabitats([]);
            setLoading(false);
        }
    };
  
    const fetchAnimals = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}animals`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const data = await response.json();
            console.log('Animals:', data);
            setAnimals(Array.isArray(data) ? data : []);
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de la récupération des animaux', error);
            setAnimals([]);
            setLoading(false);
        }
    };

    const fetchReportsByAnimals = async (animalId) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}reports/animal/${animalId}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const data = await response.json();
            console.log('Rapport par animal', data);
            setReports(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Erreur lors de la récupération du feeds', error);
        }
    };

    const incrementAnimalView = async (animalId) => {
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}animals/view/${animalId}`, {
            });
            console.log('View incremented:', response.data);
            console.log(`View incremented for animal ${animalId}`);
        } catch (error) {
            console.error('Erreur lors de l\'incrémentation des vues de l\'animal', error);
        }
    };

    const filteredAnimals = selectedHabitat ? animals.filter(animal => animal.habitat_id === selectedHabitat.id) : [];

    return (
        <div className="min-h-screen bg-gradient">
            <Header />
            {/* Desktop */}
            <div className="hidden lg:flex flex-col justify-center items-center w-full">
                <div className="max-w-[70rem] mt-40">
                    <div className="w-full flex flex-col justify-center items-center">
                        <h2 className="text-2xl font-extrabold text-custom-4 mb-8">Nos Habitats</h2>
                        <div className="px-4 mb-24">
                            <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(${habitats.length}, minmax(200px, 1fr))` }}>
                                {habitats.map((habitat, index) => (
                                    <div 
                                        key={index} 
                                        className="relative w-full h-full group cursor-pointer" 
                                        onClick={() => setSelectedHabitat(habitat)}
                                    >
                                        <img 
                                            alt="main-picture" 
                                            className="w-full h-full object-cover object-bottom rounded-2xl group-hover:brightness-50" 
                                            src={habitat.pictures && habitat.pictures.length > 0 ? `${process.env.NEXT_PUBLIC_API_URL}${habitat.pictures[0].route}` : '/image.jpg'}
                                        />
                                        <p className="absolute inset-0 flex items-center justify-center text-custom-4 bg-black bg-opacity-50 px-2 py-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                                            {habitat.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            {selectedHabitat && (
                                <div className="grid grid-cols-2 mt-8">
                                    <div className="flex flex-col">
                                        <div>
                                            <h3 className="text-xl font-bold text-custom-4">{selectedHabitat.name}</h3>
                                        </div>
                                        <div>
                                            <div className="text-base font-normal text-custom-4">{selectedHabitat.description}</div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4">
                                        {filteredAnimals.map((animal, index) => (
                                            <div 
                                                key={index} 
                                                className="relative w-full h-full group cursor-pointer"
                                                onClick={() => setSelectedAnimal(animal)}
                                            >
                                                <img 
                                                    alt="main-picture" 
                                                    className="w-full h-full object-cover object-bottom rounded-full group-hover:brightness-50" 
                                                    src={animal.pictures && animal.pictures.length > 0 ? `${process.env.NEXT_PUBLIC_API_URL}${animal.pictures[0].route}` : '/image.jpg'}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {selectedAnimal && (
                                <div className="grid grid-cols-2 gap-4 mt-8">
                                    <div className="grid grid-cols-2 gap-4 mt-8">
                                        <div className="relative w-full h-full rounded-xl flex items-center justify-center group">
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_API_URL}${selectedAnimal.pictures[0].route}`}
                                                className="w-full h-full rounded-xl object-cover"
                                            />
                                        </div>
                                        <div className="grid grid-rows-2 gap-4">
                                            {selectedAnimal.pictures.slice(1, 3).map((picture, index) => (
                                                <label key={index} className="relative w-full h-full rounded-xl flex items-center justify-center group">
                                                    <img
                                                        src={`${process.env.NEXT_PUBLIC_API_URL}${picture.route}`}
                                                        className="w-full h-full rounded-xl object-cover"
                                                    />
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-start p-4">
                                        <div className="flex flex-row gap-4 justify-center items-center">
                                            <h3 className="text-xl font-bold text-custom-4">{selectedAnimal.name}</h3>
                                            <p className="text-base font-normal text-custom-4">{selectedAnimal.race}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-custom-4 mb-4 mt-8">Rapport du vétérinaire</h3>
                                            {reports.length > 0 ? (
                                                reports.map((report, index) => (
                                                    <div key={index}>
                                                        <div className="grid grid-cols-3">
                                                            <p className="text-base font-normal text-custom-4">{report.state}</p>
                                                            <p className="text-base font-normal text-custom-4">{report.feed}</p>
                                                            <p className="text-base font-normal text-custom-4">{report.grammage} gr</p>
                                                        </div>
                                                        <p className="text-base font-normal text-custom-4 mt-4">{report.detailState}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-base font-normal text-custom-4">Aucun rapport disponible</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}