"use client";

import { AnimatePresence, MotionConfig } from "motion/react";
import { useState } from "react";
import { MusicToggle, useMusic } from "@/components/music";
import { PhongBi } from "@/components/sections/phong-bi";
import { LongThiep } from "@/components/sections/thiep";

// Khung của thiệp: Phong bì phủ lên trên, nội dung chính bị `inert` cho tới khi khách Mở thiệp.
// `aria-hidden` đi kèm cho trình duyệt cũ chưa hỗ trợ `inert`.
export function Invitation({ children }: { children: React.ReactNode }) {
  const music = useMusic();
  const [opened, setOpened] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{!opened && <PhongBi key="phong-bi" onOpen={music.play} onDone={() => setOpened(true)} />}</AnimatePresence>

      <main inert={!opened} aria-hidden={!opened || undefined} className="flex flex-1 flex-col">
        <LongThiep />
        {children}
      </main>

      {opened && <MusicToggle />}
    </MotionConfig>
  );
}
