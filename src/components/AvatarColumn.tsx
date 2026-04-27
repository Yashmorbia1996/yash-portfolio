import { MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

export function AvatarColumn() {
  const { name, role, avatar, location } = siteConfig;

  return (
    <div className="hidden w-44 shrink-0 md:block">
      <div className="sticky top-28">
        <img
          src={avatar}
          alt={name}
          className="mb-5 h-32 w-32 rounded-full border border-solid border-border object-cover object-top ring-2 ring-border/60"
        />

        <p className="mb-0.5 text-sm font-semibold text-foreground">{name}</p>
        <p className="mb-5 text-xs text-muted-foreground">{role}</p>

        <div className="mb-5 flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 shrink-0 text-muted-foreground" aria-hidden />
          <span>{location}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-solid border-border px-2.5 py-0.5 text-xs text-body-text">
            English
          </span>
          <span className="rounded-full border border-solid border-primary-accent/35 px-2.5 py-0.5 text-xs text-primary-accent">
            Available
          </span>
        </div>
      </div>
    </div>
  );
}
