"use client"

import { motion } from "framer-motion"
import { Briefcase, GraduationCap } from "lucide-react"

import { Section } from "@/components/ui/section"

const experience = [
    {
        title: "AI Engineer",
        company: "Tech Innovations Inc.",
        period: "2023 - Present",
        description: "Leading the development of RAG pipelines and autonomous agents. Optimized LLM inference costs by 40%.",
        type: "work",
    },
    {
        title: "Machine Learning Engineer",
        company: "DataCorp Solutions",
        period: "2021 - 2023",
        description: "Built predictive models for customer churn and recommendation engines. Deployed models to AWS SageMaker.",
        type: "work",
    },
    {
        title: "Software Engineer",
        company: "TCS",
        period: "2019 - 2021",
        description: "Developed scalable web applications using React and Node.js. Collaborated with cross-functional teams.",
        type: "work",
    },
]

const education = [
    {
        title: "Master of Science in AI",
        school: "Stanford University (Online)",
        period: "2022 - 2024",
        description: "Specialized in Natural Language Processing and Reinforcement Learning.",
        type: "education",
    },
    {
        title: "Bachelor of Technology in CS",
        school: "JNTU Hyderabad",
        period: "2015 - 2019",
        description: "Graduated with First Class with Distinction.",
        type: "education",
    },
]

export function Timeline() {
    return (
        <Section>
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Journey</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        My professional path and educational background.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Experience Column */}
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <Briefcase className="h-6 w-6 text-primary" />
                            <h3 className="text-2xl font-semibold">Experience</h3>
                        </div>
                        <div className="space-y-8 border-l-2 border-border/50 ml-3 pl-8 relative">
                            {experience.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="relative"
                                >
                                    <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-background bg-primary" />
                                    <div className="mb-1 text-sm text-primary font-medium">{item.period}</div>
                                    <h4 className="text-lg font-bold">{item.title}</h4>
                                    <div className="text-muted-foreground mb-2">{item.company}</div>
                                    <p className="text-sm text-muted-foreground/80">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Education Column */}
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <GraduationCap className="h-6 w-6 text-primary" />
                            <h3 className="text-2xl font-semibold">Education</h3>
                        </div>
                        <div className="space-y-8 border-l-2 border-border/50 ml-3 pl-8 relative">
                            {education.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="relative"
                                >
                                    <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-background bg-primary" />
                                    <div className="mb-1 text-sm text-primary font-medium">{item.period}</div>
                                    <h4 className="text-lg font-bold">{item.title}</h4>
                                    <div className="text-muted-foreground mb-2">{item.school}</div>
                                    <p className="text-sm text-muted-foreground/80">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    )
}
