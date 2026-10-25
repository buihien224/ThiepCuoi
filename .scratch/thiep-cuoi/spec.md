# Spec: Thiệp cưới online Hiền & Linh

Status: ready-for-agent

## Problem Statement

Bùi Đức Hiền và Phan Thị Mai Linh cưới vào **Thứ Bảy, 28/11/2026**. Hai bạn cần gửi thiệp mời cho khách qua Zalo/Messenger **trước 01/11/2026**. Thiệp giấy hay ảnh chụp thiệp không gọi được tên riêng từng khách, không chỉ đường, không có chỗ gửi quà mừng hay lời chúc, và sai một chữ là phải gửi lại cho tất cả. Hai bạn muốn một thiệp online đẹp, mở nhanh trên điện thoại, mời đích danh từng khách, và vẫn sửa được nội dung sau khi đã gửi link.

## Solution

Làm một trang web tĩnh tại **`hienlinh.com`**, bố cục kiểu tạp chí lấy cảm hứng từ mẫu C61 "Our Love Begins", dùng ảnh, font, chữ và nhạc riêng. Chỉ có **một phiên bản thiệp**, vì hai bên tổ chức chung một tiệc.

- Khách mở link (có thể kèm `?to=<tên>`) và thấy một tấm Thiệp tối giản trên nền trắng. Khách vuốt Thiệp lên để mở, nhạc bắt đầu phát, và Lòng thiệp hiện ngày giờ, nơi tổ chức. Sau đó khách cuộn qua bìa, lời mời gọi tên mình, đếm ngược, câu chuyện, ảnh, ngày giờ và bản đồ.
- Thanh công cụ nổi có các nút: Quà mừng, Bắn tim, Chia sẻ. Giai đoạn 2 thêm nút mở hộp lời chúc.
- Trang ẩn `/tao-link` giúp chủ thiệp tạo link riêng cho từng khách.
- Toàn bộ nội dung nằm trong một file cấu hình. Chủ thiệp sửa file này, push lên, Cloudflare Pages tự build lại, và link cũ vẫn dùng được.

Làm theo hai giai đoạn:

- **Giai đoạn 1** (trước 01/11): toàn bộ phần tĩnh.
- **Giai đoạn 2** (sau khi đã gửi link): hộp lời chúc dùng Firebase Firestore.

## User Stories

### Mở thiệp

1. Là khách, tôi muốn thấy một tấm Thiệp đang đóng trên nền trắng, có tên cô dâu chú rể và Dấu niêm phong chữ 囍, khi vừa mở link, để có cảm giác như đang mở một tấm thiệp thật.
2. Là khách, tôi muốn vuốt Thiệp lên để mở, có dòng gợi ý "Vuốt lên để mở thiệp" chứ không cần nút, và thấy ngay Lòng thiệp ghi lời mời, thứ, ngày, giờ, ngày âm lịch, nhà hàng và địa chỉ.
3. Là khách dùng chuột, bàn phím hoặc trình đọc màn hình, tôi muốn mở được Thiệp bằng cách chạm/click, nhấn phím hoặc lăn chuột, và hiệu ứng mở đủ ngắn (chạm thêm thì tua tới cuối), để không phải chờ.
4. Là khách, tôi muốn nhạc nền bắt đầu phát khi tôi Mở thiệp, để không khí thêm lãng mạn (trình duyệt chặn tự phát nhạc trước khi người dùng chạm).
5. Là khách, tôi muốn có icon nổi để bật/tắt nhạc, để tắt nhạc khi đang ở chỗ đông người.
6. Là khách, tôi muốn icon nhạc thể hiện đúng trạng thái đang phát hay đang tắt, để không phải đoán.

### Hiệu ứng nền

7. Là khách, tôi muốn thấy cánh hoa rơi nhẹ suốt thiệp, để thiệp có cảm giác sống động.
8. Là khách dùng điện thoại đời cũ, tôi muốn hiệu ứng cánh hoa không làm trang giật lag, để vẫn cuộn mượt.
9. Là khách đã bật "giảm chuyển động" trong máy, tôi muốn hiệu ứng được giảm bớt hoặc tắt, để không bị khó chịu.

### Bìa tạp chí

