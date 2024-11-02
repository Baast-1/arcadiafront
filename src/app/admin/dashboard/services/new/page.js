"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button2 } from "@/components/Buttons";

const NewServices = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        picture: '',
    });
    const router = useRouter();
    const [picturePreviewUrl, setPicturePreviewUrl] = useState('');
    const [picture, setPicture] = useState(null);

    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        setPicture(file);
        setPicturePreviewUrl(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        if (picture) {
            data.append('picture', picture);
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}services`, data, {
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('API response:', response.data);
            router.push('/admin/dashboard/services');
        } catch (error) {
            console.error('Erreur lors de la création du service:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="p-6 relative">
            <h1 className="text-2xl font-bold mb-6 mt-4 text-custom-1">Créer un nouveau service</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 mt-24">
                <div className="grid grid-cols-2 gap-16 w-full">
                    <div className="flex flex-col justify-start items-start gap-2">
                        <div className="wrapper">
                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder=" "
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 mt-1 border-2 rounded-full shadow-sm focus:outline-none border-custom-2"
                                />
                                <span className="input-placeholder">Nom</span>
                            </div>
                        </div>
                        <div className="wrapper" style={{ width: '100%' }}>
                            <div className="relative">
                                <textarea
                                    type="text"
                                    name="description"
                                    placeholder=" "
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 mt-1 border-2 rounded-lg shadow-sm focus:outline-none border-custom-2"
                                />
                                <span className="input-placeholder">Description</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <label className="relative w-11/12 h-56 rounded-xl flex items-center justify-center cursor-pointer group">
                            {picturePreviewUrl ? (
                                <>
                                    <img
                                        src={picturePreviewUrl}
                                        alt="Aperçu de l&apos;image"
                                        className="w-full h-full rounded-xl object-cover"
                                    />
                                    <div
                                        className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    >
                                        <p className="text-custom-2 text-white text-center text-sm font-semibold">Modifier l'image 1920 x 1080</p>
                                    </div>
                                </>
                            ) : (
                                <span className="text-custom-1">Cliquez pour télécharger 1920 x 1080</span>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePictureChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </label>
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

export default NewServices;
