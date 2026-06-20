import SafeImage from "@/components/shared/SafeImage";
import { cn } from "@/lib/utils";
import type { Partner } from "@/data/partners";

interface PartnerLogoCardProps {
  partner: Partner;
  className?: string;
  imageClassName?: string;
  nameClassName?: string;
  sizes?: string;
  showName?: boolean;
}

export function PartnerLogoCard({
  partner,
  className,
  imageClassName,
  nameClassName,
  sizes = "180px",
  showName = true,
}: PartnerLogoCardProps) {
  const cardClasses = cn(
    "group flex h-32 w-44 shrink-0 flex-col items-center justify-center gap-2 rounded-[1.75rem] border border-slate-100 bg-white/90 px-3 py-4 shadow-[0_4px_12px_rgba(0,0,0,0.02)] backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:border-brand-primary/25 hover:bg-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] dark:border-slate-800/80 dark:bg-card/30 dark:hover:border-brand-primary/20 dark:hover:bg-slate-900/60 dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)] md:h-36 md:w-52 md:gap-2.5 md:px-4",
    className
  );

  return (
    <a
      href={partner.website}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClasses}
      title={partner.name}
      aria-label={`Visit ${partner.name} website`}
    >
      <div className="relative flex h-12 w-full shrink-0 items-center justify-center md:h-14">
        <SafeImage
          src={partner.logo}
          alt=""
          width={180}
          height={74}
          className={cn(
            "max-h-10 w-auto object-contain rounded-[10px] opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105 md:max-h-12",
            imageClassName
          )}
          sizes={sizes}
        />
      </div>

      {showName && (
        <span
          className={cn(
            "flex min-h-[2.25rem] w-full items-start justify-center px-1 text-center text-[10px] font-semibold leading-snug tracking-wide text-slate-600 transition-colors duration-300 group-hover:text-brand-primary dark:text-slate-300 dark:group-hover:text-brand-accent md:min-h-[2.5rem] md:text-xs",
            nameClassName
          )}
        >
          {partner.name}
        </span>
      )}
    </a>
  );
}