10. Là khách, tôi muốn thấy bìa nền kem với chữ vàng lớn "Our Love Begins", để nhận ra ngay đây là thiệp cưới.
11. Là khách, tôi muốn thấy tên cô dâu và chú rể trên bìa, để biết đây là đám cưới của ai.
12. Là khách lớn tuổi, tôi muốn thấy tên bố mẹ và địa chỉ của cả nhà trai lẫn nhà gái, để biết đây là con nhà nào theo đúng phong tục.

### Lời mời theo từng khách

13. Là khách được mời đích danh, tôi muốn thấy dòng "Kính mời: <tên tôi>", để thấy mình được mời trân trọng.
14. Là khách, tôi muốn tên mình có dấu tiếng Việt và ký tự đặc biệt hiển thị đúng, để không bị sai tên.
15. Là khách mở link chung không có `?to=`, tôi muốn dòng "Kính mời" bị ẩn đi thay vì hiện trống hay hiện "undefined".
16. Là chủ thiệp, tôi muốn chuỗi `?to=` chỉ hiện ra dưới dạng chữ thường, để không ai chèn được mã HTML hay script vào thiệp.

### Đếm ngược

17. Là khách, tôi muốn thấy đếm ngược theo ngày, giờ, phút, giây đến lễ cưới, để biết còn bao lâu nữa.
18. Là khách ở múi giờ khác, tôi muốn đếm ngược tính theo giờ Việt Nam, để mốc thời gian không bị lệch.
19. Là khách mở thiệp sau giờ cưới, tôi muốn thấy dòng "Chúng mình đã về chung một nhà ♥" thay cho đồng hồ, để không thấy số âm.

### Lời mời và Interview

20. Là khách, tôi muốn đọc lời mời "TRÂN TRỌNG KÍNH MỜI" kèm một đoạn văn ấm áp, để cảm nhận được tấm lòng của cô dâu chú rể.
21. Là khách, tôi muốn đọc phần "Interview — Câu chuyện của chúng mình" dạng hỏi đáp kiểu tạp chí, để biết thêm chuyện tình của hai bạn.
22. Là chủ thiệp, tôi muốn thêm, bớt hoặc sửa câu hỏi Interview trong file cấu hình, để thay nội dung mẫu bằng chuyện thật.

### Gallery

23. Là khách, tôi muốn xem ảnh cưới dạng lưới, để lướt nhanh qua tất cả ảnh.
24. Là khách, tôi muốn chạm vào một ảnh để xem toàn màn hình, để thấy ảnh rõ hơn.
25. Là khách trên điện thoại, tôi muốn vuốt qua lại giữa các ảnh khi đang xem toàn màn hình, để xem liên tục.
26. Là khách mạng yếu, tôi muốn ảnh tải nhanh với kích cỡ hợp với màn hình, để không phải chờ lâu hay tốn dữ liệu.
27. Là chủ thiệp, tôi muốn những ảnh chưa có hiện khung giữ chỗ đẹp mắt, để gửi link được trước khi có đủ ảnh.

### Save The Date

28. Là khách, tôi muốn thấy giờ, thứ, ngày dương lịch và ngày âm lịch trong ngoặc, để nhớ ngày theo cách quen thuộc với mình.
29. Là khách, tôi muốn thấy lịch tháng 11/2026 dạng lưới với ngày 28 đánh dấu trái tim, để hình dung ngày cưới rơi vào đâu trong tháng.

### Location

30. Là khách, tôi muốn thấy tên và địa chỉ nhà hàng, để biết tiệc tổ chức ở đâu.
31. Là khách, tôi muốn xem bản đồ Google Maps nhúng ngay trong thiệp, để nhìn vị trí mà không phải rời trang.
32. Là khách, tôi muốn có nút mở Google Maps, để chỉ đường bằng ứng dụng bản đồ trên điện thoại.
33. Là chủ thiệp, tôi muốn khi chưa có link nhúng bản đồ thì thiệp không hiện khung bản đồ bị lỗi.

### Lời kết

34. Là khách, tôi muốn thấy câu kết "hẹn gặp bạn" và khối "28 Nov 2026 INVITATION", để thiệp có phần kết trọn vẹn.

### Thanh công cụ nổi

