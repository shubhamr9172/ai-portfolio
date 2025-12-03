import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"

// This would typically come from a CMS or MDX files
const posts = {
    "building-rag-pipelines": {
        title: "Building RAG Pipelines: Lessons Learned from Production",
        date: "May 15, 2024",
        readTime: "8 min read",
        category: "AI Engineering",
        content: `
      <p>Retrieval-Augmented Generation (RAG) has become the de-facto standard for building AI applications that require access to private or real-time data. However, moving from a prototype to a production-grade system involves solving several complex challenges.</p>
      
      <h3>1. Data Ingestion and Chunking</h3>
      <p>The quality of your RAG system is directly tied to the quality of your data. Naive chunking strategies often lead to loss of context. We found that semantic chunking, which groups text based on meaning rather than character count, significantly improved retrieval accuracy.</p>
      
      <h3>2. Hybrid Search is Essential</h3>
      <p>Vector search is great for semantic similarity, but it struggles with exact keyword matches (e.g., product SKUs or specific error codes). Implementing a hybrid search strategy that combines dense vector retrieval with sparse keyword search (BM25) provided the best of both worlds.</p>
      
      <h3>3. Evaluation is Key</h3>
      <p>You cannot improve what you cannot measure. We established a rigorous evaluation pipeline using the RAGAS framework to monitor metrics like context precision, answer relevance, and faithfulness. This allowed us to iterate with confidence.</p>
      
      <p>In conclusion, building a production RAG pipeline requires a holistic approach that considers data quality, retrieval strategy, and continuous evaluation.</p>
    `
    },
    "autonomous-agents-future": {
        title: "The Future of Autonomous Agents in Business Automation",
        date: "April 28, 2024",
        readTime: "6 min read",
        category: "Agents",
        content: "<p>Content placeholder for Autonomous Agents article...</p>"
    },
    "optimizing-llm-inference": {
        title: "Optimizing LLM Inference Costs with Quantization",
        date: "April 10, 2024",
        readTime: "10 min read",
        category: "Optimization",
        content: "<p>Content placeholder for Optimization article...</p>"
    },
    "prompt-engineering-patterns": {
        title: "Prompt Engineering Patterns for Consistent Outputs",
        date: "March 22, 2024",
        readTime: "5 min read",
        category: "Prompt Engineering",
        content: "<p>Content placeholder for Prompt Engineering article...</p>"
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = posts[slug as keyof typeof posts]

    if (!post) {
        notFound()
    }

    return (
        <div className="pt-20">
            <Section>
                <div className="container max-w-3xl">
                    <Button asChild variant="ghost" className="mb-8 -ml-4 text-muted-foreground hover:text-primary">
                        <Link href="/blog">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
                        </Link>
                    </Button>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                        <span className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md text-secondary-foreground">
                            <Tag className="h-3 w-3" /> {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {post.readTime}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">{post.title}</h1>

                    <div className="aspect-video relative rounded-xl overflow-hidden bg-muted mb-12 border border-border">
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                            [Blog Cover Image]
                        </div>
                    </div>

                    <article
                        className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </Section>
        </div>
    )
}
