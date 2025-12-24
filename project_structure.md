# 📁 kompi-web - Project Structure

*Generated on: 24/12/2025, 12:40:27*

## 📋 Quick Overview

| Metric | Value |
|--------|-------|
| 📄 Total Files | 629 |
| 📁 Total Folders | 285 |
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

- ⚛️ **.tsx** (React TypeScript files): 351 files (55.8%)
- 🔷 **.ts** (TypeScript files): 95 files (15.1%)
- 🖼️ **.png** (PNG images): 85 files (13.5%)
- 📄 **.sql** (Other files): 24 files (3.8%)
- 🎨 **.css** (Stylesheets): 11 files (1.7%)
- ⚙️ **.json** (JSON files): 8 files (1.3%)
- 📄 **.mjs** (Other files): 7 files (1.1%)
- 🎨 **.svg** (SVG images): 7 files (1.1%)
- 📄 **.bak_lintfix** (Other files): 4 files (0.6%)
- 📄 **.mp4** (Other files): 3 files (0.5%)
- 📖 **.md** (Markdown files): 2 files (0.3%)
- 🖼️ **.ico** (Icon files): 2 files (0.3%)
- 🚫 **.gitignore** (Git ignore): 1 files (0.2%)
- 📄 **.** (Other files): 1 files (0.2%)
- 🐳 **.dockerfile** (Docker files): 1 files (0.2%)
- 📄 **.txt** (Text files): 1 files (0.2%)
- ⚙️ **.yml** (YAML files): 1 files (0.2%)
- 📄 **.patch** (Other files): 1 files (0.2%)
- ⚙️ **.yaml** (YAML files): 1 files (0.2%)
- ⚙️ **.toml** (TOML files): 1 files (0.2%)
- 📄 **.prisma** (Other files): 1 files (0.2%)
- 🖼️ **.jpg** (JPEG images): 1 files (0.2%)
- 📄 **.py** (Other files): 1 files (0.2%)
- 📄 **.sh** (Other files): 1 files (0.2%)
- 📄 **.gz** (Other files): 1 files (0.2%)
- 📄 **.bak_py** (Other files): 1 files (0.2%)
- 📄 **.pre_pro_text** (Other files): 1 files (0.2%)
- 📄 **.bak_sidebar_modern** (Other files): 1 files (0.2%)
- 📄 **.bak_sidebar_typo2** (Other files): 1 files (0.2%)
- 📄 **.bak_sidebar_typography** (Other files): 1 files (0.2%)
- 📄 **.bak_variant** (Other files): 1 files (0.2%)
- 📄 **.bak_contactfix** (Other files): 1 files (0.2%)
- 📄 **.fix-onavatarclear** (Other files): 1 files (0.2%)
- 📄 **.header-social** (Other files): 1 files (0.2%)
- 📄 **.header-v2** (Other files): 1 files (0.2%)
- 📄 **.pre-kcards-modal** (Other files): 1 files (0.2%)
- 📄 **.fix_button_block** (Other files): 1 files (0.2%)
- 📄 **.fix_limit_block** (Other files): 1 files (0.2%)
- 📄 **.fix_links_copy2** (Other files): 1 files (0.2%)
- 📄 **.pre_pro_copy** (Other files): 1 files (0.2%)
- 📄 **.bak_lintfix2** (Other files): 1 files (0.2%)
- 📄 **.tsbuildinfo** (Other files): 1 files (0.2%)

### By Category

- **React**: 351 files (55.8%)
- **TypeScript**: 95 files (15.1%)
- **Assets**: 95 files (15.1%)
- **Other**: 61 files (9.7%)
- **Config**: 11 files (1.7%)
- **Styles**: 11 files (1.7%)
- **Docs**: 3 files (0.5%)
- **DevOps**: 2 files (0.3%)

### 📁 Largest Directories

- **root**: 629 files
- **src**: 479 files
- **src/app**: 251 files
- **src/components**: 187 files
- **public**: 95 files

## 🌳 Directory Structure