35. Là khách, tôi muốn thanh công cụ luôn nổi trên màn hình, để dùng được ở bất kỳ đâu trên trang.
36. Là khách muốn gửi quà mừng, tôi muốn mở hộp Quà mừng thấy tài khoản chú rể trước rồi đến cô dâu, mỗi tài khoản có QR, số tài khoản, tên chủ tài khoản và ngân hàng.
37. Là khách, tôi muốn bấm "Sao chép" để copy số tài khoản và thấy thông báo "Đã sao chép", để dán vào app ngân hàng mà không phải gõ tay.
38. Là khách, tôi muốn bấm Bắn tim để thấy tim bay lên trên màn hình mình, để bày tỏ cảm xúc cho vui (không đếm, không lưu).
39. Là khách, tôi muốn bấm Chia sẻ để dùng tính năng chia sẻ của điện thoại, hoặc copy link nếu máy không hỗ trợ.
40. Là khách, tôi muốn thấy mã QR của chính thiệp trong hộp Chia sẻ, để người bên cạnh quét được ngay.
41. Là khách, tôi muốn link chia sẻ là link chung không kèm tên mình, để người nhận không thấy "Kính mời: <tên tôi>".

### Trang tạo link

42. Là chủ thiệp, tôi muốn vào `/tao-link`, gõ tên khách và copy được link `https://hienlinh.com/?to=<tên đã mã hoá>`, để gửi link riêng cho từng người.
43. Là chủ thiệp, tôi muốn trang `/tao-link` không được gắn link ở đâu và không bị công cụ tìm kiếm index, để khách không vô tình tìm thấy.
44. Là chủ thiệp, tôi muốn tên có dấu, dấu cách và ký tự `&` được mã hoá đúng trong link, để khách mở ra thấy đúng tên mình.

### Chia sẻ qua Zalo/Messenger

45. Là khách nhận link qua Zalo/Messenger, tôi muốn link hiện bản xem trước có ảnh bìa, tiêu đề và mô tả, để biết ngay đây là thiệp cưới của ai.

### Giao diện chung

46. Là khách dùng điện thoại, tôi muốn thiệp được thiết kế ưu tiên cho màn hình dọc, để đọc thoải mái.
47. Là khách dùng máy tính, tôi muốn thiệp có bố cục desktop gọn gàng, không bị kéo giãn xấu.
48. Là khách, tôi muốn mọi chữ tiếng Việt hiển thị đúng dấu ở cả font tiêu đề lẫn font viết tay.
49. Là khách, tôi muốn thấy các phần hiện dần lên khi cuộn tới, để thiệp có cảm giác chuyển động nhẹ nhàng.

### Chủ thiệp sửa nội dung

50. Là chủ thiệp, tôi muốn mọi nội dung (tên, ngày giờ, bố mẹ, địa chỉ, nhà hàng, interview, tài khoản, nhạc, ảnh) nằm trong một file cấu hình, để thay nhanh mà không phải đụng vào giao diện.
51. Là chủ thiệp, tôi muốn bỏ ảnh gốc vào một thư mục rồi chạy một lệnh để sinh ảnh WebP nhiều kích cỡ, để không phải tự resize.
52. Là chủ thiệp, tôi muốn sửa nội dung, push lên, rồi khách tự thấy bản mới ở đúng link cũ.
53. Là chủ thiệp, tôi muốn có script `wizard` hướng dẫn từng bước mua tên miền và tạo tài khoản Cloudflare, Firebase, GitHub, vì đây là những bước chỉ mình làm được.
54. Là chủ thiệp, tôi muốn xem số lượt truy cập qua Cloudflare Web Analytics mà không cần banner xin phép cookie.

### Giai đoạn 2 — Hộp lời chúc

55. Là khách, tôi muốn mở hộp lời chúc từ thanh công cụ nổi, để gửi lời chúc cho cô dâu chú rể.
56. Là khách, tôi muốn gửi lời chúc chỉ với tên và nội dung, không cần đăng nhập.
57. Là khách mở bằng link riêng, tôi muốn ô tên tự điền sẵn tên trong `?to=`, để đỡ phải gõ.
58. Là khách, tôi muốn biết giới hạn độ dài (tên 50 ký tự, lời chúc 500 ký tự) trước khi gửi, để không bị từ chối bất ngờ.
59. Là khách, tôi muốn thấy lời chúc của mình xuất hiện ngay sau khi gửi.
60. Là khách, tôi muốn thấy lời chúc của người khác, mới nhất ở trên cùng, và tự cập nhật khi có người gửi thêm.
61. Là khách, tôi muốn thấy thông báo lỗi dễ hiểu khi gửi thất bại (mất mạng, quá dài), để biết cách thử lại.
62. Là khách, tôi muốn vẫn gửi được lời chúc sau ngày cưới.
63. Là chủ thiệp, tôi muốn xoá lời chúc không phù hợp trong Firebase Console.
64. Là chủ thiệp, tôi muốn khách không sửa hay xoá được lời chúc của bất kỳ ai, kể cả khi gọi thẳng vào Firestore mà không qua thiệp.

