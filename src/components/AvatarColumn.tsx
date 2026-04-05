import { MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

export function AvatarColumn() {
  const { name, role, avatar, location } = siteConfig;

  return (
    <div className="hidden md:block w-44 shrink-0">
      <div className="sticky top-28">
        {/* Avatar */}
        <img
          src={avatar}
          alt={name}
          className="rounded-full w-32 h-32 object-cover mb-5 ring-2 ring-white/10"
        />

        <p className="text-sm font-semibold text-slate-100 mb-0.5">{name}</p>
        <p className="text-xs text-slate-500 mb-5">{role}</p>

        {/* Location / timezone indicator */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-5">
          <MapPin className="h-3 w-3 shrink-0 text-slate-600" />
          <span>{location}</span>
        </div>

        {/* Status pills */}
        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-full text-xs px-2.5 py-0.5 border border-slate-700/60 text-slate-400">
            English
          </span>
          <span className="rounded-full text-xs px-2.5 py-0.5 border border-cyan-500/40 text-cyan-400">
            Available
          </span>
        </div>
      </div>
    </div>
  );
}
