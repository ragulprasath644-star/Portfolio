# Ragul Prasath V – Portfolio 

## 1. Overview
A single-file portfolio website (`index.html`, about 42 KB) for Ragul Prasath V, Data Scientist, AI/ML and Quantitative Analyst. No build step, no framework, no tracking. Your photo is embedded inside the file, so it works anywhere.

**Goal:** a recruiter should understand who you are in 10 seconds, see proof in 30, and know how to contact you in 60.

## 2. Page structure
| Section | Purpose |
|---|---|
| Navigation | Sticky bar with jump links |
| Hero | Name, role, one-line value statement, photo, three calls to action |
| Stat strip | Four proof points taken from your resume (93.73% PDR, 2,976 observations, M.Sc., IIT Madras) |
| Live demo | Interactive Dijkstra shortest-path graph. Click a node to see the route and its cost |
| Projects | Accident Prediction, E-commerce Dashboard, Adaptive IoV Traffic Engineering, Vehicle Rental System |
| Skills | Seven grouped rows covering everything in your resume |
| Education and beyond the code | Timeline, workshops, leadership, languages |
| Contact | Email, phone, LinkedIn |

## 3. Design decisions
- **Concept:** graph paper, because data science is built on structure. The hero photo sits on a saffron arch, a nod to Tamil Nadu.
- **Standout element:** the live routing demo. It turns your Accident Prediction and IoV projects into something a recruiter can touch, and shows you can implement graph algorithms, not just list them.
- **Colors:** ink indigo `#171A4A`, saffron `#F2A31B`, electric blue `#2F3BD1`, cool paper `#EEF1F7`. A dark theme switches on automatically.
- **Type:** Bricolage Grotesque for headings, IBM Plex Sans for body text, both from Google Fonts, with system fallbacks.
- **Quality:** responsive down to phones, keyboard focus outlines, reduced-motion respected, semantic HTML, meta description for search.

## 4. How the demo works
1. Fourteen nodes (A to N) are placed at fixed positions. Nodes closer than a set distance get an edge, weighted by that distance.
2. Node A is the source. Clicking a node runs Dijkstra's algorithm (simple O(n²) version) in JavaScript.
3. The cheapest path is animated in saffron and the side panel shows the total cost and route.

To change the graph, edit the `P` array (node coordinates, 0 to 1) in the `<script>` block at the bottom of `index.html`.

## 5. Editing your content
Open `index.html` in any text editor. Search for these markers:
- **Name, role, intro:** the `<header class="hero">` block.
- **Stats:** the `<div class="stats">` block.
- **Projects:** each `<article class="card">`. Copy one to add a project.
- **Skills:** each row in `<div class="sk">`. Add `<span>Skill</span>` inside `.chips`.
- **Contact details:** search for `ragulprasath644@gmail.com`, `9345690254` and the LinkedIn URL.
- **Colors:** the variables at the top of the `<style>` block (`--acc`, `--acc2`, `--ink`, `--bg`).

## 6. Recommended next improvements
These need information only you have, so I left them out rather than invent anything:
1. **GitHub links.** Add a "Code" link to each project card.
2. **Resume PDF.** Add `<a class="btn" href="resume.pdf" download>Download resume</a>` in the hero and place `resume.pdf` next to `index.html`.
3. **Project screenshots**, especially the Power BI dashboard. Add `<img>` tags inside the cards.
4. **Results and impact.** For the dashboard and the classification work, add numbers such as accuracy, rows analysed or insights found.
5. **Certificates** for the IIT Madras and PSG workshops.

## 7. Deployment (free)
**GitHub Pages**
1. Create a repository named `ragulprasath.github.io` (use your GitHub username).
2. Upload `index.html` and commit.
3. Settings → Pages → Deploy from branch `main`. Your site goes live in about a minute.

**Netlify (fastest)**
1. Go to app.netlify.com/drop.
2. Drag the folder containing `index.html` onto the page. You get a live link immediately.

**Custom domain:** buy something like `ragulprasath.dev` and point it to the host using its Domains settings.

## 8. Recruiter and SEO checklist
- Put the live link at the top of your resume and your LinkedIn Featured section.
- Use the same title everywhere: "Data Scientist | AI/ML | Quantitative Analyst".
- Keep the page title and meta description current.
- Test on your phone before sharing.

## 9. Interview talking points
- **Accident Prediction:** explain why a graph model suits traffic, what packet delivery ratio measures, and how you chose Dijkstra for routing.
- **Dashboard:** describe the business questions the KPIs answer and one insight you found.
- **Explainability:** be ready to explain SHAP and LIME, since they differentiate you from many candidates.
- **Mathematics background:** link your M.Sc. in Applied Mathematics to quantitative analyst work.
- **Leadership:** use the Hockey vice-captain role for teamwork questions.

## 10. Browser support and files
Works in current Chrome, Edge, Safari and Firefox. Deliverables: `index.html` (the portfolio) and this `README.md`.

## 11. Deployable folder (use this one)
The zip `Ragul_Portfolio_Website.zip` holds the real website, split into separate files:

```
site/
├── index.html                  structure and content
├── style.css                   all styling and colors
├── script.js                   Dijkstra demo
├── assets/photo.webp           your photo
├── Ragul_Prasath_V_Resume.pdf  resume download
└── Ragul_Prasath_V_Resume.docx editable resume
```
The resume buttons (hero, top navigation and contact section) link to the PDF. To update your resume, replace the PDF with the same file name. Upload the whole folder to GitHub Pages or Netlify. The single-file `index.html` in section 1 is a preview copy, and downloads do not work inside the claude.ai preview.
