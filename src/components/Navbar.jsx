import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const NAV_LINKS = [
    { label: "Home", href: "#hero", id: "hero" },
    { label: "Details", href: "#event-details", id: "event-details" },
    { label: "Rules", href: "#rules", id: "rules" },
    { label: "Register", href: "#registration", id: "registration" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");

    /* Track scroll position for navbar visibility */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* Track active section via IntersectionObserver */
    useEffect(() => {
        const observers = [];
        NAV_LINKS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (!el) return;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveSection(id);
                },
                { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
            );
            observer.observe(el);
            observers.push(observer);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, []);

    /* Close menu on nav click */
    const handleClick = () => setMenuOpen(false);

    return (
        <>
            {/* ===== FIXED NAVBAR ===== */}
            <AnimatePresence>
                {scrolled && (
                    <motion.header
                        initial={{ y: -80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -80, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            zIndex: 45,
                            padding: "0 24px",
                        }}
                    >
                        <nav
                            style={{
                                maxWidth: 1200,
                                margin: "12px auto 0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "12px 24px",
                                borderRadius: 16,
                                background: "linear-gradient(135deg, rgba(2,18,4,0.88), rgba(5,5,5,0.92))",
                                backdropFilter: "blur(24px)",
                                WebkitBackdropFilter: "blur(24px)",
                                border: "1px solid rgba(57,255,20,0.08)",
                                boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
                            }}
                        >
                            {/* Logo / Brand */}
                            <a
                                href="#hero"
                                onClick={handleClick}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    textDecoration: "none",
                                }}
                            >
                                <Zap size={18} color="#39FF14" strokeWidth={2} />
                                <span
                                    style={{
                                        color: "#39FF14",
                                        fontFamily: "'Orbitron', sans-serif",
                                        fontSize: "0.82rem",
                                        fontWeight: 700,
                                        letterSpacing: "0.1em",
                                    }}
                                >
                                    WEBTRIX
                                </span>
                            </a>

                            {/* Desktop links */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                }}
                                className="nav-desktop"
                            >
                                {NAV_LINKS.map((link) => {
                                    const isActive = activeSection === link.id;
                                    return (
                                        <a
                                            key={link.id}
                                            href={link.href}
                                            onClick={handleClick}
                                            style={{
                                                padding: "8px 18px",
                                                borderRadius: 9999,
                                                color: isActive ? "#39FF14" : "rgba(57,255,20,0.5)",
                                                fontFamily: "'Orbitron', sans-serif",
                                                fontSize: "0.68rem",
                                                letterSpacing: "0.12em",
                                                textDecoration: "none",
                                                fontWeight: 600,
                                                transition: "all 0.25s ease",
                                                background: isActive ? "rgba(57,255,20,0.08)" : "transparent",
                                                border: isActive
                                                    ? "1px solid rgba(57,255,20,0.2)"
                                                    : "1px solid transparent",
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isActive) {
                                                    e.currentTarget.style.color = "rgba(57,255,20,0.7)";
                                                    e.currentTarget.style.background = "rgba(57,255,20,0.04)";
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isActive) {
                                                    e.currentTarget.style.color = "rgba(57,255,20,0.5)";
                                                    e.currentTarget.style.background = "transparent";
                                                }
                                            }}
                                        >
                                            {link.label}
                                        </a>
                                    );
                                })}
                            </div>

                            {/* Hamburger button (mobile) */}
                            <motion.button
                                className="nav-hamburger"
                                onClick={() => setMenuOpen((v) => !v)}
                                whileTap={{ scale: 0.9 }}
                                style={{
                                    display: "none",
                                    width: 40,
                                    height: 40,
                                    borderRadius: 10,
                                    border: "1px solid rgba(57,255,20,0.15)",
                                    background: "rgba(57,255,20,0.04)",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                }}
                            >
                                {menuOpen ? (
                                    <X size={20} color="#39FF14" />
                                ) : (
                                    <Menu size={20} color="#39FF14" />
                                )}
                            </motion.button>
                        </nav>
                    </motion.header>
                )}
            </AnimatePresence>

            {/* ===== MOBILE DRAWER ===== */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMenuOpen(false)}
                            style={{
                                position: "fixed",
                                inset: 0,
                                zIndex: 44,
                                background: "rgba(0,0,0,0.6)",
                                backdropFilter: "blur(4px)",
                            }}
                        />
                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            style={{
                                position: "fixed",
                                top: 0,
                                right: 0,
                                width: "min(300px, 80vw)",
                                height: "100vh",
                                zIndex: 46,
                                background: "linear-gradient(180deg, rgba(2,18,4,0.95), rgba(5,5,5,0.98))",
                                borderLeft: "1px solid rgba(57,255,20,0.1)",
                                padding: "80px 32px 40px",
                                display: "flex",
                                flexDirection: "column",
                                gap: 8,
                            }}
                        >
                            {/* Close */}
                            <motion.button
                                onClick={() => setMenuOpen(false)}
                                whileTap={{ scale: 0.9 }}
                                style={{
                                    position: "absolute",
                                    top: 20,
                                    right: 20,
                                    width: 40,
                                    height: 40,
                                    borderRadius: 10,
                                    border: "1px solid rgba(57,255,20,0.15)",
                                    background: "rgba(57,255,20,0.04)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                }}
                            >
                                <X size={20} color="#39FF14" />
                            </motion.button>

                            {NAV_LINKS.map((link, i) => {
                                const isActive = activeSection === link.id;
                                return (
                                    <motion.a
                                        key={link.id}
                                        href={link.href}
                                        onClick={handleClick}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.08 }}
                                        style={{
                                            padding: "16px 20px",
                                            borderRadius: 14,
                                            color: isActive ? "#39FF14" : "rgba(255,255,255,0.5)",
                                            fontFamily: "'Orbitron', sans-serif",
                                            fontSize: "0.85rem",
                                            letterSpacing: "0.12em",
                                            textDecoration: "none",
                                            fontWeight: 600,
                                            background: isActive
                                                ? "rgba(57,255,20,0.08)"
                                                : "transparent",
                                            borderLeft: isActive
                                                ? "3px solid #39FF14"
                                                : "3px solid transparent",
                                            transition: "all 0.2s ease",
                                        }}
                                    >
                                        {link.label}
                                    </motion.a>
                                );
                            })}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* ===== RESPONSIVE CSS ===== */}
            <style>{`
        @media (min-width: 641px) {
          .nav-desktop { display: flex !important; }
          .nav-hamburger { display: none !important; }
        }
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
        </>
    );
}

