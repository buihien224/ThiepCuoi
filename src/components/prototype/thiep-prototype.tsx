"use client";

// PROTOTYPE — vứt đi sau khi chọn xong. Ticket 03 / ADR-0001.
// Đã chốt: cơ chế "Bóc niêm" (dấu nứt, Nắp lật, Thiệp trồi lên) và tấm Thiệp "Song hỷ + Lịch".
// Đã chốt thêm: Phong bì ngang theo ảnh mẫu (bốn tam giác gặp ở tâm, dấu sáp giữa); mẫu Tem thư đổi sang giấy trắng.
// Giờ so các màu/trang trí trên hình dạng mới. Chuyển bằng `?variant=A|B|C|D|E` trên route `/` (chỉ ở dev).
// Các màu Phong bì là hex tạm trong file này; mẫu nào được chọn thì mới thành token trong globals.css.
// Cách mở giống nhau ở mọi mẫu (đã chốt): vuốt lên quá ~30% hoặc vuốt nhanh; chạm/click, Enter/Space/↑, lăn chuột;
// chạm lần nữa khi đang mở thì tua tới cuối. Chỉ phần nhìn là khác nhau.

import { ChevronDown, ChevronUp } from "lucide-react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
  type PanInfo,
} from "motion/react";
import { useId, useRef, useState } from "react";
import { wedding } from "@/content/wedding";
import { cn } from "@/lib/utils";

export type CoverProps = { onOpen: () => void; onDone: () => void };

const OPEN_RATIO = 0.3;
const FLICK_VELOCITY = -600;
const OPEN_SECONDS = 0.7;

// ---------------------------------------------------------------------------
// Cử chỉ Mở thiệp, dùng chung cho cả ba biến thể.

function useMoThiep({ onOpen, onDone }: CoverProps, travel: () => number) {
  const y = useMotionValue(0);
  const reduce = useReducedMotion();
  const phase = useRef<"closed" | "opening" | "open">("closed");
  const anim = useRef<AnimationPlaybackControls | null>(null);
  const [opening, setOpening] = useState(false);

  function done() {
    if (phase.current === "open") return;
    phase.current = "open";
    onDone();
  }

  function open() {
    if (phase.current === "opening") {
      anim.current?.complete();
      return;
    }
    if (phase.current !== "closed") return;
    phase.current = "opening";
    setOpening(true);
    onOpen();
    if (reduce) {
      done();
      return;
    }
    anim.current = animate(y, -travel(), { duration: OPEN_SECONDS, ease: [0.7, 0, 0.3, 1] });
    anim.current.finished.then(done);
  }

  const surface = {
    drag: "y" as const,
    dragConstraints: { top: -10000, bottom: 0 },
    dragElastic: 0.06,
    dragMomentum: false,
    onDragEnd(_: unknown, info: PanInfo) {
      const threshold = Math.min(window.innerHeight * OPEN_RATIO, travel() * 0.5);
      if (info.offset.y < -threshold || info.velocity.y < FLICK_VELOCITY) open();
      else animate(y, 0, { type: "spring", stiffness: 500, damping: 35 });
    },
    onTap: open,
    onKeyDown(e: React.KeyboardEvent) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowUp") {
        e.preventDefault();
        open();
      }
    },
    onWheel(e: React.WheelEvent) {
      if (Math.abs(e.deltaY) > 4) open();
    },
    tabIndex: 0,
    role: "button",
    "aria-label": "Mở thiệp",
  };

  return { y, surface, opening, open };
}

// Lớp phủ trong suốt: Lòng thiệp thật nằm ngay bên dưới trong luồng trang.
function Overlay({ opening, open, children }: { opening: boolean; open: () => void; children: React.ReactNode }) {
  return (
    <motion.section
      data-intro-open
      aria-label="Thiệp cưới"
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      onPointerDown={() => opening && open()}
      className="fixed inset-0 z-50 touch-none overflow-hidden select-none"
    >
      {children}
    </motion.section>
  );
}

// ---------------------------------------------------------------------------
// Dấu niêm phong: sáp dập nổi, vẽ bằng SVG. Màu sáp và hình dập đổi theo Phong bì.

const SEAL_PATH = (() => {
  const n = 36;
  const pts: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const r = 46 + Math.sin(i * 2.3) * 1.8 + Math.cos(i * 5.1) * 1.2;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
})();

type Wax = { hi: string; mid: string; lo: string; mark: React.ReactNode };

