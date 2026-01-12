'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Quote, ArrowRight, Sparkles } from 'lucide-react';

export default function About() {
    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5" />

            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">

                {/* Image */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 relative group"
                >
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 aspect-[3/4]">
                        <img
                            src="https://tpoeahzwujcghqsjanon.supabase.co/storage/v1/object/public/ImagenPyC/PrincipePyC.jpg"
                            alt="Emiliano - El Príncipe"
                            className="w-full h-full object-cover object-[center_20%] grayscale group-hover:grayscale-0 group-active:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                    </div>
                    {/* Decor */}
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -z-10" />
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full md:w-1/2 space-y-8"
                >
                    <div>
                        <span className="text-amber-500 font-mono text-sm tracking-widest uppercase mb-2 block">El Blog del Príncipe</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-100">
                            La Voz del Sommelier
                        </h2>
                    </div>

                    <div className="relative">
                        <Quote className="absolute -top-4 -left-4 w-8 h-8 text-amber-900/40 transform -scale-x-100" />
                        <p className="text-slate-400 text-lg leading-relaxed font-light italic pl-4 border-l-2 border-amber-900/30">
                            "El vino no es solo una bebida, es una conversación. Aquí, como 'El Príncipe', traduzco el lenguaje secreto de la tierra para que cada descorche sea una experiencia inolvidable."
                        </p>
                    </div>

                    <div className="space-y-4 text-slate-400 font-light">
                        <p>
                            Soy <strong>Emiliano</strong> y junto a Fabián (<em>"El Centauro"</em>), fundamos <strong>Príncipe y Centauro</strong> para unir dos mundos: donde la elegancia refinada se encuentra con el vigor apasionado.
                        </p>
                        <p>
                            Este espacio digital es mi bitácora personal. Mientras Fabián sostiene los cimientos de nuestra visión, yo me dedico a explorar, catar y compartir contigo esas joyas enológicas que merecen ser descubiertas.
                        </p>
                    </div>

                    <div className="pt-8">
                        <Link href="/bitacora">
                            <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-950">
                                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#F59E0B_0%,#393BB2_50%,#F59E0B_100%)]" />
                                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-sm font-medium text-amber-500 backdrop-blur-3xl transition-all hover:bg-slate-900 gap-2">
                                    <Sparkles className="w-4 h-4 text-amber-300" />
                                    <span>Explorar Bitácora de Viaje</span>
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </span>
                            </button>
                        </Link>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
