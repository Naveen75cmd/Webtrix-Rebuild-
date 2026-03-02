import Hero from "./components/Hero";
import EventDetails from "./components/EventDetails";
import RulesMatrix from "./components/RulesMatrix";
import Registration from "./components/Registration";
import OmnitrixBot from "./components/OmnitrixBot";
import Navbar from "./components/Navbar";
import Breadcrumbs from "./components/Breadcrumbs";

/* ===== Footer ===== */
function Footer() {
  return (
    <footer
      style={{
        padding: "48px 24px",
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
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#050505",
        fontFamily: "'Inter', 'Space Grotesk', sans-serif",
        position: "relative",
      }}
    >
      {/* Circuit bg overlay */}
      <div
        className="bg-circuit"
        style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.4 }}
      />

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
    </div>
  );
}
