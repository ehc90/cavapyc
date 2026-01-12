'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Wine, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple MVP Auth - In a real production app we would use NextAuth
        if (password === 'principe2025') {
            // Set a simple session marker
            sessionStorage.setItem('isAdmin', 'true');
            router.push('/admin/dashboard');
        } else {
            setError(true);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-slate-950 to-slate-950" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-md relative z-10 shadow-2xl"
            >
                <div className="text-center mb-8">
                    <div className="inline-block p-3 rounded-full bg-slate-800 border border-slate-700 mb-4">
                        <Lock className="w-6 h-6 text-amber-500" />
                    </div>
                    <h1 className="text-2xl font-serif font-bold text-white">Acceso Privado</h1>
                    <p className="text-sm text-slate-500 mt-2">Área restringida para El Príncipe</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Contraseña Maestra</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setError(false); }}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors"
                            placeholder="••••••••"
                        />
                        {error && <p className="text-red-500 text-xs mt-2">Credenciales incorrectas.</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        Ingresar <Wine className="w-4 h-4" />
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
