import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";

const SECTIONS = [
    { id: "hero", label: "Home" },
    { id: "event-details", label: "Event Details" },
    { id: "rules", label: "Rules Matrix" },
    { id: "registration", label: "Registration" },
];

export default function Breadcrumbs() {
    const [current, setCurrent] = useState("hero");

    useEffect(() => {
        const observers = [];
        SECTIONS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (!el) return;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setCurrent(id);
                },
                { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
            );
            observer.observe(el);
            observers.push(observer);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, []);

    const currentIndex = SECTIONS.findIndex((s) => s.id === current);
    const crumbs = SECTIONS.slice(0, currentIndex + 1);

    /* Don't show on hero */
    if (current === "hero") return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                position: "fixed",
                top: 72,
                left: 24,
                zIndex: 40,
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                borderRadius: 10,
                background: "rgba(5,5,5,0.7)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(57,255,20,0.06)",
            }}
        >
            <a
                href="#hero"
                style={{
                    display: "flex",
                    alignItems: "center",
                    color: "rgba(57,255,20,0.35)",
                    textDecoration: "none",
                }}
            >
                <Home size={12} strokeWidth={2} />
            </a>

            {crumbs.slice(1).map((crumb, i) => {
                const isLast = i === crumbs.length - 2;
                return (
                    <span key={crumb.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <ChevronRight size={10} color="rgba(57,255,20,0.2)" />
                        <AnimatePresence mode="wait">
                            <motion.a
                                key={crumb.id}
                                href={`#${crumb.id}`}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 5 }}
                                style={{
                                    color: isLast ? "rgba(57,255,20,0.7)" : "rgba(57,255,20,0.35)",
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: "0.62rem",
                                    letterSpacing: "0.05em",
                                    textDecoration: "none",
                                    fontWeight: isLast ? 600 : 400,
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {crumb.label}
                            </motion.a>
                        </AnimatePresence>
                    </span>
                );
            })}
        </motion.div>
    );
}
