import { motion } from "framer-motion";
import { Clock, MapPin, Users, Phone } from "lucide-react";
import { eventInfo } from "../data/eventData";

const cards = [
    { icon: Clock, label: "TIME", value: eventInfo.time, delay: 0 },
    { icon: MapPin, label: "VENUE", value: eventInfo.venue, delay: 0.1 },
    { icon: Users, label: "TEAM SIZE", value: eventInfo.teamSize, delay: 0.2 },
    {
        icon: Phone,
        label: "COORDINATORS",
        value: eventInfo.coordinators.map((c) => `${c.name} — ${c.phone}`),
        isMultiline: true,
        delay: 0.3,
    },
];

function DetailCard({ card }) {
    const Icon = card.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 80, damping: 14, delay: card.delay }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="glass gradient-border"
            style={{
                padding: "32px 24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 18,
                cursor: "default",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Hover shimmer */}
            <motion.div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, transparent 40%, rgba(57,255,20,0.04) 50%, transparent 60%)",
                    backgroundSize: "200% 200%",
                    opacity: 0,
                    pointerEvents: "none",
                }}
                whileHover={{ opacity: 1 }}
            />

            {/* Icon */}
            <motion.div
                style={{
                    width: 60,
                    height: 60,
                    borderRadius: 16,
                    border: "1px solid rgba(57,255,20,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, rgba(57,255,20,0.08) 0%, transparent 100%)",
                    position: "relative",
                }}
                whileHover={{
                    boxShadow: "0 0 20px rgba(57,255,20,0.2)",
                    borderColor: "rgba(57,255,20,0.35)",
                }}
            >
                <Icon color="#39FF14" size={24} strokeWidth={1.5} />
            </motion.div>

            {/* Label */}
            <span style={{
                color: "rgba(57,255,20,0.55)",
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "0.72rem",
                letterSpacing: "0.3em",
                fontWeight: 600,
            }}>
                {card.label}
            </span>

            {/* Value */}
            {card.isMultiline ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {card.value.map((line) => (
                        <span key={line} style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Inter', 'Space Grotesk', sans-serif", fontSize: "1rem", fontWeight: 400 }}>
                            {line}
                        </span>
                    ))}
                </div>
            ) : (
                <span style={{ color: "rgba(255,255,255,0.9)", fontFamily: "'Inter', 'Space Grotesk', sans-serif", fontSize: "1.15rem", fontWeight: 500 }}>
                    {card.value}
                </span>
            )}
        </motion.div>
    );
}

export default function EventDetails() {
    return (
        <section
            id="event-details"
            style={{
                position: "relative",
                padding: "120px 24px",
                background: "linear-gradient(180deg, #050505 0%, rgba(2,18,4,0.6) 50%, #050505 100%)",
                overflow: "hidden",
            }}
        >
            {/* Ambient glow */}
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 600,
                height: 400,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(57,255,20,0.03) 0%, transparent 70%)",
                filter: "blur(80px)",
                pointerEvents: "none",
            }} />

            {/* Section header */}
            <motion.div
                style={{ textAlign: "center", marginBottom: 72, maxWidth: 720, marginLeft: "auto", marginRight: "auto", position: "relative" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 20 }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <motion.div
                        style={{ height: "1px", width: 50, background: "linear-gradient(to right, transparent, rgba(57,255,20,0.4))" }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    />
                    <span style={{ color: "rgba(57,255,20,0.45)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase" }}>
                        Mission Briefing
                    </span>
                    <motion.div
                        style={{ height: "1px", width: 50, background: "linear-gradient(to left, transparent, rgba(57,255,20,0.4))" }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    />
                </motion.div>

                <h2 className="text-glow-sm" style={{ color: "#39FF14", fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700, marginBottom: 20, letterSpacing: "0.05em" }}>
                    EVENT DETAILS
                </h2>

                <p style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Inter', 'Space Grotesk', sans-serif", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
                    {eventInfo.description}
                </p>
            </motion.div>

            {/* Cards */}
            <div style={{
                maxWidth: 1100,
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 24,
            }}>
                {cards.map((card) => (
                    <DetailCard key={card.label} card={card} />
                ))}
            </div>
        </section>
    );
}
