import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
        img.onload = () => setTimeout(() => setLoading(false), 800);
        img.onerror = () => setLoading(false);
    }, []);

    return (
        <section
            id="hero"
            style={{
                position: "relative",
                width: "100%",
                minHeight: "100vh",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                background: "radial-gradient(ellipse at 50% 50%, rgba(0,77,26,0.1) 0%, transparent 70%)",
            }}
        >
            <AmbientOrbs />
            <ParticleField />

            {/* HEADER (Top Left) */}
            <motion.div
                style={{
                    position: "absolute",
                    top: 100,
                    left: "max(5vw, 24px)",
                    zIndex: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 16
                }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                {/* Glowing Green Omnitrix Logo placeholder */}
                <div style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    border: "2px solid #39FF14",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(57,255,20,0.1)",
                    boxShadow: "0 0 20px rgba(57,255,20,0.4), inset 0 0 10px rgba(57,255,20,0.2)"
                }}>
                    <div style={{ width: 30, height: 30, background: "#39FF14", clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)" }} />
                </div>
                <div>
                    <h2 style={{
                        color: "#39FF14",
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
                        letterSpacing: "0.15em",
                        fontWeight: 700,
                        textShadow: "0 0 15px rgba(57,255,20,0.5)"
                    }}>
                        TECHNICAL EVENTS
                    </h2>
                    <p style={{
                        color: "rgba(255,255,255,0.7)",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "clamp(0.7rem, 1vw, 0.85rem)",
                        letterSpacing: "0.08em",
                        marginTop: 4
                    }}>
                        SHOWCASE YOUR SKILLS. THINK FAST. BUILD SMARTER.
                    </p>
                </div>
            </motion.div>

            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div
                        key="loader"
                        style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28, zIndex: 10 }}
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
                        style={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 10,
                            padding: "60px 20px",
                            marginTop: 40 // offset for the header
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "clamp(20px, 4vw, 60px)" }}>

                            {/* Left Nav Button */}
                            <motion.button
                                whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(57,255,20,0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    width: 60, height: 60, borderRadius: "50%", flexShrink: 0,
                                    border: "2px solid #39FF14", background: "rgba(5,5,5,0.6)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    cursor: "pointer", boxShadow: "0 0 15px rgba(57,255,20,0.2)",
                                    backdropFilter: "blur(10px)", color: "#39FF14"
                                }}
                            >
                                <ChevronLeft size={32} strokeWidth={2} />
                            </motion.button>

                            {/* Central Card */}
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 40 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.4 }}
                                style={{
                                    position: "relative",
                                    padding: 2,
                                    borderRadius: 32,
                                    background: "linear-gradient(135deg, rgba(57,255,20,0.8), rgba(0,77,26,0.5))",
                                    boxShadow: "0 0 60px rgba(57,255,20,0.25), 0 0 120px rgba(57,255,20,0.1)",
                                }}
                            >
                                {/* The glowing circuit board inner background */}
                                <div style={{
                                    background: "radial-gradient(ellipse at center, rgba(57,255,20,0.15) 0%, #050505 100%)",
                                    borderRadius: 30,
                                    overflow: "hidden",
                                    position: "relative",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: 16,
                                    border: "1px solid rgba(57,255,20,0.2)",
                                    width: "clamp(300px, 50vw, 800px)",
                                }}>
                                    {/* Energy beam effect */}
                                    <motion.div
                                        style={{
                                            position: "absolute",
                                            width: "10%",
                                            height: "150%",
                                            background: "linear-gradient(90deg, transparent, rgba(57,255,20,0.4), transparent)",
                                            filter: "blur(20px)",
                                            transform: "rotate(25deg)",
                                        }}
                                        animate={{ x: ["-500%", "500%"] }}
                                        transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                                    />
                                    <img
                                        src={logo}
                                        alt="Webtrix Rebuild"
                                        style={{
                                            position: "relative",
                                            width: "100%",
                                            height: "auto",
                                            objectFit: "cover",
                                            borderRadius: 20,
                                            boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
                                            zIndex: 2,
                                        }}
                                    />
                                </div>
                            </motion.div>

                            {/* Right Nav Button */}
                            <motion.button
                                whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(57,255,20,0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    width: 60, height: 60, borderRadius: "50%", flexShrink: 0,
                                    border: "2px solid #39FF14", background: "rgba(5,5,5,0.6)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    cursor: "pointer", boxShadow: "0 0 15px rgba(57,255,20,0.2)",
                                    backdropFilter: "blur(10px)", color: "#39FF14"
                                }}
                            >
                                <ChevronRight size={32} strokeWidth={2} />
                            </motion.button>
                        </div>

                        {/* Scroll CTA */}
                        <motion.div
                            style={{ position: "absolute", bottom: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, left: "50%", transform: "translateX(-50%)" }}
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
