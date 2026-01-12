'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, Shield } from 'lucide-react';

export default function BodegaIudica() {
    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-amber-900/30 mb-6">
                            <Shield className="w-4 h-4 text-amber-500" />
                            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Aliados de Honor</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-slate-100 mb-6 leading-tight">
                            Nuestros Vinos Tienen <br /> <span className="text-amber-500">Origen & Apellido</span>
                        </h2>

                        <p className="text-lg text-slate-400 font-light mb-6 leading-relaxed">
                            En el reino de Príncipe y Centauro, la lealtad se paga con lealtad. Nuestros vinos provienen exclusivamente de <strong className="text-slate-200">Bodega Iúdica</strong>, un tesoro familiar en Maipú, Mendoza, que creyó en nuestro proyecto desde el primer día.
                        </p>

                        <p className="text-slate-400 font-light mb-10 leading-relaxed">
                            Ya sea su línea clásica o la prestigiosa gama <span className="text-amber-200">Nannu</span> —vinos hechos con paciencia y sabiduría—, cada botella que abrimos es garantía de excelencia (9.8/10). No es solo vino; es historia, accesibilidad y una calidez humana que nos hace sentir en casa.
                        </p>

                        <motion.a
                            href="https://vinodelorigen.com.ar/"
                            target="_blank"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-full font-bold shadow-lg shadow-amber-900/20 transition-all font-serif tracking-wide"
                        >
                            Visitar La Bodega <ExternalLink className="w-5 h-5" />
                        </motion.a>
                    </motion.div>

                    {/* Image/Visuals */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, rotate: 2 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full md:w-1/2 relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl group">
                            <div className="absolute inset-0 bg-amber-900/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
                            <img
                                src="https://eldescorchediario.com/wp-content/uploads/2020/09/I%C3%BAdica-3.jpg"
                                alt="Vinos Bodega Iúdica"
                                className="w-full h-auto object-cover grayscale group-hover:grayscale-0 group-active:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                            />
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute -bottom-6 -left-6 bg-slate-950 border border-amber-500/30 p-6 rounded-xl shadow-2xl z-20 flex items-center gap-4"
                        >
                            <Award className="w-10 h-10 text-amber-500" />
                            <div>
                                <h4 className="font-serif font-bold text-slate-100 text-lg">Etiqueta NANNU</h4>
                                <p className="text-xs text-amber-400 uppercase tracking-widest font-bold">Gama Premium</p>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
