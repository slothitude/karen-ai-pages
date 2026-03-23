# karen-ai-pages

Karen AI — Professional Grievance Escalation System, hosted on GitHub Pages.

## Setup

1. Deploy `karen-ai-proxy` (Cloudflare Worker) first → get your `workers.dev` URL
2. In `index.html`, replace:
   ```js
   const NIM_URL = 'https://karen-ai-proxy.YOUR-SUBDOMAIN.workers.dev';
   ```
   with your actual Worker URL.
3. Push to GitHub → enable Pages in repo Settings → Pages → Deploy from `main` branch root.

Live at: `https://YOUR-USERNAME.github.io/karen-ai-pages`
