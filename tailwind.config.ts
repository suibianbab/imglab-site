import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 主色：深紫罗兰（spec §3.2）
        brand: {
          DEFAULT: '#5B5BD6',
          50: '#EEEEFB',
          100: '#D9D9F5',
          400: '#7A7AE0',
          500: '#5B5BD6',
          600: '#4A4ABF',
          700: '#3A3AA0',
        },
        // 辅助色
        ink: '#1F1F2E',
        paper: '#F7F7FA',
        muted: '#6B7280',
        accent: '#10B981',
      },
      fontFamily: {
        sans: ['"Source Han Sans CN"', '"Noto Sans SC"', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        'xl': '0.75rem',
      },
    },
  },
  plugins: [typography],
};

export default config;
