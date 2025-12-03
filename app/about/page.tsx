import { Bio } from "@/components/sections/bio";
import { Timeline } from "@/components/sections/timeline";
import { Skills } from "@/components/sections/skills";

export default function AboutPage() {
    return (
        <div className="flex flex-col gap-0">
            <Bio />
            <Timeline />
            <Skills />
        </div>
    );
}
