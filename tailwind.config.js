/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clinical: {
          critical: '#FCEBEB',
          warning: '#FAEEDA',
          ok: '#E1F5EE',
          info: '#E6F1FB',
        },
        status: {
          critical: '#791F1F',
          warning: '#633806',
          ok: '#085041',
          info: '#0C447C',
        },
        agent: {
          cra: '#1D9E75',
          dm: '#534AB7',
          pm: '#BA7517',
          synthesis: '#185FA5',
        },
      },
    },
  },
  plugins: [],
};
