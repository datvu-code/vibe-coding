import React, { useState } from 'react';
import {
    Card, Tabs, Alert, Input, Button, Table, Space, Checkbox, Tag, Tooltip
} from 'antd';
import {
    SearchOutlined, DownloadOutlined, DeleteOutlined, PlusOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Search } = Input;

const FrameTemplateList = () => {
    const [activeTab, setActiveTab] = useState('static');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Mock data for frame templates
    const mockTemplates = [
        {
            key: '1',
            name: 'ddown 200k',
            image: 'https://picsum.photos/seed/frame1/80/80',
            changeCount: 1
        },
        {
            key: '2',
            name: 'quà serum B512 T2',
            image: 'https://picsum.photos/seed/frame2/80/80',
            changeCount: 1
        },
        {
            key: '3',
            name: 'quà túi mỹ phẩm T2',
            image: 'https://picsum.photos/seed/frame3/80/80',
            changeCount: 1
        },
        {
            key: '4',
            name: 'QUÀ 3 SACHET B5',
            image: 'https://picsum.photos/seed/frame4/80/80',
            changeCount: 1
        }
    ];

    const columns = [
        {
            title: 'Tên mẫu',
            dataIndex: 'name',
            key: 'name',
            width: '40%',
            render: (text) => <span style={{ fontSize: 14 }}>{text}</span>
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            width: '20%',
            align: 'center',
            render: (image) => (
                <img
                    src={image}
                    alt="Frame template"
                    style={{
                        width: 80,
                        height: 80,
                        objectFit: 'cover',
                        borderRadius: 4,
                        border: '1px solid #E1E3E5'
                    }}
                />
            )
        },
        {
            title: 'Lịch thay khung tự động',
            dataIndex: 'changeCount',
            key: 'changeCount',
            width: '20%',
            align: 'center',
            render: (count) => (
                <span style={{ fontSize: 14, color: '#EF5941' }}>{count}</span>
            )
        },
        {
            title: 'Thao tác',
            key: 'actions',
            width: '20%',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Tải xuống">
                        <Button
                            type="text"
                            icon={<DownloadOutlined />}
                            style={{ color: '#595959' }}
                        />
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            style={{ color: '#595959' }}
                            onClick={() => handleDelete(record.key)}
                        />
                    </Tooltip>
                </Space>
            )
        }
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys) => {
            setSelectedRowKeys(selectedKeys);
        }
    };

    const handleDelete = (key) => {
        console.log('Delete template:', key);
    };

    const handleBulkDelete = () => {
        console.log('Bulk delete:', selectedRowKeys);
    };

    const handleAddTemplate = () => {
        console.log('Add new template');
    };

    const handleSearch = (value) => {
        setSearchText(value);
        console.log('Search:', value);
    };

    const tabItems = [
        {
            key: 'static',
            label: <span style={{ fontSize: 14 }}>Khung ảnh tĩnh</span>
        },
        {
            key: 'dynamic',
            label: <span style={{ fontSize: 14 }}>Khung ảnh động</span>
        }
    ];

    return (
        <div>
            {/* Alert Banner */}
            <Alert
                message="Khung ảnh đang ở trạng thái Đang áp khung thì sẽ không được phép chỉnh sửa và xoá."
                type="info"
                showIcon
                icon={<InfoCircleOutlined />}
                style={{
                    marginBottom: 14,
                    borderRadius: 8,
                    fontSize: 14
                }}
            />

            {/* Top Action */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAddTemplate}
                    style={{
                        background: '#EF5941',
                        borderColor: '#EF5941',
                        fontSize: 14
                    }}
                >
                    Thêm khung ảnh mẫu hàng loạt
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
                        <span style={{ fontSize: 14 }}>Tên khung ảnh mẫu</span>
                        <Search
                            placeholder="Tìm kiếm"
                            allowClear
                            onSearch={handleSearch}
                            style={{ width: 250, fontSize: 14 }}
                        />
                        {selectedRowKeys.length > 0 && (
                            <>
                                <span style={{ fontSize: 14, marginLeft: 16 }}>
                                    Đã chọn {selectedRowKeys.length}
                                </span>
                                <Button
                                    onClick={handleBulkDelete}
                                    style={{ fontSize: 14 }}
                                >
                                    Xóa hàng loạt
                                </Button>
                            </>
                        )}
                    </Space>
                </div>

                {/* Table */}
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={mockTemplates.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                    pagination={false}
                    style={{ fontSize: 14 }}
                    className="neutral-header-table"
                />
                <div style={{ padding: '0 16px 14px', borderTop: '0.87px solid #F0F0F0' }}>
                    <PaginationFooter
                        total={mockTemplates.length}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={setPageSize}
                        label="mẫu"
                    />
                </div>
            </Card>
        </div>
    );
};

export default FrameTemplateList;
