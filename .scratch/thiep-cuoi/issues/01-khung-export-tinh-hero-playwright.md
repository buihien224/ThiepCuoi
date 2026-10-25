# 01: Khung export tĩnh + bìa Hero + bộ test Playwright

**What to build:** Khách mở `hienlinh.com` trên điện thoại và thấy bìa tạp chí nền kem, chữ vàng lớn "Our Love Begins", tên cô dâu và chú rể, cùng tên bố mẹ và địa chỉ của nhà trai và nhà gái. Toàn bộ nội dung lấy từ module cấu hình `wedding`. Trang được build thành site tĩnh hoàn toàn, và repo có sẵn bộ test Playwright chạy trên bản build đó. Mọi ticket sau sẽ dựa vào nền này.

Đây là ticket nền (prefactor): thay sạch phần mẫu của create-next-app (font Geist, `lang="en"`, trang chủ mẫu), bật `output: 'export'`, và kiểm tra xem `cacheComponents` và `partialPrefetching` có dùng được cùng export tĩnh không. Tắt hai tuỳ chọn này nếu chúng xung đột.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [x] `pnpm build` sinh ra thư mục output tĩnh, không có server, API route hay Server Action
- [x] `<html lang="vi">`. Playfair Display (tiêu đề) và Dancing Script (chữ viết tay) tải qua `next/font/google` với subset `vietnamese`, chữ tiếng Việt hiện đúng dấu
- [x] Tông màu kem và vàng được khai báo thành token dùng chung trong Tailwind v4
- [x] Bìa Hero hiện "Our Love Begins", tên cô dâu và chú rể, tên bố mẹ và địa chỉ hai bên, tất cả lấy từ cấu hình chứ không hard-code
- [x] Bố cục ưu tiên màn hình dọc
- [x] Có script `test:e2e` trong package.json: build, phục vụ thư mục tĩnh, rồi chạy Playwright ở viewport điện thoại (và có một project viewport desktop)
- [x] Test đầu tiên: trang chủ hiện "Our Love Begins" và tên đầy đủ của cô dâu và chú rể
