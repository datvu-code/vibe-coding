# 🚀 Quick Reference - Template Customization System

## ⚡ Nhanh chóng bắt đầu

### 🎯 3 Cách Tùy chỉnh

#### 1️⃣ **Chọn Template Có sẵn**
```
Click "Tùy chỉnh" → Chọn template từ dropdown → Đóng
```
**Time:** 5 giây ⏱️

#### 2️⃣ **Tạo Template Mới**
```
Click "Tùy chỉnh" → "+ Tạo template mới" → Nhập tên → Chọn metrics → Lưu
```
**Time:** 30 giây ⏱️

#### 3️⃣ **Sắp xếp lại Metrics**
```
Click "Di chuyển" → Kéo thả → "Lưu sắp xếp"
```
**Time:** 10 giây ⏱️

---

## 🎨 Templates Mặc định

| Template | Focus | Metrics Count |
|----------|-------|---------------|
| **Growth Default** | Tăng trưởng | 6 metrics |
| **Account Default** | Kế toán | 6 metrics |
| **Tập trung Kho hàng** | Inventory | 6 metrics |
| **Tập trung Ops** | Vận hành | 6 metrics |

---

## 📊 Metrics Có sẵn (25 total)

### 💰 Sales (5)
- GMV ngày hôm qua
- Số đơn ngày hôm qua
- AOV
- Doanh thu thuần
- GMV theo kênh

### 📢 Ads (5)
- ROAS tổng
- Chi phí Ads
- CPC trung bình
- CTR
- Lượt hiển thị

### 🚚 Ops (4)
- Tỷ lệ hoàn thành đơn
- Tỷ lệ hủy đơn
- Tỷ lệ trả hàng
- Thời gian giao TB

### 📦 Inventory (4)
- Giá trị tồn kho
- Số SKU
- Vòng quay kho
- SKU hết hàng

### 💵 Kế toán (3)
- Lợi nhuận
- Margin
- Giá vốn hàng bán

### 👥 Customer (3)
- Khách hàng mới
- Tỷ lệ mua lại
- LTV trung bình

---

## ⌨️ Shortcuts

| Action | Steps |
|--------|-------|
| Mở Customization | Click "Tùy chỉnh" |
| Bật Drag Mode | Click "Di chuyển" |
| Tạo Template | "Tùy chỉnh" → "+ Tạo mới" |
| Sửa Template | "Tùy chỉnh" → "✏️ Chỉnh" |
| Xóa Template | "Tùy chỉnh" → "🗑 Xóa" |

---

## ❗ Important Notes

✅ **Default templates**: Không thể chỉnh/xóa  
✅ **Min metrics**: Phải chọn ít nhất 1  
✅ **Template name**: Không được để trống  
✅ **Auto-save**: Lưu vào localStorage  
✅ **Persist**: Templates giữ sau khi refresh  

---

## 🐛 Troubleshooting

### Template không hiển thị?
→ Check localStorage: `ups-metric-templates`

### Metrics không render?
→ Check template có metrics hợp lệ

### Drag & drop không work?
→ Đảm bảo đang ở Reorder mode

### Changes không persist?
→ Check localStorage có bật không

---

## 📱 Responsive

- **Desktop** (>1200px): 3 columns
- **Tablet** (768-1199px): 2 columns  
- **Mobile** (<768px): 1 column

---

## 🎯 Best Practices

1. **Tạo templates theo role**
   - Growth team → Growth metrics
   - Finance team → Accounting metrics
   - Ops team → Operations metrics

2. **Giới hạn 6-12 metrics**
   - Quá ít: Thiếu context
   - Quá nhiều: Information overload

3. **Group metrics liên quan**
   - Sales + Ads cùng nhau
   - Inventory + Ops cùng nhau

4. **Đặt tên rõ ràng**
   - ✅ "Growth Q4 2024"
   - ❌ "Template 1"

5. **Test trước khi share**
   - Ensure metrics render correctly
   - Check trên mobile

---

## 🔥 Pro Tips

### Tip 1: Search Metrics
```
Trong Create/Edit Modal → Dùng search bar
Tìm nhanh metrics cần thiết
```

### Tip 2: Batch Selection
```
Expand domain → Select all cùng lúc
Nhanh hơn chọn từng cái
```

### Tip 3: Clone Template
```
Edit default template → Save as new
Giữ base template, customize từ đó
```

### Tip 4: Backup Templates
```
localStorage → Copy value
Paste vào file .json để backup
```

### Tip 5: Order Matters
```
Metrics quan trọng nhất → Top left
Visual hierarchy = User focus
```

---

## 📞 Support

**File đầy đủ:** `TEMPLATE-SYSTEM-COMPLETE.md`  
**Technical spec:** `CUSTOMIZATION-SYSTEM.md`  
**Dashboard:** http://localhost:3000/

---

**Updated:** 2025-11-23  
**Version:** 1.0.0  
**Status:** ✅ Production Ready



