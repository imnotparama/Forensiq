/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          // Re-mapping 'cyber' tokens to new Tactical/Operative theme
          cyber: {
            DEFAULT: "#3b82f6", // Blue-500 (Primary)
            dim: "rgba(59, 130, 246, 0.1)",
            dark: "#0f172a", // Slate-900 (Background)
            panel: "#1e293b", // Slate-800 (Cards)
            border: "#334155", // Slate-700
            accent: "#f59e0b", // Amber-500 (Secondary/Alert)
            success: "#10b981", // Emerald-500
            warning: "#f59e0b", // Amber-500
            danger: "#ef4444", // Red-500
            text: "#f8fafc", // Slate-50
            muted: "#94a3b8", // Slate-400
          },
        },
        fontFamily: {
          mono: ['"JetBrains Mono"', '"Fira Code"', "monospace"], // More tactical
          sans: ['"Inter"', "sans-serif"],
        },
        animation: {
          "spin-slow": "spin 3s linear infinite",
          pulse: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        },
      },
    },
    plugins: [],
  };
