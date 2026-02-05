import React, { useState } from 'react';
import {
    Card, Input, Button, Table, Space, Dropdown, Typography
} from 'antd';
import {
    SearchOutlined, DownOutlined
} from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Search } = Input;
const { Text } = Typography;

const LoyalCustomerView = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const mockCustomers = [
        {
            key: '1',
            name: 'tuytminhhunh954',
            customerId: 'CUS3712548840',
            phone: '-',
            createdAt: '07:23 03/02/2026',
            activatedAt: '-',
            status: 'active',
            tier: 'silver'
        },
        {
            key: '2',
            name: 'N*** Á**',
            customerId: 'CUS4012596858',
            phone: '(+84)358****51',
            createdAt: '07:23 03/02/2026',
            activatedAt: '-',
            status: 'active',
            tier: 'silver'
        },
        {
            key: '3',
            name: 'joycehouse.vn',
            customerId: 'CUS1212590094',
            phone: '-',
            createdAt: '07:22 03/02/2026',
            activatedAt: '-',
            status: 'active',
            tier: 'silver'
        }
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (keys) => setSelectedRowKeys(keys)
    };

    const columns = [
        {
            title: 'Tên khách hàng',
            dataIndex: 'name',
            key: 'name',
            width: '18%',
            render: (text) => <span style={{ fontSize: 14 }}>{text}</span>
        },
        {
            title: 'Mã khách hàng',
            dataIndex: 'customerId',
            key: 'customerId',
            width: '14%',
            render: (text) => <span style={{ fontSize: 14 }}>{text}</span>
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            width: '14%',
            render: (text) => <span style={{ fontSize: 14 }}>{text}</span>
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '12%',
            render: (text) => <span style={{ fontSize: 14 }}>{text}</span>
        },
        {
            title: 'Ngày kích hoạt',
            dataIndex: 'activatedAt',
            key: 'activatedAt',
            width: '12%',
            render: (text) => <span style={{ fontSize: 14 }}>{text}</span>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: '12%',
            render: (status) => (
                <span style={{ fontSize: 14, color: '#52c41a' }}>
                    {status === 'active' ? 'Đang hoạt động' : status}
                </span>
            )
        },
        {
            title: 'Hạng thành viên',
            dataIndex: 'tier',
            key: 'tier',
            width: '10%',
            align: 'center',
            render: (tier) => (
                <span style={{ fontSize: 18 }} title="Bạc">🥈</span>
            )
        },
        {
            title: 'Thao tác',
            key: 'actions',
            width: '8%',
            align: 'center',
            render: () => (
                <Dropdown
                    menu={{
                        items: [
                            { key: 'view', label: 'Xem chi tiết' },
                            { key: 'edit', label: 'Chỉnh sửa' }
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
            {/* Main Section - Filter + Table (FrameScheduleManagement pattern) */}
            <Card
                styles={{ body: { padding: 0 } }}
                style={{ borderRadius: 8, background: '#fff' }}
            >
                {/* Filter Section: search only */}
                <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
                    <Search
                        placeholder="Tìm theo tên, mã khách hàng, số điện thoại"
                        allowClear
                        onSearch={setSearchText}
                        style={{ width: 400, fontSize: 14 }}
                        prefix={<SearchOutlined />}
                    />
                </div>

                {/* Selection bar: only when rows selected (OrderList pattern) */}
                {selectedRowKeys.length > 0 && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        padding: '12px 16px',
                        borderBottom: '1px solid #F0F0F0',
                        background: '#FAFAFA'
                    }}>
                        <Text style={{ fontSize: 14 }}>
                            Đã chọn <strong>{selectedRowKeys.length}</strong> khách hàng
                        </Text>
                        <Space>
                            <Button size="small" style={{ fontSize: 14 }}>
                                Xuất danh sách
                            </Button>
                            <Dropdown
                                menu={{
                                    items: [
                                        { key: 'bulk', label: 'Thao tác hàng loạt' }
                                    ]
                                }}
                                trigger={['click']}
                            >
                                <Button size="small" style={{ fontSize: 14 }}>
                                    Thao tác hàng loạt <DownOutlined />
                                </Button>
                            </Dropdown>
                        </Space>
                    </div>
                )}

                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={mockCustomers.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                    rowKey="key"
                    pagination={false}
                    style={{ fontSize: 14 }}
                    className="neutral-header-table"
                />
                <div style={{ padding: '0 16px 14px', borderTop: '0.87px solid #F0F0F0' }}>
                    <PaginationFooter
                        total={mockCustomers.length}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={setPageSize}
                        label="khách hàng"
                    />
                </div>
            </Card>
        </div>
    );
};


export default LoyalCustomerView;
