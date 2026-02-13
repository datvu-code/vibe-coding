import React, { useState } from 'react';
import {
    Card, Button, Input, Space, Tag, Typography, Select,
    Dropdown, Row, Col, Checkbox, Badge
} from 'antd';
import {
    DownOutlined, SearchOutlined, FilterOutlined
} from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Text } = Typography;
const { Option } = Select;

// Channel metadata helper
const getChannelMeta = (channelKey) => {
    const key = (channelKey || '').toLowerCase();
    const labelMap = {
        shopee: 'Shopee',
        tiktok: 'TikTok Shop',
        lazada: 'Lazada',
        tiki: 'Tiki',
        haravan: 'Haravan',
        facebook: 'Facebook',
        upbase: 'Upbase'
    };
    const logoMap = {
        shopee: '🛍️',
        tiktok: '🎵',
        lazada: '🛒',
        tiki: '📦',
        haravan: '🏬',
        facebook: '👥',
        upbase: '🔶'
    };
    return {
        key,
        platformLabel: labelMap[key] || 'Kênh bán',
        logo: logoMap[key] || '🏪'
    };
};

// Mock data
const generateMockProducts = () => {
    return [
        {
            id: 1,
            name: 'Mặt Nạ Baegayul Moisture Balancing Mask Cấp Ẩm Làm Dịu 10 chiếc/hộp',
            image: 'https://picsum.photos/seed/product1/60/60',
            sku: '8809689160157',
            store: 'UpBeauty Store',
            channel: 'shopee',
            status: 'active',
            statusText: 'Hoạt động',
            linkStatus: 'linked-warehouse',
            linkStatusText: 'Đã liên kết kho',
            itemLinkStatus: 'linked-item',
            itemLinkStatusText: 'Đã liên kết hàng hóa',
            price: '720,000 ₫',
            stock: '40 (có sẵn 40)',
            createTime: '15/09/2025 20:59',
            updateTime: '25/01/2026 00:08'
        },
        {
            id: 2,
            name: 'Nước hoa hồng SKIN1004 Madagascar Centella Toning Toner làm dịu da, cân bằng độ pH ...',
            image: 'https://picsum.photos/seed/product2/60/60',
            sku: '8809576261141',
            store: 'UpBeauty Store',
            channel: 'shopee',
            status: 'active',
            statusText: 'Hoạt động',
            linkStatus: 'linked-warehouse',
            linkStatusText: 'Đã liên kết kho',
            itemLinkStatus: 'linked-item',
            itemLinkStatusText: 'Đã liên kết hàng hóa',
            variant: '210ml',
            price: '471,273 ₫',
            stock: '35 (có sẵn 31)',
            createTime: '14/09/2025 18:30',
            updateTime: '24/01/2026 23:45'
        }
    ];
};

