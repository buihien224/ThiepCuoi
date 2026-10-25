"use client";

import { AnimatePresence, MotionConfig } from "motion/react";
import { useState } from "react";
import { MusicToggle, useMusic } from "@/components/music";
import { Intro } from "@/components/sections/intro";

// Khung của thiệp: phong bì phủ lên trên, nội dung chính bị `inert` cho tới khi khách mở thiệp.
// `aria-hidden` đi kèm cho trình duyệt cũ chưa hỗ trợ `inert`.
export function Invitation({ children }: { children: React.ReactNode }) {
  const music = useMusic();
  const [opened, setOpened] = useState(false);
  const [skipped, setSkipped] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence custom={skipped}>
        {!opened && (
          <Intro
            key="intro"
            onOpen={music.play}
            onDone={(wasSkipped) => {
              setSkipped(wasSkipped);
              setOpened(true);
            }}
          />
        )}
      </AnimatePresence>

      <main inert={!opened} aria-hidden={!opened || undefined} className="flex flex-1 flex-col">
        {children}
      </main>

      {opened && <MusicToggle />}
    </MotionConfig>
  );
}
