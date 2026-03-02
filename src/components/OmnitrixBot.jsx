import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { chatQueries } from "../data/chatbotLogic";

/* Initial welcome message from the bot */
const WELCOME_MSG = {
    id: "welcome",
    sender: "bot",
    content: "Hey there, operative! 👾 I'm the Omnitrix Bot. Ask me anything about the event using the quick queries below, or type a question!",
    timestamp: null,
};

/* Map free-text to a query match */
function matchQuery(text) {
    const lower = text.toLowerCase();
    const keywords = {
        rules: ["rule", "regulation", "operational", "guideline", "allowed", "prohibited", "malpractice"],
        coordinates: ["venue", "time", "when", "where", "location", "place", "lab"],
        squad: ["team", "squad", "member", "size", "laptop", "requirement"],
        command: ["coordinator", "contact", "phone", "number", "channel", "call", "command"],
    };
    for (const [id, words] of Object.entries(keywords)) {
        if (words.some((w) => lower.includes(w))) {
            return chatQueries.find((q) => q.id === id);
        }
    }
    return null;
}

function formatTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function OmnitrixBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([{ ...WELCOME_MSG, timestamp: formatTime() }]);
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    /* Send a query (from button or text) */
    const handleQuery = (query, userLabel) => {
        const now = formatTime();
        const userMsg = {
            id: `user-${Date.now()}`,
            sender: "user",
            content: userLabel || query.label,
            timestamp: now,
        };

        const response = query.getResponse();
        const botMsg = {
            id: `bot-${Date.now()}`,
            sender: "bot",
            content: response.title + "\n\n" + response.items.join("\n"),
            timestamp: now,
        };

        setMessages((prev) => [...prev, userMsg]);
        // Simulate a tiny "typing" delay
        setTimeout(() => setMessages((prev) => [...prev, botMsg]), 400);
    };

    /* Handle text input submit */
    const handleSubmit = (e) => {
        e.preventDefault();
        const text = inputText.trim();
        if (!text) return;
        setInputText("");

        const match = matchQuery(text);
        if (match) {
            handleQuery(match, text);
        } else {
            const now = formatTime();
            setMessages((prev) => [
                ...prev,
                { id: `user-${Date.now()}`, sender: "user", content: text, timestamp: now },
            ]);
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: `bot-${Date.now()}`,
                        sender: "bot",
                        content: "I can help with:\n\n📋 Rules & Regulations\n📍 Event Venue & Time\n👥 Team Requirements\n📞 Coordinator Contacts\n\nTry asking about any of these!",
                        timestamp: formatTime(),
                    },
                ]);
            }, 500);
        }
    };

    return (
        <>
            {/* ===== FAB ===== */}
            <motion.button
                id="omnitrix-bot-fab"
                onClick={() => setIsOpen((v) => !v)}
                style={{
                    position: "fixed",
                    bottom: 28,
                    right: 28,
                    zIndex: 50,
                    width: 58,
                    height: 58,
                    borderRadius: "50%",
                    border: "1.5px solid rgba(57,255,20,0.4)",
                    background: "linear-gradient(135deg, rgba(2,18,4,0.95), rgba(5,5,5,0.95))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    backdropFilter: "blur(10px)",
                }}
                whileHover={{ scale: 1.08, boxShadow: "0 0 30px rgba(57,255,20,0.35)" }}
                whileTap={{ scale: 0.93 }}
                animate={
                    isOpen
                        ? { rotate: 90, boxShadow: "0 0 20px rgba(57,255,20,0.2)" }
                        : { boxShadow: ["0 0 15px rgba(57,255,20,0.15)", "0 0 30px rgba(57,255,20,0.3)", "0 0 15px rgba(57,255,20,0.15)"] }
                }
                transition={isOpen ? { duration: 0.3 } : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
                {isOpen ? <X color="#39FF14" size={22} strokeWidth={2} /> : <MessageCircle color="#39FF14" size={22} strokeWidth={1.5} />}
            </motion.button>

            {/* ===== CHAT PANEL ===== */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        style={{
                            position: "fixed",
                            bottom: 100,
                            right: 28,
                            zIndex: 50,
                            width: "min(400px, calc(100vw - 56px))",
                            height: "min(520px, calc(100vh - 140px))",
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                            boxShadow: "0 20px 80px rgba(0,0,0,0.7), 0 0 40px rgba(57,255,20,0.04)",
                            border: "1px solid rgba(57,255,20,0.12)",
                            borderRadius: 24,
                            background: "linear-gradient(180deg, #0a0f0a 0%, #060806 100%)",
                        }}
                        initial={{ opacity: 0, y: 20, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.92 }}
                        transition={{ type: "spring", stiffness: 250, damping: 22 }}
                    >
                        {/* ===== HEADER ===== */}
                        <div style={{
                            padding: "16px 20px",
                            borderBottom: "1px solid rgba(57,255,20,0.06)",
                            background: "linear-gradient(90deg, rgba(57,255,20,0.06), rgba(57,255,20,0.01))",
                            flexShrink: 0,
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{ width: 36, height: 36, borderRadius: 12, background: "linear-gradient(135deg, rgba(57,255,20,0.15), rgba(57,255,20,0.05))", border: "1px solid rgba(57,255,20,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <span style={{ fontSize: "1.1rem" }}>👾</span>
                                </div>
                                <div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <span style={{ color: "#39FF14", fontFamily: "'Orbitron', sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em", fontWeight: 600 }}>
                                            OMNITRIX BOT
                                        </span>
                                        <motion.div
                                            style={{ width: 7, height: 7, borderRadius: "50%", background: "#39FF14" }}
                                            animate={{ opacity: [0.4, 1, 0.4] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    </div>
                                    <span style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem" }}>
                                        Online • Event Intel Assistant
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* ===== MESSAGES ===== */}
                        <div style={{
                            flex: 1,
                            overflowY: "auto",
                            padding: "16px 14px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 12,
                            background: "rgba(5,5,5,0.5)",
                        }}>
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.25, delay: i === messages.length - 1 ? 0.05 : 0 }}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: msg.sender === "user" ? "flex-end" : "flex-start",
                                        maxWidth: "85%",
                                        alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                                    }}
                                >
                                    {/* Bubble */}
                                    <div
                                        style={{
                                            padding: "12px 16px",
                                            borderRadius: msg.sender === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                                            background: msg.sender === "user"
                                                ? "linear-gradient(135deg, rgba(57,255,20,0.18), rgba(57,255,20,0.08))"
                                                : "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                                            border: msg.sender === "user"
                                                ? "1px solid rgba(57,255,20,0.25)"
                                                : "1px solid rgba(255,255,255,0.06)",
                                            color: msg.sender === "user" ? "rgba(57,255,20,0.9)" : "rgba(255,255,255,0.7)",
                                            fontFamily: "'Space Grotesk', sans-serif",
                                            fontSize: "0.82rem",
                                            lineHeight: 1.6,
                                            whiteSpace: "pre-line",
                                            wordBreak: "break-word",
                                        }}
                                    >
                                        {msg.content}
                                    </div>
                                    {/* Timestamp */}
                                    <span style={{
                                        color: "rgba(255,255,255,0.12)",
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: "0.5rem",
                                        marginTop: 4,
                                        padding: msg.sender === "user" ? "0 4px 0 0" : "0 0 0 4px",
                                    }}>
                                        {msg.timestamp}
                                    </span>
                                </motion.div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* ===== QUICK QUERIES ===== */}
                        <div style={{
                            padding: "10px 14px 8px",
                            borderTop: "1px solid rgba(57,255,20,0.04)",
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 8,
                            flexShrink: 0,
                        }}>
                            {chatQueries.map((q) => (
                                <motion.button
                                    key={q.id}
                                    onClick={() => handleQuery(q)}
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    style={{
                                        padding: "6px 12px",
                                        borderRadius: 9999,
                                        border: "1px solid rgba(57,255,20,0.12)",
                                        background: "rgba(57,255,20,0.03)",
                                        color: "rgba(57,255,20,0.55)",
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: "0.6rem",
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                        letterSpacing: "0.03em",
                                        whiteSpace: "nowrap",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = "rgba(57,255,20,0.3)";
                                        e.currentTarget.style.color = "#39FF14";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = "rgba(57,255,20,0.12)";
                                        e.currentTarget.style.color = "rgba(57,255,20,0.55)";
                                    }}
                                >
                                    {q.icon} {q.label}
                                </motion.button>
                            ))}
                        </div>

                        {/* ===== INPUT BAR ===== */}
                        <form
                            onSubmit={handleSubmit}
                            style={{
                                padding: "10px 14px 14px",
                                display: "flex",
                                gap: 10,
                                alignItems: "center",
                                flexShrink: 0,
                            }}
                        >
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Ask about the event..."
                                style={{
                                    flex: 1,
                                    padding: "12px 16px",
                                    borderRadius: 14,
                                    border: "1px solid rgba(57,255,20,0.1)",
                                    background: "rgba(8,8,8,0.9)",
                                    color: "rgba(255,255,255,0.8)",
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: "0.82rem",
                                    outline: "none",
                                    transition: "border-color 0.2s",
                                }}
                                onFocus={(e) => (e.target.style.borderColor = "rgba(57,255,20,0.3)")}
                                onBlur={(e) => (e.target.style.borderColor = "rgba(57,255,20,0.1)")}
                            />
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.92 }}
                                style={{
                                    width: 42,
                                    height: 42,
                                    borderRadius: "50%",
                                    border: "1px solid rgba(57,255,20,0.25)",
                                    boxShadow: inputText.trim() ? "0 0 15px rgba(57,255,20,0.2)" : "none",
                                    background: inputText.trim()
                                        ? "linear-gradient(135deg, rgba(57,255,20,0.2), rgba(57,255,20,0.08))"
                                        : "rgba(57,255,20,0.03)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    flexShrink: 0,
                                }}
                            >
                                <Send size={16} color={inputText.trim() ? "#39FF14" : "rgba(57,255,20,0.3)"} strokeWidth={2} />
                            </motion.button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
