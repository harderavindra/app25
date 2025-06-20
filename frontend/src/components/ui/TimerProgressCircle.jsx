import React, { useEffect, useState } from 'react';

const TimerProgressCircle = ({ duration = 2500, size = 48, strokeWidth = 4, color = '#22c55e', bgColor = '#d1fae5', onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalTime = 100; // ms
    const increment = 100 / (duration / intervalTime);

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(interval);
          onComplete?.();
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <circle
        cx="20"
        cy="20"
        r={radius}
        stroke={bgColor}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx="20"
        cy="20"
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        transform="rotate(-90 20 20)"
      />
    </svg>
  );
};

export default TimerProgressCircle;
