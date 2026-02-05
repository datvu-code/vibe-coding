import React, { useState } from 'react';
import {
    Card, Button, Input, Space, Tag, Typography, Select,
    Dropdown, Row, Col, Checkbox, Badge
} from 'antd';
import {
    DownOutlined, SearchOutlined, SyncOutlined
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
            syncTime: '00:08 25/01/2026',
            syncStatus: 'synced',
            syncStatusText: 'Đã đồng bộ',
            variantCount: 0
        },
        {
            id: 2,
            name: 'Nước hoa hồng SKIN1004 Madagascar Centella Toning Toner làm dịu da, cân bằng độ pH ...',
            image: 'https://picsum.photos/seed/product2/60/60',
            sku: '8809576261141',
            store: 'UpBeautyy',
            channel: 'tiktok',
            syncTime: '00:00 24/01/2026',
            syncStatus: 'synced',
            syncStatusText: 'Đã đồng bộ',
            variantCount: 1
        },
        {
            id: 3,
            name: 'Kem chống nắng COSRX Aloe Soothing Sun Cream SPF50+ PA+++',
            image: 'https://picsum.photos/seed/product3/60/60',
            sku: '8809416471112',
            store: 'UpBeauty Store',
            channel: 'shopee',
            syncTime: '23:45 23/01/2026',
            syncStatus: 'synced',
            syncStatusText: 'Đã đồng bộ',
            variantCount: 3
        }
    ];
};

const SyncManagementView = () => {
    const [selectedMetric, setSelectedMetric] = useState('all');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedStore, setSelectedStore] = useState(null);
    
    const products = generateMockProducts();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    const pageProducts = products.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const metrics = [
        { key: 'all', label: 'Tất cả', count: 762, color: '#EF5941' },
        { key: 'syncing', label: 'Đang đồng bộ', count: 0, color: 'rgba(0,0,0,0.88)' },
        { key: 'error', label: 'Đồng bộ lỗi', count: 60, color: 'rgba(0,0,0,0.88)' },
        { key: 'synced', label: 'Đã đồng bộ', count: 702, color: 'rgba(0,0,0,0.88)' }
    ];

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
        { key: 'sync', label: 'Đồng bộ' },
        { key: 'stop-sync', label: 'Dừng đồng bộ' },
        { key: 'delete', label: 'Xoá', danger: true }
    ];

    return (
        <div>
            {/* Main Card - Tabs, Filter, Table (DraftProductsView pattern) */}
            <Card
                styles={{ body: { padding: 0 } }}
                style={{ borderRadius: 8, backgroundColor: '#fff', border: '1px solid #F0F0F0' }}
            >
                {/* Status Tabs */}
                <div style={{
                    display: 'flex',
                    gap: 24,
                    padding: '12px 16px',
                    borderBottom: '1px solid #F0F0F0',
                    flexWrap: 'wrap',
                    alignItems: 'center'
                }}>
                    {metrics.map((metric) => {
                        const isActive = selectedMetric === metric.key;
                        return (
                            <button
                                key={metric.key}
                                onClick={() => setSelectedMetric(metric.key)}
                                style={{
                                    border: 'none',
                                    borderBottom: isActive ? '2px solid #EF5941' : '2px solid transparent',
                                    background: 'transparent',
                                    padding: '10px 0',
                                    cursor: 'pointer',
                                    fontSize: 14,
                                    fontWeight: isActive ? 600 : 400,
                                    color: isActive ? '#EF5941' : 'rgba(0,0,0,0.88)',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {metric.label}
                                {metric.count !== undefined && (
                                    <span style={{
                                        marginLeft: 8,
                                        fontWeight: 400,
                                        color: isActive ? '#EF5941' : 'rgba(0,0,0,0.45)'
                                    }}>
                                        ({metric.count})
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Filter Section */}
                <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
                    <Row gutter={[16, 16]} align="middle">
                        <Col span={8}>
                            <Input
                                placeholder="Tên sản phẩm/SKU"
                                prefix={<SearchOutlined />}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                allowClear
                                style={{ width: '100%' }}
                            />
                        </Col>
                        <Col span={6}>
                            <Select
                                placeholder="Gian hàng"
                                value={selectedStore}
                                onChange={setSelectedStore}
                                style={{ width: '100%' }}
                                allowClear
                            >
                                <Option value="upbeauty">UpBeauty Store</Option>
                                <Option value="upbeautyy">UpBeautyy</Option>
                            </Select>
                        </Col>
                        <Col span={10} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Button
                                type="primary"
                                icon={<SyncOutlined />}
                                style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}
                            >
                                Đồng bộ
                            </Button>
                        </Col>
                    </Row>
                </div>

                {/* Selection Overlay or Table */}
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
                        <Dropdown menu={{ items: bulkActionMenuItems }} trigger={['click']}>
                            <Button size="small">
                                Thao tác <DownOutlined style={{ fontSize: 10, marginLeft: 4 }} />
                            </Button>
                        </Dropdown>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '48px 1fr 200px 180px 120px 120px',
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
                            <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Tên sản phẩm</Text>
                            <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Gian hàng</Text>
                            <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Thời gian đồng bộ</Text>
                            <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Trạng thái</Text>
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
                                    gridTemplateColumns: '48px 1fr 200px 180px 120px 120px',
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
                                {/* Checkbox */}
                                <Checkbox
                                    checked={selectedRowKeys.includes(product.id)}
                                    onChange={(e) => handleSelectRow(product.id, e.target.checked)}
                                />

                                {/* Tên sản phẩm */}
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
                                        {product.variantCount > 0 ? (
                                            <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
                                                + {product.variantCount} SKU
                                            </Text>
                                        ) : (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                                                <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>SKU</Text>
                                                <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
                                                    {product.sku}
                                                </Text>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Gian hàng */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontSize: 18 }}>{channelMeta.logo}</span>
                                    <Text style={{ fontSize: 14 }}>{product.store}</Text>
                                </div>

                                {/* Thời gian đồng bộ */}
                                <Text style={{ fontSize: 14 }}>{product.syncTime}</Text>

                                {/* Trạng thái */}
                                <Text style={{ fontSize: 14, color: '#52C41A' }}>
                                    {product.syncStatusText}
                                </Text>

                                {/* Thao tác */}
                                <div />
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

export default SyncManagementView;
