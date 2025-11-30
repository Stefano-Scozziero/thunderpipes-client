import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const API_URL = import.meta.env.VITE_API_URL || "https://thunderpipes-server.onrender.com";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/auth/check`, { withCredentials: true });
            setUser(res.data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        try {
            const res = await axios.post(`${API_URL}/api/auth/login`,
                { username, password },
                { withCredentials: true }
            );
            setUser(res.data.user);
            toast.success("Bienvenido al Garage");
            return res.data.user;
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.error || "Error al iniciar sesión");
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            await axios.post(`${API_URL}/api/auth/register`, userData);
            toast.success("Registro exitoso. Por favor inicia sesión.");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.error || "Error al registrarse");
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
            setUser(null);
            toast.success("Sesión cerrada");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
