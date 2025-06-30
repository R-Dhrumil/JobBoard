# Job Board

A modern job board web application built with [React](https://react.dev/), [Vite](https://vitejs.dev/), and [Tailwind CSS](https://tailwindcss.com/).  
Easily search, filter, and browse job listings from a public API with a clean, responsive UI.

## Features

- 🔍 **Search** jobs by title, company, city, or employment type
- 🗂️ **Filter** by location, job type, and skills
- 🌗 **Dark/Light mode** toggle
- 📱 **Responsive** design for desktop and mobile
- 📊 **Stats** for jobs, cities, and companies
- 🖱️ **Expand** job descriptions and apply directly via external links

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone this repository:
   ```sh
   git clone <your-repo-url>
   cd "Job board"
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

- `src/`
  - `App.jsx` – Main app entry
  - `Pages/MainPage.jsx` – Main job board page
  - `index.css` – Tailwind CSS import
  - Other components and utility files

## API

This project fetches jobs from a public API endpoint:
```
https://job-data-api-beta.vercel.app/api/jobs
```

## Customization

- Update the API endpoint in [`src/Pages/MainPage.jsx`](src/Pages/MainPage.jsx) if you want to use your own backend.
- Tailwind CSS is used for styling; you can customize the design in `index.css` and your Tailwind config.

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Run ESLint

## License

Feel free to use or modify this project for your portfolio — please credit this repository with a link.

---
Built with ❤️ using React, Vite, and Tailwind CSS.
