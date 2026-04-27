import type { CSSProperties } from "react";

/** Percent strings relative to the image box (e.g. `'12%'`). */
export type LivBlurRect = {
  top: string;
  left: string;
  width: string;
  height: string;
};

const DEFAULT_HEATSINK: LivBlurRect = {
  top: "46%",
  left: "38%",
  width: "9.68%",
  height: "18.15%",
};

const DEFAULT_PCB: LivBlurRect = {
  top: "52%",
  left: "57%",
  width: "39.93%",
  height: "21.78%",
};

function overlayStyle(
  rect: LivBlurRect,
  opts: { showDebugOutline: boolean; borderRadius: string },
): CSSProperties {
  return {
    position: "absolute",
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    borderRadius: opts.borderRadius,
    boxSizing: "border-box",
    pointerEvents: "none",
    WebkitBackdropFilter: "blur(12px)",
    backdropFilter: "blur(12px)",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    ...(opts.showDebugOutline ? { border: "2px solid red" } : {}),
  };
}

/** Same URL as the bench POC `<img>`, use to match carousel / cover slide paths. */
export const LIV_BENCH_POC_IMAGE_PATH = "/images/liv-layman-bench-poc.png";

export function isLivBenchPocSlideUrl(src: string): boolean {
  if (!src) return false;
  if (src === LIV_BENCH_POC_IMAGE_PATH) return true;
  try {
    return new URL(src, "https://local.invalid").pathname === LIV_BENCH_POC_IMAGE_PATH;
  } catch {
    return src.includes("liv-layman-bench-poc");
  }
}

type LivBenchPocImageProps = {
  /** When true, draws a red outline on each blur region so you can tune percentages. Set false when aligned. */
  showDebugOutline?: boolean;
  /** Override default heatsink box (percent of image width/height). */
  heatsink?: Partial<LivBlurRect>;
  /** Override default PCB box. */
  pcb?: Partial<LivBlurRect>;
  className?: string;
  /**
   * Project cards / slideshow: shrink-wrap the photo so percentage-based blur regions stay
   * aligned to the image (not a taller flex parent).
   */
  compact?: boolean;
  /** When set, replaces default `<img>` classes (e.g. match case-study panel sizing). */
  imageClassName?: string;
};

/**
 * Wooden bench POC photo with two backdrop-blur redaction regions.
 *
 * **Tuning:** All positions use `%` of the rendered image box (the relative wrapper matches the img).
 * - Nudge **left** / **top** to move a box; increase **width** / **height** to grow it.
 * - Values are from the reference crop of `/images/liv-layman-bench-poc.png`; if the asset is recropped, re-tune or pass `heatsink` / `pcb` partial overrides from MDX.
 */
export function LivBenchPocImage({
  showDebugOutline = false,
  heatsink: heatsinkOverride,
  pcb: pcbOverride,
  className,
  compact = false,
  imageClassName,
}: LivBenchPocImageProps) {
  const heatsink = { ...DEFAULT_HEATSINK, ...heatsinkOverride };
  const pcb = { ...DEFAULT_PCB, ...pcbOverride };

  /** Custom image sizing needs a shrink-wrapped shell so blur overlays match the bitmap. */
  const shrinkWrapped = compact || Boolean(imageClassName?.trim());

  const shellClass = compact
    ? ["relative inline-block max-h-full max-w-full overflow-hidden rounded-lg", className]
    : shrinkWrapped
      ? ["relative inline-block max-w-full overflow-hidden rounded-xl", className]
      : ["relative mx-auto w-full max-w-[56rem] overflow-hidden rounded-xl", className];

  const defaultImgClass = compact
    ? "block max-h-full max-w-full object-contain"
    : "block h-auto w-full object-contain";
  const imgClass = imageClassName?.trim() ? imageClassName.trim() : defaultImgClass;

  return (
    <div className={shellClass.filter(Boolean).join(" ").trim()}>
      <img
        src={LIV_BENCH_POC_IMAGE_PATH}
        alt="Early bench LIV proof of concept: detector head on plywood; heatsink and drive PCB are lightly softened for confidentiality"
        decoding="async"
        loading="lazy"
        className={imgClass}
      />
      {/* Same box as image, percentages are relative to this layer */}
      <div className="pointer-events-none absolute inset-0">
        <div
          aria-hidden
          style={overlayStyle(heatsink, { showDebugOutline, borderRadius: "9999px" })}
        />
        <div aria-hidden style={overlayStyle(pcb, { showDebugOutline, borderRadius: "0.5rem" })} />
      </div>
    </div>
  );
}
