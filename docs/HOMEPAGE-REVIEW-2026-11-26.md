# Kompi homepage and navigation review

This branch is a review preview. Do not merge or promote it until William approves the design and scope.

## URL findings

Compared production commit `9fe2e3224761b2bcb34fd6c73582cbc08d989bf2` with the original `898a1592556a1ba50e367e05df494b86b0a92266`.

- All 154 original Next.js page files remain. No original page file was deleted; that alone does not prove its content or behavior was preserved.
- Live requests to 67 existing, non-dynamic routes returned 63 HTTP 200s and four redirects. No 404s were found in that sample. The exact results are in `audits/routes-2026-11-26.json`.
- `/kompi-suite` was replaced by a permanent redirect to `/pricing`. This branch gives the established URL a standalone product/tool directory again and restores it to the sitemap.
- `/pricingv2` redirects to `/pricing`, `/krcode2` redirects to `/kr-codes`, and `/kr-codes/your` moves to the app subdomain. Those compatibility routes remain.
- The previous release removed Tools and customer/resource discovery from the main navigation and most deep links from the footer. This branch restores that navigation on desktop and mobile.
- `/growth` and the `/tools` hub were added by the launch release. `/growth` was not a previously existing page removed by that release. Individual tool routes existed and remain.
- `/k-cards` already required authentication and already had noindex before the launch release. It is the Card editor, not a removed public marketing page.
- Existing public Card and redirect handlers were not changed on this branch. Production tests earlier confirmed `/k/william` and `/r/2z6PBm` still worked. This route sample does not exhaustively check every user-created URL.

## Review scope

- Rebuild only the homepage presentation around the supplied Nouva reference: full-height landscape hero, restrained Onest typography, dark sections, illustrated product previews, scroll reveals and responsive layouts.
- Restore Products / Tools / Explore navigation, customer links, journal links, legacy feature access and a full footer.
- Expand `/tools` using the existing available-tool catalog. Keep the existing individual paths.
- Restore `/kompi-suite` as a meaningful page with the existing tools and current three-product focus.
- Read the existing central plan configuration for accurate displayed pricing and limits.
- No authentication, payment, API, database, domain or quota changes.

## Reference artwork

The three landscape PNG files in `public/home` come from the Nouva source supplied by William for this visual preview:

- https://framerusercontent.com/images/ro6i79EOvzrYuRqMtGWmH5OnP0k.png
- https://framerusercontent.com/images/KTqCI1D1pVNnBRvzNyLSV7RDOpw.png
- https://framerusercontent.com/images/RSMKY4k1RydBun8aTXVJIanJqU.png

No Nouva testimonials, invented customer counts or AI-product claims are included. Product illustrations are labelled as examples.

## Verification

Production build, separate TypeScript check, targeted lint and all 62 existing tests passed.

Rendered preview review at 1363px, 454px and 340px CSS widths found no horizontal overflow. Narrow widths were checked through browser zoom, not a physical phone. Desktop Products / Tools / Explore navigation, Escape dismissal, mobile Tools / Explore expansion, navigation into `/tools` and `/kompi-suite`, FAQ expansion and automatic menu closure after navigation were checked. All loaded page images had valid dimensions. The hero, product illustrations, pricing and closing sections were visually reviewed.

The review also corrected the illustrative Card address to the actual `/k/` path format. The final preview URL and GitHub Actions result are recorded on PR #4. Production has not been changed by this branch.
