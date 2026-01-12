'use client';

import React from 'react';
import { Instagram, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="bg-slate-950 pt-20 pb-10 border-t border-slate-900">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">

                {/* Logo or Brand Name */}
                <h3 className="text-2xl font-serif font-bold text-amber-500 mb-8 tracking-wider">
                    PRÍNCIPE Y CENTAURO
                </h3>

                {/* Social Icons */}
                <div className="flex gap-8 mb-12">
                    <SocialIcon href="https://www.instagram.com/principeycentauro/" icon={<Instagram strokeWidth={1.5} className="w-6 h-6" />} label="Instagram" />
                    <SocialIcon
                        href="https://wa.me/5492215545929"
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-6 h-6"
                            >
                                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                                <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                            </svg>
                        }
                        label="WhatsApp"
                    />
                    <SocialIcon href="mailto:info@principeycentauro.com" icon={<Mail strokeWidth={1.5} className="w-6 h-6" />} label="Email" />
                </div>

                {/* Copyright */}
                <div className="text-slate-600 text-sm font-light tracking-wide text-center">
                    <p className="flex items-center justify-center gap-2">
                        &copy; {new Date().getFullYear()} Príncipe y Centauro. Todos los derechos reservados.
                        <span title="Marca Registrada" className="text-blue-400">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </p>
                    <p className="mt-2 text-xs opacity-50">La Plata, Argentina.</p>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 flex items-center justify-center rounded-full border border-amber-600/30 text-amber-500 hover:bg-amber-900/20 hover:border-amber-500 transition-all duration-300"
            aria-label={label}
        >
            {icon}
        </motion.a>
    );
}
