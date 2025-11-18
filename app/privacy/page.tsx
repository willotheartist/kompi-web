import { Section } from "@/components/Section";
import { Container } from "@/components/Container";

export default function PrivacyPage() {
  return (
    <Section className="bg-[var(--color-bg)] py-28">
      <Container className="max-w-3xl text-[var(--color-text)]">
        <h1 className="text-4xl font-semibold mb-8">
          Privacy Policy
        </h1>

        <div className="space-y-8 text-[var(--color-text)]">
          {/* Insert privacy policy content here */}
        </div>
      </Container>
    </Section>
  );
}
