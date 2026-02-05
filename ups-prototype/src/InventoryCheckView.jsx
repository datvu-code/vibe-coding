import React, { useState } from 'react';
import {
    Card, Input, Button, Table, Space, Select, Tabs, DatePicker
} from 'antd';
import { SearchOutlined, DownOutlined, PlusOutlined } from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Option } = Select;
const { RangePicker } = DatePicker;

const InventoryCheckView = () => {
    const [activeTab, setActiveTab] = useState('in-progress');
    const [dateRange, setDateRange] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const tabItems = [
        { key: 'pending', label: <span style={{ fontSize: 14 }}>Chờ kiểm kho (0)</span> },
        { key: 'in-progress', label: <span style={{ fontSize: 14 }}>Đang kiểm kho (3)</span> },
        { key: 'completed', label: <span style={{ fontSize: 14 }}>Đã hoàn tất (378)</span> }
    ];

    const mockData = [
        { key: '1', code: 'SCN-1040-20260120-3499', warehouse: 'Kho Hồ Chí Minh', brand: 'Nhãn hàng mặc định', products: '1', method: 'Kiểm kho theo tổng', time: '20/01/2026 13:19' },
        { key: '2', code: 'SCN-1040-20260120-3500', warehouse: 'Kho Hà Nội', brand: 'Nhãn hàng mặc định', products: '2', method: 'Kiểm kho theo tổng', time: '20/01/2026 14:00' }
    ];

    const columns = [
        { title: 'Mã kiểm kho', dataIndex: 'code', key: 'code', width: '22%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Kho', dataIndex: 'warehouse', key: 'warehouse', width: '18%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Nhãn hàng', dataIndex: 'brand', key: 'brand', width: '18%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Sản phẩm cần kiểm', dataIndex: 'products', key: 'products', width: '12%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Cách thức kiểm kho', dataIndex: 'method', key: 'method', width: '18%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Thời gian', dataIndex: 'time', key: 'time', width: '12%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        {
            title: 'Thao tác',
            key: 'actions',
            width: '18%',
            render: () => (
                <Space split={<span style={{ color: '#D9D9D9' }}>|</span>}>
                    <Button type="link" size="small" style={{ fontSize: 14, padding: 0 }}>Kiểm kho</Button>
                    <Button type="link" size="small" style={{ fontSize: 14, padding: 0 }}>Nhập excel</Button>
                    <Button type="link" size="small" style={{ fontSize: 14, padding: 0 }}>Kết thúc</Button>
                </Space>
            )
        }
    ];

    return (
        <div>
            {/* Top Action - FrameScheduleManagement pattern */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}
                >
                    Thêm yêu cầu kiểm kho
                </Button>
            </div>

            {/* Main Section - Card: Tabs, Filter, Table (FrameScheduleManagement pattern) */}
            <Card styles={{ body: { padding: 0 } }} style={{ borderRadius: 8, background: '#fff' }}>
                <div style={{ padding: '0 16px' }} className="order-processing-tabs">
                    <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
                </div>
                <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
                    <Space size="middle" wrap>
                        <Input placeholder="Mã kiểm kho" prefix={<SearchOutlined />} style={{ width: 200, fontSize: 14 }} allowClear />
                        <Select placeholder="Nhập tags" mode="tags" style={{ width: 160, fontSize: 14 }} suffixIcon={<DownOutlined />} />
                        <Select placeholder="Chọn nhãn quản lý" style={{ width: 180, fontSize: 14 }} suffixIcon={<DownOutlined />} />
                        <span style={{ fontSize: 14 }}>Thời gian tạo:</span>
                        <RangePicker style={{ width: 280, fontSize: 14 }} placeholder={['dd/mm/yyyy', 'dd/mm/yyyy']} value={dateRange} onChange={setDateRange} />
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
                        label="phiếu kiểm kho"
                    />
                </div>
            </Card>
        </div>
    );
};

export default InventoryCheckView;
