import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
            },
            extend: {
                fontFamily: {
                    sans: ['Poppins', 'sans-serif'],
                },
            }

        },
    },
    plugins: [],
}

export default config