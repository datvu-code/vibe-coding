import React, { useState } from 'react';
import { Card, Input, Button, Table, Space, Empty } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Search } = Input;

const SupplierManagementView = () => {
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const supplierData = [];
    const columns = [
        { title: 'Tên nhà cung cấp', dataIndex: 'name', key: 'name', width: '25%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone', width: '18%', align: 'center', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Địa chỉ', dataIndex: 'address', key: 'address', width: '25%', align: 'center', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Số phiếu nhập', dataIndex: 'receiptCount', key: 'receiptCount', width: '14%', align: 'center', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Cấu hình mặc định', dataIndex: 'config', key: 'config', width: '14%', align: 'center', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Thao tác', key: 'actions', width: '8%', align: 'right', render: () => <Button type="link" size="small" style={{ fontSize: 14 }}>Sửa</Button> }
    ];

    const emptyDescription = 'Chưa có nhà cung cấp nào';
    const locale = {
        emptyText: (
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={<span style={{ fontSize: 14, color: '#8C8C8C' }}>{emptyDescription}</span>}
            />
        )
    };

    return (
        <div>
            {/* Top Action - FrameScheduleManagement pattern */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}
                >
                    Thêm nhà cung cấp
                </Button>
            </div>

            {/* Main Section - Card: Filter, Table (FrameScheduleManagement pattern) */}
            <Card styles={{ body: { padding: 0 } }} style={{ borderRadius: 8, background: '#fff' }}>
                <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
                    <Space size="middle">
                        <Search placeholder="Tìm tên nhà cung cấp" allowClear onSearch={setSearchText} style={{ width: 320, fontSize: 14 }} />
                    </Space>
                </div>
                <Table
                    columns={columns}
                    dataSource={supplierData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                    rowKey="key"
                    locale={locale}
                    pagination={false}
                    style={{ fontSize: 14 }}
                    className="neutral-header-table"
                />
                <div style={{ padding: '0 16px 14px', borderTop: '0.87px solid #F0F0F0' }}>
                    <PaginationFooter
                        total={supplierData.length}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={setPageSize}
                        label="nhà cung cấp"
                    />
                </div>
            </Card>
        </div>
    );
};

export default SupplierManagementView;
