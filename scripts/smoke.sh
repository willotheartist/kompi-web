#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${NEXT_PUBLIC_APP_URL:-http://localhost:3000}"

echo "🔎 Kompi Links smoke test against: $BASE_URL"
echo

echo "1) Healthcheck"
curl -sS "$BASE_URL/api/health" || { echo "❌ /api/health failed"; exit 1; }
echo "✅ /api/health OK"
echo

echo "2) Public routes (no auth)"
echo "- / (should redirect to /signin due to middleware)"
curl -I -sS "$BASE_URL/" | head -n 5 || { echo "❌ / failed"; exit 1; }
echo
echo "- /signin"
curl -I -sS "$BASE_URL/signin" | head -n 5 || { echo "❌ /signin failed"; exit 1; }
echo
echo "- sample 404"
curl -I -sS "$BASE_URL/this-should-not-exist" | head -n 5 || { echo "❌ 404 check failed"; exit 1; }
echo

echo "3) Reminder (manual, in browser)"
echo "   - Visit $BASE_URL/signin"
echo "   - Enter any email to sign in"
echo "   - Verify:"
echo "       • Workspace badge shows"
echo "       • Create link works"
echo "       • Short link redirects"
echo "       • Clicks appear in /links/[id]"
echo "       • Bio card saves + /p/[slug] shows correct text"
echo
echo "If any step fails, capture the exact error message and logs."
