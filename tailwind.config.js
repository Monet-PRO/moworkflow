/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: { 900: "#07070c", 800: "#0b0b14", 700: "#11111d", 600: "#181828", 500: "#22223a" },
        mo: { 50:"#f2f0ff",100:"#e6e1ff",300:"#b9adff",400:"#9a86ff",500:"#7c5cff",600:"#6438f5",700:"#4f26cc" },
        lime: { 400: "#c6f24e", 500: "#aee034" },
        coral: { 400: "#ff7a59", 500: "#ff5c34" },
      },
      fontFamily: { display: ["Manrope","system-ui","sans-serif"], body: ["Inter","system-ui","sans-serif"] },
      boxShadow: { glow: "0 0 60px -12px rgba(124,92,255,.55)", card: "0 8px 40px -18px rgba(0,0,0,.9)" },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        scanline: { "0%": { transform: "translateX(-100%)" }, "100%": { transform: "translateX(200%)" } },
        pulseRing: { "0%": { transform:"scale(.8)", opacity:".7" }, "100%": { transform:"scale(2.2)", opacity:"0" } },
        marquee: { "0%": { transform:"translateX(0)" }, "100%": { transform:"translateX(-50%)" } },
        wave: { "0%,100%": { transform:"scaleY(.3)" }, "50%": { transform:"scaleY(1)" } },
        shimmer: { "0%": { backgroundPosition:"-200% 0" }, "100%": { backgroundPosition:"200% 0" } },
        spinSlow: { to: { transform: "rotate(360deg)" } },
        fadeUp: { from: { opacity:"0", transform:"translateY(14px)" }, to: { opacity:"1", transform:"translateY(0)" } },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        scanline: "scanline 3.2s linear infinite",
        pulseRing: "pulseRing 2.4s ease-out infinite",
        marquee: "marquee 26s linear infinite",
        wave: "wave 1s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        spinSlow: "spinSlow 14s linear infinite",
        fadeUp: "fadeUp .5s ease-out both",
      },
    },
  },
  plugins: [],
};
