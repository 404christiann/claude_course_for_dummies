import { sections, totalLessons } from "@/lib/course-data";
import LandingPage from "@/components/LandingPage";

export default function Home() {
  return <LandingPage sections={sections} totalLessons={totalLessons} />;
}
