"use client";

import { ChevronUp } from "lucide-react";
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
import { ThiepNgang } from "@/components/sections/thiep";
import { wedding } from "@/content/wedding";

// Màn mở đầu: Phong bì ngang nằm giữa màn hình, khách vuốt lên để Mở thiệp (ADR-0001, không có nút).
// Kéo lên thì Dấu niêm phong nứt đôi, Nắp lật mở, Thiệp trồi khỏi Túi trước, Phong bì rơi xuống
// và Thiệp tan vào Lòng thiệp nằm ngay bên dưới trong luồng trang.
// Mọi chuyển động suy ra từ `p` (0 → 1) = quãng đã kéo / quãng mở, nên ngón tay điều khiển cả cảnh.

type Props = { onOpen: () => void; onDone: () => void };

const OPEN_RATIO = 0.3;
const FLICK_VELOCITY = -600;
const OPEN_SECONDS = 0.6; // cộng 0.3 giây mờ dần của lớp phủ, cả hiệu ứng dưới 1 giây

const travel = () => window.innerHeight * 0.8;

// Cử chỉ Mở thiệp: vuốt lên quá ~30% chiều cao hoặc vuốt nhanh; cách dự phòng là chạm, Enter/Space/↑, lăn chuột.
// Chạm thêm lần nữa khi đang mở thì hiệu ứng tua tới cuối.
function useMoThiep({ onOpen, onDone }: Props) {
  const y = useMotionValue(0);
  const reduce = useReducedMotion();
  const phase = useRef<"closed" | "opening" | "open">("closed");
  const anim = useRef<AnimationPlaybackControls | null>(null);
  // Motion vẫn gọi `onTap` sau một cú kéo (bề mặt chạy theo ngón tay nên tay chưa rời khỏi nó),
  // nên kéo ngắn rồi thả sẽ thành chạm và mở Thiệp. Cờ này bỏ qua lần chạm đó.
  const dragged = useRef(false);
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
    // Gọi ngay trong cử chỉ của khách, vì trình duyệt chỉ cho phát nhạc lúc này.
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
    onPointerDown() {
      dragged.current = false;
    },
    onDragStart() {
      dragged.current = true;
    },
    onDragEnd(_: unknown, info: PanInfo) {
      const threshold = Math.min(window.innerHeight * OPEN_RATIO, travel() * 0.5);
      if (info.offset.y < -threshold || info.velocity.y < FLICK_VELOCITY) open();
      else animate(y, 0, { type: "spring", stiffness: 500, damping: 35 });
    },
    onTap() {
      if (!dragged.current) open();
    },
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

  return { y, surface, opening, open, reduce };
}

export function PhongBi(props: Props) {
  const { y, surface, opening, open, reduce } = useMoThiep(props);
  // 0 khi chưa kéo; không đọc `window` ở p = 0 để HTML tĩnh khớp lúc hydrate.
  // Máy giảm chuyển động: cảnh đứng yên khi kéo, thả tay thì chỉ mờ dần sang Lòng thiệp.
  const p = useTransform(y, (v) => (reduce || v >= 0 ? 0 : Math.min(1, -v / travel())));
  const flap = useTransform(p, [0.08, 0.3], [0, 180]);
  const thiepY = useTransform(p, [0.3, 0.72], ["0%", "-112%"]);
  const thiepScale = useTransform(p, [0.72, 1], [1, 1.12]);
  const thiepOpacity = useTransform(p, [0.86, 1], [1, 0]);
  const envY = useTransform(p, [0.3, 0.72, 1], ["0%", "45%", "160%"]);
  const fadeOut = useTransform(p, [0.8, 1], [1, 0]);
  const namesOpacity = useTransform(p, [0.04, 0.16], [1, 0]);

  return (
    <motion.section
      data-phong-bi-dong
      aria-label="Thiệp cưới"
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      // Chạm lần nữa khi đang mở (lúc này bề mặt kéo đã bay lên) thì tua tới cuối.
      onPointerDown={() => opening && open()}
      className="fixed inset-0 z-50 touch-none overflow-hidden select-none"
    >
      <motion.div style={{ opacity: fadeOut }} className="absolute inset-0 bg-envelope-page" />
      <div className="absolute inset-0 grid place-items-center">
        <motion.div style={{ y: envY, opacity: fadeOut }} className="relative aspect-[10/7] w-[min(88vw,380px)]">
          <MatSau />
          <Nap rotateX={flap} />
          <motion.div
            style={{ y: thiepY, scale: thiepScale, opacity: thiepOpacity }}
            className="absolute inset-x-[4%] top-[5%] z-[3] h-[91%] overflow-hidden shadow-[0_10px_30px_-14px_rgba(0,0,0,0.3)] @container"
          >
            <ThiepNgang />
          </motion.div>
          <TuiTruoc />
          <motion.p
            style={{ opacity: namesOpacity }}
            className="pointer-events-none absolute inset-x-0 bottom-[7%] z-[6] text-center font-script text-lg text-gold"
          >
            {wedding.groom.shortName} &amp; {wedding.bride.shortName}
          </motion.p>
          <DauGiua p={p} />
        </motion.div>
      </div>
      <GoiYVuot p={p} />
      <motion.div
        {...surface}
        style={{ y }}
        className="absolute inset-0 z-10 cursor-grab outline-none focus-visible:ring-3 focus-visible:ring-gold/40 focus-visible:ring-inset active:cursor-grabbing"
      />
    </motion.section>
  );
}

