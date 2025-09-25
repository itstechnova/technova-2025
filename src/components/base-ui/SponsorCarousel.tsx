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
  const [maxCardHeight, setMaxCardHeight] = React.useState<number>(0);
  const didInitRef = React.useRef(false);

  const [snapXs, setSnapXs] = React.useState<number[]>([]);
  const [bounds, setBounds] = React.useState<{ left: number; right: number }>({
    left: 0,
    right: 0,
  });
  const wheelEndTimer = React.useRef<number | null>(null);

  React.useLayoutEffect(() => {
    const recompute = () => {
      const container = containerRef.current;
      if (!container || cardRefs.current.length === 0) return;

      const containerWidth = container.clientWidth;
      const containerCenter = containerWidth / 2;

      // Use offsetLeft/offsetWidth so transforms don't affect measurements
      const lefts = cardRefs.current.map((el) => el.offsetLeft);
      const widths = cardRefs.current.map((el) => el.offsetWidth);
      const centers = lefts.map((L, i) => L + (widths[i] || 0) / 2);

      // Snap points in x-space
      const baseSnaps =
        snapTo === "center"
          ? centers.map((c) => -(c - containerCenter))
          : lefts.map((L) => -L);

      // Drag bounds: allow scrolling from 0 (left flush) to the far left bound
      const last = cardRefs.current[cardRefs.current.length - 1];
      const contentWidth = last.offsetLeft + last.offsetWidth;
      let leftBound = -(contentWidth - containerWidth);
      const rightBound = 0;
      if (!isFinite(leftBound)) leftBound = 0;
      leftBound = Math.min(0, leftBound);

      // If snapping to center, use snaps’ min/max; else use computed bounds above
      setBounds(
        snapTo === "center"
          ? { left: Math.min(...baseSnaps), right: Math.max(...baseSnaps) }
          : { left: leftBound, right: rightBound }
      );

      // Include extremes as valid snap targets so users can land flush at ends
      const snapsWithExtremes =
        snapTo === "center"
          ? baseSnaps
          : Array.from(new Set([...baseSnaps, rightBound, leftBound]));
      setSnapXs(snapsWithExtremes);

      // On first compute, use initialIndex; afterwards, clamp current x into bounds
      if (!didInitRef.current) {
        if (baseSnaps[initialIndex] !== undefined) {
          x.set(baseSnaps[initialIndex]);
        } else {
          x.set(snapTo === "left" ? 0 : baseSnaps[0] ?? 0);
        }
        didInitRef.current = true;
      } else {
        const current = x.get();
        const clamped = Math.min(Math.max(current, leftBound), rightBound);
        if (clamped !== current) x.set(clamped);
      }
    };

    // Initial compute
    recompute();

    // Recompute on window resize and when observed elements change size
    const ro = new ResizeObserver(() => recompute());
    const container = containerRef.current;
    if (container) ro.observe(container);
    cardRefs.current.forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", recompute);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recompute);
    };
  }, [items.length, gapPx, snapTo]);

  // Equalize card heights to tallest card
  React.useLayoutEffect(() => {
    if (!cardRefs.current.length) return;

    const measure = () => {
      const hs = cardRefs.current.filter(Boolean).map((el) => {
        const child = el.firstElementChild as HTMLElement | null;
        if (child) {
          // Prefer scrollHeight to detect desired height even if parent is constrained
          const sh = (child as HTMLElement).scrollHeight;
          return (
            sh || child.offsetHeight || child.getBoundingClientRect().height
          );
        }
        return el.offsetHeight || el.getBoundingClientRect().height;
      });
      const maxH = hs.length ? Math.max(...hs) : 0;
      setMaxCardHeight(maxH);
    };

    // Observe changes using ResizeObserver for robustness (e.g., images loading)
    const observers: ResizeObserver[] = [];
    cardRefs.current.forEach((el) => {
      if (!el) return;
      const ro = new ResizeObserver(() => measure());
      ro.observe(el);
      observers.push(ro);
    });

    // Initial measure
    measure();

    // Listen for image loads inside cards to re-measure when images finish
    const imgs: HTMLImageElement[] = [];
    cardRefs.current.forEach((el) => {
      if (!el) return;
      el.querySelectorAll("img").forEach((img) => {
        const im = img as HTMLImageElement;
        imgs.push(im);
        if (!im.complete) {
          im.addEventListener("load", measure);
          im.addEventListener("error", measure);
        }
      });
    });

    // Window resize fallback
    window.addEventListener("resize", measure);

    return () => {
      observers.forEach((ro) => ro.disconnect());
      imgs.forEach((im) => {
        im.removeEventListener("load", measure);
        im.removeEventListener("error", measure);
      });
      window.removeEventListener("resize", measure);
    };
  }, [items.length]);

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
    // Prefer exact bounds if user is already near an end
    const nearLeft = Math.abs(x.get() - bounds.left) < 12;
    const nearRight = Math.abs(x.get() - bounds.right) < 12;
    const candidate = nearLeft
      ? bounds.left
      : nearRight
      ? bounds.right
      : nearestSnap(projected);
    const target = Math.min(Math.max(candidate, bounds.left), bounds.right);
    animate(x, target, {
      type: "spring",
      stiffness: 500,
      damping: 44,
      velocity: info.velocity.x,
    });
  }

  function clampX(val: number) {
    return Math.min(Math.max(val, bounds.left), bounds.right);
  }

  function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
    let dx = e.deltaX;
    const dy = e.deltaY;

    // If vertical scrolling dominates and shift isn't held, let the page scroll
    if (Math.abs(dx) < Math.abs(dy) && !e.shiftKey) return;

    // Support shift+wheel to scroll horizontally via vertical gesture
    if (e.shiftKey && Math.abs(dy) > Math.abs(dx)) {
      dx = dy;
    }

    if (dx === 0) return;

    // Consume the event since we're handling horizontal scrolling
    e.preventDefault();
    e.stopPropagation();

    const next = clampX(x.get() - dx);
    x.set(next);

    // Snap to nearest card after user stops scrolling for a short moment
    if (wheelEndTimer.current) window.clearTimeout(wheelEndTimer.current);
    wheelEndTimer.current = window.setTimeout(() => {
      // Snap to nearest, but allow locking to exact ends if close
      const nearLeft = Math.abs(x.get() - bounds.left) < 12;
      const nearRight = Math.abs(x.get() - bounds.right) < 12;
      const candidate = nearLeft
        ? bounds.left
        : nearRight
        ? bounds.right
        : nearestSnap(x.get());
      const target = clampX(candidate);
      animate(x, target, { type: "spring", stiffness: 500, damping: 44 });
      wheelEndTimer.current = null;
    }, 120);
  }

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
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
            style={{
              marginRight: i === items.length - 1 ? 0 : gapPx,
              height: maxCardHeight ? maxCardHeight : undefined,
            }}
          >
            {it.card}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