```
kompi-web/
├── 🟡 🚫 **.gitignore**
├── 📄 =
├── ⚙️ components.json
├── 📄 dashboardlayout_wrappers.txt
├── 🟡 🐳 **docker-compose.yml**
├── 🟡 🐳 **Dockerfile**
├── 🔵 🔍 **eslint.config.mjs**
├── 📄 make-qr-sticky.patch
├── 🔷 middleware.ts
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
│   │   ├── 📂 20251119091921_add_kcard_table/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20251122134807_add_slug_and_is_public_to_kcard/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20251122214701_add_type_to_krcode/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20251123225543_add_link_title/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20251124161517_add_workspace_plan/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20251125215335_add_menu_table/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20251125222442_add_qr_menus/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20251128203225_add_menu_background_hex/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20251129013058_creator_tools/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20251129120427_contact_form_option_b/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20251129123720_add_stripe_fields_to_workspace/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20251130193524_add_password_hash_to_user/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20251130200601_add_marketing_optin_and_password_reset/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20251130205515_init_auth_features/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20251202195231_add_kcard_link_clicks/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20251205202257_add_workspace_tool/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20251212201122_add_kcard_messages/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20251221000734_add_utms_and_optional_workspaceid/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20251221014443_add_click_geo_and_referrerhost/
│   │   │   └── 📄 migration.sql
│   │   └── ⚙️ migration_lock.toml
│   └── 📄 schema.prisma
├── 📖 project_structure.md
├── 🌐 public/
│   ├── 🖼️ cards48.png
│   ├── 🖼️ cards49.png
│   ├── 🖼️ cards50.png
│   ├── 📂 faces/
│   │   ├── 🖼️ face77.png
│   │   ├── 🖼️ face78.png
│   │   ├── 🖼️ face79.png
│   │   ├── 🖼️ face80.png
│   │   ├── 🖼️ face81.png
│   │   ├── 🖼️ face82.png
│   │   ├── 🖼️ face83.png
│   │   ├── 🖼️ face84.png
│   │   └── 🖼️ face85.png
│   ├── 🖼️ favicon.ico
│   ├── 📂 feature/
│   │   ├── 🖼️ f11.png
│   │   ├── 🖼️ f12.png
│   │   ├── 🖼️ f13.png
│   │   └── 🖼️ f14.png
│   ├── 🎨 file.svg
│   ├── 🎨 globe.svg
│   ├── 📂 growth/
│   │   ├── 🖼️ analytics.png
│   │   ├── 🖼️ k-cards.png
│   │   ├── 🖼️ kompi-codes.png
│   │   ├── 🖼️ links.png
│   │   ├── 🖼️ menu-builder.png
│   │   └── 🖼️ subscribers.png
│   ├── 🖼️ herobg.png
│   ├── 🖼️ herowoman.png
│   ├── 🖼️ kcard-dashboard-card.png
│   ├── 🖼️ kompi-analytics.png
│   ├── 🖼️ kompi-branding.png
│   ├── 🖼️ kompi-business.png
│   ├── 🖼️ kompi-platform.png
│   ├── 🎨 Kompi..svg
│   ├── 🖼️ kompiboxes.png
│   ├── 🖼️ kompicollage.png
│   ├── 🖼️ kompifive.png
│   ├── 🖼️ kompifour.png
│   ├── 🖼️ kompiimage1.png
│   ├── 🖼️ kompiimage18.png
│   ├── 🖼️ kompiimage19.png
│   ├── 🖼️ kompiimage2.png
│   ├── 🖼️ kompiimage3.png
│   ├── 🖼️ kompiimage4.png
│   ├── 🖼️ kompiimage5.png
│   ├── 🖼️ kompiimage7.png
│   ├── 🖼️ kompiimage8.png
│   ├── 🖼️ kompione.png
│   ├── 🖼️ kompiphoto.png
│   ├── 🖼️ kompiseven.png
│   ├── 🖼️ kompisignin.png
│   ├── 🖼️ kompisix.png
│   ├── 🖼️ kompithree.png
│   ├── 🖼️ kompitwo.png
│   ├── 🎨 Kompiwhite.svg
│   ├── 🖼️ kr-dashboard-card.png
│   ├── 📂 kroptions/
│   │   ├── 🖼️ classic.png
│   │   ├── 🖼️ corner dot d.png
│   │   ├── 🖼️ corner dot s.png
│   │   ├── 🖼️ corner r.png
│   │   ├── 🖼️ corner s.png
│   │   ├── 🖼️ diamond.png
│   │   ├── 🖼️ dots.png
│   │   ├── 🖼️ rounded.png
│   │   ├── 🖼️ soft.png
│   │   └── 🖼️ star.png
│   ├── 🖼️ links-dashboard-card.png
│   ├── 🎨 next.svg
│   ├── 🖼️ pexels-dom-j-7304-45982.jpg
│   ├── 🖼️ rosadjkompi.png
│   ├── 📂 seo/
│   │   └── 📄 qr-gen-online.mp4
│   ├── 📂 solutions/
│   │   ├── 🖼️ kards1.png
│   │   ├── 🖼️ solutions19.png
│   │   ├── 🖼️ solutions20.png
│   │   ├── 🖼️ solutions21.png
│   │   ├── 🖼️ solutions22.png
│   │   ├── 🖼️ solutions23.png
│   │   ├── 🖼️ solutions24.png
│   │   ├── 🖼️ solutions25.png
│   │   └── 🖼️ solutions26.png
│   ├── 📂 tips/
│   │   ├── 🖼️ one.png
│   │   ├── 🖼️ three.png
│   │   └── 🖼️ two.png
│   ├── 📂 uploads/
│   │   ├── 📂 avatars/
│   │   │   └── 🖼️ cmi5s886t0000hnv8iw0v0hxe-1766404469259.png
│   │   └── 📂 krcodes/
│   │   │   └── 🖼️ cmiadm2e00003js049itq83xr.png
│   ├── 🎨 vercel.svg
│   ├── 📂 videos/
│   │   └── 📂 passgen/
│   │   │   ├── 📄 password-gen-kompi.mp4
│   │   │   └── 📄 password-generator-with-kompi.mp4
│   ├── 📂 widgets/
│   │   ├── 🖼️ widget2.png
│   │   ├── 🖼️ widget3.png
│   │   ├── 🖼️ widget4.png
│   │   ├── 🖼️ widget5.png
│   │   ├── 🖼️ widget6.png
│   │   └── 🖼️ widget8.png
│   ├── 🎨 window.svg
│   └── 🖼️ workspacekompi.png
├── 🔷 qrcode.d.ts
├── 🔴 📖 **README.md**
├── 📂 scripts/
│   ├── 📄 backfill-pseo-dates.mjs
│   ├── 🔷 check-qr-indexability.ts
│   ├── 📄 debug-db.mjs
│   ├── 📄 debug-events.mjs
│   ├── 📄 gen-qr-ideas.mjs
│   ├── 📂 python3 scripts/
│   │   └── 📄 patch_kcards_header_v2.py
│   ├── 📄 smoke.sh
│   ├── 📄 test-click-event.mjs
│   └── 🔷 why-noindex.ts
├── 📄 settings.tar.gz
├── 📁 src/
│   ├── 🚀 app/
│   │   ├── 📂 (dashboard)/
│   │   │   ├── 📂 analytics/
│   │   │   │   ├── ⚛️ loading.tsx
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 kr-codes/
│   │   │   │   ├── 📂 [id]/
│   │   │   │   │   ├── 📂 edit/
│   │   │   │   │   │   ├── ⚛️ loading.tsx
│   │   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   │   ├── ⚛️ loading.tsx
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   ├── ⚛️ loading.tsx
│   │   │   │   ├── ⚛️ page.tsx
│   │   │   │   └── 📂 your/
│   │   │   │   │   ├── ⚛️ loading.tsx
│   │   │   │   │   ├── ⚛️ page.tsx
│   │   │   │   │   └── ⚛️ your-client-actions.tsx
│   │   │   ├── ⚛️ layout.tsx
│   │   │   ├── 📂 links/
│   │   │   │   ├── 📂 [id]/
│   │   │   │   │   ├── 📂 edit/
│   │   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   ├── 📂 new/
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   └── ⚛️ page.tsx
│   │   │   └── 📂 messages/
│   │   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 (seo)/
│   │   │   ├── 📂 barcode-generator/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 case-converter-online/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 creator-studio/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 creator-tools/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 free-qr-code/
│   │   │   │   └── 📂 with-logo/
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 hashtag-generator/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 landing-page-creator/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 qr-gen-online/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   └── 📂 whatsapp-link-generator/
│   │   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 [handle]/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 🔌 api/
│   │   │   ├── 📂 auth/
│   │   │   │   ├── 📂 [...nextauth]/
│   │   │   │   │   └── 🔷 route.ts
│   │   │   │   ├── 📂 forgot-password/
│   │   │   │   │   └── 🔷 route.ts
│   │   │   │   ├── 📂 register/
│   │   │   │   │   └── 🔷 route.ts
│   │   │   │   └── 📂 reset-password/
│   │   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 billing/
│   │   │   │   ├── 📂 create-checkout-session/
│   │   │   │   │   └── 🔷 route.ts
│   │   │   │   ├── 📂 create-portal-session/
│   │   │   │   │   └── 🔷 route.ts
│   │   │   │   └── 📂 downgrade/
│   │   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 bio/
│   │   │   │   ├── 📂 bootstrap/
│   │   │   │   │   └── 🔷 route.ts
│   │   │   │   ├── 📂 links/
│   │   │   │   │   └── 🔷 route.ts
│   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 contact-forms/
│   │   │   │   ├── 📂 [id]/
│   │   │   │   │   ├── 🔷 route.ts
│   │   │   │   │   └── 📂 submissions/
│   │   │   │   │   │   └── 🔷 route.ts
│   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 debug/
│   │   │   │   └── 📂 headers/
│   │   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 discount-codes/
│   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 engagement-events/
│   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 handles/
│   │   │   │   └── 📂 check/
│   │   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 health/
│   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 k-cards/
│   │   │   │   ├── 📂 clicks/
│   │   │   │   │   └── 🔷 route.ts
│   │   │   │   ├── 📂 messages/
│   │   │   │   │   └── 🔷 route.ts
│   │   │   │   ├── 🔷 route.ts
│   │   │   │   └── 📂 share/
│   │   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 kr-codes/
│   │   │   │   ├── 📂 [id]/
│   │   │   │   │   ├── 📂 analytics/
│   │   │   │   │   │   └── 🔷 route.ts
│   │   │   │   │   ├── 📂 logo/
│   │   │   │   │   │   └── 🔷 route.ts
│   │   │   │   │   ├── 📂 png/
│   │   │   │   │   │   └── 🔷 route.ts
│   │   │   │   │   ├── 🔷 qr-helpers.ts
│   │   │   │   │   ├── 🔷 route.ts
│   │   │   │   │   ├── 📂 style/
│   │   │   │   │   │   └── 🔷 route.ts
│   │   │   │   │   ├── 📂 svg/
│   │   │   │   │   │   └── 🔷 route.ts
│   │   │   │   │   └── 📂 thumb.png/
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
│   │   │   ├── 📂 qr-menus/
│   │   │   │   ├── 📂 [id]/
│   │   │   │   │   ├── 📂 create-krcode/
│   │   │   │   │   │   └── 🔷 route.ts
│   │   │   │   │   ├── 📂 delete/
│   │   │   │   │   │   └── 🔷 route.ts
│   │   │   │   │   └── 🔷 route.ts
│   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 settings/
│   │   │   │   └── 📂 profile/
│   │   │   │   │   ├── 📂 avatar/
│   │   │   │   │   │   └── 🔷 route.ts
│   │   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 stripe/
│   │   │   │   └── 📂 webhook/
│   │   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 subscribers/
│   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 tools/
│   │   │   │   ├── 📂 contact-links/
│   │   │   │   │   └── 🔷 route.ts
│   │   │   │   ├── 🔷 route.ts
│   │   │   │   └── 📂 toggle/
│   │   │   │   │   └── 🔷 route.ts
│   │   │   └── 📂 workspaces/
│   │   │   │   └── 🔷 route.ts
│   │   ├── 🖼️ apple-icon.png
│   │   ├── 📂 blog/
│   │   │   ├── 📂 [slug]/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 🎨 blog-article.css
│   │   │   ├── 📂 instagram-hashtag-mistakes-2026/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 instagram-hashtag-strategy-2026/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 link-in-bio-best-practices/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 link-in-bio-hub/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── ⚛️ page.tsx
│   │   │   ├── 📂 qr-code-generator-that-people-actually-scan/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 qr-codes/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   └── 📂 utm/
│   │   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 claim/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 customers/
│   │   │   ├── 📂 agencies/
│   │   │   │   ├── ⚛️ AgenciesCustomersClient.tsx
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 brands/
│   │   │   │   ├── ⚛️ BrandsCustomersClient.tsx
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 communities/
│   │   │   │   ├── ⚛️ CommunitiesCustomersClient.tsx
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 creators/
│   │   │   │   ├── ⚛️ CreatorsCustomersClient.tsx
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 events/
│   │   │   │   ├── ⚛️ EventsCustomersClient.tsx
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── ⚛️ page.tsx
│   │   │   └── 📂 small-business/
│   │   │   │   ├── ⚛️ page.tsx
│   │   │   │   └── ⚛️ SmallBusinessCustomersClient.tsx
│   │   ├── 📂 dashboard/
│   │   │   ├── 📂 contact-forms/
│   │   │   │   ├── 📂 [id]/
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   ├── ⚛️ contact-form-card.tsx
│   │   │   │   ├── ⚛️ contact-form-detail.tsx
│   │   │   │   ├── ⚛️ contact-forms-table.tsx
│   │   │   │   ├── ⚛️ layout.tsx
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 discount-codes/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 growth/
│   │   │   │   ├── ⚛️ layout.tsx
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 k-cards/
│   │   │   │   ├── ⚛️ layout.tsx
│   │   │   │   ├── 📂 messages/
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 links/
│   │   │   │   └── 📂 new/
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 messages/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── ⚛️ page.tsx
│   │   │   ├── 📂 qr-menus/
│   │   │   │   ├── 📂 [id]/
│   │   │   │   │   ├── 📂 create-krcode/
│   │   │   │   │   │   └── 🔷 route.ts
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   ├── 📂 new/
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 settings/
│   │   │   │   ├── 📂 advanced/
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   ├── 📂 billing/
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   ├── 📂 branding/
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   ├── 📂 domains/
│   │   │   │   │   ├── ⚛️ domains-client.tsx
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   ├── 📂 integrations/
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   ├── ⚛️ layout.tsx
│   │   │   │   ├── ⚛️ page.tsx
│   │   │   │   └── 📂 profile/
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 subscribers/
│   │   │   │   ├── ⚛️ layout.tsx
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 support/
│   │   │   │   ├── ⚛️ layout.tsx
│   │   │   │   └── ⚛️ page.tsx
│   │   │   └── 📂 tools/
│   │   │   │   ├── 📂 barcode-generator/
│   │   │   │   │   ├── ⚛️ BarcodeGeneratorClient.tsx
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   ├── 📂 brand-color-extractor/
│   │   │   │   │   ├── ⚛️ BrandColorExtractorClient.tsx
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   ├── 📂 case-converter/
│   │   │   │   │   ├── ⚛️ CaseConverterClient.tsx
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   ├── 📂 character-counter/
│   │   │   │   │   ├── ⚛️ CharacterCounterClient.tsx
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   ├── 📂 color-palette-generator/
│   │   │   │   │   ├── ⚛️ ColorPaletteGeneratorClient.tsx
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   ├── 📂 hashtag-generator/
│   │   │   │   │   ├── ⚛️ HashtagGeneratorClient.tsx
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   ├── 📂 hourly-rate-calculator/
│   │   │   │   │   ├── ⚛️ HourlyRateCalculatorClient.tsx
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   ├── 📂 image-to-pdf/
│   │   │   │   │   ├── ⚛️ ImageToPdfClient.tsx
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   ├── 📂 instagram-bio-generator/
│   │   │   │   │   ├── ⚛️ InstagramBioGeneratorClient.tsx
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   ├── 📂 instagram-caption-generator/
│   │   │   │   │   ├── ⚛️ InstagramCaptionGeneratorClient.tsx
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   ├── 📂 json-formatter/
│   │   │   │   │   ├── ⚛️ JsonFormatterClient.tsx
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   ├── ⚛️ page.tsx
│   │   │   │   ├── 📂 password-generator/
│   │   │   │   │   ├── ⚛️ page.tsx
│   │   │   │   │   └── ⚛️ PasswordGeneratorClient.tsx
│   │   │   │   ├── 📂 pdf-converter/
│   │   │   │   │   ├── ⚛️ page.tsx
│   │   │   │   │   └── ⚛️ PdfConverterClient.tsx
│   │   │   │   ├── 📂 pdf-to-image/
│   │   │   │   │   ├── ⚛️ page.tsx
│   │   │   │   │   └── ⚛️ PdfToImageClient.tsx
│   │   │   │   ├── 📂 profit-margin-calculator/
│   │   │   │   │   ├── ⚛️ page.tsx
│   │   │   │   │   └── ⚛️ ProfitMarginCalculatorClient.tsx
│   │   │   │   ├── 📂 random-number-generator/
│   │   │   │   │   ├── ⚛️ page.tsx
│   │   │   │   │   └── ⚛️ RandomNumberGeneratorClient.tsx
│   │   │   │   ├── 📂 tiktok-bio-generator/
│   │   │   │   │   ├── ⚛️ page.tsx
│   │   │   │   │   └── ⚛️ TikTokBioGeneratorClient.tsx
│   │   │   │   ├── 📂 tiktok-caption-generator/
│   │   │   │   │   ├── ⚛️ page.tsx
│   │   │   │   │   └── ⚛️ TikTokCaptionGeneratorClient.tsx
│   │   │   │   ├── 📂 username-generator/
│   │   │   │   │   ├── ⚛️ page.tsx
│   │   │   │   │   └── ⚛️ UsernameGeneratorClient.tsx
│   │   │   │   ├── 📂 utm-builder/
│   │   │   │   │   ├── ⚛️ page.tsx
│   │   │   │   │   └── ⚛️ UtmBuilderClient.tsx
│   │   │   │   ├── 📂 whatsapp-link-generator/
│   │   │   │   │   ├── ⚛️ page.tsx
│   │   │   │   │   └── ⚛️ WhatsappLinkGeneratorClient.tsx
│   │   │   │   ├── 📂 word-counter/
│   │   │   │   │   ├── ⚛️ page.tsx
│   │   │   │   │   └── ⚛️ WordCounterClient.tsx
│   │   │   │   └── 📂 youtube-title-generator/
│   │   │   │   │   ├── ⚛️ page.tsx
│   │   │   │   │   └── ⚛️ YoutubeTitleGeneratorClient.tsx
│   │   ├── 🖼️ favicon.ico
│   │   ├── 📂 features/
│   │   │   └── 📂 url-shortener/
│   │   │   │   ├── ⚛️ head.tsx
│   │   │   │   ├── ⚛️ layout.tsx
│   │   │   │   ├── ⚛️ page.tsx
│   │   │   │   └── 🎨 url-shortener.css
│   │   ├── 📂 forgot-password/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 free-qr-code-generator/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 🎨 globals.css
│   │   ├── ⚛️ head.tsx
│   │   ├── 🖼️ icon.png
│   │   ├── 📂 k/
│   │   │   └── 📂 [slug]/
│   │   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 k-cards/
│   │   │   ├── 📂 messages/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 🎨 kompi-marketing.css
│   │   ├── 📂 kompi-suite/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 kr-codes/
│   │   ├── 📂 KR-Codes-QR-Code-Generator/
│   │   │   ├── 🎨 kr-codes.css
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 krcode2/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 landing/
│   │   │   └── ⚛️ page.tsx
│   │   ├── ⚛️ layout.tsx
│   │   ├── 📂 m/
│   │   │   └── 📂 [slug]/
│   │   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 menu/
│   │   │   └── 📂 [slug]/
│   │   │   │   └── ⚛️ page.tsx
│   │   ├── ⚛️ not-found.tsx
│   │   ├── 📂 p/
│   │   │   └── 📂 [slug]/
│   │   │   │   └── ⚛️ page.tsx
│   │   ├── ⚛️ page.tsx
│   │   ├── 📂 pricing/
│   │   │   ├── ⚛️ head.tsx
│   │   │   ├── ⚛️ layout.tsx
│   │   │   ├── ⚛️ page.tsx
│   │   │   └── 🎨 pricing.css
│   │   ├── 📂 pricingv2/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 qr-code/
│   │   │   ├── 📂 dynamic/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 email/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 for-restaurant/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 static/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   └── 📂 with-logo/
│   │   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 qr-code-generator/
│   │   │   ├── ⚛️ page.tsx
│   │   │   └── 📄 page.tsx.bak_py
│   │   ├── 📂 qr-menus/
│   │   │   ├── 📂 [id]/
│   │   │   │   ├── ⚛️ page.tsx
│   │   │   │   └── 📂 service/
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 new/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 r/
│   │   │   └── 📂 [code]/
│   │   │   │   └── 🔷 route.ts
│   │   ├── 📂 reset-password/
│   │   │   ├── ⚛️ page.tsx
│   │   │   └── ⚛️ ResetPasswordClient.tsx
│   │   ├── 🔷 robots.ts
│   │   ├── 📂 signin/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 signup/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 🔷 sitemap.ts
│   │   ├── 📂 solutions/
│   │   │   ├── 📂 industry/
│   │   │   │   ├── 📂 [slug]/
│   │   │   │   │   └── ⚛️ page.tsx
│   │   │   │   └── ⚛️ layout.tsx
│   │   │   └── ⚛️ layout.tsx
│   │   └── 📂 tools/
│   │   │   ├── 📂 barcode-generator/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 brand-color-extractor/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 case-converter/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 character-counter/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 color-palette-generator/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 hashtag-generator/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 hourly-rate-calculator/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 image-to-pdf/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 instagram-bio-generator/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 instagram-caption-generator/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 json-formatter/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 password-generator/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 pdf-converter/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 pdf-to-image/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 profit-margin-calculator/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 random-number-generator/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 tiktok-bio-generator/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 tiktok-caption-generator/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 username-generator/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 utm-builder/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 whatsapp-link-generator/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   ├── 📂 word-counter/
│   │   │   │   └── ⚛️ page.tsx
│   │   │   └── 📂 youtube-title-generator/
│   │   │   │   └── ⚛️ page.tsx
│   ├── 🧩 components/
│   │   ├── 📂 analytics/
│   │   │   └── ⚛️ analytics-overview.tsx
│   │   ├── 📂 billing/
│   │   │   ├── ⚛️ downgrade-button.tsx
│   │   │   ├── ⚛️ manage-billing-button.tsx
│   │   │   ├── ⚛️ plan-limit-modal.tsx
│   │   │   ├── 📄 plan-limit-modal.tsx.pre_pro_text
│   │   │   └── ⚛️ upgrade-button.tsx
│   │   ├── 📂 bio/
│   │   │   └── ⚛️ bio-card.tsx
│   │   ├── 📂 blog/
│   │   │   ├── ⚛️ ArticleTOC.tsx
│   │   │   ├── 🎨 playbook.css
│   │   │   └── ⚛️ Playbook.tsx
│   │   ├── 📂 claim/
│   │   │   ├── ⚛️ claim-handle-hero.tsx
│   │   │   └── ⚛️ claim-handle-inline.tsx
│   │   ├── 📂 contact/
│   │   │   ├── ⚛️ contact-form-card.tsx
│   │   │   └── ⚛️ contact-form-inline.tsx
│   │   ├── 📂 dashboard/
│   │   │   ├── ⚛️ account-menu.tsx
│   │   │   ├── ⚛️ character-counter-widget.tsx
│   │   │   ├── ⚛️ color-palette-generator-widget.tsx
│   │   │   ├── ⚛️ contact-links-widget.tsx
│   │   │   ├── ⚛️ create-modal.tsx
│   │   │   ├── ⚛️ create-workspace-empty.tsx
│   │   │   ├── ⚛️ dashboard-activity-card.tsx
│   │   │   ├── ⚛️ dashboard-activity-strip.tsx
│   │   │   ├── ⚛️ dashboard-announcement-banner.tsx
│   │   │   ├── ⚛️ dashboard-feature-grid.tsx
│   │   │   ├── ⚛️ dashboard-hero-stats.tsx
│   │   │   ├── ⚛️ dashboard-invite-teammates.tsx
│   │   │   ├── ⚛️ dashboard-layout.tsx
│   │   │   ├── 📄 dashboard-layout.tsx.bak_sidebar_modern
│   │   │   ├── 📄 dashboard-layout.tsx.bak_sidebar_typo2
│   │   │   ├── 📄 dashboard-layout.tsx.bak_sidebar_typography
│   │   │   ├── ⚛️ dashboard-quick-create.tsx
│   │   │   ├── ⚛️ dashboard-recent-links.tsx
│   │   │   ├── 🎨 dashboard-shell.css
│   │   │   ├── ⚛️ dashboard-shell.tsx
│   │   │   ├── ⚛️ dashboard-tips-card.tsx
│   │   │   ├── ⚛️ dashboard-topbar.tsx
│   │   │   ├── 🔷 dashboard-types.ts
│   │   │   ├── ⚛️ glass-card.tsx
│   │   │   ├── ⚛️ hashtag-generator-widget.tsx
│   │   │   ├── ⚛️ hourly-rate-calculator-widget.tsx
│   │   │   ├── ⚛️ image-to-pdf-widget.tsx
│   │   │   ├── ⚛️ instagram-bio-generator-widget.tsx
│   │   │   ├── ⚛️ instagram-caption-generator-widget.tsx
│   │   │   ├── ⚛️ json-formatter-widget.tsx
│   │   │   ├── ⚛️ password-generator-widget.tsx
│   │   │   ├── ⚛️ pdf-converter-widget.tsx
│   │   │   ├── ⚛️ pdf-to-image-widget.tsx
│   │   │   ├── ⚛️ profit-margin-calculator-widget.tsx
│   │   │   ├── ⚛️ random-number-generator-widget.tsx
│   │   │   ├── ⚛️ tiktok-bio-generator-widget.tsx
│   │   │   ├── ⚛️ tiktok-caption-generator-widget.tsx
│   │   │   ├── ⚛️ username-generator-widget.tsx
│   │   │   ├── ⚛️ utm-builder-widget.tsx
│   │   │   └── ⚛️ youtube-title-generator-widget.tsx
│   │   ├── 📂 discounts/
│   │   │   ├── ⚛️ discount-codes-table.tsx
│   │   │   └── ⚛️ discount-pill.tsx
│   │   ├── 📂 engagement/
│   │   │   └── ⚛️ locked-content.tsx
│   │   ├── ⚛️ faqs.tsx
│   │   ├── ⚛️ features-megamenu.tsx
│   │   ├── 🎨 footer-cta.css
│   │   ├── ⚛️ footer-cta.tsx
│   │   ├── ⚛️ GoProBanner.tsx
│   │   ├── 📂 hero/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 infoscreens/
│   │   │   ├── ⚛️ five.tsx
│   │   │   ├── ⚛️ four.tsx
│   │   │   ├── ⚛️ one.tsx
│   │   │   ├── ⚛️ six.tsx
│   │   │   ├── ⚛️ three.tsx
│   │   │   └── ⚛️ two.tsx
│   │   ├── 📂 k-cards/
│   │   │   ├── ⚛️ ClaimHandleCTA.tsx
│   │   │   ├── ⚛️ IntentModal.tsx
│   │   │   ├── 🔷 kcard-style.ts
│   │   │   ├── 🔷 kcard-theme-presets.ts
│   │   │   ├── ⚛️ KCardPreview.tsx
│   │   │   ├── 📄 KCardPreview.tsx.bak_variant
│   │   │   ├── ⚛️ KCardsPage.tsx
│   │   │   ├── 📄 KCardsPage.tsx.bak_contactfix
│   │   │   ├── 📄 KCardsPage.tsx.fix-onAvatarClear
│   │   │   ├── 📄 KCardsPage.tsx.header-social
│   │   │   ├── 📄 KCardsPage.tsx.header-v2
│   │   │   ├── 📄 KCardsPage.tsx.pre-kcards-modal
│   │   │   ├── ⚛️ KCardsPaywall.tsx
│   │   │   ├── ⚛️ KCardSubscribeBlock.tsx
│   │   │   └── ⚛️ KCardThemeSection.tsx
│   │   ├── ⚛️ KBenefits.tsx
│   │   ├── ⚛️ KolorKards.tsx
│   │   ├── 🎨 kompi-promo-cards.css
│   │   ├── ⚛️ kompidoes.tsx
│   │   ├── ⚛️ KompiPerks.tsx
│   │   ├── ⚛️ KPromo.tsx
│   │   ├── 📂 kr-codes/
│   │   │   ├── ⚛️ KRCode2.tsx
│   │   │   ├── ⚛️ krcodefaq.tsx
│   │   │   ├── ⚛️ KRCodesPage.tsx
│   │   │   ├── ⚛️ krcodetypes.tsx
│   │   │   └── ⚛️ why-kompi.tsx
│   │   ├── 📂 ksuite/
│   │   │   ├── ⚛️ ksuite1.tsx
│   │   │   ├── ⚛️ ksuite2.tsx
│   │   │   └── ⚛️ ksuite3.tsx
│   │   ├── 📂 layout/
│   │   │   └── ⚛️ side-nav.tsx
│   │   ├── 📂 links/
│   │   │   ├── ⚛️ create-link-form.tsx
│   │   │   ├── ⚛️ create-link-page.tsx
│   │   │   ├── ⚛️ edit-link-form.tsx
│   │   │   ├── ⚛️ link-actions-menu.tsx
│   │   │   ├── ⚛️ link-analytics-chart.tsx
│   │   │   ├── ⚛️ link-analytics-client.tsx
│   │   │   ├── ⚛️ links-empty-state.tsx
│   │   │   ├── ⚛️ links-list-client.tsx
│   │   │   ├── 📄 links-list-client.tsx.fix_button_block
│   │   │   ├── 📄 links-list-client.tsx.fix_limit_block
│   │   │   ├── 📄 links-list-client.tsx.fix_links_copy2
│   │   │   ├── 📄 links-list-client.tsx.pre_pro_copy
│   │   │   └── ⚛️ links-table.tsx
│   │   ├── 📂 modals/
│   │   │   ├── ⚛️ GoProModal.tsx
│   │   │   └── ⚛️ KompiSuiteModal.tsx
│   │   ├── ⚛️ navbar-gate.tsx
│   │   ├── 🎨 navbar.css
│   │   ├── ⚛️ navbar.tsx
│   │   ├── 📂 pricing/
│   │   │   ├── ⚛️ FeatureComparisonGrid.tsx
│   │   │   └── ⚛️ SuitePricingTable.tsx
│   │   ├── ⚛️ providers.tsx
│   │   ├── 📂 qr-code-generator/
│   │   │   ├── ⚛️ FreeQrGenerator.tsx
│   │   │   └── ⚛️ QrGenerator.tsx
│   │   ├── 📂 qr-menus/
│   │   │   ├── ⚛️ create-krcode-button.tsx
│   │   │   └── ⚛️ menu-qr-preview.tsx
│   │   ├── 📂 sections/
│   │   │   ├── ⚛️ analytics.tsx
│   │   │   ├── ⚛️ faces.tsx
│   │   │   ├── ⚛️ how-it-works.tsx
│   │   │   ├── ⚛️ personas.tsx
│   │   │   └── ⚛️ testimonials.tsx
│   │   ├── 📂 seo/
│   │   │   └── ⚛️ AutoLinkedContent.tsx
│   │   ├── 📂 settings/
│   │   │   └── ⚛️ profile-settings-client.tsx
│   │   ├── 📂 solutions/
│   │   │   ├── ⚛️ KCardPromoHero1.tsx
│   │   │   ├── ⚛️ KCardPromoHero2.tsx
│   │   │   ├── ⚛️ KCardPromoHero3.tsx
│   │   │   ├── ⚛️ KompiAudienceStrip.tsx
│   │   │   ├── ⚛️ sellcards.tsx
│   │   │   └── ⚛️ SolutionsToolsStrip.tsx
│   │   ├── 📂 subscribers/
│   │   │   ├── ⚛️ subscribe-inline-form.tsx
│   │   │   ├── ⚛️ subscribe-inline.tsx
│   │   │   └── ⚛️ subscribers-table.tsx
│   │   ├── 📂 tools/
│   │   │   ├── ⚛️ BarcodeGenerator.tsx
│   │   │   ├── ⚛️ BrandColorExtractor.tsx
│   │   │   ├── ⚛️ CaseConverter.tsx
│   │   │   ├── ⚛️ CharacterCounter.tsx
│   │   │   ├── ⚛️ ColorPaletteGenerator.tsx
│   │   │   ├── 📄 ColorPaletteGenerator.tsx.bak_lintfix
│   │   │   ├── ⚛️ ContactLinkGenerator.tsx
│   │   │   ├── ⚛️ HashtagGenerator.tsx
│   │   │   ├── ⚛️ HourlyRateCalculator.tsx
│   │   │   ├── ⚛️ ImageToPdf.tsx
│   │   │   ├── ⚛️ InstagramBioGenerator.tsx
│   │   │   ├── ⚛️ InstagramCaptionGenerator.tsx
│   │   │   ├── ⚛️ JsonFormatter.tsx
│   │   │   ├── ⚛️ PasswordGenerator.tsx
│   │   │   ├── ⚛️ PdfConverter.tsx
│   │   │   ├── 📄 PdfConverter.tsx.bak_lintfix
│   │   │   ├── ⚛️ PdfMerge.tsx
│   │   │   ├── ⚛️ PdfSplit.tsx
│   │   │   ├── ⚛️ PdfToImage.tsx
│   │   │   ├── ⚛️ ProfitMarginCalculator.tsx
│   │   │   ├── ⚛️ RandomNumberGenerator.tsx
│   │   │   ├── ⚛️ TikTokBioGenerator.tsx
│   │   │   ├── ⚛️ TikTokCaptionGenerator.tsx
│   │   │   ├── 📄 TikTokCaptionGenerator.tsx.bak_lintfix
│   │   │   ├── 📄 TikTokCaptionGenerator.tsx.bak_lintfix2
│   │   │   ├── ⚛️ ToolCard.tsx
│   │   │   ├── ⚛️ UsernameGenerator.tsx
│   │   │   ├── ⚛️ UtmBuilder.tsx
│   │   │   ├── ⚛️ WordCounter.tsx
│   │   │   └── ⚛️ YoutubeTitleGenerator.tsx
│   │   ├── ⚛️ tools-megamenu.tsx
│   │   ├── 🎨 ui/
│   │   │   ├── ⚛️ button.tsx
│   │   │   ├── ⚛️ card.tsx
│   │   │   ├── ⚛️ dialog.tsx
│   │   │   ├── ⚛️ input.tsx
│   │   │   ├── ⚛️ select.tsx
│   │   │   ├── ⚛️ skeleton.tsx
│   │   │   ├── ⚛️ slider.tsx
│   │   │   ├── ⚛️ sonner.tsx
│   │   │   └── ⚛️ textarea.tsx
│   │   ├── ⚛️ user-menu.tsx
│   │   ├── ⚛️ why-kompi.tsx
│   │   └── 📂 workspaces/
│   │   │   ├── ⚛️ create-workspace-cta.tsx
│   │   │   ├── ⚛️ create-workspace-modal.tsx
│   │   │   ├── ⚛️ workspace-switcher-dialog.tsx
│   │   │   ├── ⚛️ workspace-switcher.tsx
│   │   │   └── ⚛️ workspace-topbar-switcher.tsx
│   ├── 📂 content/
│   │   └── 📂 pseo/
│   │   │   └── 📂 datasets/
│   │   │   │   ├── ⚙️ bio-links.json
│   │   │   │   ├── 🔷 index.ts
│   │   │   │   ├── ⚙️ qr-ideas.generated.json
│   │   │   │   ├── ⚙️ qr-ideas.json
│   │   │   │   └── ⚙️ utm-channels.json
│   ├── 📚 lib/
│   │   ├── 🔷 analytics-overview.ts
│   │   ├── 🔷 auth.ts
│   │   ├── 🔷 blog-route-index.ts
│   │   ├── 🔷 email.ts
│   │   ├── 🔷 fonts.ts
│   │   ├── 🔷 plan-limits.ts
│   │   ├── 🔷 prisma.ts
│   │   ├── 📂 pseo/
│   │   │   ├── 🔷 dataset.ts
│   │   │   ├── 🔷 enhancers.ts
│   │   │   ├── 🔷 internal-links.ts
│   │   │   ├── 🔷 page-builder.ts
│   │   │   ├── 🔷 quality-gate.ts
│   │   │   ├── 📂 section-generators/
│   │   │   │   ├── 🔷 checkpoint.ts
│   │   │   │   ├── 🔷 conclusion.ts
│   │   │   │   ├── 🔷 cta-swipe.ts
│   │   │   │   ├── 🔷 decision-table.ts
│   │   │   │   ├── 🔷 examples.ts
│   │   │   │   ├── 🔷 failure-cases.ts
│   │   │   │   ├── 🔷 faqs.ts
│   │   │   │   ├── 🔷 idea-library.ts
│   │   │   │   ├── 🔷 intro.ts
│   │   │   │   ├── 🔷 kompi-angle.ts
│   │   │   │   ├── 🔷 placement-guide.ts
│   │   │   │   ├── 🔷 use-cases.ts
│   │   │   │   ├── 🔷 utm-naming.ts
│   │   │   │   └── 🔷 utm-presets.ts
│   │   │   └── 🔷 types.ts
│   │   ├── 📂 seo/
│   │   │   ├── 🔷 auto-link.ts
│   │   │   ├── 🔷 inline-link-engine.ts
│   │   │   └── ⚙️ static-pages.json
│   │   ├── 🔷 solutions.ts
│   │   ├── 🔷 stripe.ts
│   │   ├── 🔷 tools-config.ts
│   │   └── 🔷 utils.ts
│   └── 📂 types/
│   │   ├── 🔷 pdfjs-webpack.d.ts
│   │   └── 📄 pdfjs-webpack.d.ts.bak_lintfix
├── 🟡 🔷 **tsconfig.json**
└── 📄 tsconfig.tsbuildinfo
```

## 📖 Legend

### File Types
- 🚫 DevOps: Git ignore
- 📄 Other: Other files
- 🐳 DevOps: Docker files
- 📖 Docs: Markdown files
- ⚙️ Config: JSON files
- 📄 Docs: Text files
- ⚙️ Config: YAML files
- 🔷 TypeScript: TypeScript files
- ⚙️ Config: YAML files
- ⚙️ Config: TOML files
- 🎨 Assets: SVG images
- 🖼️ Assets: PNG images
- 🖼️ Assets: Icon files
- 🖼️ Assets: JPEG images
- ⚛️ React: React TypeScript files
- 🎨 Styles: Stylesheets

### Importance Levels
- 🔴 Critical: Essential project files
- 🟡 High: Important configuration files
- 🔵 Medium: Helpful but not essential files
