import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";

export default function Registration() {
    return (
        <section
            id="registration"
            style={{
                position: "relative",
                padding: "140px 24px",
                overflow: "hidden",
                background: "linear-gradient(180deg, #050505 0%, rgba(2,18,4,0.5) 40%, #050505 100%)",
            }}
        >
            {/* Energy field background  */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                {/* Center glow */}
                <motion.div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 500,
                        height: 500,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(57,255,20,0.06) 0%, transparent 60%)",
                        filter: "blur(60px)",
                    }}
                    animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Horizontal accent lines */}
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(57,255,20,0.12), transparent)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(57,255,20,0.12), transparent)" }} />
            </div>

            <motion.div
                style={{
                    position: "relative",
                    zIndex: 10,
                    maxWidth: 640,
                    margin: "0 auto",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                {/* Status badge */}
                <motion.div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "8px 20px",
                        borderRadius: 9999,
                        border: "1px solid rgba(57,255,20,0.15)",
                        background: "rgba(57,255,20,0.03)",
                        marginBottom: 36,
                    }}
                    animate={{ borderColor: ["rgba(57,255,20,0.1)", "rgba(57,255,20,0.35)", "rgba(57,255,20,0.1)"] }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                >
                    <motion.div
                        style={{ width: 6, height: 6, borderRadius: "50%", background: "#39FF14" }}
                        animate={{ opacity: [0.4, 1, 0.4], boxShadow: ["0 0 0 0 rgba(57,255,20,0)", "0 0 0 4px rgba(57,255,20,0.15)", "0 0 0 0 rgba(57,255,20,0)"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span style={{ color: "rgba(57,255,20,0.6)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 500 }}>
                        Registration Active
                    </span>
                </motion.div>

                {/* Heading */}
                <h2 className="text-glow" style={{
                    color: "#39FF14",
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "clamp(2.2rem, 7vw, 3.5rem)",
                    fontWeight: 800,
                    marginBottom: 20,
                    letterSpacing: "0.04em",
                    lineHeight: 1.15,
                }}>
                    INITIATE<br />REGISTRATION
                </h2>

                <p style={{
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "'Inter', 'Space Grotesk', sans-serif",
                    fontSize: "1.05rem",
                    maxWidth: 460,
                    margin: "0 auto 48px",
                    lineHeight: 1.8,
                }}>
                    Lock in your squad. Prepare your laptop. The Omnitrix is waiting for the worthy.
                </p>

                {/* CTA Button */}
                <motion.a
                    href="https://omni-tech-sce.vercel.app/packages"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        position: "relative",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 14,
                        padding: "18px 48px",
                        borderRadius: 16,
                        border: "1.5px solid rgba(57,255,20,0.4)",
                        background: "linear-gradient(135deg, rgba(57,255,20,0.08) 0%, rgba(57,255,20,0.02) 100%)",
                        color: "#39FF14",
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: "clamp(0.85rem, 2vw, 1.05rem)",
                        letterSpacing: "0.15em",
                        fontWeight: 700,
                        textDecoration: "none",
                        overflow: "hidden",
                        cursor: "pointer",
                    }}
                    whileHover={{
                        boxShadow: "0 0 40px rgba(57,255,20,0.25), 0 0 80px rgba(57,255,20,0.08)",
                        borderColor: "rgba(57,255,20,0.6)",
                        background: "linear-gradient(135deg, rgba(57,255,20,0.15) 0%, rgba(57,255,20,0.05) 100%)",
                        gap: 18,
                    }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Inner scan line */}
                    <motion.div
                        style={{ position: "absolute", left: 0, width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(57,255,20,0.2), transparent)" }}
                        animate={{ top: ["-5%", "105%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <Zap size={18} strokeWidth={2} />
                    <span>REGISTER NOW</span>
                    <ArrowRight size={16} strokeWidth={2} />
                </motion.a>

                {/* Footer note */}
                <motion.p
                    style={{ color: "rgba(255,255,255,0.12)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.12em", marginTop: 32 }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
          // Only the strongest survive the rebuild
                </motion.p>
            </motion.div>
        </section>
    );
}
