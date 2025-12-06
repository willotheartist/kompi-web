// src/lib/tools-config.ts

export type ToolId =
  | "password-generator"
  | "whatsapp-link-generator"
  | "utm-builder"
  | "pdf-converter"
  | "word-counter"
  | "character-counter"
  | "case-converter"
  | "image-to-pdf"
  | "pdf-to-image"
  | "pdf-merge"
  | "pdf-split"
  | "pdf-compress"
  | "image-compressor"
  | "image-resizer"
  | "image-converter"
  | "favicon-generator"
  | "random-number-generator"
  | "username-generator"
  | "invoice-generator"
  | "quote-generator"
  | "brand-kit-generator"
  | "hashtag-generator"
  | "json-formatter"
  | "instagram-font-generator"
  | "youtube-thumbnail-downloader";

export type ToolStatus = "available" | "coming-soon";

export type ToolCategory =
  | "Security"
  | "Marketing"
  | "PDF"
  | "Text"
  | "Images"
  | "Creator"
  | "Business"
  | "Developer";

export type ToolPlan = "free" | "pro";

export type ToolIconId =
  | "shield"
  | "sparkles"
  | "file-text"
  | "file"
  | "image"
  | "type"
  | "hash"
  | "user"
  | "json"
  | "invoice"
  | "play"
  | "whatsapp";

export interface ToolDefinition {
  id: ToolId;
  name: string;
  shortDescription: string;
  category: ToolCategory;
  publicPath: string;
  dashboardPath: string;
  plan: ToolPlan;
  status: ToolStatus;
  icon: ToolIconId;
  /** Main accent color for icon + category strip */
  accentColor: string;
}

