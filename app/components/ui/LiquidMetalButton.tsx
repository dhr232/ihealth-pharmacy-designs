"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

interface LiquidMetalButtonProps {
  label?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md";
}

export function LiquidMetalButton({
  label = "Book Online",
  href,
  onClick,
  className = "",
  size = "sm",
}: LiquidMetalButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const shaderRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shaderMount = useRef<any>(null);
  const buttonRef = useRef<HTMLElement>(null);
  const rippleId = useRef(0);

  const dimensions = useMemo(() => {
    if (size === "sm") {
      return {
        width: 120,
        height: 34,
        innerWidth: 116,
        innerHeight: 30,
        shaderWidth: 120,
        shaderHeight: 34,
      };
    }
    return {
      width: 154,
      height: 42,
      innerWidth: 150,
      innerHeight: 38,
      shaderWidth: 154,
      shaderHeight: 42,
    };
  }, [size]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const styleId = "shader-canvas-style-liquid-metal";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .shader-container-liquid-metal canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border-radius: 9999px !important;
        }
        @keyframes ripple-animation-metal {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    let isMounted = true;

    const loadShader = async () => {
      try {
        const { liquidMetalFragmentShader, ShaderMount } = await import("@paper-design/shaders");
        if (!isMounted || !shaderRef.current) return;

        if (shaderMount.current?.destroy) {
          shaderMount.current.destroy();
        }

        shaderMount.current = new ShaderMount(
          shaderRef.current,
          liquidMetalFragmentShader,
          {
            u_repetition: 3.5,
            u_softness: 0.5,
            u_shiftRed: 0.45,
            u_shiftBlue: 0.05,
            u_distortion: 0.1,
            u_contour: 0.2,
            u_angle: 45,
            u_scale: 7,
            u_shape: 1,
            u_offsetX: 0.1,
            u_offsetY: -0.1,
          },
          undefined,
          0.6
        );
      } catch (error) {
        console.warn("Liquid metal shader fallback:", error);
      }
    };

    loadShader();

    return () => {
      isMounted = false;
      if (shaderMount.current?.destroy) {
        shaderMount.current.destroy();
        shaderMount.current = null;
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    shaderMount.current?.setSpeed?.(1.2);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    shaderMount.current?.setSpeed?.(0.6);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (shaderMount.current?.setSpeed) {
      shaderMount.current.setSpeed(2.6);
      setTimeout(() => {
        if (isHovered) {
          shaderMount.current?.setSpeed?.(1.2);
        } else {
          shaderMount.current?.setSpeed?.(0.6);
        }
      }, 350);
    }

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = { x, y, id: rippleId.current++ };

      setRipples((prev) => [...prev, ripple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 600);
    }

    onClick?.();
  };

  const Content = (
    <div
      style={{
        position: "relative",
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        transformStyle: "preserve-3d",
        transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {/* Label layer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          transformStyle: "preserve-3d",
          transform: "translateZ(20px)",
          zIndex: 30,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            color: "#ffffff",
            fontWeight: 600,
            letterSpacing: "0.02em",
            textShadow: "0 1px 3px rgba(0, 0, 0, 0.8)",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      </div>

      {/* Inner deep metallic capsule */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          transformStyle: "preserve-3d",
          transform: `translateZ(10px) ${isPressed ? "translateY(1px) scale(0.97)" : "translateY(0) scale(1)"}`,
          zIndex: 20,
          transition: "transform 0.2s ease",
        }}
      >
        <div
          style={{
            width: `${dimensions.innerWidth}px`,
            height: `${dimensions.innerHeight}px`,
            margin: "2px",
            borderRadius: "9999px",
            background: "linear-gradient(180deg, #991b1b 0%, #7f1d1d 100%)",
            boxShadow: isPressed
              ? "inset 0px 2px 4px rgba(0, 0, 0, 0.5)"
              : "inset 0px 1px 1px rgba(255, 255, 255, 0.25)",
          }}
        />
      </div>

      {/* Shader liquid metal background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          transformStyle: "preserve-3d",
          transform: `translateZ(0px) ${isPressed ? "translateY(1px) scale(0.97)" : "translateY(0) scale(1)"}`,
          zIndex: 10,
          transition: "transform 0.2s ease",
        }}
      >
        <div
          style={{
            height: `${dimensions.height}px`,
            width: `${dimensions.width}px`,
            borderRadius: "9999px",
            boxShadow: isHovered
              ? "0 0 16px rgba(192, 29, 22, 0.45), 0 4px 10px rgba(0, 0, 0, 0.25)"
              : "0 2px 6px rgba(0, 0, 0, 0.2)",
            background: "transparent",
            transition: "box-shadow 0.3s ease",
          }}
        >
          <div
            ref={shaderRef}
            className="shader-container-liquid-metal"
            style={{
              borderRadius: "9999px",
              overflow: "hidden",
              position: "relative",
              width: `${dimensions.shaderWidth}px`,
              maxWidth: `${dimensions.shaderWidth}px`,
              height: `${dimensions.shaderHeight}px`,
            }}
          />
        </div>
      </div>

      {/* Click Ripples */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{
            position: "absolute",
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 70%)",
            pointerEvents: "none",
            zIndex: 35,
            animation: "ripple-animation-metal 0.6s ease-out forwards",
          }}
        />
      ))}
    </div>
  );

  const containerClasses = `relative inline-block select-none cursor-pointer ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        ref={buttonRef as unknown as React.RefObject<HTMLAnchorElement>}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        className={containerClasses}
        style={{ perspective: "1000px" }}
        aria-label={label}
      >
        {Content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      ref={buttonRef as unknown as React.RefObject<HTMLButtonElement>}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={containerClasses}
      style={{ perspective: "1000px" }}
      aria-label={label}
    >
      {Content}
    </button>
  );
}

export default LiquidMetalButton;
