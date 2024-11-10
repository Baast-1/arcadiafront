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

export default function Home() {
    const [formData, setFormData] = useState({
        pseudo: '',
        message: '',
    });
    const [message, setMessage] = useState('');
    const [charCount, setCharCount] = useState(0);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [habitats, setHabitats] = useState([]);
    const [animals, setAnimals] = useState([]);
    const [services, setServices] = useState([]);
    const [avis, setAvis] = useState([]);
    const [hours, setHours] = useState([]);

    useEffect(() => {
        fetchHabitats();
        fetchAnimals();
        fetchServices();
        fetchAvis();
        fetchHoraires();
    } , []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            pseudo: formData.pseudo,
            message: formData.message,
        };
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}avis`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('API response:', response.data);
            setMessage('Votre avis a bien été envoyé pour validation');
        } catch (error) {
            console.error('Erreur lors de la création de l\'avis:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'message') {
            setCharCount(value.length);
        }
    };

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

  const fetchServices = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}services`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await response.json();
        console.log('Services:', data);
        setServices(Array.isArray(data) ? data : []);
        setLoading(false);
    } catch (error) {
        console.error('Erreur lors de la récupération des services', error);
        setServices([]);
        setLoading(false);
    }
};

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

const fetchHoraires = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}hours`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await response.json();
        console.log('Hours:', data);
        setHours(Array.isArray(data) ? data : []);
        setLoading(false);
    } catch (error) {
        console.error('Erreur lors de la récupération des horaires', error);
        setHours([]);
        setLoading(false);
    }
};

    return (
        <div className="min-h-screen bg-gradient">
            <Header />
            {/* Desktop Hero Header */}
            <div class="hidden lg:flex flex-col justify-center items-center w-full">
                <div class="max-w-[70rem] mt-40">
                    <div class="w-full flex flex-col justify-center items-center">
                        <div class="px-4">
                            <h1 class="text-3xl font-black text-custom-4">Bienvenue au zoo Arcadia</h1>
                        </div>
                        <div class="p-4 max-w-4xl">
                            <div class="text-base font-normal text-custom-4 text-justify">
                                Niché près de la légendaire forêt de Brocéliande en Bretagne, le Zoo Arcadia est un refuge pour des animaux venant des
                                quatre coins du monde depuis 1960. Notre zoo incarne des valeurs d’écologie et d’indépendance énergétique, offrant un 
                                cadre sécurisé et respectueux de la nature à nos résidents à poils, plumes et écailles.
                            </div>
                        </div>
                    </div>
                    <div class="rounded-2xl w-full max-h-[26rem] overflow-hidden mt-4">
                      <img
                          src='/bear.jpg'
                          className="w-full h-auto object-cover object-bottom -mt-40"
                          alt="Logo"
                      />
                    </div>
                </div>
            </div>

            {/* Mobile Hero Header */}
            <div class="lg:hidden flex flex-col justify-center items-center w-full">
              <div style={{ maxWidth: '22rem' }} className='mt-32'>
                  <div class="w-full flex flex-col justify-center items-center">
                      <div class="px-4">
                          <h2 class="text-3xl font-extrabold text-custom-4 text-center mb-4">Bienvenue au zoo
                              Arcadia
                          </h2>
                      </div>
                      <div class="mb-4">
                          <div class="text-sm font-normal text-custom-4 text-justify">
                              Niché près de la légendaire forêt de Brocéliande en Bretagne, le Zoo Arcadia est un refuge pour des animaux venant des
                              quatre coins du monde depuis 1960. Notre zoo incarne des valeurs d’écologie et d’indépendance énergétique, offrant un 
                              cadre sécurisé et respectueux de la nature à nos résidents à poils, plumes et écailles.
                          </div>
                      </div>
                      <div class="rounded-2xl w-full overflow-hidden mt-4">
                          <img
                            src='/bear.jpg'
                            className="w-full h-auto object-cover object-bottom"
                            alt="Logo"
                        />
                      </div>
                  </div>
              </div>
          </div>

          {/* Desktop habitats animal */}
          <div class="hidden lg:flex flex-col justify-center items-center w-full">
                <div class="max-w-[70rem] mt-32">
                    <div class="w-full flex flex-col justify-center items-center">
                        <div class="px-4">
                          <h2 class="text-2xl font-extrabold text-custom-4">Les Habitats du Zoo</h2>
                        </div>
                        <div class="p-4 max-w-4xl">
                            <div class="text-base font-normal text-custom-4 text-justify">
                            Au Zoo Arcadia, nous avons recréé plusieurs habitats naturels pour que nos animaux puissent vivre dans un environnement
                            qui ressemble à leur milieu d'origine. Explorez la Savane, la Jungle ou les Marais, et découvrez des animaux fascinants dans
                            un cadre respectueux de la nature.
                            </div>
                        </div>
                    </div>
                    <div class="w-full max-h-[26rem] overflow-hidden mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                      {habitats.map((habitat, index) => (
                      <div key={index} class="relative w-full h-full group">
                          <img 
                            alt="main-picture" 
                            class="w-full h-full object-cover object-bottom rounded-2xl group-hover:brightness-50" 
                            src={habitat.pictures && habitat.pictures.length > 0 ? `${process.env.NEXT_PUBLIC_API_URL}${habitat.pictures[0].route}` : '/image.jpg'}
                          />
                          <p class="absolute inset-0 flex items-center justify-center text-custom-4 bg-black bg-opacity-50 px-2 py-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">{habitat.name}</p>
                      </div>
                      ))}
                    </div>
                    <div className="scroll-container">
                        <div className="scroll-content">
                            {animals.map((animal) => (
                            animal.pictures && animal.pictures.length > 0 ? (
                                animal.pictures.map((picture, index) => (
                                <div key={index} className="scroll-item relative group">
                                    <img 
                                    alt="animal-picture" 
                                    className="w-full h-full object-cover object-bottom rounded-2xl group-hover:brightness-50" 
                                    src={`${process.env.NEXT_PUBLIC_API_URL}${picture.route}`}
                                    />
                                </div>
                                ))
                            ) : (
                                <div key={animal.id} className="scroll-item relative group">
                                <img 
                                    alt="default-picture" 
                                    className="w-full h-full object-cover object-bottom rounded-2xl group-hover:brightness-50" 
                                    src='/image.jpg'
                                />
                                </div>
                            )
                            ))}
                            {animals.map((animal) => (
                            animal.pictures && animal.pictures.length > 0 ? (
                                animal.pictures.map((picture, index) => (
                                <div key={`duplicate-${index}`} className="scroll-item relative group">
                                    <img 
                                    alt="animal-picture" 
                                    className="w-full h-full object-cover object-bottom rounded-2xl group-hover:brightness-50" 
                                    src={`${process.env.NEXT_PUBLIC_API_URL}${picture.route}`}
                                    />
                                </div>
                                ))
                            ) : (
                                <div key={`duplicate-${animal.id}`} className="scroll-item relative group">
                                <img 
                                    alt="default-picture" 
                                    className="w-full h-full object-cover object-bottom rounded-2xl group-hover:brightness-50" 
                                    src='/image.jpg'
                                />
                                </div>
                            )
                            ))}
                        </div>
                    </div>
                    <div className="w-full flex justify-center items-center mt-8">
                        <Button2
                            type="submit"
                            texte="Nos habitats"
                            link="/habitats"
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Habitats Animal */}
            <div class="lg:hidden flex flex-col justify-center items-center w-full">
                <div style={{ maxWidth: '22rem' }} className='mt-16'>
                    <div class="w-full flex flex-col justify-center items-center">
                        <div class="px-4 py-4">
                            <h2 class="text-2xl font-extrabold text-custom-4">Les Habitats du Zoo</h2>
                        </div>
                        <div class="mb-8">
                            <div class="text-sm font-normal text-custom-4 text-justify">
                            Au Zoo Arcadia, nous avons recréé plusieurs habitats naturels pour que nos animaux puissent vivre dans un environnement
                            qui ressemble à leur milieu d'origine. Explorez la Savane, la Jungle ou les Marais, et découvrez des animaux fascinants dans
                            un cadre respectueux de la nature.
                            </div>
                        </div>
                    </div>
                    <Swiper
                        effect={'cards'}
                        grabCursor={true}
                        modules={[EffectCards]}
                        className="mySwiper"     
                    >
                        {habitats.map((habitat, index) => (
                        <SwiperSlide key={index}>
                            <img
                                alt="habitat-picture"
                                className="w-full h-full object-cover"
                                src={habitat.pictures && habitat.pictures.length > 0 ? `${process.env.NEXT_PUBLIC_API_URL}${habitat.pictures[0].route}` : '/image.jpg'}
                            />
                        </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="scroll-container mt-8">
                        <div className="scroll-content">
                            {animals.map((animal) => (
                            animal.pictures && animal.pictures.length > 0 ? (
                                animal.pictures.map((picture, index) => (
                                <div key={index} className="scroll-item relative group">
                                    <img 
                                    alt="animal-picture" 
                                    className="w-full h-full object-cover object-bottom rounded-2xl group-hover:brightness-50" 
                                    src={`${process.env.NEXT_PUBLIC_API_URL}${picture.route}`}
                                    />
                                </div>
                                ))
                            ) : (
                                <div key={animal.id} className="scroll-item relative group">
                                <img 
                                    alt="default-picture" 
                                    className="w-full h-full object-cover object-bottom rounded-2xl group-hover:brightness-50" 
                                    src='/image.jpg'
                                />
                                </div>
                            )
                            ))}
                            {animals.map((animal) => (
                            animal.pictures && animal.pictures.length > 0 ? (
                                animal.pictures.map((picture, index) => (
                                <div key={`duplicate-${index}`} className="scroll-item relative group">
                                    <img 
                                    alt="animal-picture" 
                                    className="w-full h-full object-cover object-bottom rounded-2xl group-hover:brightness-50" 
                                    src={`${process.env.NEXT_PUBLIC_API_URL}${picture.route}`}
                                    />
                                </div>
                                ))
                            ) : (
                                <div key={`duplicate-${animal.id}`} className="scroll-item relative group">
                                <img 
                                    alt="default-picture" 
                                    className="w-full h-full object-cover object-bottom rounded-2xl group-hover:brightness-50" 
                                    src='/image.jpg'
                                />
                                </div>
                            )
                            ))}
                        </div>
                    </div>
                    <div className="w-full flex justify-center items-center mt-8">
                        <Button2
                            type="submit"
                            texte="Nos habitats"
                            link="/habitats"
                        />
                    </div>
                </div>
            </div>


            {/* Desktop Services */}
            <div class="hidden lg:flex flex-col justify-center items-center w-full">
                <div class="max-w-[70rem] mt-32">
                    <div class="w-full flex flex-col justify-center items-center">
                        <div class="px-4">
                          <h2 class="text-2xl font-extrabold text-custom-4">Les Services du Zoo</h2>
                        </div>
                        <div class="p-4 max-w-4xl">
                            <div class="text-base font-normal text-custom-4 text-justify">
                            Lors de votre visite, profitez de nos différents services pour rendre votre journée encore plus agréable : dégustez un repas 
                            dans notre restaurant, suivez nos visites guidées pour en apprendre plus sur nos animaux, ou laissez-vous emporter par une
                            balade en petit train à travers le zoo.
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-h-[26rem] overflow-hidden mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-4">
                    {services.map((service) => (
                        <div key={service.id} className="relative w-full h-full group">
                        <img 
                            alt="main-picture" 
                            className="w-full h-full object-cover object-bottom rounded-2xl group-hover:brightness-50" 
                            src={service.pictures && service.pictures.length > 0 ? `${process.env.NEXT_PUBLIC_API_URL}${service.pictures[0].route}` : '/image.jpg'}
                        />
                        <p className="absolute inset-0 flex items-center justify-center text-custom-4 bg-black bg-opacity-50 px-2 py-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">{service.name}</p>
                        </div>
                    ))}
                    </div>
                </div>
                <div className="w-full flex justify-center items-center mt-8">
                    <Button2
                        type="submit"
                        texte="Nos services"
                        link="/habitats"
                    />
                </div>
            </div>

            {/* Mobile Services */}
            <div class="lg:hidden flex flex-col justify-center items-center w-full">
                <div style={{ maxWidth: '22rem' }} className='mt-16'>
                    <div class="w-full flex flex-col justify-center items-center">
                        <div class="px-4 py-4">
                            <h2 class="text-2xl font-extrabold text-custom-4">Les Services du Zoo</h2>
                        </div>
                        <div class="mb-8">
                            <div class="text-sm font-normal text-custom-4 text-justify">
                            Lors de votre visite, profitez de nos différents services pour rendre votre journée encore plus agréable : dégustez un repas 
                            dans notre restaurant, suivez nos visites guidées pour en apprendre plus sur nos animaux, ou laissez-vous emporter par une
                            balade en petit train à travers le zoo.
                            </div>
                        </div>
                    </div>
                    <Swiper
                        effect={'cards'}
                        grabCursor={true}
                        modules={[EffectCards]}
                        className="mySwiper"     
                    >
                        {services.map((service, index) => (
                        <SwiperSlide key={index}>
                            <img
                                alt="habitat-picture"
                                className="w-full h-full object-cover"
                                src={service.pictures && service.pictures.length > 0 ? `${process.env.NEXT_PUBLIC_API_URL}${service.pictures[0].route}` : '/image.jpg'}
                            />
                        </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="w-full flex justify-center items-center mt-8">
                    <Button2
                        type="submit"
                        texte="Nos services"
                        link="/habitats"
                    />
                </div>
            </div>

            {/* Desktop Avis */}
            <div class="hidden lg:flex flex-col justify-center items-center w-full">
                <div class="max-w-[70rem] mt-32">
                    <div class="w-full flex flex-col justify-center items-center">
                        <div class="px-4">
                          <h2 class="text-2xl font-extrabold text-custom-4">Ce que nos visiteurs disent de nous</h2>
                        </div>
                    </div>
                    <div className="scroll-container-avis mt-8">
                        <div className="scroll-content-avis">
                            {avis.map((avis, index) => (
                                <div key={index} className="scroll-item-avis relative group p-4 bg-white rounded-2xl shadow-md">
                                    <p className="font-bold">{avis.pseudo}</p>
                                    <p>{avis.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8 h-full w-full mt-8">
                        <div className="flex flex-col justify-center items-start gap-2 w-2/3">
                            <label  className="text-white" htmlFor="">Pseudo</label>
                            <input
                                type="text"
                                name="pseudo"
                                placeholder=" "
                                value={formData.pseudo}
                                onChange={handleChange}
                                required
                                className="w-full bg-white px-3 py-2 rounded-full shadow-sm focus:outline-none"
                            />
                            <label  className="text-white" htmlFor="">Votre avis</label>
                            <textarea
                                type="text"
                                name="pseudo"
                                placeholder=" "
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full bg-white px-3 py-2 mt-1 rounded-lg shadow-sm focus:outline-none"
                            />
                            <div className="text-right text-gray-500">
                                {charCount}/100
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Button1
                                type="submit"
                                texte="Enregistrer"
                            />
                        </div>
                    </form>
                </div>
            </div>

            {/* Mobile avis */}
            <div class="lg:hidden flex flex-col justify-center items-center w-full">
                <div style={{ maxWidth: '22rem' }} className='mt-16'>
                    <div class="w-full flex flex-col justify-center items-center">
                        <div class="px-4 py-4">
                            <h2 class="text-2xl font-extrabold text-custom-4">Ce que nos visiteurs disent de nous</h2>
                        </div>
                    </div>
                    <div className="scroll-container-avis mt-8">
                        <div className="scroll-content-avis">
                            {avis.map((avis, index) => (
                                <div key={index} className="scroll-item-avis relative group p-4 bg-white rounded-2xl shadow-md">
                                    <p className="font-bold">{avis.pseudo}</p>
                                    <p>{avis.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8 h-full w-full mt-8">
                        <div className="flex flex-col justify-center items-start gap-2 w-2/3">
                            <label className="text-white" htmlFor="">Pseudo</label>
                            <input
                                type="text"
                                name="pseudo"
                                placeholder=" "
                                value={formData.pseudo}
                                onChange={handleChange}
                                required
                                className="w-full bg-white px-3 py-2 rounded-full shadow-sm focus:outline-none"
                            />
                            <label  className="text-white" htmlFor="">Votre avis</label>
                            <textarea
                                type="text"
                                name="pseudo"
                                placeholder=" "
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full bg-white px-3 py-2 mt-1 rounded-lg shadow-sm focus:outline-none"
                            />
                            <div className="text-right text-gray-500">
                                {charCount}/100
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Button1
                                type="submit"
                                texte="Enregistrer"
                            />
                        </div>
                    </form>
                </div>
            </div>

            {/* Desktop Horaire */}
            <div class="hidden lg:flex flex-col justify-center items-center w-full">
                <div class="max-w-[70rem] mt-32">
                    <div class="w-full flex flex-col justify-center items-center">
                        <div class="px-4">
                          <h2 class="text-2xl font-extrabold text-custom-4">Nos horaires d'ouverture</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-flow-col-7 lg:grid-cols-7 gap-4 bg-white p-4 rounded-xl m-4">
                        {hours.map(hour => (
                            <div 
                                key={hour.id} 
                                className="bg-white p-4"
                            >
                                <h3 className="text-lg font-semibold mb-2">{hour.name}</h3>
                                <p className="text-sm text-gray-600">Debut: {hour.start.slice(0, 5)}</p>
                                <p className="text-sm text-gray-600">Fin: {hour.end.slice(0, 5)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Horaire */}
            <div class="lg:hidden flex flex-col justify-center items-center w-full">
                <div class="max-w-[70rem] mt-32">
                    <div class="w-full flex flex-col justify-center items-center">
                        <div class="px-4">
                          <h2 class="text-2xl font-extrabold text-custom-4">Nos horaires d'ouverture</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-flow-col-7 lg:grid-cols-7 gap-4 bg-white p-4 rounded-xl m-4">
                        {hours.map(hour => (
                            <div 
                                key={hour.id} 
                                className="bg-white p-4"
                            >
                                <h3 className="text-lg font-semibold mb-2">{hour.name}</h3>
                                <p className="text-sm text-gray-600">Debut: {hour.start.slice(0, 5)}</p>
                                <p className="text-sm text-gray-600">Fin: {hour.end.slice(0, 5)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}