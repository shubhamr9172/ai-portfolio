import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { RagHero } from "@/components/sections/rag-hero";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <section className="py-20 bg-secondary/20">
        <RagHero />
      </section>
      <Skills />
    </div>
  );
}
