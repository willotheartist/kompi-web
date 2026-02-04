// src/lib/builder/validateSection.ts
import { SECTION_SCHEMAS, type SectionType, type SectionVariant } from "./sectionSchemas";

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function shallowMerge(a: Record<string, unknown>, b: Record<string, unknown>) {
  // b overwrites a (top-level only)
  return { ...a, ...b };
}

export function getSectionSchema(type: SectionType, variant: SectionVariant) {
  const schema = SECTION_SCHEMAS[type]?.[variant];
  if (!schema) return null;
  return schema;
}

export function applySectionDefaults(
  type: SectionType,
  variant: SectionVariant,
  content: unknown
): Record<string, unknown> {
  const schema = getSectionSchema(type, variant);
  const defaults = schema?.defaults ?? {};

  const incoming = isPlainObject(content) ? content : {};
  // defaults first, then incoming overwrites
  return shallowMerge(defaults, incoming);
}

export function validateSectionContent(
  type: SectionType,
  variant: SectionVariant,
  content: unknown
): { ok: true; normalized: Record<string, unknown> } | { ok: false; error: string } {
  const schema = getSectionSchema(type, variant);
  if (!schema) return { ok: false, error: `Unknown section ${type}/${variant}` };

  const normalized = applySectionDefaults(type, variant, content);

  for (const key of schema.required) {
    const val = (normalized as any)[key];
    if (val === undefined || val === null) {
      return { ok: false, error: `Missing required field: ${key}` };
    }
    // common-case: required arrays must not be empty
    if (Array.isArray(val) && val.length === 0) {
      return { ok: false, error: `Missing required field: ${key}` };
    }
    // common-case: required strings must not be empty
    if (typeof val === "string" && val.trim().length === 0) {
      return { ok: false, error: `Missing required field: ${key}` };
    }
  }

  return { ok: true, normalized };
}