const ProductLinkingView = () => {
    const [selectedPlatform, setSelectedPlatform] = useState('shopee');
    const [activeStatusTab, setActiveStatusTab] = useState('all');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedStore, setSelectedStore] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [linkFilter, setLinkFilter] = useState('all');
    const [frameFilter, setFrameFilter] = useState('all');
    
    const products = generateMockProducts();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    const pageProducts = products.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const platforms = [
        { key: 'tiktok', label: 'Tiktok', count: 221 },
        { key: 'lazada', label: 'Lazada', count: 0 },
        { key: 'shopee', label: 'Shopee', count: 166 },
        { key: 'tiki', label: 'Tiki', count: 0 },
        { key: 'haravan', label: 'Haravan', count: 0 },
        { key: 'facebook', label: 'Facebook', count: 34 },
        { key: 'upbase', label: 'Upbase', count: 331 }
    ];

    const statusTabs = [
        { key: 'all', label: 'Tất cả', count: 163 },
        { key: 'active', label: 'Đang hoạt động', count: 163 },
        { key: 'low-stock', label: 'Sắp hết hàng', count: 13 },
        { key: 'out-of-stock', label: 'Hết hàng', count: 88 },
        { key: 'hidden', label: 'Đã ẩn', count: 0 },
        { key: 'violation', label: 'Vi phạm', count: 0 },
        { key: 'virtual', label: 'Hàng hoá ảo', count: 0 },
        { key: 'optimize', label: 'Cần tối ưu nội dung', count: 2 }
    ];

    const getLinkStatusTag = (status, text) => {
        const config = {
            'linked-warehouse': { color: '#52c41a', bgColor: '#f6ffed' },
            'linked-item': { color: '#52c41a', bgColor: '#f6ffed' }
        };
        const style = config[status] || { color: '#8C8C8C', bgColor: '#F0F0F0' };
        return (
            <Tag style={{ 
                color: style.color,
                background: style.bgColor,
                border: 'none',
                fontSize: 12,
                padding: '2px 8px'
            }}>
                {text}
            </Tag>
        );
    };

    const handleSelectAll = (e) => {
        const pageIds = pageProducts.map(p => p.id);
        if (e.target.checked) {
            setSelectedRowKeys(prev => [...new Set([...prev, ...pageIds])]);
        } else {
            setSelectedRowKeys(prev => prev.filter(id => !pageIds.includes(id)));
        }
    };

    const handleSelectRow = (id, checked) => {
        if (checked) {
            setSelectedRowKeys([...selectedRowKeys, id]);
        } else {
            setSelectedRowKeys(selectedRowKeys.filter(key => key !== id));
        }
    };

    const bulkActionMenuItems = [
        { key: 'seo', label: 'Kiểm tra SEO' },
        { key: 'ai-optimize', label: 'AI tối ưu nội dung' },
        { key: 'add-prefix', label: 'Thêm tiền tố tên & khung ảnh' },
        { key: 'remove-prefix', label: 'Xoá tiền tố và khung ảnh' },
        { key: 'reload', label: 'Tải lại sản phẩm' },
        { key: 'edit-price', label: 'Sửa giá & tồn kho' },
        { key: 'edit-min-price', label: 'Sửa giá tối thiểu' },
        { key: 'edit-info', label: 'Sửa thông tin sản phẩm' },
        { key: 'edit-origin', label: 'Sửa ảnh gốc & tag' },
        { key: 'hide', label: 'Ẩn sản phẩm' },
        { key: 'create-warehouse', label: 'Tạo sản phẩm kho từ sản phẩm sàn' }
    ];

    return (
        <div>
            {/* Top Section - Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14, gap: 8 }}>
                <Button
                    style={{
                        background: 'rgba(0,0,0,0.06)',
                        border: 'none',
                        fontSize: 14
                    }}
                >
                    Sao chép sản phẩm
                </Button>
                <Button
                    type="primary"
                    style={{
                        background: '#EF5941',
                        borderColor: '#EF5941',
                        fontSize: 14
                    }}
                >
                    Thêm sản phẩm
                </Button>
            </div>

            {/* Platform Select */}
            <div style={{ marginBottom: 14 }}>
                <Select
                    value={selectedPlatform}
                    onChange={setSelectedPlatform}
                    style={{ minWidth: 200 }}
                    optionLabelProp="label"
                >
                    {platforms.map((platform) => {
                        const meta = getChannelMeta(platform.key);
                        return (
                            <Option 
                                key={platform.key} 
                                value={platform.key}
                                label={
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span>{meta.logo}</span>
                                        <span>{platform.label}</span>
                                        <Badge 
                                            count={platform.count} 
                                            showZero 
                                            style={{ 
                                                backgroundColor: platform.count > 0 ? '#EF5941' : '#D9D9D9',
                                                fontSize: 12
                                            }}
                                        />
                                    </span>
                                }
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontSize: 18 }}>{meta.logo}</span>
                                    <Text style={{ fontSize: 14 }}>{platform.label}</Text>
                                    <Badge 
                                        count={platform.count} 
                                        showZero 
                                        style={{ 
                                            backgroundColor: platform.count > 0 ? '#EF5941' : '#D9D9D9',
                                            fontSize: 12
                                        }}
                                    />
                                </div>
                            </Option>
                        );
                    })}
                </Select>
            </div>

            {/* Filter Section - on top of table (PlatformProductsView pattern) */}
            <Card
                styles={{ body: { padding: '14px 16px' } }}
                style={{
                    borderRadius: 8,
                    backgroundColor: '#fff',
                    border: '1px solid #F0F0F0',
                    marginBottom: 14
                }}
            >
                <Row gutter={[16, 16]} align="top">
                    <Col span={4}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            <Text style={{ fontSize: 14, lineHeight: '22px' }}>Nhập tags</Text>
                            <Select
                                placeholder="Nhập tags"
                                value={selectedTags}
                                onChange={setSelectedTags}
                                style={{ width: '100%', fontSize: 14 }}
                                allowClear
                                mode="multiple"
                            >
                                <Option value="tag1">Tag 1</Option>
                                <Option value="tag2">Tag 2</Option>
                            </Select>
                        </div>
                    </Col>
                    <Col span={4}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            <Text style={{ fontSize: 14, lineHeight: '22px' }}>Liên kết</Text>
                            <Select
                                value={linkFilter}
                                onChange={setLinkFilter}
                                style={{ width: '100%', fontSize: 14 }}
                            >
                                <Option value="all">Tất cả</Option>
                                <Option value="linked">Liên kết</Option>
                            </Select>
                        </div>
                    </Col>
                    <Col span={4}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            <Text style={{ fontSize: 14, lineHeight: '22px' }}>Khung ảnh</Text>
                            <Select
                                value={frameFilter}
                                onChange={setFrameFilter}
                                style={{ width: '100%', fontSize: 14 }}
                            >
                                <Option value="all">Tất cả</Option>
                                <Option value="frame1">Khung ảnh 1</Option>
                            </Select>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            <Text style={{ fontSize: 14, lineHeight: '22px' }}>Tên sản phẩm/SKU</Text>
                            <Input
                                placeholder="Tên sản phẩm/SKU"
                                prefix={<SearchOutlined />}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                allowClear
                                style={{ width: '100%', fontSize: 14 }}
                            />
                        </div>
                    </Col>
                    <Col span={3}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            <Text style={{ fontSize: 14, lineHeight: '22px' }}>Gian hàng</Text>
                            <Select
                                placeholder="Chọn gian hàng"
                                value={selectedStore}
                                onChange={setSelectedStore}
                                style={{ width: '100%', fontSize: 14 }}
                                allowClear
                            >
                                <Option value="upbeauty">UpBeauty Store</Option>
                            </Select>
                        </div>
                    </Col>
                    <Col span={3}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            <div style={{ height: 22 }} />
                            <Button
                                icon={<FilterOutlined />}
                                style={{ fontSize: 14 }}
                            >
                                Lọc sản phẩm nâng cao
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Card>

            {/* Table Section - Tabs + Table (PlatformProductsView pattern) */}
            <Card
                styles={{ body: { padding: 0 } }}
                style={{
                    borderRadius: 8,
                    backgroundColor: '#fff',
                    border: '1px solid #F0F0F0'
                }}
            >
                {/* Status Tabs */}
                <div style={{
                    display: 'flex',
                    gap: 21,
                    padding: '12px 16px',
                    borderBottom: '1px solid #F0F0F0',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    backgroundColor: '#fff'
                }}>
                    {statusTabs.map((tab) => {
                        const isActive = activeStatusTab === tab.key;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setActiveStatusTab(tab.key)}
                                style={{
                                    border: 'none',
                                    borderBottom: isActive ? '1.74px solid #EF5941' : 'none',
                                    background: 'transparent',
                                    padding: '10px 0',
                                    cursor: 'pointer',
                                    fontSize: 14,
                                    fontWeight: isActive ? 600 : 400,
                                    color: isActive ? '#EF5941' : 'rgba(0,0,0,0.88)',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {tab.label}
                                {tab.count !== undefined && (
                                    <span style={{
                                        marginLeft: 8,
                                        fontSize: 14,
                                        fontWeight: 400,
                                        color: isActive ? '#EF5941' : 'rgba(0,0,0,0.45)'
                                    }}>
                                        ({tab.count})
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Selection Overlay or Table Header */}
                {selectedRowKeys.length > 0 ? (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        padding: '12px 16px',
                        borderBottom: '1px solid #F0F0F0',
                        backgroundColor: '#F5F5F5'
                    }}>
                        <Checkbox
                            checked={pageProducts.length > 0 && pageProducts.every(p => selectedRowKeys.includes(p.id))}
                            indeterminate={pageProducts.some(p => selectedRowKeys.includes(p.id)) && !pageProducts.every(p => selectedRowKeys.includes(p.id))}
                            onChange={handleSelectAll}
                        />
                        <Text style={{ fontSize: 14 }}>
                            Đã chọn: <strong>{selectedRowKeys.length}</strong> sản phẩm
                        </Text>
                        <Dropdown
                            menu={{ items: bulkActionMenuItems }}
                            trigger={['click']}
                        >
                            <Button size="small">
                                Thao tác <DownOutlined style={{ fontSize: 10, marginLeft: 4 }} />
                            </Button>
                        </Dropdown>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '48px 320px 200px 140px 140px 200px 120px',
                            gap: 16,
                            padding: '12px 16px',
                            background: '#F5F5F5',
                            borderBottom: '1px solid #F0F0F0',
                            alignItems: 'center',
                            minWidth: 'max-content'
                        }}>
                            <Checkbox
                                onChange={handleSelectAll}
                                checked={pageProducts.length > 0 && pageProducts.every(p => selectedRowKeys.includes(p.id))}
                                indeterminate={pageProducts.some(p => selectedRowKeys.includes(p.id)) && !pageProducts.every(p => selectedRowKeys.includes(p.id))}
                            />
                            <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Sản phẩm</Text>
                            <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Hàng hóa</Text>
                            <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Giá niêm yết</Text>
                            <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Tồn kho</Text>
                            <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Thời gian</Text>
                            <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Thao tác</Text>
                        </div>

                        {/* Table Rows */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0
                        }}>
                            {pageProducts.map((product, index) => {
                                const channelMeta = getChannelMeta(product.channel);
                                return (
                                    <div
                                        key={product.id}
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: '48px 320px 200px 140px 140px 200px 120px',
                                            gap: 16,
                                            padding: '16px',
                                            background: '#fff',
                                            borderBottom: index < pageProducts.length - 1 ? '1px solid #F0F0F0' : 'none',
                                            alignItems: 'center',
                                            minWidth: 'max-content',
                                            transition: 'background 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = '#FAFAFA';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = '#fff';
                                        }}
                                    >
                                        {/* Checkbox */}
                                        <Checkbox
                                            checked={selectedRowKeys.includes(product.id)}
                                            onChange={(e) => handleSelectRow(product.id, e.target.checked)}
                                        />

                                        {/* Sản phẩm */}
                                        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                style={{
                                                    width: 60,
                                                    height: 60,
                                                    objectFit: 'cover',
                                                    borderRadius: 4,
                                                    border: '1px solid #F0F0F0'
                                                }}
                                            />
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <Text style={{
                                                    fontSize: 14,
                                                    display: 'block',
                                                    marginBottom: 4
                                                }}>
                                                    {product.name}
                                                </Text>
                                                <Space direction="vertical" size={4}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                        <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>SKU</span>
                                                        <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
                                                            {product.sku}
                                                        </Text>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                        <span style={{ fontSize: 14 }}>{channelMeta.logo}</span>
                                                        <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
                                                            {product.store}
                                                        </Text>
                                                    </div>
                                                    <Text style={{ fontSize: 12, color: '#52C41A' }}>
                                                        {product.statusText}
                                                    </Text>
                                                    {getLinkStatusTag(product.linkStatus, product.linkStatusText)}
                                                </Space>
                                            </div>
                                        </div>

                                        {/* Hàng hóa */}
                                        <div>
                                            <Space direction="vertical" size={4}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                    <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>SKU</span>
                                                    <Text style={{ fontSize: 14 }}>{product.sku}</Text>
                                                </div>
                                                {getLinkStatusTag(product.itemLinkStatus, product.itemLinkStatusText)}
                                            </Space>
                                        </div>

                                        {/* Giá niêm yết */}
                                        <Text style={{ fontSize: 14 }}>{product.price}</Text>

                                        {/* Tồn kho */}
                                        <Text style={{ fontSize: 14 }}>{product.stock}</Text>

                                        {/* Thời gian */}
                                        <div>
                                            <div style={{ fontSize: 14, marginBottom: 4 }}>
                                                Thời gian tạo
                                            </div>
                                            <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.45)' }}>
                                                {product.createTime}
                                            </div>
                                            <div style={{ fontSize: 14, marginTop: 8, marginBottom: 4 }}>
                                                Thời gian cập nhật
                                            </div>
                                            <div style={{ fontSize: 14, color: 'rgba(0,0,0,0.45)' }}>
                                                {product.updateTime}
                                            </div>
                                        </div>

                                        {/* Thao tác */}
                                        <Dropdown
                                            menu={{
                                                items: [
                                                    { key: 'view', label: 'Xem chi tiết' },
                                                    { key: 'edit', label: 'Chỉnh sửa' },
                                                    { key: 'link', label: 'Liên kết' },
                                                    { key: 'delete', label: 'Xóa', danger: true }
                                                ]
                                            }}
                                            trigger={['click']}
                                        >
                                            <Button size="small">
                                                Chọn <DownOutlined style={{ fontSize: 10, marginLeft: 4 }} />
                                            </Button>
                                        </Dropdown>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Pagination Footer */}
                <div style={{ padding: '0 16px 14px' }}>
                    <PaginationFooter
                        total={products.length}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={setPageSize}
                        label="sản phẩm"
                        pageSizeOptions={[
                            { value: 25, label: '25 bản ghi/trang' },
                            { value: 50, label: '50 bản ghi/trang' },
                            { value: 100, label: '100 bản ghi/trang' }
                        ]}
                    />
                </div>
            </Card>
        </div>
    );
};

export default ProductLinkingView;
