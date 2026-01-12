'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero() {
    const scrollToCollection = () => {
        document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950 text-slate-100 selection:bg-amber-900 selection:text-white">

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-slate-950 to-slate-950" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />

            {/* Animated Spotlight Effect (simplified) */}
            <motion.div
                animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.2, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-600/20 rounded-full blur-[100px] pointer-events-none"
            />

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">

                {/* Logo Animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-8 relative group"
                >
                    <div className="relative w-48 h-48 md:w-64 md:h-64 filter drop-shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all duration-700 group-hover:drop-shadow-[0_0_25px_rgba(245,158,11,0.5)]">
                        <img
                            src="/logo-hero.png"
                            alt="Príncipe y Centauro Emblem"
                            className="w-full h-full object-contain invert mix-blend-screen"
                        />
                    </div>
                </motion.div>

                {/* Title Reveal */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight bg-gradient-to-r from-amber-100 via-amber-400 to-amber-600 bg-clip-text text-transparent pb-4 drop-shadow-sm"
                >
                    Príncipe y Centauro
                </motion.h1>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="flex items-center gap-4 w-full justify-center">
                        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-700"></div>
                        <p className="text-lg md:text-2xl text-slate-300 font-light tracking-[0.2em] uppercase">
                            Sommelier Intelligence
                        </p>
                        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-700"></div>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollToCollection}
                    className="mt-12 group relative px-8 py-4 bg-transparent overflow-hidden rounded-full border border-amber-600/50 text-amber-100 font-medium tracking-wide shadow-[0_0_20px_rgba(180,83,9,0.2)] hover:shadow-[0_0_30px_rgba(180,83,9,0.4)] transition-all"
                >
                    <div className="absolute inset-0 w-0 bg-gradient-to-r from-amber-700/80 to-amber-900/80 transition-all duration-[250ms] ease-out group-hover:w-full opacity-20" />
                    <span className="relative flex items-center gap-3">
                        Explorar Colección Privada <ArrowRight className="w-4 h-4" />
                    </span>
                </motion.button>

            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
            >
                <ChevronDown className="w-6 h-6 text-slate-600" />
            </motion.div>
        </section>
    );
}
