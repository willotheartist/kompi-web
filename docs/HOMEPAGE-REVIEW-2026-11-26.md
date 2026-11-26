# Kompi homepage and navigation review

The initial homepage/navigation review was merged by William in PR #4 on 26 November 2026. The original-artwork and motion refinement is a separate preview, following his request to change the imagery and improve the effects.

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

## Original artwork and motion

William requested the Nouva visual direction without its exact artwork. All three borrowed landscape files have been removed from the current branch. `public/home/kompi-connections.png` is an original image made with the built-in image-generation tool: two satin pink interconnected sculptures on a dark volcanic coastline at blue hour, with calm reflections and clear sky for the heading. The complete generation brief is in `docs/kompi-home-artwork-prompt.md`. Product backdrops are now original CSS compositions.

Motion includes masked hero title entrances, scroll-linked image depth and text lighting, staggered section reveals, floating Card/QR/link illustrations, a QR scan sweep, link activity bars, layered editor/destination entrances, pointer-responsive card tilt and lighting, button highlights and FAQ expansion. A pause control stops page animations; reduced-motion preferences also disable them. Offscreen illustrative loops pause automatically. Scroll and pointer updates are scheduled through requestAnimationFrame without a permanent JavaScript loop.

No Nouva testimonials, invented customer counts or AI-product claims are included. Product illustrations are labelled as examples. Navigation, routes, pricing and application behavior are preserved by this visual revision.

## Verification

Production build, separate TypeScript check, targeted lint and all 62 existing tests passed.

Rendered preview review at 1363px, 454px and 340px CSS widths found no horizontal overflow. Narrow widths were checked through browser zoom, not a physical phone. Desktop Products / Tools / Explore navigation, Escape dismissal, mobile Tools / Explore expansion, navigation into `/tools` and `/kompi-suite`, FAQ expansion and automatic menu closure after navigation were checked. All loaded page images had valid dimensions. The hero, product illustrations, pricing and closing sections were visually reviewed.

The review also corrected the illustrative Card address to the actual `/k/` path format. The follow-up pull request records the new preview URL, motion-specific browser checks and GitHub Actions result. The artwork/motion revision does not alter navigation, application routes, data or billing.
