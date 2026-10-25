# 02: Script `wizard` + triển khai `hienlinh.com` lên Cloudflare Pages

**What to build:** Chủ thiệp chạy một script `wizard` hướng dẫn từng bước những việc chỉ mình làm được: mua tên miền `hienlinh.com` qua Cloudflare Registrar; tạo tài khoản GitHub và Cloudflare; tạo repo private và push code lên; gắn Cloudflare Pages để build tự động mỗi lần push; gắn domain. Xong bước cuối, mở `hienlinh.com` trên điện thoại sẽ thấy bìa Hero của ticket 01. Từ đó, mỗi lần sửa cấu hình rồi push lên là khách thấy bản mới ở đúng link cũ.

Làm ticket này ngay sau 01 để lỗi build trên Cloudflare Pages (phiên bản Node/pnpm, thư mục output) lộ ra từ sớm, không dồn đến sát hạn chót 01/11. Các bước Firebase thuộc ticket 13.

**Blocked by:** 01 (Khung export tĩnh + bìa Hero + bộ test Playwright)

**Status:** ready-for-agent

- [ ] Script `wizard` (dùng skill `/wizard`) đi qua từng bước kể trên. Chạy lại được, và kết thúc bằng bước mở `hienlinh.com` để kiểm tra
- [ ] Cấu hình build của Cloudflare Pages (lệnh build, thư mục output, phiên bản Node/pnpm) được ghi rõ trong wizard
- [ ] Sau khi chủ thiệp chạy wizard: `hienlinh.com` phục vụ bản build tĩnh qua HTTPS
- [ ] Push một thay đổi nhỏ trong cấu hình thì `hienlinh.com` tự cập nhật
