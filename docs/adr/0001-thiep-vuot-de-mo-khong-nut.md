# Thiệp mở bằng cách vuốt lên, không có nút "Mở thiệp" hay SKIP

Màn mở đầu ban đầu là phong bì kèm nút "Mở thiệp" và nút SKIP (commit `3564fc6`). Chủ thiệp muốn mở đầu tối giản hơn: khách vuốt lên để mở, và giao diện không có nút nào. Sau khi thử prototype (nhánh `prototype/phong-bi`), hình ảnh mở đầu là một Phong bì ngang có Dấu niêm phong; vuốt lên thì dấu nứt, nắp lật và Thiệp trồi ra. Ai sau này thấy trang không có nút và muốn "sửa" bằng cách thêm nút thì đây là quyết định có chủ ý.

## Consequences

- **Vẫn phải mở được khi không vuốt.** Có các cách mở dự phòng không hiện trên giao diện: chạm hoặc click vào Thiệp, phím Enter/Space/mũi tên lên, lăn chuột, và `aria-label="Mở thiệp"` cho trình đọc màn hình. Một dòng chữ mờ "Vuốt lên để mở thiệp" thay cho nút.
- **Không có SKIP.** Bù lại, hiệu ứng mở ngắn hơn 1 giây, và chạm thêm lần nữa trong lúc đang mở thì hiệu ứng tua tới cuối. Máy bật giảm chuyển động thì chỉ có hiệu ứng mờ dần.
- **Rủi ro nhạc nền trên iOS.** Trình duyệt chỉ cho phát nhạc trong một cử chỉ của người dùng. Một cú vuốt kết thúc bằng `touchend`/`pointerup` thường được tính là cử chỉ, nhưng điều này phải kiểm tra bằng tay trên iPhone thật với Safari. Nếu bị chặn, nút nhạc nổi vẫn hiện đúng trạng thái "đang tắt" để khách tự bật.
- **Không nhớ trạng thái.** Tải lại trang thì Thiệp lại đóng.

## Considered Options

- Giữ nút "Mở thiệp": rõ ràng nhất và chắc chắn bật được nhạc, nhưng trái với phong cách tối giản chủ thiệp muốn.
- Chỉ cần chạm vào Thiệp để mở: đơn giản, nhưng thiếu cảm giác lật thiệp thật. Cách này được giữ lại làm cách dự phòng.
