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
    brandInitial?: string;
    brandColor?: string;
  };
}

interface WorkExperienceTimelineProps {
  entries: WorkTimelineEntry[];
}

function periodLabel(data: WorkTimelineEntry["data"]) {
  return data.current ? `${data.startDate} — Present` : `${data.startDate} — ${data.endDate ?? ""}`.trim();
}

function chipLabel(data: WorkTimelineEntry["data"]) {
  const raw = (data.brandInitial ?? data.company).trim();
  return raw.length <= 2
    ? raw.toUpperCase()
    : raw.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase() || raw.slice(0, 2).toUpperCase();
}

function Node({ data }: { data: WorkTimelineEntry["data"] }) {
  return (
    <div className="relative z-10 flex justify-center pt-2">
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-primary-accent bg-card text-xs font-bold text-primary-accent shadow-sm"
        style={
          data.brandColor
            ? {
                borderColor: data.brandColor,
                color: data.brandColor,
              }
            : undefined
        }
      >
        {chipLabel(data)}
      </div>
    </div>
  );
}

function MetaBlock({
  data,
  align,
}: {
  data: WorkTimelineEntry["data"];
  align: "left" | "right";
}) {
  return (
    <div
      className={[
        "flex flex-col gap-2 pt-2",
        align === "right" ? "items-end text-right pr-4 md:pr-6" : "items-start text-left pl-4 md:pl-6",
      ].join(" ")}
    >
      <p
        className={[
          "text-sm font-semibold text-primary-accent",
          data.current ? "rounded-lg border border-primary-accent/35 bg-primary-accent/10 px-3 py-2" : "",
        ].join(" ")}
      >
        {periodLabel(data)}
      </p>
      {data.location ? <p className="text-xs text-muted-foreground">{data.location}</p> : null}
    </div>
  );
}

export function WorkExperienceTimeline({ entries }: WorkExperienceTimelineProps) {
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
          className="pointer-events-none absolute top-0 bottom-0 left-1/2 z-0 w-px -translate-x-1/2 bg-border"
          aria-hidden
        />
        <div className="relative z-10 flex flex-col gap-12 lg:gap-16">
          {sorted.map((entry, i) => {
            const cardOnRight = i % 2 === 0;
            const { data } = entry;
            const isOpen = !!expanded[entry.id];

            return (
              <div
                key={entry.id}
                className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_2.75rem_minmax(0,1fr)] md:items-start md:gap-0"
              >
                {cardOnRight ? (
                  <>
                    <MetaBlock data={data} align="right" />
                    <Node data={data} />
                    <div className="pl-4 md:pl-6">
                      <TimelineCard
                        data={data}
                        expanded={isOpen}
                        onToggleReadMore={() => toggle(entry.id)}
                        pointer="start"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="pr-4 md:pr-6">
                      <TimelineCard
                        data={data}
                        expanded={isOpen}
                        onToggleReadMore={() => toggle(entry.id)}
                        pointer="end"
                      />
                    </div>
                    <Node data={data} />
                    <MetaBlock data={data} align="left" />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: left spine + stacked cards */}
      <div className="relative space-y-10 pl-6 md:hidden">
        <div className="absolute top-2 bottom-2 left-[0.6rem] w-px bg-border" aria-hidden />
        <div className="flex flex-col gap-10">
          {sorted.map((entry) => {
            const { data } = entry;
            const isOpen = !!expanded[entry.id];
            return (
              <div key={entry.id} className="relative">
                <div className="absolute -left-6 top-6 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary-accent bg-card text-[10px] font-bold text-primary-accent shadow-sm">
                  {chipLabel(data)}
                </div>
                <TimelineCard
                  data={data}
                  expanded={isOpen}
                  onToggleReadMore={() => toggle(entry.id)}
                  pointer="none"
                />
                <div className="mt-3 flex flex-col gap-1 border-t border-border pt-3">
                  <p
                    className={[
                      "text-sm font-semibold text-primary-accent",
                      data.current ? "w-fit rounded-md border border-primary-accent/35 bg-primary-accent/10 px-2 py-1" : "",
                    ].join(" ")}
                  >
                    {periodLabel(data)}
                  </p>
                  {data.location ? (
                    <p className="text-xs text-muted-foreground">{data.location}</p>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TimelineCard({
  data,
  expanded,
  onToggleReadMore,
  pointer,
}: {
  data: WorkTimelineEntry["data"];
  expanded: boolean;
  onToggleReadMore: () => void;
  pointer: "start" | "end" | "none";
}) {
  return (
    <article className="relative overflow-visible rounded-2xl border border-solid border-primary-accent/25 bg-card p-4 shadow-sm transition-shadow duration-300 hover:shadow-md">
      {pointer === "start" ? (
        <span className="experience-card-pointer hidden md:block" aria-hidden />
      ) : null}
      {pointer === "end" ? (
        <span className="experience-card-pointer-end hidden md:block" aria-hidden />
      ) : null}

      <h3 className="text-base font-semibold text-primary-accent md:text-lg">
        {data.company} — {data.role}
      </h3>

      {data.coverImage ? (
        <div className="mt-4 overflow-hidden rounded-xl border border-border bg-muted/30">
          <img
            src={data.coverImage}
            alt=""
            className="h-40 w-full object-cover object-center md:h-48"
            loading="lazy"
          />
        </div>
      ) : null}

      <p className="mt-4 text-sm leading-relaxed text-body-text">{data.description}</p>

      {data.achievements.length ? (
        <div className="mt-4">
          {expanded ? (
            <ul className="space-y-2 border-t border-border pt-4">
              {data.achievements.map((line, i) => (
                <li key={i} className="flex gap-2 text-sm text-body-text">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <button
            type="button"
            onClick={onToggleReadMore}
            className="mt-3 text-sm font-semibold text-primary-accent transition-opacity duration-300 hover:opacity-80"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        </div>
      ) : null}
    </article>
  );
}
