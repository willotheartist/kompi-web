export type ToolId =
  | "password-generator"
  | "utm-builder"
  | "pdf-converter";

export type ToolStatus = "available" | "coming-soon";

export interface ToolDefinition {
  id: ToolId;
  name: string;
  shortDescription: string;
  category: "Security" | "Marketing" | "Files";
  publicPath: string;
  dashboardPath: string;
  plan: "free" | "pro";
  status: ToolStatus;
}

export const TOOL_DEFINITIONS: ToolDefinition[] = [
  {
    id: "password-generator",
    name: "Password generator",
    shortDescription: "Create strong, random passwords in seconds.",
    category: "Security",
    publicPath: "/tools/password-generator",
    dashboardPath: "/dashboard/tools/password-generator",
    plan: "free",
    status: "available",
  },
  {
    id: "utm-builder",
    name: "UTM builder",
    shortDescription: "Build clean tracking links for your campaigns.",
    category: "Marketing",
    publicPath: "/tools/utm-builder",
    dashboardPath: "/dashboard/tools/utm-builder",
    plan: "free",
    status: "coming-soon",
  },
  {
    id: "pdf-converter",
    name: "PDF converter",
    shortDescription: "Turn PDFs into shareable, trackable Kompi links.",
    category: "Files",
    publicPath: "/tools/pdf-converter",
    dashboardPath: "/dashboard/tools/pdf-converter",
    plan: "pro",
    status: "coming-soon",
  },
];

export function getToolById(id: ToolId): ToolDefinition | undefined {
  return TOOL_DEFINITIONS.find((tool) => tool.id === id);
}
