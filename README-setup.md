# K-Means Candidate Segmentation — Portfolio Website

## Quick Start (Vite + React)

```bash
cd "D:\David Medina\GitHub\K-means_analysis_candidates"
npm create vite@latest . -- --template react
npm install
```

## Project Folder Structure

```
K-means_analysis_candidates/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── myriskexp-logo.png          ← Your logo here
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── ExecutiveSummary.jsx
│   │   ├── BusinessContext.jsx
│   │   ├── DataScope.jsx
│   │   ├── MethodSummary.jsx
│   │   ├── Findings.jsx
│   │   ├── VisualInsights.jsx
│   │   ├── Implications.jsx
│   │   ├── Recommendations.jsx
│   │   ├── Limitations.jsx
│   │   ├── Appendix.jsx
│   │   ├── Footer.jsx
│   │   ├── ClusterScatter.jsx
│   │   ├── DonutChart.jsx
│   │   ├── MiniBar.jsx
│   │   └── GeoBar.jsx
│   ├── content/
│   │   └── content.js                  ← Bilingual content schema (EN/ES)
│   ├── styles/
│   │   ├── global.css
│   │   └── palette.js
│   ├── hooks/
│   │   └── useLanguage.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Using the Logo in Vite

In `src/components/Navbar.jsx`:
```jsx
// Logo import for Vite (adjust path based on component location)
import logo from "../assets/myriskexp-logo.png";

// Usage in JSX:
<img
  src={logo}
  alt="MyRiskExp — Risk Analysis & Strategic Intelligence"
  style={{ height: 32 }}  // ← Adjust size here
/>
```

In `src/App.jsx` (if used at root level):
```jsx
import logo from "./assets/myriskexp-logo.png";
```

## How to Decompose the Single-File into Vite Components

The provided `kmeans-portfolio.jsx` contains the entire app in one file for preview. To split into the Vite project:

1. **Extract `content` object** → `src/content/content.js` (export default)
2. **Extract `palette` object** → `src/styles/palette.js`
3. **Extract each section** → Individual component files in `src/components/`
4. **Create `useLanguage` hook** → Manages `lang` state and provides `t = content[lang]`
5. **Wire `App.jsx`** → Import all components + hook, compose layout

## Anonymization Checklist

Before publishing to GitHub:

- [x] "Gi Group" → Not mentioned anywhere (replaced with "Anonymous Client")
- [x] "Computrabajo" → Referred to as "recruitment platform" / "plataforma de reclutamiento"
- [x] No personal data, names, or identifiers
- [x] No client logos
- [x] Geographic data kept (public cities, not sensitive)
- [x] All numeric data from analysis preserved (aggregated, non-identifying)
- [ ] Verify no notebook outputs contain raw candidate rows
- [ ] Check PDF screenshots for any remaining logos before embedding

## Content Populated from PDF

All sections are populated with real anonymized data from the analysis:

| Section | Data Source | Status |
|---------|-----------|--------|
| Hero stats | PDF p.5 | ✅ Complete |
| Demographics | PDF p.6-7 | ✅ Complete |
| Geography | PDF p.8-9 | ✅ Complete |
| Education | PDF p.10-11 | ✅ Complete |
| Languages | PDF p.13-15 | ✅ Complete |
| Cluster results | PDF p.24-32 | ✅ Complete |
| Top occupations per cluster | PDF p.26,28,30,32 | ✅ Complete |
| Conclusions | PDF p.34-35 | ✅ Complete |
| Recommendations | PDF p.36 | ✅ Complete |
| Risks | PDF p.37 | ✅ Complete |
| PCA description | PDF p.42 | ✅ Referenced |
| Validation metrics | PDF p.43 | ✅ Referenced |

## Deployment to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# In vite.config.js, set base:
export default defineConfig({
  base: '/K-means_analysis_candidates/',
  plugins: [react()],
})

# Deploy
npm run deploy
```

---

Developed by **MyRiskExp** — Risk Analysis & Strategic Intelligence.
© 2026 MyRiskExp. All rights reserved.
