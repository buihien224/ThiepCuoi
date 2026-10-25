import { wedding } from "@/content/wedding";

// Lời mời: dòng "TRÂN TRỌNG KÍNH MỜI" và đoạn văn ấm áp, chữ đầu đoạn kiểu tạp chí (drop cap).
export function LoiMoi() {
  const { heading, body } = wedding.invitation;

  return (
    <section aria-labelledby="loi-moi" className="mx-auto w-full max-w-md bg-cream px-6 py-16 text-ink">
      <p className="text-center text-[0.65rem] tracking-[0.3em] text-ink/45 uppercase">Lời mời</p>
      <h2
        id="loi-moi"
        className="mt-3 text-center font-heading text-base leading-relaxed tracking-[0.3em] text-balance text-gold uppercase"
      >
        {heading}
      </h2>
      <div aria-hidden className="mx-auto mt-5 mb-8 h-px w-16 bg-gold-soft" />
      <p className="text-[0.95rem] leading-relaxed text-pretty first-letter:float-left first-letter:mt-1 first-letter:mr-2 first-letter:font-heading first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-gold">
        {body}
      </p>
    </section>
  );
}
