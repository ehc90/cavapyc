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
                    <p>&copy; {new Date().getFullYear()} Príncipe y Centauro. Todos los derechos reservados.</p>
                    <p className="mt-2 text-xs opacity-50">Mendoza, Argentina.</p>
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
