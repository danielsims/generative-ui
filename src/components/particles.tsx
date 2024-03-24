import React from 'react';
import { motion } from 'framer-motion';

interface ParticleConfig {
    x: string;
    y: string;
    colorStart: string;
    colorEnd: string;
    glowColor: string;
    scaleDuration: number;
}

const particleConfigs: ParticleConfig[] = [
    { x: '-42.5%', y: '-42.5%', colorStart: 'rgba(252, 84, 42, 1)', colorEnd: 'rgba(255, 185, 165, 1)', glowColor: 'rgba(255, 135, 105, 0.6)', scaleDuration: 4 },
    { x: '-57.5%', y: '-57.5%', colorStart: 'rgba(168, 85, 247, 0.7)', colorEnd: 'rgba(56, 189, 248, 0.7)', glowColor: 'rgba(112, 161, 247, 0.6)', scaleDuration: 4.5 },
];

export const Particles = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }} // Adjust the duration according to your preference
            className="relative w-16 h-16 flex justify-center items-center blur-sm brightness-125 mx-2"
        >
            <motion.div
                className="absolute"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
                {particleConfigs.map((particle, index) => (
                    <motion.div
                        key={index}
                        initial={{ x: particle.x, y: particle.y }}
                        animate={{ scale: [0.5, 0.7, 0.5] }}
                        transition={{ duration: particle.scaleDuration, repeat: Infinity, ease: "linear" }}
                        className={`rounded-full h-8 w-8 absolute`}
                        style={{ 
                            transform: `translate(${particle.x}, ${particle.y})`,
                            background: `linear-gradient(45deg, ${particle.colorStart}, ${particle.colorEnd})`,
                            boxShadow: `0 0 15px 5px ${particle.glowColor}`
                        }}
                    ></motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};
