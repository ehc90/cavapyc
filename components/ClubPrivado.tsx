'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, ArrowRight, Loader2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function ClubPrivado() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const subscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        try {
            await addDoc(collection(db, 'club_members'), {
                email,
                joinedAt: serverTimestamp(),
                source: 'web_footer'
            });
            setStatus('success');
            setEmail('');
        } catch (error) {
            console.error('Error joining club:', error);
            setStatus('error');
        }
    };

    return (
        <section id="club" className="py-24 bg-gradient-to-b from-slate-950 to-amber-950/20 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="bg-slate-900/50 backdrop-blur-xl border border-amber-900/30 p-12 rounded-3xl shadow-2xl"
                >
                    <Crown className="w-12 h-12 text-amber-500 mx-auto mb-6" />

                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-100 mb-4">
                        Club Privado
                    </h2>

                    <p className="text-slate-400 mb-8 max-w-lg mx-auto leading-relaxed">
                        Accede a cavas secretas, eventos exclusivos y preventas limitadas.
                        Sé el primero en saber cuando descorchamos algo único.
                    </p>

                    <form onSubmit={subscribe} className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Tu correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 bg-slate-950/80 border border-slate-700 rounded-full px-6 py-4 text-slate-200 outline-none focus:border-amber-500 transition-colors"
                            disabled={status === 'loading' || status === 'success'}
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading' || status === 'success'}
                            className="bg-amber-700 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20"
                        >
                            {status === 'loading' ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : status === 'success' ? (
                                '¡Bienvenido!'
                            ) : (
                                <>Unirme <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>
                    </form>

                    {status === 'success' && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 text-green-400 font-medium"
                        >
                            Has sido añadido a la lista de honor.
                        </motion.p>
                    )}
                </motion.div>

            </div>
        </section>
    );
}
