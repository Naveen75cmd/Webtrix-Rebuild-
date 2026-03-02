import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const FRAME_COUNT = 200;

function getFrameSrc(index) {
    return `/frames/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;
}

export default function Hero() {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const imagesRef = useRef([]);
    const currentFrameRef = useRef(0);
    const rafRef = useRef(null);
    const [loaded, setLoaded] = useState(false);

    /* ── Preload all frames ── */
    useEffect(() => {
        let loadedCount = 0;
        const images = [];
        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            img.src = getFrameSrc(i);
            img.onload = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) setLoaded(true);
            };
            img.onerror = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) setLoaded(true);
            };
            images.push(img);
        }
        imagesRef.current = images;
    }, []);

    /* ── Draw frame on canvas ── */
    const drawFrame = (index) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const img = imagesRef.current[index];
        if (!canvas || !ctx || !img || !img.complete) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Cover fill
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    /* ── Scroll handler ── */
    useEffect(() => {
        if (!loaded) return;
        drawFrame(0);

        const handleScroll = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                const container = containerRef.current;
                if (!container) return;
                const rect = container.getBoundingClientRect();
                const scrollable = container.scrollHeight - window.innerHeight;
                const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
                const frameIndex = Math.min(
                    Math.floor(progress * FRAME_COUNT),
                    FRAME_COUNT - 1
                );
                if (frameIndex !== currentFrameRef.current) {
                    currentFrameRef.current = frameIndex;
                    drawFrame(frameIndex);
                }
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", () => drawFrame(currentFrameRef.current));
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", () => drawFrame(currentFrameRef.current));
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [loaded]);

    return (
        <section
            id="hero"
            ref={containerRef}
            style={{ height: "300vh", position: "relative" }}
        >
            {/* Sticky viewport */}
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    width: "100%",
                    height: "100vh",
                    overflow: "hidden",
                }}
            >
                {/* Canvas for frame rendering */}
                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />

                {/* Dark vignette overlay */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "radial-gradient(ellipse at center, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.75) 100%)",
                        pointerEvents: "none",
                    }}
                />

                {/* Scan lines */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)",
                        pointerEvents: "none",
                        opacity: 0.4,
                    }}
                />

                {/* Moving scan line */}
                <motion.div
                    style={{
                        position: "absolute",
                        left: 0,
                        width: "100%",
                        height: "2px",
                        background: "linear-gradient(90deg, transparent 0%, rgba(57,255,20,0.2) 50%, transparent 100%)",
                        pointerEvents: "none",
                    }}
                    animate={{ top: ["-2%", "102%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />




                {/* Scroll indicator */}
                <motion.div
                    style={{
                        position: "absolute",
                        bottom: 40,
                        left: "50%",
                        transform: "translateX(-50%)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 8,
                        zIndex: 10,
                    }}
                    initial={{ opacity: 0 }}
                    animate={loaded ? { opacity: 1 } : {}}
                    transition={{ delay: 1.5 }}
                >
                    <motion.span
                        style={{
                            color: "rgba(57,255,20,0.3)",
                            fontSize: "0.65rem",
                            fontFamily: "'JetBrains Mono', monospace",
                            letterSpacing: "0.3em",
                        }}
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                    >
                        SCROLL
                    </motion.span>
                    <motion.div
                        style={{
                            width: 1,
                            height: 40,
                            background: "linear-gradient(to bottom, rgba(57,255,20,0.4), transparent)",
                        }}
                        animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </motion.div>

                {/* Loading state */}
                {!loaded && (
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 24,
                            background: "#050505",
                            zIndex: 20,
                        }}
                    >
                        <div className="alien-loader" />
                        <motion.p
                            style={{
                                color: "#39FF14",
                                fontFamily: "'Orbitron', sans-serif",
                                fontSize: "0.75rem",
                                letterSpacing: "0.35em",
                            }}
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            LOADING SEQUENCE...
                        </motion.p>
                    </div>
                )}
            </div>
        </section>
    );
}
