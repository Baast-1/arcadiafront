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

export default function NosServices() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        fetchServices();
    }, []);

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

    return (
        <div className="min-h-screen bg-gradient">
            <Header />
            {/* Desktop Services */}
            <div class="hidden lg:flex flex-col justify-center items-center w-full">
                <div class="max-w-[70rem] mt-40">
                    <div class="w-full flex flex-col justify-center items-center">
                        <div class="px-4 mb-16">
                            <h2 class="text-2xl font-extrabold text-custom-4">Nos Services</h2>
                        </div>
                    </div>
                    <div className="w-full overflow-hidden mt-4 grid grid-cols-1 gap-4 mb-4">
                        {services.map((service, index) => (
                            <div key={service.id} className={`relative w-full h-full group grid grid-cols-1 md:grid-cols-2 gap-4 ${index % 2 === 0 ? '' : 'md:grid-cols-2-reverse'}`}>
                                {index % 2 === 0 ? (
                                    <>
                                        <div className="flex flex-col justify-center items-start p-4">
                                            <h3 className="text-xl font-bold text-custom-4">{service.name}</h3>
                                            <p className="text-base text-custom-4 mt-2">{service.description}</p>
                                        </div>
                                        <div className="relative w-full h-full">
                                            <img 
                                                alt="main-picture" 
                                                className="w-full h-full object-cover object-bottom rounded-2xl" 
                                                src={service.pictures && service.pictures.length > 0 ? `${process.env.NEXT_PUBLIC_API_URL}${service.pictures[0].route}` : '/image.jpg'}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="relative w-full h-full">
                                            <img 
                                                alt="main-picture" 
                                                className="w-full h-full object-cover object-bottom rounded-2xl" 
                                                src={service.pictures && service.pictures.length > 0 ? `${process.env.NEXT_PUBLIC_API_URL}${service.pictures[0].route}` : '/image.jpg'}
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center items-start p-4">
                                            <h3 className="text-xl font-bold text-custom-4">{service.name}</h3>
                                            <p className="text-base text-custom-4 mt-2">{service.description}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Services */}
            <div class="lg:hidden flex flex-col justify-center items-center w-full">
                <div style={{ maxWidth: '22rem' }} className='mt-16'>
                    <div class="w-full flex flex-col justify-center items-center">
                        <div class="px-4 py-4">
                            <h2 class="text-2xl font-extrabold text-custom-4">Nos Services</h2>
                        </div>
                    </div>
                    <Swiper
                        effect={'cards'}
                        grabCursor={true}
                        modules={[EffectCards]}
                        className="mySwiper"
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
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
                    {services[activeIndex] && (
                        <div className="mt-4 text-center">
                            <h3 className="text-xl font-bold text-custom-4">{services[activeIndex].name}</h3>
                            <p className="text-base text-custom-4 mt-2">{services[activeIndex].description}</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}