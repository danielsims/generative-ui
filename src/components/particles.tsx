import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import type { State } from './chat-input';
interface ParticlesProps {
    state: State;
}

export const Particles = ({ state }: ParticlesProps) => {
    const controls1 = useAnimation();
    const controls2 = useAnimation();

    useEffect(() => {
        const animateParticles = async () => {
            if (state === 'focus') {
                await Promise.all([
                    controls1.start({ scale: [0.4,0.6,0.65,0.5,0.4], transition: { duration: 0.8, ease: "linear", delay: 0.2 } }),
                    controls2.start({ scale: [0.4,0.6,0.45,0.4], transition: { duration: 0.8, ease: "linear"} })
                ]);
                controls1.start({ scale: [0.4, 0.55, 0.4], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } });
                controls2.start({ scale: [0.4, 0.55, 0.4], transition: { repeat: Infinity, duration: 2, delay: 0.5, ease: "easeInOut" } });
            } else if (state === 'idle') {
                await Promise.all([
                    controls1.start({ scale: 0.4, transition: { duration: 0.3 } }),
                    controls2.start({ scale: 0.35, transition: { duration: 0.3 } })
                ]);
                controls1.start({ scale: [0.4, 0.45, 0.4], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } });
                controls2.start({ scale: [0.35, 0.45, 0.35], transition: { repeat: Infinity, duration: 4, delay: 3.5, ease: "easeInOut" } });
            }
        };

        animateParticles();
    }, [state, controls1, controls2]);

    return (
        <div className="relative w-12 h-12 flex justify-center items-center mx-3 blur-sm brightness-110">
            <motion.div
                animate={{ rotate: [0, 360], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" }}}
                className='w-full h-full flex items-center justify-center'
            >
                <motion.div
                    className="absolute w-full"
                    initial={{ scale: 0.5 }}
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
                    initial={{ scale: 0.5 }}
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