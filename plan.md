# Kế Hoạch Thiết Kế & Nâng Cấp Hệ Thống Thiệp Mời Đôi
## (Dual-Graduate Invitation Platform: Phan Thành Hưng & Lê Gia Yến)

---

## 1. Tổng Quan Kiến Trúc Nền Tảng (Dual-Host Architecture)

Hệ thống sẽ được mở rộng từ 1 hồ sơ sự kiện thành **Nền tảng thiệp mời đôi**, dùng chung 1 database Supabase và 1 domain Vercel nhưng vận hành 2 thế giới trải nghiệm hoàn toàn độc bản:

```
                                  [ HỆ THỐNG INVITATION ]
                                             │
                   ┌─────────────────────────┴─────────────────────────┐
                   ▼                                                   ▼
       [ PROFILE 1: THÀNH HƯNG ]                               [ PROFILE 2: GIA YẾN ]
  • Sự kiện: ĐH FPT Cần Thơ (25/10/2026)                  • Sự kiện: ĐH Cần Thơ (02/11/2026)
  • Tông màu: Crimson & Champagne Gold                    • Tông màu: Deep Burgundy & Vintage Romance
  • Phong cách: Scrapbook Collage & Cutout Sticker        • Phong cách: French Stationery Desk & Vinyl
  • Khách mời: Khách riêng của Hưng                       • Khách mời: Khách riêng của Én
```

---

## 2. Thông Tin Sự Kiện & Dữ Liệu Hồ Sơ Lê Gia Yến

