import React, { useRef, useState } from 'react';

export default function TiltCard({ children, className = '', style = {}, ...props }) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState({});

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Cursor position relative to card boundaries
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize cursor offsets between -0.5 and 0.5
    const px = (x / width) - 0.5;
    const py = (y / height) - 0.5;

    // Maximum tilt rotation in degrees
    const maxTilt = 12;

    // Calculate Y rotation based on horizontal position, X rotation on vertical position
    const rotateY = px * maxTilt;
    const rotateX = -py * maxTilt;

    setTransformStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease'
    });
  };

  // Combine static styles passed as props with dynamic transform styles
  const combinedStyle = {
    ...style,
    ...transformStyle
  };

  return (
    <div
      ref={cardRef}
      className={`card-3d ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={combinedStyle}
      {...props}
    >
      <div className="card-3d-inner" style={{ height: '100%' }}>
        {children}
      </div>
    </div>
  );
}
