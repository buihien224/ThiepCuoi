import { Lich, ngay } from "@/components/lich";
import { wedding } from "@/content/wedding";

// Save The Date: giờ, thứ, ngày dương lịch, ngày âm lịch trong ngoặc (nhãn viết sẵn trong cấu hình)
// và tờ lịch tháng cưới khoanh trái tim.
export function SaveTheDate() {
  return (
    <section aria-labelledby="save-the-date" className="mx-auto w-full max-w-md bg-cream px-6 py-16 text-center text-ink">
      <h2 id="save-the-date" className="font-script text-5xl leading-normal text-gold">
        Save The Date
      </h2>
      <p className="mt-4 text-xs tracking-[0.3em] text-ink/70 uppercase">
        {wedding.timeLabel} · {wedding.weekdayLabel}
      </p>
      <p className="mt-2 font-heading text-4xl tracking-wide tabular-nums">{ngay}</p>
      <p className="mt-2 font-heading text-base text-balance text-gold italic">({wedding.lunarLabel})</p>

      <div className="mt-8 border-y border-gold-soft py-6">
        <div className="mx-auto max-w-xs @container">
          <Lich />
        </div>
      </div>
    </section>
  );
}
