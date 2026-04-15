import { useMemo, useState } from "react";

export interface WorkTimelineEntry {
  id: string;
  data: {
    company: string;
    role: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
    achievements: string[];
    order: number;
    location?: string;
    coverImage?: string;
    /** full-bleed vs centered logo treatment */
    coverImageLayout?: "full" | "centered";
    brandInitial?: string;
    brandColor?: string;
    logoUrl?: string;
  };
}

interface WorkExperienceTimelineProps {
  entries: WorkTimelineEntry[];
  variant?: "default" | "home";
}

function periodLabel(data: WorkTimelineEntry["data"]) {
  return data.current ? `${data.startDate} to Present` : `${data.startDate} to ${data.endDate ?? ""}`.trim();
}

function chipLabel(data: WorkTimelineEntry["data"]) {
  const raw = (data.brandInitial ?? data.company).trim();
  return raw.length <= 2
    ? raw.toUpperCase()
    : raw.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase() || raw.slice(0, 2).toUpperCase();
}

function TimelineLogo({
  data,
  size,
}: {
  data: WorkTimelineEntry["data"];
  size: "md" | "sm";
}) {
  const dim = size === "md" ? "h-12 w-12" : "h-8 w-8";
  const textSize = size === "md" ? "text-xs" : "text-[10px]";
  const borderStyle =
    data.brandColor && !data.logoUrl
      ? ({
          borderColor: data.brandColor,
          color: data.brandColor,
        } as const)
      : undefined;

  return (
    <div
      className={[
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-primary-accent bg-card shadow-sm",
        dim,
        data.logoUrl ? "p-1.5" : `${textSize} font-bold text-primary-accent`,
      ].join(" ")}
      style={borderStyle}
    >
      {data.logoUrl ? (
        <img
          src={data.logoUrl}
          alt={`${data.company} logo`}
          className="h-full w-full object-contain"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span aria-hidden>{chipLabel(data)}</span>
      )}
    </div>
  );
}

function Node({
  data,
  variant,
  showTopExtension = false,
}: {
  data: WorkTimelineEntry["data"];
  variant: "default" | "home";
  showTopExtension?: boolean;
}) {
  return (
    <div className={["relative z-10 flex justify-center", variant === "home" ? "pt-3" : "pt-2"].join(" ")}>
      <div className="relative flex items-center justify-center">
        {showTopExtension ? (
          <>
            <span
              className={[
                "absolute bottom-full left-1/2 -translate-x-1/2 rounded-full bg-primary-accent/45",
                variant === "home" ? "h-5 w-[2px]" : "h-4 w-[2px]",
              ].join(" ")}
              aria-hidden
            />
            <span
              className={[
                "absolute left-1/2 -translate-x-1/2 rounded-full bg-primary-accent/55",
                variant === "home" ? "bottom-[calc(100%+1.1rem)] h-2.5 w-2.5" : "bottom-[calc(100%+0.9rem)] h-2 w-2",
              ].join(" ")}
              aria-hidden
            />
          </>
        ) : null}

        <div
          className={[
            "timeline-node-shell flex items-center justify-center rounded-full bg-background",
            data.current ? "timeline-node-shell--current" : "",
            variant === "home" ? "h-16 w-16" : "h-14 w-14",
          ].join(" ")}
        >
          <TimelineLogo data={data} size="md" />
        </div>
      </div>
    </div>
  );
}

