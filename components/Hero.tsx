'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wine, ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-slate-100 selection:bg-amber-900 selection:text-white">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-slate-950 to-slate-950 opacity-40" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center gap-6"
                >
                    {/* Logo / Icon */}
                    <div className="p-4 rounded-full bg-slate-900/50 border border-amber-900/30 backdrop-blur-sm shadow-2xl shadow-amber-900/10 mb-4">
                        <Wine className="w-8 h-8 text-amber-500" />
                    </div>

                    {/* Main Title */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700 bg-clip-text text-transparent pb-4">
                        Príncipe y Centauro
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                        Donde la enología clásica encuentra la vanguardia digital. <br className="hidden md:block" />
                        <span className="text-amber-500/80">Experiencia inmersiva próximamente.</span>
                    </p>

                    {/* CTA */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-8 px-8 py-3 bg-gradient-to-r from-amber-700 to-amber-900 rounded-full text-amber-50 font-medium tracking-wide shadow-lg shadow-amber-900/20 flex items-center gap-2 hover:shadow-amber-900/40 transition-shadow border border-amber-700/50"
                    >
                        Explorar Colección Privada <ArrowRight className="w-4 h-4" />
                    </motion.button>
                </motion.div>
            </div>

            {/* Footer / Status */}
            <div className="absolute bottom-10 left-0 w-full text-center">
                <p className="text-xs text-slate-600 uppercase tracking-[0.2em] font-medium">
                    High End Gastronomy &bull; AI Powered &bull; Est. 2025
                </p>
            </div>
        </section>
    );
}
