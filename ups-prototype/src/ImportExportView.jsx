import React, { useState } from 'react';
import {
    Card, Input, Button, Table, Space, Select, Tabs, DatePicker, Dropdown
} from 'antd';
import { SearchOutlined, DownOutlined, ExportOutlined, UploadOutlined, SyncOutlined } from '@ant-design/icons';
import PaginationFooter from './PaginationFooter';

const { Option } = Select;
const { RangePicker } = DatePicker;

const ImportExportView = () => {
    const [mainTab, setMainTab] = useState('import');
    const [statusTab, setStatusTab] = useState('imported');
    const [subStatus, setSubStatus] = useState('warehouse');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [dateRange, setDateRange] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const mainTabItems = [
        { key: 'import', label: <span style={{ fontSize: 14 }}>NHẬP KHO</span> },
        { key: 'export', label: <span style={{ fontSize: 14 }}>XUẤT KHO</span> }
    ];

    const mockData = [
        { key: '1', code: 'GRN10402026-00000219', orderCode: '260131G6JG6P37', waybillCode: 'SPXVN064521005532', quantity: '1/1', warehouse: 'Kho Hồ Chí Minh', store: 'KUN_Official Store', label: 'Nhãn hàng mặc định', method: 'Nhập kho hoàn hàng', createdAt: '03/02/2026 10:43', updatedAt: '03/02/2026 10:43', account: '--' }
    ];

    const columns = [
        {
            title: 'Mã phiếu',
            key: 'code',
            width: '20%',
            render: (_, r) => (
                <div>
                    <div style={{ fontSize: 14, marginBottom: 2 }}>{r.code}</div>
                    <div style={{ fontSize: 12, color: '#8C8C8C' }}>Mã đơn hàng: {r.orderCode}</div>
                    <div style={{ fontSize: 12, color: '#8C8C8C' }}>Mã vận đơn: {r.waybillCode}</div>
                </div>
            )
        },
        { title: 'Số lượng', key: 'quantity', width: '10%', render: (_, r) => <><div style={{ fontSize: 14 }}>Hàng hóa: 1</div><div style={{ fontSize: 14 }}>Nhập kho: {r.quantity}</div></> },
        { title: 'Kho', key: 'warehouse', width: '18%', render: (_, r) => <><div style={{ fontSize: 14 }}>{r.warehouse}</div><div style={{ fontSize: 12, color: '#8C8C8C' }}>Gian hàng: {r.store}</div></> },
        { title: 'Nhãn hàng', dataIndex: 'label', key: 'label', width: '12%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Hình thức', dataIndex: 'method', key: 'method', width: '14%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Thời gian', key: 'time', width: '16%', render: (_, r) => <><div style={{ fontSize: 14 }}>Thời gian tạo: {r.createdAt}</div><div style={{ fontSize: 14 }}>Thời gian cập nhật: {r.updatedAt}</div></> },
        { title: 'Tài khoản thao tác', dataIndex: 'account', key: 'account', width: '10%', render: (t) => <span style={{ fontSize: 14 }}>{t}</span> },
        { title: 'Thao tác', key: 'actions', width: '6%', align: 'center', render: () => <Dropdown menu={{ items: [{ key: 'view', label: 'Xem' }] }} trigger={['click']}><Button style={{ fontSize: 14 }}>Chọn <DownOutlined /></Button></Dropdown> }
    ];

    return (
        <div>
            {/* Top Action - FrameScheduleManagement pattern */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14, gap: 8 }}>
                <Button style={{ borderColor: '#EF5941', color: '#EF5941', fontSize: 14 }} icon={<UploadOutlined />}>Nhập file</Button>
                <Button type="primary" style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }} icon={<ExportOutlined />}>Xuất file</Button>
                <Button type="text" icon={<SyncOutlined />} style={{ fontSize: 14 }} />
                <Button
                    type="primary"
                    style={{ background: '#EF5941', borderColor: '#EF5941', fontSize: 14 }}
                >
                    Tạo phiếu nhập kho
                </Button>
            </div>

            {/* Main Section - Card: Tabs, Filter, Table */}
            <Card styles={{ body: { padding: 0 } }} style={{ borderRadius: 8, background: '#fff' }}>
                <div style={{ padding: '0 16px' }} className="order-processing-tabs">
                    <Tabs activeKey={mainTab} onChange={setMainTab} items={mainTabItems} />
                </div>
                <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
                    <Space size="middle" wrap>
                        <span style={{ fontSize: 14 }}>Thời gian tạo</span>
                        <RangePicker showTime value={dateRange} onChange={setDateRange} style={{ width: 320, fontSize: 14 }} />
                        <Select placeholder="Kho" style={{ width: 140, fontSize: 14 }} suffixIcon={<DownOutlined />}><Option value="all">Tất cả</Option></Select>
                        <Select placeholder="Chọn nhãn quản lý" style={{ width: 160, fontSize: 14 }} suffixIcon={<DownOutlined />} />
                        <Input placeholder="Nhập mã phiếu xuất/ nhập kho" prefix={<SearchOutlined />} style={{ width: 260, fontSize: 14 }} />
                        <Select placeholder="Gian hàng" style={{ width: 140, fontSize: 14 }} suffixIcon={<DownOutlined />}><Option value="all">Tất cả</Option></Select>
                        <Select placeholder="Hình thức" style={{ width: 160, fontSize: 14 }} suffixIcon={<DownOutlined />}><Option value="all">Tất cả</Option></Select>
                    </Space>
                </div>
                <div style={{ padding: '0 16px 8px', borderBottom: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    {['Chờ duyệt(0)', 'Chờ nhập (0)', 'Đã nhập (141)', 'Chênh lệch sau nhập (0)', 'Đã đóng PO(0)'].map((label, i) => (
                        <span key={i} style={{ fontSize: 14, padding: '4px 8px', cursor: 'pointer', color: i === 2 ? '#EF5941' : '#262626', borderBottom: i === 2 ? '2px solid #EF5941' : 'none' }}>{label}</span>
                    ))}
                </div>
                <div style={{ padding: '8px 16px 12px', borderBottom: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Button type={subStatus === 'warehouse' ? 'primary' : 'default'} size="small" style={subStatus === 'warehouse' ? { background: '#EF5941', borderColor: '#EF5941' } : {}} onClick={() => setSubStatus('warehouse')}>Đã nhập kho (135)</Button>
                    <Button type={subStatus === 'done' ? 'primary' : 'default'} size="small" style={subStatus === 'done' ? { background: '#EF5941', borderColor: '#EF5941' } : {}} onClick={() => setSubStatus('done')}>Đã hoàn thành (6)</Button>
                </div>
                {selectedRowKeys.length > 0 && (
                    <div style={{ padding: '8px 16px', borderBottom: '1px solid #F0F0F0', background: '#FAFAFA', display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 14 }}>Đã chọn: {selectedRowKeys.length}</span>
                        <Button size="small" style={{ fontSize: 14 }}>Hoàn thành hàng loạt</Button>
                    </div>
                )}
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
                        label="phiếu"
                    />
                </div>
            </Card>
        </div>
    );
};

export default ImportExportView;
