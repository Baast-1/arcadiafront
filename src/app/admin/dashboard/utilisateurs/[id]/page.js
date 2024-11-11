"use client";

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button1, Button2, Button5 } from "@/components/Buttons";

const UtilisateurShow = ({ params }) => {
    const { id } = React.use(params);
    const [etat, setEtat] = useState(null);
    const [formData, setFormData] = useState({
        lastname: '',
        email: '',
        firstname: '',
        role: '',
        picture: ''
    });
    const router = useRouter();

    const fetchUtilisateur = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users/${id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const userData = await response.json();
            setEtat(userData.state);
            setFormData({
                lastname: userData.lastname,
                email: userData.email,
                firstname: userData.firstname,
                role: userData.role,
                picture: userData.picture
            });
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}users/${id}`, formData, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            console.log('API response:', response.data);
            router.push('/admin/dashboard/utilisateurs');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}users/${id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            console.log('API response:', response.data);
            router.push('/admin/dashboard/utilisateurs');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        }
    }

    useEffect(() => {
        fetchUtilisateur();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 mt-4 text-custom-1">{formData.firstname} {formData.lastname}</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 mt-24">
            <div className="flex gap-8 mb-6">
                <div className="grid grid-cols-2 items-center gap-2">
                    <div className="wrapper">
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder=" "
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 mt-1 border-2 rounded-full shadow-sm focus:outline-none border-custom-2"
                            />
                            <span className="input-placeholder">Email</span>
                        </div>
                    </div>
                    <div className="wrapper">
                        <div className="relative">
                            <input
                                type="text"
                                name="lastname"
                                placeholder=" "
                                value={formData.lastname}
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
                                name="firstname"
                                placeholder=" "
                                value={formData.firstname}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 mt-1 border-2 rounded-full shadow-sm focus:outline-none border-custom-2"
                            />
                            <span className="input-placeholder">Prenom</span>
                        </div>
                    </div>
                    <div className="wrapper">
                        <div className="relative">
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-3 py-2 mt-1 border-2 border-custom-2 rounded-full shadow-sm focus:outline-none"
                            >
                                <option value="" disabled>Role</option>
                                <option value="admin">Admin</option>
                                <option value="veterinaire">Veterinaire</option>
                                <option value="employe">Employe</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-end gap-4">
                <Button1
                    type="submit"
                    texte="Enregistrer"
                />    
                <Button5
                    type="button"
                    texte="Supprimer"
                    onClick={handleDelete}
                />    
            </div>
        </form>
    </div>
    );
};

export default UtilisateurShow;