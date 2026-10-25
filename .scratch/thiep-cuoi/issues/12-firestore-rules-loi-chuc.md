# 12: Security rules Firestore cho `wishes` + `test:rules` trên emulator

**What to build:** (Giai đoạn 2) Khách gửi được lời chúc mà không cần đăng nhập, nhưng không ai sửa hay xoá được lời chúc của bất kỳ ai, kể cả khi gọi thẳng vào Firestore mà không qua thiệp. Chủ thiệp vẫn xoá được lời chúc không phù hợp trong Firebase Console. Bảo mật dựa hoàn toàn vào security rules, vì cấu hình Firebase cho web là thông tin công khai.

Mỗi document trong collection `wishes` có dạng:

```ts
type Wish = {
  name: string;        // 1–50 ký tự sau khi trim
  message: string;     // 1–500 ký tự sau khi trim
  createdAt: Timestamp; // serverTimestamp()
};
```

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] `read` được phép
- [ ] `create` chỉ được phép khi document có đúng ba khoá `name`, `message`, `createdAt`; `name` và `message` là chuỗi trong giới hạn độ dài; `createdAt == request.time`
- [ ] `update` và `delete` bị cấm
- [ ] Có script `test:rules` trong package.json, chạy `@firebase/rules-unit-testing` trên Firestore emulator
- [ ] Test: `create` hợp lệ được chấp nhận; `read` được chấp nhận
- [ ] Test bị từ chối: thiếu trường, thừa trường, sai kiểu, `name` dài hơn 50, `message` dài hơn 500, chuỗi rỗng, `createdAt` không phải thời gian của server
- [ ] Test: `update` và `delete` bị từ chối
