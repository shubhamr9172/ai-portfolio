"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

// Flowing Lines Network
function FlowingNetwork() {
    const linesRef = useRef<THREE.LineSegments>(null)

    const geometry = useMemo(() => {
        const points = []
        const colors = []
        const nodeCount = 80

        // Create network nodes
        const nodes = []
        for (let i = 0; i < nodeCount; i++) {
            const theta = (i / nodeCount) * Math.PI * 2
            const radius = 3 + Math.random() * 2
            const height = (Math.random() - 0.5) * 4

            nodes.push({
                x: Math.cos(theta) * radius,
                y: height,
                z: Math.sin(theta) * radius
            })
        }

        // Connect nodes to create network
        for (let i = 0; i < nodeCount; i++) {
            const connections = Math.floor(Math.random() * 3) + 2
            for (let j = 0; j < connections; j++) {
                const targetIndex = (i + Math.floor(Math.random() * 5) + 1) % nodeCount

                points.push(nodes[i].x, nodes[i].y, nodes[i].z)
                points.push(nodes[targetIndex].x, nodes[targetIndex].y, nodes[targetIndex].z)

                // Gradient colors
                const color1 = new THREE.Color(0x00f0ff)
                const color2 = new THREE.Color(0x0066ff)
                colors.push(color1.r, color1.g, color1.b)
                colors.push(color2.r, color2.g, color2.b)
            }
        }

        const geo = new THREE.BufferGeometry()
        geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
        geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

        return geo
    }, [])

    useFrame((state) => {
        if (linesRef.current) {
            linesRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
            linesRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1
        }
    })

    return (
        <lineSegments ref={linesRef} geometry={geometry}>
            <lineBasicMaterial
                vertexColors
                transparent
                opacity={0.4}
                linewidth={1}
            />
        </lineSegments>
    )
}

// Elegant Floating Orbs
function FloatingOrbs() {
    const groupRef = useRef<THREE.Group>(null)

    const orbs = useMemo(() => {
        return Array.from({ length: 12 }, (_, i) => ({
            position: [
                Math.cos((i / 12) * Math.PI * 2) * 4,
                Math.sin(i * 0.5) * 2,
                Math.sin((i / 12) * Math.PI * 2) * 4
            ] as [number, number, number],
            scale: 0.1 + Math.random() * 0.15,
            speed: 0.5 + Math.random() * 0.5
        }))
    }, [])

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.children.forEach((child, i) => {
                const orb = orbs[i]
                child.position.y = orb.position[1] + Math.sin(state.clock.getElapsedTime() * orb.speed + i) * 0.5
            })
        }
    })

    return (
        <group ref={groupRef}>
            {orbs.map((orb, i) => (
                <mesh key={i} position={orb.position} scale={orb.scale}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial
                        color="#00f0ff"
                        emissive="#00f0ff"
                        emissiveIntensity={0.8}
                        transparent
                        opacity={0.6}
                        roughness={0.2}
                        metalness={0.8}
                    />
                </mesh>
            ))}
        </group>
    )
}

// Geometric Rings
function GeometricRings() {
    const ring1Ref = useRef<THREE.Mesh>(null)
    const ring2Ref = useRef<THREE.Mesh>(null)
    const ring3Ref = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        if (ring1Ref.current) {
            ring1Ref.current.rotation.z = time * 0.2
            ring1Ref.current.rotation.y = Math.sin(time * 0.5) * 0.3
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.z = -time * 0.15
            ring2Ref.current.rotation.x = Math.cos(time * 0.4) * 0.2
        }
        if (ring3Ref.current) {
            ring3Ref.current.rotation.z = time * 0.1
            ring3Ref.current.rotation.y = -Math.sin(time * 0.6) * 0.25
        }
    })

    return (
        <>
            <mesh ref={ring1Ref}>
                <torusGeometry args={[3.5, 0.03, 16, 100]} />
                <meshStandardMaterial
                    color="#00f0ff"
                    emissive="#00f0ff"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.3}
                />
            </mesh>
            <mesh ref={ring2Ref}>
                <torusGeometry args={[4.2, 0.02, 16, 100]} />
                <meshStandardMaterial
                    color="#0099ff"
                    emissive="#0099ff"
                    emissiveIntensity={0.4}
                    transparent
                    opacity={0.2}
                />
            </mesh>
            <mesh ref={ring3Ref}>
                <torusGeometry args={[5, 0.015, 16, 100]} />
                <meshStandardMaterial
                    color="#0066ff"
                    emissive="#0066ff"
                    emissiveIntensity={0.3}
                    transparent
                    opacity={0.15}
                />
            </mesh>
        </>
    )
}

// Central Artistic Element
function CentralArt() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime()
            meshRef.current.rotation.x = time * 0.2
            meshRef.current.rotation.y = time * 0.3

            const pulse = Math.sin(time * 1.5) * 0.15 + 1
            meshRef.current.scale.set(pulse, pulse, pulse)
        }
    })

    return (
        <mesh ref={meshRef}>
            <octahedronGeometry args={[0.6, 0]} />
            <meshStandardMaterial
                color="#00f0ff"
                emissive="#00f0ff"
                emissiveIntensity={1}
                transparent
                opacity={0.4}
                wireframe
            />
        </mesh>
    )
}

// Main Scene
export function AI3DScene() {
    return (
        <div className="absolute inset-0 -z-10 opacity-50">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                gl={{ alpha: true, antialias: true }}
            >
                <color attach="background" args={['transparent']} />

                {/* Lighting */}
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
                <pointLight position={[-10, -10, -10]} intensity={0.8} color="#0066ff" />
                <spotLight
                    position={[0, 10, 0]}
                    angle={0.5}
                    intensity={1}
                    color="#00f0ff"
                    penumbra={1}
                />

                {/* Artistic Elements */}
                <CentralArt />
                <GeometricRings />
                <FlowingNetwork />
                <FloatingOrbs />
            </Canvas>
        </div>
    )
}
