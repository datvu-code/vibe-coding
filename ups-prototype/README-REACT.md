# UpS Dashboard - React Version

## Cài đặt

```bash
npm install
```

## Chạy Development Server

```bash
npm run dev
```

Mở trình duyệt tại `http://localhost:5173`

## Build Production

```bash
npm run build
```

## Cấu trúc

- `App.jsx` - Component chính với Homepage và Analytics
- `src/main.jsx` - Entry point
- `src/index.css` - Tailwind CSS imports
- `index-react.html` - HTML template cho React app

## Tính năng

### Trang chủ
1. **Tổng quan** - Grid KPI cards với:
   - GMV ngày hôm qua (D-1)
   - Số đơn ngày hôm qua
   - GMV theo kênh (Shopee/TikTok/Website)
   - AOV
   - ROAS tổng (D-1)
   - Chi phí Ads hôm qua
   - SLA ngày hôm qua (tổng & theo warehouse)
   - % đơn lỗi hôm qua

2. **Alerts & Risks** - 3 sub-blocks:
   - Đơn hàng (dựa trên số lượng đơn lỗi, % hủy, % hoàn)
   - Sản phẩm (dựa trên lượt truy cập, lượt nhấp, CR, AOV)
   - Tồn kho (dựa trên các metric tồn kho)

### Phân tích
8 tabs với charts và metrics:
- Bán hàng (GMV, NMV, số đơn, CR, etc.)
- Sản phẩm (Top SKU, CTR, CVR)
- Ads & Marketing (Chi phí ads breakdown)
- Đơn hàng (Tỷ lệ hủy/hoàn)
- SLA (Lấy hàng & Giao hàng)
- Tồn kho (Tồn khả dụng, dự báo)
- Khách hàng (Mới vs Hiện tại)
- Giá & Khuyến mãi

## Dependencies

- React 18
- Tailwind CSS
- Chart.js + react-chartjs-2
- Vite