export const TOOL_DEFINITIONS: ToolDefinition[] = [
  //
  // 🔐 Security / Communication
  //
  {
    id: "password-generator",
    name: "Password generator",
    shortDescription: "Create strong, random passwords in seconds.",
    category: "Security",
    publicPath: "/tools/password-generator",
    dashboardPath: "/dashboard/tools/password-generator",
    plan: "free",
    status: "available",
    icon: "shield",
    accentColor: "#F5FF7A",
  },
  {
    id: "whatsapp-link-generator",
    name: "WhatsApp link generator",
    shortDescription: "Create pre-filled WhatsApp conversation links in one click.",
    category: "Marketing",
    publicPath: "/tools/whatsapp-link-generator",
    dashboardPath: "/dashboard/tools/whatsapp-link-generator",
    plan: "free",
    status: "available", // you said this one is already built
    icon: "whatsapp",
    accentColor: "#C4F1BE",
  },

  //
  // 📈 Marketing & tracking
  //
  {
    id: "utm-builder",
    name: "UTM builder",
    shortDescription: "Build clean tracking links for your campaigns.",
    category: "Marketing",
    publicPath: "/tools/utm-builder",
    dashboardPath: "/dashboard/tools/utm-builder",
    plan: "free",
    status: "coming-soon",
    icon: "sparkles",
    accentColor: "#FFD6A5",
  },

  //
  // 📄 Files & PDFs
  //
  {
    id: "pdf-converter",
    name: "PDF link converter",
    shortDescription: "Turn PDFs into shareable, trackable Kompi links.",
    category: "PDF",
    publicPath: "/tools/pdf-converter",
    dashboardPath: "/dashboard/tools/pdf-converter",
    plan: "pro",
    status: "coming-soon",
    icon: "file-text",
    accentColor: "#FFC6FF",
  },
  {
    id: "image-to-pdf",
    name: "Image to PDF",
    shortDescription: "Combine one or more images into a single PDF.",
    category: "PDF",
    publicPath: "/tools/image-to-pdf",
    dashboardPath: "/dashboard/tools/image-to-pdf",
    plan: "free",
    status: "coming-soon",
    icon: "file",
    accentColor: "#FDFFB6",
  },
  {
    id: "pdf-to-image",
    name: "PDF to image",
    shortDescription: "Export PDF pages as high-quality PNG or JPG images.",
    category: "PDF",
    publicPath: "/tools/pdf-to-image",
    dashboardPath: "/dashboard/tools/pdf-to-image",
    plan: "free",
    status: "coming-soon",
    icon: "image",
    accentColor: "#CAF0F8",
  },
  {
    id: "pdf-merge",
    name: "Merge PDFs",
    shortDescription: "Drag, reorder, and merge multiple PDFs into one file.",
    category: "PDF",
    publicPath: "/tools/pdf-merge",
    dashboardPath: "/dashboard/tools/pdf-merge",
    plan: "pro",
    status: "coming-soon",
    icon: "file-text",
    accentColor: "#FFAFCC",
  },
  {
    id: "pdf-split",
    name: "Split PDF",
    shortDescription: "Split a PDF into individual pages or a custom range.",
    category: "PDF",
    publicPath: "/tools/pdf-split",
    dashboardPath: "/dashboard/tools/pdf-split",
    plan: "pro",
    status: "coming-soon",
    icon: "file-text",
    accentColor: "#BDE0FE",
  },
  {
    id: "pdf-compress",
    name: "Compress PDF",
    shortDescription: "Shrink PDF file sizes without losing readability.",
    category: "PDF",
    publicPath: "/tools/pdf-compress",
    dashboardPath: "/dashboard/tools/pdf-compress",
    plan: "pro",
    status: "coming-soon",
    icon: "file-text",
    accentColor: "#E0AAFF",
  },

  //
  // 🖼 Images
  //
  {
    id: "image-compressor",
    name: "Image compressor",
    shortDescription: "Optimize images for the web in a single click.",
    category: "Images",
    publicPath: "/tools/image-compressor",
    dashboardPath: "/dashboard/tools/image-compressor",
    plan: "free",
    status: "coming-soon",
    icon: "image",
    accentColor: "#FFDEB4",
  },
  {
    id: "image-resizer",
    name: "Image resizer",
    shortDescription: "Resize images to exact pixel sizes or aspect ratios.",
    category: "Images",
    publicPath: "/tools/image-resizer",
    dashboardPath: "/dashboard/tools/image-resizer",
    plan: "free",
    status: "coming-soon",
    icon: "image",
    accentColor: "#CDE4FF",
  },
  {
    id: "image-converter",
    name: "Image converter",
    shortDescription: "Convert between PNG, JPG, and WebP formats.",
    category: "Images",
    publicPath: "/tools/image-converter",
    dashboardPath: "/dashboard/tools/image-converter",
    plan: "free",
    status: "coming-soon",
    icon: "image",
    accentColor: "#FEE440",
  },
  {
    id: "favicon-generator",
    name: "Favicon generator",
    shortDescription: "Turn your logo into a full favicon pack in seconds.",
    category: "Images",
    publicPath: "/tools/favicon-generator",
    dashboardPath: "/dashboard/tools/favicon-generator",
    plan: "pro",
    status: "coming-soon",
    icon: "image",
    accentColor: "#9BF6FF",
  },

  //
  // ✍️ Text & content
  //
  {
    id: "word-counter",
    name: "Word counter",
    shortDescription: "Count words, characters, and reading time for your text.",
    category: "Text",
    publicPath: "/tools/word-counter",
    dashboardPath: "/dashboard/tools/word-counter",
    plan: "free",
    status: "available",
    icon: "type",
    accentColor: "#A5FFD6",
  },
  {
    id: "character-counter",
    name: "Character counter",
    shortDescription: "Perfect for social posts, ad copy, and meta tags.",
    category: "Text",
    publicPath: "/tools/character-counter",
    dashboardPath: "/dashboard/tools/character-counter",
    plan: "free",
    status: "coming-soon",
    icon: "type",
    accentColor: "#BDB2FF",
  },
  {
    id: "case-converter",
    name: "Case converter",
    shortDescription: "Convert text to UPPERCASE, lowercase, Title Case, and more.",
    category: "Text",
    publicPath: "/tools/case-converter",
    dashboardPath: "/dashboard/tools/case-converter",
    plan: "free",
    status: "available",
    icon: "type",
    accentColor: "#FFADAD",
  },

  //
  // 👩‍🎨 Creator tools
  //
  {
    id: "username-generator",
    name: "Username generator",
    shortDescription: "Generate endless name ideas for handles, brands, and profiles.",
    category: "Creator",
    publicPath: "/tools/username-generator",
    dashboardPath: "/dashboard/tools/username-generator",
    plan: "free",
    status: "available",
    icon: "user",
    accentColor: "#F1C0E8",
  },
  {
    id: "hashtag-generator",
    name: "Hashtag generator",
    shortDescription: "Turn any topic into a bank of social media hashtags.",
    category: "Creator",
    publicPath: "/tools/hashtag-generator",
    dashboardPath: "/dashboard/tools/hashtag-generator",
    plan: "free",
    status: "coming-soon",
    icon: "hash",
    accentColor: "#FFCFD2",
  },
  {
    id: "instagram-font-generator",
    name: "Instagram font generator",
    shortDescription: "Style your text with eye-catching, copy-paste Instagram fonts.",
    category: "Creator",
    publicPath: "/tools/instagram-font-generator",
    dashboardPath: "/dashboard/tools/instagram-font-generator",
    plan: "free",
    status: "coming-soon",
    icon: "type",
    accentColor: "#FF99C8",
  },
  {
    id: "youtube-thumbnail-downloader",
    name: "YouTube thumbnail downloader",
    shortDescription: "Grab high-res thumbnails from any public YouTube video.",
    category: "Creator",
    publicPath: "/tools/youtube-thumbnail-downloader",
    dashboardPath: "/dashboard/tools/youtube-thumbnail-downloader",
    plan: "free",
    status: "coming-soon",
    icon: "play",
    accentColor: "#FF595E",
  },

  //
  // 💼 Business helpers
  //
  {
    id: "invoice-generator",
    name: "Invoice generator",
    shortDescription: "Create clean, branded invoices you can download as PDF.",
    category: "Business",
    publicPath: "/tools/invoice-generator",
    dashboardPath: "/dashboard/tools/invoice-generator",
    plan: "pro",
    status: "coming-soon",
    icon: "invoice",
    accentColor: "#A0C4FF",
  },
  {
    id: "quote-generator",
    name: "Quote & estimate generator",
    shortDescription: "Send simple quotes and estimates to clients in minutes.",
    category: "Business",
    publicPath: "/tools/quote-generator",
    dashboardPath: "/dashboard/tools/quote-generator",
    plan: "pro",
    status: "coming-soon",
    icon: "invoice",
    accentColor: "#B9FBC0",
  },
  {
    id: "brand-kit-generator",
    name: "Brand kit generator",
    shortDescription: "Turn your logo and colors into a simple brand kit.",
    category: "Business",
    publicPath: "/tools/brand-kit-generator",
    dashboardPath: "/dashboard/tools/brand-kit-generator",
    plan: "pro",
    status: "coming-soon",
    icon: "sparkles",
    accentColor: "#FFB5A7",
  },

  //
  // 👨‍💻 Developer / technical
  //
  {
    id: "json-formatter",
    name: "JSON formatter",
    shortDescription: "Pretty-print, validate, and debug JSON payloads.",
    category: "Developer",
    publicPath: "/tools/json-formatter",
    dashboardPath: "/dashboard/tools/json-formatter",
    plan: "free",
    status: "coming-soon",
    icon: "json",
    accentColor: "#90E0EF",
  },
  {
    id: "random-number-generator",
    name: "Random number generator",
    shortDescription: "Generate random numbers in any range for tests or draws.",
    category: "Developer",
    publicPath: "/tools/random-number-generator",
    dashboardPath: "/dashboard/tools/random-number-generator",
    plan: "free",
    status: "coming-soon",
    icon: "sparkles",
    accentColor: "#E4C1F9",
  },
];

export function getToolById(id: ToolId): ToolDefinition | undefined {
  return TOOL_DEFINITIONS.find((tool) => tool.id === id);
}
