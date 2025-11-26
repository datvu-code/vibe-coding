# UpS Order Management Dashboard

A modern, responsive dashboard for managing orders in Vietnamese, built based on the Figma design.

## 🚀 Features

- **Sidebar Navigation** - Collapsible sidebar with menu items and sub-menus
- **Order List Management** - View and manage orders with detailed information
- **Filtering & Sorting** - Multiple filter options and sorting capabilities
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Interactive UI** - Smooth animations and transitions
- **Real-time Updates** - Status indicators and auto-refresh functionality
- **Copy to Clipboard** - Quick copy order codes
- **Pagination** - Navigate through large datasets efficiently
- **Selection Management** - Select multiple orders for batch operations

## 📁 Project Structure

```
ups-prototype/
├── index.html          # Main HTML structure with Ant Design
├── styles.css          # All styling and responsive design
├── script.js           # Interactive functionality
├── .gitignore         # Git ignore rules
└── README.md          # Project documentation
```

## ✨ Recent Improvements (Latest Update)

### 1. **Ant Design Integration**
   - Added Ant Design 5.11.5 library (CSS and JS)
   - Included React 18 for Ant Design components
   - Added Day.js for date manipulation
   - Ready for future component migration

### 2. **Fixed Image Display Issues**
   - Replaced placeholder images with embedded SVG data URIs
   - Shop icons: Orange store/shop icon
   - Product images: Gray placeholder with product icon
   - Flag icons: Vietnamese flag SVG
   - All images now load instantly without external dependencies

### 3. **Horizontal Scrolling with Sticky Action Column**
   - Action column (rightmost) stays fixed when scrolling horizontally
   - Checkbox column also sticky on mobile/tablet for easy selection
   - Visual shadow gradient on sticky columns for depth perception
   - Smooth scroll behavior with `-webkit-overflow-scrolling: touch`
   - Drag-to-scroll functionality with mouse (cursor changes to grab/grabbing)
   - Scroll indicator shows there's more content to the right
   - Works perfectly on all screen sizes

## 🎨 Design Features

### Layout
- **Sidebar**: Fixed left navigation (232px wide)
- **Header**: Sticky header with breadcrumb and user profile (64px height)
- **Main Content**: Scrollable content area with tables and filters

### Color Scheme
- Primary: `#ee4d2d` (Orange-Red)
- Secondary: `#1890ff` (Blue)
- Success: `#52c41a` (Green)
- Warning: `#faad14` (Yellow)
- Danger: `#f5222d` (Red)

### Components
1. **Navigation Menu** - Multi-level navigation with active states
2. **Breadcrumbs** - Page location indicator
3. **Tabs** - Order status and filter tabs
4. **Data Table** - Complex table with multiple columns and nested rows
5. **Badges** - Status indicators (success, warning, danger)
6. **Buttons** - Primary, outline, and icon buttons
7. **Pagination** - Page navigation controls
8. **Alerts** - Information messages
9. **Checkboxes** - Row selection functionality

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **JavaScript (Vanilla)** - Pure JS for interactions
- **Ant Design 5.11.5** - UI component library (CSS and React-based components)
- **React 18** - For Ant Design components
- **Font Awesome 6.4.0** - Icon library
- **Day.js** - Date manipulation library for Ant Design

## 💻 How to Use

1. **Open the Dashboard**
   ```bash
   # Simply open index.html in your browser
   open index.html
   # or
   # Serve with a local server
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

2. **Navigation**
   - Click on sidebar menu items to navigate
   - Use breadcrumbs to understand current location
   - Toggle sidebar on mobile with the menu button

3. **Order Management**
   - View orders in the main table
   - Use filter tabs to filter by status
   - Select multiple orders with checkboxes
   - Click "Chỉnh" button for order actions
   - Copy order codes by clicking the copy icon

4. **Filtering & Sorting**
   - Click filter tabs to view specific order statuses
   - Use "Sắp xếp theo" button to sort orders
   - Clear all filters with "Bỏ lọc" button

5. **Export**
   - Click "Xuất danh sách" to export order data

## 📱 Responsive Breakpoints

- **Desktop**: > 1200px - Full sidebar visible
- **Tablet**: 768px - 1200px - Collapsible sidebar
- **Mobile**: < 768px - Hidden sidebar with toggle button

## ⚙️ Interactive Features

### Implemented in JavaScript:
- ✅ Sidebar toggle
- ✅ Tab switching
- ✅ Filter tab navigation
- ✅ Checkbox selection (individual and select all)
- ✅ Copy to clipboard functionality
- ✅ Toast notifications
- ✅ Pagination controls
- ✅ Responsive menu handling
- ✅ Real-time status indicators
- ✅ Smooth scrolling and animations

## 🎯 Key Sections

### 1. Sidebar
- Logo and menu toggle
- Navigation items with icons
- Expandable sub-menus
- Active state indicators

### 2. Header
- Breadcrumb navigation
- User profile with avatar
- Action icons (help, notifications, shop)

### 3. Controls Section
- Alert messages
- Tab navigation
- Action buttons (filter, export, add)

### 4. Data Table
- Order information headers
- Product details with images
- Price and payment information
- Warehouse and processing status
- Shipping details
- Action buttons per row

### 5. Pagination
- Page size selector
- Total count display
- Page number buttons
- Navigation arrows

## 🔧 Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #ee4d2d;
    --secondary-color: #1890ff;
    --success-color: #52c41a;
    /* ... */
}
```

### Layout
Adjust dimensions in CSS variables:
```css
:root {
    --sidebar-width: 232px;
    --header-height: 64px;
}
```

### Content
Modify HTML in `index.html` to add/remove:
- Menu items
- Table columns
- Filter options
- Action buttons

## 🐛 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Notes

- This is a frontend prototype without backend integration
- Order data is static (hardcoded in HTML)
- Copy functionality requires HTTPS or localhost
- Some features log to console for demonstration

## 🚧 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time data updates via WebSocket
- [ ] Advanced filtering and search
- [ ] Bulk actions for selected orders
- [ ] Order detail modal/page
- [ ] Export to Excel/CSV
- [ ] Print functionality
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

## 📄 License

This project is for demonstration purposes.

## 👤 Created By

Built based on Figma design specifications for UpS Order Management System.

---

**Version**: 1.0.0  
**Last Updated**: November 2025

