"use client";

import { Image as ImageIcon } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { wedding } from "@/content/wedding";

const subscribeNothing = () => () => {};

// Nút chỉ bấm được sau khi React đã chạy, để cú chạm đầu tiên không bị nuốt mất.
function useHydrated() {
  return useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false,
  );
}

// `custom` của AnimatePresence: SKIP thì phong bì biến mất nhanh, không chờ hiệu ứng.
const overlay: Variants = {
  exit: (skipped: boolean) => ({ opacity: 0, transition: { duration: skipped ? 0.2 : 0.45 } }),
};

const FLAP_SECONDS = 0.5;

const chuCaiDau = (name: string) => name.trim().split(/\s+/).at(-1)?.[0] ?? "";

// Màn phong bì che nội dung chính cho tới khi khách chạm "Mở thiệp" hoặc SKIP.
// Bố cục: ảnh intro → tên đôi uyên ương → phong bì → nút Mở thiệp.
export function Intro({ onOpen, onDone }: { onOpen: () => void; onDone: (skipped: boolean) => void }) {
  const hydrated = useHydrated();
  const [opening, setOpening] = useState(false);
  const [done, setDone] = useState(false);
  const { groom, bride, photos, intro } = wedding;

  // Chỉ kết thúc một lần: SKIP giữa lúc phong bì đang mở thì hiệu ứng mở không được gọi `onDone` lần nữa.
  function finish(skipped: boolean) {
    if (done) return;
    setDone(true);
    onDone(skipped);
  }

  function open() {
    if (opening) return;
    onOpen();
    setOpening(true);
  }

  function skip() {
    if (!opening) onOpen();
    finish(true);
  }

  return (
    <motion.section
      data-intro-open
      aria-label="Phong bì thiệp cưới"
      variants={overlay}
      exit="exit"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-7 overflow-hidden bg-cream px-6 pt-[max(2rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] text-ink"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--cream-deep),transparent_65%)]"
      />

      <button
        type="button"
        onClick={skip}
        disabled={!hydrated}
        className="absolute top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] z-10 min-h-11 rounded-full px-4 font-heading text-xs tracking-[0.25em] text-ink/60 transition-colors outline-none hover:text-gold focus-visible:ring-3 focus-visible:ring-gold/40"
      >
        SKIP
      </button>

      <IntroPhoto photo={photos.intro} />

      <div className="relative flex flex-col items-center gap-1 text-center">
        <p className="font-heading text-[0.7rem] tracking-[0.35em] text-gold uppercase">{intro.label}</p>
        <p className="font-script text-4xl text-gold">
          {groom.shortName} <span className="text-gold-soft">&amp;</span> {bride.shortName}
        </p>
      </div>

      <Envelope
        opening={opening}
        monogram={`${chuCaiDau(groom.shortName)}${chuCaiDau(bride.shortName)}`}
        onOpened={() => finish(false)}
      />

      <Button
        onClick={open}
        disabled={!hydrated || opening}
        className="relative h-12 rounded-full px-10 font-heading text-base tracking-wide shadow-lg shadow-gold/25"
      >
        Mở thiệp
      </Button>
    </motion.section>
  );
}

function Envelope({
  opening,
  monogram,
  onOpened,
}: {
  opening: boolean;
  monogram: string;
  onOpened: () => void;
}) {
  const state = opening ? "open" : "closed";

  return (
    <div aria-hidden className="relative aspect-[3/2] w-[min(80vw,20rem)] [perspective:900px]">
      {/* Mặt sau phong bì */}
      <div className="absolute inset-0 rounded-md bg-cream-deep shadow-xl shadow-ink/10" />

      {/* Lá thư bên trong, trượt lên khi nắp đã mở */}
      <motion.div
        initial={false}
        animate={state}
        variants={{
          closed: { y: 0 },
          open: { y: "-48%", transition: { delay: FLAP_SECONDS, duration: 0.6, ease: "easeOut" } },
        }}
        onAnimationComplete={(definition) => {
          if (definition === "open") onOpened();
        }}
        className="absolute inset-x-4 top-3 bottom-3 z-10 flex flex-col items-center justify-start gap-1 rounded-sm border border-gold-soft/60 bg-[oklch(0.99_0.008_85)] pt-4 text-center shadow-sm"
      >
        <p className="font-heading text-[0.6rem] tracking-[0.3em] text-gold uppercase">{wedding.intro.letterTitle}</p>
        <p className="font-script text-2xl text-gold">{wedding.coverTitle}</p>
      </motion.div>

      {/* Túi trước, che phần dưới lá thư */}
      <svg
        viewBox="0 0 300 200"
        preserveAspectRatio="none"
        className="absolute inset-0 z-20 size-full overflow-visible rounded-md"
      >
        <defs>
          <linearGradient id="tui-truoc" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="oklch(0.94 0.035 82)" />
            <stop offset="1" stopColor="oklch(0.9 0.045 80)" />
          </linearGradient>
        </defs>
        <path d="M0 0 L150 110 L300 0 L300 200 L0 200 Z" fill="url(#tui-truoc)" />
        <path
          d="M0 0 L150 110 L300 0 M0 200 L128 98 M300 200 L172 98"
          fill="none"
          stroke="var(--gold-soft)"
          strokeOpacity="0.7"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Nắp phong bì: lật lên rồi lùi ra sau lá thư */}
      <motion.div
        initial={false}
        animate={state}
        variants={{
          closed: { rotateX: 0, zIndex: 30 },
          open: { rotateX: 180, transition: { duration: FLAP_SECONDS, ease: "easeInOut" }, transitionEnd: { zIndex: 0 } },
        }}
        className="absolute inset-x-0 top-0 h-[60%] origin-top [transform-style:preserve-3d]"
      >
        <FlapFace d="M0 0 L300 0 L150 120 Z" fill="oklch(0.92 0.04 82)" className="drop-shadow-[0_2px_3px_oklch(0.5_0.05_70/0.15)]" />
        {/* Mặt trong của nắp: tự lật ngược sẵn, nên vẽ tam giác ngược để sau khi mở mũi nắp chĩa lên trên */}
        <FlapFace d="M0 120 L300 120 L150 0 Z" fill="oklch(0.88 0.05 80)" className="[transform:rotateX(180deg)]" />
        {/* Con dấu sáp */}
        <div className="absolute bottom-0 left-1/2 grid size-12 -translate-x-1/2 translate-y-1/2 place-items-center rounded-full bg-gold font-script text-lg text-cream shadow-md ring-2 ring-gold-soft [backface-visibility:hidden]">
          {monogram}
        </div>
      </motion.div>
    </div>
  );
}

function FlapFace({ d, fill, className }: { d: string; fill: string; className: string }) {
  return (
    <svg
      viewBox="0 0 300 120"
      preserveAspectRatio="none"
      className={`absolute inset-0 size-full overflow-visible [backface-visibility:hidden] ${className}`}
    >
      <path d={d} fill={fill} stroke="var(--gold-soft)" strokeOpacity="0.8" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

// Khung ảnh intro. Ảnh còn `null` thì hiện khung giữ chỗ.
// TODO(ticket 08): thay bằng component ảnh dùng chung khi có pipeline ảnh.
function IntroPhoto({ photo }: { photo: string | null }) {
  return (
    <div className="relative h-44 w-32 overflow-hidden rounded-t-full border border-gold-soft bg-cream-deep p-1.5 shadow-md shadow-gold/10">
      <div className="grid size-full place-items-center overflow-hidden rounded-t-full border border-gold-soft/70">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element -- export tĩnh, next/image không tối ưu ảnh
          <img src={`/photos/${photo}.webp`} alt="" className="size-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-1 text-gold-soft">
            <ImageIcon className="size-6" />
            <span className="text-[0.6rem] tracking-widest uppercase">Ảnh intro</span>
          </div>
        )}
      </div>
    </div>
  );
}
