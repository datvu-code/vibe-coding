import React, { useState } from 'react';
import {
    Card, Button, Table, Space, Dropdown
} from 'antd';
import {
    DownOutlined, PlusOutlined
} from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const MemberTierView = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    const mockTiers = [
        {
            key: '1',
            name: 'Bạc',
            nameIcon: 'silver',
            description: 'Khách đăng kí tài khoản thành công là oki',
            minSpending: '0 VND',
            memberCount: '4,313'
        },
        {
            key: '2',
            name: 'Vàng',
            nameIcon: 'gold',
            description: '',
            minSpending: '300,000 VND',
            memberCount: '9'
        },
        {
            key: '3',
            name: 'Kim Cương',
            nameIcon: 'diamond',
            description: '',
            minSpending: '500,000 VND',
            memberCount: '22'
        }
    ];

    const tierIcon = (icon) => {
        if (icon === 'silver') return <span style={{ fontSize: 18 }} title="Bạc">🥈</span>;
        if (icon === 'gold') return <span style={{ fontSize: 18 }} title="Vàng">🥇</span>;
        if (icon === 'diamond') return <span style={{ fontSize: 18 }} title="Kim Cương">💎</span>;
        return null;
    };

    const columns = [
        {
            title: 'Tên hạng',
            key: 'name',
            width: '20%',
            render: (_, record) => (
                <Space align="center" size="small">
                    {tierIcon(record.nameIcon)}
                    <span style={{ fontSize: 14 }}>{record.name}</span>
                </Space>
            )
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: '35%',
            render: (text) => (
                <span style={{ fontSize: 14, color: text ? '#202124' : '#8C8C8C' }}>
                    {text || '-'}
                </span>
            )
        },
        {
            title: 'Chi tiêu tối thiểu',
            dataIndex: 'minSpending',
            key: 'minSpending',
            width: '18%',
            render: (text) => <span style={{ fontSize: 14 }}>{text}</span>
        },
        {
            title: 'Số lượng thành viên',
            dataIndex: 'memberCount',
            key: 'memberCount',
            width: '17%',
            render: (text) => <span style={{ fontSize: 14 }}>{text}</span>
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
                            { key: 'edit', label: 'Chỉnh sửa' },
                            { key: 'view', label: 'Xem chi tiết' },
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
                    Thêm hạng
                </Button>
            </div>

            {/* Main Section - Table */}
            <Card
                styles={{ body: { padding: 0 } }}
                style={{ borderRadius: 8, background: '#fff' }}
            >
                <Table
                    columns={columns}
                    dataSource={mockTiers.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                    rowKey="key"
                    pagination={false}
                    style={{ fontSize: 14 }}
                    className="neutral-header-table"
                />
                <div style={{ padding: '0 16px 14px', borderTop: '0.87px solid #F0F0F0' }}>
                    <PaginationFooter
                        total={mockTiers.length}
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

export default MemberTierView;
