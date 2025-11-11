import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <Card className="max-w-md w-full p-8 flex flex-col items-center gap-4 text-center">
        <div className="h-10 w-10 rounded-full bg-neutral-900 text-white flex items-center justify-center text-lg">
          !
        </div>
        <h1 className="text-xl font-semibold text-neutral-900">
          That page doesn&apos;t exist (yet).
        </h1>
        <p className="text-sm text-neutral-500">
          The link you followed is invalid, expired, or never existed.
          If this should be live, jump back into Kompi and regenerate it.
        </p>
        <Button asChild className="mt-2">
          <Link href="/">Back to dashboard</Link>
        </Button>
      </Card>
    </main>
  );
}
