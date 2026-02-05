import React, { useState } from 'react';
import {
    Card, Input, Button, Table, Space, Select, Dropdown
} from 'antd';
import { SearchOutlined, DownOutlined, PlusOutlined, ToolOutlined } from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Search } = Input;
const { Option } = Select;

const WarehouseProductView = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const mockProducts = [
        { key: '1', name: 'Mặt Nạ 1 Miếng Baegayul Moisture Balancing Mask', links: '1 liên kết', goods: '1 hàng hóa', updatedAt: '03/02/2026 08:51' },
        { key: '2', name: 'Tinh Chất Bioverse B512 Repair Hydrating Booster 30ml', links: '1 liên kết', goods: '1 hàng hóa', updatedAt: '03/02/2026 08:38' },
        { key: '3', name: 'Túi đựng mỹ phẩm', links: '4 liên kết', goods: '1 hàng hóa', updatedAt: '22/01/2026 16:59' }
    ];

    const columns = [
        {
            title: 'Sản phẩm',
            key: 'product',
            width: '45%',
            render: (_, record) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 48, height: 48, background: '#F5F5F5', borderRadius: 4 }} />
                    <div>
                        <div style={{ fontSize: 14, marginBottom: 2 }}>{record.name}</div>
                        <div style={{ fontSize: 12, color: '#8C8C8C' }}>{record.links}</div>
                    </div>
                </div>
            )
        },
        { title: 'Hàng hóa', dataIndex: 'goods', key: 'goods', width: '18%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Cập nhật', dataIndex: 'updatedAt', key: 'updatedAt', width: '22%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        {
            title: 'Thao tác',
            key: 'actions',
            width: '15%',
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
                <Dropdown menu={{ items: [{ key: 'tools', label: 'Công cụ xử lý hàng loạt' }] }} trigger={['click']}>
                    <Button style={{ borderColor: '#EF5941', color: '#EF5941', fontSize: 14 }}>Công cụ xử lý hàng loạt <DownOutlined /></Button>
                </Dropdown>
                <Button type="primary" icon={<PlusOutlined />} style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}>
                    Thêm sản phẩm <DownOutlined />
                </Button>
            </div>

            {/* Main Section - Card: Filter, Selection bar, Table */}
            <Card styles={{ body: { padding: 0 } }} style={{ borderRadius: 8, background: '#fff' }}>
                {/* Filter Section */}
                <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
                    <Space size="middle">
                        <Search placeholder="Tên sản phẩm/SKU" allowClear onSearch={setSearchText} style={{ width: 280, fontSize: 14 }} prefix={<SearchOutlined />} />
                        <Button style={{ fontSize: 14 }}>Lọc sản phẩm <DownOutlined /></Button>
                    </Space>
                </div>
                {selectedRowKeys.length > 0 && (
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid #F0F0F0', background: '#FAFAFA', display: 'flex', alignItems: 'center', gap: 16 }}>
                        <span style={{ fontSize: 14 }}>Đã chọn: {selectedRowKeys.length} sản phẩm</span>
                        <Dropdown menu={{ items: [{ key: 'bulk', label: 'Thao tác hàng loạt' }] }} trigger={['click']}>
                            <Button style={{ fontSize: 14 }}>Thao tác hàng loạt <DownOutlined /></Button>
                        </Dropdown>
                    </div>
                )}
                <Table
                    rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
                    columns={columns}
                    dataSource={mockProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                    rowKey="key"
                    pagination={false}
                    style={{ fontSize: 14 }}
                    className="neutral-header-table"
                />
                <div style={{ padding: '0 16px 14px', borderTop: '0.87px solid #F0F0F0' }}>
                    <PaginationFooter
                        total={mockProducts.length}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={setPageSize}
                        label="sản phẩm"
                    />
                </div>
            </Card>
        </div>
    );
};

export default WarehouseProductView;
