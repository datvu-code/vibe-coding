import React, { useState } from 'react';
import {
    Card, Button, Input, Space, Tag, Typography, Select,
    Dropdown, DatePicker, Row, Col, Badge, InputNumber, Tabs, Table
} from 'antd';
import {
    DownOutlined, SearchOutlined, CalendarOutlined, PlusOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Search } = Input;

// Mock data for gift rules
const generateMockRules = () => {
    return [
        {
            id: 1,
            name: 'Đơn trên 200k tặng 1 sample Babe',
            store: 'UpBeautyy',
            storeIcon: '👤',
            startTime: '2025-05-15 12:05:00',
            endTime: '2025-05-20 11:53:59',
            ruleType: 'Quy tắc ưu tiên',
            status: 'completed',
            statusText: 'Đã kết thúc',
            priority: 1
        },
        {
            id: 2,
            name: 'Sao chép - "1 Bông tẩy trang SKU: 6920180380409"',
            store: 'UpBase Beauty',
            storeIcon: '🔶',
            startTime: '2025-07-11 17:51:00',
            endTime: '2025-07-31 23:59:59',
            ruleType: 'Quy tắc động thời',
            status: 'completed',
            statusText: 'Đã kết thúc',
            priority: null
        },
        {
            id: 3,
            name: '"1 Bông tẩy trang SKU: 6920180380409"',
            store: 'UpBase Beauty',
            storeIcon: '🔶',
            startTime: '2025-07-11 17:49:00',
            endTime: '2025-07-31 23:59:59',
            ruleType: 'Quy tắc động thời',
            status: 'completed',
            statusText: 'Đã kết thúc',
            priority: null
        },
        {
            id: 4,
            name: 'Kèm tặng 2 bông',
            store: 'UpBase Beauty',
            storeIcon: '🔶',
            startTime: '2025-07-11 17:46:00',
            endTime: '2025-07-31 23:59:59',
            ruleType: 'Quy tắc động thời',
            status: 'completed',
            statusText: 'Đã kết thúc',
            priority: null
        },
        {
            id: 5,
            name: 'Sao chép - Sao chép - "1 Bông tẩy trang SKU: 6920180380409"',
            store: 'UpBase Beauty',
            storeIcon: '🔶',
            startTime: '2025-08-06 10:31:00',
            endTime: '2025-08-31 23:59:59',
            ruleType: 'Quy tắc động thời',
            status: 'inactive',
            statusText: '',
            priority: null
        },
        {
            id: 6,
            name: 'Sao chép - "1 Bông tẩy trang SKU: 6920180380409"',
            store: 'UpBase Beauty',
            storeIcon: '🔶',
            startTime: '2025-08-06 10:32:00',
            endTime: '2025-08-31 23:59:59',
            ruleType: 'Quy tắc động thời',
            status: 'active',
            statusText: '',
            priority: null
        }
    ];
};

