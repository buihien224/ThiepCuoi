import { Invitation } from "@/components/invitation";
import { MusicProvider } from "@/components/music";
import { Hero } from "@/components/sections/hero";
import { wedding } from "@/content/wedding";

export default function Home() {
  return (
    <MusicProvider src={wedding.music}>
      <Invitation>
        <Hero />
      </Invitation>
    </MusicProvider>
  );
}
