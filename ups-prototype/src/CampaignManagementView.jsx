import React, { useState } from 'react';
import {
    Card, Input, Button, Table, Space, Select, Tabs, Dropdown, DatePicker
} from 'antd';
import {
    SearchOutlined, DownOutlined, PlusOutlined, CalendarOutlined
} from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const CampaignManagementView = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [dateRange, setDateRange] = useState(null);
    const [selectedPlatform, setSelectedPlatform] = useState(undefined);
    const [selectedStore, setSelectedStore] = useState(undefined);
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);

    const tabItems = [
        { key: 'all', label: <span style={{ fontSize: 14 }}>Tất cả (2)</span> },
        { key: 'upcoming', label: <span style={{ fontSize: 14 }}>Sắp diễn ra (0)</span> },
        { key: 'ongoing', label: <span style={{ fontSize: 14 }}>Đang diễn ra (2)</span> },
        { key: 'completed', label: <span style={{ fontSize: 14 }}>Hoàn thành (0)</span> }
    ];

    const mockCampaigns = [
        {
            key: '1',
            name: 'Chiến dịch cộng đồng 2',
            id: 'a4f34ebd-80b6-4caa-af83-c1f3e639c5bb',
            storeName: 'UpBeauty Store',
            storeIcon: 'shopee',
            productScope: 'Toàn gian hàng',
            startTime: 'Từ ngày 18/08/2025 12:30',
            status: 'ongoing'
        },
        {
            key: '2',
            name: 'Chiến dịch cộng đồng 1',
            id: 'b5g45fce-91c7-5dbb-bg94-d2g4f740d6cc',
            storeName: 'UpBase Beauty',
            storeIcon: 'upbase',
            productScope: 'Toàn gian hàng',
            startTime: 'Từ ngày 15/08/2025 09:00',
            status: 'ongoing'
        }
    ];

    const storeIcon = (icon) => {
        if (icon === 'shopee') {
            return (
                <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 24,
                    height: 24,
                    borderRadius: 4,
                    background: '#EE4D2D',
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 600,
                    marginRight: 8
                }}>S</span>
            );
        }
        if (icon === 'upbase') {
            return (
                <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 24,
                    height: 24,
                    borderRadius: 4,
                    background: '#EF5941',
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 600,
                    marginRight: 8
                }}>U</span>
            );
        }
        return null;
    };

    const columns = [
        {
            title: 'Tên chiến dịch',
            key: 'name',
            width: '28%',
            render: (_, record) => (
                <div>
                    <div style={{ fontSize: 14, marginBottom: 2 }}>{record.name}</div>
                    <div style={{ fontSize: 12, color: '#8C8C8C' }}>ID:{record.id}</div>
                </div>
            )
        },
        {
            title: 'Gian hàng',
            key: 'store',
            width: '20%',
            render: (_, record) => (
                <Space align="center">
                    {storeIcon(record.storeIcon)}
                    <span style={{ fontSize: 14 }}>{record.storeName}</span>
                </Space>
            )
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'productScope',
            key: 'productScope',
            width: '18%',
            render: (text) => <span style={{ fontSize: 14 }}>{text}</span>
        },
        {
            title: 'Thời gian',
            dataIndex: 'startTime',
            key: 'startTime',
            width: '18%',
            render: (text) => <span style={{ fontSize: 14 }}>{text}</span>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: '10%',
            render: (status) => (
                <span style={{
                    fontSize: 14,
                    color: status === 'ongoing' ? '#52c41a' : status === 'upcoming' ? '#faad14' : '#8C8C8C'
                }}>
                    {status === 'ongoing' ? 'Đang diễn ra' : status === 'upcoming' ? 'Sắp diễn ra' : 'Hoàn thành'}
                </span>
            )
        },
        {
            title: 'Thao tác',
            key: 'actions',
            width: '6%',
            align: 'center',
            render: () => (
                <Dropdown
                    menu={{
                        items: [
                            { key: 'view', label: 'Xem chi tiết' },
                            { key: 'edit', label: 'Chỉnh sửa' },
                            { key: 'copy', label: 'Sao chép' },
                            { key: 'delete', label: 'Xóa', danger: true }
                        ]
                    }}
                    trigger={['click']}
                >
                    <Button style={{ fontSize: 14 }}>
                        Chọn <DownOutlined />
                    </Button>
                </Dropdown>
            )
        }
    ];

    return (
        <div>
            {/* Top Action (FrameScheduleManagement pattern) */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    style={{
                        background: '#EF5941',
                        borderColor: '#EF5941',
                        fontSize: 14
                    }}
                >
                    Tạo chiến dịch affiliate
                </Button>
            </div>

            {/* Main Section - Filter, Tabs, Table */}
            <Card
                styles={{ body: { padding: 0 } }}
                style={{ borderRadius: 8, background: '#fff' }}
            >
                {/* Tabs */}
                <div style={{ padding: '0 16px' }} className="order-processing-tabs">
                    <Tabs
                        activeKey={activeTab}
                        onChange={setActiveTab}
                        items={tabItems}
                    />
                </div>

                {/* Filter Section - below tabs */}
                <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
                    <Space direction="vertical" style={{ width: '100%' }} size="middle">
                        <Space size="middle" wrap>
                            <RangePicker
                                placeholder={['Chọn khoảng thời gian', 'Chọn khoảng thời gian']}
                                style={{ width: 260, fontSize: 14 }}
                                suffixIcon={<CalendarOutlined />}
                                value={dateRange}
                                onChange={setDateRange}
                            />
                            <Select
                                placeholder="Chọn sàn"
                                allowClear
                                value={selectedPlatform}
                                onChange={setSelectedPlatform}
                                style={{ width: 140, fontSize: 14 }}
                                suffixIcon={<DownOutlined />}
                            >
                                <Option value="shopee">Shopee</Option>
                                <Option value="tiktok">TikTok</Option>
                                <Option value="lazada">Lazada</Option>
                            </Select>
                            <Select
                                placeholder="Chọn gian hàng"
                                allowClear
                                value={selectedStore}
                                onChange={setSelectedStore}
                                style={{ width: 160, fontSize: 14 }}
                                suffixIcon={<DownOutlined />}
                            >
                                <Option value="upbeauty">UpBeauty Store</Option>
                                <Option value="upbase">UpBase Beauty</Option>
                            </Select>
                        </Space>
                        <Search
                            placeholder="Tìm chiến dịch affiliate"
                            allowClear
                            onSearch={setSearchText}
                            style={{ width: 400, fontSize: 14 }}
                            prefix={<SearchOutlined />}
                        />
                    </Space>
                </div>

                {/* Table */}
                <Table
                    columns={columns}
                    dataSource={mockCampaigns.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                    rowKey="key"
                    pagination={false}
                    style={{ fontSize: 14 }}
                    className="neutral-header-table"
                />
                <div style={{ padding: '0 16px 14px', borderTop: '0.87px solid #F0F0F0' }}>
                    <PaginationFooter
                        total={mockCampaigns.length}
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

export default CampaignManagementView;
