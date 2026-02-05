import React, { useState } from 'react';
import {
    Card, Button, Input, Space, Tag, Typography, Select,
    Dropdown, Row, Col, Checkbox, Badge, DatePicker
} from 'antd';
import {
    DownOutlined, SearchOutlined, DeleteOutlined, InfoCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import PaginationFooter from './PaginationFooter';

const { Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

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
const generateMockPushHistory = () => {
    return [
        {
            id: 1,
            name: 'Sữa rửa mặt COSRX Salicylic Acid Daily Gentle Cleanser dịu nhẹ...',
            image: 'https://picsum.photos/seed/product1/60/60',
            sku: '8809416471112',
            classification: '--',
            store: 'UpBeauty Store',
            channel: 'shopee',
            pushQuantity: 22,
            warehouse: '-',
            pushMethod: 'Đẩy tự động',
            status: 'failed',
            statusText: 'Thất bại',
            pushTime: '26/01/2026 08:22',
            error: 'Lỗi: product.error_busi: All the fields cannot be updated because the product 24189251468 status is abnormal'
        },
        {
            id: 2,
            name: 'Kem dưỡng ẩm COSRX Advanced Snail 92 All in One Cream',
            image: 'https://picsum.photos/seed/product2/60/60',
            sku: '8809416471113',
            classification: '--',
            store: 'UpBeautyy',
            channel: 'tiktok',
            pushQuantity: 1,
            warehouse: '-',
            pushMethod: 'Đẩy tự động',
            status: 'failed',
            statusText: 'Thất bại',
            pushTime: '26/01/2026 08:20',
            error: 'Lỗi: 12019024: stock count is invalid; detail:sku id: 1731668838669323002, less open stock limit, current open stock:2'
        },
        {
            id: 3,
            name: 'Toner COSRX AHA/BHA Clarifying Treatment Toner',
            image: 'https://picsum.photos/seed/product3/60/60',
            sku: '8809416471114',
            classification: '--',
            store: 'UpBeauty Store',
            channel: 'shopee',
            pushQuantity: 3,
            warehouse: '-',
            pushMethod: 'Đẩy tự động',
            status: 'failed',
            statusText: 'Thất bại',
            pushTime: '26/01/2026 08:18',
            error: 'Lỗi: product.error_busi: All the fields cannot be updated because the product 24189251469 status is abnormal'
        }
    ];
};

const StockPushHistoryView = () => {
    const [activeStatusTab, setActiveStatusTab] = useState('all');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedStore, setSelectedStore] = useState(null);
    const [selectedWarehouse, setSelectedWarehouse] = useState('all');
    const [dateRange, setDateRange] = useState(null);
    
    const pushHistory = generateMockPushHistory();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    const pagePushHistory = pushHistory.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const statusTabs = [
        { key: 'all', label: 'Tất cả', count: 5159 },
        { key: 'failed', label: 'Thất bại', count: 2951 },
        { key: 'success', label: 'Thành công', count: 2208 }
    ];

    const handleSelectAll = (e) => {
        const pageIds = pagePushHistory.map(p => p.id);
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
            {/* Main Card - Tabs, Filter, Table (DraftProductsView pattern) */}
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

                {/* Filter Section */}
                <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
                    <Row gutter={[16, 16]} align="middle">
                        <Col span={6}>
                            <Input
                                placeholder="Tên sản phẩm, SKU"
                                prefix={<SearchOutlined />}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                allowClear
                                style={{ width: '100%' }}
                            />
                        </Col>
                        <Col span={6}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Text style={{ fontSize: 14 }}>Gian hàng</Text>
                                <Select
                                    placeholder="Chọn gian hàng"
                                    value={selectedStore}
                                    onChange={setSelectedStore}
                                    style={{ flex: 1 }}
                                    allowClear
                                >
                                    <Option value="upbeauty">UpBeauty Store</Option>
                                    <Option value="upbeautyy">UpBeautyy</Option>
                                </Select>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Text style={{ fontSize: 14 }}>Kho kênh bán</Text>
                                <Select
                                    value={selectedWarehouse}
                                    onChange={setSelectedWarehouse}
                                    style={{ flex: 1 }}
                                >
                                    <Option value="all">Tất cả</Option>
                                    <Option value="warehouse1">Kho 1</Option>
                                </Select>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Text style={{ fontSize: 14 }}>Thời gian đẩy</Text>
                                <RangePicker
                                    value={dateRange}
                                    onChange={setDateRange}
                                    format="DD/MM/YYYY"
                                    style={{ flex: 1 }}
                                    placeholder={['dd/mm/yyyy', 'dd/mm/yyyy']}
                                />
                            </div>
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
                            checked={pagePushHistory.length > 0 && pagePushHistory.every(p => selectedRowKeys.includes(p.id))}
                            indeterminate={pagePushHistory.some(p => selectedRowKeys.includes(p.id)) && !pagePushHistory.every(p => selectedRowKeys.includes(p.id))}
                            onChange={handleSelectAll}
                        />
                        <Text style={{ fontSize: 14 }}>
                            Đã chọn: <strong>{selectedRowKeys.length}</strong> sản phẩm
                        </Text>
                        <Button
                            icon={<DeleteOutlined />}
                            style={{ background: 'rgba(0,0,0,0.06)', border: 'none', fontSize: 14 }}
                        >
                            Xóa lịch sử
                        </Button>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '48px 1fr 150px 150px 150px 120px 180px',
                            gap: 16,
                            padding: '12px 16px',
                            background: '#F5F5F5',
                            borderBottom: '1px solid #F0F0F0',
                            alignItems: 'center',
                            minWidth: 'max-content'
                        }}>
                            <Checkbox
                                onChange={handleSelectAll}
                                checked={pagePushHistory.length > 0 && pagePushHistory.every(p => selectedRowKeys.includes(p.id))}
                                indeterminate={pagePushHistory.some(p => selectedRowKeys.includes(p.id)) && !pagePushHistory.every(p => selectedRowKeys.includes(p.id))}
                            />
                            <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Sản phẩm</Text>
                            <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Số lượng đẩy tồn</Text>
                            <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Kho kênh bán</Text>
                            <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Phương thức đẩy</Text>
                            <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Trạng thái</Text>
                            <Text style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.88)' }}>Thời gian đẩy tồn</Text>
                        </div>

                        {/* Table Rows */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {pagePushHistory.map((item, index) => {
                        const channelMeta = getChannelMeta(item.channel);
                        return (
                            <div
                                key={item.id}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '48px 1fr 150px 150px 150px 120px 180px',
                                    gap: 16,
                                    padding: '16px',
                                    background: '#fff',
                                    borderBottom: index < pagePushHistory.length - 1 ? '1px solid #F0F0F0' : 'none',
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
                                <Checkbox
                                    checked={selectedRowKeys.includes(item.id)}
                                    onChange={(e) => handleSelectRow(item.id, e.target.checked)}
                                />
                                    {/* Sản phẩm */}
                                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                        <img 
                                            src={item.image} 
                                            alt={item.name}
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
                                                {item.name}
                                            </Text>
                                            <Space direction="vertical" size={4} style={{ marginTop: 4 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                    <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>SKU</Text>
                                                    <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
                                                        {item.sku}
                                                    </Text>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                    <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>Phân loại:</Text>
                                                    <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
                                                        {item.classification}
                                                    </Text>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                    <span style={{ fontSize: 14 }}>{channelMeta.logo}</span>
                                                    <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
                                                        {item.store}
                                                    </Text>
                                                </div>
                                            </Space>
                                        </div>
                                    </div>

                                    {/* Số lượng đẩy tồn */}
                                    <Text style={{ fontSize: 14 }}>{item.pushQuantity}</Text>

                                    {/* Kho kênh bán */}
                                    <Text style={{ fontSize: 14 }}>{item.warehouse}</Text>

                                    {/* Phương thức đẩy */}
                                    <Text style={{ fontSize: 14 }}>{item.pushMethod}</Text>

                                    {/* Trạng thái */}
                                    <Tag style={{
                                        background: item.status === 'failed' ? '#FF4D4F' : '#52C41A',
                                        color: '#fff',
                                        border: 'none',
                                        fontSize: 12,
                                        padding: '2px 8px'
                                    }}>
                                        {item.statusText}
                                    </Tag>

                                    {/* Thời gian đẩy tồn */}
                                    <Text style={{ fontSize: 14 }}>{item.pushTime}</Text>
                            </div>
                        );
                    })}
                        </div>
                    </div>
                )}

                {/* Pagination Footer */}
                <div style={{ padding: '0 16px 14px' }}>
                    <PaginationFooter
                        total={pushHistory.length}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={setPageSize}
                        label="bản ghi"
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

export default StockPushHistoryView;
