"use client";

import { Disc3, VolumeX } from "lucide-react";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

type Music = {
  playing: boolean;
  play: () => void;
  toggle: () => void;
};

const MusicContext = createContext<Music | null>(null);

// Một phần tử audio dùng chung cho cả trang. `playing` chỉ đổi theo sự kiện thật của audio,
// nên khi trình duyệt chặn phát hoặc file nhạc lỗi thì nút nhạc vẫn hiện đúng là đang tắt.
// Chỉ gọi `play()` từ sự kiện chạm của người dùng, vì trình duyệt chặn tự phát nhạc.
export function MusicProvider({ src, children }: { src: string; children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    // Sau một lần lỗi (mất mạng chẳng hạn) phải nạp lại nguồn thì mới phát lại được.
    if (audio.error) audio.load();
    audio.play().catch(() => {
      // Bị chặn hoặc không tải được: đưa audio về trạng thái dừng để lần chạm sau thử lại.
      audio.pause();
      setPlaying(false);
    });
  }, []);

  // Dựa vào `audio.paused` chứ không dựa vào `playing`: lúc nhạc còn đang tải, `playing` vẫn là false
  // nhưng audio đã nhận lệnh phát, nên chạm lần nữa phải là tắt.
  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !audio.paused) audio.pause();
    else play();
  }, [play]);

  const stopped = () => setPlaying(false);
  const music = useMemo(() => ({ playing, play, toggle }), [playing, play, toggle]);

  return (
    <MusicContext value={music}>
      {children}
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="none"
        onPlaying={() => setPlaying(true)}
        onPause={stopped}
        onEnded={stopped}
        onError={stopped}
      />
    </MusicContext>
  );
}

export function useMusic() {
  const music = useContext(MusicContext);
  if (!music) throw new Error("useMusic phải nằm trong <MusicProvider>");
  return music;
}

// Nút nhạc nổi ở góc dưới, nằm ngoài luồng cuộn.
export function MusicToggle() {
  const { playing, toggle } = useMusic();

  return (
    <button
      type="button"
      aria-label="Nhạc nền"
      aria-pressed={playing}
      onClick={toggle}
      className="fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 grid size-12 place-items-center rounded-full border border-gold-soft bg-cream/90 text-gold shadow-lg shadow-gold/15 backdrop-blur transition-transform outline-none focus-visible:ring-3 focus-visible:ring-gold/40 active:scale-95"
    >
      {playing ? (
        <Disc3 className="size-6 animate-spin [animation-duration:4s] motion-reduce:animate-none" />
      ) : (
        <VolumeX className="size-5 text-ink/60" />
      )}
    </button>
  );
}
