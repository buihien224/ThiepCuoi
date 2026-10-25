// Toàn bộ nội dung thiệp nằm ở đây. Chỗ nào còn "[...]" là chỗ trống cần thay.
// Ảnh: đặt ảnh gốc vào `photos/`, chạy `pnpm photos`, rồi ghi tên file (không đuôi) vào các trường `photo`.
// Để `null` thì thiệp hiện khung giữ chỗ.

export type Photo = string | null;

export const wedding = {
  siteUrl: "https://hienlinh.com",

  // Tiêu đề lớn trên bìa (tiêu đề trang trí, để tiếng Anh).
  coverTitle: "Our Love Begins",

  groom: { fullName: "Bùi Đức Hiền", shortName: "Đức Hiền" },
  bride: { fullName: "Phan Thị Mai Linh", shortName: "Mai Linh" },

  families: {
    groom: {
      label: "Nhà trai",
      father: "Ông [Tên bố chú rể]",
      mother: "Bà [Tên mẹ chú rể]",
      address: "[Địa chỉ nhà trai]",
    },
    bride: {
      label: "Nhà gái",
      father: "Ông [Tên bố cô dâu]",
      mother: "Bà [Tên mẹ cô dâu]",
      address: "[Địa chỉ nhà gái]",
    },
  },

  // Giờ Việt Nam (UTC+7). Đổi giờ tiệc ở đây.
  date: "2026-11-28T11:00:00+07:00",
  timeLabel: "11 giờ 00",
  weekdayLabel: "Thứ Bảy",
  lunarLabel: "Tức ngày 20 tháng 10 năm Bính Ngọ",

  invitation: {
    heading: "Trân trọng kính mời",
    body: "Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng mình. Rất mong bạn dành chút thời gian đến chung vui và chứng kiến khoảnh khắc chúng mình chính thức về chung một nhà.",
  },

  interview: [
    {
      q: "Hai bạn gặp nhau lần đầu ở đâu?",
      a: "[Câu chuyện lần đầu gặp nhau — ví dụ: một buổi chiều mưa ở quán cà phê quen…]",
    },
    {
      q: "Ai là người tỏ tình trước?",
      a: "[Kể lại khoảnh khắc tỏ tình…]",
    },
    {
      q: "Kỷ niệm đáng nhớ nhất của hai bạn?",
      a: "[Một chuyến đi, một lần cãi nhau rồi làm lành…]",
    },
    {
      q: "Điều bạn mong chờ nhất sau ngày cưới?",
      a: "[Một mái nhà nhỏ, những bữa cơm chung…]",
    },
  ],

  venue: {
    name: "[Tên nhà hàng]",
    hall: "[Sảnh tiệc]",
    address: "[Địa chỉ nhà hàng]",
    // Dán link "Chia sẻ → Nhúng bản đồ" của Google Maps (phần src của iframe).
    mapEmbedUrl: null as string | null,
    // Link mở Google Maps để chỉ đường.
    mapUrl: "https://maps.google.com/?q=[Tên nhà hàng]",
  },

  closing: {
    quote: "Hẹn gặp bạn trong ngày vui của chúng mình!",
  },

  gifts: [
    {
      owner: "Chú rể",
      name: "BUI DUC HIEN",
      bank: "[Ngân hàng]",
      account: "[Số tài khoản]",
      qr: null as Photo,
    },
    {
      owner: "Cô dâu",
      name: "PHAN THI MAI LINH",
      bank: "[Ngân hàng]",
      account: "[Số tài khoản]",
      qr: null as Photo,
    },
  ],

  // Nhạc nền: đặt file vào public/music/ và ghi đường dẫn. Dùng nhạc có quyền sử dụng.
  music: "/music/nhac-nen.mp3",

  photos: {
    cover: null as Photo,
    intro: null as Photo,
    // ~12 ảnh gallery
    gallery: Array.from({ length: 12 }, () => null) as Photo[],
  },
} as const;

export const weddingDate = new Date(wedding.date);
