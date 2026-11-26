import Link from "next/link";
import { TOOL_DEFINITIONS } from "@/lib/tools-config";
import "./tools-directory.css";

export function ToolsDirectory() {
  const available = TOOL_DEFINITIONS.filter(tool => tool.status === "available");
  const categories = [...new Set(available.map(tool => tool.category))];
  return <div className="tools-directory">{categories.map(category => <section key={category} id={category.toLowerCase()}><h2>{category}</h2><div className="tools-directory-grid">{available.filter(tool => tool.category === category).map(tool => <Link href={tool.publicPath} key={tool.id}><h3>{tool.name}</h3><p>{tool.shortDescription}</p></Link>)}</div></section>)}</div>;
}
