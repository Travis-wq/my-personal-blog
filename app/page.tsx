import { Hero } from "@/components/home/Hero";
import { LatestPosts } from "@/components/home/LatestPosts";
import { Skills } from "@/components/home/Skills";
import { CTFSection } from "@/components/home/CTFSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LatestPosts />
      <Skills />
      <CTFSection />
    </>
  );
}
