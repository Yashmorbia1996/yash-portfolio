import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const COPY_RESET_MS = 2000;

type CopyEmailProps = {
  email: string;
  className?: string;
  /** Hero sidebar: align icon with first line. Footer: omit / false for centered rows. */
  iconAlignStart?: boolean;
  /** Hero uses accent on the mail icon; footer uses inherited/muted. */
  mailIconClassName?: string;
};

export function CopyEmail({
  email,
  className,
  iconAlignStart = true,
  mailIconClassName = "text-primary-accent",
}: CopyEmailProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => () => clearTimer(), [clearTimer]);

  const handleClick = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimer();
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null;
      }, COPY_RESET_MS);
    } catch {
      // Clipboard may be denied; leave UI unchanged
    }
  }, [email, clearTimer]);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={copied ? "Email copied to clipboard" : `Copy ${email} to clipboard`}
      className={cn(
        "flex items-start gap-2 text-left text-sm transition-colors duration-200",
        "cursor-pointer",
        "text-text-muted hover:text-text-primary",
        "dark:text-gray-400 dark:hover:text-white",
        copied &&
          "text-emerald-600 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300",
        className
      )}
    >
      {copied ? (
        <Check
          className={cn(
            "h-4 w-4 shrink-0",
            iconAlignStart && "mt-0.5",
            "text-emerald-600 dark:text-emerald-400"
          )}
          strokeWidth={2.5}
          aria-hidden
        />
      ) : (
        <Mail
          className={cn(
            "h-4 w-4 shrink-0",
            iconAlignStart && "mt-0.5",
            mailIconClassName
          )}
          aria-hidden
        />
      )}
      <span className="min-w-0 break-all">
        {copied ? "Copied to clipboard!" : email}
      </span>
    </button>
  );
}
