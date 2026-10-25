import { MapPin } from "lucide-react";
import { wedding } from "@/content/wedding";

// Location: nhà hàng, sảnh, địa chỉ, bản đồ nhúng và nút chỉ đường.
// Chưa có `mapEmbedUrl` thì bỏ hẳn khung bản đồ, không để lại khung hỏng.
export function Location() {
  const { name, hall, address, mapEmbedUrl, mapUrl } = wedding.venue;

  return (
    <section aria-labelledby="location" className="mx-auto w-full max-w-md bg-cream px-6 py-16 text-center text-ink">
      <h2 id="location" className="font-heading text-4xl leading-tight font-bold tracking-tight text-gold">
        Location
      </h2>
      <p className="mt-2 text-[0.65rem] tracking-[0.3em] text-ink/45 uppercase">Địa điểm tổ chức</p>

      <div className="mt-8 flex flex-col items-center gap-1">
        <p className="font-heading text-2xl leading-snug text-balance">{name}</p>
        <p className="text-sm tracking-[0.2em] text-gold uppercase">{hall}</p>
        <p className="mt-2 max-w-xs text-sm text-pretty text-ink/70">{address}</p>
      </div>

      {mapEmbedUrl && (
        <iframe
          src={mapEmbedUrl}
          title={`Bản đồ đường tới ${name}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="mt-8 aspect-[4/3] w-full border border-gold-soft bg-cream-deep"
        />
      )}

      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 border border-gold px-6 py-3 text-xs tracking-[0.25em] text-gold uppercase transition-colors outline-none hover:bg-gold hover:text-cream focus-visible:ring-3 focus-visible:ring-gold/40"
      >
        <MapPin className="size-4" strokeWidth={1.5} />
        Mở Google Maps
      </a>
    </section>
  );
}
