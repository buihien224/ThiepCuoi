"use client";

// PROTOTYPE — thanh chuyển biến thể nổi ở đỉnh màn hình (đáy đã có gợi ý vuốt). Chỉ hiện ở dev.

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

const subscribeNothing = () => () => {};

export function usePrototypeVariant(fallback: string) {
  return useSyncExternalStore(
    subscribeNothing,
    () => new URLSearchParams(window.location.search).get("variant") ?? fallback,
    () => fallback,
  );
}

// Đổi biến thể bằng cách tải lại trang, để Thiệp luôn bắt đầu ở trạng thái đóng.
function goTo(key: string) {
  const url = new URL(window.location.href);
  url.searchParams.set("variant", key);
  window.location.assign(url);
}

export function PrototypeSwitcher({ variants, current }: { variants: Record<string, string>; current: string }) {
  const keys = Object.keys(variants);
  const step = (d: number) => goTo(keys[(keys.indexOf(current) + d + keys.length) % keys.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = e.target as HTMLElement;
      if (el.closest("input, textarea, [contenteditable]")) return;
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="fixed top-[max(0.75rem,env(safe-area-inset-top))] left-1/2 z-[100] flex -translate-x-1/2 items-center gap-1 rounded-full bg-fuchsia-700 px-1.5 py-1 font-sans text-sm text-white shadow-xl ring-2 ring-white">
      <button type="button" onClick={() => step(-1)} className="grid size-8 place-items-center rounded-full hover:bg-white/15" aria-label="Biến thể trước">
        <ChevronLeft className="size-4" />
      </button>
      <span className="min-w-36 text-center whitespace-nowrap">
        {current} ({variants[current]})
      </span>
      <button type="button" onClick={() => step(1)} className="grid size-8 place-items-center rounded-full hover:bg-white/15" aria-label="Biến thể sau">
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}
