import { wedding } from "@/content/wedding";

// Interview kiểu tạp chí: mỗi câu hỏi đánh số, câu trả lời bên dưới. Render thẳng từ mảng `wedding.interview`,
// nên thêm, bớt hay sửa câu hỏi chỉ cần sửa file cấu hình.
export function Interview() {
  return (
    <section aria-labelledby="interview" className="mx-auto w-full max-w-md bg-cream px-6 py-16 text-ink">
      <div className="flex items-baseline justify-between border-b border-gold pb-3">
        <h2 id="interview" className="font-heading text-5xl leading-tight font-bold tracking-tight text-gold italic">
          Interview
        </h2>
        <span className="text-[0.65rem] tracking-[0.3em] text-ink/45 uppercase">Hỏi &amp; đáp</span>
      </div>
      <p className="mt-3 font-script text-2xl leading-normal text-gold">Câu chuyện của chúng mình</p>

      <ol className="mt-8 flex flex-col gap-8">
        {wedding.interview.map(({ q, a }, i) => (
          <li key={q} className="grid grid-cols-[auto_1fr] gap-x-4 border-t border-gold-soft/60 pt-5">
            <span aria-hidden className="font-heading text-2xl leading-none text-gold-soft tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-heading text-lg leading-snug text-balance italic">{q}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-pretty text-ink/80">{a}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
