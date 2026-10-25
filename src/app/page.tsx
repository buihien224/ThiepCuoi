import { Invitation } from "@/components/invitation";
import { MusicProvider } from "@/components/music";
import { Hero } from "@/components/sections/hero";
import { Interview } from "@/components/sections/interview";
import { Location } from "@/components/sections/location";
import { LoiKet } from "@/components/sections/loi-ket";
import { LoiMoi } from "@/components/sections/loi-moi";
import { SaveTheDate } from "@/components/sections/save-the-date";
import { wedding } from "@/content/wedding";

// Thứ tự các phần theo spec. Lòng thiệp nằm trong `Invitation`, ngay trên Hero.
export default function Home() {
  return (
    <MusicProvider src={wedding.music}>
      <Invitation>
        <Hero />
        {/* Kính mời theo tên khách (ticket 04) */}
        {/* Đếm ngược (ticket 05) */}
        <LoiMoi />
        <Interview />
        {/* Gallery (ticket 08) */}
        <SaveTheDate />
        <Location />
        <LoiKet />
      </Invitation>
    </MusicProvider>
  );
}
