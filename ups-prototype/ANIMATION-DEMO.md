# 🎬 Animation Demo Guide

## Quick Test - See All Animations in 2 Minutes!

### 1️⃣ Page Load Animations (0-3 seconds)
**What to watch:**
```bash
open index.html
```
✅ Sidebar slides in from left  
✅ Header slides in from right  
✅ Content sections fade up  
✅ Green status dot pulses continuously  

---

### 2️⃣ Button Animations (5 seconds)

**Test Regular Buttons:**
```
1. Hover over "Bỏ lọc" button
   → Lifts up + Blue border + Shadow

2. Click "Bỏ lọc" button
   → Ripple effect from click point

3. Click "Xuất danh sách" (primary button)
   → Red ripple effect
   → Shows loading spinner
   → Changes to success after 2 seconds
```

**Test Icon Buttons (Header):**
```
1. Hover over ? (help) icon
   → Scales up + Bounces

2. Click bell icon
   → Ripple effect
   → Icon bounces
```

---

### 3️⃣ Navigation Animations (10 seconds)

**Sidebar Navigation:**
```
1. Hover over "Quản lý văn phòng"
   → Slides right (padding increases)
   → Icon scales up and turns blue
   → Background highlights

2. Hover over "Danh sách đơn hàng" (submenu)
   → Slides right
   → Small dot appears on left
   → Background tints
```

**User Profile:**
```
1. Hover over avatar (top right)
   → Rotates 360 degrees!
   → Scales up slightly
   → Shadow intensifies
```

---

### 4️⃣ Tab Animations (5 seconds)

**Main Tabs:**
```
1. Click "Đơn thụ công" tab
   → Underline animates from center
   → Text turns blue
   → Background tints on hover
```

**Filter Tabs:**
```
1. Hover over different filter tabs
   → Background tints orange-red
   → Text darkens

2. Click a filter tab
   → Scales down slightly
   → Underline appears
   → Text turns red
```

---

### 5️⃣ Table Animations (15 seconds)

**Row Interactions:**
```
1. Hover over any order row
   → Entire row lifts 1px
   → Shadow appears
   → Background turns light gray
   → "Chỉnh" button scales up

2. Hover over product image
   → Image scales up (1.1x)
   → Rotates 3 degrees
   → Blue border appears
   → Shadow intensifies
```

---

### 6️⃣ Interactive Elements (10 seconds)

**Checkboxes:**
```
1. Hover over a checkbox
   → Scales up (1.2x)

2. Click a checkbox
   → Pops! (scales 1 → 1.3 → 1)
   → Satisfying feedback
```

**Copy Icon:**
```
1. Hover over copy icon (next to order code)
   → Scales up + Rotates 15°
   → Turns blue

2. Click copy icon
   → Rotates 360 degrees!
   → Flashes green
   → Toast notification appears
   → Icon returns to normal
```

**Badges:**
```
1. Hover over any badge (e.g., "Đang làm gì?")
   → Scales up (1.05x)
   → Shadow appears
   → Background brightens
```

---

### 7️⃣ Pagination Animations (5 seconds)

```
1. Hover over page number
   → Lifts up 2px
   → Blue border
   → Shadow appears

2. Click page number
   → Ripple effect
   → Scales down momentarily
   → Then returns

3. Note active page (1)
   → Already scaled up (1.1x)
   → Blue background
   → Enhanced shadow
```

---

### 8️⃣ Status Indicator (Continuous)

**Watch the green dot:**
```
Location: Next to "Lần cập nhật gần nhất"

Animation: Pulses every 2 seconds
Effect: Growing shadow ring
Purpose: Indicates live/real-time status
```

---

## 🎯 Animation Checklist

Use this to verify all animations work:

### Buttons
- [ ] Regular button hover (lift + shadow)
- [ ] Regular button click (ripple)
- [ ] Primary button hover (red shadow)
- [ ] Primary button loading state
- [ ] Icon button hover (scale + bounce)
- [ ] Icon button click (ripple)

### Navigation
- [ ] Nav item hover (slide right + icon scale)
- [ ] Nav item active (blue bar from left)
- [ ] Submenu item hover (slide + dot)
- [ ] User profile hover (rotate 360°)

### Tabs
- [ ] Main tab hover (background tint)
- [ ] Main tab active (underline from center)
- [ ] Filter tab hover (orange background)
- [ ] Filter tab active (underline + red text)

### Table
- [ ] Row hover (lift + shadow)
- [ ] Product image hover (scale + rotate)
- [ ] Action button on row hover (scale)

