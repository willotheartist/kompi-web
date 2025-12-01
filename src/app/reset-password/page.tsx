// src/app/reset-password/page.tsx
import { Suspense } from "react";
import ResetPasswordClient from "./ResetPasswordClient";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <p className="text-sm text-muted-foreground">
            Loading reset page…
          </p>
        </div>
      }
    >
      <ResetPasswordClient />
    </Suspense>
  );
}
