# 📐 Layout Structure - UpS Dashboard Homepage

## 🎯 Tổng quan

Dashboard được thiết kế theo layout **2 cột** giống Google Analytics:
- **Cột trái (70%)**: Nội dung chính với các metrics và biểu đồ
- **Cột phải (30%)**: Sidebar với thông tin phụ trợ, updates, blogs

---

## 📊 CỘT TRÁI - Main Content (17/24 cols)

### 1. ✅ Báo cáo kết quả (CUSTOMIZABLE)
**Layout**: 3 cột x 2 hàng = 6 cards

#### Cột 1:
- GMV ngày hôm qua: **₫2.4B** (+12.5%)
- AOV: **₫1,925** (+3.8%)

#### Cột 2:
- Số đơn ngày hôm qua: **1,247** (+8.2%)
- ROAS tổng ngày hôm qua: **4.2x** (-5.1%)

#### Cột 3:
- GMV theo kênh (breakdown):
  - Shopee: ₫1.2B
  - TikTok: ₫800M
  - Website: ₫400M
- Chi phí Ads hôm qua: **₫571M** (+15.3%)

**Tính năng**:
- ✅ Có nút "Tùy chỉnh" góc phải
- ✅ Mỗi card hiển thị: title, value, change %, trend (↑↓)
- ✅ Card breakdown hiển thị chi tiết kênh

---

### 2. ✅ Báo cáo tiến độ (CUSTOMIZABLE)
**Layout**: 3 progress bars ngang

1. **GMV tháng hiện tại vs mục tiêu**
   - ₫45.2B / ₫50B
   - 90.4% Hoàn thành (màu xanh dương)

2. **Số đơn tháng hiện tại vs mục tiêu**
   - 23,450 / 25,000
   - 93.8% Hoàn thành (màu xanh lá)

3. **Ngân sách Ads đã dùng vs mục tiêu**
   - ₫12.5B / ₫15B
   - 83.3% Đã dùng (màu tím)

**Tính năng**:
- ✅ Có nút "Tùy chỉnh"
- ✅ Progress bar với % và label
- ✅ Màu sắc khác nhau cho mỗi metric

---

### 3. 🚨 Alert & Risks (CUSTOMIZABLE)

#### Phần A: LỖI (màu đỏ #ff4d4f)
**Layout**: Grid responsive (5-6 items)

Badge đỏ với các lỗi:
1. SKU quá trọng sắp hết: **5**
2. Đơn bị lỗi: **8**
3. Tỷ lệ hủy tăng: **12.5%**
4. CR hiện tại: **2.5%**
5. SKU vượt phạm vi: **3**

#### Phần B: CẢNH BÁO (màu vàng #faad14)
**Layout**: Grid responsive (3 items)

Badge vàng với cảnh báo:
1. SKU sắp hết hàng: **14** (Sắp vượt)
2. Traffic giảm: **8** (vs hôm trước)
3. Chi phí tăng: **15.3%** (vs hôm trước)

**Tính năng**:
- ✅ 2 sections riêng biệt với header màu
- ✅ Icon ExclamationCircle (đỏ) và Warning (vàng)
- ✅ Mỗi alert item: metric name, số lớn, title, description
- ✅ Background color theo severity
- ✅ Nút "Tùy chỉnh" và "Các mức ưu tiên khác"

---

### 4. 📈 Xu hướng Doanh thu
**Layout**: Chart area với empty state

- Tabs: 7 ngày | 30 ngày | 60 ngày
- Empty state: "Biểu đồ xu hướng doanh thu" với icon
- Sẵn sàng integrate chart

---

### 5. 🛒 Hiệu suất theo kênh
**Layout**: 4 cards ngang

Cards cho mỗi kênh:
1. **SHOPEE**: ₫1.2B - 648 đơn
2. **TIKTOK SHOP**: ₫800M - 312 đơn
3. **LAZADA**: ₫398M - 189 đơn
4. **WEBSITE**: ₫400M - 98 đơn

