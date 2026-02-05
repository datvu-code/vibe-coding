import React, { useState } from 'react';
import {
    Card, Input, Button, Table, Space, Select, Tabs, Tag, Dropdown
} from 'antd';
import {
    SearchOutlined, DownOutlined, PlusOutlined
} from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Search } = Input;
const { Option } = Select;

const UpsPromoView = () => {
    const [activeStatusTab, setActiveStatusTab] = useState('all');
    const [selectedStore, setSelectedStore] = useState('all');
    const [selectedPlatform, setSelectedPlatform] = useState('all');
    const [selectedProgramType, setSelectedProgramType] = useState('all');
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const statusTabItems = [
        { key: 'all', label: <span style={{ fontSize: 14 }}>Tất cả (28)</span> },
        { key: 'upcoming', label: <span style={{ fontSize: 14 }}>Sắp diễn ra (0)</span> },
        { key: 'ongoing', label: <span style={{ fontSize: 14 }}>Đang diễn ra (1)</span> },
        { key: 'ended', label: <span style={{ fontSize: 14 }}>Đã kết thúc (27)</span> }
    ];

    const mockPrograms = [
        {
            key: '1',
            name: 'T12 - Chương trình AOV cho đơn hàng trên 230k',
            type: 'Quà tặng',
            typeBadge: 'Chương trình ưu tiên',
            store: 'UpBase Beauty',
            storeIcon: '🛍️',
            timeStart: '04/12/2025 20:59',
            timeEnd: '17/12/2025 11:12',
            status: 'ended',
            priority: 1
        },
        {
            key: '2',
            name: 'Voucher KH: 50K/300K',
            nameSub: 'UPBEAU50',
            type: 'Voucher',
            typeBadge: null,
            store: 'UpBase Beauty',
            storeIcon: '🛍️',
            timeStart: '22/01/2026 09:13',
            timeEnd: '28/02/2026 00:00',
            status: 'ongoing',
            priority: null
        },
        {
            key: '3',
            name: 'Sao chép TEST VC',
            type: 'Voucher',
            typeBadge: null,
            store: 'UpBase Beauty',
            storeIcon: '🛍️',
            timeStart: '22/01/2026 09:13',
            timeEnd: '28/02/2026 00:00',
            status: 'ended',
            priority: null
        }
    ];

    const columns = [
        {
            title: 'Tên chương trình',
            key: 'name',
            width: '22%',
            render: (_, record) => (
                <div style={{ fontSize: 14 }}>
                    <div>{record.name}</div>
                    {record.nameSub && <div style={{ color: '#8c8c8c', fontSize: 12 }}>{record.nameSub}</div>}
                </div>
            )
        },
        {
            title: 'Loại chương trình',
            key: 'type',
            width: '18%',
            render: (_, record) => (
                <div>
                    <span style={{ fontSize: 14 }}>{record.type}</span>
                    {record.typeBadge && (
                        <Tag style={{ marginLeft: 8, fontSize: 12 }}>{record.typeBadge}</Tag>
                    )}
                </div>
            )
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
            title: 'Thời gian',
            key: 'time',
            width: '20%',
            render: (_, record) => (
                <div style={{ fontSize: 14, lineHeight: '22px' }}>
                    <div>{record.timeStart}</div>
                    <div>{record.timeEnd}</div>
                </div>
            )
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
            title: 'Thứ tự ưu tiên',
            key: 'priority',
            width: '8%',
            align: 'center',
            render: (_, record) =>
                record.priority != null ? (
                    <Dropdown
                        menu={{ items: [{ key: '1', label: '1' }, { key: '2', label: '2' }] }}
                        trigger={['click']}
                    >
                        <Button size="small" style={{ fontSize: 14 }}>
                            {record.priority} <DownOutlined style={{ fontSize: 10 }} />
                        </Button>
                    </Dropdown>
                ) : null
        },
        {
            title: 'Thao tác',
            key: 'actions',
            width: '7%',
            align: 'center',
            render: () => (
                <Button style={{ fontSize: 14 }}>Chọn <DownOutlined /></Button>
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
                    style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}
                >
                    Tạo chương trình <DownOutlined style={{ fontSize: 10, marginLeft: 4 }} />
                </Button>
            </div>

            {/* Main Section - Tabs, Filter, Table */}
            <Card
                styles={{ body: { padding: 0 } }}
                style={{ borderRadius: 8, background: '#fff' }}
            >
                <div style={{ padding: '0 16px' }} className="order-processing-tabs">
                    <Tabs
                        activeKey={activeStatusTab}
                        onChange={setActiveStatusTab}
                        items={statusTabItems}
                    />
                </div>

                <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
                    <Space size="middle" wrap>
                        <span style={{ fontSize: 14 }}>Chọn khoảng thời gian</span>
                        <Input style={{ width: 240 }} placeholder="Chọn" />
                        <span style={{ fontSize: 14, marginLeft: 16 }}>Chọn sàn</span>
                        <Select value={selectedPlatform} onChange={setSelectedPlatform} style={{ width: 120 }}>
                            <Option value="all">Tất cả</Option>
                        </Select>
                        <span style={{ fontSize: 14, marginLeft: 16 }}>Chọn gian hàng</span>
                        <Select value={selectedStore} onChange={setSelectedStore} style={{ width: 150 }}>
                            <Option value="all">Tất cả</Option>
                        </Select>
                        <span style={{ fontSize: 14, marginLeft: 16 }}>Tìm chương trình</span>
                        <Search placeholder="Tìm kiếm" allowClear style={{ width: 200 }} />
                        <span style={{ fontSize: 14, marginLeft: 16 }}>Chọn loại chương trình</span>
                        <Select value={selectedProgramType} onChange={setSelectedProgramType} style={{ width: 160 }}>
                            <Option value="all">Tất cả</Option>
                            <Option value="voucher">Voucher</Option>
                            <Option value="gift">Quà tặng</Option>
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
                    />
                </div>
            </Card>
        </div>
    );
};

export default UpsPromoView;
