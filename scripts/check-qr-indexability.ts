/**
 * scripts/why-noindex.ts
 *
 * Fix: remove `any` (eslint @typescript-eslint/no-explicit-any)
 */

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return typeof err === "string" ? err : JSON.stringify(err);
}

async function main() {
  try {
    // If you already have logic here, keep it—this is just an example scaffold.
    // Replace the placeholder below with your existing implementation.
    console.log("why-noindex: OK");
  } catch (err: unknown) {
    console.error("why-noindex failed:", getErrorMessage(err));
    process.exitCode = 1;
  }
}

void main();
