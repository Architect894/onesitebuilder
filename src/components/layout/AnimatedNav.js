"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useScroll } from "framer-motion";
import { useState, useEffect } from "react";

const navItems = [
    { href: "/", label: "Home" },
    { href: "/login", label: "Log In" },
    { href: "/signup", label: "Sign Up" },
    { href: "/app", label: "Dashboard" },
];

const NavLink = ({ href, label }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={href}>
            <motion.div
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="relative cursor-pointer group"
            >
                <motion.span 
                    className="text-xl font-medium text-gray-200 group-hover:text-amber-100 transition-colors duration-300 block"
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                >
                    {label}
                </motion.span>
                <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-100 via-amber-200 to-amber-200 shadow-lg shadow-amber-200/30"
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? "100%" : 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                />
            </motion.div>
        </Link>
    );
};

export default function AnimatedNav() {
    const { scrollY } = useScroll();
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        let timeout;
        const unsubscribe = scrollY.onChange((latest) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setHasScrolled(latest > 50);
            }, 100);
        });
        return () => {
            clearTimeout(timeout);
            unsubscribe();
        };
    }, [scrollY]);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`sticky top-0 z-50 border-b transition-all duration-300 backdrop-blur-xl ${
                    hasScrolled
                    ? "border-amber-200/40 bg-gradient-to-b from-gray-950 to-gray-900/90 shadow-xl shadow-amber-200/20"
                    : "border-amber-200/20 bg-gray-900/50"
                }`}
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 group">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", type: "spring" }}
                    whileHover={{ scale: 1.03, rotate: 1 }}
                    className="relative"
                >
                    <Link href="/">
                        <motion.img
                            src="/simplepeekwhite.png"
                            alt="Simple Peek"
                            className="h-30 w-auto cursor-pointer relative z-10"
                            whileHover={{ filter: "drop-shadow(0 0 8px rgba(212, 165, 116, 0.3))" }}
                            transition={{ duration: 0.3 }}
                        />
                    </Link>
                </motion.div>

                {/* Nav Links */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="flex gap-8"
                >
                    {navItems.map((item, index) => (
                        <motion.div
                            key={item.href}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.3 + index * 0.1,
                                ease: "easeOut",
                            }}
                        >
                            <NavLink href={item.href} label={item.label} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator glow */}
            {hasScrolled && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent shadow-lg shadow-amber-200/30"
                />
            )}
        </motion.nav>
    );
}
