import React, { useState } from 'react';
import {
    Card, Input, Button, Table, Space, Select, Tabs, Typography, Dropdown
} from 'antd';
import { SearchOutlined, DownOutlined, ExportOutlined, SyncOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

const InventoryStockView = () => {
    const [activeTab, setActiveTab] = useState('new');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [stockTab, setStockTab] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const tabItems = [
        { key: 'new', label: <span style={{ fontSize: 14 }}>Trạng thái mới</span> },
        { key: 'other', label: <span style={{ fontSize: 14 }}>Trạng thái khác</span> }
    ];

    const stockTabItems = [
        { key: 'all', label: <span style={{ fontSize: 14 }}>Tất cả (456)</span> },
        { key: 'in-stock', label: <span style={{ fontSize: 14 }}>Còn hàng (147)</span> },
        { key: 'low', label: <span style={{ fontSize: 14 }}>Sắp hết hàng (0)</span> },
        { key: 'out', label: <span style={{ fontSize: 14 }}>Hết hàng (309)</span> },
        { key: 'reserved', label: <span style={{ fontSize: 14 }}>Tạm ứng (0)</span> }
    ];

    const mockData = [
        { key: '1', sku: '8809115029119', name: 'Klairs Supple P...', unit: 'Hộp', status: 'Mới', type: 'Thường', actual: 10, hold: 0, reserve: 0, available: 10, transit: 0, returning: 0 },
        { key: '2', sku: '8809115029120', name: 'Beplain Mặt nạ ...', unit: 'Hộp', status: 'Mới', type: 'Thường', actual: 5, hold: 0, reserve: 0, available: 5, transit: 0, returning: 0 }
    ];

    const columns = [
        { title: 'SKU', dataIndex: 'sku', key: 'sku', width: '12%', render: (t) => <a style={{ fontSize: 14 }}>{t}</a> },
        {
            title: 'Hàng hóa',
            key: 'product',
            width: '20%',
            render: (_, r) => (
                <Space>
                    <div style={{ width: 36, height: 36, background: '#F5F5F5', borderRadius: 4 }} />
                    <span style={{ fontSize: 14 }}>{r.name}</span>
                </Space>
            )
        },
        { title: 'ĐVT', dataIndex: 'unit', key: 'unit', width: '8%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Trạng thái', dataIndex: 'status', key: 'status', width: '8%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Loại', dataIndex: 'type', key: 'type', width: '8%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Tồn kho thực tế', dataIndex: 'actual', key: 'actual', width: '10%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Tồn kho tạm giữ', dataIndex: 'hold', key: 'hold', width: '10%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Tồn dự trữ', dataIndex: 'reserve', key: 'reserve', width: '8%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Tồn kho sẵn sàng bán', dataIndex: 'available', key: 'available', width: '10%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Tồn kho đang vận chuyển', dataIndex: 'transit', key: 'transit', width: '10%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Tồn đang hoàn về', dataIndex: 'returning', key: 'returning', width: '10%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> }
    ];

    return (
        <div>
            {/* Top Action - FrameScheduleManagement pattern */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14, gap: 8 }}>
                <Button type="primary" style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}>Kiểm kho</Button>
                <Button style={{ borderColor: '#EF5941', color: '#EF5941', fontSize: 14 }}>Xuất file</Button>
                <Button type="text" icon={<SyncOutlined />} style={{ fontSize: 14 }} />
            </div>

            {/* Main Section - Card: Tabs, Filter, Table */}
            <Card styles={{ body: { padding: 0 } }} style={{ borderRadius: 8, background: '#fff' }}>
                <div style={{ padding: '0 16px' }} className="order-processing-tabs">
                    <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
                </div>
                <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
                    <Space direction="vertical" style={{ width: '100%' }} size="middle">
                        <Space wrap>
                            <Search placeholder="Tên sản phẩm/SKU" allowClear style={{ width: 260, fontSize: 14 }} prefix={<SearchOutlined />} />
                            <span style={{ fontSize: 14 }}>Nhãn hàng</span>
                            <Select placeholder="Tất cả" style={{ width: 120, fontSize: 14 }} suffixIcon={<DownOutlined />}><Option value="all">Tất cả</Option></Select>
                            <span style={{ fontSize: 14 }}>Kho</span>
                            <Select placeholder="Tất cả" style={{ width: 120, fontSize: 14 }} suffixIcon={<DownOutlined />}><Option value="all">Tất cả</Option></Select>
                            <span style={{ fontSize: 14 }}>Loại sản phẩm</span>
                            <Select placeholder="Tất cả" style={{ width: 120, fontSize: 14 }} suffixIcon={<DownOutlined />}><Option value="all">Tất cả</Option></Select>
                        </Space>
                        <Space><span style={{ fontSize: 14 }}>Danh mục hàng hoá</span>
                            <Select placeholder="Tất cả" style={{ width: 180, fontSize: 14 }} suffixIcon={<DownOutlined />}><Option value="all">Tất cả</Option></Select>
                        </Space>
                    </Space>
                </div>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', gap: 24 }}>
                    <Text style={{ fontSize: 14 }}>Tổng giá trị hàng tồn kho hiện có: <strong>1,139,115,255₫</strong> <QuestionCircleOutlined style={{ color: '#8C8C8C' }} /></Text>
                    <Text style={{ fontSize: 14 }}>Tổng hàng tồn kho hiện có: <strong>8,238</strong> <QuestionCircleOutlined style={{ color: '#8C8C8C' }} /></Text>
                </div>
                {(selectedRowKeys.length > 0) && (
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid #F0F0F0', background: '#FAFAFA', display: 'flex', alignItems: 'center', gap: 16 }}>
                        <span style={{ fontSize: 14 }}>Đã chọn: {selectedRowKeys.length} sản phẩm</span>
                        <Dropdown menu={{ items: [{ key: 'bulk', label: 'Thao tác hàng loạt' }] }} trigger={['click']}>
                            <Button style={{ fontSize: 14 }}>Thao tác hàng loạt <DownOutlined /></Button>
                        </Dropdown>
                    </div>
                )}
                <div style={{ padding: '0 16px 12px', borderBottom: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', gap: 12 }}>
                    {stockTabItems.map((item) => (
                        <span
                            key={item.key}
                            onClick={() => setStockTab(item.key)}
                            style={{
                                fontSize: 14,
                                padding: '6px 12px',
                                borderRadius: 4,
                                cursor: 'pointer',
                                background: stockTab === item.key ? '#EF5941' : 'transparent',
                                color: stockTab === item.key ? '#fff' : '#262626'
                            }}
                        >
                            {item.label}
                        </span>
                    ))}
                </div>
                <div style={{ padding: '8px 16px 12px', borderBottom: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14 }}>Sắp xếp theo:</span>
                    <Select value="actual" style={{ width: 140, fontSize: 14 }} suffixIcon={<DownOutlined />}>
                        <Option value="actual">Tồn thực tế</Option>
                    </Select>
                    <Button type="text" size="small" icon={<SyncOutlined />} />
                </div>
                <Table
                    rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
                    columns={columns}
                    dataSource={mockData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                    rowKey="key"
                    pagination={false}
                    style={{ fontSize: 14 }}
                    className="neutral-header-table"
                />
                <div style={{ padding: '0 16px 14px', borderTop: '0.87px solid #F0F0F0' }}>
                    <PaginationFooter
                        total={mockData.length}
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

export default InventoryStockView;
