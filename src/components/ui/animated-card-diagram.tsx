"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// --- Card Components ---

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AnimatedCard({ className, ...props }: CardProps) {
  return (
    <div
      role="region"
      aria-labelledby="card-title"
      aria-describedby="card-description"
      className={cn(
        "group/animated-card relative w-[356px] overflow-hidden rounded-xl border border-gray-800/50 bg-gray-900/50 shadow-xl backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50",
        className
      )}
      {...props}
    />
  );
}

export function CardBody({ className, ...props }: CardProps) {
  return (
    <div
      role="group"
      className={cn(
        "flex flex-col space-y-1.5 border-t border-gray-800/50 p-4 dark:border-gray-700/50",
        className
      )}
      {...props}
    />
  );
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold leading-none tracking-tight text-white",
        className
      )}
      {...props}
    />
  );
}

interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p
      className={cn(
        "text-sm text-gray-400",
        className
      )}
      {...props}
    />
  );
}

export function CardVisual({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("h-[180px] w-[356px] overflow-hidden", className)}
      {...props}
    />
  );
}

// --- Visual2 Component and its Sub-components ---

interface Visual2Props {
  mainColor?: string;
  secondaryColor?: string;
  gridColor?: string;
}

export function Visual2({
  mainColor = "#8b5cf6",
  secondaryColor = "#a855f7",
  gridColor = "#80808015",
}: Visual2Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        className="absolute inset-0 z-20"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={
          {
            "--color": mainColor,
            "--secondary-color": secondaryColor,
          } as React.CSSProperties
        }
      />
      <div className="relative h-[180px] w-[356px] overflow-hidden rounded-t-lg">
        <Layer1
          hovered={hovered}
          color={mainColor}
          secondaryColor={secondaryColor}
        />
        <Layer2 color={mainColor} />
        <Layer3 color={mainColor} />
        <Layer4
          color={mainColor}
          secondaryColor={secondaryColor}
          hovered={hovered}
        />
        <EllipseGradient color={mainColor} />
        <GridLayer color={gridColor} />
      </div>
    </>
  );
}

interface LayerProps {
  color: string;
  secondaryColor?: string;
  hovered?: boolean;
}

const EllipseGradient: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div className="absolute inset-0 z-[5] flex h-full w-full items-center justify-center">
      <svg
        width="356"
        height="196"
        viewBox="0 0 356 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="356" height="180" fill="url(#paint0_radial_12_207)" />
        <defs>
          <radialGradient
            id="paint0_radial_12_207"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(178 98) rotate(90) scale(98 178)"
          >
            <stop stopColor={color} stopOpacity="0.25" />
            <stop offset="0.34" stopColor={color} stopOpacity="0.15" />
            <stop offset="1" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

const GridLayer: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div
      style={{ "--grid-color": color } as React.CSSProperties}
      className="pointer-events-none absolute inset-0 z-[4] h-full w-full bg-transparent bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:20px_20px] bg-center opacity-70 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"
    />
  );
};

const Layer1: React.FC<LayerProps> = ({ hovered, color, secondaryColor }) => {
  const [mainProgress, setMainProgress] = useState(25);
  const [secondaryProgress, setSecondaryProgress] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (hovered) {
      timeout = setTimeout(() => {
        setMainProgress(75);
        setSecondaryProgress(100);
      }, 200);
    } else {
      setMainProgress(25);
      setSecondaryProgress(0);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [hovered]);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const mainDashoffset = circumference - (mainProgress / 100) * circumference;
  const secondaryDashoffset =
    circumference - (secondaryProgress / 100) * circumference;

  return (
    <div className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] absolute top-0 left-0 z-[7] flex h-[360px] w-[356px] transform items-center justify-center transition-transform duration-500 group-hover/animated-card:-translate-y-[90px] group-hover/animated-card:scale-110">
      <div className="relative flex h-[120px] w-[120px] items-center justify-center text-gray-400 dark:text-white">
        <div className="donut-chart-container relative">
          <svg width="120" height="120" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              opacity={0.2}
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke={secondaryColor}
              strokeWidth="14"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={secondaryDashoffset}
              transform="rotate(-90 50 50)"
              style={{
                transition:
                  "stroke-dashoffset 0.5s cubic-bezier(0.6, 0.6, 0, 1)",
              }}
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke={color}
              strokeWidth="14"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={mainDashoffset}
              transform="rotate(-90 50 50)"
              style={{
                transition:
                  "stroke-dashoffset 0.5s cubic-bezier(0.6, 0.6, 0, 1)",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-semibold text-white">
              {hovered
                ? secondaryProgress > 75
                  ? secondaryProgress
                  : mainProgress
                : mainProgress}
              %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Layer2: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div
      className="relative h-full w-[356px]"
      style={{ "--color": color } as React.CSSProperties}
    >
      <div className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] absolute inset-0 z-[6] flex w-[356px] translate-y-0 items-start justify-center bg-transparent p-4 transition-transform duration-500 group-hover/animated-card:translate-y-full">
        <div className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] rounded-md border border-gray-700/50 bg-gray-800/75 px-2 py-1.5 opacity-100 backdrop-blur-sm transition-opacity duration-500 group-hover/animated-card:opacity-0">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 shrink-0 rounded-full bg-[var(--color)]" />
            <p className="text-xs text-white">
              AI Voice Performance
            </p>
          </div>
          <p className="mt-1 text-xs text-gray-400">
            Real-time analytics dashboard
          </p>
        </div>
      </div>
    </div>
  );
};

const Layer3: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] absolute inset-0 z-[6] flex translate-y-full items-center justify-center opacity-0 transition-all duration-500 group-hover/animated-card:translate-y-0 group-hover/animated-card:opacity-100">
      <svg
        width="356"
        height="180"
        viewBox="0 0 356 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="356" height="180" fill="url(#paint0_linear_29_3)" />
        <defs>
          <linearGradient
            id="paint0_linear_29_3"
            x1="178"
            y1="0"
            x2="178"
            y2="180"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.35" stopColor={color} stopOpacity="0" />
            <stop offset="1" stopColor={color} stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const Layer4: React.FC<LayerProps> = ({ color, secondaryColor, hovered }) => {
  const items = [
    { id: 1, translateX: "100", translateY: "50", text: "Voice AI" },
    { id: 2, translateX: "100", translateY: "-50", text: "CRM Sync" },
    { id: 3, translateX: "125", translateY: "0", text: "Analytics" },
    { id: 4, translateX: "-125", translateY: "0", text: "Webhooks" },
    { id: 5, translateX: "-100", translateY: "50", text: "Calendar" },
    { id: 6, translateX: "-100", translateY: "-50", text: "Flows" },
  ];

  return (
    <div className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] absolute inset-0 z-[7] flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover/animated-card:opacity-100">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] absolute flex items-center justify-center gap-1 rounded-full border border-gray-700/50 bg-gray-800/90 px-1.5 py-0.5 backdrop-blur-sm transition-all duration-500"
          style={{
            transform: hovered
              ? `translate(${item.translateX}px, ${item.translateY}px)`
              : "translate(0px, 0px)",
          }}
        >
          <div
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: index < 3 ? color : secondaryColor }}
          />
          <span className="ml-1 text-[10px] text-white">
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
};