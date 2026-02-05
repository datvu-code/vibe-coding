import React, { useState } from 'react';
import {
    Card, Input, Button, Table, Space, Select, DatePicker
} from 'antd';
import { SearchOutlined, DownOutlined, ExportOutlined, SyncOutlined, ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Option } = Select;
const { RangePicker } = DatePicker;

const ExpirationManagementView = () => {
    const [statusTab, setStatusTab] = useState('all');
    const [dateRange, setDateRange] = useState(null);
    const [sortBy, setSortBy] = useState('warehouse-date');
    const [sortOrder, setSortOrder] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const statusTabs = [
        { key: 'all', label: 'Tất cả (299)' },
        { key: 'valid', label: 'Còn hạn (189)' },
        { key: 'expiring', label: 'Sắp hết hạn (0)' },
        { key: 'stop-sell', label: 'Dừng bán (0)' },
        { key: 'expired', label: 'Hết hạn (110)' }
    ];

    const mockData = [
        { key: '1', sku: '28936025775660_loc', name: '[HÀNG TẶNG KHÔNG BÁN] Sữa chua ăn đóng chai LOF ít đường thùng 24 c...', expiryDate: '21-05-2026', actualStock: 24, remainingDays: 62 },
        { key: '2', sku: '28936025775661', name: 'Sữa chua ăn đóng chai LOF ít đường...', expiryDate: '21-05-2026', actualStock: 22, remainingDays: 41 },
        { key: '3', sku: '28936025775662', name: 'Nước ép trái cây hỗn hợp...', expiryDate: '21-05-2026', actualStock: 48, remainingDays: 165 }
    ];

    const columns = [
        { title: 'SKU', dataIndex: 'sku', key: 'sku', width: '18%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        {
            title: 'Tên hàng hóa',
            dataIndex: 'name',
            key: 'name',
            width: '32%',
            render: (text) => (
                <Space align="center">
                    <div style={{ width: 36, height: 36, background: '#F5F5F5', borderRadius: 4 }} />
                    <span style={{ fontSize: 14 }}>{text}</span>
                </Space>
            )
        },
        { title: 'Ngày hết hạn', dataIndex: 'expiryDate', key: 'expiryDate', width: '14%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Tồn thực tế', dataIndex: 'actualStock', key: 'actualStock', width: '12%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Thời gian SD còn lại', dataIndex: 'remainingDays', key: 'remainingDays', width: '14%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> }
    ];

    return (
        <div>
            {/* Top Filter + Action - FrameScheduleManagement pattern */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 12 }}>
                <Space size="middle" wrap>
                    <Input placeholder="Tên hàng hóa" prefix={<SearchOutlined />} style={{ width: 220, fontSize: 14 }} allowClear />
                    <span style={{ fontSize: 14 }}>Kho</span>
                    <Select placeholder="Tất cả" style={{ width: 140, fontSize: 14 }} suffixIcon={<DownOutlined />}><Option value="all">Tất cả</Option></Select>
                    <Select placeholder="Chọn nhãn quản lý" style={{ width: 180, fontSize: 14 }} suffixIcon={<DownOutlined />} />
                </Space>
                <Space size="middle">
                    <Button type="primary" icon={<ExportOutlined />} style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}>
                        Xuất file
                    </Button>
                    <Button type="text" icon={<SyncOutlined />} style={{ fontSize: 14 }} />
                </Space>
            </div>

            {/* Main Section - Card: Tabs, Filter, Table (FrameScheduleManagement pattern) */}
            <Card styles={{ body: { padding: 0 } }} style={{ borderRadius: 8, background: '#fff' }}>
                {/* Custom status tabs */}
                <div style={{ padding: '0 16px 12px', borderBottom: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    {statusTabs.map((item) => (
                        <span
                            key={item.key}
                            onClick={() => setStatusTab(item.key)}
                            style={{
                                fontSize: 14,
                                padding: '6px 12px',
                                cursor: 'pointer',
                                color: statusTab === item.key ? '#EF5941' : '#262626',
                                borderBottom: statusTab === item.key ? '2px solid #EF5941' : '2px solid transparent'
                            }}
                        >
                            {item.label}
                        </span>
                    ))}
                </div>
                {/* Sort + date filter */}
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <Space>
                        <span style={{ fontSize: 14 }}>Ngày nhập hàng</span>
                        <RangePicker style={{ width: 280, fontSize: 14 }} placeholder={['dd/mm/yyyy', 'dd/mm/yyyy']} value={dateRange} onChange={setDateRange} />
                    </Space>
                    <Space>
                        <span style={{ fontSize: 14 }}>Sắp xếp theo:</span>
                        <Select value={sortBy} onChange={setSortBy} style={{ width: 180, fontSize: 14 }} suffixIcon={<DownOutlined />}>
                            <Option value="warehouse-date">Ngày nhập kho</Option>
                        </Select>
                        <Button type="text" size="small" icon={<ArrowDownOutlined />} style={{ color: sortOrder === 'desc' ? '#EF5941' : undefined }} onClick={() => setSortOrder('desc')} />
                        <Button type="text" size="small" icon={<ArrowUpOutlined />} style={{ color: sortOrder === 'asc' ? '#EF5941' : undefined }} onClick={() => setSortOrder('asc')} />
                    </Space>
                </div>
                <Table
                    columns={columns}
                    dataSource={mockData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                    rowKey="key"
                    pagination={false}
                    style={{ fontSize: 14 }}
                    className="neutral-header-table"
                />
                <div style={{ padding: '0 16px 14px', borderTop: '0.87px solid #F0F0F0' }}>
                    <PaginationFooter
                        total={mockData.length}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={setPageSize}
                        label="bản ghi"
                    />
                </div>
            </Card>
        </div>
    );
};

export default ExpirationManagementView;
