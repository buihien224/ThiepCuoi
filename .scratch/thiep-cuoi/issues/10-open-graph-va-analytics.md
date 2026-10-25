# 10: Open Graph + Cloudflare Web Analytics

**What to build:** Khách nhận link qua Zalo/Messenger thấy bản xem trước có ảnh bìa, tiêu đề và mô tả của thiệp. Chủ thiệp xem được số lượt truy cập qua Cloudflare Web Analytics mà không cần banner cookie.

**Blocked by:** 02 (Script `wizard` + triển khai), 08 (Pipeline ảnh + component ảnh + Gallery có lightbox)

**Status:** ready-for-agent

- [ ] Metadata Open Graph (ảnh bìa, tiêu đề, mô tả) lấy từ module cấu hình, dùng URL tuyệt đối dựa trên `siteUrl`
- [ ] Ảnh OG là một kích cỡ WebP/JPEG phù hợp sinh từ ảnh bìa, có ảnh dự phòng khi ảnh bìa là `null`
- [ ] Gắn beacon Cloudflare Web Analytics (không dùng cookie)
- [ ] Test e2e: HTML build ra có đủ `og:title`, `og:description`, `og:image` (URL tuyệt đối) và `og:url`
- [ ] Kiểm bằng tay: dán link `hienlinh.com` vào Zalo và Messenger thì thấy bản xem trước đúng
