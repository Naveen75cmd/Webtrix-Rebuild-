import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Menu, X } from "lucide-react";

const NAV_LINKS = [
    { id: "hero", label: "Home" },
    { id: "event-details", label: "Details" },
    { id: "rules", label: "Rules" },
    { id: "registration", label: "Register" },
];

const MOBILE_BREAKPOINT = 768;

export default function Navbar() {
    const [active, setActive] = useState("hero");
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);

    /* Track resize for mobile detection */
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    /* Track scroll for bg */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* Track active section */
    useEffect(() => {
        const observers = [];
        NAV_LINKS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (!el) return;
            const observer = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActive(id); },
                { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
            );
            observer.observe(el);
            observers.push(observer);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, []);

    const linkStyle = (id) => ({
        color: active === id ? "#39FF14" : "rgba(255,255,255,0.5)",
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "0.82rem",
        fontWeight: active === id ? 600 : 400,
        letterSpacing: "0.06em",
        textDecoration: "none",
        padding: "6px 16px",
        borderRadius: 9999,
        border: active === id ? "1px solid rgba(57,255,20,0.5)" : "1px solid transparent",
        background: active === id ? "rgba(0,77,26,0.25)" : "transparent",
        boxShadow: active === id ? "0 0 12px rgba(57,255,20,0.15)" : "none",
        transition: "all 0.3s ease",
        cursor: "pointer",
    });

    return (
        <>
            <motion.nav
                initial={{ y: -80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    padding: "0 clamp(16px, 4vw, 48px)",
                    height: 64,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: scrolled ? "rgba(5,5,5,0.85)" : "transparent",
                    backdropFilter: scrolled ? "blur(20px)" : "none",
                    WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
                    borderBottom: scrolled ? "1px solid rgba(57,255,20,0.06)" : "none",
                    transition: "background 0.3s, backdrop-filter 0.3s",
                }}
            >
                {/* Brand */}
                <a
                    href="#hero"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        textDecoration: "none",
                    }}
                >
                    <Zap
                        size={22}
                        color="#39FF14"
                        strokeWidth={2.5}
                        style={{ filter: "drop-shadow(0 0 8px rgba(57,255,20,0.5))" }}
                    />
                    <span
                        style={{
                            color: "#39FF14",
                            fontFamily: "'Orbitron', sans-serif",
                            fontSize: "1rem",
                            fontWeight: 700,
                            letterSpacing: "0.12em",
                            textShadow: "0 0 10px rgba(57,255,20,0.3)",
                        }}
                    >
                        WEBTRIX
                    </span>
                </a>

                {/* Desktop links — only rendered on desktop */}
                {!isMobile && (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                        }}
                    >
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.id}
                                href={`#${link.id}`}
                                style={linkStyle(link.id)}
                                onClick={() => setActive(link.id)}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                )}

                {/* Mobile hamburger — only rendered on mobile */}
                {isMobile && (
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#39FF14",
                            padding: 8,
                        }}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                )}
            </motion.nav>

            {/* Mobile drawer */}
            <AnimatePresence>
                {mobileOpen && isMobile && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        style={{
                            position: "fixed",
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: "min(280px, 75vw)",
                            zIndex: 60,
                            background: "rgba(5,5,5,0.97)",
                            backdropFilter: "blur(24px)",
                            WebkitBackdropFilter: "blur(24px)",
                            borderLeft: "1px solid rgba(57,255,20,0.12)",
                            display: "flex",
                            flexDirection: "column",
                            padding: "100px 32px 40px",
                            gap: 12,
                        }}
                    >
                        {/* Close button inside drawer */}
                        <button
                            onClick={() => setMobileOpen(false)}
                            style={{
                                position: "absolute",
                                top: 20,
                                right: 20,
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "#39FF14",
                                padding: 8,
                            }}
                            aria-label="Close menu"
                        >
                            <X size={24} />
                        </button>

                        {NAV_LINKS.map((link, i) => (
                            <motion.a
                                key={link.id}
                                href={`#${link.id}`}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.08, duration: 0.3 }}
                                style={{
                                    ...linkStyle(link.id),
                                    fontSize: "1.1rem",
                                    padding: "14px 24px",
                                    borderRadius: 14,
                                }}
                                onClick={() => {
                                    setActive(link.id);
                                    setMobileOpen(false);
                                }}
                            >
                                {link.label}
                            </motion.a>
                        ))}

                        {/* Decorative footer */}
                        <div style={{ marginTop: "auto", paddingTop: 24, borderTop: "1px solid rgba(57,255,20,0.06)" }}>
                            <p style={{ color: "rgba(57,255,20,0.15)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em" }}>
                                // OMNITRIX NAVIGATION v3.0
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop */}
            <AnimatePresence>
                {mobileOpen && isMobile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 55,
                            background: "rgba(0,0,0,0.6)",
                        }}
                        onClick={() => setMobileOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
