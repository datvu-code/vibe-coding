import React, { useState } from 'react';
import {
    Card, Button, Input, Space, Tag, Typography, Select,
    Dropdown, Row, Col, Badge, Tabs
} from 'antd';
import {
    DownOutlined, SearchOutlined, FilterOutlined
} from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

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

const PlatformProductsView = () => {
    const [activeTopTab, setActiveTopTab] = useState('products'); // 'products' or 'goods'
    const [selectedPlatform, setSelectedPlatform] = useState('shopee');
    const [activeStatusTab, setActiveStatusTab] = useState('all');
    const [searchText, setSearchText] = useState('');
    const [selectedStore, setSelectedStore] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);

    const products = generateMockProducts();
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
        { key: 'all', label: 'Tất cả', count: 168 },
        { key: 'unlinked', label: 'Chưa liên kết', count: 10 },
        { key: 'linked', label: 'Đã liên kết', count: 158 }
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

    return (
        <div>
            {/* Top Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
                <Button 
                    type="primary"
                    style={{ 
                        background: '#EF5941', 
                        borderColor: '#EF5941',
                        fontSize: 14
                    }}
                >
                    Liên kết tự động
                </Button>
            </div>

            {/* Top Tabs */}
            <div style={{ marginBottom: 14 }}>
                <Space size={21}>
                    {[
                        { key: 'products', label: 'Sản phẩm' },
                        { key: 'goods', label: 'Hàng hóa' }
                    ].map((tab) => {
                        const isActive = activeTopTab === tab.key;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTopTab(tab.key)}
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
                            </button>
                        );
                    })}
                </Space>
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

            {/* Filter Section - on top of table */}
            <Card
                styles={{ body: { padding: '14px 16px' } }}
                style={{ borderRadius: 8, backgroundColor: '#fff', border: '1px solid #F0F0F0', marginBottom: 14 }}
            >
                <Row gutter={[16, 16]} align="middle">
                    <Col span={8}>
                        <Input
                            placeholder="Tên sản phẩm/SKU"
                            prefix={<SearchOutlined />}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            allowClear
                            style={{ width: '100%', fontSize: 14 }}
                        />
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Text style={{ fontSize: 14 }}>Gian hàng</Text>
                            <Select
                                placeholder="Chọn gian hàng"
                                value={selectedStore}
                                onChange={setSelectedStore}
                                style={{ width: 200, fontSize: 14 }}
                                allowClear
                            >
                                <Option value="all">Tất cả</Option>
                                <Option value="upbeauty">UpBeauty Store</Option>
                            </Select>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Text style={{ fontSize: 14 }}>Trạng thái của sản phẩm sàn</Text>
                            <Select
                                value={selectedStatus}
                                onChange={setSelectedStatus}
                                style={{ width: 200, fontSize: 14 }}
                            >
                                <Option value="all">Tất cả</Option>
                                <Option value="active">Đang hoạt động</Option>
                                <Option value="hidden">Đã ẩn</Option>
                            </Select>
                        </div>
                    </Col>
                </Row>
            </Card>

            {/* Table Section - Tabs + Table */}
            <Card
                styles={{ body: { padding: 0 } }}
                style={{ borderRadius: 8, backgroundColor: '#fff', border: '1px solid #F0F0F0' }}
            >
                {/* Status Tabs */}
                <div style={{
                    display: 'flex',
                    gap: 21,
                    padding: '12px 16px',
                    borderBottom: '1px solid #F0F0F0',
                    flexWrap: 'wrap',
                    alignItems: 'center'
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

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 140px 1fr 120px',
                        gap: 16,
                        padding: '12px 16px',
                        background: '#F5F5F5',
                        borderBottom: '1px solid #F0F0F0',
                        alignItems: 'center',
                        minWidth: 'max-content'
                    }}>
                        <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Sản phẩm sàn</Text>
                        <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>SKU</Text>
                        <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Sản phẩm kho</Text>
                        <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Thao tác</Text>
                    </div>

                    {/* Table Rows */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {pageProducts.map((product, index) => {
                        const channelMeta = getChannelMeta(product.channel);
                        return (
                            <div
                                key={product.id}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 140px 1fr 120px',
                                    gap: 16,
                                    padding: '16px',
                                    background: '#fff',
                                    borderBottom: index < pageProducts.length - 1 ? '1px solid #F0F0F0' : 'none',
                                    alignItems: 'center',
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#FAFAFA';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = '#fff';
                                }}
                            >
                                {/* Sản phẩm sàn */}
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
                                        <Space direction="vertical" size={4} style={{ marginTop: 4 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <span style={{ fontSize: 14 }}>{channelMeta.logo}</span>
                                                <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
                                                    {product.store}
                                                </Text>
                                            </div>
                                            <Text style={{ fontSize: 12, color: '#52C41A' }}>
                                                {product.statusText}
                                            </Text>
                                        </Space>
                                    </div>
                                </div>

                                {/* SKU */}
                                <div>
                                    <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>SKU</Text>
                                    <div style={{ marginTop: 4 }}>
                                        <Text style={{ fontSize: 14 }}>{product.sku}</Text>
                                    </div>
                                </div>

                                {/* Sản phẩm kho */}
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
                                        <Space direction="vertical" size={4} style={{ marginTop: 4 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>SKU</Text>
                                                <Text style={{ fontSize: 14 }}>{product.sku}</Text>
                                            </div>
                                        </Space>
                                    </div>
                                </div>

                                {/* Thao tác */}
                                <Dropdown
                                    menu={{
                                        items: [
                                            { key: 'view', label: 'Xem chi tiết' },
                                            { key: 'link', label: 'Liên kết' },
                                            { key: 'unlink', label: 'Hủy liên kết' }
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

export default PlatformProductsView;
