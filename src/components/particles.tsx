import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

type State = 'idle' | 'focus' | 'typing' | 'loading' | 'error';
interface ParticlesProps {
    state: State;
}

export const Particles = ({ state }: ParticlesProps ) => {

    // Control animations for each particle separately
    const controls1 = useAnimation();
    const controls2 = useAnimation();

    useEffect(() => {
        const animateParticles = async () => {
            // Ensure the particles smoothly transition to the starting scale of the new state before beginning their loop
            if (state === 'focus') {
                await Promise.all([
                    controls1.start({ scale: 0.4, transition: { duration: 0.3 } }),
                    controls2.start({ scale: 0.4, transition: { duration: 0.3 } })
                ]);
                controls1.start({ scale: [0.4, 0.6, 0.4], transition: { repeat: Infinity, duration: 2.75, ease: "easeInOut" } });
                controls2.start({ scale: [0.4, 0.6, 0.4], transition: { repeat: Infinity, duration: 2.75, delay: 2.5, ease: "easeInOut" } });
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
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} className='w-full h-full flex items-center justify-center'>

                <motion.div
                    className="absolute"
                    initial={{ scale: 0.5 }}
                    animate={controls1}
                    style={{
                        background: `linear-gradient(45deg, rgba(252, 84, 42, 0.6), rgba(255, 185, 165, 0.6))`,
                        boxShadow: '0 0 12px 2px rgba(255, 135, 105, 0.6)',
                        borderRadius: '50%',
                        width: '3rem',
                        height: '3rem',
                        top: '-5%',
                        left: '-5%',
                    }}
                />
                <motion.div
                    className="absolute"
                    initial={{ scale: 0.5 }}
                    animate={controls2}
                    style={{
                        background: `linear-gradient(45deg, rgba(168, 85, 247, 0.7), rgba(56, 189, 248, 0.7))`,
                        boxShadow: '0 0 12px 2px rgba(112, 161, 247, 0.6)',
                        borderRadius: '50%',
                        width: '3rem',
                        height: '3rem',
                        top: '5%',
                        left: '5%',
                    }}
                />
            </motion.div>
        </div>
    );
};