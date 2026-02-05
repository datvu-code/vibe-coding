import React, { useState } from 'react';
import {
    Card, Alert, Input, Button, Table, Space, Select, Tabs, Tag, Dropdown
} from 'antd';
import {
    SearchOutlined, DownOutlined, PlusOutlined, InfoCircleOutlined,
    CheckCircleOutlined, DownloadOutlined
} from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Search } = Input;
const { Option } = Select;

const PlatformPromoView = () => {
    const [activeTopTab, setActiveTopTab] = useState('le');
    const [activeStatusTab, setActiveStatusTab] = useState('all');
    const [selectedStore, setSelectedStore] = useState('all');
    const [selectedPlatform, setSelectedPlatform] = useState('all');
    const [dateRange, setDateRange] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const topTabItems = [
        { key: 'le', label: <span style={{ fontSize: 14 }}>Chương trình lẻ</span> },
        { key: 'hang-loat', label: <span style={{ fontSize: 14 }}>Chương trình hàng loạt</span> }
    ];

    const statusTabItems = [
        { key: 'all', label: <span style={{ fontSize: 14 }}>Tất cả</span> },
        { key: 'pending', label: <span style={{ fontSize: 14 }}>Chờ duyệt (0)</span> },
        { key: 'approved', label: <span style={{ fontSize: 14 }}>Đã duyệt (414)</span> }
    ];

    const mockPrograms = [
        {
            key: '1',
            programName: 'UpBeauty Store',
            programType: 'Flash Sale của shop',
            productCount: 10,
            timeStart: '02/02/2026 15:00',
            timeEnd: '02/02/2026 18:00',
            status: 'ended',
            syncStatus: 'synced'
        },
        {
            key: '2',
            programName: 'T11. Ziaja',
            programType: 'Chương trình của shop',
            productCount: 3,
            timeStart: '02/02/2026 15:00',
            timeEnd: '02/02/2026 18:00',
            status: 'ended',
            syncStatus: 'synced'
        }
    ];

    const columns = [
        {
            title: 'Tên chương trình',
            dataIndex: 'programName',
            key: 'programName',
            width: '20%',
            render: (text) => <span style={{ fontSize: 14 }}>{text}</span>
        },
        {
            title: 'Chương trình',
            dataIndex: 'programType',
            key: 'programType',
            width: '18%',
            render: (text) => <span style={{ fontSize: 14 }}>{text}</span>
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'productCount',
            key: 'productCount',
            width: '10%',
            align: 'center',
            render: (n) => <span style={{ fontSize: 14 }}>{n}</span>
        },
        {
            title: 'Thời gian',
            key: 'time',
            width: '22%',
            render: (_, record) => (
                <div style={{ fontSize: 14, lineHeight: '22px' }}>
                    <div>{record.timeStart} -</div>
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
                <span style={{ fontSize: 14 }}>{status === 'ended' ? 'Đã kết thúc' : status}</span>
            )
        },
        {
            title: 'Thông tin đồng bộ',
            dataIndex: 'syncStatus',
            key: 'syncStatus',
            width: '12%',
            render: (sync) => (
                <Tag color="success" icon={<CheckCircleOutlined />} style={{ fontSize: 14 }}>
                    Đã đồng bộ
                </Tag>
            )
        },
        {
            title: 'Thao tác',
            key: 'actions',
            width: '8%',
            align: 'center',
            render: () => (
                <Button style={{ fontSize: 14 }}>Chọn <DownOutlined /></Button>
            )
        }
    ];

    return (
        <div>
            {/* Alert Banner + text link */}
            <Alert
                message={
                    <span style={{ fontSize: 14 }}>
                        Vui lòng sử dụng tiện ích UpS Extension để đồng bộ chương trình khuyến mãi trên kênh người bán.{' '}
                        <a href="#" style={{ color: '#EF5941', textDecoration: 'underline', fontWeight: 500 }}>
                            Cài đặt tiện ích
                        </a>
                    </span>
                }
                type="info"
                showIcon
                icon={<InfoCircleOutlined />}
                style={{ marginBottom: 14, borderRadius: 8 }}
            />

            {/* Top Tabs: Chương trình lẻ / Chương trình hàng loạt */}
            <div style={{ marginBottom: 14, display: 'flex', gap: 24, alignItems: 'center' }}>
                {[
                    { key: 'le', label: 'Chương trình lẻ' },
                    { key: 'hang-loat', label: 'Chương trình hàng loạt' }
                ].map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTopTab(tab.key)}
                        style={{
                            border: 'none',
                            borderBottom: activeTopTab === tab.key ? '2px solid #EF5941' : '2px solid transparent',
                            background: 'transparent',
                            padding: '8px 0',
                            cursor: 'pointer',
                            fontSize: 16,
                            fontWeight: activeTopTab === tab.key ? 600 : 400,
                            color: activeTopTab === tab.key ? '#EF5941' : 'rgba(0,0,0,0.88)'
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Top Actions - Split button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
                <Space.Compact>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}
                    >
                        Tạo chương trình
                    </Button>
                    <Dropdown
                        menu={{
                            items: [
                                { key: 'download', label: 'Tải chương trình', icon: <DownloadOutlined /> }
                            ]
                        }}
                        trigger={['click']}
                    >
                        <Button
                            type="primary"
                            icon={<DownOutlined />}
                            style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}
                        />
                    </Dropdown>
                </Space.Compact>
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
                        <Input style={{ width: 240 }} placeholder="Chọn" suffix={<span style={{ color: '#8c8c8c' }}>📅</span>} />
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
                        <Select style={{ width: 160 }} placeholder="Chọn" />
                        <span style={{ fontSize: 14, marginLeft: 16 }}>Chọn chương trình</span>
                        <Select style={{ width: 140 }} placeholder="Chọn" />
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

export default PlatformPromoView;
