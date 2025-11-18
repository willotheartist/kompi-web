# 📁 kompi-web - Project Structure

*Generated on: 17/11/2025, 20:08:14*

## 📋 Quick Overview

| Metric | Value |
|--------|-------|
| 📄 Total Files | 155 |
| 📁 Total Folders | 72 |
| 🌳 Max Depth | 6 levels |
| 🛠️ Tech Stack | React, Next.js, TypeScript, CSS, Node.js, Docker |

## ⭐ Important Files

- 🟡 🚫 **.gitignore** - Git ignore rules
- 🟡 🐳 **Dockerfile** - Docker container
- 🔴 📖 **README.md** - Project documentation
- 🟡 🐳 **docker-compose.yml** - Docker compose
- 🔵 🔍 **eslint.config.mjs** - ESLint config
- 🟡 ▲ **next.config.ts** - Next.js config
- 🔴 📦 **package.json** - Package configuration
- 🟡 🔷 **tsconfig.json** - TypeScript config

## 📊 File Statistics

### By File Type

- ⚛️ **.tsx** (React TypeScript files): 72 files (46.5%)
- 🔷 **.ts** (TypeScript files): 24 files (15.5%)
- 📄 **.zip** (Other files): 12 files (7.7%)
- 🎨 **.css** (Stylesheets): 10 files (6.5%)
- 🖼️ **.png** (PNG images): 8 files (5.2%)
- 🎨 **.svg** (SVG images): 7 files (4.5%)
- 📄 **.sql** (Other files): 5 files (3.2%)
- ⚙️ **.json** (JSON files): 3 files (1.9%)
- 📖 **.md** (Markdown files): 2 files (1.3%)
- 📄 **.mjs** (Other files): 2 files (1.3%)
- 🚫 **.gitignore** (Git ignore): 1 files (0.6%)
- 🐳 **.dockerfile** (Docker files): 1 files (0.6%)
- ⚙️ **.yml** (YAML files): 1 files (0.6%)
- ⚙️ **.yaml** (YAML files): 1 files (0.6%)
- ⚙️ **.toml** (TOML files): 1 files (0.6%)
- 📄 **.prisma** (Other files): 1 files (0.6%)
- 📄 **.sh** (Other files): 1 files (0.6%)
- 🖼️ **.ico** (Icon files): 1 files (0.6%)
- 📜 **.js** (JavaScript files): 1 files (0.6%)
- 📄 **.tsbuildinfo** (Other files): 1 files (0.6%)

### By Category

- **React**: 72 files (46.5%)
- **TypeScript**: 24 files (15.5%)
- **Other**: 22 files (14.2%)
- **Assets**: 16 files (10.3%)
- **Styles**: 10 files (6.5%)
- **Config**: 6 files (3.9%)
- **DevOps**: 2 files (1.3%)
- **Docs**: 2 files (1.3%)
- **JavaScript**: 1 files (0.6%)

### 📁 Largest Directories

- **root**: 155 files
- **src**: 105 files
- **src/app**: 52 files
- **src/components**: 48 files
- **public**: 15 files

## 🌳 Directory Structure