function GoiYVuot({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0, 0.1], [1, 0]);
  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute inset-x-0 bottom-[max(2.5rem,env(safe-area-inset-bottom))] flex flex-col items-center gap-1 text-xs tracking-[0.2em] text-ink/45"
    >
      <motion.span animate={{ y: [0, -6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
        <ChevronUp className="size-4" strokeWidth={1.5} />
      </motion.span>
      Vuốt lên để mở thiệp
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Giấy Phong bì: bốn tam giác gặp nhau ở tâm.
// Thứ tự lớp: Mặt sau (có giấy lót) < Nắp đã mở < Thiệp < Túi trước (hai vạt bên + vạt đáy) < Nắp đang đóng < Tên < Dấu.
// Mỗi mặt giấy cùng một màu, chỉ khác độ đậm, như ánh sáng chiếu từ trên xuống.

const CENTER = 53; // % chiều cao: nơi đầu Nắp và ba vạt gặp nhau

// Thớ giấy: nhiễu rất nhẹ phủ lên màu giấy.
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .07 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";
const giay = (shade: string) => `${GRAIN}, ${shade}, var(--envelope)`;
const SHADE = {
  back: "linear-gradient(rgba(0,0,0,.16), rgba(0,0,0,.16))",
  flap: "linear-gradient(180deg, rgba(0,0,0,.13), rgba(0,0,0,.07))",
  side: "linear-gradient(rgba(0,0,0,.035), rgba(0,0,0,.035))",
  bottom: "linear-gradient(0deg, rgba(255,255,255,.06), rgba(255,255,255,0))",
};

// Hoa nhí làm mặt nạ, tô bằng màu `gold`, nên màu hoa đổi theo token.
const HOA_NHI = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='22' height='22'><g fill='#000'><circle cx='11' cy='7.5' r='2.2'/><circle cx='11' cy='14.5' r='2.2'/><circle cx='7.5' cy='11' r='2.2'/><circle cx='14.5' cy='11' r='2.2'/></g><g fill='#000' fill-opacity='.75'><circle cx='0' cy='0' r='1'/><circle cx='22' cy='22' r='1'/></g></svg>",
)}")`;

function GiayLot({ clipPath }: { clipPath: string }) {
  return (
    <div className="absolute inset-0 bg-envelope-liner" style={{ clipPath }}>
      <div className="absolute inset-0 bg-gold opacity-55" style={{ maskImage: HOA_NHI, WebkitMaskImage: HOA_NHI }} />
    </div>
  );
}

function MatSau() {
  return (
    <div
      className="absolute inset-0 z-[1] rounded-[3px] shadow-[0_26px_40px_-24px_rgba(40,25,10,0.5)]"
      style={{ background: giay(SHADE.back) }}
    >
      <div className="absolute inset-x-[3%] top-[3%] h-[80%]">
        <GiayLot clipPath={`polygon(0 0,100% 0,100% 100%,50% ${CENTER}%,0 100%)`} />
      </div>
    </div>
  );
}

function TuiTruoc() {
  return (
    <div className="absolute inset-0 z-[4] overflow-hidden rounded-[3px]">
      <div
        className="absolute inset-0"
        style={{ background: giay(SHADE.side), clipPath: `polygon(0 0,50% ${CENTER + 2}%,0 100%)` }}
      />
      <div
        className="absolute inset-0"
        style={{ background: giay(SHADE.side), clipPath: `polygon(100% 0,50% ${CENTER + 2}%,100% 100%)` }}
      />
      <div className="absolute inset-0 drop-shadow-[0_-2px_3px_rgba(40,25,10,0.16)]">
        <div
          className="absolute inset-0"
          style={{
            background: giay(SHADE.bottom),
            clipPath: `polygon(0 100%,48% ${CENTER + 1}%,50% ${CENTER}%,52% ${CENTER + 1}%,100% 100%)`,
          }}
        />
      </div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden>
        <path
          d={`M0 0 L50 ${CENTER + 2} L100 0`}
          fill="none"
          stroke="var(--envelope-line)"
          strokeWidth="0.75"
          vectorEffect="non-scaling-stroke"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}

// Nắp tam giác lật quanh mép trên. Qua 90° thì chui xuống dưới Thiệp và lộ mặt trong có giấy lót.
const NAP_CLIP = "polygon(0 0,100% 0,52% 98%,50% 100%,48% 98%)";

function Nap({ rotateX }: { rotateX: MotionValue<number> }) {
  const zIndex = useTransform(rotateX, (r) => (r < 90 ? 5 : 2));
  const inside = useTransform(rotateX, (r) => (r < 90 ? 0 : 1));
  const shade = useTransform(rotateX, [0, 90, 180], [1, 0.82, 0.96]);
  const filter = useTransform(shade, (s) => `brightness(${s}) drop-shadow(0 3px 3px rgba(40,25,10,0.22))`);
  return (
    <motion.div
      style={{ rotateX, zIndex, transformPerspective: 900, originY: 0, filter, height: `${CENTER}%` }}
      className="absolute inset-x-0 top-0"
    >
      <div className="absolute inset-0" style={{ background: giay(SHADE.flap), clipPath: NAP_CLIP }} />
      <motion.div style={{ opacity: inside }} className="absolute inset-0">
        <GiayLot clipPath="polygon(4% 0,96% 0,50% 90%)" />
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Dấu niêm phong: sáp đỏ dập nổi chữ cái đầu tên hai bạn, vẽ bằng SVG. Nứt đôi khi bắt đầu kéo.

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

const chuCaiDau = (name: string) => name.trim().split(/\s+/).at(-1)?.[0] ?? "";
const initials = `${chuCaiDau(wedding.groom.shortName)}${chuCaiDau(wedding.bride.shortName)}`;

// Đường nứt chạy dọc, hơi ngoằn ngoèo.
const CRACK = [
  "polygon(0 0,52% 0,47% 22%,55% 41%,46% 62%,53% 81%,49% 100%,0 100%)",
  "polygon(52% 0,100% 0,100% 100%,49% 100%,53% 81%,46% 62%,55% 41%,47% 22%)",
];

function Sap() {
  const id = useId();
  return (
    <svg viewBox="0 0 100 100" className="size-full drop-shadow-[0_3px_4px_rgba(40,20,10,0.35)]" aria-hidden>
      <defs>
        <radialGradient id={id} cx="40%" cy="35%" r="70%">
          <stop offset="0%" style={{ stopColor: "var(--wax-hi)" }} />
          <stop offset="70%" style={{ stopColor: "var(--wax)" }} />
          <stop offset="100%" style={{ stopColor: "var(--wax-lo)" }} />
        </radialGradient>
      </defs>
      <path d={SEAL_PATH} fill={`url(#${id})`} />
      <circle cx="50" cy="50" r="33" fill="none" stroke="var(--wax-lo)" strokeOpacity="0.6" strokeWidth="1.6" />
      <circle cx="50.8" cy="50.8" r="33" fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="1" />
      {/* Chữ dập nổi: một lớp sáng lệch xuống dưới-phải, một lớp tối nằm trên. */}
      <g fontFamily="var(--font-playfair), serif" fontSize={30} textAnchor="middle" dominantBaseline="central">
        <text x="50.9" y="51.4" fill="#fff" fillOpacity="0.25">
          {initials}
        </text>
        <text x="50" y="50.5" fill="var(--wax-lo)">
          {initials}
        </text>
      </g>
    </svg>
  );
}

function DauGiua({ p }: { p: MotionValue<number> }) {
  const split = useTransform(p, [0, 0.1], [0, 1]);
  const opacity = useTransform(split, [0.5, 1], [1, 0]);
  const leftX = useTransform(split, [0, 1], [0, -26]);
  const rightX = useTransform(split, [0, 1], [0, 26]);
  const leftR = useTransform(split, [0, 1], [0, -16]);
  const rightR = useTransform(split, [0, 1], [0, 16]);
  return (
    <motion.div
      style={{ opacity, top: `${CENTER - 1}%` }}
      className="absolute left-1/2 z-[7] -translate-x-1/2 -translate-y-1/2"
    >
      {/* Phong bì "thở" nhẹ qua Dấu niêm phong để gợi ý chạm/vuốt. */}
      <motion.div
        animate={{ scale: [1, 1.035, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="relative size-14"
      >
        <motion.div className="absolute inset-0" style={{ clipPath: CRACK[0], x: leftX, rotate: leftR }}>
          <Sap />
        </motion.div>
        <motion.div className="absolute inset-0" style={{ clipPath: CRACK[1], x: rightX, rotate: rightR }}>
          <Sap />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