## Implementation Decisions

**Nền tảng**

- Next.js bản ổn định mới nhất, App Router, TypeScript, pnpm.
- Build tĩnh bằng `output: 'export'`. Không dùng server, API route hay Server Action nào chạy lúc khách xem thiệp.
- Hosting: repo GitHub private, Cloudflare Pages tự build mỗi lần push, tên miền `hienlinh.com` mua qua Cloudflare Registrar, đo truy cập bằng Cloudflare Web Analytics (không dùng cookie).
- Giao diện: Tailwind CSS v4, Motion cho hiệu ứng, shadcn/ui cho dialog, toast "Đã sao chép" và form lời chúc. Repo đã có sẵn button, dialog và sonner. Gallery dùng yet-another-react-lightbox, QR dùng qrcode.react.
- Font tải qua `next/font/google` với subset `vietnamese`: Playfair Display cho tiêu đề, Dancing Script cho chữ viết tay. Không dùng Great Vibes vì font này hiển thị sai dấu tiếng Việt.
- Tông màu kem và vàng. Nội dung chính bằng tiếng Việt. Các tiêu đề trang trí ("Our Love Begins", "Save The Date", "Interview") bằng tiếng Anh. Thẻ `<html>` khai báo `lang="vi"`.

**Module cấu hình nội dung** (đã có trong repo)

- Một object `wedding` chứa toàn bộ nội dung, cùng một hằng `weddingDate` đã parse sẵn. Không component nào hard-code nội dung.
- Chỗ trống ghi dạng `[...]`. Ảnh để `null` thì giao diện hiện khung giữ chỗ.
- Ngày giờ lưu dạng ISO có offset `+07:00`. Các nhãn (giờ, thứ, âm lịch) viết sẵn dạng chữ, không tính lúc chạy. Ngày âm lịch "20/10 Bính Ngọ" là tạm tính và cần kiểm lại.
- Thứ tự tài khoản trong mảng `gifts` chính là thứ tự hiển thị: chú rể trước, cô dâu sau.

**Cấu trúc trang**

- Trang chính `/` gồm các phần theo đúng thứ tự: Phong bì (che phủ lên trang; sau khi Mở thiệp là Lòng thiệp) → Hero (bìa) → Kính mời → Đếm ngược → Lời mời → Interview → Gallery → Save The Date → Location → Lời kết và footer. Thanh công cụ nổi, nút nhạc và lớp cánh hoa nằm ngoài luồng cuộn.
- Trang `/tao-link`: không gắn link từ đâu, khai báo `robots: noindex`, không có mật khẩu.
- Metadata Open Graph lấy từ module cấu hình: ảnh bìa, tiêu đề, mô tả, và URL tuyệt đối dựa trên `siteUrl`.

**Hành vi phía trình duyệt**

- `?to=` chỉ được đọc trên trình duyệt sau khi trang đã chạy, vì bản build tĩnh không biết query string. Tên được hiển thị dạng text, không bao giờ chèn vào HTML. Tham số rỗng hoặc chỉ có dấu cách thì ẩn dòng "Kính mời".
- Đếm ngược tính bằng `weddingDate - now` và cập nhật mỗi giây. Khi kết quả ≤ 0 thì hiện câu "Chúng mình đã về chung một nhà ♥". Phần này chỉ render phía trình duyệt để tránh lệch giữa HTML build sẵn và trình duyệt (hydration mismatch).
- Nhạc: một phần tử audio dùng chung cho cả trang, chỉ gọi `play()` trong cử chỉ Mở thiệp (thả tay sau khi vuốt, chạm hoặc nhấn phím). Nút bật/tắt phản ánh trạng thái thật của audio.
- Cánh hoa rơi: tự vẽ trên một canvas, dùng `requestAnimationFrame`, giới hạn số cánh, tạm dừng khi tab bị ẩn, và tôn trọng thiết lập `prefers-reduced-motion`.
- Bắn tim: hiệu ứng chỉ chạy trên máy người bấm. Không có state chung, không gọi mạng.
- Chia sẻ: dùng `navigator.share` khi trình duyệt hỗ trợ, nếu không thì copy link vào clipboard. Link chia sẻ luôn là `siteUrl` và không kèm `?to=`. QR trong hộp Chia sẻ trỏ tới `siteUrl`.
- `/tao-link` tạo link theo dạng `siteUrl + "/?to=" + encodeURIComponent(tên đã cắt khoảng trắng hai đầu)`. Logic này nằm trong một hàm duy nhất, dùng chung cho cả trang tạo link và phần đọc `?to=`, để mã hoá và giải mã luôn khớp nhau.

