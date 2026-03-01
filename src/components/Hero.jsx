import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.jpeg";

/* ===== Particle Field ===== */
function ParticleField() {
    const particles = useMemo(
        () =>
            Array.from({ length: 60 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                delay: Math.random() * 10,
                duration: 8 + Math.random() * 8,
                size: 1 + Math.random() * 2.5,
                drift: (Math.random() - 0.5) * 60,
                glow: Math.random() > 0.7,
            })),
        []
    );

    return (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    style={{
                        position: "absolute",
                        left: `${p.x}%`,
                        bottom: -10,
                        width: p.size,
                        height: p.size,
                        borderRadius: "50%",
                        background: p.glow ? "#39FF14" : "rgba(57,255,20,0.6)",
                        boxShadow: p.glow
                            ? `0 0 ${p.size * 4}px #39FF14, 0 0 ${p.size * 8}px rgba(57,255,20,0.3)`
                            : `0 0 ${p.size * 2}px rgba(57,255,20,0.4)`,
                    }}
                    animate={{
                        y: [0, -(typeof window !== "undefined" ? window.innerHeight + 20 : 820)],
                        x: [0, p.drift],
                        opacity: [0, 0.8, 0.8, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
}

/* ===== Ambient Glow Orbs ===== */
function AmbientOrbs() {
    return (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
            <motion.div
                style={{
                    position: "absolute",
                    top: "20%",
                    left: "15%",
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(57,255,20,0.04) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }}
                animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                style={{
                    position: "absolute",
                    bottom: "30%",
                    right: "10%",
                    width: 250,
                    height: 250,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(57,255,20,0.03) 0%, transparent 70%)",
                    filter: "blur(50px)",
                }}
                animate={{ x: [0, -30, 0], y: [0, 20, 0], scale: [1, 0.9, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
        </div>
    );
}

export default function Hero() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const img = new Image();
        img.src = logo;
        img.onload = () => setTimeout(() => setLoading(false), 1800);
        img.onerror = () => setLoading(false);
    }, []);

    return (
        <section
            id="hero"
            style={{
                position: "relative",
                width: "100%",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                background: "radial-gradient(ellipse at 50% 40%, rgba(0,77,26,0.08) 0%, #050505 60%)",
            }}
        >
            {/* Horizontal scan lines */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
                <motion.div
                    style={{ position: "absolute", left: 0, width: "100%", height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(57,255,20,0.15) 50%, transparent 100%)" }}
                    animate={{ top: ["-2%", "102%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    style={{ position: "absolute", left: 0, width: "100%", height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(57,255,20,0.08) 50%, transparent 100%)" }}
                    animate={{ top: ["102%", "-2%"] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <AmbientOrbs />
            <ParticleField />

            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div
                        key="loader"
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28, zIndex: 10 }}
                        exit={{ opacity: 0, scale: 0.7, filter: "blur(10px)" }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="alien-loader" />
                        <motion.p
                            style={{ color: "#39FF14", fontFamily: "'Orbitron', sans-serif", fontSize: "0.8rem", letterSpacing: "0.35em", fontWeight: 500 }}
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ duration: 1.8, repeat: Infinity }}
                        >
                            INITIALIZING OMNITRIX...
                        </motion.p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="hero-content"
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36, zIndex: 10, padding: "0 20px", textAlign: "center" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Logo with layered glow */}
                        <motion.div
                            style={{ position: "relative" }}
                            initial={{ scale: 0.5, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.1 }}
                        >
                            {/* Outer glow halo */}
                            <motion.div
                                style={{
                                    position: "absolute",
                                    inset: -20,
                                    borderRadius: 32,
                                    background: "radial-gradient(circle, rgba(57,255,20,0.08) 0%, transparent 70%)",
                                    filter: "blur(20px)",
                                }}
                                animate={{
                                    opacity: [0.5, 1, 0.5],
                                    scale: [0.95, 1.05, 0.95],
                                }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />

                            <motion.img
                                src={logo}
                                alt="Webtrix Rebuild"
                                style={{
                                    position: "relative",
                                    width: "clamp(280px, 42vw, 440px)",
                                    height: "auto",
                                    borderRadius: 24,
                                    border: "1.5px solid rgba(57,255,20,0.2)",
                                    display: "block",
                                }}
                                animate={{
                                    boxShadow: [
                                        "0 4px 40px rgba(57,255,20,0.12), 0 0 0 1px rgba(57,255,20,0.05)",
                                        "0 4px 60px rgba(57,255,20,0.25), 0 0 0 1px rgba(57,255,20,0.1)",
                                        "0 4px 40px rgba(57,255,20,0.12), 0 0 0 1px rgba(57,255,20,0.05)",
                                    ],
                                }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>

                        {/* Tagline */}
                        <motion.div
                            style={{ display: "flex", alignItems: "center", gap: 20 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                        >
                            <motion.div
                                style={{ width: 60, height: "1px", background: "linear-gradient(to right, transparent, rgba(57,255,20,0.5))" }}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 1, duration: 0.8 }}
                            />
                            <p style={{
                                color: "rgba(57,255,20,0.6)",
                                fontFamily: "'Orbitron', sans-serif",
                                fontSize: "0.9rem",
                                letterSpacing: "0.5em",
                                textTransform: "uppercase",
                                fontWeight: 500,
                            }}>
                                A Technical Event
                            </p>
                            <motion.div
                                style={{ width: 60, height: "1px", background: "linear-gradient(to left, transparent, rgba(57,255,20,0.5))" }}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 1, duration: 0.8 }}
                            />
                        </motion.div>

                        {/* Scroll CTA */}
                        <motion.div
                            style={{ position: "absolute", bottom: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                        >
                            <motion.span
                                style={{ color: "rgba(57,255,20,0.35)", fontSize: "0.7rem", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.3em" }}
                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 2.5, repeat: Infinity }}
                            >
                                EXPLORE
                            </motion.span>
                            <motion.div
                                style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(57,255,20,0.4), transparent)" }}
                                animate={{ scaleY: [0.6, 1, 0.6], opacity: [0.3, 0.7, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
