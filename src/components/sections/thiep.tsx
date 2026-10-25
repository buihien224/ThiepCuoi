"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { wedding } from "@/content/wedding";
import { cn } from "@/lib/utils";

// Tấm Thiệp "Song hỷ + Lịch": chữ 囍 trong vòng tròn, tên Chú rể / Cô dâu, tờ lịch khoanh trái tim ngày cưới.
// Có hai mặt: `ThiepNgang` nằm trong Phong bì, `LongThiep` là phần đầu tiên của trang sau khi Mở thiệp.
// Cỡ chữ tính theo `cqw` của khung chứa, nên mỗi mặt tự co giãn theo bề rộng của nó.

const HAN = "'Noto Serif SC','Songti SC','Noto Serif CJK SC',serif";

const [year, month, day] = wedding.date.slice(0, 10).split("-");
const ngay = `${day}.${month}.${year}`;
const noiToChuc = `${wedding.venue.name} · ${wedding.venue.hall}`;

const ngayCuoi = Number(day);
const soNgay = new Date(Number(year), Number(month), 0).getDate();
const oTrong = (new Date(Number(year), Number(month) - 1, 1).getDay() + 6) % 7; // Lịch bắt đầu từ thứ Hai.
const THU = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

function Heart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.2 0 3.6 1.3 5.3 3.3 1.7-2 3.1-3.3 5.3-3.3 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"
        fill="currentColor"
      />
    </svg>
  );
}

// Tờ lịch tháng cưới. `compact` cho mặt Thiệp ngang, nơi lịch chỉ chiếm nửa bề rộng.
function Lich({ compact }: { compact?: boolean }) {
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

function SongHy({ className }: { className: string }) {
  return (
    <div
      aria-hidden
      className={cn("grid place-items-center rounded-full border border-gold leading-none text-gold", className)}
      style={{ fontFamily: HAN }}
    >
      <span className="-mt-[0.05em]">囍</span>
    </div>
  );
}

function GoldBands({ thickness }: { thickness: string }) {
  return (
    <>
      <div aria-hidden className={cn("pointer-events-none absolute inset-x-0 top-0 bg-gold-soft", thickness)} />
      <div aria-hidden className={cn("pointer-events-none absolute inset-x-0 bottom-0 bg-gold-soft", thickness)} />
    </>
  );
}

// Mặt Thiệp nằm ngang để vừa Phong bì ngang: bên trái 囍 và tên, bên phải tờ lịch.
export function ThiepNgang() {
  return (
    <div className="relative grid size-full grid-cols-[1fr_auto_1.15fr] items-center gap-[4cqw] bg-cream px-[6cqw] py-[4cqw] text-center text-ink">
      <GoldBands thickness="h-[1.2cqw]" />
      <div className="flex flex-col items-center gap-[1.6cqw]">
        <p className="text-[2cqw] tracking-[0.35em] text-ink/70 uppercase">Lễ thành hôn</p>
        <SongHy className="size-[12cqw] text-[6.8cqw]" />
        <span className="font-heading text-[4.6cqw] leading-tight">{wedding.groom.shortName}</span>
        <span className="font-script text-[3.6cqw] leading-none text-gold">&amp;</span>
        <span className="font-heading text-[4.6cqw] leading-tight">{wedding.bride.shortName}</span>
        <p className="text-[2cqw] tracking-[0.2em] text-ink/70 uppercase">
          {wedding.timeLabel} · {ngay}
        </p>
      </div>
      <span aria-hidden className="h-[70%] w-px bg-gold-soft" />
      <div>
        <Lich compact />
        <p className="mt-[1.4cqw] font-heading text-[2.6cqw]">{noiToChuc}</p>
      </div>
    </div>
  );
}

// Lòng thiệp: cùng tấm Thiệp, dựng dọc cả màn hình, có lời mời và địa chỉ. Ngay trên Hero.
export function LongThiep() {
  return (
    <section aria-label="Lòng thiệp" className="relative flex min-h-svh justify-center bg-cream">
      <div className="flex w-full max-w-[420px] @container">
        <div className="relative flex min-h-svh w-full flex-col items-center justify-center gap-[5cqw] px-[9cqw] py-[18cqw] text-center text-ink">
          <GoldBands thickness="h-[1.6cqw]" />
          <h2 className="text-[2.6cqw] tracking-[0.35em] text-ink/70 uppercase">{wedding.invitation.heading}</h2>
          <SongHy className="size-[17cqw] text-[9.5cqw]" />
          <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-[2cqw]">
            <Ten vaiTro="Chú rể" ten={wedding.groom.shortName} />
            <span aria-hidden className="h-[11cqw] w-px bg-gold-soft" />
            <Ten vaiTro="Cô dâu" ten={wedding.bride.shortName} />
          </div>
          <Lich />
          <div className="flex flex-col items-center gap-[0.8cqw]">
            <p className="text-[2.8cqw] tracking-[0.2em] text-ink/70 uppercase">
              {wedding.weekdayLabel} · {ngay} · {wedding.timeLabel}
            </p>
            <p className="font-heading text-[3.6cqw] text-balance text-gold italic">{wedding.lunarLabel}</p>
            <p className="font-heading text-[3.8cqw]">{noiToChuc}</p>
            <p className="max-w-[70cqw] text-[3.4cqw] text-ink/55">{wedding.venue.address}</p>
          </div>
        </div>
      </div>
      <CuonXuong />
    </section>
  );
}

function Ten({ vaiTro, ten }: { vaiTro: string; ten: string }) {
  return (
    <div className="flex flex-col gap-[0.6cqw]">
      <span className="text-[2.4cqw] tracking-[0.3em] text-ink/55 uppercase">{vaiTro}</span>
      <span className="font-heading text-[6.2cqw] leading-tight">{ten}</span>
    </div>
  );
}

function CuonXuong() {
  return (
    <a
      href="#hero"
      className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-[0.65rem] tracking-[0.3em] text-ink/45 uppercase"
    >
      cuộn xuống
      <motion.span
        aria-hidden
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="size-4" strokeWidth={1.5} />
      </motion.span>
    </a>
  );
}