const GiftRuleView = () => {
    const [activeStatusTab, setActiveStatusTab] = useState('all');
    const [dateRange, setDateRange] = useState(null);
    
    const rules = generateMockRules();

    const [selectedStore, setSelectedStore] = useState('all');
    const [selectedPlatform, setSelectedPlatform] = useState('all');
    const [selectedRuleType, setSelectedRuleType] = useState('all');
    const [searchText, setSearchText] = useState('');

    const tabItems = [
        {
            key: 'all',
            label: (
                <span style={{ fontSize: 14 }}>
                    Tất cả <Badge count={9} style={{ marginLeft: 8 }} />
                </span>
            )
        },
        {
            key: 'upcoming',
            label: (
                <span style={{ fontSize: 14 }}>
                    Sắp diễn ra <Badge count={0} style={{ marginLeft: 8 }} />
                </span>
            )
        },
        {
            key: 'ongoing',
            label: (
                <span style={{ fontSize: 14 }}>
                    Đang diễn ra <Badge count={0} style={{ marginLeft: 8 }} />
                </span>
            )
        },
        {
            key: 'completed',
            label: (
                <span style={{ fontSize: 14 }}>
                    Đã kết thúc <Badge count={9} style={{ marginLeft: 8 }} />
                </span>
            )
        }
    ];

    const getStatusDisplay = (status, statusText) => {
        if (status === 'completed') {
            return (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: '#EF5941'
                    }} />
                    <Text style={{ fontSize: 14 }}>{statusText}</Text>
                </div>
            );
        } else if (status === 'inactive') {
            return (
                <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#D9D9D9'
                }} />
            );
        } else if (status === 'active') {
            return (
                <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#EF5941'
                }} />
            );
        }
        return null;
    };

    const columns = [
        {
            title: 'Tên chương trình',
            dataIndex: 'name',
            key: 'name',
            width: '25%',
            render: (text) => <span style={{ fontSize: 14 }}>{text}</span>
        },
        {
            title: 'Gian hàng',
            key: 'store',
            width: '15%',
            render: (_, record) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 16 }}>{record.storeIcon}</span>
                    <span style={{ fontSize: 14 }}>{record.store}</span>
                </div>
            )
        },
        {
            title: 'Thời gian diễn ra',
            key: 'time',
            width: '18%',
            render: (_, record) => (
                <div style={{ fontSize: 14 }}>
                    <div style={{ marginBottom: 2 }}>{record.startTime}</div>
                    <div>{record.endTime}</div>
                </div>
            )
        },
        {
            title: 'Loại quy tắc',
            dataIndex: 'ruleType',
            key: 'ruleType',
            width: '12%',
            render: (text) => <span style={{ fontSize: 14 }}>{text}</span>
        },
        {
            title: 'Trạng thái hoạt động',
            key: 'status',
            width: '15%',
            render: (_, record) => getStatusDisplay(record.status, record.statusText)
        },
        {
            title: 'Thứ tự ưu tiên',
            key: 'priority',
            width: '10%',
            align: 'center',
            render: (_, record) => (
                record.priority !== null ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <span style={{ fontSize: 14 }}>{record.priority}</span>
                        <Dropdown
                            menu={{
                                items: [
                                    { key: '1', label: '1' },
                                    { key: '2', label: '2' },
                                    { key: '3', label: '3' }
                                ]
                            }}
                            trigger={['click']}
                        >
                            <Button size="small" style={{ padding: '0 4px', minWidth: 24 }}>
                                <DownOutlined style={{ fontSize: 10 }} />
                            </Button>
                        </Dropdown>
                    </div>
                ) : null
            )
        },
        {
            title: 'Thao tác',
            key: 'actions',
            width: '10%',
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
                    <Button size="small" style={{ fontSize: 14 }}>
                        Chọn <DownOutlined style={{ fontSize: 10, marginLeft: 4 }} />
                    </Button>
                </Dropdown>
            )
        }
    ];

    return (
        <div>
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
                    Thêm quy tắc
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
                        activeKey={activeStatusTab}
                        onChange={setActiveStatusTab}
                        items={tabItems}
                    />
                </div>

                {/* Filter Section */}
                <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
                    <Space size="middle" wrap>
                        <span style={{ fontSize: 14 }}>Thời gian</span>
                        <RangePicker
                            value={dateRange}
                            onChange={setDateRange}
                            style={{ width: 240 }}
                            format="DD/MM/YYYY"
                            suffixIcon={<CalendarOutlined />}
                        />

                        <span style={{ fontSize: 14, marginLeft: 16 }}>Sàn</span>
                        <Select
                            value={selectedPlatform}
                            onChange={setSelectedPlatform}
                            style={{ width: 120 }}
                        >
                            <Option value="all">Tất cả</Option>
                            <Option value="shopee">Shopee</Option>
                            <Option value="tiktok">TikTok</Option>
                            <Option value="haravan">Haravan</Option>
                        </Select>

                        <span style={{ fontSize: 14, marginLeft: 16 }}>Gian hàng</span>
                        <Select
                            value={selectedStore}
                            onChange={setSelectedStore}
                            style={{ width: 150 }}
                        >
                            <Option value="all">Tất cả</Option>
                            <Option value="upbeauty">UpBeauty</Option>
                            <Option value="upbase">UpBase Beauty</Option>
                        </Select>

                        <span style={{ fontSize: 14, marginLeft: 16 }}>Loại quy tắc</span>
                        <Select
                            value={selectedRuleType}
                            onChange={setSelectedRuleType}
                            style={{ width: 150 }}
                        >
                            <Option value="all">Tất cả</Option>
                            <Option value="priority">Quy tắc ưu tiên</Option>
                            <Option value="dynamic">Quy tắc động thời</Option>
                        </Select>

                        <span style={{ fontSize: 14, marginLeft: 16 }}>Tên chương trình</span>
                        <Search
                            placeholder="Tìm kiếm"
                            allowClear
                            onSearch={setSearchText}
                            style={{ width: 200 }}
                        />
                    </Space>
                </div>

                {/* Table */}
                <Table
                    columns={columns}
                    dataSource={rules}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Tổng ${total} quy tắc`,
                        style: { fontSize: 14, padding: '16px' }
                    }}
                    style={{ fontSize: 14 }}
                    className="neutral-header-table"
                />
            </Card>
        </div>
    );
};

export default GiftRuleView;