**Ảnh**

- Một script dùng `sharp` (chạy bằng `pnpm photos`) chuyển ảnh gốc sang WebP ở vài độ rộng cố định và ghi kết quả vào thư mục tĩnh. Cần làm vậy vì `next/image` không tự tối ưu ảnh khi export tĩnh.
- Component ảnh nhận tên ảnh (không có đuôi file) rồi dựng `srcset`. Khi giá trị là `null` thì hiện khung giữ chỗ.
- Tổng cộng khoảng 13 vị trí ảnh: 1 ảnh bìa và khoảng 12 ảnh gallery. Thiệp không dùng ảnh.

**Giai đoạn 2 — Hộp lời chúc (Firestore)**

- Dùng Firebase JS SDK chạy trên trình duyệt, chỉ tải khi khách mở hộp lời chúc. Không dùng Firebase Auth.
- Collection `wishes`, mỗi document có dạng:

  ```ts
  type Wish = {
    name: string;        // 1–50 ký tự sau khi trim
    message: string;     // 1–500 ký tự sau khi trim
    createdAt: Timestamp; // serverTimestamp()
  };
  ```

- Security rules:
  - `read`: cho phép.
  - `create`: chỉ khi document có đúng ba khoá `name`, `message`, `createdAt`; `name` và `message` là chuỗi trong giới hạn độ dài; `createdAt == request.time`.
  - `update` và `delete`: cấm.
- Danh sách lấy bằng `onSnapshot` trên truy vấn `orderBy('createdAt', 'desc')`, có giới hạn số bản ghi mỗi lần tải. Lời chúc vừa gửi hiện ngay nhờ cơ chế latency compensation của Firestore.
- Cấu hình Firebase cho web là thông tin công khai, đưa vào qua biến môi trường `NEXT_PUBLIC_*` lúc build. Bảo mật dựa hoàn toàn vào security rules.
- Kiểm duyệt bằng cách xoá document trong Firebase Console. Không làm trang quản trị.

**Việc chỉ chủ thiệp làm được**

- Mua tên miền, tạo tài khoản Cloudflare, Firebase và GitHub, gắn domain vào Pages, khai báo biến môi trường: viết thành script `wizard` hướng dẫn từng bước.

## Testing Decisions

**Thế nào là một test tốt**: test chỉ kiểm tra hành vi bên ngoài mà khách hoặc chủ thiệp nhìn thấy, gồm chữ trên màn hình, link được copy và phản hồi của Firestore. Test không kiểm tra cấu trúc component, tên class hay state bên trong. Thay đổi giao diện mà không đổi hành vi thì test không được vỡ.

**Seam 1 — bản build tĩnh chạy trong trình duyệt (Playwright).** Đây là seam chính và cao nhất. Chạy `next build` rồi phục vụ thư mục output tĩnh, sau đó test bằng Playwright ở viewport điện thoại (và một vài ca ở viewport desktop):

- `?to=Nguyễn%20Văn%20A` hiện "Kính mời: Nguyễn Văn A". Không có `?to=`, hoặc `?to=` rỗng, thì không có dòng Kính mời. `?to=<script>…` hiện đúng chuỗi đó dạng chữ thường.
- Đếm ngược: dùng `page.clock` cố định thời gian trước ngày cưới để kiểm tra các con số, và sau ngày cưới để kiểm tra câu "đã về chung một nhà".
- Vuốt Thiệp lên, chạm vào Thiệp, hoặc nhấn Enter đều mở được Thiệp và vào nội dung chính. Kéo ngắn rồi thả thì Thiệp không mở. Lòng thiệp hiện đúng ngày giờ và nhà hàng theo cấu hình. Nút nhạc đổi trạng thái khi bấm.
- Hộp Quà mừng: tài khoản chú rể đứng trước cô dâu. Bấm "Sao chép" thì clipboard chứa đúng số tài khoản và toast "Đã sao chép" xuất hiện.
- `/tao-link`: gõ một tên có dấu và `&`, copy link, mở link đó thì thấy đúng tên (kiểm tra cả hai chiều mã hoá và giải mã).
- Chia sẻ: link được chia sẻ không chứa `?to=`.
- Gallery: chạm một ảnh thì mở lightbox, vuốt hoặc bấm next thì sang ảnh kế tiếp.
- HTML build ra có đủ các thẻ Open Graph. `/tao-link` có `noindex`.

