"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button2 } from "@/components/Buttons";

const NewAnimal = () => {
    const [formData, setFormData] = useState({
        name: '',
        race: '',
        habitat_id: '',
        pictures: [],
    });
    const router = useRouter();
    const [picturePreviews, setPicturePreviews] = useState(['', '', '']);
    const [habitats, setHabitats] = useState([]);
    const [loading, setLoading] = useState(true);

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
            console.error('Erreur lors de la récupération des animaux', error);
            setHabitats([]);
            setLoading(false);
        }
    };

    const handlePictureChange = (e, index) => {
        const file = e.target.files[0];
        const newPictures = [...formData.pictures];
        newPictures[index] = file;
        setFormData({ ...formData, pictures: newPictures });

        const newPicturePreviews = [...picturePreviews];
        newPicturePreviews[index] = URL.createObjectURL(file);
        setPicturePreviews(newPicturePreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('race', formData.race);
        data.append('habitat_id', formData.habitat_id);
        formData.pictures.forEach((picture) => {
            if (picture) data.append('picture', picture);
        });
        

        for (let pair of data.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}animals`, data, {
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('API response:', response.data);
            router.push('/admin/dashboard/animaux');
        } catch (error) {
            console.error('Erreur lors de la création du service:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="p-6 relative h-5/6">
            <h1 className="text-2xl font-bold mb-6 text-custom-1">Cr&eacute;er un nouvel animal</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8 h-full">
                <div className="grid grid-cols-2 gap-8 w-full h-full">
                    <div className="flex flex-col justify-center items-center gap-2 w-full h-full">
                        <div className="wrapper">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder=" "
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 mt-1 border-2 rounded-full shadow-sm focus:outline-none border-custom-2"
                                />
                                <span className="input-placeholder">Nom</span>
                            </div>
                        </div>
                        <div className="wrapper">
                            <div className="relative">
                                <input
                                    type="text"
                                    name="race"
                                    placeholder=" "
                                    value={formData.race}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 mt-1 border-2 rounded-full shadow-sm focus:outline-none border-custom-2"
                                />
                                <span className="input-placeholder">Race</span>
                            </div>
                        </div>
                        <div className="wrapper">
                            <div className="relative">
                                <select
                                    name="habitat_id"
                                    value={formData.habitat_id}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 mt-1 border-2 rounded-full shadow-sm focus:outline-none border-custom-2"
                                >
                                    <option value="" disabled>Choisir un habitat</option>
                                    {habitats.map(habitat => (
                                        <option key={habitat.id} value={habitat.id}>
                                            {habitat.name}
                                        </option>
                                    ))}
                                </select>
                                <span className="input-placeholder">Habitat</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <label className="relative w-full h-full rounded-xl flex items-center justify-center cursor-pointer group">
                            {picturePreviews[0] ? (
                                <>
                                    <img
                                        src={picturePreviews[0]}
                                        className="w-full h-full rounded-xl object-cover"
                                    />
                                    <div
                                        className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    >
                                        <p className="text-custom-2 text-white text-center text-sm font-semibold">Modifier l&apos;image 1920 x 1080</p>
                                    </div>
                                </>
                            ) : (
                                <span className="text-custom-1">Cliquez pour t&eacute;l&eacute;charger 1920 x 1080</span>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handlePictureChange(e, 0)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </label>
                        <div className="grid grid-rows-2 gap-4">
                            <label className="relative w-full h-full rounded-xl flex items-center justify-center cursor-pointer group">
                                {picturePreviews[1] ? (
                                    <>
                                        <img
                                            src={picturePreviews[1]}
                                            className="w-full h-full rounded-xl object-cover"
                                        />
                                        <div
                                            className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        >
                                            <p className="text-custom-2 text-white text-center text-sm font-semibold">Modifier l&apos;image 1920 x 1080</p>
                                        </div>
                                    </>
                                ) : (
                                    <span className="text-custom-1">Cliquez pour t&eacute;l&eacute;charger 1920 x 1080</span>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handlePictureChange(e, 1)}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </label>
                            <label className="relative w-full h-full rounded-xl flex items-center justify-center cursor-pointer group">
                                {picturePreviews[2] ? (
                                    <>
                                        <img
                                            src={picturePreviews[2]}
                                            className="w-full h-full rounded-xl object-cover"
                                        />
                                        <div
                                            className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        >
                                            <p className="text-custom-2 text-white text-center text-sm font-semibold">Modifier l&apos;image 1920 x 1080</p>
                                        </div>
                                    </>
                                ) : (
                                    <span className="text-custom-1">Cliquez pour t&eacute;l&eacute;charger 1920 x 1080</span>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handlePictureChange(e, 2)}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </label>
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
};

export default NewAnimal;