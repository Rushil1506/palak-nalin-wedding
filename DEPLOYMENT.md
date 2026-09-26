# Deployment — palaknalin.live

## Recommended hosting
Use GitHub Pages for this static invitation. GitHub Pages supports custom apex domains on GitHub Free when the repository is public.

### 1. Create the repository
Create a **public** repository, e.g. `palak-nalin-wedding`.
Upload the contents of this folder to the repository root. Do not upload the ZIP itself.

The project already includes:
- `CNAME` → `palaknalin.live`
- `.nojekyll`
- `index.html` at the repository root

### 2. Enable GitHub Pages
GitHub repository → **Settings** → **Pages** → Source: **Deploy from a branch** → Branch: `main` → Folder: `/ (root)` → Save.

### 3. Add the custom domain in GitHub
In **Settings → Pages → Custom domain**, enter:

`palaknalin.live`

Save it. GitHub will keep the custom-domain configuration with the site.

### 4. Configure DNS at Name.com
At Name.com DNS, create these four A records:

| Type | Host | Answer |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

Also create:

| Type | Host | Answer |
|---|---|---|
| CNAME | www | `YOUR-GITHUB-USERNAME.github.io` |

Keep the existing `CNAME` file in the repo. Do not add wildcard DNS records.

GitHub may take some time to verify the DNS and issue HTTPS. Once available, enable **Enforce HTTPS** in GitHub Pages settings.

### 5. Verify
Check:
- `https://palaknalin.live`
- `https://www.palaknalin.live`

The invitation should load at the root, not `/wedding/`.

## RSVP
The current RSVP is front-end only. Before sending the link to guests, connect `submitRsvp(payload)` in `script.js` to a simple serverless/form endpoint so responses are actually stored.

## Final QA
Test:
- 375px mobile
- 768px tablet
- 1440px desktop
- no horizontal overflow
- hamburger menu
- smooth-scroll links
- gallery swipe/buttons
- countdown
- map + directions
- RSVP success state
- social share preview
- HTTPS
