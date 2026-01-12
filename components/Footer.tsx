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
                    <SocialIcon href="https://instagram.com" icon={<Instagram />} label="Instagram" />
                    <SocialIcon href="https://wa.me/your-number" icon={<Phone />} label="WhatsApp" />
                    <SocialIcon href="mailto:contacto@principeycentauro.com" icon={<Mail />} label="Email" />
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
            {React.cloneElement(icon as React.ReactElement, { strokeWidth: 1.5, className: "w-6 h-6" })}
        </motion.a>
    );
}
