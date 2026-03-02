import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, ChevronRight, Power, Clock, Ban, Globe, Users, Laptop, Target, AlertTriangle, Package } from "lucide-react";
import { rules } from "../data/eventData";
const ICON_MAP = {
    1: Power,
    2: Clock,
    3: Ban,
    4: Globe,
    5: Users,
    6: Laptop,
    7: Target,
    8: AlertTriangle,
    9: Package,
};

function TypingRule({ rule, index, isVisible }) {
    const Icon = ICON_MAP[rule.id] || Power;
    const [displayedText, setDisplayedText] = useState("");
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (!isVisible) return;
        const delay = index * 180;
        const timeout = setTimeout(() => {
            let i = 0;
            const interval = setInterval(() => {
                if (i <= rule.text.length) {
                    setDisplayedText(rule.text.slice(0, i));
                    i++;
                } else {
                    setDone(true);
                    clearInterval(interval);
                }
            }, 14);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timeout);
    }, [isVisible, rule.text, index]);

    return (
        <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
            style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                padding: "14px 20px",
                borderRadius: 12,
                transition: "all 0.3s ease",
                borderLeft: "2px solid transparent",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(57,255,20,0.03)";
                e.currentTarget.style.borderLeftColor = "rgba(57,255,20,0.3)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderLeftColor = "transparent";
            }}
        >
            {/* Line number */}
            <span style={{
                color: "rgba(57,255,20,0.2)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.8rem",
                marginTop: 3,
                userSelect: "none",
                minWidth: "2.5ch",
                textAlign: "right",
            }}>
                {String(index + 1).padStart(2, "0")}
            </span>

            {/* Emoji / Icon */}
            <span style={{ marginTop: 2, flexShrink: 0, display: "flex", alignItems: "center" }}>
                <Icon size={16} color="#39FF14" strokeWidth={2} style={{ filter: "drop-shadow(0 0 5px rgba(57,255,20,0.6))" }} />
            </span>

            {/* Text */}
            <span style={{
                color: done ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.85)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                transition: "color 0.3s",
            }}>
                {displayedText}
                {!done && (
                    <motion.span
                        style={{
                            display: "inline-block",
                            width: 7,
                            height: 15,
                            background: "#39FF14",
                            marginLeft: 2,
                            verticalAlign: "middle",
                            borderRadius: 1,
                        }}
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                    />
                )}
            </span>
        </motion.div>
    );
}

export default function RulesMatrix() {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="rules"
            ref={ref}
            style={{
                position: "relative",
                padding: "120px 24px",
                background: "linear-gradient(180deg, #050505 0%, rgba(2,18,4,0.5) 50%, #050505 100%)",
                overflow: "hidden",
            }}
        >
            {/* Vertical Glowing Progress Bar */}
            <motion.div
                style={{
                    position: "absolute",
                    right: 24,
                    top: "15%",
                    bottom: "15%",
                    width: 4,
                    borderRadius: 4,
                    background: "rgba(57,255,20,0.1)",
                    border: "1px solid rgba(57,255,20,0.2)",
                    boxShadow: "0 0 10px rgba(57,255,20,0.1)",
                    overflow: "hidden",
                }}
            >
                <motion.div
                    style={{
                        width: "100%",
                        background: "linear-gradient(180deg, transparent, #39FF14, #39FF14)",
                        boxShadow: "0 0 15px #39FF14",
                        borderRadius: 4,
                        originY: 0,
                    }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ margin: "-100px" }}
                    transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                />
            </motion.div>
            {/* Section header */}
            <motion.div
                style={{ textAlign: "center", marginBottom: 56, maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
            >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 20 }}>
                    <div style={{ height: "1px", width: 50, background: "linear-gradient(to right, transparent, rgba(57,255,20,0.4))" }} />
                    <span style={{ color: "rgba(57,255,20,0.45)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase" }}>
                        Operational Parameters
                    </span>
                    <div style={{ height: "1px", width: 50, background: "linear-gradient(to left, transparent, rgba(57,255,20,0.4))" }} />
                </div>
                <h2 className="text-glow-sm" style={{ color: "#39FF14", fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700, letterSpacing: "0.05em" }}>
                    RULES MATRIX
                </h2>
            </motion.div>

            {/* Terminal */}
            <motion.div
                className="glass-bright"
                style={{
                    maxWidth: 800,
                    margin: "0 auto",
                    overflow: "hidden",
                    border: "1px solid rgba(57,255,20,0.1)",
                    borderRadius: 20,
                    boxShadow: "0 8px 60px rgba(0,0,0,0.4), 0 0 30px rgba(57,255,20,0.04)",
                }}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
            >
                {/* Terminal bar */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "14px 24px",
                    borderBottom: "1px solid rgba(57,255,20,0.06)",
                    background: "linear-gradient(90deg, rgba(57,255,20,0.04), transparent)",
                }}>
                    <div style={{ display: "flex", gap: 7 }}>
                        <div style={{ width: 11, height: 11, borderRadius: "50%", background: "rgba(255,95,87,0.7)" }} />
                        <div style={{ width: 11, height: 11, borderRadius: "50%", background: "rgba(255,189,46,0.7)" }} />
                        <div style={{ width: 11, height: 11, borderRadius: "50%", background: "rgba(57,255,20,0.7)" }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 12 }}>
                        <Terminal size={13} color="rgba(57,255,20,0.5)" />
                        <span style={{ color: "rgba(57,255,20,0.4)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.82rem" }}>
                            omnitrix
                        </span>
                    </div>
                    <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
                        <ChevronRight size={12} color="rgba(57,255,20,0.3)" />
                        <span style={{ color: "rgba(57,255,20,0.3)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}>
                            cat /rules/matrix.conf
                        </span>
                    </div>
                </div>

                {/* Body */}
                <div style={{ padding: "20px 16px 28px" }}>
                    {rules.map((rule, i) => (
                        <TypingRule key={rule.id} rule={rule} index={i} isVisible={isVisible} />
                    ))}

                    {/* Prompt */}
                    <motion.div
                        style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(57,255,20,0.06)", paddingLeft: 20 }}
                        initial={{ opacity: 0 }}
                        animate={isVisible ? { opacity: 1 } : {}}
                        transition={{ delay: 2.5 }}
                    >
                        <span style={{ color: "rgba(57,255,20,0.35)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem" }}>
                            <span style={{ color: "rgba(57,255,20,0.25)" }}>webtrix</span>
                            <span style={{ color: "rgba(57,255,20,0.15)" }}>@</span>
                            <span style={{ color: "rgba(57,255,20,0.25)" }}>omnitrix</span>
                            <span style={{ color: "rgba(57,255,20,0.15)" }}>:~$ </span>
                            <motion.span
                                style={{ display: "inline-block", width: 7, height: 14, background: "rgba(57,255,20,0.5)", verticalAlign: "middle", borderRadius: 1 }}
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                            />
                        </span>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
