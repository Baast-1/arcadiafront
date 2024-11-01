"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button1, Button2 } from "@/components/Buttons";

const NewUtilisateur = () => {
    const [formData, setFormData] = useState({
        lastname: '',
        email: '',
        firstname: '',
        role: '',
        picture: ''
    });
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}users`, formData , {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            console.log('API response:', response.data);
            router.push('/admin/dashboard/utilisateurs');
        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur:', error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="p-6 bg-custom-6 relative">
            <h1 className="text-2xl font-bold mb-6 mt-4 text-custom-1">Créer un nouvel utilisateur</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 mt-24">
                <div className="flex gap-12 mb-6">
                    <div className="flex flex-col items-center w-64 gap-2">
                        <input
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 border-2 border-custom-2 rounded-full shadow-sm focus:outline-none"
                            placeholder="Nom"
                        />
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 border-2 border-custom-2 rounded-full shadow-sm focus:outline-none"
                            placeholder="Email"
                        />
                    </div>
                    <div className="flex flex-col items-center w-64 gap-2">
                        <input
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 border-2 border-custom-2 rounded-full shadow-sm focus:outline-none"
                            placeholder="Prénom"
                        />
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 border-2 border-custom-2 rounded-full shadow-sm focus:outline-none"
                        >
                            <option value="" disabled>Rôle</option>
                            <option value="admin">Admin</option>
                            <option value="veterinaire">Vétérinaire</option>
                            <option value="employe">Employé</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Button2
                        type="submit"
                        texte="Enregistrer"
                    >    
                    </Button2>
                </div>
            </form>
        </div>
    );
};

export default NewUtilisateur;