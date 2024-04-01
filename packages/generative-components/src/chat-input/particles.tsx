"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

import type { ChatInputStates } from "./chat-input";

interface Particle {
  background: string;
  glow: string;
  entry: {
    scale?: number[] | number;
    duration?: number;
    ease?: string;
    repeat?: number;
    delay?: number;
  };
  transition: {
    scale?: number[] | number;
    duration?: number;
    ease?: string;
    repeat?: number;
    delay?: number;
  };
}

interface RotationConfig {
  entry: {
    rotation: number;
    duration: number;
    ease: string;
    delay?: number;
    repeat?: number;
  };
  transition: {
    rotation: number;
    duration: number;
    ease: string;
    repeat?: number;
  };
}

interface ParticleConfig {
  particles: Particle[];
  rotation: RotationConfig;
}

interface ParticlesProps {
  state: ChatInputStates;
}

const particleConfig: Record<ChatInputStates, ParticleConfig> = {
  idle: {
    particles: [
      {
        background:
          "linear-gradient(45deg, rgba(252, 84, 42, 0.8), rgba(255, 185, 165, 0.8))",
        glow: "rgba(255, 135, 105, 0.6)",
        entry: {
          scale: 0.4,
          duration: 0.3,
          ease: "easeInOut",
        },
        transition: {
          scale: [0.4, 0.45, 0.4],
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
        },
      },
      {
        background:
          "linear-gradient(45deg, rgba(168, 85, 247, 0.8), rgba(56, 189, 248, 0.8))",
        glow: "rgba(112, 161, 247, 0.6)",
        entry: {
          scale: 0.35,
          duration: 0.3,
          ease: "easeInOut",
        },
        transition: {
          scale: [0.35, 0.45, 0.35],
          duration: 4,
          ease: "easeInOut",
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
        ease: "linear",
        duration: 20,
        repeat: Infinity,
      },
    },
  },
  focus: {
    particles: [
      {
        background:
          "linear-gradient(45deg, rgba(252, 84, 42, 0.8), rgba(255, 185, 165, 0.8))",
        glow: "rgba(255, 135, 105, 0.6)",
        entry: {
          scale: [0.4, 0.6, 0.65, 0.6, 0.4],
          duration: 1.2,
          ease: "easeInOut",
        },
        transition: {
          scale: [0.4, 0.55, 0.4],
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
        },
      },
      {
        background:
          "linear-gradient(45deg, rgba(168, 85, 247, 0.8), rgba(56, 189, 248, 0.8))",
        glow: "rgba(112, 161, 247, 0.6)",
        entry: {
          scale: [0.4, 0.6, 0.45, 0.4],
          duration: 0.6,
          ease: "easeInOut",
        },
        transition: {
          scale: [0.35, 0.45, 0.35],
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 0.5,
        },
      },
    ],
    rotation: {
      entry: {
        rotation: 180,
        duration: 6,
        ease: "easeInOut",
        delay: 0,
      },
      transition: {
        rotation: 360,
        duration: 8,
        ease: "linear",
        repeat: Infinity,
      },
    },
  },
  typing: {
    particles: [
      {
        background:
          "linear-gradient(45deg, rgba(252, 84, 42, 0.8), rgba(255, 185, 165, 0.8))",
        glow: "rgba(255, 135, 105, 0.6)",
        entry: {
          scale: [0.4, 0.6, 0.65, 0.6, 0.4],
          duration: 1.2,
          ease: "easeInOut",
        },
        transition: {
          scale: [0.4, 0.6, 0.45, 0.4],
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
        },
      },
      {
        background:
          "linear-gradient(45deg, rgba(168, 85, 247, 0.8), rgba(56, 189, 248, 0.8))",
        glow: "rgba(112, 161, 247, 0.6)",
        entry: {
          scale: [0.4, 0.6, 0.45, 0.4],
          duration: 0.6,
          ease: "easeInOut",
        },
        transition: {
          scale: [0.4, 0.6, 0.45, 0.4],
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 0.5,
        },
      },
    ],
    rotation: {
      entry: {
        rotation: 0,
        duration: 0,
        ease: "easeInOut",
        delay: 0,
      },
      transition: {
        rotation: 360,
        duration: 0.6,
        ease: "linear",
        repeat: Infinity,
      },
    },
  },
  loading: {
    particles: [
      {
        background:
          "linear-gradient(45deg, rgba(252, 84, 42, 0.8), rgba(255, 185, 165, 0.8))",
        glow: "rgba(255, 135, 105, 0.6)",
        entry: {
          scale: [0.4, 0.6, 0.65, 0.6, 0.4],
          duration: 1.2,
          ease: "easeInOut",
        },
        transition: {
          scale: [0.4, 0.55, 0.4],
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
        },
      },
      {
        background:
          "linear-gradient(45deg, rgba(168, 85, 247, 0.8), rgba(56, 189, 248, 0.8))",
        glow: "rgba(112, 161, 247, 0.6)",
        entry: {
          scale: [0.4, 0.6, 0.45, 0.4],
          duration: 0.6,
          ease: "easeInOut",
        },
        transition: {
          scale: [0.35, 0.45, 0.35],
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 0.5,
        },
      },
    ],
    rotation: {
      entry: {
        rotation: 360,
        duration: 0.5,
        ease: "easeInOut",
        delay: 0,
      },
      transition: {
        rotation: 360,
        duration: 0.5,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  },
  error: {
    particles: [
      {
        background:
          "linear-gradient(45deg, rgba(255, 131, 193, 1), rgba(255, 0, 79, 0.8)",
        glow: "rgba(255, 0, 79, 1)",
        entry: {
          scale: 0.4,
          duration: 0.6,
          ease: "easeInOut",
        },
        transition: {
          scale: [0.4, 0.55, 0.4, 0.55, 0.4],
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
        },
      },
      {
        background:
          "linear-gradient(45deg, rgba(255, 0, 79, 1), rgba(255, 131, 193, 0.8))",
        glow: "rgba(255, 0, 79, 1)",
        entry: {
          scale: 0.4,
          duration: 0.6,
          ease: "easeInOut",
        },
        transition: {
          scale: [0.4, 0.55, 0.4, 0.55, 0.4],
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
        },
      },
    ],
    rotation: {
      entry: {
        rotation: 0,
        duration: 0,
        ease: "linear",
        delay: 0,
      },
      transition: {
        rotation: 0,
        duration: 0,
        ease: "linear",
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
            scale: particleConfig[state]?.particles[0]?.entry.scale,
            boxShadow: `0 0 15px 5px ${particleConfig[state]?.particles[0]?.glow}`,
            transition: {
              duration: particleConfig[state]?.particles[0]?.entry.duration,
              ease: particleConfig[state]?.particles[0]?.entry.ease,
            },
          }),
          controls2.start({
            scale: particleConfig[state]?.particles[1]?.entry.scale,
            boxShadow: `0 0 15px 5px ${particleConfig[state]?.particles[1]?.glow}`,
            transition: {
              duration: particleConfig[state]?.particles[1]?.entry.duration,
              ease: particleConfig[state]?.particles[1]?.entry.ease,
            },
          }),
        ]);
        controls1
          .start({
            scale: particleConfig[state]?.particles[0]?.transition.scale,
            boxShadow: `0 0 15px 5px ${particleConfig[state]?.particles[0]?.glow}`,
            transition: {
              duration:
                particleConfig[state]?.particles[0]?.transition.duration,
              ease: particleConfig[state]?.particles[0]?.transition.ease,
              repeat: particleConfig[state]?.particles[0]?.transition.repeat,
              delay: particleConfig[state]?.particles[0]?.transition.delay,
            },
          })
          .catch((error) => console.error(error));
        controls2
          .start({
            scale: particleConfig[state]?.particles[1]?.transition.scale,
            boxShadow: `0 0 15px 5px ${particleConfig[state]?.particles[1]?.glow}`,
            transition: {
              duration:
                particleConfig[state]?.particles[1]?.transition.duration,
              ease: particleConfig[state]?.particles[1]?.transition.ease,
              repeat: particleConfig[state]?.particles[1]?.transition.repeat,
              delay: particleConfig[state]?.particles[1]?.transition.delay,
            },
          })
          .catch((error) => console.error(error));
      }
    };

    animateParticles().catch((error) => console.error(error));
  }, [state, controls1, controls2]);

  useEffect(() => {
    const animateRotation = async () => {
      await rotationControl.start({
        rotate: currentRotation + particleConfig[state].rotation.entry.rotation,
        transition: {
          duration: particleConfig[state].rotation.entry.duration,
          ease: particleConfig[state].rotation.entry.ease,
          delay: particleConfig[state].rotation.entry.delay,
          repeat: particleConfig[state].rotation.entry.repeat,
        },
      });
      rotationControl.stop();
      rotationControl
        .start({
          rotate: particleConfig[state].rotation.transition.rotation,
          transition: {
            duration: particleConfig[state].rotation.transition.duration,
            repeat: particleConfig[state].rotation.transition.repeat,
            ease: "linear",
          },
        })
        .catch((error) => console.error(error));
      setCurrentRotation(currentRotation + 360);
    };

    animateRotation().catch((error) => console.error(error));
  }, [state, rotationControl, currentRotation]);

  return (
    <div className="relative mx-3 mr-2 flex h-12 w-12 items-center justify-center blur-sm brightness-110">
      <motion.div
        animate={rotationControl}
        className="flex h-full w-full items-center justify-center"
      >
        <motion.div
          className="absolute w-full"
          initial={{ scale: 0 }}
          animate={controls1}
          style={{
            background: particleConfig[state]?.particles[0]?.background,
            boxShadow: `0 0 15px 5px ${particleConfig[state]?.particles[0]?.glow}`,
            borderRadius: "50%",
            width: "48px",
            height: "48px",
            marginTop: "4px",
            marginLeft: "4px",
          }}
        />
        <motion.div
          className="absolute"
          initial={{ scale: 0 }}
          animate={controls2}
          style={{
            background: particleConfig[state]?.particles[1]?.background,
            boxShadow: `0 0 15px 5px ${particleConfig[state]?.particles[1]?.glow}`,
            borderRadius: "50%",
            width: "48px",
            height: "48px",
            marginTop: "-4px",
            marginLeft: "-4px",
          }}
        />
      </motion.div>
    </div>
  );
};