**Styling**:
- Border top màu xanh
- Badge "processing" góc phải
- Text align center
- GMV lớn, bold

---

### 6. 📦 Tổng quan Trạng thái Đơn hàng
**Layout**: 6 cột số liệu

- Đang xử lý: **342**
- Đã xác nhận: **856**
- Đang giao: **423**
- Lỗi: **42**
- Hủy: **26**
- Tổng: **1,247**

Số lớn, màu xanh, text nhỏ ở trên.

---

### 7. ⚠️ Cảnh báo Tồn kho
**Layout**: List với avatars

3 items:
1. SKU sắp hết hàng - **14** (SKU-045)
2. Tồn kích - **8** (SKU-078)
3. Tồn thấp cho CTKM - **5** (SKU-123)

**Features**:
- Avatar với icon + badge đếm
- Title bold
- Description nhỏ
- Nút "Xem chi tiết →"

---

### 8. 🕐 Hoạt động gần đây
**Layout**: Timeline

- Đơn hàng #ORD-12345 đã giao (2 phút trước) - green
- Cảnh báo SKU hết hàng (16 phút trước) - orange
- Đơn hàng #ORD-12340 đã giao (1 giờ trước) - green

**Nút "Xem tất cả →"**

---

## 🎨 CỘT PHẢI - Sidebar (7/24 cols)

### 1. 💳 UpS Capital x VPBank (Promo Card)
**Styling**: Gradient background (tím/xanh)

Nội dung:
- Tag: "ƯU ĐÃI TÍN DỤNG VƯỢT TRỘI"
- Title: "UpS Capital x VPBank"
- Description: Thông tin vay vốn, 1M$, 12h duyệt
- CTA: "Nhận tư vấn →" (button trắng)

---

### 2. 🎁 Ưu đãi nổi bật
**Layout**: Alert box

- Icon gift
- Title: "Giảm 40% phí vận chuyển"
- Description chi tiết
- Button: "Kích hoạt ngay"
- Type: success (xanh lá)

---

### 3. 📢 UpS Update
**Layout**: List với tags

3 items mẫu:
1. **Sự kiện** (blue): Đảng kỷ niệm TikTok 2 năm - 12/11/2025
2. **Tính năng** (green): Ra mắt Automation Hub - 20/11/2025
3. **Khuyến mãi** (orange): Flash Sale cuối tuần - 25/11/2025

**Nút "Xem tất cả"**

---

### 4. 💡 Có thể bạn quan tâm
**Layout**: List với icons

3 blog posts:
1. **Case study**: Tăng ROAS 32% với livestream (3 ngày trước)
2. **Hướng dẫn**: Checklist Flash Sale 12.12 (1 tuần trước)
3. **Tài liệu**: Ebook tối ưu phí lưu kho (2 tuần trước)

**Features**:
- Icon book màu xanh
- Tag category nhỏ
- Clickable với arrow →
- Nút "Tất cả"

---

### 5. 📋 Nhật ký hoạt động
**Layout**: List với timestamps

4 activities:
1. UpS Bot - Tự động đồng bộ ticket (26/11 10:21)
2. Admin - Cập nhật bảng giá Q4 (25/11 08:58)
3. System - Tạo dashboard mới (20/11 21:34)
4. User - Lan Nguyen cập nhật quyền (19/11 18:07)

**Features**:
- Clock icon
- User name + action
- Timestamp nhỏ
- Border dashed giữa items
- Nút "Xuất log"

---

## 🎨 Color Palette

### Alert Colors:
- **Lỗi (Error)**: #ff4d4f (đỏ)
- **Cảnh báo (Warning)**: #faad14 (vàng)
- **Success**: #52c41a (xanh lá)
- **Info**: #1890ff (xanh dương)

### Progress Colors:
- GMV: #1890ff (xanh dương)
- Orders: #52c41a (xanh lá)
- Ads Budget: #722ed1 (tím)

