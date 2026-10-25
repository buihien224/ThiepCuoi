# 09: Chia sẻ + Bắn tim

**What to build:** Trên thanh công cụ nổi có thêm nút Chia sẻ và Bắn tim. Bấm Chia sẻ thì máy hỗ trợ sẽ mở bảng chia sẻ của điện thoại, máy không hỗ trợ thì copy link vào clipboard. Hộp Chia sẻ có mã QR của thiệp để người bên cạnh quét. Link chia sẻ luôn là link chung, không kèm tên khách. Bấm Bắn tim thì tim bay lên trên màn hình người bấm, cho vui, không đếm và không lưu.

**Blocked by:** 07 (Thanh công cụ nổi + hộp Quà mừng)

**Status:** ready-for-agent

- [ ] Chia sẻ dùng `navigator.share` khi trình duyệt hỗ trợ, nếu không thì copy link và hiện toast
- [ ] Link chia sẻ luôn là `siteUrl`, không bao giờ kèm `?to=`, kể cả khi khách đang mở bằng link riêng
- [ ] Hộp Chia sẻ có QR (qrcode.react) trỏ tới `siteUrl`
- [ ] Bắn tim chỉ chạy trên máy người bấm: không có state chung, không gọi mạng
- [ ] Hiệu ứng tim được giảm bớt khi bật `prefers-reduced-motion`
- [ ] Test e2e: mở bằng `?to=Ai%20Đó`, bấm Chia sẻ (nhánh copy link), clipboard chứa đúng `siteUrl` và không có `?to=`
