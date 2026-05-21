import Link from "next/link";
import { sections, totalLessons } from "@/lib/course-data";
import CourseDashboard from "@/components/CourseDashboard";

export default function CoursePage() {
  return <CourseDashboard sections={sections} totalLessons={totalLessons} />;
}
