# 11: Cánh hoa rơi + hiện dần khi cuộn + bố cục desktop

**What to build:** Suốt thiệp có cánh hoa rơi nhẹ mà không làm điện thoại đời cũ giật lag. Các phần hiện dần lên khi khách cuộn tới. Trên máy tính, thiệp có bố cục gọn gàng, không bị kéo giãn. Khách đã bật "giảm chuyển động" trong máy thì hiệu ứng được giảm bớt hoặc tắt.

**Blocked by:** 03 (Thiệp vuốt để mở + nhạc nền), 06 (Các phần nội dung), 08 (Pipeline ảnh + component ảnh + Gallery có lightbox)

**Status:** ready-for-agent

- [ ] Cánh hoa tự vẽ trên một canvas nằm ngoài luồng cuộn, không chặn chạm hay click vào nội dung
- [ ] Dùng `requestAnimationFrame`, giới hạn số cánh, tạm dừng khi tab bị ẩn
- [ ] Có `prefers-reduced-motion` thì tắt cánh hoa, bỏ hiệu ứng hiện dần, và giảm hiệu ứng Mở thiệp
- [ ] Các phần hiện dần khi cuộn tới (Motion)
- [ ] Viewport desktop: nội dung có độ rộng tối đa hợp lý và căn giữa, không bị kéo giãn
- [ ] Không viết test tự động cho hiệu ứng. Kiểm bằng tay trên điện thoại thật, và các test e2e hiện có vẫn pass
