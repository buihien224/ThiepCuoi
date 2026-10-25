# 05: Đếm ngược theo giờ Việt Nam

**What to build:** Khách thấy đồng hồ đếm ngược ngày, giờ, phút, giây đến lễ cưới, tính theo giờ Việt Nam dù khách đang ở múi giờ nào. Sau giờ cưới, đồng hồ được thay bằng dòng "Chúng mình đã về chung một nhà ♥".

**Blocked by:** 03 (Thiệp vuốt để mở + nhạc nền)

**Status:** ready-for-agent

- [ ] Đếm ngược tính bằng `weddingDate - now` (ngày giờ lưu dạng ISO có offset `+07:00`), cập nhật mỗi giây
- [ ] Phần đếm ngược chỉ render phía trình duyệt, không có cảnh báo hydration mismatch
- [ ] Khi thời gian còn lại ≤ 0 thì hiện "Chúng mình đã về chung một nhà ♥" và không bao giờ hiện số âm
- [ ] Đếm ngược nằm sau bìa Hero (và sau dòng Kính mời của ticket 04 nếu đã có), trước phần Lời mời
- [ ] Test e2e dùng `page.clock` cố định thời gian trước ngày cưới để kiểm các con số ngày/giờ/phút/giây
- [ ] Test e2e dùng `page.clock` cố định thời gian sau ngày cưới để kiểm câu "đã về chung một nhà"