function MetaBlock({
  data,
  align,
  variant,
}: {
  data: WorkTimelineEntry["data"];
  align: "left" | "right";
  variant: "default" | "home";
}) {
  return (
    <div
      className={[
        "flex",
        variant === "home" ? "pt-3" : "pt-2",
        align === "right" ? "justify-end pr-5 md:pr-7" : "justify-start pl-5 md:pl-7",
      ].join(" ")}
    >
      <div
        className={[
          "flex w-full flex-col gap-1",
          variant === "home" ? "max-w-[13rem]" : "max-w-[11.5rem]",
          align === "right" ? "items-end text-right" : "items-start text-left",
        ].join(" ")}
      >
        <p
          className={[
            "font-mono font-semibold uppercase tracking-[0.14em] text-primary-accent",
            variant === "home" ? "text-[13px]" : "text-[10px]",
          ].join(" ")}
        >
          {periodLabel(data)}
        </p>
        {data.location ? (
          <p className={variant === "home" ? "text-[1.05rem] text-text-muted" : "text-xs text-text-muted"}>
            {data.location}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function TimelineConnector({
  pointer,
}: {
  pointer: "start" | "end" | "none";
}) {
  if (pointer === "none") return null;

  return (
    <span
      className={pointer === "start" ? "experience-card-pointer hidden md:block" : "experience-card-pointer-end hidden md:block"}
      aria-hidden
    />
  );
}

function TimelineCard({
  data,
  expanded,
  onToggleReadMore,
  pointer,
  variant,
}: {
  data: WorkTimelineEntry["data"];
  expanded: boolean;
  onToggleReadMore: () => void;
  pointer: "start" | "end" | "none";
  variant: "default" | "home";
}) {
  return (
    <article
      className={[
        "theme-panel theme-panel-hover relative min-w-0 overflow-visible",
        variant === "home" ? "rounded-[1.5rem] p-5 md:p-5" : "rounded-2xl p-4",
      ].join(" ")}
    >
      <TimelineConnector pointer={pointer} />

      <div className="flex flex-col gap-2">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-accent">
          {data.company}
        </p>
        <h3
          className={
            variant === "home"
              ? "max-w-[26ch] text-xl font-semibold leading-tight text-text-primary md:text-[1.6rem]"
              : "max-w-[24ch] text-base font-semibold leading-tight text-text-primary md:text-lg"
          }
        >
          {data.role}
        </h3>
      </div>

      {data.coverImage ? (
        <div
          className={[
            data.coverImageLayout === "centered" ? "min-w-0 max-w-full overflow-hidden bg-muted/30" : "overflow-hidden bg-muted/30",
            data.coverImageLayout === "centered"
              ? [
                  "mt-4 grid w-full place-items-center",
                  variant === "home"
                    ? "px-4 py-8 -mx-5 rounded-[1.25rem] border border-border/80 md:px-6 md:py-10"
                    : "rounded-xl border border-border px-4 py-6 md:px-6 md:py-8",
                ].join(" ")
              : variant === "home"
                ? "mt-4 -mx-5 rounded-[1.25rem] border border-border/80"
                : "mt-4 rounded-xl border border-border",
          ].join(" ")}
        >
          <img
            src={data.coverImage}
            alt=""
            className={
              data.coverImageLayout === "centered"
                ? [
                    "block h-auto min-h-0 w-auto min-w-0 object-contain object-center mx-auto",
                    variant === "home"
                      ? "max-h-40 max-w-[min(100%,26rem)] sm:max-h-44"
                      : "max-h-32 max-w-[min(100%,18rem)] sm:max-h-36",
                  ].join(" ")
                : variant === "home"
                  ? "block w-full h-auto object-contain object-center"
                  : "h-40 w-full object-cover object-center md:h-48"
            }
            loading="lazy"
          />
        </div>
      ) : null}

      <p
        className={
          variant === "home"
            ? "mt-4 max-w-[60ch] text-[0.98rem] leading-relaxed text-text-secondary"
            : "mt-4 max-w-[58ch] text-sm leading-relaxed text-text-secondary"
        }
      >
        {data.description}
      </p>

      {data.achievements.length ? (
        <div className="mt-5">
          {expanded ? (
            <ul
              className={
                variant === "home" ? "space-y-3 border-t border-border/80 pt-5" : "space-y-2 border-t border-border/80 pt-4"
              }
            >
              {data.achievements.map((line, i) => (
                <li key={i} className={variant === "home" ? "flex gap-3 text-base text-text-secondary" : "flex gap-2 text-sm text-text-secondary"}>
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <button
            type="button"
            onClick={onToggleReadMore}
            className={
              variant === "home"
                ? "mt-4 inline-flex text-sm font-semibold uppercase tracking-[0.12em] text-primary-accent transition-opacity duration-300 hover:opacity-80"
                : "mt-3 inline-flex text-xs font-semibold uppercase tracking-[0.12em] text-primary-accent transition-opacity duration-300 hover:opacity-80"
            }
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        </div>
      ) : null}
    </article>
  );
}

export function WorkExperienceTimeline({ entries, variant = "default" }: WorkExperienceTimelineProps) {
  const sorted = useMemo(
    () => [...entries].sort((a, b) => a.data.order - b.data.order),
    [entries],
  );

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!sorted.length) return null;

  return (
    <div className="work-experience-chain">
      {/* Desktop: continuous rail + alternating rows */}
      <div className="relative hidden md:block">
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 top-0 z-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-primary-accent/15 via-primary-accent/45 to-primary-accent/15"
          aria-hidden
        />
        <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 z-0 w-8 -translate-x-1/2 bg-gradient-to-b from-transparent via-primary-accent/[0.06] to-transparent blur-2xl" aria-hidden />
        <div className={["relative z-10 flex flex-col", variant === "home" ? "gap-12 lg:gap-14" : "gap-10 lg:gap-12"].join(" ")}>
          {sorted.map((entry, i) => {
            const cardOnRight = i % 2 === 0;
            const { data } = entry;
            const isOpen = !!expanded[entry.id];

            return (
              <div
                key={entry.id}
                className={[
                  "grid min-w-0 grid-cols-1 md:items-start",
                  variant === "home"
                    ? "md:grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)]"
                    : "md:grid-cols-[minmax(0,1fr)_4.5rem_minmax(0,1fr)]",
                ].join(" ")}
              >
                {cardOnRight ? (
                  <>
                    <MetaBlock data={data} align="right" variant={variant} />
                    <Node
                      data={data}
                      variant={variant}
                      showTopExtension={i === 0}
                    />
                    <div className={variant === "home" ? "flex min-w-0 justify-start pl-5 md:pl-6" : "flex min-w-0 justify-start pl-4 md:pl-6"}>
                      <div className="w-full min-w-0 max-w-[36rem]">
                        <TimelineCard
                          data={data}
                          expanded={isOpen}
                          onToggleReadMore={() => toggle(entry.id)}
                          pointer="start"
                          variant={variant}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={variant === "home" ? "flex min-w-0 justify-end pr-5 md:pr-6" : "flex min-w-0 justify-end pr-4 md:pr-6"}>
                      <div className="w-full min-w-0 max-w-[36rem]">
                        <TimelineCard
                          data={data}
                          expanded={isOpen}
                          onToggleReadMore={() => toggle(entry.id)}
                          pointer="end"
                          variant={variant}
                        />
                      </div>
                    </div>
                    <Node
                      data={data}
                      variant={variant}
                      showTopExtension={i === 0}
                    />
                    <MetaBlock data={data} align="left" variant={variant} />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: left spine + stacked cards */}
      <div className="relative space-y-10 pl-6 md:hidden">
        <div className="absolute bottom-2 left-[0.6rem] top-2 w-[2px] bg-gradient-to-b from-primary-accent/15 via-primary-accent/45 to-primary-accent/15" aria-hidden />
        <div className="flex flex-col gap-10">
          {sorted.map((entry) => {
            const { data } = entry;
            const isOpen = !!expanded[entry.id];
            return (
              <div key={entry.id} className="relative min-w-0">
                <div
                  className={[
                    "timeline-node-shell absolute -left-6 top-5 z-10 -translate-x-1/2 rounded-full bg-background p-1.5",
                    data.current ? "timeline-node-shell--current" : "",
                  ].join(" ")}
                >
                  <TimelineLogo data={data} size="sm" />
                </div>
                <TimelineCard
                  data={data}
                  expanded={isOpen}
                  onToggleReadMore={() => toggle(entry.id)}
                  pointer="none"
                  variant={variant}
                />
                <div className="mt-3 border-t border-border/80 pt-3">
                  <div className="flex w-full max-w-[13rem] flex-col gap-1">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-accent">
                      {periodLabel(data)}
                    </p>
                    {data.location ? <p className="text-xs text-text-muted">{data.location}</p> : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
