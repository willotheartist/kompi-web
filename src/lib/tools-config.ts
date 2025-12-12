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
  | "youtube-thumbnail-downloader"
  // 🆕 Creator / social tools
  | "instagram-bio-generator"
  | "instagram-caption-generator"
  | "tiktok-bio-generator"
  | "tiktok-caption-generator"
  | "youtube-title-generator"
  | "youtube-description-generator"
  | "ai-post-idea-generator"
  | "social-media-calendar-generator"
  | "instagram-story-template-generator"
  | "youtube-thumbnail-maker"
  // 🆕 Branding & visuals
  | "logo-resizer"
  | "social-media-banner-generator"
  | "color-palette-generator"
  | "brand-color-extractor"
  // 🆕 Writing & text helpers
  | "readability-checker"
  | "grammar-corrector"
  | "paraphraser"
  | "sentence-expander"
  | "bullet-point-generator"
  | "blog-post-outline-generator"
  | "email-subject-line-generator"
  | "tagline-generator"
  | "resume-summary-generator"
  | "product-description-generator"
  | "faq-generator"
  | "contact-message-templates"
  // 🆕 Business calculators
  | "profit-margin-calculator"
  | "hourly-rate-calculator"
  | "roi-calculator"
  | "break-even-calculator"
  // 🆕 New locked-in tools
  | "brand-name-generator"
  | "business-name-generator"
  | "slogan-generator"
  | "pdf-image-extractor"
  | "text-summarizer";

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
    status: "available",
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
    status: "available",
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
    status: "available",
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
    status: "available",
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
  {
    id: "pdf-image-extractor",
    name: "Extract images from PDF",
    shortDescription: "Pull high-quality images directly from your PDF files.",
    category: "PDF",
    publicPath: "/tools/pdf-image-extractor",
    dashboardPath: "/dashboard/tools/pdf-image-extractor",
    plan: "free",
    status: "coming-soon",
    icon: "file-text",
    accentColor: "#D7E9F7",
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
    status: "available",
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
  {
    id: "text-summarizer",
    name: "Text summarizer",
    shortDescription: "Summarize long text into clear, concise key points.",
    category: "Text",
    publicPath: "/tools/text-summarizer",
    dashboardPath: "/dashboard/tools/text-summarizer",
    plan: "free",
    status: "coming-soon",
    icon: "type",
    accentColor: "#CDE4FF",
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
    status: "available",
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
    status: "available",
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
    status: "available",
    icon: "sparkles",
    accentColor: "#E4C1F9",
  },

  //
  // 🆕 Creator / social tools
  //
  {
    id: "instagram-bio-generator",
    name: "Instagram bio generator",
    shortDescription: "Write on-brand Instagram bios in seconds.",
    category: "Creator",
    publicPath: "/tools/instagram-bio-generator",
    dashboardPath: "/dashboard/tools/instagram-bio-generator",
    plan: "free",
    status: "available",
    icon: "user",
    accentColor: "#FFE5EC",
  },
  {
    id: "instagram-caption-generator",
    name: "Instagram caption generator",
    shortDescription: "Turn ideas into scroll-stopping Instagram captions.",
    category: "Creator",
    publicPath: "/tools/instagram-caption-generator",
    dashboardPath: "/dashboard/tools/instagram-caption-generator",
    plan: "free",
    status: "available",
    icon: "type",
    accentColor: "#FDE2FF",
  },
  {
    id: "tiktok-bio-generator",
    name: "TikTok bio generator",
    shortDescription: "Create catchy TikTok bios tailored to your niche.",
    category: "Creator",
    publicPath: "/tools/tiktok-bio-generator",
    dashboardPath: "/dashboard/tools/tiktok-bio-generator",
    plan: "free",
    status: "available",
    icon: "user",
    accentColor: "#C4F1BE",
  },
  {
    id: "tiktok-caption-generator",
    name: "TikTok caption generator",
    shortDescription: "Generate engaging TikTok captions with hooks and emojis.",
    category: "Creator",
    publicPath: "/tools/tiktok-caption-generator",
    dashboardPath: "/dashboard/tools/tiktok-caption-generator",
    plan: "free",
    status: "available",
    icon: "type",
    accentColor: "#FFCFD2",
  },
  {
    id: "youtube-title-generator",
    name: "YouTube title generator",
    shortDescription: "Write click-worthy YouTube titles that get more views.",
    category: "Creator",
    publicPath: "/tools/youtube-title-generator",
    dashboardPath: "/dashboard/tools/youtube-title-generator",
    plan: "free",
    status: "available",
    icon: "play",
    accentColor: "#FFB5A7",
  },
  {
    id: "youtube-description-generator",
    name: "YouTube description generator",
    shortDescription: "Generate SEO-friendly YouTube descriptions with CTAs.",
    category: "Creator",
    publicPath: "/tools/youtube-description-generator",
    dashboardPath: "/dashboard/tools/youtube-description-generator",
    plan: "free",
    status: "coming-soon",
    icon: "play",
    accentColor: "#BDE0FE",
  },
  {
    id: "ai-post-idea-generator",
    name: "Post idea generator",
    shortDescription: "Get fresh content ideas for any channel in one click.",
    category: "Creator",
    publicPath: "/tools/ai-post-idea-generator",
    dashboardPath: "/dashboard/tools/ai-post-idea-generator",
    plan: "free",
    status: "coming-soon",
    icon: "sparkles",
    accentColor: "#E0AAFF",
  },
  {
    id: "social-media-calendar-generator",
    name: "Social media calendar generator",
    shortDescription: "Create a simple content calendar for your next 30 days.",
    category: "Creator",
    publicPath: "/tools/social-media-calendar-generator",
    dashboardPath: "/dashboard/tools/social-media-calendar-generator",
    plan: "free",
    status: "coming-soon",
    icon: "sparkles",
    accentColor: "#FDFFB6",
  },
  {
    id: "instagram-story-template-generator",
    name: "Instagram story template generator",
    shortDescription: "Plan story sequences and layouts for launches and promos.",
    category: "Creator",
    publicPath: "/tools/instagram-story-template-generator",
    dashboardPath: "/dashboard/tools/instagram-story-template-generator",
    plan: "free",
    status: "coming-soon",
    icon: "image",
    accentColor: "#FFDEB4",
  },
  {
    id: "youtube-thumbnail-maker",
    name: "YouTube thumbnail maker",
    shortDescription: "Plan thumbnail layouts and text overlays for your videos.",
    category: "Creator",
    publicPath: "/tools/youtube-thumbnail-maker",
    dashboardPath: "/dashboard/tools/youtube-thumbnail-maker",
    plan: "free",
    status: "coming-soon",
    icon: "image",
    accentColor: "#CDE4FF",
  },
  {
    id: "brand-name-generator",
    name: "Brand name generator",
    shortDescription: "Generate creative, brandable name ideas for your projects.",
    category: "Creator",
    publicPath: "/tools/brand-name-generator",
    dashboardPath: "/dashboard/tools/brand-name-generator",
    plan: "free",
    status: "coming-soon",
    icon: "sparkles",
    accentColor: "#FFE5A5",
  },

  //
  // 🆕 Branding & visuals
  //
  {
    id: "logo-resizer",
    name: "Logo resizer",
    shortDescription: "Resize your logo for social profiles and favicons.",
    category: "Images",
    publicPath: "/tools/logo-resizer",
    dashboardPath: "/dashboard/tools/logo-resizer",
    plan: "free",
    status: "coming-soon",
    icon: "image",
    accentColor: "#F1FAEE",
  },
  {
    id: "social-media-banner-generator",
    name: "Social media banner generator",
    shortDescription: "Plan banner dimensions and content for all major platforms.",
    category: "Images",
    publicPath: "/tools/social-media-banner-generator",
    dashboardPath: "/dashboard/tools/social-media-banner-generator",
    plan: "free",
    status: "coming-soon",
    icon: "image",
    accentColor: "#D0F4DE",
  },
  {
    id: "color-palette-generator",
    name: "Color palette generator",
    shortDescription: "Generate color palettes for your brand or campaign.",
    category: "Images",
    publicPath: "/tools/color-palette-generator",
    dashboardPath: "/dashboard/tools/color-palette-generator",
    plan: "free",
    status: "available",
    icon: "image",
    accentColor: "#FFF1E6",
  },
  {
    id: "brand-color-extractor",
    name: "Brand color extractor",
    shortDescription: "Upload an image and extract its main brand colors.",
    category: "Images",
    publicPath: "/tools/brand-color-extractor",
    dashboardPath: "/dashboard/tools/brand-color-extractor",
    plan: "free",
    status: "available",
    icon: "image",
    accentColor: "#E2F0CB",
  },

  //
  // 🆕 Writing & text helpers
  //
  {
    id: "readability-checker",
    name: "Readability checker",
    shortDescription: "Check how easy your text is to read at a glance.",
    category: "Text",
    publicPath: "/tools/readability-checker",
    dashboardPath: "/dashboard/tools/readability-checker",
    plan: "free",
    status: "coming-soon",
    icon: "type",
    accentColor: "#A3C4F3",
  },
  {
    id: "grammar-corrector",
    name: "Grammar corrector",
    shortDescription: "Clean up typos and basic grammar mistakes in your copy.",
    category: "Text",
    publicPath: "/tools/grammar-corrector",
    dashboardPath: "/dashboard/tools/grammar-corrector",
    plan: "free",
    status: "coming-soon",
    icon: "type",
    accentColor: "#C1FFD7",
  },
  {
    id: "paraphraser",
    name: "Paraphraser",
    shortDescription: "Rephrase your text while keeping the same meaning.",
    category: "Text",
    publicPath: "/tools/paraphraser",
    dashboardPath: "/dashboard/tools/paraphraser",
    plan: "free",
    status: "coming-soon",
    icon: "type",
    accentColor: "#FFCCD5",
  },
  {
    id: "sentence-expander",
    name: "Sentence expander",
    shortDescription: "Turn short prompts into fuller, more detailed sentences.",
    category: "Text",
    publicPath: "/tools/sentence-expander",
    dashboardPath: "/dashboard/tools/sentence-expander",
    plan: "free",
    status: "coming-soon",
    icon: "type",
    accentColor: "#FDE2FF",
  },
  {
    id: "bullet-point-generator",
    name: "Bullet point generator",
    shortDescription: "Convert messy notes into clean bullet point lists.",
    category: "Text",
    publicPath: "/tools/bullet-point-generator",
    dashboardPath: "/dashboard/tools/bullet-point-generator",
    plan: "free",
    status: "coming-soon",
    icon: "type",
    accentColor: "#FFEBB7",
  },
  {
    id: "blog-post-outline-generator",
    name: "Blog post outline generator",
    shortDescription: "Turn a topic into a structured blog post outline.",
    category: "Text",
    publicPath: "/tools/blog-post-outline-generator",
    dashboardPath: "/dashboard/tools/blog-post-outline-generator",
    plan: "free",
    status: "coming-soon",
    icon: "type",
    accentColor: "#BDE0FE",
  },
  {
    id: "email-subject-line-generator",
    name: "Email subject line generator",
    shortDescription: "Generate compelling subject lines for your campaigns.",
    category: "Text",
    publicPath: "/tools/email-subject-line-generator",
    dashboardPath: "/dashboard/tools/email-subject-line-generator",
    plan: "free",
    status: "coming-soon",
    icon: "type",
    accentColor: "#E0AAFF",
  },
  {
    id: "tagline-generator",
    name: "Tagline & slogan generator",
    shortDescription: "Get short, punchy taglines for your brand or product.",
    category: "Text",
    publicPath: "/tools/tagline-generator",
    dashboardPath: "/dashboard/tools/tagline-generator",
    plan: "free",
    status: "coming-soon",
    icon: "type",
    accentColor: "#F1C0E8",
  },
  {
    id: "slogan-generator",
    name: "Slogan generator",
    shortDescription: "Generate catchy slogans for brands, campaigns, and products.",
    category: "Text",
    publicPath: "/tools/slogan-generator",
    dashboardPath: "/dashboard/tools/slogan-generator",
    plan: "free",
    status: "coming-soon",
    icon: "type",
    accentColor: "#FFF0B6",
  },
  {
    id: "resume-summary-generator",
    name: "Resume summary generator",
    shortDescription: "Write a strong, concise professional summary.",
    category: "Text",
    publicPath: "/tools/resume-summary-generator",
    dashboardPath: "/dashboard/tools/resume-summary-generator",
    plan: "free",
    status: "coming-soon",
    icon: "type",
    accentColor: "#C4F1BE",
  },
  {
    id: "product-description-generator",
    name: "Product description generator",
    shortDescription: "Turn features into benefit-driven product copy.",
    category: "Text",
    publicPath: "/tools/product-description-generator",
    dashboardPath: "/dashboard/tools/product-description-generator",
    plan: "free",
    status: "coming-soon",
    icon: "type",
    accentColor: "#FFE5B4",
  },
  {
    id: "faq-generator",
    name: "FAQ generator",
    shortDescription: "Generate FAQ questions and answers from your product info.",
    category: "Text",
    publicPath: "/tools/faq-generator",
    dashboardPath: "/dashboard/tools/faq-generator",
    plan: "free",
    status: "coming-soon",
    icon: "type",
    accentColor: "#B9FBC0",
  },
  {
    id: "contact-message-templates",
    name: "Contact message templates",
    shortDescription: "Get ready-to-send templates for contact forms and outreach.",
    category: "Text",
    publicPath: "/tools/contact-message-templates",
    dashboardPath: "/dashboard/tools/contact-message-templates",
    plan: "free",
    status: "coming-soon",
    icon: "type",
    accentColor: "#FFD6FF",
  },

  //
  // 🆕 Business calculators
  //
  {
    id: "profit-margin-calculator",
    name: "Profit margin calculator",
    shortDescription: "Calculate your profit margin from cost and price.",
    category: "Business",
    publicPath: "/tools/profit-margin-calculator",
    dashboardPath: "/dashboard/tools/profit-margin-calculator",
    plan: "free",
    status: "available",
    icon: "invoice",
    accentColor: "#FFCFD2",
  },
  {
    id: "hourly-rate-calculator",
    name: "Hourly rate calculator",
    shortDescription: "Work out your minimum hourly rate based on your targets.",
    category: "Business",
    publicPath: "/tools/hourly-rate-calculator",
    dashboardPath: "/dashboard/tools/hourly-rate-calculator",
    plan: "free",
    status: "available",
    icon: "invoice",
    accentColor: "#A5FFD6",
  },
  {
    id: "roi-calculator",
    name: "ROI calculator",
    shortDescription: "Estimate return on investment for your marketing and projects.",
    category: "Business",
    publicPath: "/tools/roi-calculator",
    dashboardPath: "/dashboard/tools/roi-calculator",
    plan: "free",
    status: "coming-soon",
    icon: "invoice",
    accentColor: "#BDE0FE",
  },
  {
    id: "break-even-calculator",
    name: "Break-even calculator",
    shortDescription: "Find the sales volume you need to break even.",
    category: "Business",
    publicPath: "/tools/break-even-calculator",
    dashboardPath: "/dashboard/tools/break-even-calculator",
    plan: "free",
    status: "coming-soon",
    icon: "invoice",
    accentColor: "#FFB5A7",
  },
  {
    id: "business-name-generator",
    name: "Business name generator",
    shortDescription: "Instantly create memorable business name ideas.",
    category: "Business",
    publicPath: "/tools/business-name-generator",
    dashboardPath: "/dashboard/tools/business-name-generator",
    plan: "free",
    status: "coming-soon",
    icon: "sparkles",
    accentColor: "#FFD3B6",
  },
];

export function getToolById(id: ToolId): ToolDefinition | undefined {
  return TOOL_DEFINITIONS.find((tool) => tool.id === id);
}
