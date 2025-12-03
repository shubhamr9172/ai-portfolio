"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Sparkles, ArrowRight, FileText, Github, Linkedin, Database } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock RAG Knowledge Base
const intents = [
    {
        keywords: ["tech", "stack", "skills", "technologies", "tools", "languages", "frameworks", "java", "python"],
        answer: "I specialize in Prompt Engineering and building AI applications using LangChain, Python, and TensorFlow. My core stack includes Java for system engineering, along with modern AI tools for developing intelligent agents and RAG pipelines.",
        sources: [
            { name: "skills.json", icon: FileText },
            { name: "github_history", icon: Github }
        ]
    },
    {
        keywords: ["experience", "background", "work", "career", "history", "years", "tcs", "system", "engineer"],
        answer: "I have 1.8 years of experience as a System Engineer at TCS (Tata Consultancy Services). My role involves building robust systems and integrating AI solutions into enterprise workflows, with a focus on prompt engineering and system optimization.",
        sources: [
            { name: "resume.pdf", icon: FileText },
            { name: "linkedin", icon: Linkedin }
        ]
    },
    {
        keywords: ["projects", "portfolio", "work", "built", "created", "prompt", "craft", "learning"],
        answer: "My signature project is 'Prompt Craft', a dedicated learning platform designed to master the art of prompt engineering. It helps users understand how to effectively communicate with LLMs to get the best results, featuring interactive tutorials and real-world examples.",
        sources: [
            { name: "prompt_craft_repo", icon: Github },
            { name: "portfolio_db", icon: Database }
        ]
    },
    {
        keywords: ["contact", "reach", "email", "hire", "available", "talk", "mobile", "phone"],
        answer: "I'm available for new opportunities! You can reach me directly at shubhamreddy9172@gmail.com or call me at +91 9172587538. I'm always open to discussing AI innovations and system engineering roles.",
        sources: [
            { name: "contact_card.vcf", icon: FileText }
        ]
    }
]

// Smart Intent Matching
function matchIntent(query: string) {
    const tokens = query.toLowerCase().split(/\s+/)
    let bestMatch = { intent: null as any, score: 0 }

    intents.forEach(intent => {
        const score = tokens.filter(token =>
            intent.keywords.some(keyword => keyword.includes(token) || token.includes(keyword))
        ).length

        if (score > bestMatch.score) {
            bestMatch = { intent, score }
        }
    })

    if (bestMatch.score > 0) {
        return bestMatch.intent
    }

    // Fallback response
    return {
        answer: "I'm Shubham Reddy, an AI Engineer specializing in LLM applications and RAG systems. Ask me about my tech stack, experience, projects, or how to get in touch!",
        sources: [{ name: "general_assistant", icon: Sparkles }]
    }
}

// Typewriter Hook
function useTypewriter(text: string, speed = 30) {
    const [displayText, setDisplayText] = useState("")
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        setDisplayText("")
        setIsComplete(false)
        let index = 0

        const timer = setInterval(() => {
            if (index < text.length) {
                setDisplayText(text.slice(0, index + 1))
                index++
            } else {
                setIsComplete(true)
                clearInterval(timer)
            }
        }, speed)

        return () => clearInterval(timer)
    }, [text, speed])

    return { displayText, isComplete }
}

export function RagHero() {
    const [query, setQuery] = useState("")
    const [state, setState] = useState<"idle" | "thinking" | "streaming" | "complete">("idle")
    const [response, setResponse] = useState<any>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const { displayText, isComplete } = useTypewriter(
        state === "streaming" || state === "complete" ? response?.answer || "" : "",
        30
    )

    useEffect(() => {
        if (isComplete && state === "streaming") {
            setState("complete")
        }
    }, [isComplete, state])

    const handleSearch = async () => {
        if (!query.trim()) return

        setState("thinking")

        // Simulate network latency
        const delay = Math.random() * 700 + 800
        await new Promise(resolve => setTimeout(resolve, delay))

        const matchedIntent = matchIntent(query)
        setResponse(matchedIntent)
        setState("streaming")
    }

    const handleReset = () => {
        setState("idle")
        setQuery("")
        setResponse(null)
    }

    return (
        <div className="w-full max-w-4xl mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
            >
                {/* Header */}
                <div className="text-center space-y-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
                    >
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-primary">AI-Powered Knowledge Retrieval</span>
                    </motion.div>

                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                        Ask me anything about my background
                    </h2>
                    <p className="text-muted-foreground">
                        Powered by a mock RAG system · Try: "What's your tech stack?"
                    </p>
                </div>

                {/* Main Search Interface */}
                <AnimatePresence mode="wait">
                    {state === "idle" && (
                        <motion.div
                            key="search-input"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative"
                        >
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-blue-500 to-primary rounded-2xl opacity-30 group-hover:opacity-50 blur transition duration-300 animate-gradient" />
                                <div className="relative flex items-center gap-3 bg-zinc-950 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
                                    <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                        placeholder="What would you like to know about me?"
                                        className="flex-1 bg-transparent text-white placeholder:text-muted-foreground outline-none text-lg"
                                        aria-label="RAG Search Query"
                                        suppressHydrationWarning
                                    />
                                    <button
                                        onClick={handleSearch}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium"
                                        aria-label="Search"
                                    >
                                        Search
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {state === "thinking" && (
                        <motion.div
                            key="thinking"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex items-center justify-center gap-3 p-12 rounded-2xl bg-zinc-950 border border-white/10 backdrop-blur-xl"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                                <Sparkles className="h-6 w-6 text-primary" />
                            </motion.div>
                            <span className="text-lg text-muted-foreground font-mono">Searching knowledge base...</span>
                        </motion.div>
                    )}

                    {(state === "streaming" || state === "complete") && response && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            {/* Query Display */}
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900/50 border border-white/5">
                                <Search className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <p className="text-white/70">{query}</p>
                            </div>

                            {/* AI Response */}
                            <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 backdrop-blur-xl space-y-4">
                                <div className="flex items-center gap-2 text-primary">
                                    <Sparkles className="h-4 w-4" />
                                    <span className="text-sm font-medium">AI Response</span>
                                </div>

                                <p className="text-white/90 leading-relaxed font-mono text-sm md:text-base">
                                    {displayText}
                                    {!isComplete && (
                                        <motion.span
                                            animate={{ opacity: [1, 0] }}
                                            transition={{ duration: 0.5, repeat: Infinity }}
                                            className="inline-block w-2 h-4 bg-primary ml-1"
                                        />
                                    )}
                                </p>

                                {/* Sources - Fade in after typing completes */}
                                <AnimatePresence>
                                    {state === "complete" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="pt-4 border-t border-white/10 space-y-3"
                                        >
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Database className="h-4 w-4" />
                                                <span className="text-xs font-medium uppercase tracking-wider">Retrieved Sources</span>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {response.sources.map((source: any, idx: number) => (
                                                    <motion.div
                                                        key={idx}
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.5 + idx * 0.1 }}
                                                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors cursor-default"
                                                    >
                                                        <source.icon className="h-3.5 w-3.5 text-primary" />
                                                        <span className="text-xs font-mono text-primary">{source.name}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Reset Button */}
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                onClick={handleReset}
                                className="w-full px-4 py-3 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 hover:text-white transition-colors font-medium"
                            >
                                Ask another question
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}
