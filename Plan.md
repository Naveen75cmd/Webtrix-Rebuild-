# Webtrix Rebuild - Technical Event Website Blueprint

## 1. Tech Stack & Dependencies
* **Core Framework:** React (Vite recommended for fast builds)
* **Styling:** Tailwind CSS (for rapid, responsive Ben 10 theme styling)
* **Animations:** Framer Motion (essential for advanced, high-tech UI/UX transitions)
* **3D Integration:** `@splinetool/react-spline`
* **Icons:** `lucide-react` or custom SVG icons with neon green drop-shadows

## 2. Design System (Ben 10 Theme)
To achieve the deep space and alien technology look:
* **Background Color:** Void Black (`#050505`) and Dark Grid Green (`#021204`)
* **Primary Accent:** Omnitrix Neon Green (`#39FF14`)
* **Secondary Accent:** Alien Dark Green (`#004D1A`)
* **Typography:** * Headers: `Orbitron` or `Rajdhani` (for that futuristic, tech-heavy feel)
  * Body: `JetBrains Mono` or `Space Grotesk`
* **Visual Effects:** * Use intense box-shadows for glowing borders: `box-shadow: 0 0 10px #39FF14, 0 0 20px #39FF14 inset;`
  * Glassmorphism panels with dark green tints.

## 3. Project Directory Structure
```text
webtrix-rebuild/
├── public/
│   └── assets/           # Event posters, custom alien fonts
├── src/
│   ├── components/
│   │   ├── SplineHero.jsx      # Holds the 3D Spline model & main title
│   │   ├── EventDetails.jsx    # Time, Venue, Team Size, Desc
│   │   ├── RulesMatrix.jsx     # Component displaying the 9 regulations
│   │   ├── OmnitrixBot.jsx     # The conditional chatbot
│   │   └── Registration.jsx    # "Initiate Registration" CTA section
│   ├── data/
│   │   ├── chatbotLogic.js     # Predefined queries and responses
│   │   └── eventData.js        # Hardcoded rules, coordinator details
│   ├── styles/
│   │   └── index.css           # Global styles, custom scrollbars, glowing utility classes
│   ├── App.jsx                 # Main layout mapping
│   └── main.jsx
├── tailwind.config.js          # Extended with Omnitrix color palette
└── package.json

4. Core Components & Logic
A. Spline 3D Integration (SplineHero.jsx)
This component acts as the visual centerpiece.

Function: Renders a 3D model that users can interact with.

Implementation:

import Spline from '@splinetool/react-spline';

export default function SplineHero() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-black relative">
      {/* SPLINE URL PLACEHOLDER */}
      <Spline scene="[https://prod.spline.design/YOUR_SPLINE_URL_HERE/scene.splinecode](https://prod.spline.design/YOUR_SPLINE_URL_HERE/scene.splinecode)" />

      {/* Overlay Text */}
      <div className="absolute bottom-10 z-10 text-center pointer-events-none">
        <h1 className="text-omnitrix-green font-orbitron text-5xl text-glow">WEBTRIX REBUILD</h1>
        <p className="text-white tracking-widest mt-2">VIBE CODING</p>
      </div>
    </div>
  );
}

B. Event Details Section (EventDetails.jsx)
Extracting the parameters from the briefing into a glowing grid layout.

Time: 11:00 am - 01:00 pm

Venue: AI & DS LAB

Team Size: Team (2-4 members only)

Coordinators: * Elango P - 9597617402

Naveen M S - 6379479890

C. Rules & Regulations (RulesMatrix.jsx)
A secure, terminal-style layout listing the operational parameters:

"Vibe Coding" methodology is permitted.

The website must be finished within the strict time limit. No extra time will be provided.

Any form of malpractice will lead to immediate disqualification.

2 to 3 reference websites will be provided for the task.

Teams must consist of 2 to 4 members.

A laptop is compulsory for every team.

Participants must recreate (replicate) the given website design as accurately as possible within the timeframe.

Copy-pasting full source code from online websites is strictly prohibited.

Submission Protocol: Submit source files in a .zip folder. Format: TeamName_CollegeName.zip.

D. Conditional Chatbot (OmnitrixBot.jsx)
A floating, sticky UI element (bottom right corner, visually resembling the Omnitrix dial) that opens a chat window.

Predefined Query Buttons:

🟢 [Query: Operational Rules] -> Returns the 9 rules.

🟢 [Query: Event Coordinates] -> Returns Venue (AI & DS LAB) and Time (11:00 am - 01:00 pm).

🟢 [Query: Squad Requirements] -> Returns Team size (2-4) and Laptop requirement.

🟢 [Query: Command Channel] -> Returns Coordinator names and numbers.

Logic: Use a simple state-machine in React to swap the chatHistory array based on which predefined button the user clicks.

5. UI/UX Advanced Polish Checklist
[ ] Responsiveness: Ensure CSS Grid/Flexbox layouts collapse smoothly to single columns on mobile devices.

[ ] Custom Scrollbar: Style the webkit scrollbar to be narrow and neon green.

[ ] Hover States: All buttons must have a high-tech "activation" hover state (e.g., expanding letter spacing, glowing borders).

[ ] Loader: Create a custom loading screen (e.g., an alien tech loading ring) while the Spline model fetches.