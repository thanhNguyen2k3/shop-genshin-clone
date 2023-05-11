/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}',
        './layouts/**/*.{js,ts,jsx,tsx}',
        './node_modules/flowbite-react/**/*.js',
        './public/**/*.html',
    ],
    plugins: [require('flowbite/plugin')],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                primary: '#6eb89f',
                secondDary: '#5e8e74',
                background: '#363636',
            },
            width: {
                layout: '1192px',
            },
            flex: {
                wrapImportant: '!important',
            },
        },
    },
};
