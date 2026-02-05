import React, { useState } from 'react';
import {
    Card, Input, Button, Table, Space, Select, Tabs, DatePicker, Empty
} from 'antd';
import { SearchOutlined, DownOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Option } = Select;
const { RangePicker } = DatePicker;

const OrderingView = () => {
    const [activeTab, setActiveTab] = useState('pending');
    const [dateRange, setDateRange] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const orderData = [];

    const tabItems = [
        { key: 'pending', label: <span style={{ fontSize: 14 }}>Chờ duyệt(0)</span> },
        { key: 'approved', label: <span style={{ fontSize: 14 }}>Đã duyệt(0)</span> },
        { key: 'completed', label: <span style={{ fontSize: 14 }}>Hoàn thành(0)</span> },
        { key: 'cancelled', label: <span style={{ fontSize: 14 }}>Đã hủy(0)</span> },
        { key: 'diff', label: <span style={{ fontSize: 14 }}>Chênh lệch sau hoàn thành (0)</span> }
    ];

    const columns = [
        { title: 'Mã phiếu', dataIndex: 'code', key: 'code', width: '18%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity', width: '12%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Kho', dataIndex: 'warehouse', key: 'warehouse', width: '15%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Hình thức', dataIndex: 'method', key: 'method', width: '15%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Thời gian', dataIndex: 'time', key: 'time', width: '18%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Trạng thái nhập kho', dataIndex: 'importStatus', key: 'importStatus', width: '14%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Tài khoản thao tác', dataIndex: 'account', key: 'account', width: '12%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Thao tác', key: 'actions', width: '8%', align: 'center', render: () => <Button type="link" size="small" style={{ fontSize: 14 }}>Chọn</Button> }
    ];

    const locale = {
        emptyText: (
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Chưa có phiếu đặt hàng"
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
                    Thêm phiếu đặt hàng
                </Button>
            </div>

            {/* Main Section - Card: Tabs, Filter, Table (FrameScheduleManagement pattern) */}
            <Card styles={{ body: { padding: 0 } }} style={{ borderRadius: 8, background: '#fff' }}>
                <div style={{ padding: '0 16px' }} className="order-processing-tabs">
                    <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
                </div>
                <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
                    <Space size="middle" wrap>
                        <span style={{ fontSize: 14 }}>Thời gian tạo</span>
                        <RangePicker showTime placeholder={['dd/MM/yyyy HH:mm', 'dd/MM/yyyy HH:mm']} style={{ width: 320, fontSize: 14 }} value={dateRange} onChange={setDateRange} />
                        <Select placeholder="Kho" style={{ width: 140, fontSize: 14 }} suffixIcon={<DownOutlined />}><Option value="all">Tất cả</Option></Select>
                        <Select placeholder="Chọn nhãn quản lý" style={{ width: 160, fontSize: 14 }} suffixIcon={<DownOutlined />} />
                        <Input placeholder="Nhập mã phiếu đặt hàng" prefix={<SearchOutlined />} style={{ width: 260, fontSize: 14 }} />
                        <Select placeholder="Hình thức" style={{ width: 140, fontSize: 14 }} suffixIcon={<DownOutlined />}><Option value="all">Tất cả</Option></Select>
                    </Space>
                </div>
                <Table
                    columns={columns}
                    dataSource={orderData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                    rowKey="key"
                    locale={locale}
                    pagination={false}
                    style={{ fontSize: 14 }}
                    className="neutral-header-table"
                />
                <div style={{ padding: '0 16px 14px', borderTop: '0.87px solid #F0F0F0' }}>
                    <PaginationFooter
                        total={orderData.length}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={setPageSize}
                        label="phiếu đặt hàng"
                    />
                </div>
            </Card>
        </div>
    );
};

export default OrderingView;
