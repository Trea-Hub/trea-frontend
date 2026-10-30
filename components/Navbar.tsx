import Image from "next/image";

type NavbarProps = {
  title?: string;
};

export function Navbar({ title = "Trea" }: NavbarProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#131313]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-md bg-[#1f1f1f] ring-1 ring-white/10">
            <Image
              src="https://lh3.googleusercontent.com/aida/AEtjO1Ww40inGHjn46emaG6LBQY79iEHtmTgVhg8v6vqY3WwChhc1qPp14wKDGsNMV36DVrsONIOD119spGawqKWRz6G9ezqfkZG9Na8fLhJHqaSuiuFSzehriQ9wfKuc5IdOV51Mp0ySF0_DLf44uYaZhOiHI1wss09H5bmiTM2-_JuRFmEVeA8jEzQiwh8o5Jde_vxkZ_jg8IK7UjiwA612NzvF_fX6VTEXUqhAXocRyRj6AluZQHM18yF0jw"
              alt="Trea logo"
              fill
              sizes="32px"
              unoptimized
              className="object-cover"
            />
          </div>
          <span className="text-xl font-semibold tracking-tight text-[#e5e2e1]">{title}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#2a2a2a] px-3 py-1.5 shadow-[0_0_18px_rgba(255,84,81,0.15)]">
            <span className="h-2 w-2 rounded-full bg-[#ffb3ad] shadow-[0_0_10px_rgba(255,179,173,0.8)]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#d7d2cf]">
              Stellar Mainnet
            </span>
          </div>

          <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full ring-1 ring-white/10">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFuXodJxvy-va-78PTdiU8ZhKQdHyJwQNqNFdepsOWnUrq659A3aTmf7VBKewRz1Tv6NauE_5vI8gnVfo7SP3O_hkMHlTTrXnfSBuJcS6CoLuhoLo3043VL5ngYQ92abrNW0b_0lKFuIRAJmI3WdBX3fm3vNsEpfMcQmm0A8-1iaJZ9MG-_siQsr6lnhHu3QoLo8urCkVnNInmNoEj4cEtpxrHwmgrhw4RZrejct814COaDYLwlHix"
              alt="Profile"
              fill
              sizes="36px"
              className="object-cover"
            />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#131313] bg-[#ff5c5c]" />
          </div>
        </div>
      </div>
    </header>
  );
}