```
kompi-web/
├── 🟡 🚫 **.gitignore**
├── 📄 auth-bundle.zip
├── ⚙️ components.json
├── 🟡 🐳 **docker-compose.yml**
├── 🟡 🐳 **Dockerfile**
├── 🔵 🔍 **eslint.config.mjs**
├── 📄 k-cards-dashboard.zip
├── 📄 kompi-analytics-debug.zip
├── 📄 kompi-kcards-context.zip
├── 📄 kompi-kr-codes-api.zip
├── 📄 kompi-kr-codes-button.zip
├── 📄 kompi-kr-codes-support.zip
├── 📄 kompi-kr-codes-ui.zip
├── 📄 kompi-web-upload.zip
├── 📄 link-analytics-debug.zip
├── 📄 link-routing-check.zip
├── 📄 links-grid-with-dashboard.zip
├── 🔷 next-env.d.ts
├── 🟡 ▲ **next.config.ts**
├── 🔴 📦 **package.json**
├── ⚙️ pnpm-lock.yaml
├── 📄 postcss.config.mjs
├── 📂 prisma/
│   ├── 📂 migrations/
│   │   ├── 📂 20251108223758_init/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20251108224855_add_clicks_to_links/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20251108230708_add_click_events/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20251108231306_add_bio_page/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20251108232240_auth_schema_update/
│   │   │   └── 📄 migration.sql
│   │   └── ⚙️ migration_lock.toml
│   └── 📄 schema.prisma
├── 📖 project_structure.md
├── 🌐 public/
│   ├── 🎨 file.svg
│   ├── 🎨 globe.svg
│   ├── 🎨 Kompi..svg
│   ├── 🖼️ kompifive.png
│   ├── 🖼️ kompifour.png
│   ├── 🖼️ kompione.png
│   ├── 🖼️ kompiphoto.png
│   ├── 🖼️ kompiseven.png
│   ├── 🖼️ kompisix.png
│   ├── 🖼️ kompithree.png
│   ├── 🖼️ kompitwo.png
│   ├── 🎨 Kompiwhite.svg
│   ├── 🎨 next.svg
│   ├── 🎨 vercel.svg
│   └── 🎨 window.svg
├── 🔷 qrcode.d.ts
├── 🔴 📖 **README.md**
├── 📂 scripts/
│   └── 📄 smoke.sh
├── 📁 src/
│   ├── 🚀 app/
│   │   ├── 📂 analytics/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 🔌 api/
│   │   │   ├── 📂 auth/
│   │   │   │   └── 📂 [...nextauth]/
│   │   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 bio/
│   │   │   │   ├── 📂 bootstrap/
│   │   │   │   │   └── 🔷 route.ts
│   │   │   │   ├── 📂 links/
│   │   │   │   │   └── 🔷 route.ts
│   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 health/
│   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 kr-codes/
│   │   │   │   ├── 📂 [id]/
│   │   │   │   │   ├── 📂 style/
│   │   │   │   │   │   └── 🔷 route.ts
│   │   │   │   │   └── 📂 svg/
│   │   │   │   │   │   └── 🔷 route.ts
│   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 links/
│   │   │   │   ├── 📂 [id]/
│   │   │   │   │   ├── 📂 analytics/
│   │   │   │   │   │   └── 🔷 route.ts
│   │   │   │   │   ├── 📂 qr/
│   │   │   │   │   │   └── 🔷 route.ts
│   │   │   │   │   └── 🔷 route.ts
│   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 settings/
│   │   │   │   └── 📂 profile/
│   │   │   │   │   └── 🔷 route.ts
│   │   │   └── 📂 workspaces/
│   │   │   │   └── 🔷 route.ts
│   │   ├── 📂 dashboard/
│   │   │   ├── 📂 k-cards/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 kr-codes/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 links/
│   │   │   │   └── 📂 new/
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── ⚛️ page.tsx
│   │   │   ├── 📂 settings/
│   │   │   │   ├── 📂 advanced/
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   ├── 📂 billing/
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   ├── 📂 branding/
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   ├── 📂 domains/
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   ├── 📂 integrations/
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   ├── ⚛️ layout.tsx
│   │   │   │   ├── ⚛️ page.tsx
│   │   │   │   └── 📂 profile/
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   └── 📂 support/
│   │   │   │   ├── ⚛️ layout.tsx
│   │   │   │   └── ⚛️ page.tsx
│   │   ├── 🖼️ favicon.ico
│   │   ├── 📂 features/
│   │   │   └── 📂 url-shortener/
│   │   │   │   ├── ⚛️ page.tsx
│   │   │   │   └── 🎨 url-shortener.css
│   │   ├── 🎨 globals.css
│   │   ├── 📂 growth/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 k-cards/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 🎨 kompi-marketing.css
│   │   ├── 📂 kr-codes/
│   │   │   ├── 📂 page.jsrtener/
│   │   │   │   └── 📜 page.js
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 KR-Codes-QR-Code-Generator/
│   │   │   ├── 🎨 kr-codes.css
│   │   │   └── ⚛️ page.tsx
│   │   ├── ⚛️ layout.tsx
│   │   ├── 📂 links/
│   │   │   ├── 📂 [id]/
│   │   │   │   ├── 📂 edit/
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 new/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   └── ⚛️ page.tsx
│   │   ├── ⚛️ not-found.tsx
│   │   ├── 📂 p/
│   │   │   └── 📂 [slug]/
│   │   │   │   └── ⚛️ page.tsx
│   │   ├── ⚛️ page.tsx
│   │   ├── 📂 pricing/
│   │   │   ├── ⚛️ page.tsx
│   │   │   └── 🎨 pricing.css
│   │   ├── 📂 r/
│   │   │   └── 📂 [code]/
│   │   │   │   └── 🔷 route.ts
│   │   └── 📂 signin/
│   │   │   └── ⚛️ page.tsx
│   ├── 🧩 components/
│   │   ├── 📂 analytics/
│   │   │   └── ⚛️ analytics-overview.tsx
│   │   ├── 📂 bio/
│   │   │   └── ⚛️ bio-card.tsx
│   │   ├── 📂 dashboard/
│   │   │   ├── ⚛️ create-modal.tsx
│   │   │   ├── ⚛️ create-workspace-empty.tsx
│   │   │   ├── ⚛️ dashboard-layout.tsx
│   │   │   ├── 🎨 dashboard-shell.css
│   │   │   ├── ⚛️ dashboard-shell.tsx
│   │   │   ├── ⚛️ dashboard-topbar.tsx
│   │   │   └── ⚛️ glass-card.tsx
│   │   ├── ⚛️ features-megamenu.tsx
│   │   ├── 🎨 footer-cta.css
│   │   ├── ⚛️ footer-cta.tsx
│   │   ├── 📂 k-cards/
│   │   │   ├── 🔷 kcard-theme-presets.ts
│   │   │   ├── ⚛️ KCardsPage.tsx
│   │   │   └── ⚛️ KCardThemeSection.tsx
│   │   ├── 🎨 kompi-promo-cards.css
│   │   ├── ⚛️ KompiPerks.tsx
│   │   ├── ⚛️ KompiPromoCards.tsx
│   │   ├── ⚛️ KPromo.tsx
│   │   ├── 📂 kr-codes/
│   │   │   └── ⚛️ KRCodesPage.tsx
│   │   ├── 📂 layout/
│   │   │   └── ⚛️ side-nav.tsx
│   │   ├── 📂 links/
│   │   │   ├── ⚛️ create-link-form.tsx
│   │   │   ├── ⚛️ create-link-page.tsx
│   │   │   ├── ⚛️ edit-link-form.tsx
│   │   │   ├── ⚛️ link-actions-menu.tsx
│   │   │   ├── ⚛️ link-analytics-chart.tsx
│   │   │   ├── ⚛️ link-analytics-client.tsx
│   │   │   ├── ⚛️ links-list-client.tsx
│   │   │   └── ⚛️ links-table.tsx
│   │   ├── ⚛️ navbar-gate.tsx
│   │   ├── 🎨 navbar.css
│   │   ├── ⚛️ navbar.tsx
│   │   ├── ⚛️ providers.tsx
│   │   ├── 📂 settings/
│   │   │   └── ⚛️ profile-settings-client.tsx
│   │   ├── 🎨 ui/
│   │   │   ├── ⚛️ button.tsx
│   │   │   ├── ⚛️ card.tsx
│   │   │   ├── ⚛️ dialog.tsx
│   │   │   ├── ⚛️ input.tsx
│   │   │   ├── ⚛️ select.tsx
│   │   │   ├── ⚛️ skeleton.tsx
│   │   │   ├── ⚛️ sonner.tsx
│   │   │   └── ⚛️ textarea.tsx
│   │   ├── ⚛️ user-menu.tsx
│   │   ├── 🎨 why-kompi.css
│   │   ├── ⚛️ why-kompi.tsx
│   │   └── 📂 workspaces/
│   │   │   ├── ⚛️ create-workspace-cta.tsx
│   │   │   ├── ⚛️ create-workspace-modal.tsx
│   │   │   └── ⚛️ workspace-switcher.tsx
│   └── 📚 lib/
│   │   ├── 🔷 analytics-overview.ts
│   │   ├── 🔷 auth.ts
│   │   ├── 🔷 fonts.ts
│   │   ├── 🔷 prisma.ts
│   │   └── 🔷 utils.ts
├── 🟡 🔷 **tsconfig.json**
└── 📄 tsconfig.tsbuildinfo
```

## 📖 Legend

### File Types
- 🚫 DevOps: Git ignore
- 🐳 DevOps: Docker files
- 📖 Docs: Markdown files
- 📄 Other: Other files
- ⚙️ Config: JSON files
- ⚙️ Config: YAML files
- 🔷 TypeScript: TypeScript files
- ⚙️ Config: YAML files
- ⚙️ Config: TOML files
- 🎨 Assets: SVG images
- 🖼️ Assets: PNG images
- 🎨 Styles: Stylesheets
- ⚛️ React: React TypeScript files
- 🖼️ Assets: Icon files
- 📜 JavaScript: JavaScript files

### Importance Levels
- 🔴 Critical: Essential project files
- 🟡 High: Important configuration files
- 🔵 Medium: Helpful but not essential files
