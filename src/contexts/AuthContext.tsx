'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { STORAGE_KEYS } from '@/lib/constants';

/** Superset of SDK's AuthResponse.customer and CustomerProfile */
export interface AuthCustomer {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    phone?: string | null;
}

interface AuthContextValue {
    customer: AuthCustomer | null;
    token: string | null;
    isAuthenticated: boolean;
    setAuth: (token: string, customer: AuthCustomer) => void;
    logout: () => void;
    updateCustomer: (data: Partial<AuthCustomer>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [customer, setCustomer] = useState<AuthCustomer | null>(null);

    // Restore auth state from localStorage on mount
    useEffect(() => {
        try {
            const storedToken = localStorage.getItem(STORAGE_KEYS.CUSTOMER_TOKEN);
            const storedCustomer = localStorage.getItem('zev_customer_profile');
            if (storedToken && storedCustomer) {
                setToken(storedToken);
                setCustomer(JSON.parse(storedCustomer));
            }
        } catch {
            // Ignore parse errors
        }
    }, []);

    const setAuth = useCallback((newToken: string, newCustomer: AuthCustomer) => {
        setToken(newToken);
        setCustomer(newCustomer);
        localStorage.setItem(STORAGE_KEYS.CUSTOMER_TOKEN, newToken);
        localStorage.setItem('zev_customer_profile', JSON.stringify(newCustomer));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setCustomer(null);
        localStorage.removeItem(STORAGE_KEYS.CUSTOMER_TOKEN);
        localStorage.removeItem('zev_customer_profile');
    }, []);

    const updateCustomer = useCallback((data: Partial<AuthCustomer>) => {
        setCustomer(prev => {
            if (!prev) return prev;
            const updated = { ...prev, ...data };
            localStorage.setItem('zev_customer_profile', JSON.stringify(updated));
            return updated;
        });
    }, []);

    return (
        <AuthContext.Provider value={{ customer, token, isAuthenticated: !!token, setAuth, logout, updateCustomer }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
