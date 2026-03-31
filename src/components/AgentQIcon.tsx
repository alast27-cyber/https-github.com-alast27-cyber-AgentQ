
import React from 'react';

interface AgentQIconProps {
  className?: string;
  glow?: boolean;
}

const AgentQIcon: React.FC<AgentQIconProps> = ({ className = "w-6 h-6", glow = true }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {glow && (
        <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full animate-pulse" />
      )}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10"
      >
        <defs>
          <linearGradient id="q-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffcc" />
            <stop offset="100%" stopColor="#ff00ff" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Outer Ring */}
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke="url(#q-grad)"
          strokeWidth="4"
          strokeDasharray="10 5"
          className="animate-[spin_10s_linear_infinite]"
        />
        
        {/* Neural Path Casing */}
        <path
          d="M50 20 C65 20, 80 35, 80 50 C80 65, 65 80, 50 80 C35 80, 20 65, 20 50"
          stroke="url(#q-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.5"
        />
        
        {/* The 'Q' Tail / Neural Bridge */}
        <path
          d="M70 70 L85 85"
          stroke="url(#q-grad)"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#glow)"
        />
        
        {/* Core Infon Sphere */}
        <circle
          cx="50"
          cy="50"
          r="15"
          fill="url(#q-grad)"
          className="animate-pulse"
        >
          <animate
            attributeName="r"
            values="12;16;12"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Orbiting Electrons / Data Packets */}
        <circle cx="50" cy="50" r="28" stroke="white" strokeWidth="0.5" strokeDasharray="1 4" opacity="0.3" />
        <circle r="3" fill="#00ffcc">
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            path="M50 22 A28 28 0 1 1 49.9 22"
          />
        </circle>
        <circle r="2" fill="#ff00ff">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M50 78 A28 28 0 1 0 50.1 78"
          />
        </circle>
      </svg>
    </div>
  );
};

export default AgentQIcon;
