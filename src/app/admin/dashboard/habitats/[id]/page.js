"use client";

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button2, Button5, Button1 } from "@/components/Buttons";
import { UserContext } from "@/utils/userContext";

const ShowHabitats = ({ params }) => {
    const { id } = React.use(params);
    const [etat, setEtat] = useState(null);
    const [picturePreviewUrl, setPicturePreviewUrl] = useState('');
    const [picture, setPicture] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        picture: '',
    });
    const [FormComments, setFormComments] = useState({note : "", state : "", upgrade : false});
    const [comments, setComments] = useState([]);
    const [selectedComment, setSelectedComment] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const { userRole } = useContext(UserContext);

    useEffect(() => {
        fetchHabitats();
        fetchCommentsByHabitats();
    }, []);

    const fetchHabitats = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}habitats/${id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const serviceData = await response.json();
            console.log(serviceData);
            setEtat(serviceData.state);
            setFormData({
                name: serviceData.name,
                description: serviceData.description,
                picture: serviceData.pictures && serviceData.pictures.length > 0 ? serviceData.pictures[0].route : '',
            });
        } catch (error) {
            console.error('Erreur lors de la récupération de habitat', error);
        }
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
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}habitats/${id}`, data, {
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Donnée envoyé:', response.data);
            router.push('/admin/dashboard/habitats');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de habitat:', error);
        }
    }

    const fetchCommentsByHabitats = async () => {
        const habitat_id = id;
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}comments/habitat/${habitat_id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const Data = await response.json();
            console.log('Commentaire par habitats', Data);
            setComments(Array.isArray(Data) ? Data : []);
        } catch (error) {
            console.error('Erreur lors de la récupération du comments', error);
        }
    };

    const handleNewComment = async (event) => {
        const habitat_id = id;
        console.log(FormComments);
        event.preventDefault();
        const updatedFormComments = {
            ...FormComments,
            state: parseInt(FormComments.state, 10)
        };
        console.log(updatedFormComments);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}comments/habitat/${habitat_id}`, updatedFormComments, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setFormComments([...comments, response.data]);
            setShowModal(false);
            fetchCommentsByHabitats();
        } catch (error) {
            console.error('Erreur lors de la création de comments', error);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}habitats/${id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            console.log('API response:', response.data);
            if (response.data.error) {
                setErrorMessage(response.data.error);
                setShowErrorPopup(true);
            } else {
                router.push('/admin/dashboard/habitats');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'habitat:', error);
            
            if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(error.response.data.error);
                setShowErrorPopup(true);
            } else {
                setErrorMessage('Une erreur est survenue lors de la suppression de l\'habitat.');
                setShowErrorPopup(true);
            }
        }
    }
    

    const handleDeleteComment = async () => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}comments/${selectedComment.id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setShowModal(false);
            setSelectedComment(null);
            fetchCommentsByHabitats();
        } catch (error) {
            console.error('Erreur lors de la suppression du commentaire:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        setPicture(file);
        setPicturePreviewUrl(URL.createObjectURL(file));
    };

    const stateMapping = {
        1: "Correct",
        2: "À Améliorer",
        3: "Délabré"
    };

    const handleCommentClick = (comment) => {
        setSelectedComment(comment);
        setShowModal(true);
    };

    return (
        <div className="p-6 h-5/6">
            <h1 className="text-2xl font-bold text-custom-1">{formData.name}</h1>
            <div className="grid grid-cols-2 gap-8 w-full h-full">
                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 h-full">
                    <div className="flex flex-col gap-2 h-full">
                        <div className="flex justify-center items-center h-full">
                            <label className="relative w-11/12 h-5/6 rounded-xl flex items-center justify-center cursor-pointer group">
                                {picturePreviewUrl ? (
                                    <>
                                        <img
                                            src={picturePreviewUrl}
                                            alt="Aperçu de l'image"
                                            className="w-full h-full rounded-xl object-cover"
                                        />
                                        <div
                                            className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        >
                                            <p className="text-custom-2 text-white text-center text-sm font-semibold">Modifier l'image 1920 x 1080</p>
                                        </div>
                                    </>
                                ) : (
                                    formData.picture ? (
                                        <>
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_API_URL}${formData.picture}`}
                                                alt="Aperçu de l'image"
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
                                    )
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePictureChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </label>
                        </div>
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
                        {userRole === 'admin' && (
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
                        )}
                    </div>
                </form>
                <div className="h-full">
                    <div className="flex flex-row items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Commentaires</h2>
                        {userRole === 'veterinaire' && (
                            <Button1
                                texte={'Ajouter un commentaire'}
                                onClick={() => {
                                    setSelectedComment(null);
                                    setShowModal(true);
                                }}
                            />
                        )}
                    </div>
                    <div className="overflow-y-auto p-8 border-2 border-custom-1 rounded-xl h-5/6">
                        {comments.map(comment => (
                            <div key={comment.id} className="relative flex flex-col gap-2 mb-4 p-4 bg-gray-100 rounded-xl shadow-md hover:scale-105 cursor-pointer transition-all group" onClick={() => handleCommentClick(comment)}>
                                <div className="flex flex-row justify-between">
                                    <p className="font-semibold">{stateMapping[comment.state]}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(comment.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                    </p>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <p className="text-sm font-semibold">A ameliorer :</p>
                                    <p className="text-sm">{comment.upgrade ? 'Oui' : 'Non'}</p>
                                </div>
                                <p className="text-sm">
                                    {comment.note.length > 50 ? comment.note.substring(0, 50) + '...' : comment.note}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white flex justify-center items-center h-5/6 w-9/12 rounded-xl shadow-lg relative p-6">
                        <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 py-6 px-10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32.083" height="31.598" viewBox="0 0 32.083 31.598" style={{ width: '1.5rem', height: '1.5rem' }}>
                                <g id="Groupe_2221" data-name="Groupe 2221" transform="translate(759.919 -1263.599) rotate(45)">
                                    <path id="Tracé_1669" data-name="Tracé 1669" d="M14040.8-2925.5v38.686" transform="translate(-13662.303 4337)" fill="none" stroke="#381d1a" strokeLinecap="round" strokeWidth="3"/>
                                    <path id="Tracé_1670" data-name="Tracé 1670" d="M14040.8-2925.5v38.686" transform="translate(-2527.314 -12610.303) rotate(90)" fill="none" stroke="#381d1a" strokeLinecap="round" strokeWidth="3"/>
                                </g>
                            </svg>
                        </button>
                        <form className="flex flex-col justify-center items-center gap-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex flex-row gap-4">
                                    <div className="wrapper">
                                        <div className="relative">
                                            <select
                                                value={selectedComment ? selectedComment.state : FormComments.state}
                                                onChange={(e) => {
                                                    if (selectedComment) {
                                                        setSelectedComment({ ...selectedComment, state: parseInt(e.target.value) });
                                                    } else {
                                                        setFormComments({ ...FormComments, state: parseInt(e.target.value) });
                                                    }
                                                }}
                                                required
                                                className="w-full px-3 py-2 mt-1 border-2 rounded-full shadow-sm focus:outline-none border-custom-2"
                                                disabled={!!selectedComment}
                                            >
                                                <option value="" disabled hidden>Choisir...</option>
                                                <option value="1">Correct</option>
                                                <option value="2">À améliorer</option>
                                                <option value="3">Délabré</option>
                                            </select>
                                            <span className="input-placeholder">Choisir un État</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <span className=" text-center text-sm text-custom-1 font-normal">Besoin d'une amélioration</span>
                                        <div className="w-full flex flex-row justify-center items-center mt-2">
                                            <div className="mr-2">Non</div>
                                            <div className="toggle-container">
                                                <input
                                                    type="checkbox"
                                                    id="toggle"
                                                    className="toggle-input"
                                                    checked={selectedComment ? selectedComment.upgrade : FormComments.upgrade}
                                                    onChange={(e) => {
                                                        if (selectedComment) {
                                                            setSelectedComment({ ...selectedComment, upgrade: e.target.checked });
                                                        } else {
                                                            setFormComments({ ...FormComments, upgrade: e.target.checked });
                                                        }
                                                    }}
                                                    disabled={!!selectedComment}
                                                />
                                                <label htmlFor="toggle" className="toggle-label"></label>
                                            </div>
                                            <div className="ml-2">Oui</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="wrapper" style={{ width: "100%"}}>
                                    <div className="relative">
                                        <textarea
                                            type="text"
                                            placeholder=" "
                                            value={selectedComment ? selectedComment.note : FormComments.note}
                                            onChange={(e) => {
                                                if (selectedComment) {
                                                    setSelectedComment({ ...selectedComment, note: e.target.value });
                                                } else {
                                                    setFormComments({ ...FormComments, note: e.target.value });
                                                }
                                            }}
                                            required
                                            className="w-full px-3 py-2 mt-1 border-2 rounded-lg shadow-sm focus:outline-none border-custom-2"
                                            disabled={!!selectedComment}
                                        />
                                        <span className="input-placeholder">Commentaire</span>
                                    </div>
                                </div>
                            </div>
                            {!selectedComment && (
                                <Button1
                                    texte={'Enregistrer'}
                                    onClick={handleNewComment}
                                />
                            )}
                            {selectedComment && (
                                <Button5
                                    texte={'Supprimer'}
                                    onClick={handleDeleteComment}
                                />
                            )}
                        </form>
                    </div>
                </div>
            )}
            {showErrorPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Erreur</h2>
                        <p>{errorMessage}</p>
                        <button
                            onClick={() => setShowErrorPopup(false)}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowHabitats;