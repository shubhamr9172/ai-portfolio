"use client"

import { Section } from "@/components/ui/section"
import { ProjectCard } from "@/components/ui/project-card"

const projects = [
    {
        title: "Enterprise RAG Knowledge Assistant",
        slug: "rag-assistant",
        description: "End-to-end Retrieval-Augmented Generation system with vector DB, metadata filtering, smart chunking, and evaluation.",
        longDescription: "A sophisticated RAG system designed for enterprise knowledge management. It ingests documents from various sources, chunks them intelligently, and stores embeddings in a vector database. The system supports complex queries with metadata filtering and provides citations for every answer.",
        tags: ["Next.js", "Python", "LangChain", "Pinecone", "OpenAI"],
        image: "/projects/rag.png",
        demoLink: "https://example.com",
        githubLink: "https://github.com",
    },
    {
        title: "AI Email & Document Automation Agent",
        slug: "email-agent",
        description: "Multi-step agent that reads, classifies, summarizes, and replies to business emails automatically.",
        longDescription: "An autonomous agent that connects to email providers, classifies incoming emails based on intent, and drafts appropriate responses. It can also extract data from attachments and update CRM systems automatically.",
        tags: ["Python", "AutoGPT", "Gmail API", "Docker"],
        image: "/projects/email.png",
        demoLink: "https://example.com",
        githubLink: "https://github.com",
    },
    {
        title: "AI Resume Tailor & Job Matcher",
        slug: "resume-matcher",
        description: "LLM tool that compares resumes with job descriptions, highlights gaps, and generates tailored resume + cover letter.",
        longDescription: "A career tool that helps job seekers optimize their applications. It analyzes job descriptions to identify key requirements and rewrites resume bullet points to better align with the role, increasing the chances of passing ATS filters.",
        tags: ["React", "FastAPI", "LLMs", "Prompt Engineering"],
        image: "/projects/resume.png",
        demoLink: "https://example.com",
        githubLink: "https://github.com",
    },
    {
        title: "AI FitBuddy – Personal Fitness Coach",
        slug: "fitbuddy",
        description: "AI wellness assistant generating workouts, meal plans, and weekly insights using structured prompts.",
        longDescription: "A personalized fitness companion that creates custom workout routines and meal plans based on user goals and dietary restrictions. It tracks progress over time and adjusts recommendations using feedback loops.",
        tags: ["Next.js", "Tailwind CSS", "OpenAI API", "Vercel"],
        image: "/projects/fitness.png",
        demoLink: "https://example.com",
        githubLink: "https://github.com",
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
