import axios from 'axios';

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password });
        const { token } = response.data;
        console.log('API Response:', response.data);
        localStorage.setItem('token', token);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data.errorCode || 'Login failed');
    }
};

export const register = async (email, password) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/register`, { email, password });
        const { token } = response.data;
        console.log('Réponse de l\'API:', response.data);
        localStorage.setItem('token', token);
        return response;
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement:', error.message);
        if (error.response) {
            console.error('Réponse de l\'erreur:', error.response.data);
        }
        throw new Error(error.response?.data.errorCode || 'register failed');
    }
};

export const verifyToken = async (token) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-token`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Token verification error:', error.response?.data);
        throw new Error(error.response?.data.message || 'Token verification failed');
    }
};

export const logout = (router) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        router.push('/');
    }
};

export const getAuthenticatedUser = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching authenticated user:', error.response?.data); // Log the error
        return null;
    }
};