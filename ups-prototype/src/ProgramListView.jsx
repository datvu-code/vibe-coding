import React, { useState } from 'react';
import {
    Card, Input, Button, Table, Space, Select, Tabs, Dropdown
} from 'antd';
import {
    SearchOutlined, DownOutlined, PlusOutlined
} from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Search } = Input;
const { Option } = Select;

const ProgramListView = () => {
    const [activeTab, setActiveTab] = useState('tich-diem');
    const [selectedPlatform, setSelectedPlatform] = useState('all');
    const [selectedStore, setSelectedStore] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);

    const tabItems = [
        { key: 'tich-diem', label: <span style={{ fontSize: 14 }}>Chương trình tích điểm</span> },
        { key: 'doi-diem', label: <span style={{ fontSize: 14 }}>Chương trình đổi điểm</span> }
    ];

    const mockPrograms = [
        {
            key: '1',
            name: 'Tích điểm',
            storeLabel: 'UpBase Beauty',
            type: 'Đơn hàng mới',
            status: 'ongoing',
            formula: '20,000 VND = 1 điểm (có hệ số nhân theo rank)',
            advancedSetting: 'Tích điểm theo hạng',
            createdAt: '11:28 10/10/2025'
        },
        {
            key: '2',
            name: 'KHTT T10 (New)',
            storeLabel: 'UpBase Beauty',
            type: 'Đăng ký tài khoản thành công',
            status: 'ongoing',
            formula: 'Tặng 30 điểm',
            advancedSetting: '0',
            createdAt: '11:27 10/10/2025'
        },
        {
            key: '3',
            name: 'KHTT T10',
            storeLabel: 'UpBase Beauty',
            type: 'Đơn hàng mới',
            status: 'ended',
            formula: '10,000 vnd = 1 điểm',
            advancedSetting: '10,000',
            createdAt: '10:39 15/09/2025'
        }
    ];

    const columns = [
        {
            title: 'Tên chương trình',
            key: 'name',
            width: '20%',
            render: (_, record) => (
                <div>
                    <div style={{ fontSize: 14, marginBottom: 2 }}>{record.name}</div>
                    <div style={{ fontSize: 12, color: '#8c8c8c' }}>{record.storeLabel}</div>
                </div>
            )
        },
        {
            title: 'Loại chương trình',
            dataIndex: 'type',
            key: 'type',
            width: '18%',
            render: (text) => <span style={{ fontSize: 14 }}>{text}</span>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: '12%',
            render: (status) => (
                <span style={{ fontSize: 14, color: status === 'ongoing' ? '#52c41a' : '#EF5941' }}>
                    {status === 'ongoing' ? 'Đang diễn ra' : 'Đã kết thúc'}
                </span>
            )
        },
        {
            title: 'Công thức điểm',
            dataIndex: 'formula',
            key: 'formula',
            width: '22%',
            render: (text) => <span style={{ fontSize: 14 }}>{text}</span>
        },
        {
            title: 'Thiết lập nâng cao',
            dataIndex: 'advancedSetting',
            key: 'advancedSetting',
            width: '12%',
            render: (text) => <span style={{ fontSize: 14 }}>{text}</span>
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '10%',
            render: (text) => <span style={{ fontSize: 14 }}>{text}</span>
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
                            { key: 'copy', label: 'Sao chép' }
                        ]
                    }}
                    trigger={['click']}
                >
                    <Button style={{ fontSize: 14 }}>Chọn <DownOutlined /></Button>
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
                    Tạo chương trình tích điểm
                </Button>
            </div>

            {/* Main Section - Tabs, Filter, Table */}
            <Card
                styles={{ body: { padding: 0 } }}
                style={{ borderRadius: 8, background: '#fff' }}
            >
                <div style={{ padding: '0 16px' }} className="order-processing-tabs">
                    <Tabs
                        activeKey={activeTab}
                        onChange={setActiveTab}
                        items={tabItems}
                    />
                </div>

                <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
                    <Space size="middle" wrap>
                        <Search
                            placeholder="Tìm kiếm theo tên chương trình"
                            allowClear
                            onSearch={setSearchText}
                            style={{ width: 260, fontSize: 14 }}
                        />
                        <span style={{ fontSize: 14 }}>Chọn sàn</span>
                        <Select value={selectedPlatform} onChange={setSelectedPlatform} style={{ width: 120, fontSize: 14 }} suffixIcon={<DownOutlined />}>
                            <Option value="all">Tất cả</Option>
                        </Select>
                        <span style={{ fontSize: 14 }}>Chọn gian hàng</span>
                        <Select value={selectedStore} onChange={setSelectedStore} style={{ width: 150, fontSize: 14 }} suffixIcon={<DownOutlined />}>
                            <Option value="all">Tất cả</Option>
                        </Select>
                        <span style={{ fontSize: 14 }}>Trạng thái</span>
                        <Select value={selectedStatus} onChange={setSelectedStatus} style={{ width: 120, fontSize: 14 }} suffixIcon={<DownOutlined />}>
                            <Option value="all">Tất cả</Option>
                            <Option value="ongoing">Đang diễn ra</Option>
                            <Option value="ended">Đã kết thúc</Option>
                        </Select>
                    </Space>
                </div>

                <Table
                    columns={columns}
                    dataSource={mockPrograms.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                    rowKey="key"
                    pagination={false}
                    style={{ fontSize: 14 }}
                    className="neutral-header-table"
                />
                <div style={{ padding: '0 16px 14px', borderTop: '0.87px solid #F0F0F0' }}>
                    <PaginationFooter
                        total={mockPrograms.length}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={setPageSize}
                        label="chương trình"
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

export default ProgramListView;
