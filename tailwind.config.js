/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'omnitrix-green': '#39FF14',
                'alien-dark': '#004D1A',
                'void-black': '#050505',
                'grid-green': '#021204',
            },
            fontFamily: {
                'orbitron': ['Orbitron', 'sans-serif'],
                'jetbrains': ['JetBrains Mono', 'monospace'],
                'space': ['Space Grotesk', 'sans-serif'],
            },
            boxShadow: {
                'neon': '0 0 10px #39FF14, 0 0 20px #39FF14',
                'neon-inset': '0 0 10px #39FF14, 0 0 20px #39FF14 inset',
                'neon-lg': '0 0 15px #39FF14, 0 0 30px #39FF14, 0 0 45px #004D1A',
            },
            animation: {
                'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'scan': 'scan 3s linear infinite',
                'glow-border': 'glowBorder 3s ease-in-out infinite',
            },
            keyframes: {
                pulseNeon: {
                    '0%, 100%': { boxShadow: '0 0 5px #39FF14, 0 0 10px #39FF14' },
                    '50%': { boxShadow: '0 0 20px #39FF14, 0 0 40px #39FF14, 0 0 60px #004D1A' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                scan: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' },
                },
                glowBorder: {
                    '0%, 100%': { borderColor: '#39FF14' },
                    '50%': { borderColor: '#004D1A' },
                },
            },
        },
    },
    plugins: [],
}
