"use client"

import { motion } from "framer-motion"
import { ArrowRight, Download } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { AI3DScene } from "@/components/ui/ai-3d-scene"
import { Section } from "@/components/ui/section"

export function Hero() {
    return (
        <Section className="min-h-screen flex items-center justify-center pt-20">
            <AI3DScene />

            <div className="container relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-md mb-8"
                >
                    <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                    Available for new projects
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
                >
                    <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-blue-400 animate-gradient">
                        AI Engineer Building
                    </span>
                    <br className="hidden md:block" />
                    <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-primary animate-gradient">
                        Intelligent Automation Systems
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
                >
                    LLM Engineering • RAG Pipelines • Automation • AI Products
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Button asChild size="lg" className="rounded-full text-base h-12 px-8 animate-glow-pulse">
                        <Link href="/projects">
                            View Projects <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-full text-base h-12 px-8 border-primary/20 hover:bg-primary/10">
                        <Link href="/resume.pdf" target="_blank">
                            Download Resume <Download className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
            >
                <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-primary rounded-full animate-pulse"></div>
                </div>
            </motion.div>
        </Section>
    )
}
