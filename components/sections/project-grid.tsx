"use client"

import { Section } from "@/components/ui/section"
import { ProjectCard } from "@/components/ui/project-card"

const projects = [
    {
        title: "Prompt Craft",
        slug: "prompt-craft",
        description: "A learning platform to learn all about prompts, LLMs, and prompt engineering techniques.",
        longDescription: "Prompt Craft is a dedicated educational platform designed to help users master the art of prompt engineering. It covers everything from basic concepts to advanced techniques for interacting with Large Language Models (LLMs).",
        tags: ["React", "LLMs", "Education", "Prompt Engineering"],
        image: "/projects/prompt-craft.png", // Placeholder, user might need to upload one
        demoLink: "https://promt-craft.netlify.app/#home",
        githubLink: "https://github.com/shubhamr9172/prompt-craft",
    },
]

export function ProjectGrid() {
    return (
        <Section>
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A selection of my recent work in AI engineering and web development.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.slug} project={project} index={index} />
                    ))}
                </div>
            </div>
        </Section>
    )
}
