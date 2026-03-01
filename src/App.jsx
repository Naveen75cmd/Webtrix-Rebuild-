import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./components/Hero";
import EventDetails from "./components/EventDetails";
import RulesMatrix from "./components/RulesMatrix";
import Registration from "./components/Registration";
import OmnitrixBot from "./components/OmnitrixBot";
import Navbar from "./components/Navbar";
import Breadcrumbs from "./components/Breadcrumbs";
import ToggleSwitch from "./components/ToggleSwitch";
import logo from "./assets/logo.jpeg";

/* ===== Initialization Gate ===== */
function InitScreen({ onInitialize }) {
  return (
    <motion.div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
        background: "radial-gradient(ellipse at 50% 40%, rgba(0,77,26,0.06) 0%, #050505 60%)",
        overflow: "hidden",
      }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    >
      {/* Subtle grid */}
      <div
        className="bg-grid"
        style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5 }}
      />

      {/* Scan line */}
      <motion.div
        style={{
          position: "absolute",
          left: 0,
          width: "100%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(57,255,20,0.12), transparent)",
        }}
        animate={{ top: ["-2%", "102%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* Logo */}
      <motion.img
        src={logo}
        alt="Webtrix Rebuild"
        style={{
          width: "clamp(160px, 28vw, 260px)",
          height: "auto",
          borderRadius: 20,
          border: "1.5px solid rgba(57,255,20,0.15)",
          position: "relative",
        }}
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0,
          boxShadow: [
            "0 4px 40px rgba(57,255,20,0.1)",
            "0 4px 60px rgba(57,255,20,0.2)",
            "0 4px 40px rgba(57,255,20,0.1)",
          ],
        }}
        transition={{
          scale: { duration: 0.8 },
          opacity: { duration: 0.8 },
          y: { duration: 0.8 },
          boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Title */}
      <motion.div
        style={{ textAlign: "center", position: "relative" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        <h1
          style={{
            color: "#39FF14",
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "clamp(1.2rem, 4vw, 2rem)",
            fontWeight: 800,
            letterSpacing: "0.08em",
            marginBottom: 8,
            textShadow: "0 0 20px rgba(57,255,20,0.3)",
          }}
        >
          WEBTRIX REBUILD
        </h1>
        <p
          style={{
            color: "rgba(57,255,20,0.4)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.72rem",
            letterSpacing: "0.3em",
          }}
        >
          VIBE CODING — A TECHNICAL EVENT
        </p>
      </motion.div>

      {/* Toggle to initialize */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
      >
        <ToggleSwitch onToggle={(active) => active && setTimeout(onInitialize, 600)} />
      </motion.div>

      {/* Hint */}
      <motion.p
        style={{
          color: "rgba(255,255,255,0.08)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.55rem",
          letterSpacing: "0.1em",
          position: "absolute",
          bottom: 32,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        // Toggle the switch to enter the event portal
      </motion.p>
    </motion.div>
  );
}

/* ===== Footer ===== */
function Footer() {
  return (
    <footer
      style={{
        padding: "40px 24px",
        textAlign: "center",
        borderTop: "1px solid rgba(57,255,20,0.04)",
        background: "#050505",
      }}
    >
      <p
        style={{
          color: "rgba(57,255,20,0.2)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.68rem",
          letterSpacing: "0.12em",
        }}
      >
        &copy; 2026 WEBTRIX REBUILD &middot; AI & DS DEPARTMENT
      </p>
    </footer>
  );
}

export default function App() {
  const [initialized, setInitialized] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#050505",
        fontFamily: "'Inter', 'Space Grotesk', sans-serif",
        position: "relative",
      }}
    >
      {/* Grid overlay */}
      <div
        className="bg-grid"
        style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
      />

      {/* Initialization Gate */}
      <AnimatePresence>
        {!initialized && (
          <InitScreen onInitialize={() => setInitialized(true)} />
        )}
      </AnimatePresence>

      {/* Main Website (only visible after initialization) */}
      {initialized && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Navbar />
          <Breadcrumbs />

          <main style={{ position: "relative", zIndex: 10 }}>
            <Hero />
            <EventDetails />
            <RulesMatrix />
            <Registration />
          </main>

          <Footer />
          <OmnitrixBot />
        </motion.div>
      )}
    </div>
  );
}
