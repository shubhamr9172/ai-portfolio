"use client"

import { motion } from "framer-motion"
import Image from "next/image"

import { Section } from "@/components/ui/section"

export function Bio() {
    return (
        <Section className="pt-32">
            <div className="container">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full md:w-1/3 flex justify-center"
                    >
                        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-[0_0_40px_rgba(0,240,255,0.2)]">
                            <Image
                                src="/profile.jpg"
                                alt="Shubham Reddy"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-full md:w-2/3 space-y-6"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold">
                            Hi, I'm <span className="text-primary">Shubham Reddy</span>
                        </h1>
                        <h2 className="text-2xl text-muted-foreground">
                            AI Engineer & Automation Specialist
                        </h2>
                        <div className="space-y-4 text-muted-foreground/90 text-lg leading-relaxed">
                            <p>
                                I am a passionate AI Engineer with a deep focus on building intelligent systems that solve real-world problems.
                                With a strong background in Machine Learning and Full Stack Development, I bridge the gap between complex AI models and user-friendly applications.
                            </p>
                            <p>
                                My expertise lies in Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), and Autonomous Agents.
                                I enjoy architecting scalable pipelines that turn unstructured data into actionable insights.
                            </p>
                            <p>
                                When I'm not coding, you can find me exploring the latest research papers in AI, experimenting with new model architectures,
                                or contributing to the open-source community.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Section>
    )
}
