"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function ParticleBackground() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const { theme } = useTheme()

    React.useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number
        let particles: Particle[] = []

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener("resize", resizeCanvas)
        resizeCanvas()

        class Particle {
            x: number
            y: number
            vx: number
            vy: number
            size: number

            constructor() {
                this.x = Math.random() * canvas!.width
                this.y = Math.random() * canvas!.height
                this.vx = (Math.random() - 0.5) * 0.5
                this.vy = (Math.random() - 0.5) * 0.5
                this.size = Math.random() * 2 + 1
            }

            update() {
                this.x += this.vx
                this.y += this.vy

                if (this.x < 0 || this.x > canvas!.width) this.vx *= -1
                if (this.y < 0 || this.y > canvas!.height) this.vy *= -1
            }

            draw() {
                if (!ctx) return
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fillStyle = theme === "dark" ? "rgba(0, 240, 255, 0.5)" : "rgba(0, 112, 243, 0.5)"
                ctx.fill()
            }
        }

        const init = () => {
            particles = []
            const numberOfParticles = Math.min(window.innerWidth / 10, 100) // Responsive count
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle())
            }
        }

        const animate = () => {
            if (!ctx || !canvas) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particles.forEach((particle, index) => {
                particle.update()
                particle.draw()

                // Draw connections
                for (let j = index + 1; j < particles.length; j++) {
                    const dx = particle.x - particles[j].x
                    const dy = particle.y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 150) {
                        ctx.beginPath()
                        ctx.strokeStyle = theme === "dark"
                            ? `rgba(0, 240, 255, ${0.1 - distance / 1500})`
                            : `rgba(0, 112, 243, ${0.1 - distance / 1500})`
                        ctx.lineWidth = 1
                        ctx.moveTo(particle.x, particle.y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()
                    }
                }
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        init()
        animate()

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            cancelAnimationFrame(animationFrameId)
        }
    }, [theme])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 -z-10 h-full w-full opacity-50"
        />
    )
}
