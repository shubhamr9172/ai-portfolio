"use client"

import { motion } from "framer-motion"
import { Briefcase, GraduationCap } from "lucide-react"

import { Section } from "@/components/ui/section"

const experience = [
    {
        title: "Assistant System Engineer",
        company: "TCS",
        period: "May 2024 - Present",
        description: "Working in Java and support role for ServiceNow platform. Contributed to Adobe Sign project integration and maintenance.",
        type: "work",
    },
    {
        title: "Laravel Developer",
        company: "David Solutions",
        period: "2020 (6 Months)",
        description: "Developed web applications using the Laravel framework. Built and maintained backend services.",
        type: "work",
    },
]

const education = [
    {
        title: "Bachelors of Engineering, Computer Science",
        school: "Marathwada Mitra Mandal’s Institute of Technology, Pune",
        period: "2021 – 2023",
        description: "CGPA: 9.10",
        type: "education",
    },
    {
        title: "Diploma in Computer Engineering",
        school: "Puranmal Lahoti Government Polytechnic, Latur",
        period: "2017 - 2020",
        description: "Percentage: 89.13%",
        type: "education",
    },
    {
        title: "Secondary School Certificate (Class X)",
        school: "Shree Ganesh Vidyalay, Latur",
        period: "Mar ‘17",
        description: "Percentage: 87.20%",
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
