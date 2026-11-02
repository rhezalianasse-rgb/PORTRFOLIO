# Art Anass — Developer Portfolio

A responsive personal portfolio built with React, Three.js, React Three Fiber, Drei, Framer Motion, and Lucide. The 3D hero is a real-time scene; personal details and portfolio content are configured centrally.

## Windows setup

Install a current Node.js LTS release, open PowerShell in this folder, and run:

```powershell
npm install
npm start
```

Open the URL Vite prints in the terminal (usually [http://localhost:5173](http://localhost:5173)).

## Personalize the portfolio

Edit [`src/data/portfolio.js`](./src/data/portfolio.js) to update the name, education, profile image path, skills, projects, email, and social links.

- Place your real portrait at `public/images/profile.png`. The configured path is `/images/profile.png`; use the original photo so your appearance is not altered. The visual frame shows a neutral add-photo treatment until the image is present.
- Add only skills you have confirmed to `skills`.
- Add project objects to `projects` with a `title`, `description`, and only supplied `technologies`, `image`, `github`, `demo`, or `status` values. Actions are omitted if their URLs are blank.
- Add your real email and social URLs when ready. The contact form is intentionally a front-end preview and does not send or store messages. To receive submissions, connect a secure server-side form endpoint or trusted form provider; never put private API keys in the browser.
- Update the Open Graph image in `public/index.html` if you want a separate social preview image.

## Commands

```powershell
npm start
npm test
npm run build
```

The production build is written to `dist/`. `npm run preview` serves that build locally.

## Deploy

### Vercel

Import the repository in Vercel. Use `npm run build` as the build command and `dist` as the output directory. No environment variables are required for the portfolio as configured.

### Netlify

Import the repository in Netlify. Use `npm run build` as the build command and `dist` as the publish directory. No environment variables are required for the portfolio as configured.

## Favicon

The custom `public/favicon.svg` is used as the browser favicon. Replace it to change the tab icon; `public/favicon.ico` and `public/logo192.png` remain fallback/PWA assets from the starter project.
