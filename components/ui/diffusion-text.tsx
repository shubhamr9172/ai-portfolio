"use client"

import { useRef, useEffect, useMemo, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

interface DiffusionTextProps {
    text: string
    duration?: number
    fontSize?: number
    color?: string
    noiseColor?: string
}

function DiffusionPlane({ text, duration, fontSize, color, noiseColor }: Required<DiffusionTextProps>) {
    const meshRef = useRef<THREE.Mesh>(null)
    const [hasAnimated, setHasAnimated] = useState(false)
    const startTime = useRef<number>(0)
    const { gl } = useThree()

    // Create text texture
    const textTexture = useMemo(() => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')!

        canvas.width = 2048
        canvas.height = 512

        ctx.fillStyle = 'transparent'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = color
        ctx.font = `bold ${fontSize}px Arial, sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        // Split text into lines if needed
        const lines = text.split('\n')
        const lineHeight = fontSize * 1.2
        const startY = canvas.height / 2 - ((lines.length - 1) * lineHeight) / 2

        lines.forEach((line, i) => {
            ctx.fillText(line, canvas.width / 2, startY + i * lineHeight)
        })

        const texture = new THREE.CanvasTexture(canvas)
        texture.needsUpdate = true
        return texture
    }, [text, fontSize, color])

    // Custom shader material
    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { value: textTexture },
                uProgress: { value: 0 },
                uNoiseScale: { value: 50.0 },
                uColor: { value: new THREE.Color(color) },
                uNoiseColor: { value: new THREE.Color(noiseColor) },
            },
            vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uProgress;
        uniform float uNoiseScale;
        uniform vec3 uColor;
        uniform vec3 uNoiseColor;
        varying vec2 vUv;
        
        // Noise functions
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }
        
        float noise(vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }
        
        void main() {
          vec4 texColor = texture2D(uTexture, vUv);
          
          // Multi-octave noise
          float n = 0.0;
          float amplitude = 1.0;
          float frequency = 1.0;
          
          for(int i = 0; i < 4; i++) {
            n += noise(vUv * uNoiseScale * frequency) * amplitude;
            amplitude *= 0.5;
            frequency *= 2.0;
          }
          
          // Noise intensity decreases with progress
          float noiseIntensity = (1.0 - uProgress) * 0.8;
          
          // Threshold for revealing text
          float threshold = uProgress - 0.1;
          float reveal = smoothstep(threshold - 0.2, threshold + 0.2, n);
          
          // Mix between noise and text
          vec3 noiseColorMix = mix(uNoiseColor, uColor, n);
          vec3 finalColor = mix(noiseColorMix, texColor.rgb, reveal * uProgress);
          
          // Alpha based on text and reveal
          float alpha = mix(noiseIntensity * 0.6, texColor.a, reveal * uProgress);
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
            transparent: true,
        })
    }, [textTexture, color, noiseColor])

    useFrame((state) => {
        if (!meshRef.current || hasAnimated) return

        if (startTime.current === 0) {
            startTime.current = state.clock.elapsedTime
        }

        const elapsed = state.clock.elapsedTime - startTime.current
        const progress = Math.min(elapsed / duration, 1)

        shaderMaterial.uniforms.uProgress.value = progress

        if (progress >= 1) {
            setHasAnimated(true)
        }
    })

    // Cleanup
    useEffect(() => {
        return () => {
            textTexture.dispose()
            shaderMaterial.dispose()
        }
    }, [textTexture, shaderMaterial])

    return (
        <mesh ref={meshRef} material={shaderMaterial}>
            <planeGeometry args={[8, 2]} />
        </mesh>
    )
}

export function DiffusionText({
    text,
    duration = 2.5,
    fontSize = 120,
    color = "#ffffff",
    noiseColor = "#00f0ff"
}: DiffusionTextProps) {
    return (
        <div className="absolute inset-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                gl={{ alpha: true, antialias: true }}
            >
                <color attach="background" args={['transparent']} />
                <DiffusionPlane
                    text={text}
                    duration={duration}
                    fontSize={fontSize}
                    color={color}
                    noiseColor={noiseColor}
                />
            </Canvas>
        </div>
    )
}
