"use client"

import { motion } from "framer-motion"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import Link from "next/link"

interface BlogPost {
    title: string
    excerpt: string
    date: string
    readTime: string
    slug: string
    category: string
    image?: string
}

export function BlogCard({ post, index }: { post: BlogPost; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group flex flex-col h-full rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all overflow-hidden"
        >
            <div className="aspect-[16/9] relative bg-muted overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary/20">
                    [Blog Image]
                </div>
                <div className="absolute top-4 left-4 z-20">
                    <span className="px-2 py-1 rounded-md text-xs font-medium bg-primary/20 text-primary backdrop-blur-md border border-primary/20">
                        {post.category}
                    </span>
                </div>
            </div>

            <div className="flex flex-col flex-grow p-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                    </div>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                        {post.title}
                    </Link>
                </h3>

                <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow">
                    {post.excerpt}
                </p>

                <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline underline-offset-4"
                >
                    Read Article <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
            </div>
        </motion.div>
    )
}
