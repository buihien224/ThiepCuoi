# 06: Các phần nội dung: Lời mời, Interview, Save The Date, Location, Lời kết

**What to build:** Cuộn xuống dưới đếm ngược, khách lần lượt đọc lời mời "TRÂN TRỌNG KÍNH MỜI", phần hỏi đáp "Interview — Câu chuyện của chúng mình" kiểu tạp chí, khối Save The Date có lịch tháng 11/2026, phần Location có bản đồ và nút chỉ đường, cuối cùng là lời kết và footer. Mọi nội dung lấy từ cấu hình, nên chủ thiệp thêm, bớt hoặc sửa câu Interview chỉ bằng cách sửa file cấu hình.

**Blocked by:** 03 (Thiệp vuốt để mở + nhạc nền)

**Status:** ready-for-agent

- [ ] Thứ tự đúng như spec: … Đếm ngược → Lời mời → Interview → (chỗ cho Gallery) → Save The Date → Location → Lời kết và footer
- [ ] Interview render từ mảng trong cấu hình: thêm hoặc bớt phần tử thì giao diện đổi theo
- [ ] Save The Date hiện giờ, thứ, ngày dương lịch và ngày âm lịch trong ngoặc, dùng các nhãn viết sẵn trong cấu hình
- [ ] Lịch tháng 11/2026 dạng lưới, ngày 28 được đánh dấu trái tim
- [ ] Location hiện tên nhà hàng, sảnh và địa chỉ. Bản đồ Google Maps nhúng chỉ hiện khi có `mapEmbedUrl`, còn `null` thì không có khung bản đồ hỏng
- [ ] Nút "Mở Google Maps" mở `mapUrl`
- [ ] Lời kết có câu "hẹn gặp bạn" và khối "28 Nov 2026 INVITATION"
- [ ] Test e2e: các câu hỏi Interview trong cấu hình đều hiện. Khi `mapEmbedUrl` là `null` thì không có iframe bản đồ. Nút Google Maps trỏ đúng `mapUrl`
