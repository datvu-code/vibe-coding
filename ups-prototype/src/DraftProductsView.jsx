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

// Mock data for draft products
const generateMockProducts = () => {
    return [
        {
            id: 1,
            name: '[TECH TEST] Sữa Rửa Mặt Cho Da Dầu Mụn B abé',
            image: 'https://picsum.photos/seed/product1/60/60',
            sku: '12345TEST',
            store: 'UpBeauty Store',
            storeIcon: '🏪',
            productSku: '12345TEST',
            linkStatus: 'not-linked',
            linkStatusText: 'Chưa liên kết',
            inventorySku: '12345TEST',
            itemLinkStatus: 'not-linked',
            itemLinkStatusText: 'Chưa liên kết hàng hoá',
            price: '999,000₫',
            stock: '0 (có sẵn 0)',
            createTime: '17/01/2025 17:36',
            updateTime: '22/10/2025 18:02'
        },
        {
            id: 2,
            name: 'Kem dưỡng mắt Some By Mi Retinol Intense Advanced Triple Action Eye Cream Cải Thiện...',
            image: 'https://picsum.photos/seed/product2/60/60',
            sku: '8809647392804',
            store: 'UpBeauty Store',
            storeIcon: '🏪',
            productSku: '8809647392804',
            linkStatus: 'linked-with-product',
            linkStatusText: 'Đã liên kết hàng hóa',
            inventorySku: '8809647392804',
            itemLinkStatus: 'linked-warehouse',
            itemLinkStatusText: 'Đã liên kết kho',
            price: '999,000₫',
            stock: '0 (có sẵn 0)',
            createTime: '15/01/2025 14:19',
            updateTime: '22/10/2025 18:02'
        }
    ];
};

