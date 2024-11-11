'use client';

import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export let updateUserRole;

export const UserProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null);

    updateUserRole = () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserRole(decodedToken.user.role);
                setUserId(decodedToken.user.id);
            } catch (err) {
                setError(`Erreur lors du décodage du token: ${err.message}`);
            }
        } else {
            setUserRole(null);
            setUserId(null);
        }
    };

    useEffect(() => {
        updateUserRole();

        const handleStorageChange = (event) => {
            if (event.key === 'token') {
                console.log('Storage change detected:', event.key, event.newValue);
                updateUserRole();
            }
        };
        
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <UserContext.Provider value={{ userRole, userId, error }}>
            {children}
        </UserContext.Provider>
    );
};
