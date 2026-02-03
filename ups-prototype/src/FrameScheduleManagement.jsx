import React, { useState } from 'react';
import {
    Card, Alert, Input, Button, Table, Space, Tag, Dropdown, Select, Tabs, Badge
} from 'antd';
import {
    SearchOutlined, DownOutlined, CloseOutlined, PlusOutlined,
    ExclamationCircleOutlined, CheckCircleOutlined, WarningOutlined
} from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

const FrameScheduleManagement = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [selectedStore, setSelectedStore] = useState('all');
    const [searchText, setSearchText] = useState('');
    const [showAlert, setShowAlert] = useState(true);

    // Mock data for schedules
    const mockSchedules = [
        {
            key: '1',
            scheduleName: 'Sao chép Quà camp cho đơn >200k',
            storeName: 'UpBeauty',
            frameTemplate: 'ddown 200k',
            frameImage: 'https://picsum.photos/seed/schedule1/60/60',
            createdTime: '00:22 01/02/2026',
            applyTime: '00:23:00 01/02/2026',
            removeTime: '23:59:59 28/02/2026',
            productCount: 20,
            status: 'applying',
            hasError: true
        },
        {
            key: '2',
            scheduleName: 'Sao chép Sao chép Quà KAINE kem dưỡng',
            storeName: 'UpBeauty',
            frameTemplate: 'QUÀ KEM DƯỠNG T2',
            frameImage: 'https://picsum.photos/seed/schedule2/60/60',
            createdTime: '00:04 01/02/2026',
            applyTime: '00:05:00 01/02/2026',
            removeTime: '23:59:59 28/02/2026',
            productCount: 2,
            status: 'applying',
            hasError: false
        },
        {
            key: '3',
            scheduleName: 'Sao chép Sao chép Quà KAINE gel rửa mặt',
            storeName: 'UpBeauty',
            frameTemplate: 'Quà gel rửa mặt T2',
            frameImage: 'https://picsum.photos/seed/schedule3/60/60',
            createdTime: '00:01 01/02/2026',
            applyTime: '00:05:00 01/02/2026',
            removeTime: '09:00:00 28/02/2026',
            productCount: 3,
            status: 'applying',
            hasError: false
        },
        {
            key: '4',
            scheduleName: 'Sao chép UpBeauty SHP T12',
            storeName: 'UpBeauty Store',
            frameTemplate: '',
            frameImage: 'https://picsum.photos/seed/schedule4/60/60',
            createdTime: '00:29 01/01/2026',
            applyTime: '00:30:00 01/01/2026',
            removeTime: '23:59:59 31/01/2026',
            productCount: 130,
            status: 'completed',
            hasError: false
        }
    ];

    const getStatusTag = (status, hasError) => {
        if (hasError) {
            return (
                <Tag
                    color="error"
                    icon={<WarningOutlined />}
                    style={{ fontSize: 14, padding: '4px 12px' }}
                >
                    Đang áp khung
                </Tag>
            );
        }

        switch (status) {
            case 'applying':
                return (
                    <Tag
                        color="orange"
                        style={{ fontSize: 14, padding: '4px 12px' }}
                    >
                        Đang áp khung
                    </Tag>
                );
            case 'completed':
                return (
                    <Tag
                        color="success"
                        icon={<CheckCircleOutlined />}
                        style={{ fontSize: 14, padding: '4px 12px' }}
                    >
                        Kết thúc
                    </Tag>
                );
            case 'waiting':
                return (
                    <Tag
                        color="default"
                        style={{ fontSize: 14, padding: '4px 12px' }}
                    >
                        Chờ áp khung
                    </Tag>
                );
            default:
                return null;
        }
    };

    const columns = [
        {
            title: 'Tên lịch',
            dataIndex: 'scheduleName',
            key: 'scheduleName',
            width: '20%',
            render: (text, record) => (
                <div>
                    <div style={{ fontSize: 14, marginBottom: 4 }}>{text}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg"
                            alt="Store"
                            style={{ width: 16, height: 16 }}
                        />
                        <span style={{ fontSize: 12, color: '#8C8C8C' }}>{record.storeName}</span>
                    </div>
                </div>
            )
        },
        {
            title: 'Khung mẫu',
            dataIndex: 'frameTemplate',
            key: 'frameTemplate',
            width: '15%',
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img
                        src={record.frameImage}
                        alt="Frame"
                        style={{
                            width: 60,
                            height: 60,
                            objectFit: 'cover',
                            borderRadius: 4,
                            border: '1px solid #E1E3E5'
                        }}
                    />
                    <span style={{ fontSize: 14 }}>{text}</span>
                </div>
            )
        },
        {
            title: 'Thời gian lập lịch',
            key: 'schedule',
            width: '25%',
            render: (_, record) => (
                <div style={{ fontSize: 14, lineHeight: '22px' }}>
                    <div>Thời gian tạo: {record.createdTime}</div>
                    <div>Thời gian áp khung: {record.applyTime}</div>
                    <div>Thời gian gỡ khung: {record.removeTime}</div>
                </div>
            )
        },
        {
            title: 'Số sản phẩm',
            dataIndex: 'productCount',
            key: 'productCount',
            width: '10%',
            align: 'center',
            render: (count) => <span style={{ fontSize: 14 }}>{count}</span>
        },
        {
            title: 'Trạng thái',
            key: 'status',
            width: '15%',
            align: 'center',
            render: (_, record) => (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    {getStatusTag(record.status, record.hasError)}
                    {record.hasError && (
                        <WarningOutlined style={{ color: '#FF4D4F', fontSize: 16 }} />
                    )}
                    {record.status === 'completed' && (
                        <CheckCircleOutlined style={{ color: '#52C41A', fontSize: 16 }} />
                    )}
                </div>
            )
        },
        {
            title: 'Hành động',
            key: 'actions',
            width: '15%',
            align: 'center',
            render: () => (
                <Dropdown
                    menu={{
                        items: [
                            { key: '1', label: 'Xem chi tiết' },
                            { key: '2', label: 'Chỉnh sửa' },
                            { key: '3', label: 'Xóa', danger: true }
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

    const tabItems = [
        {
            key: 'all',
            label: (
                <span style={{ fontSize: 14 }}>
                    Tất cả <Badge count={88} style={{ backgroundColor: '#8C8C8C', marginLeft: 8 }} />
                </span>
            )
        },
        {
            key: 'waiting',
            label: (
                <span style={{ fontSize: 14 }}>
                    Chờ áp khung <Badge count={0} style={{ backgroundColor: '#8C8C8C', marginLeft: 8 }} />
                </span>
            )
        },
        {
            key: 'applying',
            label: (
                <span style={{ fontSize: 14 }}>
                    Đang áp khung <Badge count={10} style={{ backgroundColor: '#FA8C16', marginLeft: 8 }} />
                </span>
            )
        },
        {
            key: 'completed',
            label: (
                <span style={{ fontSize: 14 }}>
                    Kết thúc <Badge count={78} style={{ backgroundColor: '#52C41A', marginLeft: 8 }} />
                </span>
            )
        },
        {
            key: 'error',
            label: (
                <span style={{ fontSize: 14 }}>
                    Áp & gỡ khung bị lỗi <Badge count={26} style={{ backgroundColor: '#FF4D4F', marginLeft: 8 }} />
                </span>
            )
        }
    ];

    return (
        <div>
            {/* Alert Banner */}
            {showAlert && (
                <Alert
                    message={
                        <span style={{ fontSize: 14 }}>
                            Hệ thống đang có 26 lịch đang xử lý lỗi. Vui lòng đến màn{' '}
                            <a href="#" style={{ color: '#EF5941', textDecoration: 'underline' }}>
                                Áp và Gỡ khung bị lỗi
                            </a>
                            {' '}để thử lại
                        </span>
                    }
                    type="error"
                    showIcon
                    icon={<ExclamationCircleOutlined />}
                    closable
                    onClose={() => setShowAlert(false)}
                    closeIcon={<CloseOutlined />}
                    style={{
                        marginBottom: 14,
                        borderRadius: 8
                    }}
                />
            )}

            {/* Top Action */}
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
                    Tạo lịch
                </Button>
            </div>

            {/* Main Section - Tabs, Filter, Table */}
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

                {/* Filter Section */}
                <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
                    <Space size="middle">
                        <span style={{ fontSize: 14 }}>Gian hàng</span>
                        <Select
                            value={selectedStore}
                            onChange={setSelectedStore}
                            style={{ width: 200, fontSize: 14 }}
                            suffixIcon={<DownOutlined />}
                        >
                            <Option value="all">Tất cả</Option>
                            <Option value="upbeauty">UpBeauty</Option>
                            <Option value="upbeauty-store">UpBeauty Store</Option>
                        </Select>

                        <span style={{ fontSize: 14, marginLeft: 16 }}>Tên lịch</span>
                        <Search
                            placeholder="Tìm kiếm"
                            allowClear
                            onSearch={setSearchText}
                            style={{ width: 250, fontSize: 14 }}
                        />
                    </Space>
                </div>

                {/* Table */}
                <Table
                    columns={columns}
                    dataSource={mockSchedules}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Tổng ${total} lịch`,
                        style: { fontSize: 14, padding: '16px' }
                    }}
                    style={{ fontSize: 14 }}
                    className="neutral-header-table"
                />
            </Card>
        </div>
    );
};

export default FrameScheduleManagement;
