# 13: Hộp lời chúc trên thiệp

**What to build:** (Giai đoạn 2) Khách mở hộp lời chúc từ thanh công cụ nổi, nhập tên và lời chúc rồi gửi, không cần đăng nhập. Khách mở bằng link riêng thì ô tên đã điền sẵn tên của mình. Khách biết trước giới hạn độ dài, thấy lời chúc của mình hiện ra ngay sau khi gửi, và xem được lời chúc của mọi người (mới nhất ở trên cùng) tự cập nhật khi có người gửi thêm. Khi gửi thất bại, khách thấy thông báo lỗi dễ hiểu để biết cách thử lại. Vẫn gửi được sau ngày cưới.

**Blocked by:** 02 (Script `wizard` + triển khai), 04 (Kính mời theo tên khách + trang `/tao-link`), 07 (Thanh công cụ nổi + hộp Quà mừng), 12 (Security rules Firestore cho `wishes`)

**Status:** ready-for-agent

- [ ] Thêm nút Lời chúc vào thanh công cụ nổi, mở hộp thoại có form (shadcn/ui)
- [ ] Firebase JS SDK chỉ tải khi khách mở hộp lời chúc, không có trong bundle ban đầu. Không dùng Firebase Auth
- [ ] Cấu hình Firebase lấy từ biến môi trường `NEXT_PUBLIC_*` lúc build
- [ ] Mở rộng script `wizard` của ticket 02 thêm các bước Firebase: tạo project, bật Firestore, deploy security rules của ticket 12, khai báo biến `NEXT_PUBLIC_*` trên Cloudflare Pages
- [ ] Ô tên tự điền từ `?to=` qua đúng hàm giải mã dùng chung của ticket 04
- [ ] Form hiện giới hạn (tên 50, lời chúc 500 ký tự), bộ đếm ký tự, và chặn gửi khi rỗng hoặc quá dài
- [ ] Danh sách dùng `onSnapshot` trên truy vấn `orderBy('createdAt', 'desc')`, có giới hạn số bản ghi mỗi lần tải. Lời chúc vừa gửi hiện ngay nhờ latency compensation
- [ ] Lỗi mạng hoặc bị rules từ chối hiện thông báo tiếng Việt dễ hiểu
- [ ] Tên và lời chúc hiển thị dạng chữ thường, không chèn HTML
- [ ] Test e2e chạy cùng Firestore emulator: gửi một lời chúc thì nó xuất hiện ở đầu danh sách; mở bằng `?to=` thì ô tên đã điền sẵn
