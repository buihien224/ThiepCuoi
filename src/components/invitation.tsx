"use client";

import { AnimatePresence, MotionConfig } from "motion/react";
import { useState } from "react";
import { MusicToggle, useMusic } from "@/components/music";
import { PrototypeSwitcher, usePrototypeVariant } from "@/components/prototype/prototype-switcher";
import { thiepVariants, type ThiepVariantKey } from "@/components/prototype/thiep-prototype";
import { Intro } from "@/components/sections/intro";

// PROTOTYPE (ticket 03): ở dev, Thiệp vuốt để mở thay cho phong bì, chọn biến thể bằng `?variant=`.
// Bản build production vẫn dùng phong bì cũ nên bộ e2e không đổi.
const PROTOTYPE = process.env.NODE_ENV !== "production";
const variantNames = Object.fromEntries(Object.entries(thiepVariants).map(([k, v]) => [k, v.name]));

// Khung của thiệp: phong bì phủ lên trên, nội dung chính bị `inert` cho tới khi khách mở thiệp.
// `aria-hidden` đi kèm cho trình duyệt cũ chưa hỗ trợ `inert`.
export function Invitation({ children }: { children: React.ReactNode }) {
  const music = useMusic();
  const [opened, setOpened] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const requested = usePrototypeVariant("A");
  const protoKey = (requested in thiepVariants ? requested : "A") as ThiepVariantKey;
  const proto = PROTOTYPE ? thiepVariants[protoKey] : null;

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence custom={skipped}>
        {!opened &&
          (proto ? (
            <proto.Cover key={`thiep-${protoKey}`} onOpen={music.play} onDone={() => setOpened(true)} />
          ) : (
            <Intro
              key="intro"
              onOpen={music.play}
              onDone={(wasSkipped) => {
                setSkipped(wasSkipped);
                setOpened(true);
              }}
            />
          ))}
      </AnimatePresence>

      <main inert={!opened} aria-hidden={!opened || undefined} className="flex flex-1 flex-col">
        {proto && <proto.Inside />}
        {children}
      </main>

      {opened && <MusicToggle />}
      {proto && <PrototypeSwitcher variants={variantNames} current={protoKey} />}
    </MotionConfig>
  );
}
