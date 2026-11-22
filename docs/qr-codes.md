# QR code persistence and releases

The editor uses one shared renderer for preview, PNG, SVG and library thumbnails. PNG defaults to 4096 px at 300 DPI; SVG keeps the QR geometry as vectors.

## Save and download

Signed-in downloads save first and render the URL returned by the save request. New website codes use their persisted tracking URL. Direct codes keep their original content. Save failures stop the download, leave the draft in place and show the error.

The browser generates a stable UUID for each unsaved draft. POST maps it to the QR record ID. A retry returns that owner's existing record; the client applies subsequent changes with PATCH. Creation of the short link and QR record is transactional so a failed QR write does not leave a tracking link behind.

Website drafts remain in session storage until saved. The library offers recovery for an unfinished local design. Recovery saves a direct code because an already exported file cannot retroactively encode a newly created tracking URL. Wi-Fi credentials and private message/text content are excluded from browser draft recovery.

## Database schema

Kompi's deployed Prisma connection uses the **kompi** PostgreSQL schema. The same Neon database also contains older tables in **public**. Check the `schema` connection parameter before applying migrations manually; never assume that an unqualified SQL statement targets the application tables.

Migration `20261122203500_add_kr_logo_library` belongs in `kompi`, including the User ownership foreign key, both indexes and the migration record. Its earlier manual application to public did not satisfy the application. The approved addition was also applied to kompi in the test and production branches on 22 November 2026. No existing QR records were changed.

## Verification

Run `pnpm typecheck` and `pnpm test:qr`. Tests cover rendering and scan decoding, PNG dimensions/alpha/density, logo preservation, list sorting/filter boundaries, safe draft recovery, authenticated creation, idempotent retries and transactional rollback.

For a release, also verify list/grid layouts and reduced-motion behavior, then download from the deployed editor and check the encoded destination. A signed-in save-and-download should create one library record and keep the same ID on repeat downloads.
