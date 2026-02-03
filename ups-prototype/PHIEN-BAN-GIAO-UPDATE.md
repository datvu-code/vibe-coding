# CẬP NHẬT MÀN "PHIÊN BÀN GIAO"

## 📍 ĐƯỜNG DẪN TRUY CẬP

**Menu Navigation:**
```
Vận hành → Đơn hàng → Phiên bàn giao
```

**Module Key:** `phien-ban-giao`

---

## 📦 FILES ĐÃ TẠO/CẬP NHẬT

### 1. **Component Mới: `src/DeliverySessionView.jsx`**
   - Component chính cho màn "Phiên bàn giao"
   - Hoàn toàn tuân theo Visual Hierarchy Guideline
   - Responsive table layout

### 2. **Cập nhật: `src/HomepageLayout.jsx`**
   - Import `DeliverySessionView`
   - Thêm routing: `activeModule === 'phien-ban-giao'`
   - Thêm breadcrumb matching với `subParentKey = 'van-hanh'`

---

## 🎨 CẤU TRÚC LAYOUT THEO GUIDELINE

### **Level 1: Top Tabs - Phân loại chính**
```jsx
[Phiên giao] [Phiên nhận]
```
- **Spacing:** gap: 21px, padding: '12px 0'
- **Typography:** fontSize: 16px, fontWeight: 600 (active)
- **Active State:** borderBottom: '1.74px solid #EF5941'
- **marginBottom:** 14px

### **Level 2: Filter Section**
```jsx
Card {
  padding: 14px
  marginBottom: 14px
  
  Row {
    gutter: [16, 16]
    
    Filters:
    - Thời gian tạo (RangePicker)
    - Kho vật lý (Select)
    - Mã phiên giao (Input với Search icon)
    - Vận chuyển (Select)
    - Button "Tạo phiên" (Primary, #EF5941)
  }
}
```

### **Level 3: Status Tabs**
```jsx
[Tất cả] [Mới (0)] [Hoàn thành (209)] [Huỷ (2)]
```
- **Spacing:** gap: 21px, padding: '12px 16px'
- **Typography:** fontSize: 14px, fontWeight: 600 (active)
- **Active State:** borderBottom: '1.74px solid #EF5941'
- **Count Display:** color: rgba(0,0,0,0.45) khi inactive

### **Level 4: Data Table**

**Grid Template Columns:**
```
140px | 140px | 180px | 140px | 180px | 180px | 150px | 120px
```

**Columns:**
1. **Mã phiên** 
   - Color: #1677FF (link style)
   - Icon: Copy với hover effect
   - Tooltip: "Sao chép mã phiên"

2. **Số lượng kiện hàng**
   - fontSize: 14px

3. **Vận chuyển**
   - Text display: SPX Express, GHN, J&T VN, LEX VN

4. **Trạng thái**
   - Tag component với colors:
     - Mới: #1677FF
     - Hoàn thành: #52C41A
     - Đã huỷ: #FF4D4F

5. **Thời gian tạo**
   - Format: DD/MM/YYYY HH:mm

6. **Thời gian bàn giao**
   - Format: DD/MM/YYYY HH:mm

7. **ĐVVC nhận hàng**
   - Format: `số nhận / tổng số`
   - Color: #FF4D4F nếu không khớp

8. **Thao tác**
   - Dropdown button "Chọn"
   - Menu items: Xem chi tiết, Chỉnh sửa, Huỷ phiên

---

## 🎯 TUÂN THỦ GUIDELINE

### ✅ Spacing System
- [x] marginBottom: 14px giữa sections
- [x] Card padding: 14px
- [x] Row gutter: [16, 16]
- [x] Tab gap: 21px
- [x] Grid gap: 16px

### ✅ Color System
- [x] Primary Action: #EF5941
- [x] Link Color: #1677FF
- [x] Status Colors: #52C41A (success), #FF4D4F (error)
- [x] Border: #F0F0F0
- [x] Background hover: #FAFAFA

### ✅ Typography
- [x] Main tabs: 16px, bold when active
- [x] Status tabs: 14px, bold when active
- [x] Content: 14px
- [x] Labels: 12px

### ✅ Interactions
- [x] Hover effect với background change
- [x] Copy icon hover effect
- [x] Transition: all 0.2s
- [x] Row hover background: #FAFAFA

### ✅ Components
- [x] Card border-radius: 8px
- [x] Active tab border: 1.74px solid
- [x] Button primary: #EF5941
- [x] Tag padding: 2px 8px

---

## 📊 MOCK DATA

Component có sẵn mock data cho 6 phiên bàn giao với các trường hợp:
- Phiên hoàn thành (received = total)
- Phiên không khớp số lượng (received ≠ total) - hiển thị màu đỏ
- Nhiều loại vận chuyển khác nhau
- Timestamps realistic

---

## 🔄 TƯƠNG TÁC

### Hover Effects
1. **Row hover:** Background chuyển sang #FAFAFA
2. **Mã phiên hover:** Underline + color change
3. **Copy icon hover:** Color change to #1677FF

### Click Actions
1. **Copy mã phiên:** Click để copy vào clipboard
2. **Tab switching:** Chuyển giữa "Phiên giao" và "Phiên nhận"
3. **Status tabs:** Lọc theo trạng thái
4. **Dropdown "Chọn":** Menu với các actions

---

## 🚀 CÁCH SỬ DỤNG

### Truy cập màn hình:
1. Mở ứng dụng
2. Click sidebar menu "Vận hành"
3. Click submenu "Đơn hàng"
4. Click "Phiên bàn giao"

### Breadcrumb sẽ hiển thị:
```
Bảng điều khiển › Vận hành › Đơn hàng › Phiên bàn giao
```

---

## ✅ CHECKLIST HOÀN THÀNH

- [x] Component DeliverySessionView.jsx đã được tạo
- [x] Import vào HomepageLayout.jsx
- [x] Routing được thiết lập
- [x] Breadcrumb navigation đã config
- [x] Menu structure: Vận hành > Đơn hàng > Phiên bàn giao
- [x] 100% tuân thủ Visual Hierarchy Guideline
- [x] Mock data đầy đủ
- [x] Responsive table layout
- [x] Hover effects & interactions
- [x] Build thành công
- [x] No linter errors

---

## 📝 GHI CHÚ

- Màn hình sử dụng horizontal scroll cho table khi viewport nhỏ
- Grid layout responsive với minWidth: 'max-content'
- Tất cả spacing, colors, typography đều theo guideline
- Component hoàn toàn standalone, không ảnh hưởng các màn khác

---

**Status:** ✅ HOÀN THÀNH
**Build Status:** ✅ SUCCESS
**Last Updated:** 23/01/2026