### Interactive
- [ ] Checkbox hover (scale up)
- [ ] Checkbox check (pop animation)
- [ ] Copy icon hover (scale + rotate)
- [ ] Copy icon click (360° + green flash)
- [ ] Badge hover (scale + shadow)

### Pagination
- [ ] Page button hover (lift + shadow)
- [ ] Page button click (ripple)
- [ ] Active page (scaled + blue)

### Status
- [ ] Green dot pulse (continuous)

---

## 🎭 Advanced Testing

### Test Sequences

**1. Complete Order Interaction:**
```
1. Hover over order row
2. Hover over product image
3. Click checkbox
4. Click copy icon
5. Hover over badge
6. Click "Chỉnh" button

Result: Multiple animations in sequence
```

**2. Navigation Flow:**
```
1. Hover over each sidebar item
2. Click submenu item
3. Hover over user profile
4. Click icon buttons in header

Result: Smooth navigation experience
```

**3. Filtering Workflow:**
```
1. Click different filter tabs
2. Hover over buttons
3. Click export button (see loading)
4. Check pagination

Result: Complete workflow with feedback
```

---

## 🐛 Troubleshooting

### Animations Not Showing?

**Check #1: Browser**
- Use Chrome, Firefox, or Safari (latest)
- Edge Chromium also supported
- Clear cache if needed

**Check #2: Hardware Acceleration**
```
Chrome: Settings → System → Use hardware acceleration
Firefox: about:config → layers.acceleration.force-enabled
```

**Check #3: Console**
```
F12 → Console
Look for: "Animations and interactions enabled ✓"
```

### Performance Issues?

**Reduce Animation Speed:**
```javascript
// In browser console
document.documentElement.style.setProperty('--animation-speed', '0.1s');
```

**Disable Animations Temporarily:**
```javascript
// In browser console
document.querySelectorAll('*').forEach(el => {
    el.style.transition = 'none';
    el.style.animation = 'none';
});
```

---

## 📹 Screen Recording Tips

Want to record the animations?

**macOS:**
```
Cmd + Shift + 5 → Select area → Record
```

**Windows:**
```
Win + G → Capture widget → Record
```

**Browser DevTools:**
```
F12 → More Tools → Animations
Slow down animations to see details
```

---

## 🎨 Customization Quick Test

### Change Primary Color:
```javascript
// Paste in console
document.documentElement.style.setProperty('--primary-color', '#8b5cf6');
```
→ All primary buttons turn purple!

### Change Animation Duration:
```javascript
// Make everything faster
document.querySelectorAll('.btn').forEach(btn => {
    btn.style.transitionDuration = '0.1s';
});
```

### Add Rainbow Effect:
```javascript
// Fun demo
setInterval(() => {
    const h = Math.random() * 360;
    document.querySelector('.avatar').style.background = 
        `linear-gradient(135deg, hsl(${h}, 70%, 60%) 0%, hsl(${h + 60}, 70%, 60%) 100%)`;
}, 500);
```

---

## 🎯 5-Second Highlights

**If you only have 5 seconds, test these:**

1. **Click user avatar** → 360° rotation! 🎯
2. **Hover product image** → Scale + rotate ⚡
3. **Click copy icon** → 360° spin + green flash ✨
4. **Click export button** → Loading animation 🔄
5. **Hover over badges** → Smooth scale + shadow 🌟

---

## 🏆 Animation Quality Checklist

### Smooth (60 FPS)
- [ ] All animations run at 60 FPS
- [ ] No jank or stuttering
- [ ] Smooth on mobile devices

### Responsive
- [ ] Animations work on all screen sizes
- [ ] Touch interactions smooth on mobile
- [ ] Hover effects only on devices with mouse

### Accessible
- [ ] Animations respect prefers-reduced-motion
- [ ] Keyboard navigation works
- [ ] Focus states visible

### Performant
- [ ] No impact on page load time
- [ ] Low CPU usage during animations
- [ ] Efficient use of GPU

---

## 🎓 Next Steps

1. **Read ANIMATIONS.md** for technical details
2. **Experiment** with different elements
3. **Customize** animations to your preference
4. **Build** new interactive features

---

## 💬 Feedback

**Everything working?** 🎉  
You should see smooth, delightful animations throughout the interface!

**Something not working?**  
- Check browser console for errors
- Ensure JavaScript is enabled
- Try a different browser
- Clear cache and reload

---

**Demo Time:** ~2 minutes  
**Total Animations:** 25+  
**Performance:** 60 FPS 🚀  
**Fun Factor:** 💯

Enjoy exploring the animations! 🎬✨






