import React, { useState } from 'react';
import {
    Card, Input, Button, Table, Space, Select, Tabs, DatePicker, Empty
} from 'antd';
import { SearchOutlined, DownOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Option } = Select;
const { RangePicker } = DatePicker;

const StockTransferView = () => {
    const [activeTab, setActiveTab] = useState('pending');
    const [dateRange, setDateRange] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const transferData = [];

    const tabItems = [
        { key: 'pending', label: <span style={{ fontSize: 14 }}>Chờ duyệt(0)</span> },
        { key: 'waiting', label: <span style={{ fontSize: 14 }}>Chờ chuyển(0)</span> },
        { key: 'in-transit', label: <span style={{ fontSize: 14 }}>Đang chuyển(0)</span> },
        { key: 'completed', label: <span style={{ fontSize: 14 }}>Hoàn thành(0)</span> },
        { key: 'cancelled', label: <span style={{ fontSize: 14 }}>Đã huỷ(0)</span> }
    ];

    const columns = [
        { title: 'Thông tin mã', dataIndex: 'codeInfo', key: 'codeInfo', width: '20%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity', width: '12%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Thông tin kho', dataIndex: 'warehouseInfo', key: 'warehouseInfo', width: '22%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Trạng thái điều chuyển', dataIndex: 'status', key: 'status', width: '16%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Tài khoản thao tác', dataIndex: 'account', key: 'account', width: '14%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Thời gian', dataIndex: 'time', key: 'time', width: '12%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Thao tác', key: 'actions', width: '8%', align: 'center', render: () => <Button type="link" size="small" style={{ fontSize: 14 }}>Chọn</Button> }
    ];

    const emptyDescription = 'Chưa có phiếu chuyển kho';
    const locale = {
        emptyText: (
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={<span style={{ fontSize: 14, color: '#8C8C8C' }}>{emptyDescription}</span>}
            />
        )
    };

    return (
        <div>
            {/* Top Action - FrameScheduleManagement pattern */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14, gap: 8 }}>
                <Button style={{ borderColor: '#EF5941', color: '#EF5941', fontSize: 14 }} icon={<UploadOutlined />}>Nhập file</Button>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}
                >
                    Tạo phiếu chuyển kho
                </Button>
            </div>

            {/* Filter Section - on top of table */}
            <Card
                styles={{ body: { padding: '14px 16px' } }}
                style={{ borderRadius: 8, background: '#fff', marginBottom: 14 }}
            >
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                    <Space wrap>
                        <span style={{ fontSize: 14 }}>Thời gian tạo phiếu</span>
                        <RangePicker value={dateRange} onChange={setDateRange} style={{ width: 320, fontSize: 14 }} />
                        <Select placeholder="Kho chuyển" style={{ width: 140, fontSize: 14 }} suffixIcon={<DownOutlined />}><Option value="all">Tất cả</Option></Select>
                        <Select placeholder="Kho nhận" style={{ width: 140, fontSize: 14 }} suffixIcon={<DownOutlined />}><Option value="all">Tất cả</Option></Select>
                    </Space>
                    <Space wrap>
                        <Input placeholder="Theo mã phiếu chuyển kho" prefix={<SearchOutlined />} style={{ width: 260, fontSize: 14 }} />
                        <Select placeholder="Chọn nhân quản lý" style={{ width: 180, fontSize: 14 }} suffixIcon={<DownOutlined />} />
                    </Space>
                </Space>
            </Card>

            {/* Table Section - Tabs + Table */}
            <Card styles={{ body: { padding: 0 } }} style={{ borderRadius: 8, background: '#fff' }}>
                <div style={{ padding: '0 16px' }} className="order-processing-tabs">
                    <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
                </div>
                <Table
                    columns={columns}
                    dataSource={transferData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                    rowKey="key"
                    locale={locale}
                    pagination={false}
                    style={{ fontSize: 14 }}
                    className="neutral-header-table"
                />
                <div style={{ padding: '0 16px 14px', borderTop: '0.87px solid #F0F0F0' }}>
                    <PaginationFooter
                        total={transferData.length}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={setPageSize}
                        label="phiếu chuyển kho"
                    />
                </div>
            </Card>
        </div>
    );
};

export default StockTransferView;
