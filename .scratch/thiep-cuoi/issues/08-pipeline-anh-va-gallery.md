# 08: Pipeline ảnh (`pnpm photos`) + component ảnh + Gallery có lightbox

**What to build:** Chủ thiệp bỏ ảnh gốc vào một thư mục, chạy `pnpm photos`, và nhận được ảnh WebP ở vài độ rộng cố định. Sau đó chỉ cần ghi tên ảnh (không có đuôi file) vào cấu hình. Khách thấy gallery dạng lưới tải nhanh với kích cỡ hợp màn hình, chạm một ảnh để xem toàn màn hình rồi vuốt hoặc bấm next sang ảnh kế. Vị trí nào chưa có ảnh thì hiện khung giữ chỗ đẹp mắt.

Cần script riêng vì `next/image` không tự tối ưu ảnh khi export tĩnh. Ticket này cũng nối component ảnh vào ảnh bìa Hero, ảnh Intro và QR ngân hàng trong hộp Quà mừng.

**Blocked by:** 03 (Thiệp vuốt để mở + nhạc nền), 06 (Các phần nội dung), 07 (Thanh công cụ nổi + hộp Quà mừng)

**Status:** ready-for-agent

- [ ] `pnpm photos` dùng `sharp` chuyển ảnh gốc sang WebP ở vài độ rộng cố định và ghi vào thư mục tĩnh
- [ ] Component ảnh nhận tên ảnh rồi dựng `srcset` và `sizes`. Giá trị `null` thì hiện khung giữ chỗ
- [ ] Ảnh bìa, ảnh intro, QR ngân hàng và khoảng 12 ảnh gallery đều dùng component này
- [ ] Gallery dạng lưới nằm giữa Interview và Save The Date
- [ ] Chạm một ảnh thì mở yet-another-react-lightbox toàn màn hình, vuốt hoặc bấm next sang ảnh kế
- [ ] Test e2e (dùng vài ảnh mẫu cho test): chạm ảnh thì mở lightbox, bấm next thì sang ảnh kế tiếp
- [ ] Test e2e: gallery toàn `null` vẫn render khung giữ chỗ, không có ảnh hỏng