const DraftProductsView = () => {
    const [activeStatusTab, setActiveStatusTab] = useState('all');
    const [selectedPlatform, setSelectedPlatform] = useState('shopee');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedStore, setSelectedStore] = useState(null);
    const [selectedImageType, setSelectedImageType] = useState('all');
    const [selectedTags, setSelectedTags] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    
    const products = generateMockProducts();
    const pageProducts = products.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const platforms = [
        { key: 'tiktok', label: 'Tiktok', count: 9, icon: '🎵' },
        { key: 'lazada', label: 'Lazada', count: 0, icon: '🛒' },
        { key: 'shopee', label: 'Shopee', count: 2, icon: '🛍️' },
        { key: 'tiki', label: 'Tiki', count: 0, icon: '📦' },
        { key: 'haravan', label: 'Haravan', count: 0, icon: '🏬' },
        { key: 'facebook', label: 'Facebook', count: 0, icon: '👥' },
        { key: 'upbase', label: 'Upbase', count: 0, icon: '🔶' }
    ];

    const statusTabs = [
        { key: 'all', label: 'Tất cả' },
        { key: 'pending', label: 'Cần tối ưu nội dung', count: 0 }
    ];

    const getLinkStatusTag = (status, text) => {
        const config = {
            'not-linked': { color: '#8C8C8C', bgColor: '#F0F0F0' },
            'linked': { color: '#FF4D4F', bgColor: '#FFF1F0' },
            'linked-with-product': { color: '#52c41a', bgColor: '#f6ffed' },
            'linked-warehouse': { color: '#52c41a', bgColor: '#f6ffed' }
        };
        const style = config[status] || config['not-linked'];
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

    return (
        <div>
            {/* Top Section - Add Product Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
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
                    {platforms.map((platform) => (
                        <Option 
                            key={platform.key} 
                            value={platform.key}
                            label={
                                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span>{platform.icon}</span>
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
                                <span style={{ fontSize: 18 }}>{platform.icon}</span>
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
                    ))}
                </Select>
            </div>

            {/* Status Tabs and Table Card */}
            <Card
                styles={{ body: { padding: 0 } }}
                style={{ 
                    marginTop: 14,
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
                    {statusTabs.map(tab => {
                        const isActive = activeStatusTab === tab.key;
                        const hasCount = tab.count !== undefined;
                        
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
                                {hasCount && (
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

                {/* Filter Section (moved below tabs) */}
                <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
                    <Row gutter={[16, 16]} align="top">
                        <Col span={4}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                <Text style={{ fontSize: 14, lineHeight: '22px' }}>Nhập tags</Text>
                                <Select
                                    placeholder="Nhập tags"
                                    value={selectedTags}
                                    onChange={setSelectedTags}
                                    style={{ width: '100%' }}
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
                                <Text style={{ fontSize: 14, lineHeight: '22px' }}>Ảnh gốc</Text>
                                <Select
                                    value={selectedImageType}
                                    onChange={setSelectedImageType}
                                    style={{ width: '100%' }}
                                >
                                    <Option value="all">Tất cả</Option>
                                    <Option value="origin">Ảnh gốc</Option>
                                </Select>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                <Text style={{ fontSize: 14, lineHeight: '22px' }}>Tên sản phẩm/SKU</Text>
                                <Input
                                    placeholder="Tên sản phẩm/SKU"
                                    prefix={<SearchOutlined />}
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    allowClear
                                    style={{ width: '100%' }}
                                />
                            </div>
                        </Col>
                        <Col span={4}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                <Text style={{ fontSize: 14, lineHeight: '22px' }}>Gian hàng</Text>
                                <Select
                                    placeholder="Chọn gian hàng"
                                    value={selectedStore}
                                    onChange={setSelectedStore}
                                    style={{ width: '100%' }}
                                    allowClear
                                >
                                    <Option value="upbeauty">UpBeauty Store</Option>
                                    <Option value="upbase">UpBase Beauty</Option>
                                </Select>
                            </div>
                        </Col>
                        <Col span={4}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                <div style={{ height: 22 }}></div>
                                <Button
                                    icon={<FilterOutlined />}
                                    style={{ fontSize: 14 }}
                                >
                                    Lọc sản phẩm nâng cao
                                </Button>
                            </div>
                        </Col>
                    </Row>
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
                            menu={{
                                items: [
                                    { key: 'seo', label: 'Kiểm tra SEO' },
                                    { key: 'ai-optimize', label: 'AI tối ưu nội dung' },
                                    { key: 'publish', label: 'Đăng bán sản phẩm' },
                                    { key: 'edit-price', label: 'Sửa giá & tồn kho' },
                                    { key: 'edit-image', label: 'Sửa ảnh sản phẩm' },
                                    { key: 'edit-origin', label: 'Sửa ảnh gốc & tag' },
                                    { key: 'delete', label: 'Xoá sản phẩm', danger: true }
                                ]
                            }}
                            trigger={['click']}
                        >
                            <Button size="small">
                                Thao tác <DownOutlined style={{ fontSize: 10, marginLeft: 4 }} />
                            </Button>
                        </Dropdown>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        {/* Table Header */}
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
                            {pageProducts.map((product, index) => (
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
                                                <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>🔗</span>
                                                <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
                                                    {product.sku}
                                                </Text>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <span style={{ fontSize: 14 }}>{product.storeIcon}</span>
                                                <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
                                                    {product.store}
                                                </Text>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                {getLinkStatusTag(product.linkStatus, product.linkStatusText)}
                                                {product.linkStatus === 'not-linked' && (
                                                    <Button
                                                        type="link"
                                                        size="small"
                                                        style={{
                                                            padding: 0,
                                                            height: 'auto',
                                                            color: '#1677ff',
                                                            fontSize: 12
                                                        }}
                                                    >
                                                        Liên kết
                                                    </Button>
                                                )}
                                            </div>
                                        </Space>
                                    </div>
                                </div>

                                {/* Hàng hóa */}
                                <div>
                                    <Space direction="vertical" size={4}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>🔗</span>
                                            <Text style={{ fontSize: 14 }}>
                                                {product.inventorySku}
                                            </Text>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            {getLinkStatusTag(product.itemLinkStatus, product.itemLinkStatusText)}
                                            {product.itemLinkStatus === 'not-linked' && (
                                                <Button
                                                    type="link"
                                                    size="small"
                                                    style={{
                                                        padding: 0,
                                                        height: 'auto',
                                                        color: '#1677ff',
                                                        fontSize: 12
                                                    }}
                                                >
                                                    Liên kết
                                                </Button>
                                            )}
                                        </div>
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
                            ))}
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

export default DraftProductsView;
