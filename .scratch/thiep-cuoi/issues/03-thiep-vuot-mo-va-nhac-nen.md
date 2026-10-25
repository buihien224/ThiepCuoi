# 03: Thiệp vuốt để mở + nhạc nền

**What to build:** Vừa mở link, khách thấy một tấm Thiệp tối giản trên nền trắng. Bìa trước có "Đức Hiền & Mai Linh" và Dấu niêm phong đỏ chữ 囍 ở giữa. Không có nút nào, chỉ có dòng chữ mờ "Vuốt lên để mở thiệp" kèm mũi tên nhấp nhô. Khách vuốt Thiệp lên thì Dấu niêm phong tách đôi, Bìa trước bay lên khỏi màn hình, và nhạc nền bắt đầu phát. Bên dưới là Lòng thiệp với lời mời và thông tin chính. Từ đó khách cuộn xuống Hero và các phần còn lại. Một icon nổi cho phép bật/tắt nhạc bất cứ lúc nào và luôn thể hiện đúng trạng thái thật.

Thuật ngữ theo `GLOSSARY.md`. Lý do không có nút hay SKIP: xem `docs/adr/0001-thiep-vuot-de-mo-khong-nut.md`.

**Làm lại:** Bản phong bì + nút "Mở thiệp"/SKIP đã implement ở commit `3564fc6`. Ticket này thay phần mở đầu đó. Phần audio dùng chung và icon nhạc nổi giữ nguyên, chỉ đổi nơi gọi `play()`.

Thiệp che nội dung chính nên mọi test e2e về sau đều phải mở nó trước. Vì vậy ticket này cung cấp helper test dùng chung cho các ticket sau.

**Blocked by:** 01 (Khung export tĩnh + bìa Hero + bộ test Playwright)

**Status:** ready-for-agent

**Bìa trước**

- [ ] Nền trắng, tối giản. Tên ngắn của chú rể và cô dâu ("Đức Hiền & Mai Linh") màu chữ tối, lấy từ cấu hình
- [ ] Dấu niêm phong sáp đỏ dập chữ 囍 ở giữa, vẽ bằng SVG (không dùng ảnh). Đây là màu nhấn duy nhất
- [ ] Dòng chữ mờ "Vuốt lên để mở thiệp" kèm mũi tên nhỏ nhấp nhô, Thiệp "thở" nhẹ để gợi ý
- [ ] Không có nút hiển thị, không có SKIP, không hiện tên khách (`?to=`)
- [ ] Trước khi mở: trang bị khoá cuộn, nội dung chính `inert` + `aria-hidden`

**Mở thiệp**

- [ ] Bìa trước đi theo ngón tay khi kéo lên (Motion `drag`). Kéo quá khoảng 30% chiều cao hoặc vuốt nhanh thì mở; thả sớm thì Bìa trước bật về chỗ cũ và trang vẫn bị khoá
- [ ] Khi mở: Dấu niêm phong tách đôi, Bìa trước bay lên khỏi màn hình, để lộ Lòng thiệp bên dưới. Cả hiệu ứng dưới 1 giây
- [ ] Chạm thêm lần nữa trong lúc đang mở thì hiệu ứng tua tới cuối
- [ ] Cách mở dự phòng, không hiện trên giao diện: chạm/click vào Thiệp, Enter, Space, mũi tên lên, lăn chuột. Thiệp có `aria-label="Mở thiệp"` và nhận được focus
- [ ] Có `prefers-reduced-motion`: không có hiệu ứng bay, mọi cách mở đều chuyển sang Lòng thiệp bằng một hiệu ứng mờ dần ngắn
- [ ] Tải lại trang thì Thiệp lại đóng (không lưu trạng thái)

**Lòng thiệp**

- [ ] Nền trắng tối giản, cao `100svh`, là phần đầu tiên của trang (ngay trên Hero)
- [ ] Nội dung lấy từ cấu hình: "Trân trọng kính mời" (`invitation.heading`); "Thứ Bảy · 28.11.2026 · 11 giờ 00"; ngày âm lịch; tên nhà hàng · sảnh; địa chỉ. Không có tên bố mẹ, không có bản đồ
- [ ] Gợi ý nhỏ "cuộn xuống" trỏ tới Hero
- [ ] Sau khi mở: trang hết khoá cuộn, nội dung chính hết `inert`, nút nhạc hiện ra

**Nhạc nền**

- [ ] Một phần tử audio dùng chung cho cả trang, nguồn nhạc lấy từ cấu hình. Chỉ gọi `play()` trong cử chỉ Mở thiệp (thả tay sau khi vuốt, chạm, phím)
- [ ] Icon nhạc nổi, nằm ngoài luồng cuộn, phản ánh trạng thái thật của audio (đang phát hay đã dừng), kể cả khi trình duyệt chặn phát nhạc

**Cấu hình**

- [ ] Xoá `intro.label`, `intro.letterTitle` và `photos.intro` khỏi `src/content/wedding.ts` (Thiệp không dùng ảnh)

**Test**

- [ ] Helper dùng chung `moThiep(page)` mở Thiệp bằng cách kéo chuột lên. Test của ticket 01 dùng helper này
- [ ] Test e2e: vuốt lên thì vào được nội dung chính
- [ ] Test e2e: chạm vào Thiệp thì mở; nhấn Enter khi Thiệp có focus thì mở
- [ ] Test e2e: kéo một đoạn ngắn rồi thả thì Thiệp không mở và trang vẫn bị khoá
- [ ] Test e2e: Lòng thiệp hiện đúng thứ, ngày, giờ và nhà hàng theo cấu hình
- [ ] Test e2e: bấm nút nhạc thì trạng thái nút đổi qua lại
- [ ] Xoá test SKIP
- [ ] Kiểm tra tay: trên iPhone thật với Safari, vuốt mở Thiệp thì nhạc phát

## Comments

**Quyết định từ prototype** (nhánh `prototype/phong-bi`, commit `ac77a4a`; chạy `pnpm dev`, mở `/?variant=A..E`):
câu hỏi "màn mở đầu trông thế nào?" đã chốt mẫu **C – Trắng lót hoa**. Nó thay phần "Bìa trước" ở trên:

- Phong bì ngang giấy trắng ngà (bốn tam giác gặp ở tâm), lót hoa nhí vàng, tên viết tay vàng trên vạt đáy.
- Dấu niêm phong sáp đỏ khắc chữ cái đầu tên hai bạn (không phải 囍).
- Mở kiểu "Bóc niêm": dấu nứt đôi, Nắp lật, Thiệp "Song hỷ + Lịch" nằm ngang trồi ra, Phong bì rơi xuống, Thiệp tan vào Lòng thiệp.
- Lòng thiệp là tấm Thiệp đó dựng dọc: lời mời, 囍, tên Chú rể / Cô dâu, tờ lịch khoanh tim, thứ · ngày · giờ, âm lịch, nhà hàng · sảnh, địa chỉ.
- Màu Phong bì và sáp là token `envelope*`, `wax*` trong `globals.css`.
