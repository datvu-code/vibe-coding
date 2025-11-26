// Dashboard Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    
    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            
            // Save state to localStorage
            const isCollapsed = sidebar.classList.contains('collapsed');
            localStorage.setItem('sidebarCollapsed', isCollapsed);
        });
        
        // Restore sidebar state from localStorage
        const sidebarCollapsed = localStorage.getItem('sidebarCollapsed');
        if (sidebarCollapsed === 'true') {
            sidebar.classList.add('collapsed');
        }
    }
    
    // Legacy mobile menu toggle support
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
    }

    // Nav Item Click
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Don't toggle if clicking on submenu items
            if (!e.target.closest('.submenu-item')) {
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Submenu Item Click
    const submenuItems = document.querySelectorAll('.submenu-item');
    submenuItems.forEach(item => {
        item.addEventListener('click', function() {
            submenuItems.forEach(sub => sub.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Tab Switching
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Filter Tab Switching
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            // Here you would typically filter the table data
            console.log('Filter selected:', this.textContent);
        });
    });

    // Select All Checkbox
    const selectAllCheckbox = document.getElementById('selectAll');
    const rowCheckboxes = document.querySelectorAll('.order-row input[type="checkbox"]');
    
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            rowCheckboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
            updateSelectedCount();
        });
    }

    // Individual Row Checkboxes
    rowCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateSelectAllCheckbox();
            updateSelectedCount();
        });
    });

    function updateSelectAllCheckbox() {
        if (selectAllCheckbox) {
            const allChecked = Array.from(rowCheckboxes).every(cb => cb.checked);
            const someChecked = Array.from(rowCheckboxes).some(cb => cb.checked);
            selectAllCheckbox.checked = allChecked;
            selectAllCheckbox.indeterminate = someChecked && !allChecked;
        }
    }

    function updateSelectedCount() {
        const selectedCount = Array.from(rowCheckboxes).filter(cb => cb.checked).length;
        console.log('Selected orders:', selectedCount);
        // You can update UI to show selected count
    }

    // Copy Order Code
    const copyIcons = document.querySelectorAll('.copy-icon');
    copyIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.stopPropagation();
            const orderCode = this.previousElementSibling.textContent;
            const code = orderCode.split(': ')[1];
            
            // Add copied class for color change
            this.classList.add('copied');
            
            // Copy to clipboard
            navigator.clipboard.writeText(code).then(() => {
                // Show feedback
                showToast('Đã sao chép: ' + code, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                showToast('Không thể sao chép', 2000);
            });
            
            // Remove copied class
            setTimeout(() => {
                this.classList.remove('copied');
            }, 300);
        });
    });

    // Page Navigation
    const pageButtons = document.querySelectorAll('.page-btn:not(.active)');
    pageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.querySelector('i')) return; // Skip arrow buttons for now
            
            const allPageBtns = document.querySelectorAll('.page-btn:not(:has(i))');
            allPageBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Here you would typically load the new page data
            console.log('Page changed to:', this.textContent);
        });
    });

    // Action Button Dropdown
    const actionButtons = document.querySelectorAll('.col-actions .btn-sm');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            // Show action menu
            console.log('Action menu clicked for order');
            showActionMenu(this);
        });
    });

    function showActionMenu(button) {
        // Create and show a dropdown menu
        // This is a placeholder - you would implement your actual menu
        const actions = ['Xem chi tiết', 'Chỉnh sửa', 'Hủy đơn', 'In đơn hàng'];
        console.log('Available actions:', actions);
    }

    // Toast Notification
    function showToast(message, duration = 3000) {
        // Remove existing toast if any
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 24px;
            right: 24px;
            background-color: #323232;
            color: white;
            padding: 12px 24px;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(toast);

        // Remove toast after duration
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    // Add toast animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Update Time Display
    function updateLastUpdateTime() {
        const updateInfo = document.querySelector('.update-info span:nth-child(2)');
        if (updateInfo) {
            const now = new Date();
            const timeString = now.toLocaleString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            updateInfo.textContent = `Lần cập nhật gần nhất: ${timeString}`;
        }
    }

    // Refresh data every 5 minutes
    setInterval(updateLastUpdateTime, 5 * 60 * 1000);

    // Search and Filter functionality
    const filterButtons = document.querySelectorAll('.btn-outline');
    filterButtons.forEach(btn => {
        if (btn.textContent.includes('Bỏ lọc')) {
            btn.addEventListener('click', function() {
                console.log('Clear all filters');
                // Reset all filters
                filterTabs[0].click(); // Click "Tất cả" tab
            });
        }
    });

    // Export functionality with loading animation
    const exportButtons = document.querySelectorAll('.btn');
    exportButtons.forEach(btn => {
        if (btn.textContent.includes('Xuất danh sách')) {
            btn.addEventListener('click', function() {
                console.log('Export data');
                
                // Add loading state
                this.classList.add('loading');
                this.disabled = true;
                
                showToast('Đang xuất danh sách...');
                
                // Simulate export
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.disabled = false;
                    showToast('Xuất danh sách thành công!', 2000);
                }, 2000);
            });
        }
    });

    // Sort functionality
    const sortButton = document.querySelector('.table-header-row .btn-outline');
    if (sortButton && sortButton.textContent.includes('Sắp xếp theo')) {
        sortButton.addEventListener('click', function() {
            console.log('Show sort options');
            showToast('Chọn tiêu chí sắp xếp');
        });
    }

    // Responsive sidebar for mobile
    function handleResize() {
        if (window.innerWidth > 1200) {
            sidebar.classList.remove('open');
        }
    }

    window.addEventListener('resize', handleResize);

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1200) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });

    // Enhanced table horizontal scroll
    const tableContainer = document.querySelector('.table-container');
    if (tableContainer) {
        let isDown = false;
        let startX;
        let scrollLeft;

        // Mouse drag scrolling
        tableContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            tableContainer.style.cursor = 'grabbing';
            startX = e.pageX - tableContainer.offsetLeft;
            scrollLeft = tableContainer.scrollLeft;
        });

        tableContainer.addEventListener('mouseleave', () => {
            isDown = false;
            tableContainer.style.cursor = 'default';
        });

        tableContainer.addEventListener('mouseup', () => {
            isDown = false;
            tableContainer.style.cursor = 'default';
        });

        tableContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - tableContainer.offsetLeft;
            const walk = (x - startX) * 2;
            tableContainer.scrollLeft = scrollLeft - walk;
        });

        // Hide scroll indicator when scrolled
        tableContainer.addEventListener('scroll', function() {
            const maxScroll = this.scrollWidth - this.clientWidth;
            const currentScroll = this.scrollLeft;
            
            // Hide the scroll indicator when near the end
            if (currentScroll > maxScroll - 50) {
                this.style.setProperty('--scroll-indicator-opacity', '0');
            } else {
                this.style.setProperty('--scroll-indicator-opacity', '1');
            }
        });

        // Add cursor hint for draggable table
        tableContainer.style.cursor = 'grab';
    }

    // Initialize tooltips for info icons
    const infoIcons = document.querySelectorAll('.fa-info-circle');
    infoIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            // Show tooltip
            console.log('Show tooltip');
        });
    });

    // Filter Drawer functionality
    const filterDrawer = document.getElementById('filterDrawer');
    const filterDrawerBtn = document.getElementById('filterDrawerBtn');
    const filterDrawerClose = document.getElementById('filterDrawerClose');
    const filterDrawerOverlay = document.querySelector('.filter-drawer-overlay');
    const filterResetBtn = document.getElementById('filterResetBtn');
    const filterApplyBtn = document.getElementById('filterApplyBtn');
    
    function openFilterDrawer() {
        filterDrawer.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    
    function closeFilterDrawer() {
        filterDrawer.classList.remove('open');
        document.body.style.overflow = '';
    }
    
    if (filterDrawerBtn) {
        filterDrawerBtn.addEventListener('click', function() {
            openFilterDrawer();
        });
    }
    
    if (filterDrawerClose) {
        filterDrawerClose.addEventListener('click', function() {
            closeFilterDrawer();
        });
    }
    
    if (filterDrawerOverlay) {
        filterDrawerOverlay.addEventListener('click', function() {
            closeFilterDrawer();
        });
    }
    
    // Close drawer on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && filterDrawer.classList.contains('open')) {
            closeFilterDrawer();
        }
    });
    
    // Reset filters
    if (filterResetBtn) {
        filterResetBtn.addEventListener('click', function() {
            // Reset all filter inputs
            const filterInputs = filterDrawer.querySelectorAll('.filter-input');
            const filterSelects = filterDrawer.querySelectorAll('.filter-select');
            const filterCheckboxes = filterDrawer.querySelectorAll('input[type="checkbox"]');
            
            filterInputs.forEach(input => {
                input.value = '';
            });
            
            filterSelects.forEach(select => {
                select.selectedIndex = 0;
            });
            
            filterCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            
            showToast('Đã đặt lại bộ lọc', 2000);
        });
    }
    
    // Check if filters are active
    function hasActiveFilters() {
        const filterInputs = filterDrawer.querySelectorAll('.filter-input');
        const filterSelects = filterDrawer.querySelectorAll('.filter-select');
        const filterCheckboxes = filterDrawer.querySelectorAll('input[type="checkbox"]');
        
        // Check if any input has a value
        for (let input of filterInputs) {
            if (input.value.trim() !== '') return true;
        }
        
        // Check if any select is not on the first option
        for (let select of filterSelects) {
            if (select.selectedIndex !== 0) return true;
        }
        
        // Check if any checkbox is checked
        for (let checkbox of filterCheckboxes) {
            if (checkbox.checked) return true;
        }
        
        return false;
    }
    
    function updateFilterButtonState() {
        if (hasActiveFilters()) {
            filterDrawerBtn.classList.add('has-active-filters');
        } else {
            filterDrawerBtn.classList.remove('has-active-filters');
        }
    }
    
    // Apply filters
    if (filterApplyBtn) {
        filterApplyBtn.addEventListener('click', function() {
            // Collect filter values
            const filters = {
                dateRange: filterDrawer.querySelector('.date-range-inputs .filter-input').value,
                orderCode: filterDrawer.querySelector('.search-input-wrapper .filter-input').value,
                // Add more filters as needed
            };
            
            console.log('Applying filters:', filters);
            updateFilterButtonState();
            showToast('Đã áp dụng bộ lọc', 2000);
            closeFilterDrawer();
            
            // Here you would typically trigger a data fetch with the filters
        });
    }
    
    // Update button state when resetting
    if (filterResetBtn) {
        const originalResetHandler = filterResetBtn.onclick;
        filterResetBtn.addEventListener('click', function() {
            setTimeout(() => {
                updateFilterButtonState();
            }, 100);
        });
    }

    // Expandable Row functionality
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    expandButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const orderRow = this.closest('.order-row');
            const orderId = orderRow.dataset.orderId;
            const detailRow = document.querySelector(`.order-detail-row[data-order-id="${orderId}"]`);
            
            // Toggle expanded state
            const isExpanded = orderRow.classList.contains('expanded');
            
            if (isExpanded) {
                // Collapse
                orderRow.classList.remove('expanded');
                detailRow.classList.remove('expanded');
            } else {
                // Expand
                orderRow.classList.add('expanded');
                detailRow.classList.add('expanded');
            }
        });
    });
    
    // Also allow clicking the entire row (except checkbox and action buttons) to expand
    const orderRows = document.querySelectorAll('.order-row');
    orderRows.forEach(row => {
        row.addEventListener('click', function(e) {
            // Don't expand if clicking on checkbox, button, or action column
            if (e.target.closest('.col-checkbox') || 
                e.target.closest('.col-actions') || 
                e.target.closest('button') ||
                e.target.closest('input')) {
                return;
            }
            
            const expandBtn = this.querySelector('.expand-btn');
            if (expandBtn) {
                expandBtn.click();
            }
        });
        
        // Add cursor pointer for clickable rows
        row.style.cursor = 'pointer';
    });

    // Log initial load
    console.log('Dashboard loaded successfully');
    console.log('Total orders:', rowCheckboxes.length);
    console.log('Professional B2B interactions enabled ✓');
    console.log('Filter drawer ready ✓');
    console.log('Expandable rows enabled ✓');
});

// Professional B2B SaaS - Minimal animations for efficiency

