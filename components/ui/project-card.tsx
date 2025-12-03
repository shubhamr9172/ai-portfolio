"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface ProjectProps {
    title: string
    description: string
    tags: string[]
    image: string
    demoLink?: string
    githubLink?: string
    slug: string
    longDescription?: string
}

export function ProjectCard({ project, index }: { project: ProjectProps; index: number }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all cursor-pointer"
                >
                    <div className="aspect-video relative overflow-hidden bg-muted">
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                        {/* Placeholder Image */}
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute bottom-4 left-4 z-20">
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                {project.title}
                            </h3>
                        </div>
                    </div>

                    <div className="p-4 space-y-4">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border/50"
                                >
                                    {tag}
                                </span>
                            ))}
                            {project.tags.length > 3 && (
                                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border/50">
                                    +{project.tags.length - 3}
                                </span>
                            )}
                        </div>
                    </div>
                </motion.div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-primary">{project.title}</DialogTitle>
                    <DialogDescription>
                        {project.description}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="aspect-video relative rounded-lg overflow-hidden bg-muted border border-border">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-lg">About the Project</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            {project.longDescription || project.description}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2.5 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-4 pt-4">
                        {project.demoLink && (
                            <Button asChild className="flex-1">
                                <Link href={project.demoLink} target="_blank" className="flex items-center justify-center gap-2">
                                    Live Demo <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        )}
                        {project.githubLink && (
                            <Button asChild variant="outline" className="flex-1">
                                <Link href={project.githubLink} target="_blank" className="flex items-center justify-center gap-2">
                                    GitHub <Github className="h-4 w-4" />
                                </Link>
                            </Button>
                        )}
                        <Button asChild variant="secondary" className="flex-1">
                            <Link href={`/projects/${project.slug}`}>
                                View Case Study
                            </Link>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
