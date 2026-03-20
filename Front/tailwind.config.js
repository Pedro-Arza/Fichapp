/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,scss}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
      },
      colors: {
        brand:   '#6c63ff',
        'brand-light': '#8b84ff',
        'brand-dark':  '#4e46e0',
        teal:    '#00d4aa',
        danger:  '#ff4d6d',
        warning: '#ffb347',
        surface: {
          DEFAULT: '#111318',
          card:    '#161820',
          raised:  '#1e2130',
          border:  '#252836',
        },
        ink: {
          DEFAULT: '#f0f2ff',
          dim:     '#8b90a7',
          muted:   '#4a4f68',
        },
      },
      boxShadow: {
        'glow':     '0 0 32px rgba(108,99,255,0.35)',
        'glow-sm':  '0 0 16px rgba(108,99,255,0.25)',
        'glow-teal':'0 0 24px rgba(0,212,170,0.3)',
        'card':     '0 4px 24px rgba(0,0,0,0.5)',
        'float':    '0 16px 48px rgba(0,0,0,0.6)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      animation: {
        'fade-up':    'fadeUp 0.4s cubic-bezier(0.34,1.4,0.64,1) both',
        'fade-in':    'fadeIn 0.25s ease both',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'ping-slow':  'ping 2s ease-in-out infinite',
        'bounce-in':  'bounceIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both',
        'slide-up':   'slideUp 0.35s cubic-bezier(0.34,1.3,0.64,1) both',
      },
      keyframes: {
        fadeUp:   { from: { opacity:0, transform:'translateY(20px)' }, to: { opacity:1, transform:'translateY(0)' } },
        fadeIn:   { from: { opacity:0 }, to: { opacity:1 } },
        bounceIn: { from: { opacity:0, transform:'scale(0.8)' }, to: { opacity:1, transform:'scale(1)' } },
        slideUp:  { from: { opacity:0, transform:'translateY(30px) scale(0.97)' }, to: { opacity:1, transform:'translateY(0) scale(1)' } },
      },
    },
  },
  plugins: [],
}