function Seal({ wax }: { wax: Wax }) {
  const id = useId();
  return (
    <svg viewBox="0 0 100 100" className="size-full drop-shadow-[0_3px_4px_rgba(40,20,10,0.35)]" aria-hidden>
      <defs>
        <radialGradient id={id} cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor={wax.hi} />
          <stop offset="70%" stopColor={wax.mid} />
          <stop offset="100%" stopColor={wax.lo} />
        </radialGradient>
      </defs>
      <path d={SEAL_PATH} fill={`url(#${id})`} />
      <circle cx="50" cy="50" r="33" fill="none" stroke={wax.lo} strokeOpacity="0.6" strokeWidth="1.6" />
      <circle cx="50.8" cy="50.8" r="33" fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="1" />
      {wax.mark}
    </svg>
  );
}

// Dấu dập nổi: một lớp sáng lệch xuống dưới-phải, một lớp tối nằm trên.
function Emboss({ color, children, family, size }: { color: string; children: string; family: string; size: number }) {
  return (
    <g fontFamily={family} fontSize={size} textAnchor="middle" dominantBaseline="central">
      <text x="50.9" y="51.4" fill="#fff" fillOpacity="0.25">{children}</text>
      <text x="50" y="50.5" fill={color}>{children}</text>
    </g>
  );
}

const HAN = "'Noto Serif SC','Songti SC','Noto Serif CJK SC',serif";
const initials = `${wedding.groom.shortName.split(" ").at(-1)![0]}${wedding.bride.shortName.split(" ").at(-1)![0]}`;

const CRACK = {
  x: [
    "polygon(0 0,52% 0,47% 22%,55% 41%,46% 62%,53% 81%,49% 100%,0 100%)",
    "polygon(52% 0,100% 0,100% 100%,49% 100%,53% 81%,46% 62%,55% 41%,47% 22%)",
  ],
  y: [
    "polygon(0 0,100% 0,100% 49%,80% 53%,61% 46%,40% 55%,21% 47%,0 52%)",
    "polygon(0 52%,21% 47%,40% 55%,61% 46%,80% 53%,100% 49%,100% 100%,0 100%)",
  ],
};

