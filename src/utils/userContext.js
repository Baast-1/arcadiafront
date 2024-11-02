'use client';

import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserRole(decodedToken.user.role);
                setUserId(decodedToken.user.id);
            } catch (err) {
                setError(`Erreur lors du décodage du token: ${err.message}`);
            }
        }
    }, []);

    return (
        <UserContext.Provider value={{ userRole, userId, error }}>
            {children}
        </UserContext.Provider>
    );
};