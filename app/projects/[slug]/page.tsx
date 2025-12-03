import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"

// This would typically come from a database or CMS
const projects = {
    "rag-assistant": {
        title: "Enterprise RAG Knowledge Assistant",
        description: "End-to-end Retrieval-Augmented Generation system with vector DB, metadata filtering, smart chunking, and evaluation.",
        fullDescription: "A sophisticated RAG system designed for enterprise knowledge management. It ingests documents from various sources, chunks them intelligently, and stores embeddings in a vector database. The system supports complex queries with metadata filtering and provides citations for every answer.",
        problem: "Employees were spending too much time searching for information across scattered documentation and internal wikis. Traditional keyword search was ineffective for complex queries.",
        solution: "We built a RAG pipeline using LangChain and Pinecone. The system indexes all internal documents and uses a semantic search to retrieve relevant context. A fine-tuned LLM then generates accurate answers with citations.",
        stack: ["Next.js", "Python", "LangChain", "Pinecone", "OpenAI", "FastAPI"],
        demoLink: "https://example.com",
        githubLink: "https://github.com",
    },
    "email-agent": {
        title: "AI Email & Document Automation Agent",
        description: "Multi-step agent that reads, classifies, summarizes, and replies to business emails automatically.",
        fullDescription: "An autonomous agent that connects to email providers, classifies incoming emails based on intent, and drafts appropriate responses. It can also extract data from attachments and update CRM systems automatically.",
        problem: "Customer support teams were overwhelmed by repetitive email inquiries, leading to slow response times and burnout.",
        solution: "Developed an intelligent agent that categorizes emails using zero-shot classification. It uses a decision tree to determine the next action: auto-reply, draft for review, or escalate to a human.",
        stack: ["Python", "AutoGPT", "Gmail API", "Docker", "Redis"],
        demoLink: "https://example.com",
        githubLink: "https://github.com",
    },
    "resume-matcher": {
        title: "AI Resume Tailor & Job Matcher",
        description: "LLM tool that compares resumes with job descriptions, highlights gaps, and generates tailored resume + cover letter.",
        fullDescription: "A career tool that helps job seekers optimize their applications. It analyzes job descriptions to identify key requirements and rewrites resume bullet points to better align with the role, increasing the chances of passing ATS filters.",
        problem: "Job seekers struggle to customize their resumes for every application, leading to low response rates from ATS systems.",
        solution: "Created an application that uses GPT-4 to analyze job descriptions and suggest specific improvements to the user's resume. It also generates a personalized cover letter.",
        stack: ["React", "FastAPI", "LLMs", "Prompt Engineering"],
        demoLink: "https://example.com",
        githubLink: "https://github.com",
    },
    "fitbuddy": {
        title: "AI FitBuddy – Personal Fitness Coach",
        description: "AI wellness assistant generating workouts, meal plans, and weekly insights using structured prompts.",
        fullDescription: "A personalized fitness companion that creates custom workout routines and meal plans based on user goals and dietary restrictions. It tracks progress over time and adjusts recommendations using feedback loops.",
        problem: "Personal trainers are expensive, and generic workout apps don't adapt to individual progress or dietary needs.",
        solution: "Built an AI coach that creates hyper-personalized plans. It uses a structured prompting strategy to ensure safe and effective recommendations.",
        stack: ["Next.js", "Tailwind CSS", "OpenAI API", "Vercel"],
        demoLink: "https://example.com",
        githubLink: "https://github.com",
    },
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project = projects[slug as keyof typeof projects]

    if (!project) {
        notFound()
    }

    return (
        <div className="pt-20">
            <Section>
                <div className="container max-w-4xl">
                    <Button asChild variant="ghost" className="mb-8 -ml-4 text-muted-foreground hover:text-primary">
                        <Link href="/projects">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
                        </Link>
                    </Button>

                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
                    <p className="text-xl text-muted-foreground mb-8">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-12">
                        {project.stack.map((tech) => (
                            <span
                                key={tech}
                                className="px-3 py-1 rounded-full text-sm font-medium bg-secondary text-secondary-foreground border border-border/50"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
                        {project.demoLink && (
                            <Button asChild size="lg" className="w-full md:w-auto">
                                <Link href={project.demoLink} target="_blank">
                                    Live Demo <ArrowUpRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        )}
                        {project.githubLink && (
                            <Button asChild variant="outline" size="lg" className="w-full md:w-auto">
                                <Link href={project.githubLink} target="_blank">
                                    View Code <Github className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        )}
                    </div>

                    <div className="space-y-12">
                        <div className="p-8 rounded-2xl bg-card border border-border/50">
                            <h2 className="text-2xl font-bold mb-4 text-primary">Problem</h2>
                            <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
                        </div>

                        <div className="p-8 rounded-2xl bg-card border border-border/50">
                            <h2 className="text-2xl font-bold mb-4 text-primary">Solution</h2>
                            <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-6">Architecture & Design</h2>
                            <div className="aspect-video rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground">
                                [Architecture Diagram Placeholder]
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    )
}
