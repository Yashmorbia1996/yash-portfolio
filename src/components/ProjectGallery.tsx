import { cn } from "@/lib/utils";

interface GalleryImage {
  src?: string;
  alt: string;
  aspect: "video" | "square" | "tall" | "wide";
}

interface ProjectGalleryProps {
  images?: GalleryImage[];
  className?: string;
}

const placeholderImages: GalleryImage[] = [
  { alt: "CAD render — assembly overview", aspect: "video" },
  { alt: "Thermal management module, exploded view", aspect: "tall" },
  { alt: "Enclosure tooling detail", aspect: "square" },
  { alt: "PCB layout and flex cable routing", aspect: "wide" },
  { alt: "Prototype build — alpha unit", aspect: "tall" },
  { alt: "FEA stress analysis render", aspect: "video" },
  { alt: "Production fixture design", aspect: "square" },
  { alt: "Final assembly — ISO view", aspect: "wide" },
];

const aspectClass: Record<GalleryImage["aspect"], string> = {
  video: "aspect-video",
  square: "aspect-square",
  tall: "aspect-[3/4]",
  wide: "aspect-[5/3]",
};

function GalleryPlaceholder({ src, alt, aspect }: GalleryImage) {
  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden break-inside-avoid mb-4 bg-muted/50 border border-border flex flex-col items-center justify-center gap-2 text-muted-foreground/40",
        aspectClass[aspect]
      )}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
          <p className="text-xs text-center px-4 leading-snug">{alt}</p>
        </>
      )}
    </div>
  );
}

export function ProjectGallery({
  images = placeholderImages,
  className,
}: ProjectGalleryProps) {
  return (
    <div className={cn("columns-1 sm:columns-2 lg:columns-3 gap-4", className)}>
      {images.map((img) => (
        <GalleryPlaceholder key={img.alt} {...img} />
      ))}
    </div>
  );
}
