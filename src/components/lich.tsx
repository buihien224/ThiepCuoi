import { wedding } from "@/content/wedding";
import { cn } from "@/lib/utils";

// Tờ lịch tháng cưới, ngày cưới khoanh trái tim. Dùng chung cho Thiệp, Lòng thiệp và Save The Date.
// Cỡ chữ tính theo `cqw`, nên phải đặt trong một khung `@container`.

const [year, month, day] = wedding.date.slice(0, 10).split("-");
export const ngay = `${day}.${month}.${year}`;

const ngayCuoi = Number(day);
const soNgay = new Date(Number(year), Number(month), 0).getDate();
const oTrong = (new Date(Number(year), Number(month) - 1, 1).getDay() + 6) % 7; // Lịch bắt đầu từ thứ Hai.
const THU = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

export function Heart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.2 0 3.6 1.3 5.3 3.3 1.7-2 3.1-3.3 5.3-3.3 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"
        fill="currentColor"
      />
    </svg>
  );
}

// `compact` cho mặt Thiệp ngang, nơi lịch chỉ chiếm nửa bề rộng.
export function Lich({ compact }: { compact?: boolean }) {
  return (
    <div className="w-full" aria-label={`Lịch tháng ${Number(month)} năm ${year}, ngày cưới ${ngay}`} role="img">
      <p className={cn("font-heading tracking-wider", compact ? "mb-[1cqw] text-[3.4cqw]" : "mb-[2cqw] text-[4.6cqw]")}>
        Tháng {Number(month)} · {year}
      </p>
      <div
        className={cn(
          "grid grid-cols-7",
          compact ? "gap-y-[0.4cqw] text-[2.4cqw] leading-[1.5]" : "gap-y-[1.5cqw] text-[3.2cqw]",
        )}
      >
        {THU.map((t) => (
          <span key={t} className={cn("tracking-wider text-ink/45", compact ? "text-[1.8cqw]" : "text-[2.4cqw]")}>
            {t}
          </span>
        ))}
        {Array.from({ length: oTrong }, (_, i) => (
          <span key={`o${i}`} />
        ))}
        {Array.from({ length: soNgay }, (_, i) => i + 1).map((d) => (
          <span
            key={d}
            className={cn(
              "relative grid place-items-center",
              !compact && "aspect-square",
              d === ngayCuoi ? "font-semibold text-cream" : "text-ink/80",
            )}
          >
            {d === ngayCuoi && (
              <Heart
                className={cn(
                  "absolute top-1/2 left-1/2 -translate-1/2 text-gold",
                  compact ? "size-[5.4cqw]" : "size-[7.5cqw]",
                )}
              />
            )}
            <span className="relative">{d}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
