# DeadTech (Rspack)

This workspace contains a small React app scaffolded to run the provided components and `pages/DeadTech.js` using Rspack.

What I added:

- `package.json` with scripts for `start`, `build`, and `preview`.
- `rspack.config.js` - minimal Rspack config with alias `@` -> project root.
- `public/index.html` - app host page.
- `src/index.jsx` - React entry that mounts `pages/DeadTech.js`.
- `src/main.css` - tiny fallback CSS so UI is legible without Tailwind.
- `entities/Technology.js` - a stubbed `Technology.list()` that returns sample data.
- `components/game/*` re-exports so existing imports that expect `components/game/...` will work.
- `components/ui/*` minimal UI shims used by the components (`Button`, `Badge`, `Card`, `Dialog`).

How to run (Windows, bash):

```bash
npm install
npm start
```

Open http://localhost:3000 in your browser.

Notes:
- I kept the provided components untouched and added thin shims so they can be resolved at runtime.
- The UI uses a small CSS fallback; to get full styling, integrate Tailwind and the original UI library used in the project.