### Status Colors:
- Processing: #1890ff
- Warning: #faad14
- Error: #ff4d4f
- Success: #52c41a

---

## 🔧 Customization Scope

### ✅ Có thể customize (3 sections):
1. **Báo cáo kết quả** - 6 KPI cards
2. **Báo cáo tiến độ** - 3 progress bars
3. **Alert & Risks** - Cả 2 phần (Lỗi + Cảnh báo)

### ❌ Không customize (5 sections):
1. Xu hướng Doanh thu
2. Hiệu suất theo kênh
3. Tổng quan Trạng thái Đơn hàng
4. Cảnh báo Tồn kho
5. Hoạt động gần đây

### Sidebar (không customize):
- UpS Capital promo
- Ưu đãi nổi bật
- UpS Update
- Có thể bạn quan tâm
- Nhật ký hoạt động

---

## 📱 Responsive Behavior

### Desktop (≥1200px):
- Cột trái: 17/24 (70%)
- Cột phải: 7/24 (30%)

### Tablet (768px - 1199px):
- Cột trái: 16/24
- Cột phải: 8/24

### Mobile (<768px):
- Stack vertical
- Sidebar xuống dưới
- Cards full width

---

## 🎯 Suggestions thêm (implemented)

### ✅ Đã thêm:
1. **Nhật ký hoạt động** - Activity log với user actions
2. **Hoạt động gần đây** - Timeline real-time
3. **Có thể bạn quan tâm** - Blog posts, case studies
4. **UpS Update** - Upcoming events, features, promos
5. **Ưu đãi nổi bật** - Active promotions
6. **UpS Capital** - Financial service promotion

### 💡 Có thể thêm sau:
1. **Shortcuts / Quick Actions** - Buttons cho actions thường dùng
2. **Weather widget** - Ảnh hưởng đến shipping
3. **Currency converter** - Tiện cho đa kênh
4. **Team performance** - Leaderboard nhân viên
5. **AI Recommendations** - Suggested actions
6. **Saved Reports** - Quick access reports
7. **Notification Center** - Full notification history
8. **Tutorial/Onboarding** - Cho user mới

---

## 📊 Data Structure

### Mock data đã chuẩn bị:
- ✅ KPI Overview (6 metrics)
- ✅ Progress Goals (3 targets)
- ✅ Alerts (5 errors + 3 warnings)
- ✅ Channel Performance (4 channels)
- ✅ Order Summary (6 statuses)
- ✅ Inventory Alerts (3 SKUs)
- ✅ Recent Activity (3 events)
- ✅ Blog Posts (3 articles)
- ✅ Upcoming Events (3 events)
- ✅ Activity Log (4 logs)

---

## 🚀 Next Steps

1. **Integrate real APIs** thay mock data
2. **Add drag & drop** cho customizable sections
3. **Implement filters** cho date ranges
4. **Add export functionality** cho reports
5. **Create mobile app version**
6. **Add real-time updates** với WebSocket
7. **Implement user preferences** save to backend
8. **Add advanced analytics** cho insights

---

## ✨ Key Features

### Visual:
- ✅ Clean 2-column layout
- ✅ Color-coded alerts (red/yellow)
- ✅ Consistent spacing và typography
- ✅ Empty states với icons
- ✅ Badges và tags
- ✅ Progress bars với colors
- ✅ Timeline visualization
- ✅ Gradient promo card

### UX:
- ✅ Clear section titles
- ✅ "Xem chi tiết" links
- ✅ Customization modal
- ✅ Tooltips và hover states
- ✅ Responsive grid system
- ✅ Collapsible sidebar
- ✅ Quick actions

### Content:
- ✅ Vietnamese language
- ✅ Realistic metrics
- ✅ Helpful descriptions
- ✅ Actionable alerts
- ✅ Relevant blog content
- ✅ Clear CTAs

---

**Dashboard đã sẵn sàng! Refresh browser để xem layout mới! 🎉**
















