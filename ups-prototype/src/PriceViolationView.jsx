import React, { useState } from 'react';
import {
    Card, Input, Button, Table, Space, Select, Typography
} from 'antd';
import {
    SearchOutlined, DownOutlined
} from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

const PriceViolationView = () => {
    const [activeTopTab, setActiveTopTab] = useState('canh-bao-gia');
    const [activeContentTab, setActiveContentTab] = useState('tong-quan');
    const [selectedPlatform, setSelectedPlatform] = useState('all');
    const [selectedStore, setSelectedStore] = useState('all');
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const mockProducts = [
        {
            key: '1',
            productName: 'Dầu Xả Nuôi Dưỡng và Phục Hồi Tóc Khaokho Talaypu Dừa Và Bơ chứa Nano Kerratin 200ml',
            sku: 'SKU 8853963004606',
            productImage: 'https://picsum.photos/seed/p1/60/60',
            store: 'UpBeauty Store',
            storeIcon: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg',
            listPrice: '139,000₫',
            minPrice: '133,440₫',
            finalPrice: '133,440₫',
            warningCount: 1
        },
        {
            key: '2',
            productName: 'Mặt Nạ Giấy FOODAHOLIC Chăm Sóc Da Toàn Diện 23g',
            sku: 'SKU 8936213940013',
            productImage: 'https://picsum.photos/seed/p2/60/60',
            store: 'UpBeauty Store',
            storeIcon: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg',
            listPrice: '45,000₫',
            minPrice: '43,200₫',
            finalPrice: '43,200₫',
            warningCount: 1
        }
    ];

    const columns = [
        {
            title: 'Hàng hoá',
            key: 'product',
            width: '30%',
            render: (_, record) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img
                        src={record.productImage}
                        alt=""
                        style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4, border: '1px solid #F0F0F0' }}
                    />
                    <div>
                        <div style={{ fontSize: 14, marginBottom: 4 }}>{record.productName}</div>
                        <Text type="secondary" style={{ fontSize: 12 }}>{record.sku}</Text>
                    </div>
                </div>
            )
        },
        {
            title: 'Gian hàng',
            key: 'store',
            width: '15%',
            render: (_, record) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <img src={record.storeIcon} alt="" style={{ width: 16, height: 16 }} />
                    <span style={{ fontSize: 14 }}>{record.store}</span>
                </div>
            )
        },
        {
            title: 'Giá niêm yết',
            dataIndex: 'listPrice',
            key: 'listPrice',
            width: '12%',
            render: (v) => <span style={{ fontSize: 14 }}>{v}</span>
        },
        {
            title: 'Giá tối thiểu',
            dataIndex: 'minPrice',
            key: 'minPrice',
            width: '12%',
            render: (v) => <span style={{ fontSize: 14 }}>{v}</span>
        },
        {
            title: 'Giá cuối',
            dataIndex: 'finalPrice',
            key: 'finalPrice',
            width: '12%',
            render: (v) => <span style={{ fontSize: 14 }}>{v}</span>
        },
        {
            title: 'Cảnh báo',
            key: 'warning',
            width: '14%',
            render: (_, record) => (
                <span style={{ fontSize: 14, color: '#EF5941' }}>
                    {record.warningCount} cảnh báo
                </span>
            )
        }
    ];

    return (
        <div>
            {/* Top Tabs: Cảnh báo giá / Thiết lập gian hàng */}
            <div style={{ marginBottom: 14, display: 'flex', gap: 24, alignItems: 'center' }}>
                {[
                    { key: 'canh-bao-gia', label: 'Cảnh báo giá' },
                    { key: 'thiet-lap-gian-hang', label: 'Thiết lập gian hàng' }
                ].map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTopTab(tab.key)}
                        style={{
                            border: 'none',
                            borderBottom: activeTopTab === tab.key ? '2px solid #EF5941' : '2px solid transparent',
                            background: 'transparent',
                            padding: '8px 0',
                            cursor: 'pointer',
                            fontSize: 16,
                            fontWeight: activeTopTab === tab.key ? 600 : 400,
                            color: activeTopTab === tab.key ? '#EF5941' : 'rgba(0,0,0,0.88)'
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Filter + Action + Last update */}
            <Card styles={{ body: { padding: '14px 16px' } }} style={{ marginBottom: 14, borderRadius: 8 }}>
                <Space size="middle" wrap align="center">
                    <span style={{ fontSize: 14 }}>Sàn</span>
                    <Select value={selectedPlatform} onChange={setSelectedPlatform} style={{ width: 120 }}>
                        <Option value="all">Tất cả</Option>
                        <Option value="tiktok">Tiktok</Option>
                        <Option value="shopee">Shopee</Option>
                    </Select>
                    <Button
                        type={selectedPlatform !== 'all' ? 'default' : 'default'}
                        style={{ borderColor: selectedPlatform === 'tiktok' ? '#EF5941' : '#d9d9d9', color: selectedPlatform === 'tiktok' ? '#EF5941' : undefined }}
                    >
                        Tiktok
                    </Button>
                    <Button
                        type={selectedPlatform !== 'all' ? 'default' : 'default'}
                        style={{ borderColor: selectedPlatform === 'shopee' ? '#EF5941' : '#d9d9d9', color: selectedPlatform === 'shopee' ? '#EF5941' : undefined }}
                    >
                        Shopee
                    </Button>
                    <Search
                        placeholder="Tìm kiếm theo tên/SKU"
                        allowClear
                        style={{ width: 220 }}
                    />
                    <span style={{ fontSize: 14 }}>Chọn gian hàng</span>
                    <Select value={selectedStore} onChange={setSelectedStore} style={{ width: 160 }}>
                        <Option value="all">Tất cả</Option>
                    </Select>
                </Space>
                <div style={{ marginTop: 8, fontSize: 14, color: '#8c8c8c' }}>
                    Thời gian cập nhật: 02/02/2026 23:56
                </div>
            </Card>

            {/* Content Tabs + Table */}
            <Card
                styles={{ body: { padding: 0 } }}
                style={{ borderRadius: 8, background: '#fff' }}
            >
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #F0F0F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                        {[
                            { key: 'tong-quan', label: 'Tổng quan' },
                            { key: 'chi-tiet-vi-pham', label: 'Chi tiết vi phạm' }
                        ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveContentTab(tab.key)}
                            style={{
                                border: 'none',
                                borderBottom: activeContentTab === tab.key ? '2px solid #EF5941' : '2px solid transparent',
                                background: 'transparent',
                                padding: '12px 0',
                                cursor: 'pointer',
                                fontSize: 14,
                                fontWeight: activeContentTab === tab.key ? 600 : 400,
                                color: activeContentTab === tab.key ? '#EF5941' : 'rgba(0,0,0,0.88)'
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                    </div>
                    <Button type="default" style={{ fontSize: 14 }}>
                        Cập nhật giá cuối
                    </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={mockProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                    rowKey="key"
                    pagination={false}
                    style={{ fontSize: 14 }}
                    className="neutral-header-table"
                />
                <div style={{ padding: '0 16px 14px', borderTop: '0.87px solid #F0F0F0' }}>
                    <PaginationFooter
                        total={mockProducts.length}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={setPageSize}
                        label="sản phẩm"
                    />
                </div>
            </Card>
        </div>
    );
};

export default PriceViolationView;
