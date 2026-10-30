import Image from "next/image";
import type { PropsWithChildren, ReactNode } from "react";

type CardProps = PropsWithChildren<{
  imageSrc?: string;
  imageAlt?: string;
  title: ReactNode;
  metadata?: ReactNode;
  action?: ReactNode;
  className?: string;
  variant?: "default" | "compact";
  topAccentClassName?: string;
}>;

export function Card({
  imageSrc,
  imageAlt = "",
  title,
  metadata,
  action,
  className = "",
  variant = "default",
  topAccentClassName,
  children,
}: CardProps) {
  if (variant === "compact") {
    return (
      <article
        className={[
          "group w-full overflow-hidden rounded-2xl border border-white/10 bg-[#1d1d1d] shadow-[0_18px_38px_rgba(0,0,0,0.45)]",
          className,
        ].join(" ")}
      >
        {topAccentClassName ? (
          <div
            className={[
              "h-1.5 w-full bg-gradient-to-r",
              topAccentClassName,
            ].join(" ")}
          />
        ) : null}

        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              {metadata ? <div>{metadata}</div> : null}

              <h3 className="line-clamp-2 text-xl font-semibold tracking-tight text-white">
                {title}
              </h3>
            </div>

            {imageSrc ? (
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="64px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ) : null}
          </div>

          {children ? (
            <div className="flex flex-col gap-4 text-sm text-zinc-300">
              {children}
            </div>
          ) : null}

          {action ? <div>{action}</div> : null}
        </div>
      </article>
    );
  }

  return (
    <article
      className={[
        "group w-full overflow-hidden rounded-xl border border-white/10 bg-[#1d1d1d] shadow-[0_18px_38px_rgba(0,0,0,0.45)]",
        className,
      ].join(" ")}
    >
      {imageSrc ? (
        <div className="relative h-44 overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1d1d1d] via-transparent to-transparent" />
        </div>
      ) : null}

      <div className="space-y-4 p-4">
        {metadata ? <div>{metadata}</div> : null}

        <div className="space-y-2">
          <h3 className="text-xl font-semibold tracking-tight text-white">
            {title}
          </h3>
          {children ? <div className="text-sm text-zinc-300">{children}</div> : null}
        </div>

        {action ? <div className="pt-1">{action}</div> : null}
      </div>
    </article>
  );
}