| Hạng mục | Chi tiết |
| :--- | :--- |
| **Nhân vật chính** | **Lê Gia Yến** (Tên gọi thân mật: **Én**) |
| **Ngành học** | **Tài chính - Ngân hàng** |
| **Đơn vị đào tạo** | **Trường Đại học Cần Thơ (CTU)** |
| **Ngày lễ tốt nghiệp** | Thứ Hai, ngày **02 tháng 11 năm 2026** (02/11/2026) |
| **Thời gian đón tiếp** | **11:00 AM** |
| **Địa điểm** | **Hội trường Rùa, Trường Đại học Cần Thơ** |
| **Google Maps** | [Vị trí Hội trường Rùa CTU](https://www.google.com/maps?q=place_id:ChIJtTrVxzyIoDER3hT6JkXtmjI) |
| **Ảnh chân dung chính** | `DainXinkDep_imj1fp.jpg` (Ảnh áo cử nhân đoan trang, dịu dàng) |
| **Hotline hỗ trợ** | • Số điện thoại Én: **0907 612 060**<br>• Số điện thoại trợ lý: **0772 967 049** |
| **Chỉ dẫn đường đi & Gửi xe** | Đi từ **Cổng B** vào 50m bên tay trái là Hội trường Rùa. Gửi xe tại **Tòa ATL** (tòa nhà bên trái khi vào cổng B) hoặc bãi xe **đối diện Hội trường Rùa**. |
| **Lời ngỏ thiệp** | *"Một cột mốc đáng nhớ sẽ càng ý nghĩa hơn khi có những người thương quý cùng hiện diện. Én rất mong được gặp bạn trong ngày này!"* |

---

## 3. Ý Tưởng Thiết Kế Giao Diện Lê Gia Yến: *Deep Burgundy Romance*

Lấy cảm hứng 100% từ video mẫu thiệp cưới/thiệp mời Burgundy lãng mạn mà bạn vừa gửi:

### 3.1. Bảng màu chủ đạo (Color Palette)
* **Đỏ Rượu Vang Burgundy (`#540F1B`, `#6B1724`, `#7D1A2A`)**: Màu đỏ trầm ấm, sang trọng, bí ẩn và quý phái.
* **Giấy Kem Sữa Cổ Điển (`#FAF5EE`, `#F5EBE1`)**: Nền giấy hạt cotton ấm áp, tạo cảm giác thiệp in thủ công cao cấp.
* **Trắng Hoa Rum (Calla Lily White - `#FFFDF9`)**: Nhã nhặn, tinh khôi.
* **Vàng Cát Cổ & Bạc Phấn (`#D1BBA2`, `#8A7B6D`)**: Chi tiết viền kẻ, chữ lồng cổ điển.

### 3.2. Kiểu chữ (Typography)
* **Chữ ký & Tiêu đề bay bổng**: Font thư pháp lãng mạn cổ điển châu Âu (`Pinyon Script` / `Alex Brush`) — dùng cho chữ *"Én"*, *"Lê Gia Yến"*, *"Kindly RSVP"*, *"The Finer Details"*.
* **Chữ phụ & Nội dung**: Font Serif thanh lịch (`Cormorant Garamond` / `Playfair Display`) mang nét đẹp bìa tạp chí thời trang và thiệp mời Paris.

### 3.3. Trải nghiệm Tương tác Từng Màn (Interactive Experience)

#### Màn 1: Phong bì thư đỏ Burgundy chạm để mở (Interactive Envelope)
* Phong bì màu **đỏ rượu vang sẫm** với vân giấy hạt nổi.
* **Viền ren đan móc (Lace trim)** màu xanh rêu / kem trang nhã chạy dọc mép nắp thư.
* **Con dấu sáp Oval màu kem ngà**: Khắc hoa Rum (*Calla Lily*) và chữ lồng **LGY**.
* Cành hoa Rum và Baby’s Breath trắng kẹp hờ bên góc phong bì.
* Tiêu đề: *"MỘT THƯ MỜI TỪ ÉN"*.
* **Tương tác**: Chạm vào phong bì, nắp thư mở ra 3D, đĩa than trượt ra và các tấm thiệp xếp lớp xuất hiện với hiệu ứng rơi cánh hoa!

#### Màn 2: Bàn thiệp xếp lớp Scrapbook (Stationery Collage Desk)
Các thành phần được bố trí xếp lớp nghệ thuật tựa như một góc bàn trang trí thiệp cưới / lễ tốt nghiệp phong cách vintage:
1. **Đĩa than quay cổ điển (Vinyl Record)**:
   - Có nhãn tròn đỏ Burgundy ghi *"Click to Listen"*.
   - Đĩa than xoay tròn nhịp nhàng khi phát giai điệu thanh xuân nhẹ nhàng.
2. **Khung ảnh gương Baroque cổ điển**:
   - Khung hình oval viền hoa văn nổi màu kem trắng ngọc trai.
   - Bên trong lồng bức ảnh cử nhân của Gia Yến (`DainXinkDep_imj1fp.jpg`).
3. **Thẻ thiệp mời chính (Main Invitation Card)**:
   - Viền kép đỏ Burgundy trên giấy mỹ thuật.
   - Ghi trang trọng ngày: `02 November 2026`, `11:00 AM`, `HỘI TRƯỜNG RÙA, ĐẠI HỌC CẦN THƠ`.
4. **Thẻ hình cánh hoa 4 cánh (Scalloped Flower RSVP Card)**:
   - Thẻ trắng kem uốn lượn hình hoa rum, tiêu đề *"Kindly RSVP here!"*.
   - Khách bấm vào để mở form gửi lời chúc và xác nhận đến chung vui.
5. **Thẻ Oval viền tua rua đỏ (Tassel Oval Card - The Finer Details)**:
   - Chứa thông tin chỉ dẫn đường vào cổng B, bãi gửi xe tòa ATL, và 2 số điện thoại liên hệ của Én & Trợ lý.
6. **Đồng hồ đếm ngược Countdown Burgundy**:
   - Hiển thị ngày, giờ, phút, giây đến 11:00 sáng ngày 02/11/2026.

---

## 4. Xử Lý Bộ 9 Ảnh Kỷ Niệm (Natural Aspect-Ratio Masonry Grid)

> **Yêu cầu đặc biệt của bạn**: *Các ảnh hiển thị đúng với size của nó, không bị crop méo vì mỗi ảnh một kích thước khác nhau.*

### Giải pháp kỹ thuật:
* Áp dụng bố cục **Masonry Grid / Scrapbook Photo Wall**:
  - Không ép ảnh vào các ô vuông `aspect-square` hay `aspect-[4/5]` cứng nhắc.
  - Mỗi ảnh sẽ giữ nguyên tỷ lệ khung hình thật (`aspect-ratio: auto` với khung viền tự co giãn theo chiều dọc/ngang của ảnh).
  - Khung ảnh có viền trắng mỏng kiểu ảnh in mini, đổ bóng mềm và hơi nghiêng nhẹ ngẫu nhiên (ví dụ `-1.5°`, `+2°`) tạo cảm giác các tấm ảnh kỷ niệm được dán lên sổ lưu bút.
  - Khi người xem chạm vào bất kỳ ảnh nào, ảnh sẽ phóng to toàn màn hình sắc nét (**Lightbox Viewer**) để bạn bè ngắm trọn vẹn từng khoảnh khắc.

---

## 5. Nâng Cấp Trang Quản Trị (Dual Admin Dashboard)

Giao diện trang Quản trị (`/manage-pth-x7k29m`) sẽ có thanh chọn Profile tiện lợi:

```
┌─────────────────────────────────────────────────────────────┐
│  BẢNG QUẢN TRỊ THƯ MỜI TỐT NGHIỆP                           │
│  [ 🎓 Phan Thành Hưng (FPTU) ]     [ 🌸 Lê Gia Yến (CTU) ]  │
└─────────────────────────────────────────────────────────────┘
```

### Các tính năng ở Tab Gia Yến:
1. **Tổng quan số liệu (Stats Overview)**:
   - Tổng thư mời đã tạo cho khách của Én.
   - Số người đã mở thiệp.
   - Số người xác nhận tham dự lễ lúc 11h tại Hội trường Rùa.
2. **Quản lý danh sách khách mời (Guest Management)**:
   - Thêm từng khách (nhập tên -> tạo link riêng).
   - Thêm hàng loạt (dán danh sách tên bạn bè của Én).
   - Xuất file danh sách / sao chép link gửi Zalo, Messenger, Instagram.
3. **Cài đặt thông tin sự kiện của Én (Event Settings)**:
   - Tùy chỉnh giờ đón khách, số điện thoại, link bản đồ.
   - Cập nhật ảnh đại diện, nhạc nền, ảnh kỷ niệm.
   - Chỉnh sửa lời ngỏ thiệp & lời tri n.

---

## 6. Lộ Trình Triển Khai (Roadmap)

1. **Bước 1: Cập nhật Database & Schema**
   - Thêm hồ sơ `gia_yen` vào bảng `event_settings`.
   - Bổ sung trường `host_id` (`'thanh_hung'` | `'gia_yen'`) vào bảng `guests`.
2. **Bước 2: Nâng cấp Admin Dashboard Dual-Profile**
   - Thêm bộ lọc Switcher trên Dashboard.
   - Cho phép quản lý và tạo link riêng cho từng người.
3. **Bước 3: Thiết kế Giao diện Burgundy Romance cho Gia Yến**
   - Tạo bộ component giao diện riêng: phong bì nắp ren đỏ rượu, đĩa than vinyl, khung ảnh baroque, thẻ hoa RSVP.
   - Bố cục Masonry cho 9 ảnh kỷ niệm tự nhiên theo đúng kích thước gốc.
4. **Bước 4: Thiết kế Card xuất ảnh Story 1080×1920 phong cách Burgundy của Gia Yến**
   - Cho phép khách tải ảnh kỷ niệm tông đỏ rượu vang sang trọng về điện thoại.
5. **Bước 5: Kiểm thử trên Mobile & Laptop, Build & Push lên GitHub -> Vercel**
