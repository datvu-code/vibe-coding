import React, { useState } from 'react';
import {
    Card, Tabs, Button, Input, Space, Tag, Typography, Checkbox,
    Dropdown, Menu, Pagination, Badge, Alert, Row, Col, Tooltip, Select,
    Drawer, Divider, DatePicker, Radio, Popover, Modal
} from 'antd';
import {
    FilterOutlined, ReloadOutlined, DownOutlined, CopyOutlined,
    ClockCircleOutlined, InfoCircleOutlined, ShopOutlined,
    CheckCircleOutlined, HistoryOutlined, LeftOutlined,
    RightOutlined, DoubleRightOutlined, EditOutlined, DeleteOutlined,
    PrinterOutlined, FileTextOutlined, GiftOutlined, BookOutlined,
    LinkOutlined, TagsOutlined, SearchOutlined, SortAscendingOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const OrderList = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [orderTypeFilter, setOrderTypeFilter] = useState('platform'); // 'platform', 'manual', 'my-orders', 'pos'
    const [activeStatusTab, setActiveStatusTab] = useState('all');
    const [logisticsDrawerVisible, setLogisticsDrawerVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [hoveredOrderId, setHoveredOrderId] = useState(null);
    const [hoveredOrderCardId, setHoveredOrderCardId] = useState(null);
    const [expandedGifts, setExpandedGifts] = useState(new Set());
    const [sortOption, setSortOption] = useState(null);
    const [updateInfoModalVisible, setUpdateInfoModalVisible] = useState(false);
    const [hoveredUpdateInfo, setHoveredUpdateInfo] = useState(false);
    const [searchFilterType, setSearchFilterType] = useState('order-code');

    // Helper function to generate mock product images
    const getProductImage = (productId, seed = null) => {
        const imageId = seed || productId || Math.floor(Math.random() * 1000);
        return `https://picsum.photos/seed/${imageId}/60/60`;
    };

    // Helper function to generate mock gift images (orange-ish tint)
    const getGiftImage = (giftId, seed = null) => {
        const imageId = seed || giftId || Math.floor(Math.random() * 1000);
        // Using Unsplash with orange/gift keywords for gift items
        return `https://source.unsplash.com/60x60/?gift,present&sig=${imageId}`;
    };

    // Channel logos mapping - using real logos from CDN
    const channelLogos = {
        shopee: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg',
        tiktok: 'https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg',
        haravan: 'https://www.haravan.com/favicon.ico',
        lazada: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Lazada_logo.svg',
        tiki: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Tiki.vn_logo.svg',
        default: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIjRUY1OTQxIi8+CjxwYXRoIGQ9Ik00IDRIMTJWMTJINFY0WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+'
    };

    // Mock Data with updated structure
    const orders = [
        {
            id: '251007F3DE2EC1',
            shopName: "Puka's Shop",
            channel: 'shopee',
            orderDate: '07/10/2025 13:51',
            status: 'packing',
            statusLabel: 'Đang đóng gói',
            products: [
                {
                    id: '000327SKLTHMSP',
                    name: 'Gói Bột Gia Vị Bột Phomai Raw Hữu Cơ 200G Nguyên Chất',
                    sku: '000327SKLTHMSP-1748318375',
                    variant: 'Mặc định',
                    quantity: 1,
                    image: getProductImage('000327SKLTHMSP'),
                    price: 2416500,
                    method: 'Cash on Delivery'
                }
            ],
            gifts: [
                {
                    id: 'GIFT001',
                    name: 'Quà tặng đặc biệt',
                    sku: 'GIFT-001',
                    quantity: 1,
                    image: getGiftImage('GIFT001')
                },
                {
                    id: 'GIFT002',
                    name: 'Quà tặng khuyến mãi',
                    sku: 'GIFT-002',
                    quantity: 2,
                    image: getGiftImage('GIFT002')
                }
            ],
            totalAmount: 2416500,
            warehouse: 'KHO THỜI TRANG',
            processing: {
                remaining: 'Quá hạn',
                shipBefore: '08/10/2025 23:59',
                prepareBefore: '08/10/2025 23:59'
            },
            shipping: {
                carrier: 'SPX Express',
                trackingNumber: 'SPXVN05926370071A',
                orderId: '251007F3DE2EC1',
                method: 'Vận chuyển tiêu chuẩn'
            },
            recipient: {
                name: 'Dat Vu',
                address: 'Số 89, ngõ 89, phường Ba Đình, Hà Nội'
            }
        },
        {
            id: '251007F3DE2EC2',
            shopName: "Puka's Shop",
            channel: 'tiktok',
            orderDate: '10/07/2025 16:31:06',
            status: 'cancelled',
            statusLabel: 'Đã hủy',
            statusDetail: 'Bị hủy bởi người mua',
            products: [
                {
                    id: 'PROD002',
                    name: 'Áo Chống Nắng Nam GUZADO Vải Thoáng Mát Chống Tia UV',
                    sku: 'ACN-GUZ-001',
                    variant: 'Xanh than',
                    quantity: 1,
                    image: getProductImage('PROD002'),
                    price: 440000,
                    method: 'Thanh toán khi giao hàng'
                }
            ],
            gifts: [],
            totalAmount: 440000,
            warehouse: 'KHO THỜI TRANG',
            processing: {
                remaining: 'Đã hủy',
                shipBefore: '12/07/2025 23:59',
                prepareBefore: '12/07/2025 23:59'
            },
            shipping: {
                carrier: 'J&T Express',
                trackingNumber: 'JTVN123456789',
                orderId: '251007F3DE2EC2',
                method: 'Vận chuyển tiêu chuẩn'
            },
            recipient: {
                name: 'Nguyễn Văn A',
                address: '123 Đường ABC, Quận 1, TP.HCM'
            }
        },
        {
            id: '251007F3DE2EC3',
            shopName: "Puka's Shop",
            channel: 'haravan',
            orderDate: '29/06/2025 23:12:00',
            status: 'completed',
            statusLabel: 'Hoàn thành',
            products: [
                {
                    id: 'PROD003',
                    name: 'Dây Thun Cao Su Cao Cấp, COMBINATION LOCK',
                    sku: 'DT-CS-001',
                    variant: 'Mặc định',
                    quantity: 1,
                    image: getProductImage('PROD003'),
                    price: 500000,
                    method: 'Thanh toán khi giao hàng'
                }
            ],
            gifts: [
                {
                    id: 'GIFT002',
                    name: 'Quà tặng khuyến mãi',
                    sku: 'GIFT-002',
                    quantity: 1,
                    image: getGiftImage('GIFT002')
                }
            ],
            totalAmount: 500000,
            warehouse: 'KHO THỜI TRANG',
            processing: {
                remaining: 'Hoàn thành',
                shipBefore: '01/07/2025 23:59',
                prepareBefore: '01/07/2025 23:59'
            },
            shipping: {
                carrier: 'SPX Express',
                trackingNumber: 'SPXVN987654321',
                orderId: '251007F3DE2EC3',
                method: 'Vận chuyển tiêu chuẩn'
            },
            recipient: {
                name: 'Trần Thị B',
                address: '456 Đường XYZ, Quận 2, TP.HCM'
            }
        },
        {
            id: '251007F3DE2EC4',
            shopName: "Puka's Shop",
            channel: 'lazada',
            orderDate: '07/10/2025 13:51',
            status: 'packing',
            statusLabel: 'Đang đóng gói',
            products: [
                {
                    id: '000327SKLTHMSP',
                    name: 'Gói Bột Gia Vị Bột Phomai Raw Hữu Cơ 200G Nguyên Chất',
                    sku: '000327SKLTHMSP-1748318375',
                    variant: 'Mặc định',
                    quantity: 2,
                    image: getProductImage('000327SKLTHMSP-2'),
                    price: 2416500,
                    method: 'Cash on Delivery'
                }
            ],
            gifts: [],
            totalAmount: 4833000,
            warehouse: 'KHO THỜI TRANG',
            processing: {
                remaining: 'Quá hạn',
                shipBefore: '08/10/2025 23:59',
                prepareBefore: '08/10/2025 23:59'
            },
            shipping: {
                carrier: 'SPX Express',
                trackingNumber: 'SPXVN05926370071A',
                orderId: '251007F3DE2EC4',
                method: 'Vận chuyển tiêu chuẩn'
            },
            recipient: {
                name: 'Dat Vu',
                address: 'Số 89, ngõ 89, phường Ba Đình, Hà Nội'
            }
        }
    ];

    const statusTabs = [
        { key: 'all', label: 'Tất cả' },
        { key: 'pending', label: 'Chờ duyệt (12)' },
        { key: 'packing', label: 'Đóng gói (12)' },
        { key: 'error', label: 'Xử lý lỗi (12)' },
        { key: 'shipping', label: 'Đang giao hàng (12)' },
        { key: 'completed', label: 'Hoàn thành (12)' },
        { key: 'cancelled', label: 'Hủy (12)' },
        { key: 'no-warehouse', label: 'Chưa có kho xử lý (12)' },
        { key: 'shipping-info', label: 'Thông tin vận đơn (21)' },
    ];

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedRowKeys(orders.map(order => order.id));
        } else {
            setSelectedRowKeys([]);
        }
    };

    const handleSelectOrder = (orderId, checked) => {
        if (checked) {
            setSelectedRowKeys([...selectedRowKeys, orderId]);
        } else {
            setSelectedRowKeys(selectedRowKeys.filter(id => id !== orderId));
        }
    };

    const handleActionMenuClick = (order, action) => {
        if (action === 'logistics-info') {
            setSelectedOrder(order);
            setLogisticsDrawerVisible(true);
        } else {
            // Handle other actions
            console.log('Action:', action, 'Order:', order.id);
        }
    };

    const getActionMenu = (order) => ({
        items: [
            {
                key: 'update-shipping',
                label: 'Cập nhật vận đơn',
                onClick: () => handleActionMenuClick(order, 'update-shipping')
            },
            {
                key: 'prepare',
                label: 'Chuẩn bị hàng',
                onClick: () => handleActionMenuClick(order, 'prepare')
            },
            {
                key: 'reload',
                label: 'Tải lại',
                onClick: () => handleActionMenuClick(order, 'reload')
            },
            {
                key: 'add-note',
                label: 'Thêm ghi chú người bán',
                onClick: () => handleActionMenuClick(order, 'add-note')
            },
            {
                key: 'copy',
                label: 'Sao chép đơn',
                onClick: () => handleActionMenuClick(order, 'copy')
            },
            {
                key: 'create-after-sale',
                label: 'Tạo đơn sau bán hàng',
                onClick: () => handleActionMenuClick(order, 'create-after-sale')
            },
            {
                key: 'cancel',
                label: 'Hủy đơn',
                danger: true,
                onClick: () => handleActionMenuClick(order, 'cancel')
            },
            { type: 'divider' },
            {
                key: 'print-shipping',
                label: 'In vận đơn',
                onClick: () => handleActionMenuClick(order, 'print-shipping')
            },
            {
                key: 'print-export',
                label: 'In phiếu xuất',
                onClick: () => handleActionMenuClick(order, 'print-export')
            },
            {
                key: 'print-handover',
                label: 'In biên bản bàn giao',
                onClick: () => handleActionMenuClick(order, 'print-handover')
            }
        ]
    });

    const bulkActionsMenu = {
        items: [
            {
                key: 'bulk-reload',
                label: 'Tải lại',
                icon: <ReloadOutlined />
            },
            {
                key: 'bulk-add-tag',
                label: 'Thêm tag',
                icon: <TagsOutlined />
            },
            {
                key: 'bulk-auto-link',
                label: 'Tự động liên kết đơn',
                icon: <LinkOutlined />
            }
        ]
    };

    const { RangePicker } = DatePicker;

    return (
        <div style={{ minHeight: '100vh' }}>
            {/* Info Alert */}
            <Alert
                message={<Text style={{ fontSize: 14, fontFamily: 'Roboto, sans-serif', fontWeight: 'normal' }}>Các đơn hàng có thời gian hơn 90 ngày sẽ được chuyển vào Lịch sử và không thể xử lý được nữa.</Text>}
                type="info"
                showIcon
                style={{ marginBottom: 20, border: '0.87px solid #91CAFF', background: '#E6F4FF' }}
            />

            {/* Status Tabs */}
            <div style={{ display: 'flex', gap: 21, marginBottom: 14 }}>
                {statusTabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveStatusTab(tab.key)}
                        style={{
                            border: 'none',
                            borderBottom: activeStatusTab === tab.key ? '1.74px solid #EF5941' : 'none',
                            background: 'transparent',
                            padding: '10px 0',
                            cursor: 'pointer',
                            fontSize: 14,
                            fontWeight: activeStatusTab === tab.key ? 600 : 400,
                            color: activeStatusTab === tab.key ? '#EF5941' : 'rgba(0,0,0,0.88)'
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* First Card - Filter Section */}
            <Card
                bodyStyle={{ padding: '14px' }}
                style={{ marginBottom: 14, borderRadius: 3 }}
            >
                {/* Order Type Filter Row */}
                <div style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>Loại đơn</Text>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        {[
                            { value: 'platform', label: 'Đơn từ sàn' },
                            { value: 'manual', label: 'Đơn thủ công' },
                            { value: 'my-orders', label: 'Đơn của tôi' },
                            { value: 'pos', label: 'Đơn POS' }
                        ].map((option) => (
                            <div
                                key={option.value}
                                onClick={() => setOrderTypeFilter(option.value)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: 4,
                                    cursor: 'pointer',
                                    fontSize: 14,
                                    fontWeight: orderTypeFilter === option.value ? 500 : 400,
                                    color: orderTypeFilter === option.value ? '#EF5941' : 'rgba(0,0,0,0.88)',
                                    background: orderTypeFilter === option.value ? '#FFF1F0' : '#FAFAFA',
                                    border: orderTypeFilter === option.value ? '1px solid #EF5941' : '1px solid #D9D9D9',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                </div>

                <Row gutter={[16, 16]}>
                        <Col span={6}>
                            <div>
                                <Text style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Thời gian tạo đơn hàng</Text>
                                <RangePicker
                                    style={{ width: '100%' }}
                                    format="HH:mm DD/MM/YYYY"
                                    showTime
                                />
                            </div>
                        </Col>
                        <Col span={6}>
                            <div>
                                <Text style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Chọn sàn</Text>
                                <Select
                                    placeholder="Chọn sàn"
                                    style={{ width: '100%' }}
                                    allowClear
                                >
                                    <Option value="shopee">Shopee</Option>
                                    <Option value="tiktok">TikTok</Option>
                                    <Option value="haravan">Haravan</Option>
                                    <Option value="lazada">Lazada</Option>
                                </Select>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div>
                                <Text style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Chọn gian hàng</Text>
                                <Select
                                    placeholder="Chọn gian hàng"
                                    style={{ width: '100%' }}
                                    allowClear
                                >
                                    <Option value="shop1">Shop 1</Option>
                                    <Option value="shop2">Shop 2</Option>
                                </Select>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div>
                                <Text style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Mã đơn hàng</Text>
                                <Input.Group compact>
                                    <Input
                                        placeholder="Tìm đơn hàng"
                                        prefix={<SearchOutlined />}
                                        allowClear
                                        style={{ width: '60%' }}
                                    />
                                    <Select
                                        value={searchFilterType}
                                        onChange={setSearchFilterType}
                                        style={{ width: '40%' }}
                                        dropdownMatchSelectWidth={false}
                                        dropdownStyle={{ minWidth: '200px' }}
                                    >
                                        <Option value="order-code">Mã đơn hàng</Option>
                                        <Option value="shipping-code">Mã vận đơn</Option>
                                        <Option value="sku">SKU hàng hoá sàn</Option>
                                        <Option value="product-name">Tên sản phẩm</Option>
                                        <Option value="utm">UTM</Option>
                                        <Option value="package-code">Mã kiện hàng</Option>
                                    </Select>
                                </Input.Group>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div>
                                <Text style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>Chọn kho</Text>
                                <Select
                                    placeholder="Chọn kho"
                                    style={{ width: '100%' }}
                                    allowClear
                                >
                                    <Option value="warehouse1">Kho 1</Option>
                                    <Option value="warehouse2">Kho 2</Option>
                                </Select>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div style={{ display: 'flex', alignItems: 'flex-end', height: '100%' }}>
                                <Button icon={<FilterOutlined />} style={{ width: '100%' }}>
                                    Lọc đơn hàng nâng cao
                                </Button>
            </div>
                        </Col>
                    </Row>

                {/* Action Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Space size={14}>
                        <Dropdown 
                            menu={{
                                items: [
                                    { key: 'bulk-process-1', label: 'Xử lý hàng loạt 1' },
                                    { key: 'bulk-process-2', label: 'Xử lý hàng loạt 2' }
                                ]
                            }}
                            trigger={['click']}
                        >
                            <Button 
                                style={{ background: 'rgba(0,0,0,0.06)', border: 'none' }}
                            >
                                Xử lý hàng loạt <DownOutlined style={{ fontSize: 10, marginLeft: 4 }} />
                            </Button>
                        </Dropdown>
                        <Dropdown 
                            menu={{
                                items: [
                                    { key: 'export-orders-1', label: 'Xuất đơn hàng 1' },
                                    { key: 'export-orders-2', label: 'Xuất đơn hàng 2' }
                                ]
                            }}
                            trigger={['click']}
                        >
                            <Button 
                                style={{ background: 'rgba(0,0,0,0.06)', border: 'none' }}
                            >
                                Xuất đơn hàng <DownOutlined style={{ fontSize: 10, marginLeft: 4 }} />
                            </Button>
                        </Dropdown>
                        <Dropdown 
                            menu={{
                                items: [
                                    { key: 'export-payment-1', label: 'Xuất giao dịch thanh toán 1' },
                                    { key: 'export-payment-2', label: 'Xuất giao dịch thanh toán 2' }
                                ]
                            }}
                            trigger={['click']}
                        >
                            <Button 
                                style={{ background: 'rgba(0,0,0,0.06)', border: 'none' }}
                            >
                                Xuất giao dịch thanh toán <DownOutlined style={{ fontSize: 10, marginLeft: 4 }} />
                    </Button>
                        </Dropdown>
                        <Button icon={<HistoryOutlined />} type="text" />
                </Space>
            </div>
            </Card>

            {/* Main Content Card */}
            <Card
                bodyStyle={{ padding: '14px' }}
                style={{ borderRadius: 3, marginTop: 14 }}
            >
                {/* Update Info Bar */}
                <div style={{ 
                    padding: '0 0 14px 0', 
                    borderBottom: '0.87px solid #F0F0F0', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: 7
                }}>
                    <Space size={7}>
                        <Badge status="success" />
                        <Text 
                            type="secondary" 
                            style={{ 
                                fontSize: 12,
                                cursor: 'pointer',
                                color: hoveredUpdateInfo ? 'rgba(0,0,0,0.88)' : 'rgba(0,0,0,0.45)',
                                transition: 'color 0.2s'
                            }}
                            onMouseEnter={() => setHoveredUpdateInfo(true)}
                            onMouseLeave={() => setHoveredUpdateInfo(false)}
                            onClick={() => setUpdateInfoModalVisible(true)}
                        >
                            Lần cập nhật gần nhất: 14:02 24/12/2025
                        </Text>
                    </Space>
                    <Dropdown
                        trigger={['click']}
                        placement="bottomRight"
                        dropdownRender={() => (
                            <div style={{
                                background: '#fff',
                                padding: '12px',
                                borderRadius: '4px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                minWidth: '250px'
                            }}>
                                <Radio.Group
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                    style={{ width: '100%' }}
                                >
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        <Radio value="order-time-oldest">Thời gian đặt hàng (cũ nhất trước)</Radio>
                                        <Radio value="order-time-newest">Thời gian đặt hàng (mới nhất trước)</Radio>
                                        <Radio value="warehouse-time-oldest">Thời gian xuất kho (cũ nhất trước)</Radio>
                                        <Radio value="warehouse-time-newest">Thời gian xuất kho (mới nhất trước)</Radio>
                                        <Radio value="delivery-deadline-oldest">Hạn giao hàng (cũ nhất trước)</Radio>
                                        <Radio value="delivery-deadline-newest">Hạn giao hàng (mới nhất trước)</Radio>
                                    </Space>
                                </Radio.Group>
                </div>
                        )}
                    >
                        <Button size="small" icon={<SortAscendingOutlined />}>
                            Sắp xếp theo
                        </Button>
                    </Dropdown>
                </div>

                {/* Select All Header */}
                <div style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #F0F0F0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16
                }}>
                    <Checkbox
                        checked={selectedRowKeys.length === orders.length && orders.length > 0}
                        indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < orders.length}
                        onChange={handleSelectAll}
                    />
                    {selectedRowKeys.length > 0 ? (
                        <>
                            <Text style={{ fontSize: 14 }}>
                                Đã chọn <strong>{selectedRowKeys.length}</strong> đơn hàng
                            </Text>
                            <Space>
                                <Button size="small">
                                    Tải lại
                                </Button>
                                <Button size="small">
                                    Thêm tag
                                </Button>
                                <Button size="small">
                                    Tự động liên kết đơn
                                </Button>
                            </Space>
                        </>
                    ) : (
                        <Text style={{ fontSize: 14, color: '#000000A6' }}>
                            {orders.length} đơn hàng
                        </Text>
                    )}
                </div>

                {/* Card List Container */}
                <div style={{ marginTop: 14 }}>

                    {/* Order Cards List */}
                    {orders.map((order, index) => (
                        <Card
                            key={order.id}
                            style={{
                                marginBottom: 12,
                                borderRadius: 8,
                                border: '1px solid #F0F0F0'
                            }}
                            bodyStyle={{ padding: 0 }}
                        >
                            {/* Order Header */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '12px 16px',
                                background: '#FAFAFA',
                                borderBottom: '1px solid #F0F0F0'
                            }}>
                                <Space size={16}>
                                    <Checkbox
                                        checked={selectedRowKeys.includes(order.id)}
                                        onChange={(e) => handleSelectOrder(order.id, e.target.checked)}
                                    />
                                    <Space size={8}>
                                        <Text style={{ fontSize: 14 }}>Mã đơn hàng: </Text>
                                        <span
                                            style={{
                                                fontSize: 14,
                                                color: hoveredOrderId === order.id ? '#1677FF' : 'inherit',
                                                cursor: 'pointer',
                                                textDecoration: hoveredOrderId === order.id ? 'underline' : 'none',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.stopPropagation();
                                                setHoveredOrderId(order.id);
                                            }}
                                            onMouseLeave={(e) => {
                                                e.stopPropagation();
                                                setHoveredOrderId(null);
                                            }}
                                            onClick={() => {
                                                navigator.clipboard.writeText(order.id);
                                            }}
                                        >
                                            {order.id}
                                        </span>
                                        <Tooltip title="Sao chép mã đơn hàng">
                                            <CopyOutlined 
                                                style={{ 
                                                    color: hoveredOrderId === order.id ? '#1677FF' : '#BFBFBF', 
                                                    cursor: 'pointer', 
                                                    fontSize: 14,
                                                    transition: 'color 0.2s'
                                                }}
                                                onClick={() => {
                                                    navigator.clipboard.writeText(order.id);
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.stopPropagation();
                                                    setHoveredOrderId(order.id);
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.stopPropagation();
                                                    setHoveredOrderId(null);
                                                }}
                                            />
                                        </Tooltip>
                                    </Space>
                                </Space>
                                <Space size={16}>
                                    <Text type="secondary" style={{ fontSize: 13 }}>
                                        {order.orderDate}
                                    </Text>
                                    <Tag
                                        color={order.status === 'cancelled' ? 'error' : order.status === 'completed' ? 'success' : 'processing'}
                                        style={{ margin: 0 }}
                                    >
                                        {order.statusLabel}
                                    </Tag>
                                </Space>
                            </div>

                            {/* Order Content - Card Layout */}
                            <div 
                                style={{
                                display: 'grid',
                                    gridTemplateColumns: '1fr 200px 250px 180px',
                                    gap: 16,
                                    padding: 0,
                                    position: 'relative'
                                }}
                            >
                                {/* Column 1: Sản phẩm */}
                                <div style={{ padding: '16px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        {order.products.map((product, pIndex) => (
                                            <div key={product.id} style={{ display: 'flex', gap: 12 }}>
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    style={{ width: 60, height: 60, borderRadius: 4, objectFit: 'cover', flexShrink: 0 }}
                                                />
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                                        <Tooltip title={product.name} placement="top">
                                                            <Text 
                                                                style={{ 
                                                                    fontSize: 14, 
                                                                    display: 'inline-block', 
                                                                    maxWidth: '200px',
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    whiteSpace: 'nowrap',
                                                                    flex: 1,
                                                                    color: 'rgba(0,0,0,0.88)'
                                                                }}
                                                            >
                                                                {product.name}
                                                            </Text>
                                                        </Tooltip>
                                                        <Text style={{ fontSize: 14, whiteSpace: 'nowrap', color: 'rgba(0,0,0,0.88)' }}>
                                                            × {product.quantity}
                                                        </Text>
                                                    </div>
                                                    <div style={{ marginBottom: 4 }}>
                                                        {product.variant && (
                                                            <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.65)' }}>{product.variant}</Text>
                                                        )}
                                                    </div>
                                                    <div style={{ marginBottom: 4 }}>
                                                        <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.65)' }}>SKU: {product.sku}</Text>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {order.gifts && order.gifts.length > 0 && (
                                            <div style={{ marginTop: 8 }}>
                                                <Popover
                                                    content={
                                                        <div style={{ minWidth: 300, maxWidth: 400 }}>
                                                            {order.gifts.map((gift, gIndex) => (
                                                                <div key={gift.id} style={{ 
                                                                    marginBottom: gIndex < order.gifts.length - 1 ? 16 : 0,
                                                                    display: 'flex',
                                                                    gap: 12
                                                                }}>
                                                                    {gift.image && (
                                                                        <img
                                                                            src={gift.image}
                                                                            alt={gift.name}
                                                                            style={{ width: 40, height: 40, borderRadius: 4, objectFit: 'cover', flexShrink: 0 }}
                                                                        />
                                                                    )}
                                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                                                            <Text 
                                                                                style={{ 
                                                                                    fontSize: 13, 
                                                                                    display: 'inline-block', 
                                                                                    maxWidth: '200px',
                                                                                    overflow: 'hidden',
                                                                                    textOverflow: 'ellipsis',
                                                                                    whiteSpace: 'nowrap',
                                                                                    flex: 1,
                                                                                    color: 'rgba(0,0,0,0.88)'
                                                                                }}
                                                                            >
                                                                                {gift.name}
                                                                            </Text>
                                                                            <Text style={{ fontSize: 13, whiteSpace: 'nowrap', color: 'rgba(0,0,0,0.88)' }}>
                                                                                × {gift.quantity}
                                                                            </Text>
                                                                        </div>
                                                                        <div style={{ marginBottom: 4 }}>
                                                                            <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.65)' }}>SKU: {gift.sku}</Text>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    }
                                                    trigger="click"
                                                    placement="right"
                                                >
                                                    <Tag 
                                                        color="orange" 
                                                        icon={<GiftOutlined />} 
                                                        style={{ 
                                                            margin: 0, 
                                                            cursor: 'pointer',
                                                            userSelect: 'none'
                                                        }}
                                                    >
                                                        Quà tặng ({order.gifts.length}) <DownOutlined style={{ fontSize: 10, marginLeft: 4 }} />
                                                    </Tag>
                                                </Popover>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Column 2: Tổng tiền */}
                                <div style={{ padding: '16px' }}>
                                    <div>
                                        <Text style={{ fontSize: 14, display: 'block', color: 'rgba(0,0,0,0.88)' }}>
                                            {order.totalAmount.toLocaleString()}₫
                                        </Text>
                                    </div>
                                </div>

                                {/* Column 3: Người nhận */}
                                <div style={{ padding: '16px' }}>
                                <div>
                                        <Tooltip title={order.recipient.name} placement="top">
                                            <Text 
                                                style={{ 
                                                    fontSize: 14, 
                                                    display: 'block', 
                                                    marginBottom: 8,
                                                    maxWidth: '100%',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    color: 'rgba(0,0,0,0.88)'
                                                }}
                                            >
                                                {order.recipient.name}
                                            </Text>
                                        </Tooltip>
                                        <Tooltip title={order.recipient.address} placement="top">
                                            <Text 
                                                style={{ 
                                                    fontSize: 14,
                                                    display: 'block',
                                                    maxWidth: '100%',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    color: 'rgba(0,0,0,0.65)'
                                                }}
                                            >
                                                {order.recipient.address}
                                            </Text>
                                        </Tooltip>
                                </div>
                                </div>

                                {/* Column 4: Thao tác */}
                                <div style={{ padding: '16px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        <Button
                                            type="primary"
                                            onClick={() => {
                                                setSelectedOrder(order);
                                                setLogisticsDrawerVisible(true);
                                            }}
                                            style={{ fontSize: 13, width: '100%' }}
                                        >
                                            Thông tin kho vận
                                        </Button>
                                        <Dropdown 
                                            menu={getActionMenu(order)} 
                                            trigger={['click']}
                                            placement="bottomRight"
                                        >
                                            <Button 
                                                style={{ fontSize: 13, width: '100%' }}
                                            >
                                                Thao tác <DownOutlined style={{ fontSize: 10, marginLeft: 4 }} />
                                            </Button>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Footer / Pagination */}
                <div style={{ 
                    padding: '14px 0 0 0', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    borderTop: '0.87px solid #F0F0F0',
                    marginTop: 0
                }}>
                    <Select
                        defaultValue="20"
                        style={{ 
                            width: 140, 
                            background: 'transparent',
                            color: 'rgba(0,0,0,0.88)'
                        }}
                        suffixIcon={<DownOutlined style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }} />}
                    >
                        <Option value="20">20 bản ghi/trang</Option>
                        <Option value="50">50 bản ghi/trang</Option>
                        <Option value="100">100 bản ghi/trang</Option>
                    </Select>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <Text type="secondary" style={{ fontSize: 12 }}>Tổng: 50</Text>
                        <Space size={7}>
                            <Button 
                                type="text" 
                                icon={<LeftOutlined style={{ fontSize: 14 }} />}
                                style={{ width: 28, height: 28, padding: 0 }}
                            />
                            <Button 
                                type="text"
                                style={{ 
                                    width: 28, 
                                    height: 28, 
                                    padding: 0,
                                    background: '#fff',
                                    border: '0.87px solid rgba(0,0,0,0.15)',
                                    color: 'rgba(0,0,0,0.88)',
                                    fontWeight: 600
                                }}
                            >
                                1
                            </Button>
                            <Button 
                                type="text"
                                style={{ width: 28, height: 28, padding: 0 }}
                            >
                                2
                            </Button>
                            <Button 
                                type="text"
                                style={{ width: 28, height: 28, padding: 0 }}
                            >
                                3
                        </Button>
                            <Button 
                                type="text" 
                                icon={<RightOutlined style={{ fontSize: 14 }} />}
                                style={{ width: 28, height: 28, padding: 0 }}
                            />
                            <Button 
                                type="text" 
                                icon={<DoubleRightOutlined style={{ fontSize: 12 }} />}
                                style={{ width: 28, height: 28, padding: 0 }}
                            />
                        </Space>
                    </div>
                </div>
            </Card>

            {/* Update Info Modal */}
            <Modal
                title={null}
                open={updateInfoModalVisible}
                onCancel={() => setUpdateInfoModalVisible(false)}
                footer={null}
                width={600}
                centered
                closable={true}
                maskClosable={true}
            >
                <div style={{ padding: 0 }}>
                    {/* Header */}
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: 16,
                        paddingBottom: 12,
                        borderBottom: '1px solid #F0F0F0'
                    }}>
                        <Text style={{ fontSize: 14 }}>Ngày: 22 - 23/12/2025</Text>
                        <Text style={{ fontSize: 14, color: 'rgba(0,0,0,0.65)' }}>Cập nhật gần nhất lúc: 20:00 23/12/2025</Text>
                    </div>

                    {/* Shop List */}
                    <div>
                        {[
                            { name: 'upbase1', channel: 'shopee', status: '0/0' },
                            { name: 'Puka1', channel: 'haravan', status: '0/0' },
                            { name: 'Baybyyy Shop', channel: 'tiktok', status: '0/0' },
                            { name: "Puka's Shop", channel: 'shopee', status: '0/0' }
                        ].map((shop, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '12px 0',
                                borderBottom: index < 3 ? '1px solid #F0F0F0' : 'none'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                                    <img
                                        src={channelLogos[shop.channel] || channelLogos.default}
                                        alt={shop.channel}
                                        style={{ width: 20, height: 20, objectFit: 'contain' }}
                                        onError={(e) => {
                                            e.target.src = channelLogos.default;
                                        }}
                                    />
                                    <Text style={{ fontSize: 14 }}>{shop.name}</Text>
                                </div>
                                <div style={{ marginRight: 16 }}>
                                    <Text style={{ fontSize: 14, color: '#FF4D4F' }}>0</Text>
                                    <Text style={{ fontSize: 14 }}>/0</Text>
                                </div>
                                <Button 
                                    size="small"
                                    style={{ 
                                        background: 'rgba(0,0,0,0.06)',
                                        borderColor: 'rgba(0,0,0,0.06)',
                                        color: 'rgba(0,0,0,0.88)',
                                        fontSize: 12,
                                        height: 28
                                    }}
                                >
                                    Cập nhật
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>

            {/* Logistics Info Drawer */}
            <Drawer
                title="Thông tin kho vận"
                placement="right"
                width={500}
                onClose={() => setLogisticsDrawerVisible(false)}
                open={logisticsDrawerVisible}
            >
                {selectedOrder && (
                    <div>
                        {/* Kho xử lý */}
                        <div style={{ marginBottom: 24 }}>
                            <Title level={5} style={{ marginBottom: 12 }}>Kho xử lý</Title>
                            <Text style={{ fontSize: 14 }}>{selectedOrder.warehouse}</Text>
                        </div>

                        <Divider />

                        {/* Xử lý */}
                        <div style={{ marginBottom: 24 }}>
                            <Title level={5} style={{ marginBottom: 12 }}>Xử lý</Title>
                            <Space direction="vertical" size={12} style={{ width: '100%' }}>
                                <div>
                                    <Text type="secondary" style={{ fontSize: 13 }}>Giao trước:</Text>
                                    <div style={{ marginTop: 4 }}>
                                        <Text style={{ fontSize: 14 }}>{selectedOrder.processing.shipBefore}</Text>
                                    </div>
                                </div>
                                <div>
                                    <Text type="secondary" style={{ fontSize: 13 }}>Chuẩn bị hàng trước:</Text>
                                    <div style={{ marginTop: 4 }}>
                                        <Text style={{ fontSize: 14 }}>{selectedOrder.processing.prepareBefore}</Text>
                                    </div>
                                </div>
                            </Space>
                        </div>

                        <Divider />

                        {/* Vận chuyển */}
                        <div>
                            <Title level={5} style={{ marginBottom: 12 }}>Vận chuyển</Title>
                            <Space direction="vertical" size={12} style={{ width: '100%' }}>
                                <div>
                                    <Text type="secondary" style={{ fontSize: 13 }}>Hình thức:</Text>
                                    <div style={{ marginTop: 4 }}>
                                        <Text style={{ fontSize: 14 }}>{selectedOrder.shipping.method}</Text>
                                    </div>
                                </div>
                                <div>
                                    <Text type="secondary" style={{ fontSize: 13 }}>Mã kiện hàng:</Text>
                                    <div style={{ marginTop: 4 }}>
                                        <Text style={{ fontSize: 14 }}>{selectedOrder.shipping.orderId}</Text>
                                    </div>
                                </div>
                                <div>
                                    <Text type="secondary" style={{ fontSize: 13 }}>Mã vận đơn:</Text>
                                    <div style={{ marginTop: 4 }}>
                                        <Text style={{ fontSize: 14 }}>{selectedOrder.shipping.trackingNumber}</Text>
                                    </div>
                                </div>
                            </Space>
                        </div>
                    </div>
                )}
            </Drawer>
        </div>
    );
};

export default OrderList;
