import React, { useState } from 'react';
import { Card, Button, Table, Space, Input } from 'antd';
import { PlusOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Search } = Input;

const ProductCategoryView = () => {
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const mockCategories = [
        { key: '1', id: 181, name: 'GIFT', updatedAt: '15:26 18/04/2025' },
        { key: '2', id: 148, name: 'Kem đánh răng', updatedAt: '09:34 30/12/2024' },
        { key: '3', id: 140, name: 'Đặc trị mụn', updatedAt: '09:28 06/12/2024' },
        { key: '4', id: 125, name: 'DDVS', updatedAt: '17:10 05/11/2024' },
        { key: '5', id: 107, name: 'Kem dưỡng - Son dưỡng', updatedAt: '15:39 24/10/2024' }
    ];

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', width: '15%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
            width: '50%',
            render: (text) => (
                <Space align="center">
                    <span style={{ fontSize: 14 }}>{text}</span>
                    <EditOutlined style={{ fontSize: 14, color: '#8C8C8C', cursor: 'pointer' }} />
                </Space>
            )
        },
        { title: 'Ngày cập nhật', dataIndex: 'updatedAt', key: 'updatedAt', width: '25%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Thao tác', key: 'actions', width: '10%', align: 'center', render: () => <Button type="link" danger size="small" style={{ fontSize: 14 }}>Xóa</Button> }
    ];

    return (
        <div>
            {/* Top Action - FrameScheduleManagement pattern */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}
                >
                    Thêm danh mục
                </Button>
            </div>

            {/* Main Section - Card: Filter, Table */}
            <Card styles={{ body: { padding: 0 } }} style={{ borderRadius: 8, background: '#fff' }}>
                {/* Filter Section */}
                <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
                    <Space size="middle">
                        <Search placeholder="Tìm danh mục" allowClear onSearch={setSearchText} style={{ width: 280, fontSize: 14 }} prefix={<SearchOutlined />} />
                    </Space>
                </div>
                <Table
                    columns={columns}
                    dataSource={mockCategories.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                    rowKey="key"
                    pagination={false}
                    style={{ fontSize: 14 }}
                    className="neutral-header-table"
                />
                <div style={{ padding: '0 16px 14px', borderTop: '0.87px solid #F0F0F0' }}>
                    <PaginationFooter
                        total={mockCategories.length}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={setPageSize}
                        label="danh mục"
                    />
                </div>
            </Card>
        </div>
    );
};

export default ProductCategoryView;
