"use client"

import { motion } from "framer-motion"
import { Brain, Code, Database, Globe, Layers, Terminal } from "lucide-react"

import { Section } from "@/components/ui/section"

const skills = [
    {
        category: "AI / ML",
        icon: Brain,
        items: ["LLMs", "RAG", "LangChain", "Embeddings", "Agents", "Fine-tuning"],
    },
    {
        category: "Languages",
        icon: Code,
        items: ["Python", "TypeScript", "JavaScript", "Java", "SQL"],
    },
    {
        category: "Frameworks",
        icon: Layers,
        items: ["Next.js", "React", "Node.js", "FastAPI", "PyTorch"],
    },
    {
        category: "Cloud & DevOps",
        icon: Globe,
        items: ["AWS", "Vercel", "Docker", "Kubernetes", "CI/CD"],
    },
    {
        category: "Tools",
        icon: Terminal,
        items: ["Git", "Postman", "VS Code", "Jupyter", "Linux"],
    },
    {
        category: "Databases",
        icon: Database,
        items: ["PostgreSQL", "MongoDB", "Pinecone", "Redis", "ChromaDB"],
    },
]

export function Skills() {
    return (
        <Section className="bg-secondary/20">
            <div className="container">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        Technical Arsenal
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground max-w-2xl mx-auto"
                    >
                        A comprehensive toolkit for building scalable AI solutions and modern web applications.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.category}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all group hover-lift"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <motion.div
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                    className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                                >
                                    <skill.icon className="h-6 w-6" />
                                </motion.div>
                                <h3 className="font-semibold text-lg">{skill.category}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {skill.items.map((item, i) => (
                                    <motion.span
                                        key={item}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 + i * 0.05 }}
                                        whileHover={{ scale: 1.1 }}
                                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground border border-border/50 cursor-default"
                                    >
                                        {item}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    )
}
