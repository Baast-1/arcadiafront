"use client";

import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button1, Button2, Button5 } from "@/components/Buttons";
import { UserContext } from "@/utils/userContext";

const ShowAnimal = ({ params }) => {
    const { id } = React.use(params);
    const [etat, setEtat] = useState(null);
    const [picturePreviews, setPicturePreviews] = useState(['', '', '']);
    const [formData, setFormData] = useState({
        name: '',
        race: '',
        habitat_id: '',
        pictures: [],
    });
    const [habitats, setHabitats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [FormFeeds, setFormFeeds] = useState({name : "", quantity : "", animal_id : id, created_at : ""});
    const [feeds, setFeeds] = useState([]);
    const [selectedFeed, setSelectedFeed] = useState(null);
    const [FormReports, setFormReports] = useState({state : "", feed : "", grammage: "", detailState: "", animal_id : id, created_at : ""});
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalReport, setShowModalReport] = useState(false);
    const router = useRouter();
    const { userRole } = useContext(UserContext);
    console.log(userRole);

    useEffect(() => {
        fetchHabitats();
        fetchAnimal();
        fetchFeedsByAnimals();
        fetchReportsByAnimals();
    }, []);

    const fetchHabitats = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}habitats`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const data = await response.json();
            console.log(data);
            if (Array.isArray(data)) {
                setHabitats(data);
            } else {
                console.error('La réponse de l\'API n\'est pas un tableau:', data);
                setHabitats([]);
            }
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de la récupération des habitats', error);
            setHabitats([]);
            setLoading(false);
        }
    };

    const fetchAnimal = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}animals/${id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const data = await response.json();
            console.log(data);
            setFormData({
                name: data.name,
                race: data.race,
                habitat_id: data.habitat_id,
                pictures: data.pictures.map(picture => picture.route),
            });
            setPicturePreviews(data.pictures.map(picture => `${process.env.NEXT_PUBLIC_API_URL}${picture.route}`));
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de la récupération des animaux', error);
            setLoading(false);
        }
    };

    const fetchFeedsByAnimals = async () => {
        const animal_id = id;
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}feeds/animal/${animal_id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const Data = await response.json();
            console.log('Commentaire par habitats', Data);
            setFeeds(Array.isArray(Data) ? Data : []);
        } catch (error) {
            console.error('Erreur lors de la récupération du feeds', error);
        }
    };

    const handleNewFeed = async (event) => {
        const animal_id = id;
        console.log(FormFeeds);
        event.preventDefault();
        const updatedFormFeeds = {
            ...FormFeeds,
            state: parseInt(FormFeeds.state, 10)
        };
        console.log(updatedFormFeeds);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}feeds/animal/${animal_id}`, updatedFormFeeds, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setFormFeeds([...feeds, response.data]);
            setShowModal(false);
            fetchFeedsByAnimals();
        } catch (error) {
            console.error('Erreur lors de la création de feeds', error);
        }
    };

    const fetchReportsByAnimals = async () => {
        const animal_id = id;
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}reports/animal/${animal_id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const Data = await response.json();
            console.log('Rapport par animal', Data);
            setReports(Array.isArray(Data) ? Data : []);
        } catch (error) {
            console.error('Erreur lors de la récupération du feeds', error);
        }
    };

    const handleNewReport = async (event) => {
        const animal_id = id;
        console.log(FormReports);
        event.preventDefault();
        const updatedFormReports = {
            ...FormReports,
        };
        console.log(updatedFormReports);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}reports/animal/${animal_id}`, updatedFormReports, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setFormReports([...feeds, response.data]);
            setShowModalReport(false);
            fetchReportsByAnimals();
        } catch (error) {
            console.error('Erreur lors de la création de report', error);
        }
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
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}animals/${id}`, data, {
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('API response:', response.data);
            router.push('/admin/dashboard/animaux');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de animal:', error);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}animals/${id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            console.log('API response:', response.data);
            router.push('/admin/dashboard/animaux');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de du service:', error);
        }
    }

    const handleDeleteFeed = async () => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}feeds/${selectedFeed.id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setShowModal(false);
            setSelectedFeed(null);
            fetchFeedsByAnimals();
        } catch (error) {
            console.error('Erreur lors de la suppression du commentaire:', error);
        }
    };

    const handleDeleteReport = async () => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}reports/${selectedReport.id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setShowModalReport(false);
            setSelectedReport(null);
            fetchReportsByAnimals();
        } catch (error) {
            console.error('Erreur lors de la suppression du commentaire:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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

    const handleFeedClick = (feed) => {
        setSelectedFeed(feed);
        setShowModal(true);
    };

    const handleReportClick = (report) => {
        setSelectedReport(report);
        setShowModalReport(true);
    };

    function formatDate(dateString) {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
    }
    

    return (
    <div className="p-6 h-5/6">
        <h1 className="text-2xl font-bold mb-4 text-custom-1">{formData.name}</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8 h-full">
            <div className="grid grid-cols-2 gap-4 w-full h-full">
                <div className="flex flex-col justify-center items-center gap-2 h-full">
                    <div className="grid grid-cols-2 w-10/12 gap-4">
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
                    <div className="p-4">
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
                </div>
                <div className="flex flex-row gap-4 h-full">
                    {(userRole === 'veterinaire' || userRole === 'admin') && (
                    <div className="flex flex-col w-1/2">
                        <div className="flex flex-row items-center justify-between p-2">
                            <h2 className="text-xl font-semibold">Sant&eacute;</h2>
                            {userRole === 'veterinaire' && (
                                <Button1
                                    texte={'Ajouter'}
                                    onClick={() => {
                                        setSelectedReport(null);
                                        setShowModalReport(true);
                                }}
                            />
                            )}
                        </div>
                        <div className="overflow-y-auto p-8 border-2 border-custom-1 rounded-xl h-5/6">
                            {reports.map(report => {
                                console.log(report);
                                return (
                                    <div key={report.id} className="relative flex flex-col gap-2 mb-4 p-4 bg-gray-100 rounded-xl shadow-md hover:scale-105 cursor-pointer transition-all group" onClick={() => handleReportClick(report)}>
                                        <div className="flex flex-row justify-between">
                                            <p className="font-semibold">{new Date(report.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    )}
                    <div className="flex flex-col w-1/2">
                        <div className="flex flex-row items-center justify-between p-2">
                            <h2 className="text-xl font-semibold">Nourriture</h2>
                            {userRole === 'employe' && (
                                <Button1
                                    texte={'Ajouter'}
                                    onClick={() => {
                                        setSelectedFeed(null);
                                        setShowModal(true);
                                }}
                            />
                            )}
                        </div>
                        <div className="overflow-y-auto p-8 border-2 border-custom-1 rounded-xl h-5/6">
                            {feeds.map(feed => (
                                <div key={feed.id} className="relative flex flex-col gap-2 mb-4 p-4 bg-gray-100 rounded-xl shadow-md hover:scale-105 cursor-pointer transition-all group" onClick={() => handleFeedClick(feed)}>
                                    <div className="flex flex-row justify-between">
                                        <p className="font-semibold">{new Date(feed.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                                    </div>
                                </div>
                            ))}
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
                                    <div className="wrapper">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder=" "
                                                value={selectedFeed ? selectedFeed.name : FormFeeds.name}
                                                onChange={(e) => {
                                                    if (selectedFeed) {
                                                        setSelectedFeed({ ...selectedFeed, name: e.target.value });
                                                    } else {
                                                        setFormFeeds({ ...FormFeeds, name: e.target.value });
                                                    }
                                                }}
                                                required
                                                className="w-full px-3 py-2 mt-1 border-2 rounded-lg shadow-sm focus:outline-none border-custom-2"
                                                disabled={!!selectedFeed}
                                            />
                                            <span className="input-placeholder">Nourriture</span>
                                        </div>
                                    </div>
                                    <div className="wrapper">
                                        <div className="relative">
                                            <input
                                                type="number"
                                                placeholder=" "
                                                value={selectedFeed ? selectedFeed.quantity : FormFeeds.quantity}
                                                onChange={(e) => {
                                                    if (selectedFeed) {
                                                        setSelectedFeed({ ...selectedFeed, quantity: e.target.value });
                                                    } else {
                                                        setFormFeeds({ ...FormFeeds, quantity: e.target.value });
                                                    }
                                                }}
                                                required
                                                className="w-full px-3 py-2 mt-1 border-2 rounded-lg shadow-sm focus:outline-none border-custom-2"
                                                disabled={!!selectedFeed}
                                            />
                                            <span className="input-placeholder">Quantit&eacute;</span>
                                        </div>
                                    </div>
                                    <div className="wrapper">
                                        <div className="relative">
                                            <input
                                                type="datetime-local"
                                                placeholder=" "
                                                value={
                                                    selectedFeed ? formatDate(selectedFeed.created_at) : formatDate(FormFeeds.created_at)
                                                }
                                                onChange={(e) => {
                                                    if (selectedFeed) {
                                                        setSelectedFeed({ ...selectedFeed, created_at: e.target.value });
                                                    } else {
                                                        setFormFeeds({ ...FormFeeds, created_at: e.target.value });
                                                    }
                                                }}
                                                required
                                                className="w-full px-3 py-2 mt-1 border-2 rounded-lg shadow-sm focus:outline-none border-custom-2"
                                                disabled={!!selectedFeed}
                                            />
                                            <span className="input-placeholder">Date de passage</span>
                                        </div>
                                    </div>
                                </div>
                                {!selectedFeed && (
                                    <Button1
                                        texte={'Enregistrer'}
                                        onClick={handleNewFeed}
                                    />
                                )}
                                {selectedFeed && (
                                    <Button5
                                        texte={'Supprimer'}
                                        onClick={handleDeleteFeed}
                                    />
                                )}
                            </form>
                        </div>
                    </div>
                )}
                {showModalReport && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white flex justify-center items-center h-5/6 w-9/12 rounded-xl shadow-lg relative p-6">
                            <button onClick={() => setShowModalReport(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 py-6 px-10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32.083" height="31.598" viewBox="0 0 32.083 31.598" style={{ width: '1.5rem', height: '1.5rem' }}>
                                    <g id="Groupe_2221" data-name="Groupe 2221" transform="translate(759.919 -1263.599) rotate(45)">
                                        <path id="Tracé_1669" data-name="Tracé 1669" d="M14040.8-2925.5v38.686" transform="translate(-13662.303 4337)" fill="none" stroke="#381d1a" strokeLinecap="round" strokeWidth="3"/>
                                        <path id="Tracé_1670" data-name="Tracé 1670" d="M14040.8-2925.5v38.686" transform="translate(-2527.314 -12610.303) rotate(90)" fill="none" stroke="#381d1a" strokeLinecap="round" strokeWidth="3"/>
                                    </g>
                                </svg>
                            </button>
                            <form className="flex flex-col justify-center items-center gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="wrapper">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder=" "
                                                value={selectedReport ? selectedReport.state : FormReports.state}
                                                onChange={(e) => {
                                                    if (selectedReport) {
                                                        setSelectedReport({ ...selectedReport, state: e.target.value });
                                                    } else {
                                                        setFormReports({ ...FormReports, state: e.target.value });
                                                    }
                                                }}
                                                required
                                                className="w-full px-3 py-2 mt-1 border-2 rounded-lg shadow-sm focus:outline-none border-custom-2"
                                                disabled={!!selectedReport}
                                            />
                                            <span className="input-placeholder">&Eacute;tat de l&apos;animal</span>
                                        </div>
                                    </div>
                                    <div className="wrapper">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder=" "
                                                value={selectedReport ? selectedReport.feed : FormReports.feed}
                                                onChange={(e) => {
                                                    if (selectedReport) {
                                                        setSelectedReport({ ...selectedReport, feed: e.target.value });
                                                    } else {
                                                        setFormReports({ ...FormReports, feed: e.target.value });
                                                    }
                                                }}
                                                required
                                                className="w-full px-3 py-2 mt-1 border-2 rounded-lg shadow-sm focus:outline-none border-custom-2"
                                                disabled={!!selectedReport}
                                            />
                                            <span className="input-placeholder">Nourriture Propos&eacute;e</span>
                                        </div>
                                    </div>
                                    <div className="wrapper">
                                        <div className="relative">
                                            <input
                                                type="number"
                                                placeholder=" "
                                                value={selectedReport ? selectedReport.grammage : FormReports.grammage}
                                                onChange={(e) => {
                                                    if (selectedReport) {
                                                        setSelectedReport({ ...selectedReport, grammage: e.target.value });
                                                    } else {
                                                        setFormReports({ ...FormReports, grammage: e.target.value });
                                                    }
                                                }}
                                                required
                                                className="w-full px-3 py-2 mt-1 border-2 rounded-lg shadow-sm focus:outline-none border-custom-2"
                                                disabled={!!selectedReport}
                                            />
                                            <span className="input-placeholder">Grammage</span>
                                        </div>
                                    </div>
                                    <div className="wrapper">
                                        <div className="relative">
                                            <input
                                                type="datetime-local"
                                                placeholder=" "
                                                value={
                                                    selectedReport ? formatDate(selectedReport.created_at) : formatDate(FormReports.created_at)
                                                }
                                                onChange={(e) => {
                                                    if (selectedReport) {
                                                        setSelectedReport({ ...selectedReport, created_at: e.target.value });
                                                    } else {
                                                        setFormReports({ ...FormReports, created_at: e.target.value });
                                                    }
                                                }}
                                                required
                                                className="w-full px-3 py-2 mt-1 border-2 rounded-lg shadow-sm focus:outline-none border-custom-2"
                                                disabled={!!selectedReport}
                                            />
                                            <span className="input-placeholder">Date de passage</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="wrapper" style={{ width: '100%' }}>
                                    <div className="relative">
                                        <textarea
                                            type="text"
                                            placeholder=" "
                                            value={selectedReport ? selectedReport.detailState : FormReports.detailState}
                                            onChange={(e) => {
                                                if (selectedReport) {
                                                    setSelectedReport({ ...selectedReport, detailState: e.target.value });
                                                } else {
                                                    setFormReports({ ...FormReports, detailState: e.target.value });
                                                }
                                            }}
                                            required
                                            className="w-full px-3 py-2 mt-1 border-2 rounded-lg shadow-sm focus:outline-none border-custom-2"
                                            disabled={!!selectedReport}
                                        />
                                        <span className="input-placeholder">Détail de l'animal</span>
                                    </div>
                                </div>
                                {!selectedFeed && (
                                    <Button1
                                        texte={'Enregistrer'}
                                        onClick={handleNewReport}
                                    />
                                )}
                                {selectedFeed && (
                                    <Button5
                                        texte={'Supprimer'}
                                        onClick={handleDeleteReport}
                                    />
                                )}
                            </form>
                        </div>
                    </div>
                )}
                </div>
            </div>
            {userRole === 'admin' && (
            <div className="flex justify-center items-end gap-4 mt-8">
                <Button2
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
        </form>
    </div>
    );
};

export default ShowAnimal;