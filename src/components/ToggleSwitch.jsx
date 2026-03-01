import { useState } from "react";
import { motion } from "framer-motion";
import { Power } from "lucide-react";

export default function ToggleSwitch({ onToggle }) {
    const [active, setActive] = useState(false);

    const handleToggle = () => {
        const next = !active;
        setActive(next);
        onToggle?.(next);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
            }}
        >
            {/* Label */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                }}
            >
                <Power
                    size={14}
                    color={active ? "#39FF14" : "rgba(57,255,20,0.3)"}
                    strokeWidth={2}
                    style={{ transition: "color 0.3s" }}
                />
                <span
                    style={{
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: "0.7rem",
                        letterSpacing: "0.2em",
                        color: active ? "#39FF14" : "rgba(57,255,20,0.4)",
                        fontWeight: 600,
                        transition: "color 0.3s",
                    }}
                >
                    {active ? "OMNITRIX ONLINE" : "INITIALIZE OMNITRIX"}
                </span>
            </div>

            {/* Toggle track */}
            <motion.button
                onClick={handleToggle}
                style={{
                    position: "relative",
                    width: 64,
                    height: 32,
                    borderRadius: 9999,
                    border: active
                        ? "1.5px solid rgba(57,255,20,0.5)"
                        : "1.5px solid rgba(57,255,20,0.15)",
                    background: active
                        ? "linear-gradient(90deg, rgba(57,255,20,0.15), rgba(57,255,20,0.08))"
                        : "rgba(57,255,20,0.03)",
                    cursor: "pointer",
                    padding: 0,
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                }}
                whileHover={{
                    boxShadow: active
                        ? "0 0 20px rgba(57,255,20,0.2)"
                        : "0 0 10px rgba(57,255,20,0.1)",
                }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Scan line inside track */}
                {active && (
                    <motion.div
                        style={{
                            position: "absolute",
                            left: 0,
                            width: "100%",
                            height: "1px",
                            background: "rgba(57,255,20,0.2)",
                        }}
                        animate={{ top: ["-10%", "110%"] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                    />
                )}

                {/* Thumb (knob) */}
                <motion.div
                    animate={{
                        x: active ? 32 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    style={{
                        position: "absolute",
                        top: 2,
                        left: 2,
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        background: active
                            ? "linear-gradient(135deg, #39FF14, #004D1A)"
                            : "rgba(57,255,20,0.15)",
                        boxShadow: active
                            ? "0 0 12px rgba(57,255,20,0.5), 0 0 24px rgba(57,255,20,0.2)"
                            : "none",
                        transition: "background 0.3s, box-shadow 0.3s",
                    }}
                />
            </motion.button>

            {/* Status indicator */}
            <motion.div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                }}
                animate={{ opacity: active ? 1 : 0.4 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: active ? "#39FF14" : "rgba(57,255,20,0.2)",
                    }}
                    animate={
                        active
                            ? {
                                boxShadow: [
                                    "0 0 0 0 rgba(57,255,20,0)",
                                    "0 0 0 5px rgba(57,255,20,0.15)",
                                    "0 0 0 0 rgba(57,255,20,0)",
                                ],
                            }
                            : {}
                    }
                    transition={{ duration: 1.5, repeat: active ? Infinity : 0 }}
                />
                <span
                    style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.58rem",
                        color: active ? "rgba(57,255,20,0.5)" : "rgba(255,255,255,0.15)",
                        letterSpacing: "0.08em",
                    }}
                >
                    {active ? "System initialized" : "Awaiting command"}
                </span>
            </motion.div>
        </motion.div>
    );
}
