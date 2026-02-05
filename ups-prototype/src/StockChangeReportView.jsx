import React, { useState } from 'react';
import {
    Card, Input, Button, Table, Space, Select, Tabs, DatePicker
} from 'antd';
import { SearchOutlined, DownOutlined, ExportOutlined, SyncOutlined, RightOutlined } from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const StockChangeReportView = () => {
    const [globalTab, setGlobalTab] = useState('by-product');
    const [moduleTab, setModuleTab] = useState('seller');
    const [dateRange, setDateRange] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const globalTabItems = [
        { key: 'by-product', label: <span style={{ fontSize: 14 }}>Theo hàng hóa</span> },
        { key: 'by-activity', label: <span style={{ fontSize: 14 }}>Theo hoạt động</span> }
    ];

    const moduleTabItems = [
        { key: 'seller', label: <span style={{ fontSize: 14 }}>Kho nhà bán</span> },
        { key: 'service', label: <span style={{ fontSize: 14 }}>Kho dịch vụ</span> }
    ];

    const mockData = [
        { key: '1', sku: '28936025775660_loc-DAMAGED1', name: '[HÀNG TẶNG KHÔNG B...]', unit: '—', beginActual: 0, beginAdvance: 0, importQty: 0, exportQty: 0, endActual: 0, endAdvance: 0, warehouse: 'Tất cả' },
        { key: '2', sku: '28936025775661', name: 'Sữa chua ăn đóng chai...', unit: 'Thùng', beginActual: 24, beginAdvance: 0, importQty: 0, exportQty: 2, endActual: 22, endAdvance: 0, warehouse: 'Tất cả' }
    ];

    const columns = [
        { title: 'SKU hàng hóa', dataIndex: 'sku', key: 'sku', width: '14%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Tên hàng hóa', dataIndex: 'name', key: 'name', width: '16%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'ĐVT', dataIndex: 'unit', key: 'unit', width: '8%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        {
            title: 'Đầu kỳ',
            key: 'begin',
            width: '14%',
            children: [
                { title: 'Tồn thực tế', dataIndex: 'beginActual', key: 'beginActual', width: '50%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
                { title: 'Tạm ứng', dataIndex: 'beginAdvance', key: 'beginAdvance', width: '50%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> }
            ]
        },
        { title: () => <span>Nhập <RightOutlined style={{ fontSize: 12 }} /></span>, dataIndex: 'importQty', key: 'importQty', width: '8%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: () => <span>Xuất <RightOutlined style={{ fontSize: 12 }} /></span>, dataIndex: 'exportQty', key: 'exportQty', width: '8%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        {
            title: 'Cuối kỳ',
            key: 'end',
            width: '14%',
            children: [
                { title: 'Tồn thực tế', dataIndex: 'endActual', key: 'endActual', width: '50%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
                { title: 'Tạm ứng', dataIndex: 'endAdvance', key: 'endAdvance', width: '50%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> }
            ]
        },
        { title: 'Kho', dataIndex: 'warehouse', key: 'warehouse', width: '10%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> }
    ];

    return (
        <div>
            {/* Global Tabs - above Card (FrameScheduleManagement pattern) */}
            <div style={{ marginBottom: 14 }}>
                <Tabs activeKey={globalTab} onChange={setGlobalTab} items={globalTabItems} />
            </div>
            <div style={{ marginBottom: 14 }}>
                <Tabs activeKey={moduleTab} onChange={setModuleTab} items={moduleTabItems} />
            </div>

            {/* Info Banner + Top Action - FrameScheduleManagement pattern */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 12, padding: '12px 16px', background: '#FFF7E6', borderRadius: 8, border: '1px solid #FFE7BA' }}>
                <span style={{ fontSize: 14 }}>
                    Thời gian cập nhật báo cáo tồn gần nhất vào lúc: 03-02-2026 02:01:35
                </span>
                <Space size="middle">
                    <Button type="primary" icon={<ExportOutlined />} style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}>
                        Xuất file
                    </Button>
                    <Button type="text" icon={<SyncOutlined />} style={{ fontSize: 14 }} />
                </Space>
            </div>

            {/* Main Section - Card: Filter, Table (FrameScheduleManagement pattern) */}
            <Card styles={{ body: { padding: 0 } }} style={{ borderRadius: 8, background: '#fff' }}>
                <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
                    <Space direction="vertical" style={{ width: '100%' }} size="middle">
                        <Space wrap>
                            <span style={{ fontSize: 14 }}>Thời gian:</span>
                            <RangePicker value={dateRange} onChange={setDateRange} style={{ width: 280, fontSize: 14 }} placeholder={['dd/mm/yyyy', 'dd/mm/yyyy']} />
                            <span style={{ fontSize: 14 }}>Nhãn hàng</span>
                            <Select placeholder="Tất cả" style={{ width: 160, fontSize: 14 }} suffixIcon={<DownOutlined />}><Option value="all">Tất cả</Option></Select>
                        </Space>
                        <Space wrap>
                            <span style={{ fontSize: 14 }}>Mã SKU</span>
                            <Select placeholder="Chọn" style={{ width: 160, fontSize: 14 }} suffixIcon={<DownOutlined />} />
                            <Search placeholder="Nhập mã SKU/ tên hàng hoá cần tìm kiếm" allowClear style={{ width: 320, fontSize: 14 }} prefix={<SearchOutlined />} />
                            <Select placeholder="Tất cả" style={{ width: 120, fontSize: 14 }} suffixIcon={<DownOutlined />}><Option value="all">Tất cả</Option></Select>
                        </Space>
                    </Space>
                </div>
                <Table
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
                        label="bản ghi"
                    />
                </div>
            </Card>
        </div>
    );
};

export default StockChangeReportView;
