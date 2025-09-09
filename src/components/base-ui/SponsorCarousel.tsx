"use client";
import * as React from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import SponsorCard, { SponsorCardProps } from "./SponsorCard";

interface CardRowProps {
  cards: SponsorCardProps[];
  className?: string;
}

export default function CardRow({ cards, className }: CardRowProps) {
  return (
    <div className={["relative w-full overflow-hidden", className].join(" ")}>
      <motion.div
        className="flex justify-start gap-6 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: -1000, right: 0 }}
        dragElastic={0.1}
        dragMomentum
        style={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {cards.map((card, i) => (
          <motion.div
            key={i}
            className="shrink-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <SponsorCard {...card} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// replace your existing SponsorCarousel with this version
export function SponsorCarousel({
  items,
  gapPx = 34,
  initialIndex = 0,
  className,
  snapTo = "left", // "left" | "center" (default left)
}: {
  items: { key: string | number; card: React.ReactNode }[];
  gapPx?: number;
  initialIndex?: number;
  className?: string;
  snapTo?: "left" | "center";
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<HTMLDivElement[]>([]);
  const x = useMotionValue(0);

  const [snapXs, setSnapXs] = React.useState<number[]>([]);
  const [bounds, setBounds] = React.useState<{ left: number; right: number }>({
    left: 0,
    right: 0,
  });

  React.useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || cardRefs.current.length === 0) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.width / 2;

    // Distances from container's left edge to each card's LEFT/CENTER
    const lefts = cardRefs.current.map((el) => {
      const r = el.getBoundingClientRect();
      return r.left - containerRect.left + container.scrollLeft;
    });

    const centers = cardRefs.current.map(
      (el, i) => lefts[i] + el.getBoundingClientRect().width / 2
    );

    // Snap points in x-space
    const snaps =
      snapTo === "center"
        ? centers.map((c) => -(c - containerCenter))
        : lefts.map((L) => -L);

    setSnapXs(snaps);

    // Drag bounds: allow scrolling from 0 (left flush) to the far left bound
    const last = cardRefs.current[cardRefs.current.length - 1];
    const lastRect = last.getBoundingClientRect();
    const contentWidth =
      lastRect.right - containerRect.left + container.scrollLeft;
    const leftBound = -(contentWidth - containerRect.width);
    const rightBound = 0;

    // If snapping to center, use snaps’ min/max; else use computed bounds above
    setBounds(
      snapTo === "center"
        ? { left: Math.min(...snaps), right: Math.max(...snaps) }
        : { left: isFinite(leftBound) ? leftBound : 0, right: rightBound }
    );

    // Initial position
    if (snaps[initialIndex] !== undefined) {
      x.set(snapTo === "left" ? snaps[initialIndex] : snaps[initialIndex]);
    } else {
      x.set(snapTo === "left" ? 0 : snaps[0] ?? 0);
    }
  }, [items.length, gapPx, snapTo]);

  function nearestSnap(projectedX: number) {
    if (!snapXs.length) return projectedX;
    let best = snapXs[0];
    let bestDist = Math.abs(projectedX - best);
    for (let i = 1; i < snapXs.length; i++) {
      const d = Math.abs(projectedX - snapXs[i]);
      if (d < bestDist) {
        bestDist = d;
        best = snapXs[i];
      }
    }
    return best;
  }

  function handleDragEnd(_: any, info: { velocity: { x: number } }) {
    const projected = x.get() + info.velocity.x * 0.35;
    const target = Math.min(
      Math.max(nearestSnap(projected), bounds.left),
      bounds.right
    );
    animate(x, target, {
      type: "spring",
      stiffness: 500,
      damping: 44,
      velocity: info.velocity.x,
    });
  }

  return (
    <div
      ref={containerRef}
      className={["relative w-full overflow-hidden", className].join(" ")}
    >
      <motion.div
        style={{ x }}
        drag="x"
        dragConstraints={{ left: bounds.left, right: bounds.right }}
        onDragEnd={handleDragEnd}
        className="flex"
      >
        {items.map((it, i) => (
          <div
            key={it.key}
            ref={(el) => {
              if (el) cardRefs.current[i] = el;
            }}
            className="shrink-0"
            style={{ marginRight: i === items.length - 1 ? 0 : gapPx }}
          >
            {it.card}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
