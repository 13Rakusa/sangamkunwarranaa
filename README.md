Sangam Kunwar Rana — Personal Portfolio

A personal portfolio website and online resume for Sangam Kunwar Rana, presenting his education, accounting experience, professional development, projects, skills, career direction, and contact information.

The site is designed around a clear professional direction toward business analysis, supply chain, logistics, and operations, while keeping the content honest about skills that are currently developing.

Live Profile

Portfolio: https://13rakusa.github.io/sangamkunwaranaa/

Resume (PDF): assets/sangam-kunwar-rana-resume.pdf

Resume (browser): https://13rakusa.github.io/sangamkunwaranaa/resume/

LinkedIn: https://www.linkedin.com/in/sangam-kunwar-rana-14535a407/

Facebook: https://www.facebook.com/sangamkunwarana

Instagram: https://www.instagram.com/sangamkunwaar/

About

The portfolio presents Sangam Kunwar Rana as a BBA graduate in Banking & Insurance with accounting experience in an audit-firm environment and an ongoing development path toward business analysis, supply chain, logistics, and operations.

The website emphasizes:

Practical experience rather than inflated claims

Continuous learning and professional development

A future-oriented transition from accounting toward analytical and operations-focused roles

A clean, editorial-style personal brand

Easy access to a downloadable one-page resume

Website Highlights

Hero Section

Introduces the professional profile, current direction, location, education, and resume download.

About / Profile

Provides a concise professional summary, portrait, current profile statement, and accounting experience evidence.

Career Journey

Displays development in stages, focusing on learning, evidence, and real-world experience.

Education

Presents the user's academic foundation and education history.

Skills / Capability Map

Groups skills by development stage instead of using misleading percentage-based progress bars.

Projects & Work

Provides a dedicated area for evidence of work, projects, and future portfolio additions.

Resume

Includes both a downloadable PDF resume and a browser-based resume page.

Contact

Provides direct contact and social-profile access.

World Clocks

Shows live local time for:

Kathmandu, Nepal

Seoul, South Korea

New York, USA

Madrid, Spain

Dubai, UAE

The clock section uses each location's official time-zone identifier.

Design Direction

The portfolio follows a minimalist, professional visual system with:

Deep green as the primary brand color

Warm yellow as a highlight/accent

Soft neutral backgrounds

Large editorial typography

Structured spacing and grid-based layouts

Responsive navigation for desktop and mobile

Accessibility-oriented markup such as skip navigation, semantic sections, labels, and descriptive image alt text

The primary theme color defined in the HTML is #24583C.

Project Structure

.
├── index.html
├── content.js
├── app.js
├── site.webmanifest
├── robots.txt
├── sitemap.xml
├── README.md
├── .gitignore
│
├── assets/
│   ├── styles.css
│   ├── sangam-profile.jpg
│   ├── sangam-kunwar-rana-resume.pdf
│   ├── social-preview.png
│   ├── favicon.svg
│   ├── icon-192.png
│   ├── icon-512.png
│   └── vendor/
│       └── nepali-date-converter.js
│
├── resume/
│   └── index.html   # printable/browser resume page
│
└── .github/
    └── workflows/
        └── deploy.yml   # publishes the site to GitHub Pages on every push to main

Keep the file and folder names consistent with the paths referenced by index.html.

Editable Content

Most of the portfolio's visible information is intended to be editable without redesigning the page.

Main content

Update the professional/profile text, skills, education, roadmap, projects, and contact information through:

content.js

Layout and styling

Update the visual design through:

assets/styles.css

Interactions and dynamic behavior

Update navigation, filters, clocks, dates, animations, and other JavaScript behavior through:

app.js

Main page structure

The main HTML layout is contained in:

index.html

Important Assets

The current HTML references these important files:

assets/sangam-kunwar-rana-resume.pdf
assets/sangam-profile.jpg
assets/social-preview.png
assets/favicon.svg
site.webmanifest

Replace these files only when needed, while keeping the same filenames or updating the corresponding references in the HTML.

Local Development

This is a static website, so it can be tested without a backend.

Option 1 — Open directly

Open index.html in a browser.

Option 2 — Run a local server

Using Python:

python -m http.server 8000

Then visit:

http://localhost:8000

A local server is preferable when testing relative asset paths, downloads, JavaScript modules, or browser behavior.

Deployment

The site is hosted on GitHub Pages and deploys automatically: every push to the `main` branch runs the `.github/workflows/deploy.yml` workflow and publishes the site within a couple of minutes.

Live URL: https://13rakusa.github.io/sangamkunwaranaa/

One-time hosting setup (documented here for reference):

1. The repository must be public for free GitHub Pages hosting (repo Settings → General → Danger Zone → Change visibility → Public). Only collaborators can edit the code — visitors can view the site but cannot change it.
2. Enable Pages with the Actions source: repo Settings → Pages → Build and deployment → Source: "GitHub Actions".
3. Push to `main` (or run the workflow manually from the Actions tab). The site goes live at the URL above.

A custom domain (for example a free .com.np domain for Nepali citizens) can be attached later in Settings → Pages → Custom domain — when you do, update the canonical/OG URLs in `index.html`, plus `robots.txt` and `sitemap.xml`.

Git Workflow

Typical update workflow:

git status
git add .
git commit -m "Update portfolio content"
git push origin main

The push to `main` triggers the automatic deployment to GitHub Pages.

Before pushing an important update, check:

git diff

Content Philosophy

This portfolio intentionally avoids presenting every skill as an expert-level capability. The site describes professional development as a progression, separating current strengths from skills being developed and future areas of specialization.

That approach is reflected directly in the page copy, including the capability section's principle of showing an "honest view" of development rather than percentage-based skill bars.

Accessibility & SEO Notes

The current HTML includes several useful foundations:

Responsive viewport configuration

Descriptive <title> and meta description

Open Graph metadata

Schema.org Person structured data

Semantic HTML sections

Skip-to-content navigation

Accessible navigation labels

Descriptive image alt text

aria-live for dynamically populated project content

noscript fallback messaging

The structured data also identifies the profile, education affiliation, social profiles, and professional description.

Future Improvements

Potential next updates for the portfolio include:

Replace the placeholder portrait image (`assets/sangam-profile.jpg`) with a real photograph, keeping the same filename.

Review the dates and wording in `content.js` and the resume so they exactly match official records.

Add verified project case studies with measurable outcomes.

Add certificates and relevant professional training as they are completed.

Add GitHub/project links where applicable.

Add a custom domain and configure HTTPS through the hosting provider.

Add analytics only if privacy and performance requirements are acceptable.

Keep resume PDF and website profile synchronized whenever education, experience, or target roles change.

Credits

Built as a personal portfolio for Sangam Kunwar Rana.

© 2026 Sangam Kunwar Rana. All rights reserved.
