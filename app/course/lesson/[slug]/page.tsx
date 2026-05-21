import { notFound } from "next/navigation";
import { getLessonContent, getLessonConfig } from "@/lib/lessons";
import { getLessonBySlug, getNextLesson, getPrevLesson, getSectionBySlug } from "@/lib/course-data";
import LessonFlow from "@/components/LessonFlow";
import LessonReader from "@/components/LessonReader";
import LessonMDX from "@/components/LessonMDX";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;

  const lesson = getLessonBySlug(slug);
  if (!lesson) notFound();

  const next = getNextLesson(slug);
  const prev = getPrevLesson(slug);
  const section = getSectionBySlug(slug) ?? null;

  // ── New interactive flow (typed .lesson.ts config) ──────────
  const config = getLessonConfig(slug);
  if (config) {
    return (
      <LessonFlow
        config={config}
        lesson={lesson}
        section={section}
        next={next ?? null}
        prev={prev ?? null}
      />
    );
  }

  // ── Legacy MDX fallback for unmigrated lessons ───────────────
  const content = getLessonContent(slug);
  return (
    <LessonReader
      slug={slug}
      lesson={lesson}
      section={section}
      frontmatter={content?.frontmatter ?? null}
      next={next ?? null}
      prev={prev ?? null}
    >
      {content?.content ? <LessonMDX source={content.content} /> : null}
    </LessonReader>
  );
}
