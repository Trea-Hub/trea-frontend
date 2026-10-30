import Image from "next/image";

const footerLinks = [
  { label: "Discover", href: "#" },
  { label: "Organizers", href: "#" },
  { label: "Wallet", href: "#" },
  { label: "Support", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-md bg-[#1d1d1d] ring-1 ring-white/10">
              <Image
                src="https://lh3.googleusercontent.com/aida/AEtjO1Ww40inGHjn46emaG6LBQY79iEHtmTgVhg8v6vqY3WwChhc1qPp14wKDGsNMV36DVrsONIOD119spGawqKWRz6G9ezqfkZG9Na8fLhJHqaSuiuFSzehriQ9wfKuc5IdOV51Mp0ySF0_DLf44uYaZhOiHI1wss09H5bmiTM2-_JuRFmEVeA8jEzQiwh8o5Jde_vxkZ_jg8IK7UjiwA612NzvF_fX6VTEXUqhAXocRyRj6AluZQHM18yF0jw"
                alt="Trea logo"
                fill
                sizes="32px"
                unoptimized
                className="object-cover"
              />
            </div>
            <span className="text-lg font-semibold tracking-tight text-[#e5e2e1]">Trea</span>
          </div>
          <p className="mt-3 max-w-md text-sm text-[#a7a0a0]">
            Discover on-chain experiences, claim verified access, and manage your entry passes.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-5 text-sm text-[#d7d2cf]">
          {footerLinks.map((link) => (
            <a key={link.label} href={link.href} className="transition hover:text-[#ffb3ad]">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
