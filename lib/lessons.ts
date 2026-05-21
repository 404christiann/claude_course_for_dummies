import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { LessonConfig } from "./lesson-types";
import { lessonConfigs } from "../content/lessons/registry";

export interface LessonFrontmatter {
  title: string;
  slug: string;
  section: number;
  duration: string;
  objectives: string[];
  prerequisites?: string[];
}

export interface LessonContent {
  frontmatter: LessonFrontmatter;
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "lessons");

/** Load legacy MDX lesson (kept for any non-migrated lessons) */
export function getLessonContent(slug: string): LessonContent | null {
  const sectionDirs = fs.readdirSync(CONTENT_DIR);
  for (const dir of sectionDirs) {
    const filePath = path.join(CONTENT_DIR, dir, `${slug}.mdx`);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      return { frontmatter: data as LessonFrontmatter, content };
    }
  }
  return null;
}

/**
 * Load a typed lesson config (.lesson.ts) if one exists.
 * Returns null for lessons that haven't been migrated yet.
 * Uses the static registry (content/lessons/registry.ts) so that
 * Next.js/webpack can analyse imports at build time.
 */
export function getLessonConfig(slug: string): LessonConfig | null {
  return lessonConfigs[slug] ?? null;
}
