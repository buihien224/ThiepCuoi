import { ngay } from "@/components/lich";
import { wedding } from "@/content/wedding";

// Lời kết: câu "hẹn gặp bạn", khối "28 Nov 2026 INVITATION" kiểu tem tạp chí, rồi footer.

const THANG = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const [year, month, day] = wedding.date.slice(0, 10).split("-");
const ngayTiengAnh = `${Number(day)} ${THANG[Number(month) - 1]} ${year}`;

export function LoiKet() {
  return (
    <>
      <section aria-labelledby="loi-ket" className="mx-auto w-full max-w-md bg-cream px-6 pt-16 pb-12 text-center text-ink">
        <h2 id="loi-ket" className="font-script text-4xl leading-normal text-balance text-gold">
          {wedding.closing.quote}
        </h2>

        <div className="mx-auto mt-10 flex w-fit flex-col items-center border border-gold px-10 py-6">
          <p className="font-heading text-3xl tracking-wide">{ngayTiengAnh}</p>
          <span aria-hidden className="my-3 h-px w-full bg-gold-soft" />
          <p className="text-xs tracking-[0.5em] text-gold">INVITATION</p>
        </div>
      </section>

      <footer className="mx-auto flex w-full max-w-md flex-col items-center gap-1 border-t border-gold-soft bg-cream px-6 pt-6 pb-[max(2rem,env(safe-area-inset-bottom))] text-center">
        <p className="font-script text-2xl text-gold">
          {wedding.groom.shortName} &amp; {wedding.bride.shortName}
        </p>
        <p className="text-[0.65rem] tracking-[0.3em] text-ink/45">{ngay}</p>
      </footer>
    </>
  );
}
