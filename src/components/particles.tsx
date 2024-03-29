"use client"

import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import type { State } from './chat-input';
interface Particle {
    background: string;
    glow: string;
    entry: {
        scale?: number[] | number;
        duration?: number;
        ease?: string;
        repeat?: number;
        delay?: number;
    },
    transition: {
        scale?: number[] | number;
        duration?: number;
        ease?: string;
        repeat?: number;
        delay?: number;
    },
}

interface RotationConfig {
    entry: {
        rotation: number;
        duration: number;
        ease: string;
        delay?: number;
        repeat?: number;
    },
    transition: {
        rotation: number;
        duration: number;
        repeat?: number;
    },
}

interface ParticleConfig {
    particles: Particle[];
    rotation: RotationConfig;
}

interface ParticlesProps {
    state: State;
}

// @ts-ignore
const particleConfig: Record<State, ParticleConfig> = {
    idle: {
        particles: [
            {
                background: 'linear-gradient(45deg, rgba(252, 84, 42, 0.8), rgba(255, 185, 165, 0.8))',
                glow: 'rgba(255, 135, 105, 0.6)',
                entry: {
                    scale: 0.4, 
                    duration: 0.3,
                    ease: 'easeInOut'
                },
                transition: { 
                    scale: [0.4, 0.45, 0.4], 
                    duration: 4, 
                    ease: 'easeInOut', 
                    repeat: Infinity
                }
            },
            {
                background: 'linear-gradient(45deg, rgba(168, 85, 247, 0.8), rgba(56, 189, 248, 0.8))',
                glow: 'rgba(112, 161, 247, 0.6)',
                entry: {
                    scale: 0.35,
                    duration: 0.3,
                    ease: 'easeInOut'
                },
                transition: {
                    scale: [0.35, 0.45, 0.35],
                    duration: 4,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    delay: 3.5,
                },
            },
        ],
        rotation: {
            entry: {
                rotation: 0,
                duration: 0,
                delay: 0,
                ease: "easeInOut",
            },
            transition: {
                rotation: 360,
                duration: 20,
                repeat: Infinity,
            },
        },
    },
    focus: {
        particles: [
            {
                background: 'linear-gradient(45deg, rgba(252, 84, 42, 0.8), rgba(255, 185, 165, 0.8))',
                glow: 'rgba(255, 135, 105, 0.6)',
                entry: {
                    scale: [0.4, 0.6, 0.65, 0.6, 0.4],
                    duration: 1.2,
                    ease: "easeInOut"
                },
                transition: {
                    scale: [0.4, 0.55, 0.4],
                    duration: 2,
                    ease: 'easeInOut',
                    repeat: Infinity
                },
            },
            {
                background: 'linear-gradient(45deg, rgba(168, 85, 247, 0.8), rgba(56, 189, 248, 0.8))',
                glow: 'rgba(112, 161, 247, 0.6)',
                entry: {
                    scale: [0.4, 0.6, 0.45, 0.4],
                    duration: 0.6,
                    ease: "easeInOut"
                },
                transition: {
                    scale: [0.35, 0.45, 0.35],
                    duration: 2,
                    ease: 'easeInOut', 
                    repeat: Infinity,
                    delay: 0.5,
                },
            },
        ],
        rotation: {
            entry: {
                rotation: 360,
                duration: 1.2,
                ease: "easeInOut",
                delay: 0,
            },
            transition: {
                rotation: 360,
                duration: 0.5,
                repeat: Infinity,
            },
        },
    },
};

export const Particles = ({ state }: ParticlesProps) => {
    const controls1 = useAnimation();
    const controls2 = useAnimation();
    const rotationControl = useAnimation();
    const [currentRotation, setCurrentRotation] = useState(0);

    useEffect(() => {

        const animateParticles = async () => {

            if (state) {
                await Promise.all([
                    controls1.start({ 
                        scale: particleConfig[state].particles[0].entry.scale, 
                        transition: { 
                            duration: particleConfig[state].particles[0].entry.duration,
                            ease: particleConfig[state].particles[0].entry.ease
                    }}),
                    controls2.start({ 
                        scale: particleConfig[state].particles[1].entry.scale, 
                        transition: { 
                            duration: particleConfig[state].particles[1].entry.duration,
                            ease: particleConfig[state].particles[1].entry.ease
                    }})
                ])
                controls1.start({ 
                    scale: particleConfig[state].particles[0].transition.scale,
                    transition: {
                        duration: particleConfig[state].particles[0].transition.duration,
                        ease: particleConfig[state].particles[0].transition.ease,
                        repeat: particleConfig[state].particles[0].transition.repeat,
                        delay: particleConfig[state].particles[0].transition.delay
                    }
                });
                controls2.start({ 
                    scale: particleConfig[state].particles[1].transition.scale,
                    transition: {
                        duration: particleConfig[state].particles[1].transition.duration,
                        ease: particleConfig[state].particles[1].transition.ease,
                        repeat: particleConfig[state].particles[1].transition.repeat,
                        delay: particleConfig[state].particles[1].transition.delay
                    }
                });
            }
        };

        animateParticles();
    }, [state, controls1, controls2]);

    useEffect(() => {

        // Start rotation from the current position and smoothly transition
        const animateRotation = async () => {
            await rotationControl.start({
                rotate: currentRotation + particleConfig[state].rotation.entry.rotation, // Continue from current rotation
                transition: {
                    duration: particleConfig[state].rotation.entry.duration,
                    ease: particleConfig[state].rotation.entry.ease,
                    delay: particleConfig[state].rotation.entry.delay,
                    repeat: particleConfig[state].rotation.entry.repeat,
                }
            });
            rotationControl.stop()
            rotationControl.start({ 
                rotate: particleConfig[state].rotation.transition.rotation,
                transition: {
                    duration: particleConfig[state].rotation.transition.duration,
                    repeat: particleConfig[state].rotation.transition.repeat,
                    ease: "linear",
                }
            });
            setCurrentRotation(currentRotation + 360);
        };

        animateRotation();

    }, [state, rotationControl, currentRotation])

    return (
        <div className="relative w-12 h-12 flex justify-center items-center blur-sm ml-4 mr-2 brightness-110">
            <motion.div
                animate={rotationControl}
                className='w-full h-full flex items-center justify-center'
            >
                <motion.div
                    className="absolute w-full"
                    initial={{ scale: 0 }}
                    animate={controls1}
                    style={{
                        background: `linear-gradient(45deg, rgba(252, 84, 42, 0.8), rgba(255, 185, 165, 0.8))`,
                        boxShadow: '0 0 15px 5px rgba(255, 135, 105, 0.6)',
                        borderRadius: '50%',
                        width: '48px',
                        height: '48px',
                        marginTop: '4px',
                        marginLeft: '4px'
                    }}
                />
                <motion.div
                    className="absolute"
                    initial={{ scale: 0 }}
                    animate={controls2}
                    style={{
                        background: `linear-gradient(45deg, rgba(168, 85, 247, 0.8), rgba(56, 189, 248, 0.8))`,
                        boxShadow: '0 0 15px 5px rgba(112, 161, 247, 0.6)',
                        borderRadius: '50%',
                        width: '48px',
                        height: '48px',
                        marginTop: '-4px',
                        marginLeft: '-4px'
                    }}
                />
            </motion.div>
        </div>
    );
};