**Seam 2 — Firestore security rules trên emulator (Giai đoạn 2).** Dùng `@firebase/rules-unit-testing` trên Firestore emulator:

- `create` hợp lệ được chấp nhận.
- Bị từ chối: thiếu trường, thừa trường, sai kiểu, `name` dài hơn 50, `message` dài hơn 500, chuỗi rỗng, `createdAt` không phải thời gian của server.
- `read` được chấp nhận. `update` và `delete` bị từ chối.

Luồng gửi và hiện lời chúc trên giao diện được kiểm bằng Seam 1, chạy cùng Firestore emulator.

**Không test**: hiệu ứng cánh hoa, hiệu ứng tim, độ mượt animation, thẩm mỹ bố cục. Những phần này kiểm tra bằng tay trên điện thoại thật.

**Prior art**: repo chưa có test nào. Đây sẽ là những test đầu tiên, và cần thêm script `test:e2e` (cùng `test:rules` cho Giai đoạn 2) vào package.json.

## Out of Scope

- RSVP (xác nhận tham dự).
- Nhiều phiên bản thiệp riêng cho nhà trai và nhà gái.
- Trang quản trị lời chúc. Kiểm duyệt làm trong Firebase Console.
- Bộ đếm tim chung hay lưu lượt bắn tim.
- Đăng nhập cho khách.
- Đa ngôn ngữ ngoài phần tiêu đề trang trí tiếng Anh.
- Tính ngày âm lịch lúc chạy. Ngày âm lịch được ghi sẵn trong cấu hình.

## Further Notes

- **Hạn chót**: gửi link trước 01/11/2026 nên Giai đoạn 1 phải xong trước ngày này. Giai đoạn 2 làm sau và triển khai lên cùng link.
- **Thứ tự cắt khi trễ hạn**: bắt buộc phải xong trước khi gửi link là ticket 01, 02, 03, 04, 05, 06, 07 và 10. Nếu không kịp thì làm sau khi đã gửi link (link cũ vẫn dùng được): 11 (cánh hoa, hiện dần, desktop), 09 (chia sẻ, bắn tim) và phần Analytics của 10. Ticket 08 vẫn gửi được với khung giữ chỗ nếu chưa đủ ảnh.
- **Nội dung chủ thiệp bổ sung sau** (dựng sẵn chỗ trống trước): khoảng 13 ảnh cưới; tên bố mẹ và địa chỉ hai bên; giờ cưới, tên và địa chỉ nhà hàng cùng link nhúng Google Maps; nội dung Interview; QR ngân hàng và số tài khoản của chú rể và cô dâu; bản nhạc nền (nếu muốn đổi; phải là nhạc không lời, miễn phí bản quyền).
- **Kiểm tra tay nhạc nền trên iPhone**: vuốt mở Thiệp trên Safari thật phải phát được nhạc (xem ADR-0001).
- **Kiểm lại ngày âm lịch** của 28/11/2026 trước khi gửi link.
- **Tên miền** `hienlinh.com`: lúc kiểm tra ngày 25/10/2026 tên này chưa có ai đăng ký, nên mua sớm.
- **Lưu ý cấu hình hiện tại**: `next.config` đang bật `cacheComponents` và `partialPrefetching` nhưng chưa có `output: 'export'`. Cần kiểm tra hai tuỳ chọn này có dùng được cùng export tĩnh không, và tắt đi nếu xung đột. Trang chủ và layout vẫn là mẫu của create-next-app, dùng font Geist và `lang="en"`, cần thay hết.
- Mẫu tham khảo: C61 "Our Love Begins" (kiểu tạp chí). Chỉ lấy cảm hứng bố cục, không sao chép ảnh hay chữ.
