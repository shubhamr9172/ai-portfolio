"use client"

import { Section } from "@/components/ui/section"
import { BlogCard } from "@/components/ui/blog-card"

const posts = [
    {
        title: "Building RAG Pipelines: Lessons Learned from Production",
        excerpt: "Retrieval-Augmented Generation is powerful, but deploying it to production comes with challenges. Here are the key takeaways from building enterprise RAG systems.",
        date: "May 15, 2024",
        readTime: "8 min read",
        slug: "building-rag-pipelines",
        category: "AI Engineering",
    },
    {
        title: "The Future of Autonomous Agents in Business Automation",
        excerpt: "How autonomous agents are transforming business workflows by handling complex tasks with minimal human intervention.",
        date: "April 28, 2024",
        readTime: "6 min read",
        slug: "autonomous-agents-future",
        category: "Agents",
    },
    {
        title: "Optimizing LLM Inference Costs with Quantization",
        excerpt: "A deep dive into quantization techniques to reduce the memory footprint and inference latency of Large Language Models without sacrificing performance.",
        date: "April 10, 2024",
        readTime: "10 min read",
        slug: "optimizing-llm-inference",
        category: "Optimization",
    },
    {
        title: "Prompt Engineering Patterns for Consistent Outputs",
        excerpt: "Explore proven prompt engineering patterns like Chain-of-Thought, ReAct, and Few-Shot prompting to get reliable results from LLMs.",
        date: "March 22, 2024",
        readTime: "5 min read",
        slug: "prompt-engineering-patterns",
        category: "Prompt Engineering",
    },
]

export default function BlogPage() {
    return (
        <div className="pt-20">
            <Section>
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Insights & Thoughts</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Sharing my experiences and learnings in AI, Engineering, and Product Development.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <BlogCard key={post.slug} post={post} index={index} />
                        ))}
                    </div>
                </div>
            </Section>
        </div>
    )
}
