import { wedding } from "@/content/wedding";

type Family = (typeof wedding.families)[keyof typeof wedding.families];

// Bìa kiểu tạp chí: tiêu đề vàng lớn, tên đôi uyên ương, bố mẹ và địa chỉ hai nhà.
export function Hero() {
  const { coverTitle, groom, bride, families } = wedding;

  return (
    <header className="mx-auto flex min-h-svh w-full max-w-md flex-col items-center justify-between gap-10 bg-cream px-6 py-12 text-center text-ink">
      <h1 className="font-heading text-6xl leading-[0.95] font-bold tracking-tight text-gold">
        {coverTitle}
      </h1>

      <div className="flex flex-col items-center gap-2 font-script text-gold">
        <p className="text-4xl">{groom.fullName}</p>
        <p className="text-3xl text-gold-soft" aria-hidden>
          &amp;
        </p>
        <p className="text-4xl">{bride.fullName}</p>
      </div>

      <div className="grid w-full grid-cols-2 gap-6 border-t border-gold-soft pt-6 text-sm">
        <FamilyBlock family={families.groom} />
        <FamilyBlock family={families.bride} />
      </div>
    </header>
  );
}

function FamilyBlock({ family }: { family: Family }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-heading text-xs tracking-[0.2em] text-gold uppercase">{family.label}</p>
      <p>{family.father}</p>
      <p>{family.mother}</p>
      <p className="text-ink/70 italic">{family.address}</p>
    </div>
  );
}
