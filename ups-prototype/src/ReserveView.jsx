import React, { useState } from 'react';
import {
    Card, Input, Button, Table, Space, Select, Tabs, Dropdown
} from 'antd';
import { SearchOutlined, DownOutlined, PlusOutlined } from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Search } = Input;
const { Option } = Select;

const ReserveView = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const tabItems = [
        { key: 'all', label: <span style={{ fontSize: 14 }}>Tất cả (77)</span> },
        { key: 'active', label: <span style={{ fontSize: 14 }}>Đang dự trữ (0)</span> },
        { key: 'ended', label: <span style={{ fontSize: 14 }}>Kết thúc (77)</span> },
        { key: 'error', label: <span style={{ fontSize: 14 }}>Dự trữ lỗi (0)</span> }
    ];

    const mockData = [
        { key: '1', name: 'Set đồ chia ăn dặm dự trữ 200 set', store: 'KUN_Official Store', reserveTime: '10:58 03/07/2025 - 23:59 30/09/2025', promoStart: '15:00 03/07/2025', totalGoods: '1', status: 'Kết thúc' },
        { key: '2', name: 'FlashSale1212_10_S', store: 'LOF KUN STORE', reserveTime: '09:00 12/12/2025 - 23:59 12/12/2025', promoStart: '10:00 12/12/2025', totalGoods: '2', status: 'Kết thúc' }
    ];

    const columns = [
        { title: 'Tên phiếu dự trữ', dataIndex: 'name', key: 'name', width: '22%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        {
            title: 'Gian hàng',
            dataIndex: 'store',
            key: 'store',
            width: '18%',
            render: (t) => (
                <Space>
                    <span style={{ width: 24, height: 24, background: '#F5F5F5', borderRadius: 4, display: 'inline-block' }} />
                    <span style={{ fontSize: 14 }}>{t}</span>
                </Space>
            )
        },
        { title: 'Thời gian dự trữ', dataIndex: 'reserveTime', key: 'reserveTime', width: '22%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Thời gian bắt đầu CTKM', dataIndex: 'promoStart', key: 'promoStart', width: '14%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Tổng hàng hóa', dataIndex: 'totalGoods', key: 'totalGoods', width: '10%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: '10%',
            render: (t) => <span style={{ fontSize: 14, color: '#52c41a', fontWeight: 500 }}>{t}</span>
        },
        {
            title: 'Hành động',
            key: 'actions',
            width: '6%',
            align: 'center',
            render: () => (
                <Dropdown menu={{ items: [{ key: 'view', label: 'Xem' }, { key: 'edit', label: 'Sửa' }] }} trigger={['click']}>
                    <Button style={{ fontSize: 14 }}>Chọn <DownOutlined /></Button>
                </Dropdown>
            )
        }
    ];

    return (
        <div>
            {/* Top Action - FrameScheduleManagement pattern */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14, gap: 8 }}>
                <Button style={{ borderColor: '#EF5941', color: '#EF5941', fontSize: 14 }}>Tạo dự trữ theo file</Button>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}
                >
                    Tạo dự trữ
                </Button>
            </div>

            {/* Main Section - Card: Tabs, Filter, Table (FrameScheduleManagement pattern) */}
            <Card styles={{ body: { padding: 0 } }} style={{ borderRadius: 8, background: '#fff' }}>
                <div style={{ padding: '0 16px' }} className="order-processing-tabs">
                    <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
                </div>
                <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
                    <Space size="middle" wrap>
                        <Select placeholder="Chọn nhãn quản lý" style={{ width: 180, fontSize: 14 }} suffixIcon={<DownOutlined />}><Option value="all">Tất cả</Option></Select>
                        <Select placeholder="Gian hàng" style={{ width: 160, fontSize: 14 }} suffixIcon={<DownOutlined />}><Option value="all">Tất cả</Option></Select>
                        <Search placeholder="Tìm kiếm" allowClear onSearch={setSearchText} style={{ width: 220, fontSize: 14 }} prefix={<SearchOutlined />} />
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
                        label="phiếu dự trữ"
                    />
                </div>
            </Card>
        </div>
    );
};

export default ReserveView;
