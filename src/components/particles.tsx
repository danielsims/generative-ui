import React from 'react';
import { motion } from 'framer-motion';

type State = 'idle' | 'focus' | 'typing' | 'loading' | 'error';
interface ParticlesProps {
    state: State;
}
interface ParticleConfig {
    x: string;
    y: string;
    colorStart: string;
    colorEnd: string;
    glowColor: string;
    scaleDuration: number;
}

const particleConfigs: ParticleConfig[] = [
    { x: '-45%', y: '-45%', colorStart: 'rgba(252, 84, 42, 1)', colorEnd: 'rgba(255, 185, 165, 1)', glowColor: 'rgba(255, 135, 105, 0.6)', scaleDuration: 4 },
    { x: '-55%', y: '-55%', colorStart: 'rgba(168, 85, 247, 0.7)', colorEnd: 'rgba(56, 189, 248, 0.7)', glowColor: 'rgba(112, 161, 247, 0.6)', scaleDuration: 4.5 },
];

export const Particles = ({state}: ParticlesProps) => {

    console.log(state)

    const effects = {
        rotate: {
            duration: {
                idle: 10,
                loading: 1,
            }
        },
        scale: {
            idle: [ 0.4, 0.65, 0.4 ],
            loading: [ 0.6, 0.35, 0.6 ]
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative w-12 h-12 flex justify-center items-center blur-sm brightness-125 ml-3 mx-2"
        >
            <motion.div
                className="absolute"
                animate={{ rotate: 360 }}
                transition={{ duration: effects.rotate.duration['idle'], repeat: Infinity, ease: "linear" }}
            >
                {particleConfigs.map((particle, index) => (
                    <motion.div
                        key={`${index}-${state}`}
                        initial={{ x: particle.x, y: particle.y }}
                        animate={{ scale: effects.scale['idle'] }}
                        transition={{ duration: particle.scaleDuration, ease: "easeInOut", repeat: Infinity,  }}
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
