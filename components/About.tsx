'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

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
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 aspect-[3/4] md:aspect-square">
                        <img
                            src="https://tpoeahzwujcghqsjanon.supabase.co/storage/v1/object/public/ImagenPyC/PrincipePyC.jpg"
                            alt="El Sommelier - Príncipe y Centauro"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
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
                        <span className="text-amber-500 font-mono text-sm tracking-widest uppercase mb-2 block">El Sommelier</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-100">
                            Detrás de la Copa
                        </h2>
                    </div>

                    <div className="relative">
                        <Quote className="absolute -top-4 -left-4 w-8 h-8 text-amber-900/40 transform -scale-x-100" />
                        <p className="text-slate-400 text-lg leading-relaxed font-light italic pl-4 border-l-2 border-amber-900/30">
                            "El vino no es solo una bebida, es una conversación entre la tierra, el tiempo y quien lo disfruta. Mi misión es traducir ese lenguaje secreto para que cada descorche sea una experiencia inolvidable."
                        </p>
                    </div>

                    <div className="space-y-4 text-slate-400 font-light">
                        <p>
                            Soy el creador de <strong>Príncipe y Centauro</strong>. Este proyecto nace de mi pasión por descubrir y compartir joyas enológicas que a menudo pasan desapercibidas.
                        </p>
                        <p>
                            Mi enfoque combina la rigurosidad técnica del sommelier con la calidez de un anfitrión. Aquí no encontrarás esnobismo, solo la búsqueda incansable de la excelencia y el placer compartido.
                        </p>
                    </div>

                    <div className="pt-4">
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
