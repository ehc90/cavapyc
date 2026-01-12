'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, ArrowRight } from 'lucide-react';

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
                            className="w-full h-full object-cover object-[center_20%] grayscale group-hover:grayscale-0 transition-all duration-700"
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
                            Soy <strong>Emiliano</strong>. Junto a mi socio Fabián (<em>"El Centauro"</em>), fundamos <strong>Príncipe y Centauro</strong> para unir dos mundos: la excelencia técnica y la fuerza de la tradición.
                        </p>
                        <p>
                            Este espacio digital es mi bitácora personal. Mientras Fabián sostiene los cimientos de nuestra visión, yo me dedico a explorar, catar y compartir contigo esas joyas enológicas que merecen ser descubiertas.
                        </p>
                    </div>

                    <div className="pt-6 flex flex-col sm:flex-row gap-6 items-center">
                        <button className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-amber-500 border border-amber-900/50 rounded-full transition-all text-sm tracking-wider uppercase flex items-center gap-2 group">
                            <span>Ir a Bitácora de Viaje</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <img
                            src="/logo-hero.png"
                            alt="Firma"
                            className="h-16 opacity-50 invert mix-blend-screen"
                        />
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
