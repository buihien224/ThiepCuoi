# 04: Kính mời theo tên khách + trang `/tao-link`

**What to build:** Khách mở link riêng `?to=<tên>` thì thấy dòng "Kính mời: <tên mình>" hiện đúng dấu. Mở link chung thì không có dòng này. Chủ thiệp vào trang ẩn `/tao-link`, gõ tên khách và copy được link riêng để gửi qua Zalo/Messenger.

Logic mã hoá (tạo link) và giải mã (đọc `?to=`) nằm trong **một hàm duy nhất** dùng chung cho cả hai phía, để hai chiều luôn khớp nhau. Link có dạng `siteUrl + "/?to=" + encodeURIComponent(tên đã cắt khoảng trắng hai đầu)`.

**Blocked by:** 03 (Thiệp vuốt để mở + nhạc nền)

**Status:** ready-for-agent

- [ ] `?to=` chỉ được đọc trên trình duyệt sau khi trang đã chạy
- [ ] `?to=Nguyễn%20Văn%20A` hiện "Kính mời: Nguyễn Văn A"
- [ ] Không có `?to=`, `?to=` rỗng hoặc chỉ có dấu cách thì không có dòng Kính mời (không hiện trống, không hiện "undefined")
- [ ] `?to=<script>…` hiện đúng chuỗi đó dạng chữ thường, không bao giờ chèn vào HTML
- [ ] `/tao-link` không được gắn link ở đâu, có `robots: noindex`, không có mật khẩu
- [ ] Trên `/tao-link`: gõ tên rồi bấm copy thì clipboard chứa link đúng dạng, có thông báo đã copy
- [ ] Test e2e hai chiều: gõ tên có dấu, dấu cách và `&` trên `/tao-link`, copy link, mở link đó thì thấy đúng tên
- [ ] Test: HTML của `/tao-link` có `noindex`