// Dấu tách đôi theo chiều dọc: `split` 0 → liền, 1 → hai nửa văng ra.
function SplitSeal({ split, wax, className }: { split: MotionValue<number>; wax: Wax; className?: string }) {
  const leftX = useTransform(split, [0, 1], [0, -26]);
  const rightX = useTransform(split, [0, 1], [0, 26]);
  const leftR = useTransform(split, [0, 1], [0, -16]);
  const rightR = useTransform(split, [0, 1], [0, 16]);
  return (
    <div className={cn("relative", className)}>
      <motion.div className="absolute inset-0" style={{ clipPath: CRACK.x[0], x: leftX, rotate: leftR }}>
        <Seal wax={wax} />
      </motion.div>
      <motion.div className="absolute inset-0" style={{ clipPath: CRACK.x[1], x: rightX, rotate: rightR }}>
        <Seal wax={wax} />
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mảnh dùng chung.

const [year, month, day] = wedding.date.slice(0, 10).split("-");
const ngay = `${day}.${month}.${year}`;
const noiToChuc = `${wedding.venue.name} · ${wedding.venue.hall}`;

function Breathe({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{ scale: [1, 1.035, 1] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function SwipeHint({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-1 text-xs tracking-[0.2em] text-neutral-400", className)}>
      <motion.span animate={{ y: [0, -6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
        <ChevronUp className="size-4" strokeWidth={1.5} />
      </motion.span>
      Vuốt lên để mở thiệp
    </div>
  );
}

function ScrollHint() {
  return (
    <div className="absolute inset-x-0 bottom-[max(1.5rem,env(safe-area-inset-bottom))] flex flex-col items-center gap-1 text-[0.65rem] tracking-[0.3em] text-neutral-400 uppercase">
      cuộn xuống
      <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
        <ChevronDown className="size-4" strokeWidth={1.5} />
      </motion.span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tấm Thiệp đã chốt: Song hỷ + Lịch. Chữ 囍 trong vòng tròn, hai cột Chú rể / Cô dâu, tờ lịch khoanh trái tim.
// Cỡ chữ tính theo `cqw`, nên cùng một bố cục dùng cho mặt Thiệp và Lòng thiệp (mặt Thiệp phóng ra cả màn hình).

const ngayCuoi = Number(day);
const soNgay = new Date(Number(year), Number(month), 0).getDate();
const oTrong = (new Date(Number(year), Number(month) - 1, 1).getDay() + 6) % 7; // Lịch bắt đầu từ thứ Hai.
const THU = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

function Heart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.2 0 3.6 1.3 5.3 3.3 1.7-2 3.1-3.3 5.3-3.3 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z" fill="currentColor" />
    </svg>
  );
}

function Lich({ page }: { page?: boolean }) {
  return (
    <div className="w-full">
      <p className="mb-[2cqw] font-heading text-[4.6cqw] tracking-wider">
        Tháng {Number(month)} · {year}
      </p>
      <div className={cn("grid grid-cols-7 text-[3.2cqw]", page ? "gap-y-[1.5cqw]" : "gap-y-[0.3cqw]")}>
        {THU.map((t) => (
          <span key={t} className="text-[2.4cqw] tracking-wider text-neutral-400">
            {t}
          </span>
        ))}
        {Array.from({ length: oTrong }, (_, i) => (
          <span key={`o${i}`} />
        ))}
        {Array.from({ length: soNgay }, (_, i) => i + 1).map((d) => (
          <span key={d} className={cn("relative grid place-items-center", page && "aspect-square", d === ngayCuoi ? "font-semibold text-white" : "text-neutral-700")}>
            {d === ngayCuoi && <Heart className="absolute top-1/2 left-1/2 size-[7.5cqw] -translate-1/2 text-gold" />}
            <span className="relative">{d}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function ThiepFace({ page }: { page?: boolean }) {
  return (
    <div className={cn("relative flex size-full flex-col items-center justify-center bg-cream text-center text-neutral-900", page ? "min-h-svh gap-[5cqw] px-[9cqw] py-[18cqw]" : "gap-[2.6cqw] px-[7cqw] py-[6cqw]")}>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[1.6cqw] bg-gold-soft" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.6cqw] bg-gold-soft" />
      <p className="text-[2.6cqw] tracking-[0.35em] text-neutral-600 uppercase">{page ? wedding.invitation.heading : "Lễ thành hôn"}</p>
      <div className="grid size-[17cqw] place-items-center rounded-full border border-gold text-[9.5cqw] leading-none text-gold" style={{ fontFamily: HAN }}>
        <span className="-mt-[0.6cqw]">囍</span>
      </div>
      <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-[2cqw]">
        <div className="flex flex-col gap-[0.6cqw]">
          <span className="text-[2.4cqw] tracking-[0.3em] text-neutral-500 uppercase">Chú rể</span>
          <span className="font-heading text-[6.2cqw] leading-tight">{wedding.groom.shortName}</span>
        </div>
        <span aria-hidden className="h-[11cqw] w-px bg-gold-soft" />
        <div className="flex flex-col gap-[0.6cqw]">
          <span className="text-[2.4cqw] tracking-[0.3em] text-neutral-500 uppercase">Cô dâu</span>
          <span className="font-heading text-[6.2cqw] leading-tight">{wedding.bride.shortName}</span>
        </div>
      </div>
      <Lich page={page} />
      <div className="flex flex-col items-center gap-[0.8cqw]">
        <p className="text-[2.8cqw] tracking-[0.2em] text-neutral-600 uppercase">
          {wedding.timeLabel} · {wedding.weekdayLabel} · {ngay}
        </p>
        <p className="font-heading text-[3.6cqw] text-balance text-gold italic">{wedding.lunarLabel}</p>
        <p className="font-heading text-[3.8cqw]">{noiToChuc}</p>
        {page && <p className="max-w-[70cqw] text-[3.4cqw] text-neutral-500">{wedding.venue.address}</p>}
      </div>
    </div>
  );
}

function Inside() {
  return (
    <section className="relative flex min-h-svh justify-center bg-cream">
      <div className="flex w-full max-w-[420px] @container">
        <ThiepFace page />
      </div>
      <ScrollHint />
    </section>
  );
}

// Mặt Thiệp nằm ngang để vừa Phong bì ngang: bên trái 囍 và tên, bên phải tờ lịch.
// Thiệp rời Phong bì rồi tan vào Lòng thiệp (bố cục dọc ở trên).
function ThiepNgang() {
  return (
    <div className="relative grid size-full grid-cols-[1fr_auto_1.15fr] items-center gap-[4cqw] bg-cream px-[6cqw] py-[4cqw] text-center text-neutral-900">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[1.2cqw] bg-gold-soft" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.2cqw] bg-gold-soft" />
      <div className="flex flex-col items-center gap-[1.6cqw]">
        <p className="text-[2cqw] tracking-[0.35em] text-neutral-600 uppercase">Lễ thành hôn</p>
        <div className="grid size-[12cqw] place-items-center rounded-full border border-gold text-[6.8cqw] leading-none text-gold" style={{ fontFamily: HAN }}>
          <span className="-mt-[0.4cqw]">囍</span>
        </div>
        <span className="font-heading text-[4.6cqw] leading-tight">{wedding.groom.shortName}</span>
        <span className="font-script text-[3.6cqw] leading-none text-gold">&amp;</span>
        <span className="font-heading text-[4.6cqw] leading-tight">{wedding.bride.shortName}</span>
        <p className="text-[2cqw] tracking-[0.2em] text-neutral-600 uppercase">
          {wedding.timeLabel} · {ngay}
        </p>
      </div>
      <span aria-hidden className="h-[70%] w-px bg-gold-soft" />
      <div className="text-[0.78em]">
        <LichNho />
        <p className="mt-[1.4cqw] font-heading text-[2.6cqw]">{noiToChuc}</p>
      </div>
    </div>
  );
}

function LichNho() {
  return (
    <div className="w-full">
      <p className="mb-[1cqw] font-heading text-[3.4cqw] tracking-wider">
        Tháng {Number(month)} · {year}
      </p>
      <div className="grid grid-cols-7 gap-y-[0.4cqw] text-[2.4cqw] leading-[1.5]">
        {THU.map((t) => (
          <span key={t} className="text-[1.8cqw] tracking-wider text-neutral-400">
            {t}
          </span>
        ))}
        {Array.from({ length: oTrong }, (_, i) => (
          <span key={`o${i}`} />
        ))}
        {Array.from({ length: soNgay }, (_, i) => i + 1).map((d) => (
          <span key={d} className={cn("relative grid place-items-center", d === ngayCuoi ? "font-semibold text-white" : "text-neutral-700")}>
            {d === ngayCuoi && <Heart className="absolute top-1/2 left-1/2 size-[5.4cqw] -translate-1/2 text-gold" />}
            <span className="relative">{d}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Phong bì ngang theo ảnh mẫu: bốn tam giác gặp nhau ở tâm, dấu sáp ở giữa.
// Thứ tự lớp: Mặt sau (có giấy lót) < Nắp đã mở < Thiệp < Túi trước (hai vạt bên + vạt đáy) < Nắp đang đóng < Trang trí < Dấu.
// Mỗi mặt giấy cùng một màu, chỉ khác độ đậm, như ánh sáng chiếu từ trên xuống.
// Mọi chuyển động suy ra từ `p` (0 → 1) = quãng đã kéo / quãng mở, nên ngón tay điều khiển cả cảnh.

type Theme = {
  page: string; // nền màn hình sau Phong bì
  color: string; // màu giấy
  liner: string; // CSS background: giấy lót
  line: string; // nét mép gấp
  wax: Wax;
  front?: React.ReactNode; // tem, chữ đè lên mặt Phong bì
};

// Thớ giấy: nhiễu rất nhẹ phủ lên màu giấy.
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .07 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";
const tile = (svg: string) => `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
// Một mặt giấy: màu nền + lớp tối/sáng + thớ giấy.
const face = (theme: Theme, shade: string) => `${GRAIN}, ${shade}, ${theme.color}`;
const SHADE = {
  back: "linear-gradient(rgba(0,0,0,.16), rgba(0,0,0,.16))",
  flap: "linear-gradient(180deg, rgba(0,0,0,.13), rgba(0,0,0,.07))",
  side: "linear-gradient(rgba(0,0,0,.035), rgba(0,0,0,.035))",
  bottom: "linear-gradient(0deg, rgba(255,255,255,.06), rgba(255,255,255,0))",
};

const ENVELOPE = "relative w-[min(88vw,380px)] aspect-[10/7]";
const CENTER = 53; // % chiều cao: nơi đầu Nắp và ba vạt gặp nhau

function useProgress(y: MotionValue<number>, travel: () => number) {
  // 0 khi chưa kéo; không đọc `window` ở p = 0 để HTML tĩnh khớp lúc hydrate.
  return useTransform(y, (v) => (v >= 0 ? 0 : Math.min(1, -v / travel())));
}

const travelEnvelope = () => window.innerHeight * 0.8;

function FadingHint({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0, 0.1], [1, 0]);
  return (
    <motion.div style={{ opacity }} className="pointer-events-none absolute inset-x-0 bottom-[max(2.5rem,env(safe-area-inset-bottom))]">
      <SwipeHint />
    </motion.div>
  );
}

function Back({ theme }: { theme: Theme }) {
  return (
    <div className="absolute inset-0 z-[1] rounded-[3px] shadow-[0_26px_40px_-24px_rgba(40,25,10,0.5)]" style={{ background: face(theme, SHADE.back) }}>
      <div className="absolute inset-x-[3%] top-[3%] h-[80%]" style={{ background: theme.liner, clipPath: `polygon(0 0,100% 0,100% 100%,50% ${CENTER}%,0 100%)` }} />
    </div>
  );
}

function Pocket({ theme }: { theme: Theme }) {
  return (
    <div className="absolute inset-0 z-[4] overflow-hidden rounded-[3px]">
      <div className="absolute inset-0" style={{ background: face(theme, SHADE.side), clipPath: `polygon(0 0,50% ${CENTER + 2}%,0 100%)` }} />
      <div className="absolute inset-0" style={{ background: face(theme, SHADE.side), clipPath: `polygon(100% 0,50% ${CENTER + 2}%,100% 100%)` }} />
      <div className="absolute inset-0 drop-shadow-[0_-2px_3px_rgba(40,25,10,0.16)]">
        <div className="absolute inset-0" style={{ background: face(theme, SHADE.bottom), clipPath: `polygon(0 100%,48% ${CENTER + 1}%,50% ${CENTER}%,52% ${CENTER + 1}%,100% 100%)` }} />
      </div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden>
        <path d={`M0 0 L50 ${CENTER + 2} L100 0`} fill="none" stroke={theme.line} strokeWidth="0.75" vectorEffect="non-scaling-stroke" opacity="0.6" />
      </svg>
    </div>
  );
}

// Nắp tam giác lật quanh mép trên. Qua 90° thì chui xuống dưới Thiệp và lộ mặt trong có giấy lót.
const FLAP_CLIP = "polygon(0 0,100% 0,52% 98%,50% 100%,48% 98%)";
const LINER_CLIP = "polygon(4% 0,96% 0,50% 90%)";

function Flap({ rotateX, theme }: { rotateX: MotionValue<number>; theme: Theme }) {
  const zIndex = useTransform(rotateX, (r) => (r < 90 ? 5 : 2));
  const inside = useTransform(rotateX, (r) => (r < 90 ? 0 : 1));
  const shade = useTransform(rotateX, [0, 90, 180], [1, 0.82, 0.96]);
  const filter = useTransform(shade, (s) => `brightness(${s}) drop-shadow(0 3px 3px rgba(40,25,10,0.22))`);
  return (
    <motion.div style={{ rotateX, zIndex, transformPerspective: 900, originY: 0, filter, height: `${CENTER}%` }} className="absolute inset-x-0 top-0">
      <div className="absolute inset-0" style={{ background: face(theme, SHADE.flap), clipPath: FLAP_CLIP }} />
      <motion.div style={{ opacity: inside }} className="absolute inset-0">
        <div className="absolute inset-0" style={{ background: theme.liner, clipPath: LINER_CLIP }} />
      </motion.div>
    </motion.div>
  );
}

function CenterSeal({ p, wax }: { p: MotionValue<number>; wax: Wax }) {
  const split = useTransform(p, [0, 0.1], [0, 1]);
  const opacity = useTransform(split, [0.5, 1], [1, 0]);
  return (
    <motion.div style={{ opacity, top: `${CENTER - 1}%` }} className="absolute left-1/2 z-[7] -translate-x-1/2 -translate-y-1/2">
      <Breathe>
        <SplitSeal split={split} wax={wax} className="size-14" />
      </Breathe>
    </motion.div>
  );
}

// Kéo lên: dấu nứt, Nắp lật mở, Thiệp trồi khỏi Túi trước, Phong bì rơi xuống, Thiệp tan vào Lòng thiệp.
function makeCover(theme: Theme) {
  return function Cover(props: CoverProps) {
    const { y, surface, opening, open } = useMoThiep(props, travelEnvelope);
    const p = useProgress(y, travelEnvelope);
    const flap = useTransform(p, [0.08, 0.3], [0, 180]);
    const cardY = useTransform(p, [0.3, 0.72], ["0%", "-112%"]);
    const envY = useTransform(p, [0.3, 0.72, 1], ["0%", "45%", "160%"]);
    const envOpacity = useTransform(p, [0.8, 1], [1, 0]);
    const cardScale = useTransform(p, [0.72, 1], [1, 1.12]);
    const cardOpacity = useTransform(p, [0.86, 1], [1, 0]);
    const frontOpacity = useTransform(p, [0.04, 0.16], [1, 0]);
    const pageOpacity = useTransform(p, [0.8, 1], [1, 0]);
    return (
      <Overlay opening={opening} open={open}>
        <motion.div style={{ opacity: pageOpacity, background: theme.page }} className="absolute inset-0" />
        <div className="absolute inset-0 grid place-items-center">
          <motion.div style={{ y: envY, opacity: envOpacity }} className={ENVELOPE}>
            <Back theme={theme} />
            <Flap rotateX={flap} theme={theme} />
            <motion.div style={{ y: cardY, scale: cardScale, opacity: cardOpacity }} className="absolute inset-x-[4%] top-[5%] z-[3] h-[91%] overflow-hidden shadow-[0_10px_30px_-14px_rgba(0,0,0,0.3)] @container">
              <ThiepNgang />
            </motion.div>
            <Pocket theme={theme} />
            {theme.front && (
              <motion.div style={{ opacity: frontOpacity }} className="pointer-events-none absolute inset-0 z-[6]">
                {theme.front}
              </motion.div>
            )}
            <CenterSeal p={p} wax={theme.wax} />
          </motion.div>
        </div>
        <FadingHint p={p} />
        <motion.div {...surface} style={{ y }} className="absolute inset-0 z-10 cursor-grab outline-none active:cursor-grabbing" />
      </Overlay>
    );
  };
}

// ---------------------------------------------------------------------------
// Sáp.

const WAX_DO: Wax = { hi: "#d23a30", mid: "#a8231c", lo: "#6e130f", mark: <Emboss color="#6e130f" family={HAN} size={38}>囍</Emboss> };
const WAX_DO_MONO: Wax = { ...WAX_DO, mark: <Emboss color="#6e130f" family="var(--font-playfair), serif" size={30}>{initials}</Emboss> };
const WAX_VANG: Wax = { hi: "#f6e3a6", mid: "#cfa64e", lo: "#7f5f1c", mark: <Emboss color="#7f5f1c" family={HAN} size={38}>囍</Emboss> };
const WAX_VANG_MONO: Wax = { ...WAX_VANG, mark: <Emboss color="#7f5f1c" family="var(--font-playfair), serif" size={30}>{initials}</Emboss> };
const WAX_DONG: Wax = { hi: "#d9a77a", mid: "#a8724a", lo: "#5f3a20", mark: <Emboss color="#5f3a20" family={HAN} size={38}>囍</Emboss> };

// Tên hai bạn viết nhỏ trên vạt đáy.
function FrontNames({ className, script }: { className?: string; script?: boolean }) {
  return (
    <div className={cn("absolute inset-x-0 bottom-[7%] text-center", script ? "font-script text-lg" : "font-heading text-sm tracking-[0.2em] uppercase", className)}>
      {wedding.groom.shortName} &amp; {wedding.bride.shortName}
    </div>
  );
}

const AIRMAIL = "repeating-linear-gradient(45deg, #b5302a 0 9px, #fbfaf7 9px 18px, #27406b 18px 27px, #fbfaf7 27px 36px)";
const FLORAL = tile(`<svg xmlns='http://www.w3.org/2000/svg' width='22' height='22'><g fill='#c9a35a' fill-opacity='.55'><circle cx='11' cy='7.5' r='2.2'/><circle cx='11' cy='14.5' r='2.2'/><circle cx='7.5' cy='11' r='2.2'/><circle cx='14.5' cy='11' r='2.2'/></g><circle cx='11' cy='11' r='1.4' fill='#fbf6ec'/><circle cx='0' cy='0' r='1' fill='#c9a35a' fill-opacity='.4'/><circle cx='22' cy='22' r='1' fill='#c9a35a' fill-opacity='.4'/></svg>`);
const HY_TILE = tile(`<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30'><text x='15' y='21' font-size='16' text-anchor='middle' fill='#a87b25' fill-opacity='.45' font-family='serif'>囍</text></svg>`);
const FOIL = "linear-gradient(135deg, #c99a42, #f0d692 45%, #c99a42 70%, #e7c879)";

// ---------------------------------------------------------------------------
// A — Trắng tem thư (mẫu D cũ đổi sang giấy trắng): lót sọc thư máy bay, tem thư + dấu bưu điện, sáp đỏ 囍.

function Stamp() {
  return (
    <div className="absolute top-[7%] right-[5%] rotate-[4deg]">
      <div className="bg-[radial-gradient(circle,transparent_2px,#fdfcf9_2.5px)] bg-[length:6px_6px] bg-[position:-3px_-3px] p-[4px] shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
        <div className="flex h-12 w-10 flex-col items-center justify-center gap-0.5 bg-[#b5302a] text-[#f2d68f]">
          <span className="text-lg leading-none" style={{ fontFamily: HAN }}>
            囍
          </span>
          <span className="text-[0.45rem] tracking-wider">{`${day}·${month}`}</span>
        </div>
      </div>
      {/* Dấu bưu điện đè lên mép tem. */}
      <div className="absolute top-2 -left-9 grid size-12 -rotate-12 place-items-center rounded-full border border-[#2d3a55]/50 text-[0.42rem] tracking-[0.12em] text-[#2d3a55]/65">
        {ngay}
      </div>
    </div>
  );
}

const coverTrangTem: Theme = {
  page: "#ece8e1",
  color: "#fbfaf7",
  liner: AIRMAIL,
  line: "#cfc8bb",
  wax: WAX_DO,
  front: (
    <>
      <Stamp />
      <div className="absolute top-[9%] left-[6%] flex flex-col items-start text-[#2d3a55]">
        <span className="text-[0.55rem] tracking-[0.3em] uppercase opacity-70">Kính gửi</span>
        <span className="font-script text-lg leading-tight">Bạn thân mến</span>
      </div>
      <FrontNames script className="text-[#2d3a55]" />
    </>
  ),
};

// B — Đỏ son, đúng như ảnh mẫu: đỏ truyền thống, lót nhũ vàng in 囍, sáp vàng.
const coverDoSon: Theme = {
  page: "var(--cream)",
  color: "#a83a33",
  liner: `${HY_TILE}, ${FOIL}`,
  line: "#7a201b",
  wax: WAX_VANG,
};

// C — Trắng lót hoa: giấy trắng ngà, lót hoa nhí vàng, sáp đỏ khắc chữ cái đầu, tên viết tay vàng.
const coverTrangHoa: Theme = {
  page: "#efe9de",
  color: "#fdfbf6",
  liner: `${FLORAL}, #f6eddc`,
  line: "#dccbaa",
  wax: WAX_DO_MONO,
  front: <FrontNames script className="text-gold" />,
};

// D — Hồng phấn: hồng nhạt, lót hoa nhí, sáp đồng 囍.
const coverHong: Theme = {
  page: "#f6ece9",
  color: "#ecc9c3",
  liner: `${FLORAL}, #f8e9e4`,
  line: "#c99e96",
  wax: WAX_DONG,
  front: <FrontNames className="text-[#7a4a42]" />,
};

// E — Xanh mực, viền nhũ: xanh đậm, lót lá vàng ánh kim, sáp vàng chữ cái đầu.
const coverMuc: Theme = {
  page: "var(--cream)",
  color: "#243049",
  liner: "repeating-linear-gradient(135deg, rgba(255,255,255,.12) 0 1px, transparent 1px 7px), linear-gradient(135deg, #b8913c, #f2dc9c 40%, #b8913c 62%, #ecd18a)",
  line: "#c9a24a",
  wax: WAX_VANG_MONO,
  front: <FrontNames className="text-[#e3c77f]" />,
};

// ---------------------------------------------------------------------------

export const thiepVariants = {
  A: { name: "Trắng tem thư", Cover: makeCover(coverTrangTem), Inside },
  B: { name: "Đỏ son", Cover: makeCover(coverDoSon), Inside },
  C: { name: "Trắng lót hoa", Cover: makeCover(coverTrangHoa), Inside },
  D: { name: "Hồng phấn", Cover: makeCover(coverHong), Inside },
  E: { name: "Xanh mực nhũ", Cover: makeCover(coverMuc), Inside },
} as const;

export type ThiepVariantKey = keyof typeof thiepVariants;
