# 07: Thanh công cụ nổi + hộp Quà mừng

**What to build:** Ở bất kỳ đâu trên trang, khách đều thấy một thanh công cụ nổi. Bấm "Quà mừng" sẽ mở hộp thoại hiện tài khoản chú rể trước rồi đến cô dâu. Mỗi tài khoản có QR, số tài khoản, tên chủ tài khoản và ngân hàng. Bấm "Sao chép" thì số tài khoản vào clipboard và hiện toast "Đã sao chép".

Thanh công cụ được dựng sao cho các ticket sau thêm được nút Chia sẻ, Bắn tim và Lời chúc.

**Blocked by:** 03 (Thiệp vuốt để mở + nhạc nền)

**Status:** ready-for-agent

- [ ] Thanh công cụ nổi nằm ngoài luồng cuộn, luôn hiện trên màn hình, không che nút nhạc
- [ ] Hộp Quà mừng dùng dialog của shadcn/ui có sẵn trong repo
- [ ] Thứ tự tài khoản đúng thứ tự mảng `gifts` trong cấu hình (chú rể trước, cô dâu sau)
- [ ] QR ngân hàng tạm hiện khung giữ chỗ (mọi `qr` trong cấu hình đang là `null`). Ticket 08 sẽ nối component ảnh vào
- [ ] Nút "Sao chép" copy đúng số tài khoản và hiện toast "Đã sao chép" (sonner)
- [ ] Test e2e: tài khoản chú rể đứng trước cô dâu
- [ ] Test e2e: bấm "Sao chép" thì clipboard chứa đúng số tài khoản và toast "Đã sao chép" xuất hiện
